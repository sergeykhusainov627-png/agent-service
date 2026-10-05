'use strict';
/**
 * fore-agent-cli — обмен командами с модулем AgentCmd внутри платформы.
 *
 * Модуль AgentCmd (служебная сборка) раз в секунду смотрит файл команды
 * и пишет ответ в файл. Этот скрипт кладёт команды и читает ответы —
 * то есть даёт доступ к репозиторию без управления мышью и клавиатурой.
 *
 * Использование (запускать из папки AgentService):
 *   node tools/agent-cli.js ping
 *   node tools/agent-cli.js info
 *   node tools/agent-cli.js list
 *   node tools/agent-cli.js read <ModuleId>
 *   node tools/agent-cli.js compile <AssemblyId>
 *   node tools/agent-cli.js write <ModuleId> <путь-к-файлу.fore>
 *   node tools/agent-cli.js lint <путь-к-файлу.fore>
 *
 * Дополнительно:
 *   --timeout=N   сколько секунд ждать ответ (по умолчанию 30)
 *   --raw         печатать ответ целиком, без разбора
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const INBOX = path.join(ROOT, 'inbox');
const OUTBOX = path.join(ROOT, 'outbox');
const CMD = path.join(INBOX, 'cmd.txt');
const OUT = path.join(OUTBOX, 'out.txt');
const DONE = path.join(OUTBOX, 'done.txt');

const argv = process.argv.slice(2);
const opts = {
  timeout: 30,
  raw: false,
};
const args = [];
for (const a of argv) {
  if (a.startsWith('--timeout=')) opts.timeout = Number(a.split('=')[1]);
  else if (a === '--raw') opts.raw = true;
  else args.push(a);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Каналы: основной (сменный код) и прошивка (неизменяемая). */
const CHANNELS = {
  main: { dir: ROOT, inName: 'inbox', outName: 'outbox', label: 'AgentService (основной)' },
  keeper: { dir: ROOT, inName: 'k_inbox', outName: 'k_outbox', label: 'AgentKeeper (прошивка)' },
};

function chanPaths(channel) {
  const c = CHANNELS[channel];
  const inbox = path.join(c.dir, c.inName);
  const outbox = path.join(c.dir, c.outName);
  return {
    inbox,
    outbox,
    cmd: path.join(inbox, 'cmd.txt'),
    out: path.join(outbox, 'out.txt'),
    done: path.join(outbox, 'done.txt'),
    label: c.label,
  };
}

function ensureDirs(channel = 'main') {
  const p = chanPaths(channel);
  for (const d of [p.inbox, p.outbox]) {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  }
}

/** Отправка команды и ожидание свежего ответа. */
async function send(commandText, channel = 'main') {
  const p = chanPaths(channel);
  ensureDirs(channel);
  // Убираем старые файлы: ответ должен быть именно на нашу команду
  for (const f of [p.cmd, p.out, p.done]) {
    if (fs.existsSync(f)) fs.unlinkSync(f);
  }
  const started = Date.now();
  fs.writeFileSync(p.cmd, commandText, 'utf8');
  process.stdout.write(`… команда отправлена, ждём: ${p.label}\n`);

  const deadline = started + opts.timeout * 1000;
  let waited = false;
  while (Date.now() < deadline) {
    await sleep(400);
    if (fs.existsSync(p.done) && fs.statSync(p.done).mtimeMs >= started - 1000) {
      waited = true;
      break;
    }
  }
  if (!waited) {
    console.error(`Ответа нет за ${opts.timeout} с.`);
    console.error('Проверьте: 1) нужный канал запущен (кнопка на форме);');
    console.error('          2) путь в модуле совпадает с ' + ROOT);
    process.exitCode = 2;
    return null;
  }
  const text = fs.readFileSync(p.out, 'utf8');
  return text;
}

/** Разбор ответа: строки KEY=VALUE, тело после TEXT — до строки END=1. */
function parse(text) {
  const lines = text.replace(/\r\n/g, '\n').split('\n');
  const head = {};
  let body = null;
  let inBody = false;
  const bodyLines = [];
  for (const line of lines) {
    if (line === 'TEXT') { inBody = true; continue; }
    if (line === 'END=1') break;
    if (inBody) { bodyLines.push(line); continue; }
    const eq = line.indexOf('=');
    if (eq > 0) head[line.slice(0, eq)] = line.slice(eq + 1);
  }
  if (inBody) body = bodyLines.join('\n');
  return { head, body };
}

function show(text) {
  if (opts.raw) { console.log(text); return; }
  const { head, body } = parse(text);
  const order = ['AGENT', 'STAMP', 'OP', 'STATUS', 'WHAT', 'MSG', 'MOD', 'NAME',
    'CHARS', 'OLD_CHARS', 'NEW_CHARS', 'BACKUP', 'REPO', 'ROOT_ID', 'ROOT_NAME',
    'ROOT_CHILDREN', 'COUNT', 'ASM', 'BIND', 'CLASSES', 'CHECK_COMPILED',
    'IS_LOADED', 'BUILTIN', 'TIME_STAMP', 'HIDDEN_REFS', 'WARN', 'TIME'];
  for (const k of order) {
    if (head[k] !== undefined) console.log(`  ${k.padEnd(15)} ${head[k]}`);
  }
  for (const k of Object.keys(head)) {
    if (!order.includes(k)) console.log(`  ${k.padEnd(15)} ${head[k]}`);
  }
  if (head.STATUS === 'ERR') process.exitCode = 1;
  if (body !== null) {
    console.log(`  ---- текст модуля (${body.length} символов) ----`);
    console.log(body.length > 2000 ? body.slice(0, 2000) + '\n… (обрезано)' : body);
  }
}

async function main() {
  const cmd = (args[0] || '').toLowerCase();
  if (!cmd) {
    console.log('Основной канал (AgentService):');
    console.log('  ping | info | list | exists <Obj> | read <Mod> | compile <Asm>');
    console.log('  listasm <Asm> | refs <Mod> | write <Mod> <файл.fore>');
    console.log('  mkasm <Asm> | mkmod <Mod> <файл.fore>');
    console.log('Прошивка (AgentKeeper) — правка сменного кода:');
    console.log('  khealth [Mod]            состояние и компиляция сборки');
    console.log('  kget [Mod]               прочитать текст целевого модуля');
    console.log('  kput <Mod> <файл.fore>   заменить текст + компиляция + откат при ошибке');
    console.log('  krollback [Mod]          вернуть модуль из последнего бэкапа');
    console.log('Прочее: lint <файл.fore> — баланс и зарезервированные слова');
    return;
  }

  if (cmd === 'lint') {
    const file = args[1];
    if (!file || !fs.existsSync(file)) { console.error('Укажите файл .fore'); process.exitCode = 2; return; }
    const src = fs.readFileSync(file, 'utf8');
    const pairs = [
      ['Sub', (src.match(/^\s*(?:Public\s+|Private\s+|Friend\s+)?Sub\s+\w+/gm) || []).length,
       'End Sub', (src.match(/^\s*End\s+Sub\b/gm) || []).length],
      ['Function', (src.match(/^\s*(?:Public\s+|Private\s+|Friend\s+)?Function\s+\w+/gm) || []).length,
       'End Function', (src.match(/^\s*End\s+Function\b/gm) || []).length],
      ['If', (src.match(/^\s*If\b/gm) || []).length,
       'End If', (src.match(/^\s*End\s+If\b/gm) || []).length],
      ['While', (src.match(/^\s*While\b/gm) || []).length,
       'End While', (src.match(/^\s*End\s+While\b/gm) || []).length],
      ['Try', (src.match(/^\s*Try\b/gm) || []).length,
       'End Try', (src.match(/^\s*End\s+Try\b/gm) || []).length],
    ];
    console.log(`Проверка файла: ${file}`);
    let bad = 0;
    for (const [open, n1, close, n2] of pairs) {
      const ok = n1 === n2;
      if (!ok) bad++;
      console.log(`  ${ok ? '✓' : '✗'} ${open} = ${n1}, ${close} = ${n2}`);
    }
    console.log(bad === 0 ? '  структура сбалансирована' : `  НЕСОБАЛАНСИРОВАНО: ${bad} групп`);

    // --- Проверка зарезервированных слов как имён ---------------------------
    // Ошибка, поймавшая нас на стенде: параметр с именем «Mod» — компилятор
    // отказал, потому что Mod это оператор (остаток от деления).
    const RESERVED = ['Mod', 'Div', 'Not', 'And', 'Or', 'Xor', 'Is', 'As', 'New',
      'Null', 'True', 'False', 'Begin', 'End', 'If', 'Then', 'Else', 'Elseif',
      'For', 'Each', 'To', 'Step', 'Do', 'While', 'Repeat', 'Until', 'Break',
      'Continue', 'Return', 'Try', 'Except', 'Finally', 'On', 'Raise', 'Var',
      'Const', 'Sub', 'Function', 'Class', 'Property', 'Get', 'Set', 'Shared',
      'Final', 'With', 'Select', 'Case', 'Dispose', 'Self', 'Object', 'Array',
      'Of', 'Public', 'Private', 'Protected', 'Friend', 'Constructor'];
    // Убираем комментарии, строки и многострочные комментарии
    const clean = src
      .replace(/\/\/[^\n]*/g, ' ')
      .replace(/\{[\s\S]*?\}/g, ' ')
      .replace(/"(?:[^"\n])*"/g, '""')
      .replace(/'(?:[^'\n])'/g, "''");
    const nameRe = /(?:Var\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*:\s*(?:String|Integer|Double|Boolean|DateTime|Variant|Object|IMetabase|IModule|IForeRuntime|IForeAssembly|IForeAssemblyBinary|ITextReader|ITextWriter|Timer|Button|Memo|Label|SortedList|ArrayList|ITabSheet|IPrxReport)\b/gm;
    const badNames = [];
    let m;
    while ((m = nameRe.exec(clean)) !== null) {
      if (RESERVED.includes(m[1])) badNames.push(m[1]);
    }
    // Параметры процедур: «Sub Name(Mod: String; ...)»
    const paramRe = /(?:Sub|Function)\s+\w+\s*\(([^)]*)\)/g;
    while ((m = paramRe.exec(clean)) !== null) {
      for (const part of m[1].split(';')) {
        const p = part.trim().match(/^(?:Var\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*[,:]/);
        if (p && RESERVED.includes(p[1])) badNames.push(p[1]);
      }
    }
    if (badNames.length > 0) {
      const uniq = [...new Set(badNames)];
      console.log(`  ✗ зарезервированные слова как имена: ${uniq.join(', ')}`);
      bad++;
    } else {
      console.log('  ✓ зарезервированных слов среди имён нет');
    }

    if (bad > 0) process.exitCode = 1;
    return;
  }

  if (cmd === 'read' || cmd === 'compile') {
    const id = args[1];
    if (!id) { console.error(`Укажите идентификатор: ${cmd} <ID>`); process.exitCode = 2; return; }
    const text = await send(`OP=${cmd.toUpperCase()}\n${cmd === 'read' ? 'MOD' : 'ASM'}=${id}\n`);
    if (text) show(text);
    return;
  }

  if (cmd === 'listasm') {
    const id = args[1];
    if (!id) { console.error('Формат: listasm <AssemblyId>'); process.exitCode = 2; return; }
    const text = await send(`OP=LISTASM\nASM=${id}\n`);
    if (!text) return;
    // Состав сборки удобнее показать таблицей, а не парами KEY=VALUE
    const { head } = parse(text);
    console.log(`  Сборка «${head.NAME || id}»: объектов ${head.COUNT || 0}`);
    for (const line of text.replace(/\r\n/g, '\n').split('\n')) {
      if (!line.startsWith('ITEM=')) continue;
      const [mid, name, cls, chars] = line.slice(5).split('|');
      console.log(`    ${(mid || '').padEnd(34)} ${(cls || '').padStart(6)}  ${String(chars || 0).padStart(7)} симв.  ${name || ''}`);
    }
    return;
  }

  if (cmd === 'exists') {
    const id = args[1];
    if (!id) { console.error('Формат: exists <ObjectId>'); process.exitCode = 2; return; }
    const text = await send(`OP=EXISTS\nMOD=${id}\n`);
    if (text) show(text);
    return;
  }

  if (cmd === 'refs') {
    const id = args[1];
    if (!id) { console.error('Формат: refs <ModuleId>'); process.exitCode = 2; return; }
    const text = await send(`OP=REFS\nMOD=${id}\n`);
    if (!text) return;
    const { head } = parse(text);
    console.log(`  Модуль ${id}: ссылок ${head.REFS_COUNT || 0}`);
    for (const line of text.replace(/\r\n/g, '\n').split('\n')) {
      if (line.startsWith('REF=')) console.log(`    ${line.slice(4)}`);
    }
    if (head.WARN) console.log(`    предупреждение: ${head.WARN}`);
    return;
  }

  if (cmd === 'mkmod') {
    // Создать или обновить модуль: mkmod <ModuleId> <файл.fore>
    const id = args[1];
    const file = args[2];
    if (!id || !file || !fs.existsSync(file)) {
      console.error('Формат: mkmod <ModuleId> <путь-к-файлу.fore>');
      process.exitCode = 2;
      return;
    }
    const body = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
    const text = await send(`OP=MKMOD\nMOD=${id}\nTEXT\n${body}\n`);
    if (text) show(text);
    return;
  }

  if (cmd === 'mkasm') {
    // Создать сборку, если её нет: mkasm <AssemblyId>
    const id = args[1];
    if (!id) { console.error('Формат: mkasm <AssemblyId>'); process.exitCode = 2; return; }
    const text = await send(`OP=MKASM\nASM=${id}\n`);
    if (text) show(text);
    return;
  }

  if (cmd === 'restart') {
    // Самообновление канала: restart [файл.fore]
    // Кладём новую версию модуля канала и флаг перезапуска. Канал сам:
    // запишет код, проверит компиляцию, откатится при ошибке и, если всё
    // хорошо, скроет окно — приложение запустит его заново.
    const file = args[1] || path.join(ROOT, 'Fore', 'Agent', 'AgentServiceForm.fore');
    if (!fs.existsSync(file)) { console.error('Нет файла: ' + file); process.exitCode = 2; return; }
    const p = chanPaths('main');
    ensureDirs('main');
    const newText = path.join(p.inbox, 'newtext.fore');
    const flag = path.join(p.inbox, 'restart.flag');
    const beat = path.join(p.outbox, 'heartbeat.txt');
    const before = fs.existsSync(beat) ? fs.statSync(beat).mtimeMs : 0;
    fs.writeFileSync(newText, fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n'), 'utf8');
    fs.writeFileSync(flag, new Date().toISOString(), 'utf8');
    console.log('… новая версия и флаг перезапуска отправлены');
    console.log('  ждём: либо откат (канал остался), либо перезапуск канала');

    const deadline = Date.now() + (opts.timeout > 30 ? opts.timeout : 120) * 1000;
    while (Date.now() < deadline) {
      await sleep(700);
      // Пропал флаг и обновилась отметка «я жив» — канал вернулся
      if (fs.existsSync(beat) && fs.statSync(beat).mtimeMs > before + 500) {
        console.log('  канал снова отвечает (отметка обновилась)');
        const text = await send('OP=PING\n', 'main');
        if (text) show(text);
        return;
      }
      // Канал отказался перезапускаться и снял флаг — сообщаем
      if (!fs.existsSync(flag) && !fs.existsSync(beat)) break;
    }
    console.log('  ответа нет: проверьте журнал на форме и outbox\\out.txt');
    process.exitCode = 2;
    return;
  }

  if (cmd === 'write') {
    const id = args[1];
    const file = args[2];
    if (!id || !file || !fs.existsSync(file)) {
      console.error('Формат: write <ModuleId> <путь-к-файлу.fore>');
      process.exitCode = 2;
      return;
    }
    const body = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
    const text = await send(`OP=WRITE\nMOD=${id}\nTEXT\n${body}\n`);
    if (text) show(text);
    return;
  }

  // --- КАНАЛ ПРОШИВКИ (AgentKeeper): чтение и замена сменного кода ---
  const keeper = {
    khealth: (id) => `OP=KHEALTH\nASM=${id || ''}\n`,
    kget: (id) => `OP=KGET\nTARGET=${id || ''}\n`,
    krollback: (id) => `OP=KROLLBACK\nTARGET=${id || ''}\n`,
    kcompile: (id) => `OP=KCOMPILE\nASM=${id || ''}\n`,
  };
  if (keeper[cmd]) {
    const text = await send(keeper[cmd](args[1]), 'keeper');
    if (text) show(text);
    return;
  }
  if (cmd === 'kput') {
    // Заменить модуль: kput <ModuleId> <файл.fore> [--nocmp]
    // --nocmp — записать без компиляции (для модулей сборки, загруженной
    // в процесс прошивки: компиляция такой сборки падает)
    const id = args[1];
    const file = args[2];
    if (!id || !file || !fs.existsSync(file)) {
      console.error('Формат: kput <ModuleId> <путь-к-файлу.fore> [--nocmp]');
      process.exitCode = 2;
      return;
    }
    const body = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
    const nocmp = args.includes('--nocmp') || argv.includes('--nocmp');
    const text = await send(
      `OP=KPUT\nTARGET=${id}\nNOCMP=${nocmp ? 1 : 0}\nTEXT\n${body}\n`,
      'keeper'
    );
    if (text) show(text);
    return;
  }

  // Простые команды без параметров
  const simple = { ping: 'OP=PING\n', info: 'OP=INFO\n', list: 'OP=LIST\n' };
  if (simple[cmd]) {
    const text = await send(simple[cmd]);
    if (text) show(text);
    return;
  }

  console.error('Неизвестная команда: ' + cmd);
  process.exitCode = 2;
}

main().catch((e) => { console.error('Ошибка:', e.message); process.exitCode = 1; });
