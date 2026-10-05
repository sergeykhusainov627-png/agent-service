'use strict';
/**
 * compare-modules.js — сверка модулей в репозитории с файлами на диске.
 *
 * Зачем: после правок и откатов нужно знать наверняка, что в репозитории
 * лежит именно тот текст, который есть на диске. Клиент умеет вернуть текст
 * модуля, но не сравнивает его с файлом.
 *
 * Использование:
 *   node tools/compare-modules.js <папка-с-файлами>
 *
 * Сопоставление: файл AgentServiceForm.fore  →  модуль AGENTSERVICE.
 * Правило имени: у форм отбрасывается суффикс Form и берётся имя класса
 * в верхнем регистре; остальные — имя файла без расширения.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const CLI = path.join(__dirname, 'agent-cli.js');

/** Нормализация: убрать BOM, привести переводы строк, обрезать хвостовые пробелы. */
function norm(s) {
  return String(s || '')
    .replace(/^\uFEFF/, '')
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+$/gm, '')
    .trim();
}

/** Соответствие «файл → идентификатор модуля в репозитории». */
function moduleIdFor(file) {
  const base = path.basename(file, '.fore');
  const m = base.match(/^(.*)Form$/);
  if (m) return m[1].toUpperCase();
  return base.toUpperCase();
}

function readRemote(id, timeout) {
  const out = execFileSync(process.execPath, [CLI, 'read', id, '--raw', `--timeout=${timeout}`], {
    cwd: ROOT,
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  });
  // Ответ: строки KEY=VALUE, затем строка TEXT, затем тело до END=1
  const text = out.replace(/\r\n/g, '\n');
  const idx = text.indexOf('\nTEXT\n');
  if (idx < 0) return null;
  let body = text.slice(idx + 6);
  const end = body.indexOf('\nEND=1');
  if (end >= 0) body = body.slice(0, end);
  return body.replace(/^\uFEFF/, '');
}

function main() {
  const dir = process.argv[2] || path.join(ROOT, 'Fore', 'Agent');
  const timeout = 40;
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.fore')).sort();
  if (files.length === 0) {
    console.error('В папке нет .fore файлов: ' + dir);
    process.exitCode = 2;
    return;
  }
  let same = 0;
  let diff = 0;
  let missing = 0;
  console.log(`Сверка модулей: ${dir}\n`);
  for (const f of files) {
    const full = path.join(dir, f);
    const id = moduleIdFor(f);
    const local = norm(fs.readFileSync(full, 'utf8'));
    let remote;
    try {
      remote = readRemote(id, timeout);
    } catch (e) {
      console.log(`  ?  ${id.padEnd(20)} не прочитан: ${String(e.message).split('\n')[0]}`);
      missing++;
      continue;
    }
    if (remote === null) {
      console.log(`  ?  ${id.padEnd(20)} нет ответа с текстом`);
      missing++;
      continue;
    }
    const r = norm(remote);
    if (r === local) {
      console.log(`  =  ${id.padEnd(20)} совпадает (${local.length} симв.)`);
      same++;
    } else {
      // Ищем первое расхождение — по строкам
      const a = local.split('\n');
      const b = r.split('\n');
      let line = -1;
      for (let i = 0; i < Math.max(a.length, b.length); i++) {
        if ((a[i] || '') !== (b[i] || '')) { line = i + 1; break; }
      }
      console.log(`  ≠  ${id.padEnd(20)} РАСХОЖДЕНИЕ: диск ${local.length}, репозиторий ${r.length}, первая разная строка ${line}`);
      if (line > 0) {
        console.log(`        диск:       ${JSON.stringify((a[line - 1] || '').slice(0, 100))}`);
        console.log(`        репозиторий:${JSON.stringify((b[line - 1] || '').slice(0, 100))}`);
      }
      diff++;
    }
  }
  console.log(`\nИтог: совпадает ${same}, расходится ${diff}, не прочитано ${missing}`);
  if (diff > 0 || missing > 0) process.exitCode = 1;
}

main();
