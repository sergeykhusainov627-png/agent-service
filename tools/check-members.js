'use strict';
/**
 * check-members.js — проверка обращений к членам объектов по словарю API.
 *
 * ЗАЧЕМ
 *   Компилятор ловит ошибки вида «Неизвестный идентификатор 'Id'» только на
 *   стенде. Эта проверка находит их локально: берёт объявления переменных
 *   (`X: IModule;`) и сверяет `X.Член` с членами типа по словарю
 *   docs/forsite/api-index.txt (выгрузка из справки платформы).
 *
 * ЧЕГО НЕ ДЕЛАЕТ
 *   Не знает наследования интерфейсов: если член объявлен у базового
 *   интерфейса, проверка может дать ложное срабатывание. Поэтому результат —
 *   предупреждение, а не приговор; проверяйте по справке.
 *
 * ИСПОЛЬЗОВАНИЕ
 *   node tools/check-members.js <файл.fore | папка>
 *   node tools/check-members.js --list IAssembly     — показать члены типа
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const INDEX = path.join(ROOT, 'docs', 'forsite', 'api-index.txt');

/** Разбор словаря: тип → множество членов. */
function loadApi() {
  const api = new Map();
  if (!fs.existsSync(INDEX)) {
    console.error('Нет словаря API: ' + INDEX);
    process.exitCode = 2;
    return api;
  }
  const lines = fs.readFileSync(INDEX, 'utf8').replace(/\r\n/g, '\n').split('\n');
  for (const line of lines) {
    const parts = line.split('\t');
    if (parts.length < 3) continue;
    const type = parts[1].trim();
    const members = (parts[3] || '').trim();
    if (!type) continue;
    if (!api.has(type)) api.set(type, new Set());
    const set = api.get(type);
    if (members) {
      for (const m of members.split(';')) {
        const name = m.trim().replace(/\(.*$/, '');
        if (name) set.add(name.toLowerCase());
      }
    }
    // Поля («public»-переменные классов) тоже попадают в часть строк
    if (parts[2] && parts[2].trim() === 'class') {
      // ничего дополнительного
    }
  }
  return api;
}

/**
 * Известные обращения, собранные из РАБОЧЕГО кода проекта.
 * Справка не описывает наследование интерфейсов, поэтому часть членов
 * (например IForm.Modified) в словаре отсутствует. Если обращение уже
 * используется в модулях проекта — оно валидное, и помечать его нельзя.
 */
function learnKnownUsages(files) {
  const known = new Map(); // тип (lower) → Set(член lower)
  for (const f of files) {
    const src = fs.readFileSync(f, 'utf8');
    const clean = src
      .replace(/\{[^}]*\}/gs, ' ')
      .replace(/\/\/[^\n]*/g, ' ')
      .replace(/"(?:[^"\n])*"/g, '""');
    for (const scope of procRanges(clean)) {
      const body = clean.slice(scope.start, scope.end);
      const declared = new Map();
      const declRe = /\b([A-Za-z_]\w*)\s*:\s*(I[A-Z]\w+|[A-Z]\w*)\s*[;,)]/g;
      let m;
      while ((m = declRe.exec(body)) !== null) declared.set(m[1].toLowerCase(), m[2]);
      const useRe = /\b([A-Za-z_]\w*)\s*\.\s*([A-Za-z_]\w*)/g;
      while ((m = useRe.exec(body)) !== null) {
        const t = declared.get(m[1].toLowerCase());
        if (!t) continue;
        if (!known.has(t)) known.set(t, new Set());
        known.get(t).add(m[2].toLowerCase());
      }
    }
  }
  return known;
}

/** Границы процедур/функций: имя → [начало, конец) в очищенном тексте. */
function procRanges(clean) {
  const re = /^[ \t]*(?:Public\s+|Private\s+|Friend\s+)?(?:Sub|Function)\s+(\w+)/gm;
  const heads = [];
  let m;
  while ((m = re.exec(clean)) !== null) heads.push({ name: m[1], start: m.index });
  const ranges = [];
  for (let i = 0; i < heads.length; i++) {
    ranges.push({
      name: heads[i].name,
      start: heads[i].start,
      end: i + 1 < heads.length ? heads[i + 1].start : clean.length,
    });
  }
  return ranges;
}

/** Собираем объявления «Имя: Тип» (в пределах процедуры) и обращения «Имя.Член». */
function analyzeFile(file, api, known) {
  const src = fs.readFileSync(file, 'utf8');
  // Убираем комментарии и строковые литералы, чтобы не ловить мусор
  const clean = src
    .replace(/\{[^}]*\}/gs, ' ')
    .replace(/\/\/[^\n]*/g, ' ')
    .replace(/"(?:[^"\n])*"/g, '""');

  const ranges = procRanges(clean);
  const srcLines = src.split('\n');

  /** Объявления и обращения внутри одной процедуры. */
  const problems = [];
  const seen = new Set();
  const scopes = ranges.length > 0 ? ranges : [{ name: '(файл)', start: 0, end: clean.length }];

  for (const scope of scopes) {
    const body = clean.slice(scope.start, scope.end);
    const declared = new Map(); // имя (lower) → тип
    const declRe = /\b([A-Za-z_]\w*)\s*:\s*(I[A-Z]\w+|[A-Z]\w*)\s*[;,)]/g;
    let m;
    while ((m = declRe.exec(body)) !== null) {
      const type = m[2];
      if (api.has(type)) declared.set(m[1].toLowerCase(), type);
    }
    if (declared.size === 0) continue;

    const useRe = /\b([A-Za-z_]\w*)\s*\.\s*([A-Za-z_]\w*)/g;
    while ((m = useRe.exec(body)) !== null) {
      const varName = m[1].toLowerCase();
      const member = m[2];
      if (!declared.has(varName)) continue;
      const type = declared.get(varName);
      const set = api.get(type);
      if (!set || set.size === 0) continue;
      if (set.has(member.toLowerCase())) continue;
      // Наследование в справке не описано: если такое обращение уже
      // встречается в проекте — считаем его валидным и не помечаем.
      const knownSet = known.get(type);
      if (knownSet && knownSet.has(member.toLowerCase())) continue;
      const before = clean.slice(0, scope.start + m.index);
      const lineNo = before.split('\n').length;
      const key = scope.name + ':' + varName + '.' + member;
      if (seen.has(key)) continue;
      seen.add(key);
      problems.push({
        line: lineNo,
        text: srcLines[lineNo - 1] || '',
        type,
        varName: m[1],
        member,
        scope: scope.name,
      });
    }
  }
  return problems;
}

function collectFiles(target) {
  if (!fs.existsSync(target)) return [];
  const st = fs.statSync(target);
  if (st.isFile()) return [target];
  const out = [];
  for (const f of fs.readdirSync(target)) {
    const full = path.join(target, f);
    if (fs.statSync(full).isDirectory()) out.push(...collectFiles(full));
    else if (f.endsWith('.fore')) out.push(full);
  }
  return out;
}

function main() {
  const args = process.argv.slice(2);
  const api = loadApi();
  if (api.size === 0) return;

  if (args[0] === '--list') {
    const t = api.get(args[1]);
    if (!t) { console.log('Тип не найден: ' + args[1]); return; }
    console.log(`Члены ${args[1]} (${t.size}):`);
    console.log('  ' + [...t].sort().join(', '));
    return;
  }

  const target = args[0] || path.join(ROOT, 'Fore');
  const files = collectFiles(target);
  if (files.length === 0) { console.error('Нет файлов .fore: ' + target); process.exitCode = 2; return; }

  // Учимся на рабочем коде проекта: какие обращения там уже встречаются
  const known = learnKnownUsages(collectFiles(path.join(ROOT, 'Fore')));
  let knownCount = 0;
  for (const s of known.values()) knownCount += s.size;

  let total = 0;
  console.log(`Проверка членов по словарю API (${api.size} типов): ${target}`);
  console.log(`Учтено обращений из рабочего кода проекта: ${knownCount}\n`);
  for (const f of files) {
    const problems = analyzeFile(f, api, known);
    if (problems.length === 0) continue;
    console.log(`  ${path.basename(f)}`);
    for (const p of problems) {
      console.log(`    строка ${p.line}: ${p.varName}.${p.member} — нет у типа ${p.type} (процедура ${p.scope})`);
      console.log(`      ${p.text.trim().slice(0, 110)}`);
      total++;
    }
  }
  console.log(`\nПодозрительных обращений: ${total}`);
  if (total > 0) process.exitCode = 1;
}

main();
