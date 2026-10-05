// check-all.js — единая проверка проекта «Планировщик задач» перед копированием на стенд.
// Запуск: node tools/check-all.js   (код возврата 1 — есть проблемы)
// Что проверяется:
//   1) линтер .fore (баланс блоков, Try/Except, кодировка, дубли имён, «висячий» CreateForm);
//   2) спецификация чистой логики (tools/fore-spec.js);
//   2а) ссылки на контролы в формах (tools/fore-refs-check.js: UiFind/SetAutoSize/AnchorGroup
//       против описания экрана — ловит обращения к удалённым контролам);
//   3) SQL-скрипты: наличие и баланс круглых скобок;
//   4) макеты форм (PNG) на месте.

const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

let problems = 0;

function step(title, fn) {
	console.log('== ' + title);
	try {
		fn();
	} catch (e) {
		problems++;
		console.log('   (шаг завершился с ошибкой: ' + e.message + ')');
	}
}

step('Линтер .fore (папка Fore/)', () => {
	execFileSync('node', ['tools/fore-lint-check.js', 'Fore'], { stdio: 'inherit' });
});

step('Спецификация чистой логики (tools/fore-spec.js)', () => {
	execFileSync('node', ['tools/fore-spec.js'], { stdio: 'inherit' });
});

step('Спецификация демо-экрана (spec-текст фабрики)', () => {
	execFileSync('node', ['tools/fore-ui-spec-check.js'], { stdio: 'inherit' });
});

step('Ссылки на контролы: удалённые/несоздаваемые (tools/fore-refs-check.js)', () => {
	execFileSync('node', ['tools/fore-refs-check.js'], { stdio: 'inherit' });
});

step('SQL-скрипты: наличие и баланс скобок', () => {
	const dir = 'docs/sql';
	const files = fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith('.sql')).sort();
	if (files.length === 0) {
		console.log('НЕТ SQL-файлов в ' + dir);
		throw new Error('no sql files');
	}
	for (const f of files) {
		const t = fs.readFileSync(path.join(dir, f), 'utf8');
		const open = (t.match(/\(/g) || []).length;
		const close = (t.match(/\)/g) || []).length;
		const ok = open === close;
		if (!ok) {
			problems++;
		}
		console.log((ok ? 'OK   ' : 'FAIL ') + f + ' — «(» ' + open + ', «)» ' + close);
	}
});

step('Скрипт пересоздания таблиц актуален (tools/make-db-recreate.js --check)', () => {
	execFileSync('node', ['tools/make-db-recreate.js', '--check'], { stdio: 'inherit' });
});

step('Макеты форм (PNG)', () => {
	const files = ['form-planner.png', 'form-planner-simplified.png', 'form-planner-simplified-v2.png', 'form-records.png', 'form-responsible.png'];
	for (const f of files) {
		const p = path.join('docs', 'mockups', f);
		const ok = fs.existsSync(p);
		if (!ok) {
			problems++;
		}
		console.log((ok ? 'OK   ' : 'FAIL ') + p);
	}
});

console.log('---');
console.log('Проблем: ' + problems);
process.exit(problems > 0 ? 1 : 0);
