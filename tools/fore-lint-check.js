// fore-lint-check.js
// Автономный линтер .fore-файлов: порт линтера расширения forecode.foresight-fore-language 0.2.2
// (ForeDiagnosticProvider.checkBlockBalance + checkSyntax) + проверки, собранные на горьком опыте:
//   1) баланс блоков (Begin/If/Try/For/While/Case … End …), поддержка If на несколько строк;
//   2) Try обязан иметь Except;
//   3) «Then без If» с учётом многострочных условий;
//   4) кодировка/переводы строк: BOM и смешанные CRLF/LF ломают копирование на стенд;
//   5) дубли имён Sub/Function/Class/Const МЕЖДУ файлами (при слиянии шаблонов в один модуль);
//   6) New <X>.CreateForm, где класс <X> нигде не объявлен (форма не откроется на стенде);
//   7) сравнение с Null (X = Null / X <> Null) — на стенде принято IsNull(X);
//      значения по умолчанию у параметров («X: Тип = Null») не считаются сравнением;
//   8) строка продолжения склейки строк без «+» в начале строки (тихая потеря части текста);
//   9) класс формы формы-файла: должен быть «<имя файла> + Form» (объект X → `Class XForm: Form`).
// Запуск: node tools/fore-lint-check.js "Fore"
// Код возврата: 0 — чисто, 1 — есть предупреждения (удобно для CI).

const fs = require('fs');
const path = require('path');

// --- Условие может занимать несколько строк: «If <условие>» …, «Then» на следующей строке ---
function nextHasThen(lines, i) {
	for (let j = i + 1; j <= i + 3 && j < lines.length; j++) {
		const t = lines[j].trim().toUpperCase();
		if (t === '' || t.startsWith('//')) continue;
		return t.includes('THEN');
	}
	return false;
}

function lint(text) {
	const diagnostics = [];
	const lines = text.split(/\r?\n/);

	// --- checkBlockBalance ---
	{
		const stack = [];
		const findLastIndex = (pred) => {
			for (let i = stack.length - 1; i >= 0; i--) { if (pred(stack[i])) return i; }
			return -1;
		};

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			const upper = line.trim().toUpperCase();

			// Открывающие блоки
			if (upper.startsWith('BEGIN')) {
				stack.push({ type: 'begin', line: i, keyword: 'Begin' });
			} else if (upper.startsWith('IF ') || upper.includes(' IF ')) {
				if (upper.includes(' THEN') || nextHasThen(lines, i)) {
					stack.push({ type: 'if', line: i, keyword: 'If' });
				}
			} else if (upper.startsWith('TRY')) {
				stack.push({ type: 'try', line: i, keyword: 'Try', hasExcept: false });
			} else if (upper.startsWith('FOR ') || upper.includes(' FOR ')) {
				if (upper.includes(' DO')) stack.push({ type: 'for', line: i, keyword: 'For' });
			} else if (upper.startsWith('WHILE ') || upper.includes(' WHILE ')) {
				if (upper.includes(' DO')) stack.push({ type: 'while', line: i, keyword: 'While' });
			} else if (upper.startsWith('CASE ') || upper.includes(' CASE ')) {
				const caseMatch = line.match(/\bCASE\b/i);
				if (caseMatch && caseMatch.index !== undefined) {
					const beforeCase = line.substring(0, caseMatch.index);
					const singleQuotes = (beforeCase.match(/'/g) || []).length;
					const doubleQuotes = (beforeCase.match(/"/g) || []).length;
					if (singleQuotes % 2 === 0 && doubleQuotes % 2 === 0) {
						stack.push({ type: 'case', line: i, keyword: 'Case' });
					}
				}
			}

			// Закрывающие блоки
			if (upper.startsWith('END ')) {
				const endMatch = upper.match(/^END\s+(\w+)/);
				if (endMatch) {
					const endType = endMatch[1].toLowerCase();
					if (endType === 'function' || endType === 'sub' || endType === 'procedure') {
						const bi = findLastIndex(it => it.type === 'begin');
						if (bi >= 0) stack.splice(bi, 1);
						else diagnostics.push({ line: i, message: 'Несоответствующий End: нет открывающего Begin' });
					} else if (endType === 'if') {
						const ii = findLastIndex(it => it.type === 'if');
						if (ii >= 0) stack.splice(ii, 1);
						else diagnostics.push({ line: i, message: 'Несоответствующий End If: нет открывающего If' });
					} else if (endType === 'try') {
						const ti = findLastIndex(it => it.type === 'try');
						if (ti >= 0) {
							if (!stack[ti].hasExcept) {
								diagnostics.push({ line: stack[ti].line, message: 'Try без Except (Fore требует обработчик)' });
							}
							stack.splice(ti, 1);
						} else diagnostics.push({ line: i, message: 'Несоответствующий End Try: нет открывающего Try' });
					} else if (endType === 'for') {
						const fi = findLastIndex(it => it.type === 'for');
						if (fi >= 0) stack.splice(fi, 1);
					} else if (endType === 'while') {
						const wi = findLastIndex(it => it.type === 'while');
						if (wi >= 0) stack.splice(wi, 1);
					} else if (endType === 'select' || endType === 'case') {
						const ci = findLastIndex(it => it.type === 'case');
						if (ci >= 0) stack.splice(ci, 1);
					}
				}
			} else if (upper === 'END') {
				const bi = findLastIndex(it => it.type === 'begin');
				if (bi >= 0) stack.splice(bi, 1);
			} else if (upper.startsWith('EXCEPT')) {
				const ti = findLastIndex(it => it.type === 'try');
				if (ti < 0) diagnostics.push({ line: i, message: 'Except без соответствующего Try' });
				else stack[ti].hasExcept = true;
			} else if (upper.startsWith('ELSE')) {
				// Else — часть If, баланс не проверяется
			}
		}

		for (const item of stack) {
			diagnostics.push({ line: item.line, message: 'Незакрытый блок ' + item.keyword });
		}
	}

	// --- checkSyntax ---
	{
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			const trimmed = line.trim();
			const hasIf = /\bIF\b/i.test(trimmed);
			const hasThen = /\bTHEN\b/i.test(trimmed);

			let thenInString = false;
			if (hasThen) {
				const thenMatch = trimmed.match(/\bTHEN\b/i);
				if (thenMatch && thenMatch.index !== undefined) {
					const beforeThen = trimmed.substring(0, thenMatch.index);
					const sq = (beforeThen.match(/'/g) || []).length;
					const dq = (beforeThen.match(/"/g) || []).length;
					thenInString = (sq % 2 !== 0) || (dq % 2 !== 0);
				}
			}

			if (hasThen && !hasIf && !thenInString) {
				let ifFound = false;
				let prevIfOpen = false;
				let ifCount = 0;
				for (let j = i - 1; j >= 0 && j >= i - 100; j--) {
					const prevLine = lines[j].trim();
					const prevUpper = prevLine.toUpperCase();
					if (prevUpper.startsWith('//') || prevUpper.startsWith('{') || prevUpper.startsWith('/*') || prevLine === '') continue;
					if (prevUpper.startsWith('END IF') || /\bEND\s+IF\b/i.test(prevUpper)) { ifCount++; continue; }
					if ((prevUpper.startsWith('IF ') || prevUpper.includes(' IF ')) && !prevUpper.includes('THEN')) {
						// многострочное условие: «If …» на предыдущей(их) строках, «Then» — на этой
						if (i - j <= 3) { prevIfOpen = true; break; }
					}
					if (/\bIF\b/i.test(prevUpper) && /\bTHEN\b/i.test(prevUpper)) {
						if (ifCount === 0) { ifFound = true; break; }
						else { ifCount--; }
					}
				}
				if (!ifFound && !prevIfOpen && trimmed.match(/^\s*THEN\b/i)) {
					diagnostics.push({ line: i, message: 'Then без соответствующего If' });
				}
			}
		}
	}

	return diagnostics;
}

// --- Апостроф вне строкового литерала: в Fore строки задаются ТОЛЬКО двойными кавычками ---
// (проверено на стенде: `'текст'` даёт ошибку компиляции; внутри "..." апостроф допустим — SQL)
function apostropheNotes(text) {
	const notes = [];
	const lines = text.split(/\r?\n/);
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		let inStr = false;
		for (let j = 0; j < line.length; j++) {
			const ch = line[j];
			if (ch === '"') {
				inStr = !inStr;
				continue;
			}
			if (!inStr && ch === '/' && line[j + 1] === '/') {
				break;                                  // дальше комментарий
			}
			if (!inStr && ch === "'") {
				notes.push('строка ' + (i + 1) + ': апостроф вне строкового литерала — в Fore строки только в "…"');
				break;
			}
		}
	}
	return notes;
}

// --- Сравнение с Null: в Fore принято IsNull(...) (свойство ForeSys «признак отсутствия значения») ---
function nullComparisonNotes(text) {
	const notes = [];
	const lines = text.split(/\r?\n/);
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		let inStr = false;
		for (let j = 0; j < line.length; j++) {
			const ch = line[j];
			if (ch === '"') { inStr = !inStr; continue; }
			if (inStr) continue;
			if (ch === '/' && line[j + 1] === '/') break;
			// Значение по умолчанию у параметра («parent: IMetabaseObjectDescriptor = Null») — это
			// объявление, а не сравнение: IsNull() там записать нельзя — такую строку пропускаем.
			if (/^\s*[A-Za-z_][A-Za-z0-9_]*\s*:\s*[A-Za-z_][A-Za-z0-9_.]*\s*=\s*Null\s*;?\s*$/.test(line)) break;
			const m = /^([A-Za-z_][A-Za-z0-9_.]*)\s*(<>|=)\s*Null\b/.exec(line.slice(j));
			if (m) {
				notes.push('строка ' + (i + 1) + ': сравнение «' + m[1] + ' ' + m[2] + ' Null» — используйте IsNull(' + m[1] + ')');
				break;
			}
		}
	}
	return notes;
}

// --- Пропущенный «+» при склейке строк: строка продолжения начинается с "..." без «+» ---
function missingPlusNotes(text) {
	const notes = [];
	const lines = text.split(/\r?\n/);
	for (let i = 1; i < lines.length; i++) {
		if (!lines[i].trim().startsWith('"')) continue;
		let k = i - 1;
		while (k >= 0 && (lines[k].trim() === '' || lines[k].trim().startsWith('//'))) k--;
		const prev = k >= 0 ? lines[k].trim() : '';
		if (prev === '' || /\bReturn$/i.test(prev) || prev.endsWith('+') || prev.endsWith('(')
			|| prev.endsWith(',') || prev.endsWith('=') || prev.endsWith(':')) continue;
		notes.push('строка ' + (i + 1) + ': строка продолжения начинается с «"» — пропущен «+» в начале строки');
	}
	return notes;
}

// --- Кодировка и переводы строк: «не те» байты дают «кракозябры» после копирования на стенд ---
function encodingNotes(buf) {
	const notes = [];
	if (buf.length >= 3 && buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) {
		notes.push('BOM в начале файла — сохраните UTF-8 без BOM');
	}
	const text = buf.toString('utf8');
	if (text.indexOf('\uFFFD') >= 0) {
		notes.push('файл не является корректным UTF-8 — пересохраните в UTF-8');
	}
	const crlf = (text.match(/\r\n/g) || []).length;
	const lf = (text.match(/\n/g) || []).length - crlf;
	if (crlf > 0 && lf > 0) {
		notes.push('смешанные переводы строк: CRLF ' + crlf + ', LF ' + lf);
	}
	return notes;
}

// --- Имена верхнего уровня (Sub/Function/Class/Const) ---
function topLevelNames(text) {
	const names = [];
	const lines = text.split(/\r?\n/);
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		if (/^\s*\/\//.test(line)) continue;
		let m = /^\s*(?:Public\s+)?(?:Sub|Function)\s+([A-Za-z_][A-Za-z0-9_]*)/i.exec(line);
		if (m) { names.push({ kind: 'процедура', name: m[1], line: i }); continue; }
		m = /^\s*(?:Public\s+)?Class\s+([A-Za-z_][A-Za-z0-9_]*)/i.exec(line);
		if (m) { names.push({ kind: 'класс', name: m[1], line: i }); continue; }
		m = /^\s*Const\s+([A-Za-z_][A-Za-z0-9_]*)\s*=/i.exec(line);
		if (m) names.push({ kind: 'константа', name: m[1], line: i });
	}
	return names;
}

// --- Использование New <X>.CreateForm(...) ---
function createFormClasses(text) {
	const used = [];
	const lines = text.split(/\r?\n/);
	for (let i = 0; i < lines.length; i++) {
		const m = /New\s+([A-Za-z_][A-Za-z0-9_]*)\s*\.\s*CreateForm/i.exec(lines[i]);
		if (m) used.push({ name: m[1], line: i });
	}
	return used;
}

// --- Класс формы должен быть «<имя файла> + Form» ---
// Правило платформы: у формы-объекта с идентификатором X класс в коде называется X + «Form»
// (в справке: объект TEST → `Class TESTForm: Form`, объект OBJ3592 → `Class OBJ3592Form: Form`;
// на реальном стенде платформа записала в XML формы `<_CMP D101="SCHEDULERForm"/>` для объекта SCHEDULER).
// Имя файла и Id объекта обычно совпадают, но файл может переопределить Id директивой «// ID: SCHEDULER»
// (объекты стенда названы ВЕРХНИМ РЕГИСТРОМ) — тогда класс считаем от неё.
function formObjectId(text, fileName) {
	const lines = text.split(/\r?\n/);
	for (let i = 0; i < Math.min(lines.length, 30); i++) {
		const m = /^\s*\/\/\s*ID:\s*([A-Za-z_][A-Za-z0-9_]*)/.exec(lines[i]);
		if (m) return m[1];
	}
	return fileName.replace(/\.fore$/i, '');
}
function formClassNotes(text, baseName) {
	const notes = [];
	const lines = text.split(/\r?\n/);
	for (let i = 0; i < lines.length; i++) {
		const m = /^\s*(?:Public\s+)?Class\s+([A-Za-z_][A-Za-z0-9_]*)\s*:\s*Form\b/i.exec(lines[i]);
		if (!m) continue;
		const want = baseName + 'Form';
		if (m[1].toLowerCase() !== want.toLowerCase()) {
			notes.push('строка ' + (i + 1) + ': класс формы «' + m[1] + '», а по правилу платформы нужен «'
				+ want + '» (объект «' + baseName + '» + Form = «' + want + '»; на стенде форма не откроется)');
		}
	}
	return notes;
}

const target = process.argv[2] || '.';
const files = fs.readdirSync(target).filter(f => f.toLowerCase().endsWith('.fore')).sort();
const fileTexts = {};
const fileNames = {};
let total = 0;
for (const f of files) {
	const buf = fs.readFileSync(path.join(target, f));
	const text = buf.toString('utf8');
	fileTexts[f] = text;
	fileNames[f] = topLevelNames(text);
	const d = lint(text);
	for (const note of encodingNotes(buf)) d.push({ line: 0, message: note });
	for (const note of apostropheNotes(text)) d.push({ line: 0, message: note });
	for (const note of nullComparisonNotes(text)) d.push({ line: 0, message: note });
	for (const note of missingPlusNotes(text)) d.push({ line: 0, message: note });
	for (const note of formClassNotes(text, formObjectId(text, f))) d.push({ line: 0, message: note });
	total += d.length;
	if (d.length === 0) {
		console.log('OK   ' + f);
	} else {
		console.log('WARN ' + f);
		for (const x of d) {
			console.log('    ' + (x.line > 0 ? 'line ' + (x.line + 1) + ': ' : '') + x.message);
		}
	}
}

// ===================== проверки по проекту целиком =====================
console.log('--- проверки по проекту ---');
let projectWarnings = 0;
let projectInfos = 0;

// 1) Имена, встречающиеся в нескольких файлах: это НОРМАЛЬНО, если файлы попадут в разные
//    модули, и КОНФЛИКТ, если оба файла скопируют в один модуль (например, обе части формы).
//    Поэтому выводим как ИНФО — с пояснением, что именно проверить.
const seen = {};
for (const f of files) {
	for (const n of fileNames[f]) {
		const key = n.name.toLowerCase();
		if (seen[key] === undefined) {
			seen[key] = { name: n.name, kind: n.kind, files: [f] };
		} else if (seen[key].files.indexOf(f) < 0) {
			seen[key].files.push(f);
		}
	}
}
for (const key of Object.keys(seen)) {
	const s = seen[key];
	if (s.files.length > 1) {
		console.log('ИНФО ' + s.kind + ' «' + s.name + '» встречается в файлах: ' + s.files.join(', '));
		if (s.kind === 'класс') {
			console.log('     — ок, если это одна и та же форма (после слияния класс объявляется один раз)');
		} else {
			console.log('     — ок для разных модулей; при копировании этих файлов в ОДИН модуль будет конфликт имён');
		}
		projectInfos++;
	}
}

// 2) New <X>.CreateForm, где класс <X> не объявлен ни в одном файле проекта (форма не создастся)
const declared = {};
for (const f of files) {
	for (const n of fileNames[f]) {
		if (n.kind === 'класс') declared[n.name.toLowerCase()] = true;
	}
}
for (const f of files) {
	for (const u of createFormClasses(fileTexts[f])) {
		if (!declared[u.name.toLowerCase()]) {
			console.log('WARN ' + f + ':' + (u.line + 1) + ' — New ' + u.name + '.CreateForm: класс '
				+ u.name + ' не объявлен в проекте (ожидается «Class ' + u.name + '»)');
			projectWarnings++;
		}
	}
}

if (projectWarnings === 0) {
	console.log('OK   «висячих» CreateForm не найдено');
}

console.log('---');
console.log('Файлов: ' + files.length + ', предупреждений в файлах: ' + total
	+ ', предупреждений по проекту: ' + projectWarnings + ', информационных отметок: ' + projectInfos);
process.exit(total + projectWarnings > 0 ? 1 : 0);
