# REFERENCE — справочник по Форсайт и языку Fore

> **Назначение.** Справочные данные для разработки на платформе **Форсайт (Prognoz Platform)** и языке
> **Fore**: API и интерфейсы, перечисления, рецепты, правила линтера, проверенные факты и ссылки на
> официальную справку. Файл перенесён из предыдущего проекта и очищен от его специфики — общая часть
> применима к любому проекту на Форсайт/Fore.
>
> **О текущем проекте** — §1. Планировщик задач (ключевое здесь) — **§5.16**; рецепты — §6;
> правила линтера — §9; статус фактов (что подтверждено, а что нет) — §11.
>
> **Быстрые ссылки:** сводная карта управления задачей — **§5.22**; диагностика расписания —
> **§6.16**; сценарий «под ключ» — **§6.17**; глоссарий терминов — **§14**.
> GUI (формы и контролы) — **§5.23–§5.29**; рецепты GUI — **§6.19–§6.20**.
> Стандартная библиотека (System/IO) — **§5.30**.
>
> **Правило работы:** при генерации кода на Fore соблюдайте конвенции §4 и прогоняйте
> `node tools/fore-lint-check.js .` до 0 предупреждений.

---

## 1. Кратко о проекте

| Параметр | Значение |
|----------|----------|
| Задача | Планирование задач в **контейнере задач** так, чтобы **равномерно распределить нагрузку по времени** |
| Платформа | Форсайт (Prognoz Platform) 10.8 LTS (справочник применим и к 10.12) |
| Язык | **Fore** (серверные модули) + JavaScript (веб-клиент) |
| Ключевые механизмы | `IScheduledTasksContainer`, задачи `KE_CLASS_TASK_*`, периоды, `Class_`/`Queueing`, `GetResults` |
| Опорные разделы справочника | §5.16 (планировщик), §5.17 (классы объектов), §6.11–6.12 (рецепты) |

**Идея балансировки (кратко):**

```
развести старты задач по времени  +  распределить задачи по классам (Class_ → отдельные очереди,
потоки делятся между классами поровну)  +  включить Queueing (без наложений)  →
шаг подбирать по фактическим длительностям из GetResults
```

Подробнее — §5.16 «Контейнер задач: состав, планирование и балансировка нагрузки».

---

## 2. Структура проекта

| Путь | Роль |
|------|------|
| `REFERENCE.md` | Этот файл — справочник по Форсайт и Fore |
| `FORELANG.md` | Руководство по языку Fore (выжимка из `OldDocumentsForsite/Fore`, Fore 9.9) |
| `OldDocumentsForsite/` | Распакованные CHM-справки: `Fore` (язык), `KeFore`, `KeReport`, `Report`, `KeSom`, `TabSheet`, `KnowledgeBase` (+ `_ForeLang_Text.txt`) |
| `docs/forsite/` | Извлечённый текст справок (Markdown): локальные дампы 9.9 + `online/` (28 каталогов, 5219 тем 10.8) + `INDEX.md` (10357 тем) + `TOPICS.md` (2257 типов) + `README.md`; генераторы — `tools/extract-forsite.ps1`, `tools/gen-online-urls.ps1`, `tools/fetch-forsite-online.ps1`, `tools/build-forsite-index.ps1` |
| `Fore/` | Исходники: `TaskContainerLib.fore` (чтение/тексты), `TaskPlanner.fore` (анализ и раскладка), `SchedulerForm.fore` (форма «Планировщик» целиком: базовая часть + панель недоступности), `UnavailabilityPlanner.fore` (план недоступности), `UnavailabilityRunner.fore` (материализация плана — §6.21), `UnavailabilityStore.fore` (таблицы — §6.22), `UnavailabilityRecordsForm.fore` (окно ведения), `UnavailNotify.fore` (письма/выгрузки), `UiFactory.fore` + `UiFactoryDemo.fore` (фабрика экранов — §5.28) |
| `docs/sql/` | DDL для стенда: `unavailability-postgres.sql` — таблицы `UNAVAILABILITY` / `UNAVAILABILITY_PLAN`; `unavailability-plan-runs-postgres.sql` — миграция «состояния запусков + журнал» (`unavailability_log`); `unavailability-run-log-postgres.sql` — журнал ВЫПОЛНЕННЫХ запусков (`unavailability_run_log`); `responsible-for-task-postgres.sql` — `responsible_for_task`; **пересоздание**: `unavailability-recreate-postgres.sql` (psql, DROP + `\ir` штатных DDL) и `unavailability-recreate-all-postgres.sql` (самодостаточный, собирается `tools/make-db-recreate.js`) |
| `docs/DEPLOY.md` | **Инструкция по развёртыванию на стенде**: состав переноса, DDL, объекты репозитория, ссылки на сборки, константы, контролы и привязка обработчиков, задача-диспетчер, чек-лист приёмки, диагностика, откат |
| `docs/mockups/` | Макеты форм (PNG): `form-planner.png`, `form-records.png`, `form-responsible.png` — подписи контролов из кода; `form-planner-simplified.png` (v1) и `form-planner-simplified-v2.png` (v2: подписи к данным + разбор дублей) — **предложения** по упрощению формы «Планировщик» (§5.33); перегенерация — `tools/make-mockups.py`, проверка геометрии — `tools/mockups-check.py` |
| `TaskConf/` | Выгрузка объектов стенда (`.pef`): форма «Планировщик», задачи ETL, журналы |
| `_extract/` | Код форм/модулей, извлечённый из `TaskConf/*.xml` в `.fore` (корректная кодировка) |
| `tools/fore-lint-check.js` | Автономный порт линтера расширения FORE Language (проверка `.fore`) |
| `tools/make-mockups.py` | Генератор макетов форм в PNG (Pillow): `form-planner.png`, `form-planner-simplified.png`, `form-planner-simplified-v2.png`, `form-records.png`, `form-responsible.png`; печатает предупреждение, если подпись не влезла в отведённую ширину |
| `tools/mockups-check.py` | Проверка макетов: наложения контролов (попарно по прямоугольникам) и список обрезанных подписей; код возврата 1 при наложениях |
| `tools/fore-refs-check.js` | Проверка ссылок на контролы: `UiFind(Map_, "Имя")` обязан быть в описании экрана, `SetAutoSize`/`PlaceInGroup` — в описании или объявлениях, `AnchorGroup`/`PlaceInGroup` — по имени блока `GROUP`. Ловит обращения к удалённым контролам (входит в `check-all.js`) |
| ТЗ / план проекта | Будет добавлено |

> Из предыдущего проекта (кнопка «Экспорт») переносим приёмы: создание объекта через
> `CreateCreateInfo` + `ClassID` + `CreateObject`; работа с «Документом» (`KE_CLASS_DOCUMENT`, код 3329);
> экспорт отчёта через `ExportToFile`; формирование отчёта с параметрами; проверка `.fore` линтером.

---

## 3. Платформа Форсайт: базовые понятия

- **Репозиторий (метабейз)** — хранилище объектов (`Metabase`). Доступ из кода: `MetabaseClass.Active`.
- **Объект репозитория** адресуется по `Id` (строка) или `Key` (число). Часто используется
  `mb.ItemById("ID")` (строго) или `AppMbExt.ItemById("ID", strict := False)` (нестрого, `Null` если нет).
- **Пространства имён** — объекты прикладной области: `mb.ItemByIdNamespace(id, mb.GetObjectKeyById(BA_ID))`.
- **Типы объектов** задаются `MetabaseObjectClass`: `KE_CLASS_DOCUMENT` (Документ), `KE_CLASS_REPORT`
  (Регламентный отчёт) и т. д.
- **«Документ»** — объект-файл: содержимое пишется/читается через `IDocument`
  (`LoadFromFile`, `SaveToFile`, `GetAsStream`).
- **Планировщик** — контейнер `IScheduledTasksContainer`; конкретная задача, напр.,
  `ICalculateReportScheduledTask` (расчёт регламентного отчёта).
- **Веб-клиент** — JS-среда (платформенное пространство `PP.*`; прикладные хелперы добавляет проект).

---

## 4. Язык Fore: синтаксис и конвенции

> **Полное руководство по языку** (типы данных, классы, свойства, интерфейсы, делегаты,
> перечисления, пространства имён, массивы, операции, операторы, исключения, сообщения компилятора)
> — файл **`FORELANG.md`**, скомпилированный из папки `OldDocumentsForsite/Fore` (справка «Fore» 9.9).

**Pascal-подобный**, регистронезависимый, оператор `;` завершает инструкции (часто опускается в конце
последней строки блока).

### Стиль проекта (рекомендуемый)

- Отступ — **табы** (VS Code: `tabSize: 1`, `insertSpaces: false`).
- Присваивание — **`:=`**; объявления — **`Имя: Тип;`**.
- Комментарии — **`//`** (строчный), `{ }` (блочный).
- Заглавные буквы у ключевых слов: `Begin`, `End`, `If`, `Then`, `While`, `For`, `Try`…
- `If … Then` — **в одну строку**; каждому `If` — свой `End If`; вместо `Else If` (с пробелом)
  используйте `ElseIf` (иначе линтер считает это вторым `If`).
- Параметры функции могут иметь значения по умолчанию: `part: Integer = -1`.

> В части legacy-кода проекта встречается **другая** стилистика: присваивание `=`, объявления
> `Имя Тип;`, комментарии-«хвосты» без `//`. Так написан, например, `exmail.txt`. Переносить такой
> стиль в новый код не нужно.

### Объявление модуля/функций

```fore
Const C_ID = "VALUE";

Sub Process;                        // процедура
Begin
	// ...
End Sub Process;

Function Calc(x: Integer; y: Integer = 0): Integer;
Var
	sum: Integer;
Begin
	sum := x + y;
	Return sum;
End Function Calc;
```

### Строковые литералы

Кавычка внутри строки удваивается: `"{""Download"":"""` → текст `{"Download":"`. Числа/строки
конкатенируются через `+`. Перенос строки — `#13 + #10`.

### Частые конструкции

```fore
If cond Then            // комментарий: только однострочная форма дружелюбна к линтеру
	// ...
Else
	// ...
End If;

For i := 0 To n - 1 Do
	// ...
End For;

While Not cursor.Eof Do
	cursor.Next;                 // у IDalCursor шаг вперёд — метод Next, а не MoveNext
End While;

Try
	// ...
Except On e: Exception Do
	Debug.WriteLine(e.Message);
Finally
	// ...
End Try;
```

---

## 5. Ключевые библиотеки и интерфейсы (шпаргалка)

### 5.1. Репозиторий и метабейз

| Тип (сборка) | Ключевые члены (по справке 10.8 LTS) |
|--------------|----------------------------------------|
| `IMetabase` (Metabase) | `Item` (по ключу), `ItemById`, `ItemByIdNamespace`, `GetObjectKeyById`, `GetObjectKeyByIdNamespace`, `CreateCreateInfo`, `CreateFindInfo`/`Find`, `CreateObject`, `FetchItem`/`FetchItemById`/`FetchItems`, `GetItems`, `DeleteObject`, `MoveObject`, `SpecialObject`/`SpecialObjects`, `Cache`, `Root`, `PrivateFolder`, `Security`, `GetCurrentStamp` (дата/время сервера СУБД), `GenerateKey: Integer` (уникальный ключ), `LogonSession` (`.User`/`.UserDescription`) |
| `IMetabaseObjectDescriptor` (Metabase) | Свойства: `Key`, `Name`, `Id`, `ClassId`, `Namespace_`, `Parent`, `Params`, `Children`, `Attributes`, `Metabase`; методы: `Bind`*, `Edit`, `EditDescriptor`, `Open(params)`, `OpenWithParam`, `HasAccess`, `GetSecurity` |
| `IMetabaseObject` | Режим редактирования: `Name`, `Id`, `Key`, `Save` |
| `IMetabaseObjectCreateInfo` (Metabase) | `Parent`, `Permanent`, `IsTemporary`, `Id`, `ClassId`, `Name`, `DefaultId`, `DefaultName`, `KeepEdit` |
| `IMetabaseObjectParams` (Metabase) | `CreateEmptyValues`, `FindById`, `FindByKey`, `Add`, `Count`, `Item` |
| `IMetabaseObjectParamValues` (Metabase) | `FindById`, `FindByKey`, `Item`, `Count`, `CreateCopy`, `EqualTo` |
| `IDocument` (Fore; базовый `IDocumentBase`) | `FileName`, `MimeType`, `Size`, `CreationDate`, `ModificDate`; `LoadFromFile`, `LoadFromStream`, `SaveToFile`, `SaveToStream`, `GetAsStream` |
| `IMetabaseStreamObject` | `Stream` (потоковые данные объекта) |
| `MetabaseObjectClass` (enum) | Классы объектов: `KE_CLASS_DOCUMENT` (3329), `KE_CLASS_PROCEDURALREPORT` (2562), `KE_CLASS_TASK_*`… — см. §5.17 |
| `MetabaseSpecialObject` (enum) | Специальные объекты: `DefaultDatabase` (7), `RdsDatabase` (6), `SharedParams` (3), … |

\* `Bind` не приведён в выборке страницы справки, но используется в коде проекта.

> **Важно (сверено со справкой 10.8 LTS):**
> - у `IMetabase` **нет** метода `FindById` — нестрогий поиск делайте через `Find(CreateFindInfo)`/
>   `FetchItemById` или обёртку проекта `AppMbExt.ItemById(id, strict := False)`;
> - поле документа — `IDocument.FileName` (с большой «N»), не `Filename`;
> - поток — `IMemoryStream` / `IIOStream` (класс `MemoryStream`), а не абстрактный `IStream`;
> - **бизнес-приложение** — это класс с кодом `10496` (`MetabaseObjectMetaclass.DBA_CLASS`, есть только
>   в 10.8). `Descriptor.Parent` даёт владельца объекта, `Descriptor.ClassId` — числовой класс
>   («для проверки используйте `MetabaseObjectClass`»); подъём по `Parent` до `ClassId = 10496` —
>   способ найти БП задачи (см. §6.18).

```fore
mb := MetabaseClass.Active;
desc := mb.ItemByIdNamespace("REP_MM_09", mb.GetObjectKeyById(BA_MATERIAL));
params := desc.Params.CreateEmptyValues;
params.FindById("P_BUS_AREA").Value := "0200";
report := desc.Open(params) As IPrxReport;
```

### 5.2. Регламентные отчёты и экспорт

| Тип (сборка) | Ключевые члены |
|--------------|----------------|
| `IPrxReport` (Report) | `ActiveSheet`, `Sheets`, `DataArea`, `Name`, `Key`, `Controls`, `UserButtons`, `Options`; методы `Recalc`, `SaveToFile`, `SaveToStream`, `LoadFromFile`, `LoadFromStream`, `RefreshDataSources`; активный отчёт — `IPrxReportClass.ActiveReport` |
| `IPrxReportExporter` (Report, наследует `IExporter`) | Свойства `Report`, `ExportObjects`, `ExportFormulas`, `ExportObjectAsBitmap`, `ExportRange`, `Sheet`, `ExportFromWeb`; методы `ExportToFile` (унаследован), `StartBatchCommand`/`FinishBatchCommand`, `LoadSettings`/`SaveSettings`, `IsExportToPdfAvailable` |
| `IPrxTable` / `ITabSheet` (Tab) | `(report.ActiveSheet As IPrxTable).TabSheet`; свойства `Columns`, `Rows`, `Row`, `Cell`, `MaxNotEmptyColumn`, `MaxNotEmptyRow`; методы `Recalc`, `Clear` |
| `ITabRange` (Tab) | Диапазон ячеек (`Sheet.Columns(0, n)`, `Sheet.Row(i)`): `ColumnWidth`, `ColumnPixelWidth`, `Hidden`, `RowHeight`, `RowPixelHeight`, `AdjustWidth`* |

\* `AdjustWidth` встречается в примере проекта, но в выборке страницы `ITabRange` не найден
(вероятно, скрыт усечением) — проверьте на стенде.

**Поддерживаемые форматы:** `xlsx`, `xls`, `pdf`, `rtf`, `ppxt`, `html`, `mht`, `ods`, `emf`, `png`
(для `png` — задать `ExportRange`).

> **`ExportToFile` — единственный документированный метод экспорта.** Базовый интерфейс `IExporter`
> (сборка **Drawing**, каталог `ModDrawing`) содержит свойства `CSSClassName`, `Encoding`, `ExportFromWeb`
> и только метод `ExportToFile`; класс `PrxReportExporter` (сборка `Report`) — тоже без `ExportToStream`.
> Для `IDtConsumer`/ETL есть отдельный механизм выгрузки (§5.13).

```fore
exporter := New PrxReportExporter.Create;
exporter.Report := report;
exporter.ExportObjects := True;
exporter.ExportFormulas := True;
exporter.ExportToFile(fileName, "xlsx");   // ← подтверждённый способ
```

### 5.3. Планировщик

| Тип (сборка) | Ключевые члены |
|--------------|----------------|
| `IScheduledTasksContainer` (Fore) | `Tasks`; **наследует `IScheduledTask`**: `Properties`, `State`, `TaskChecker`; методы `CreateChecker`, `CreateInvokeEvent`, `ExecuteImmediate` (выполнить задачу сейчас), `GetResults`, `ResetResults` |
| `ICalculateReportScheduledTask` (Report) | `SourceReport`, `FormatTag`, `Printer`; методы `GetExportSettings`, `PutExportSettings`, `ReadResult` |
| `IScheduledTaskProperties` (Fore) | **`Active`** — активность задачи (**не `Enabled`!**), `Period`, `CreatePeriod(...)`, `ParamValues`, `Queueing`, `UserTag`; почта прямо из задачи: `SendMail`, `MailRecipients`, `CopyMailRecipients`, `HiddenMailRecipients`, `MailSubject`, `MailBody`, `AppendAttachment`, `DynamicMailListModule`/`DynamicMailListMacro`; выгрузка — `FtpAddress` |
| `IScheduledTaskPeriodDaily` (Fore) | `StartDateTime`, `EveryDays` (+ унаследованные `StopDateTime`, `Type`; методы `Assign`, `Next`) |
| `ScheduledTaskPeriodType` | `Daily`, `Weekly`, `Monthly`, `Timely`, `OneTimeOnly`, … |
| `IScheduledTask` (Fore) | Базовый интерфейс задач: `Properties`, `State`, `TaskChecker`; методы `CreateChecker`, `CreateInvokeEvent`, `ExecuteImmediate`, `GetResults`, `ResetResults` |
| `IScheduledTaskResult` (Fore) | Запись истории: `Key`, `StartDateTime`, `FinishDateTime`, `Finished`, `Succeeded`, `Messages`, `FileExtension`, `HasDataStream`; метод `ReadDataStream` |
| `IScheduledTaskPeriod` (Fore) | Базовый период: `StopDateTime`, `Type`; методы `Assign`, `Next` |
| `IScheduledTaskPeriodWeekly`/`Monthly`/`Timely`/`OneTimeOnly` (Fore) | Weekly: `StartTime`, `DaysOfWeek`, `EveryWeeks`; Monthly: `StartTime`, `Day`, `DayOfWeek`, `WeekOfMonth`, `Months`; Timely: `StartDateTime`, `TimeInterval` |
| `IExecuteSubScheduledTask` (Fore) | Задача «выполнение модуля»: `Assembly`, `SubName` |
| `IMetabaseObjectDescriptors` (Metabase) | Коллекция описаний объектов: `Count`, `Item`, `Add` (ограниченно), `Remove*`; **`Tasks` контейнера имеет именно этот тип** |

> `ReadResult` применяется **когда `FormatTag` не задан**. При заданном `FormatTag` задача сама
> сохраняет результат в файл указанного формата.
>
> **Создание задачи** — через `CreateCreateInfo` (`ClassID := MetabaseObjectClass.KE_CLASS_TASK_*`) +
> `CreateObject(...).Edit`, а **не** через `Tasks.Add` (см. §6.5): свойство `Tasks` у контейнера — это
> коллекция описаний `IMetabaseObjectDescriptors` (только перечисление задач).
>
> Полный состав контейнера (типы задач, периоды, чекеры, алерты, балансировка нагрузки) — **§5.16**.

### 5.4. Справочники (рассылка/данные)

| Тип (сборка) | Ключевые члены |
|--------------|----------------|
| `IRdsDictionaryInstance` (Rds) | `Elements`, `Attributes`, `Dictionary`, `ParamValues`, `BigElements`; методы `Data(i)`, `CreateDimInstance`, `CreateLookup`, `CreateSearch`, `Update`, `Insert`, `Delete` |
| `IRdsDictionaryElements` | `Count`, `Data(i).Value(attrIndex)` |
| `IRdsAttributes` | `Count`, `Item(i).Id` |

### 5.5. СУБД (DAL)

| Тип (сборка) | Ключевые члены |
|--------------|----------------|
| `IDatabaseInstance` (KeDb) | `Connection` |
| `IDalCommand` (Dal) | Свойства `SQL`, `Params`, `Connection`, `Type`; методы `Parse`, `CreateCursor`, `DescribeCursor`, `Execute`, `Prepare`, `Close` |
| `IDalCursor` (Dal) | Свойства `Fields`, `Command`; методы **`Eof`** (это метод), **`Next`** (шаг вперёд), `Close` |

```fore
command := db.Connection.CreateCommand(sql);
command.Parse;
cursor := command.CreateCursor;
If Not cursor.Eof Then
	name := cursor.Fields.Item(0).Value;
End If;
cursor.Close;
command.Close;
```

**Запись данных (INSERT/UPDATE/DELETE) — через транзакцию соединения** (пример справки для
`IConnectionTransaction.CreateCommand`):

```fore
db := mb.ItemById("BD").Open(Null) As IDatabaseInstance;
connect := db.Connection;                                   // ISecurityConnection
command := connect.CreateCommand("Insert Into Table_1 values ('A',1)");
tran := connect.StartTransaction(False);                     // IConnectionTransaction
Try
	command.Execute;                                         // возвращает число обработанных записей
	tran.Commit;
Except
	tran.Rollback;
End Try;
command.Close;
```

> Состав `IDalCommand`: `SQL`, `Params`, `Connection`, `Type`, `InUse`, `CurrentParamsRow`,
> `MaxParamsRows`; методы `Parse`, `Prepare`/`Unprepare`, `CreateCursor`, `DescribeCursor`, `Execute`,
> `ExecuteWithoutLast`, `NextParamsRow`, `Close`. `IDalCursor` — **только чтение, только вперёд**
> (`Fields`, `Command`; `Eof`, `Next`, `Close`); неиспользуемые курсоры закрывайте сразу.

> **Совет.** У `IDalCommand` есть свойство `Params` — предпочтительнее передавать значения через
> параметры SQL, а не склеивать строку запроса (безопаснее и корректнее по типам).

### 5.6. Почта (SMTP) — для рассылки

**Интерфейсы (сборка Net, каталог `ModNet`):** `INetMailMessage` (`From_`, `To_`, `CC`, `Subject`,
`Body`, `Attachments`), `INetMailAddress` / `INetMailAddressCollection`, `INetAttachment` /
`INetAttachmentCollection`, `INetSmtpClient`, `INetNetworkCredential`.

**Классы-реализации, используемые в проекте:** `CurlMailMessage`, `CurlMailAddress`,
`CurlAttachment`, `CurlSmtpClient` (`CreateWithHostAndPort`, `ThisHostCredentials`, `EnableSsl`,
`Send`), `CurlNetworkCredential`, а также проектный `Creds.Create(Mail)` (учётка техпользователя).

> Альтернатива собственному коду рассылки: планировщик умеет отправлять результат сам —
> см. `IScheduledTaskProperties.SendMail`, `MailRecipients`, `AppendAttachment`, `MailSubject`.

### 5.7. Проектные утилиты (свой код проекта)

| Утилита | Назначение |
|---------|-----------|
| `AppMbExt` | Расширение метабейза: `.Mb`, `.ItemById(id, strict := False)`, `.GetCurrentUser.Name` |
| `DBA.Helper` (JS) | Клиентский помощник: `Download(link)`. **Проектный** (не платформенный) — определение и полный API не найдены, см. §11.3 |
| `FileExt` | `SaveStreamToFile(stream, path, FileExistsBehavior.Overwrite)` |
| `PathExt` | `Split(path)` |
| `Python.InvokeModule(module, func, args...)` | Вызов Python из Fore (напр., `openpyxl`) |
| `MySqlComp`, `CParamManage`, `CParamDictionary` | Работа с SQL-параметрами (пример `UNIT_MM_EXPORT.txt`) |

> `ForeVariantType` — типы значений (`Date` и т. д.), используется при передаче данных в Python.

> Перечисленные утилиты встретились в коде **предыдущего** проекта — их наличие и точные имена в новом
> проекте нужно проверить (справочник по платформенным аналогам — §5.1–§5.6).

### 5.8. Стандартная библиотека .NET-подобных утилит

`Path.GetTempPath`, `Path.Combine`, `Path.GetFileName`, `Path.GetExtension`, `Path.ChangeExtension`,
`File.Exists`, `File.Delete`, `File.Copy`, `Directory.Exists`, `Directory.CreateDirectory`,
`String.Format`, `String.Replace`, `String.Contains`, `String.Left/Right`, `DateTime.Now`,
`Debug.WriteLine`, `TriState.OffOption`.

> Полные списки членов System/IO-классов (`String`, `Array`, `TimeSpan`, `Guid`, `Path`, `File`,
> `Directory`, потоки, читатели/писатели) — **§5.30**.

### 5.9. Сборки и структура ссылок на справку

Шаблоны URL справки (без версии в пути — откроется текущая версия):

- **интерфейсы:** `.../mergedProjects/<Каталог>/interface/<имя>/<имя>.htm`;
- **перечисления:** `.../mergedProjects/<Каталог>/enums/<Имя>.htm`
  (например, `.../KeFore/enums/scheduledtaskstate.htm`, `.../KeSom/enums/metabaseobjectclass.htm`).

Соответствие «тема → каталог»:

| Тема | Каталог | Пример |
|------|---------|--------|
| Metabase (репозиторий) | `KeSom` | `.../KeSom/interface/imetabase/imetabase.htm` |
| Fore (документы, задачи) | `KeFore` | `.../KeFore/interface/idocument/idocument.htm` |
| Report (регламентные отчёты) | `KeReport` | `.../KeReport/interface/iprxreportexporter/iprxreportexporter.htm` |
| Tab (таблицы) | `TabSheet` | `.../TabSheet/interface/itabsheet/itabsheet.htm` |
| DAL (SQL) | `Dal` | `.../Dal/interface/idalcursor/idalcursor.htm` |
| Базы данных | `KeDb` | `.../KeDb/interface/idatabaseinstance/idatabaseinstance.htm` |
| Справочники НСИ | `KeRds` | `.../KeRds/interface/irdsdictionaryinstance/irdsdictionaryinstance.htm` |
| Кубы | `KeCubes` | `.../KeCubes/interface/icubeinstance/icubeinstance.htm` |
| Пивот | `KePivot` | `.../KePivot/interface/ipivot/ipivot.htm` |
| Аналитическая область | `KeExpress` | `.../KeExpress/interface/ieaxdataarea/ieaxdataarea.htm` |
| ETL-приёмники | `KeDt` | `.../KeDt/interface/idtconsumer/idtconsumer.htm` |
| Сеть / почта | `ModNet` | `.../ModNet/interface/inetmailmessage/inetmailmessage.htm` |
| Потоки ввода-вывода | `ModIo` | `.../ModIo/interface/imemorystream/imemorystream.htm` |
| Python | `KePython` | `.../KePython/interface/ipythonmodule/ipythonmodule.htm` |
| Dimensions (справочники/отметки) | `kedims` | `.../kedims/interface/idimselection/idimselection.htm` |
| Drawing (базовый `IExporter` — экспорт) | `ModDrawing` | `.../ModDrawing/interface/iexporter/iexporter.htm` |
| UI-контролы (список/дерево/диалоги) | `KeExtCtrls` | `.../KeExtCtrls/interface/imetabaselistview/imetabaselistview.htm` |
| Приложение и команды (Ui) | `UiLib` | `.../UiLib/interface/iwinapplication/iwinapplication.htm` |
| Коллекции (`ArrayList` и др.) | `ModCollections` | `.../ModCollections/interface/iarraylist/iarraylist.htm` |
| Системные классы (`DateTime`, `TimeSpan`, `CultureInfo`) | `ForeSys` | `.../ForeSys/class/datetime/datetime.htm` |
| Формы и визуальные компоненты | `ModForms` | `.../ModForms/interface/idatetimepicker/idatetimepicker.htm` |
| ETL (задачи/шаги ETL) | `KeEtl` | `.../KeEtl/interface/iexecuteetlscheduledtask/iexecuteetlscheduledtask.htm` |
| Моделирование | `KeMs` | `.../KeMs/interface/icalculatemodelscheduledtask/icalculatemodelscheduledtask.htm` |
| Поисковый индекс | `KeBISearch` | `.../KeBISearch/interface/isearchengineimportscheduledtask/isearchengineimportscheduledtask.htm` |
| Система (культуры, версия) | `ForeSys`, `KeSomHost` | `.../ForeSys/interface/icultureinfo/icultureinfo.htm` |
| ABAC | `KeABAC` | `.../KeABAC/interface/iabacattribute/iabacattribute.htm` |

---

### 5.10. Планировщик: периоды и история выполнения

Типы периодов (`ScheduledTaskPeriodType`): `Daily`, `Weekly`, `Monthly`, `Timely`, `OneTimeOnly`.
Общий предок — `IScheduledTaskPeriod` (`StopDateTime`, `Type`; методы `Assign`, `Next`).

| Период | Свойства |
|--------|----------|
| Daily | `StartDateTime`, `EveryDays` |
| Weekly | `StartTime`, `DaysOfWeek`, `EveryWeeks` |
| Monthly | `StartTime`, `Day`, `DayOfWeek`, `WeekOfMonth`, `Months` |
| Timely | `StartDateTime`, `TimeInterval` (тип **`DateTime`** — интервал: `DateTime.ComposeTimeOfDay(0, мин, 0, 0)`) |
| OneTimeOnly | `StartDateTime`, `StartMode` (`TaskPeriodOneTimeStartMode`: `ByTime` / `OnLogon`) |

**Ручной запуск задачи:** `IScheduledTask.ExecuteImmediate(SaveResult: Boolean): IScheduledTaskResult` —
выполняет задачу в текущем процессе и репозитории, **запущенный планировщик не нужен**, почта/FTP
игнорируются. Альтернатива — событие запуска: `Task.CreateInvokeEvent(DateTime): IScheduledInvoke` →
`Invoke.Invoke(MB)` (пополняет историю); у `IScheduledInvoke` есть `Next: IScheduledEvents` (будущие
события по расписанию) и `Value`; `IScheduledEvents` — `Count`, `Item(i)`, `Pop`, `Push`;
`IScheduledEvent` — `TaskId`, `TaskKey`, `StartDateTime`, `Period`. Событие контейнера —
`Cont.CreateInvokeEvent(DateTime)`.

**Создание/удаление задачи:** `MB.CreateCreateInfo` (`ClassID`, `Id`, `Name`, `Parent`) →
`MB.CreateObject(CrInfo).Edit` → правки → `Save`; удаление — `MB.DeleteObject(Descriptor.Key)`.

Для переменных `DateTime` доступны **операции отношения** (`<`, `<=`, `>`, `>=`) и сложение/вычитание
(`Fore-Language 03_dataTypes`, «Тип данных DateTime») — сравнение времён в коде корректно.

История выполнения: `IScheduledTask.GetResults` → коллекция `IScheduledTaskResult` (`Item(i)`);
у записи — `Succeeded`, `StartDateTime`, `FinishDateTime`, `Messages`, `HasDataStream` (`ReadDataStream`).

`State` (`ScheduledTaskState`): `0 Inactive`, `1 Ready`, `2 Executing`, `3 Succeeded`, `4 Failed`.
`ScheduledTaskPeriodType`: `0 None`, `1 Daily`, `2 Weekly`, `3 Monthly`, `4 OneTimeOnly`, `5 Timely`.

Дата/время собирается через `DateTime.Compose(year, month, day, hour, minute, second, ms)` — метод класса;
компоненты (год/мес/день) берутся у переменной, напр. `DateTime.Now.Year`.
Задачи создаются через `CreateObject` (см. §6.5), контейнер получает их в `Tasks`.

### 5.11. Измерения (Dimensions)

| Тип (сборка) | Ключевые члены |
|--------------|----------------|
| `IDimSelection` (Dimensions) | `Dimension`, `Element`, `SelectedCount`, `FirstDimElement`/`LastDimElement`, `Iterator`; методы `SelectAll`, `DeselectAll`, `SelectElement`, `DeselectElement`, `SelectChildren`, `SelectLevel`, `IsElementSelected`, `CopyTo`, `AttributeToVariant`, `ToString`/`Parse` |
| `IDimSelectionSet` (Dimensions) | `Count`, `Item`, `AllSelected`; методы `Add`, `AddCompound`, `FindById`/`FindByKey`, `BeginUpdate`/`EndUpdate`, `CopyTo`, `Remove*` |
| `IDimElements` (Dimensions) | `Count`, `Name`, `Id`, `Level`, `Children`/`ChildrenCount`, `Owner`, `AttributeValue`; методы `FindById`, `Iterator`, `IsGroup` |
| `IDimInstance` (Dimensions) | `Elements`, `Attributes`, `Selection` |

### 5.12. Кубы и аналитическая область

| Тип (сборка) | Ключевые члены |
|--------------|----------------|
| `ICubeInstance` (Cubes) | `Cube`, `Destinations`, `Sources` |
| `ICubeInstanceDestination` (Cubes) | `Dimensions`, `Cube`, `IsDefault`, `Cached`; методы `CreateDimSelectionSet`, `CreateExecutor`, `Execute`, `FlushCache`, `UpdateCache` |
| `ICubeModel` (Cubes) | `Destinations`, `Dimensions`, `Sources` |
| `IEaxDataArea` (Express) | `DataSources`, `Slices`, `Views`, `Hierarchies`; методы `BeginUpdate`/`EndUpdate`, `Execute`, `Clear`, `InitMetabase` |
| `IPivot` (Pivot) | `DataSource`, `Selection`, `LeftHeader`, `TopHeader`, `Filter`, `Dimensions`; методы `ObtainTable`, `Refresh`, `BeginUpdate`/`EndUpdate`, `FlushDataCache` |

Открытие куба и получение отстроенного варианта:

```fore
cube := cubeDesc.Open(Null) As ICubeInstance;
destination := cube.Destinations.DefaultDestination;
selection := destination.CreateDimSelectionSet;
```

### 5.13. ETL-приёмники (выгрузка таблиц в файл/БД)

| Тип (сборка) | Ключевые члены |
|--------------|----------------|
| `IDtConsumer` (Dt) | `Fields`, `Active`, `KeepCalcFields`, `CalcFieldsErrors`; методы `Open`, `Clear`, `Put`, `PutRow`, `PutProvider`, `ClearFields`, `Close` |
| `IDtExcelConsumerEx` (Dt) | `File`, `Sheet`, `HasHeader`, `ForceFullCalculation`; класс `DtExcelConsumerEx` (xlsx) |
| `IDtTextConsumer` (Dt) | класс `DtTextConsumer` (`DelimitedColumnDelimiter`, `RowDelimiter`, `TextCodePage`) |

Наследники `IDtConsumer`: `IDtExcelConsumerEx`, `IDtTextConsumer`, `IDtDbaseConsumer`, `IDtXmlConsumer`,
`IDtMetabaseConsumer`, `IDtOleDbConsumer`, `IDtRdsConsumer`, `IDtSqlCommandConsumer`, `IDtUserConsumer`.

```fore
consumer := New DtExcelConsumerEx.Create;
consumer.File := "C:\temp\out.xlsx";
consumer.Sheet := "Данные";
consumer.HasHeader := True;
consumer.Open;
consumer.Put(dataArray);
consumer.Close;
```

### 5.14. Python-интеграция

| Тип (сборка) | Ключевые члены |
|--------------|----------------|
| `IPythonUtils` (Python) | класс `PythonUtils`; методы `AddFolderToPythonPath`, `Invoke`, `InvokeModule(module, func, args...)` |
| `IPythonList` / `IPythonDictionary` | передача списком/словарём значений в Python |
| `IPythonModule` / `IPythonObject` | объект/модуль Python |

### 5.15. Журнал и права доступа

| Тип (сборка) | Ключевые члены |
|--------------|----------------|
| `ILog` (Db) | `Database`, `NativeName`, `Fields`; методы `CreateLog`, `DropLog`, `PutRecord`, `UpdateLog`, `AlterLog` |
| `IMetabaseUser` (Metabase) | `Name`, `FullName`, `IsAdmin`, `IsIsa`, `Profile`, `Attributes`; методы `HasAccess`, `GetEffectiveRights`, `MemberOf` |
| `ISecurityDescriptor` / `IAccessControlList` (Metabase) | описание прав объекта / список доступа |
| `ISecuritySubject` (Metabase) | база пользователей и групп: `Name`, `Sid`, `MemberOf` |

**Итерация по элементам справочника:**

```fore
iterator := dimInst.Elements.Iterator;
While iterator.Next Do
	// работа с очередным элементом
End While;
```

---

### 5.16. Контейнер задач: состав, планирование и балансировка нагрузки

Контейнер запланированных задач (`IScheduledTasksContainer`, **наследует `IScheduledTask`**) хранит
задачи — объекты репозитория класса `KE_CLASS_TASK_*`. Перечисление задач — `Tasks`
(`IMetabaseObjectDescriptors`), создание — `CreateCreateInfo` + `ClassID` + `CreateObject` (см. §6.5).

**Типы задач (интерфейс → назначение → свои свойства):**

| Интерфейс | Назначение | Свои свойства |
|-----------|-----------|----------------|
| `IExecuteSubScheduledTask` | Выполнение модуля | `Assembly`, `SubName` |
| `ICalculateReportScheduledTask` | Расчёт регламентного отчёта | `SourceReport`, `FormatTag`, `Printer`, `ReadResult` |
| `ICalculateCubeScheduledTask` | Расчёт вычисляемого куба / загрузчик | `SourceCube`, `SetSelection`/`LoadSelection` |
| `ICubeCacheUpdateScheduledTask` | Обновление кэша куба | `SourceCube`, `DestKey`, `SetSelection`/`LoadSelection` |
| `IMDCalculationScheduledTask` | Многомерный расчёт на сервере БД | `SourceCalculation`, `SetCalculationArgs`/`LoadCalculationArgs` |
| `ICalculateModelScheduledTask` | Расчёт задачи моделирования | `SourceProblem` |
| `IExecuteEtlScheduledTask` | Выполнение задачи ETL | `SourceTask` |
| `ISearchEngineImportScheduledTask` | Обновление поискового индекса | `Engine`, `IsSharedEngine` |

**Общий базовый `IScheduledTask`:** `Properties`, `State`, `TaskChecker`; методы `CreateChecker`,
`CreateInvokeEvent`, `ExecuteImmediate` (запуск сейчас), `GetResults`, `ResetResults`.

**Расписание — периоды** (см. §5.10): `Daily` (`StartDateTime`, `EveryDays`), `Weekly` (`StartTime`,
`DaysOfWeek`, `EveryWeeks`), `Monthly` (`StartTime`, `Day`, `DayOfWeek`, `WeekOfMonth`, `Months`),
`Timely` (`StartDateTime`, `TimeInterval`), `OneTimeOnly` (`StartDateTime`, `StartMode`).
У всех — `StopDateTime`, `Type`; методы `Assign`, **`Next(date)`** (расчёт следующего запуска).

**Условия запуска (чекеры)** — `IScheduledTaskChecker` (`Type`, `Check`, `CheckMsg`):
- `IScheduledTaskModuleChecker` — по результату модуля: `Module`, `Macro`, `ExpectedResult`;
- `IScheduledTaskValidationChecker` — по правилу валидации: `Validation`, `Condition`, `ExceptionCount`.

**События (алерты)** — `IScheduledTaskAlert` (`Type`, `Invoke`, `CheckAlert`, `Next`, `StartLook`,
`StopLook`), коллекция `IScheduledTaskAlerts` (`Add`, `Item`, `Clear`, `Remove*`):
- `IScheduledTaskAuditAlert` — системные события: `ClassId`, `ObjectId`, `ObjectKey`, `Operation`,
  `Result`, `Station`, `UserName`, `UserNameOS`;
- `IScheduledTaskCustomAlert` — настраиваемые события: `EventId`.

**Балансировка нагрузки по времени (ключ для планирования):**

1. **`IScheduledTaskProperties.Class_`** — класс задачи. Для каждого класса планировщик создаёт
   **отдельную очередь, а потоки распределяются между классами «равными частями»** → разводите
   параллельные задачи по разным значениям `Class_`.
2. **Разведение стартов** — задавайте разные `StartTime`/`StartDateTime` (не все на 00:00).
3. **`IScheduledTaskProperties.Queueing`** — не запускать новый экземпляр, пока идёт предыдущий
   (защита от наложения и роста нагрузки).
4. **Фактические длительности** — `GetResults` → `IScheduledTaskResult.StartDateTime`/`FinishDateTime`/
   `Succeeded`; по ним находят «пики» и подбирают шаг.
5. `IScheduledTaskPeriod.Next(date)` — расчёт будущих запусков (анализ пересечений).
6. `props.ParamValues` — параметры задачи; `SendMail`/`MailRecipients`/`AppendAttachment` — рассылка
   результата; `FtpAddress` — выгрузка.

**Классы задач — `MetabaseObjectClass.KE_CLASS_TASK_*` (подтверждено справкой):**

| Код | Константа | Назначение |
|-----|-----------|-----------|
| 5377 | `KE_CLASS_TASK_EXECUTESUB` | Выполнение модуля |
| 5378 | `KE_CLASS_TASK_CONTAINTER` | Контейнер запланированных задач |
| 5379 | `KE_CLASS_TASK_CALCULATECUBE` | Расчёт вычисляемого куба |
| 5380 | `KE_CLASS_TASK_CALCULATEREPORT` | **Вычисление регламентного отчёта** |
| 5381 | `KE_CLASS_TASK_EXECUTEETL` | Выполнение задачи ETL |
| 5382 | `KE_CLASS_TASK_CALCULATEMODEL` | Задача вычисления модели |
| 5384 | `KE_CLASS_TASK_CALCULATEMDCALCULATION` | Многомерный расчёт на сервере БД |
| 5386 | `KE_CLASS_TASK_UPDATE_CUBE_CACHE` | Обновление кэша куба |
| 5387 | `KE_CLASS_TASK_UPDATE_DIMENSION` | Задача обновления измерения |
| 5388 | `KE_CLASS_TASK_SEARCHENGINE_IMPORT` | Обновление поискового индекса |
| 5389 | `KE_CLASS_BPM_SCHEDULEDTASK` | Задача бизнес-процесса |

Источник: `.../KeSom/enums/metabaseobjectclass.htm`. Полный перечень классов объектов — **§5.17**.

---

### 5.17. MetabaseObjectClass — полезные константы (классы объектов репозитория)

Полный список — в справке: `.../KeSom/enums/metabaseobjectclass.htm`. Ниже — то, что реально нужно
на практике (значения подтверждены по справке).

| Код | Константа | Объект |
|-----|-----------|--------|
| 0 | `KE_CLASS_FOLDER` | Папка |
| 4 | `KE_CLASS_NAMESPACE_FOLDER` | Контейнер (папка с собственным пространством имён) |
| 513 | `KE_CLASS_DATABASE` | База данных |
| 777 | `KE_CLASS_LOG` | Журнал |
| 1025…1043 | `KE_CLASS_STDDIM`/`KE_CLASS_CLNDIM`/`KE_CLASS_COMPOUNDDIM`/… | Справочники (табличный, календарный, составной и др.) |
| 1281 | `KE_CLASS_STDCUBE` | Стандартный куб |
| 1282 | `KE_CLASS_CALCCUBE` | Вычисляемый куб |
| 1287 | `KE_CLASS_AUTOCUBE` | Автоматический куб |
| 1289 | `KE_CLASS_CUBELOADER` | Загрузчик в куб |
| 1537…1540 | `KE_CLASS_MODULE` / `KE_CLASS_FORM` / `KE_CLASS_ASSEMBLY` / `KE_CLASS_WEBFORM` | Модуль / форма / сборка / веб-форма |
| 2561 | `KE_CLASS_EXPRESSREPORT` | Экспресс-отчёт |
| **2562** | **`KE_CLASS_PROCEDURALREPORT`** | **Регламентный отчёт** |
| 2822 / 2827 | `KE_CLASS_RUBRICATOR` / `KE_CLASS_WORKBOOK` | БД временных рядов / рабочая книга |
| 3073 | `KE_CLASS_APPSERVER` | **Планировщик задач** (сервер приложений) |
| **3329** | **`KE_CLASS_DOCUMENT`** | **Документ** (файл в репозитории) |
| 3330…3333 | `KE_CLASS_TOPOBASE` / `KE_CLASS_RESOURCEOBJECT` / `KE_CLASS_STYLESHEET` / `KE_CLASS_SHAREDPARAMS` | Карта / ресурсы / таблица стилей / глобальные параметры |
| 3841…3843 | `KE_CLASS_SQLCOMMAND` / `KE_CLASS_PROCEDURE` / `KE_CLASS_MDCALCULATION` | Команда СУБД / процедура / многомерный расчёт |
| 4097 | `KE_CLASS_ETLTASK` | Задача ETL |
| 4353…4355 | `KE_CLASS_RDS_DATABASE` / `KE_CLASS_RDS_DICTIONARY` / `KE_CLASS_RDS_COMPDICTIONARY` | БД НСИ / справочник НСИ / составной справочник НСИ |
| 5121…5125 | `KE_CLASS_MODELSPACE` / `KE_CLASS_MSPROBLEM` / `KE_CLASS_MSMODEL` | Контейнер/задача/модель моделирования |
| 5377…5389 | `KE_CLASS_TASK_*` | Задачи планировщика (см. §5.16) |
| 5889…5891 | `KE_CLASS_CUSTOM_EXTENDER` / `KE_CLASS_CUSTOM_CLASS` / `KE_CLASS_CUSTOM_OBJECT` | Пользовательские классы/метаданные |
| 7937 / 7938 | `KE_CLASS_SECURITY` / `KE_CLASS_AUDITLOG` | Политика безопасности / протокол доступа |
| 8448…8450 | `KE_ADHOC_REPORT` / `KE_ADHOC_DATASOURCES` / `KE_ADHOC_THEME` | Аналитическая панель и её части |
| 9216 / 9217 | `KE_CLASS_DASHBOARD_REPORT` / `KE_CLASS_SEMANTIC_LAYER` | Информационная панель / модель данных |
| 9473 / 10241 | `KE_CLASS_PYTHON_MODULE` / `KE_CLASS_JAVA_MODULE` | Python-модуль / Java-модуль |

**Важные следствия:**

- `KE_CLASS_STORAGE` **в перечислении отсутствует** — для файла-«Документа» использовать
  `KE_CLASS_DOCUMENT` (3329). Это окончательно закрывает сомнение из исходного ТЗ.
- Регламентный отчёт — **`KE_CLASS_PROCEDURALREPORT`** (2562), не `KE_CLASS_REPORT`.
- Планировщик задач — объект класса `KE_CLASS_APPSERVER` (3073).
- Часть классов **нельзя создавать** («Создание объектов не поддерживается»):
  источники данных Excel/DBF/Access/TXT, `KE_CLASS_PIVOT`, `KE_CLASS_DW_*`, `KE_CLASS_REPOSITORY_AUDIT`,
  `KE_CLASS_SHORTCUT_AUDIT` и др.
- Пользовательские классы расширений **не входят** в `MetabaseObjectClass`: их получают через
  `IMetabaseCustomClass.ClassId`, коллекцию `IMetabaseCustomExtender.Classes` или функцию
  `GetMetabaseHelper.GetCustomClassByEnum(BPClasses.<тип>)` (модуль `P10002_METABASE_HELPER` расширения
  «Конструктор бизнес-приложения»).

> Значения приведены по справке (в присланном листинге — версия 10.12; использованные нами константы
> совпадают со справочником 10.8).

---

### 5.18. UI: список/дерево репозитория, диалоги выбора, приложение

**`IMetabaseListView`** (сборка **ExtCtrls**, каталог `KeExtCtrls`) — компонент «список объектов репозитория»:
- свои свойства: `Root` (корневой каталог, содержимое которого показывается), `Filters`, `SelectedObjects`,
  `CheckedObjects`, `Tree`;
- от `IListView`: `Items`, `SelectedItem`, `SelectedCount`, `FocusedItem`, `Columns`, `MultiSelect`,
  `RowSelect`, `SortColumn`, `SortType`, `Style`;
- методы: `FindByDescriptor`, `FindItemByKey`, `GetItemObject`, `SelectElem`, `SelectElemKey`,
  `ShowFindDialog`, `AdjustWidth`.

**`IMetabaseListViewItem`** — элемент списка: **`ObjectDescriptor`** (дескриптор объекта!), `ColumnText`,
`Index`, `Selected`, `Checked`, `Text`, `Data`, `Delete`.

> ⚠ **`SelectedItem` и дескриптор объекта (проверено на стенде).** `SelectedItem` **наследуется от
> `IListView`** и имеет тип `IListViewItem`, у которого **нет** `ObjectDescriptor`. Запись «в лоб»
> `List.SelectedItem.ObjectDescriptor` даёт ошибку **«Неизвестный идентификатор `ObjectDescriptor`»**,
> а привод `List.SelectedItem As IMetabaseListViewItem` — хотя справка его и разрешает («к интерфейсу
> `IMetabaseListViewItem` могут быть приведены значения свойств, унаследованных от `IListView`») —
> **на стенде не сработал**. Надёжные способы получить описание объекта:
>
> | Способ | Как |
> |---|---|
> | **Документированные коллекции** (рекомендуется) | `List.SelectedObjects` — описания выделенных объектов; `List.CheckedObjects` — описания отмеченных флажками. Приводы не нужны вообще |
> | Элемент по индексу строки | `List.Items(List.SelectedItem.Index).ColumnText(1)` → Id, затем `MB.ItemById(id)` — так сделано в **рабочем коде проекта** |
> | `FindByDescriptor` / `FindItemByKey` | возвращают `IMetabaseListViewItem` — этот привод документирован |
>
> Готовые обёртки лежат в `Fore/TaskContainerLib.fore`: `SelectedObjectDescriptor`, `SelectedObjectId`,
> `CheckedObjectDescriptors`, `CheckedObjectIds`, `SetAllRowsChecked`, `CheckRowsByIds` — внутри
> используются `SelectedObjects`/`CheckedObjects`, а резервные способы обёрнуты в `Try`.
> Отдельная сборка не нужна: `IMetabaseListView` — из `ExtCtrls` (уже подключена к модулю формы).

**`IMetabaseTreeList`** (ExtCtrls) — дерево объектов репозитория (`Root`, `SelectedObjects`, …).

**Диалоги выбора объекта** (ExtCtrls): `IMetabaseDialog` — база для `IMetabaseOpenDialog` и
`IMetabaseSaveDialog` (свойства `Filters`, `FilterIndex`, `FolderFilters`, `InitialFolder`, `Root`,
`Title`, `Object`, `Objects`; метод `Execute`). Фильтры: `IMetabaseDialogFilters` (`AddFilter`, `Clear`,
`Remove`, `Count`, `Item`); `IMetabaseDialogMetaclassFilter` (**`ObjectMetaclass` — тип
`MetabaseObjectMetaclass`**, т.е. «группа» классов); `IMetabaseDialogClassFilter` (**`ObjectClass` — тип
`MetabaseObjectClass`**, конкретный класс); `IMetabaseDialogAllFilter`; `IMetabaseDialogCombiFilter`
(`Filters`); общие члены фильтров — `Description`, `IsVisible`, `Clone`.

> ⚠ Два разных перечисления — частая ошибка «Типы 'MetabaseObjectMetaclass' и 'MetabaseObjectClass'
> не совместимы». **`MetabaseObjectMetaclass`** (сборка Metabase) — «группы» классов:
> `FOLDER_CLASS` 0, `DATABASE_CLASS` 512, `DATASET_CLASS` 768, `DIMENSION_CLASS` 1024, `CUBE_CLASS` 1280,
> `FORE_CLASS` 1536, `WORKSPACE_CLASS` 1792, `PIVOT_CLASS` 2048, `REPORT_CLASS` 2560, `BUSINESS_CLASS` 2816,
> `APPSERVER_CLASS` 3072, `DOCUMENT_CLASS` 3328, `SQLCOMMAND_CLASS` 3840, `ETL_CLASS` 4096, `RDS_CLASS` 4352,
> `DW_CLASS` 4608, `ADOMD_CLASS` 4864, `MODEL_CLASS` 5120, `SCHEDULEDTASK_CLASS` 5376, `EXTENDER_CLASS` 5888,
> `SECURITY_CLASS` 7936, `METABASELINK_CLASS` 8192, `ADHOCREPORT_CLASS` 8448, `PYTHON_CLASS` 9472,
> `JAVA_CLASS` 10240, **`DBA_CLASS` 10496 («Бизнес-приложение» — есть только в версии 10.8)**. Используется в `IMetabaseDialogMetaclassFilter.ObjectMetaclass` и
> `IMetabaseObjectFindInfo.ClassId` (последнее принимает значения обоих перечислений).

**Приложение (сборка Ui):** `WinApplication` (`IWinApplicationClass`) — `Instance`, `Globals`, `Windows`,
`GetObjectTarget`, `GetPluginTarget`; статические диалоги — **`InformationBox`**, `ErrorBox`,
`ExclamationBox`, `ConfirmationBox`, `YesNoCancelBox`, `InputBox`, `ShellExecute`.
`IUiCommandTarget` — `Execute(команда, контекст)`, `CreateExecutionContext` (**только настольное приложение**).
`ArrayList` — сборка `Collections` (каталог `ModCollections`).

```fore
// Открыть объект-задачу на редактирование
CommandTarget := WinApplication.Instance.GetObjectTarget(TaskDesc);
CommandTarget.Execute("Object.Edit", Null);
```

**Дополнения по справке:**

- `IMetabaseListView.Root` — тип `IMetabaseObjectDescriptor`; в качестве значения указывается **папка или
  объект-контейнер** (РНС, БД временных рядов, контейнер моделирования, сборка). Полезны также
  `EnableSystemPopupMenu`, `EnableFindAll`.
- `WinApplication.InformationBox(Message: String; [ParentWindow: IWin32Window = Null])` —
  **только настольное приложение** (как и `ErrorBox`, `ExclamationBox`, `ConfirmationBox`,
  `YesNoCancelBox`, `InputBox`).
- `WinApplication.Instance.GetObjectTarget(Object: IMetabaseObjectDescriptor): IUiCommandTarget`;
  `IUiCommandTarget.Execute(Command: String; Context: IUiCommandExecutionContext): Variant` —
  **только настольное приложение**. Полезные команды: `Object.Open`, `Object.Edit`, `Object.Access`,
  `Object.History`, `ShowMetabaseObject`, `ShowMetabaseFolder`, `ShowFindObjects`, `DebugObject`,
  `ShowExportPropSetup`, `Cube.CreateReport`, `Problem.Run`.
- Для хранения произвольных данных у компонента — `IComponent.Data` (Variant) и `Tag`.

### 5.19. DateTime и TimeSpan (сборка System, каталог `ForeSys`)

**`DateTime`** — методы класса (статические): `Now`, `Today`, `Compose`, `ComposeDay`, `ComposeTimeOfDay`,
`Add`, `AddDays`, `AddHours`, `AddMinutes`, `AddSeconds`, `AddMilliseconds`, `AddMonths`, `AddYears`,
`Subtract`, `Difference`, `FromDouble`, `Parse`, `TryParse`, `IsLeapYear`, `DaysInMonth`;
свойства класса: `MaxValue`, `MinValue`, `Ticks`, `Ticks64`, `TimeZoneBias`, `TimeZoneName`.
Свойства переменной: `Year`, `Month`, `Day`, `Hour`, `Minute`, `Second`, `Millisecond`, `DayOfWeek`,
`DayOfYear`, `Date`, `TimeOfDay`, `ToDouble`, `ToString`.

```fore
// Compose — метод класса: сначала берём компоненты у переменной, затем собираем значение
d := DateTime.Now;
start := DateTime.Compose(d.Year, d.Month, d.Day, 6, 0, 0, 0);
```

**`TimeSpan`** — методы класса: `FromDays`/`FromHours`/`FromMinutes`/`FromSeconds`/`FromMilliseconds`,
`Add`, `Subtract`, `Compose`, `FromDouble`, `Parse`; свойства класса: `Zero`, `MinValue`, `MaxValue`;
свойства переменной: `TotalSeconds`/`TotalMinutes`/`TotalHours`/`TotalDays`, `Days`/`Hours`/`Minutes`/`Seconds`,
`Duration`, `Negate`, `ToDouble`, `ToString`.

---

### 5.20. Массивы и коллекции (основы)

#### Массивы (тип `Array`, сборка System, каталог `ForeSys`)

- **Статические (в т. ч. многомерные):** `Ar: Array[10, 15];` — размеры в скобках; доступ `Ar[i, j]`;
  **`Ar.Length`** — общее число элементов (произведение размеров); **`Ar.Rank`** — число измерений.
- **Динамические:** `pathParts: Array Of String;` (пример из рабочего кода проекта); создание —
  оператором `New <Тип>[размеры]`, напр. `data := New Variant[rows, columns];`.
- Члены переменной типа `Array` (класс `Array`): свойства **`Length`**, **`Rank`**;
  методы **`Sort`**, **`IndexOf`/`LastIndexOf`**, **`Concat`**, `GetLowerBound`/`GetUpperBound`,
  `GetType`, `ToSimpleArray`/`ToVariantArray`, `Operation`/`ArrayOperation`.

```fore
// Статический двумерный массив (пример из справки)
Ar: Array[10, 15];
Ar[i, j] := i * j;
Len := Ar.Length;
```

#### Коллекции (сборка Collections, каталог `ModCollections`)

Иерархия: `IEnumerable` → `ICollection` → `IList` → `IArrayList`;
`IDictionary` → `IHashtable`, `ISortedList`; также `IQueue`, `IStack`, `IBitArray`, `IStringList`, `IStringMap`.

- `IEnumerable` — собственных членов нет; обеспечивает `For Each`.
- `ICollection` — `Count`, `CopyTo`. **Все коллекции поддерживают `For Each`** (в т. ч. без наследования от `IEnumerable`).

| Коллекция | Ключевые члены |
|-----------|----------------|
| `ArrayList` (`IArrayList`) | `Add` (**возвращает индекс**), `AddRange`, `Insert`, `Remove`, `RemoveAt`, `Clear`, `Contains`, `IndexOf`, `Sort`, `Reverse`, `BinarySearch`, `GetRange`, `RemoveRange`, `ToArray`, `TrimToSize`, `Clone`, `Capacity`, `Count`, **`Item` (только чтение)** |
| `SortedList` (`ISortedList`) | пары «Ключ-Значение», автоматически отсортированы по ключу (по возрастанию); `Item[ключ]`, `GetByIndex`, `SetByIndex`, `GetKey`, `GetKeyList`, `GetValueList`, `IndexOfKey`, `IndexOfValue`, `ContainsKey`, `ContainsValue`, `RemoveAt`, `Add`, `Remove`, `Clear`, `Count` |
| `Hashtable` (`IHashtable`) | пары «Ключ-Значение» по хеш-коду: `Item`, `Keys`, `Values`, `Add`, `Remove`, `ContainsKey`/`ContainsValue`, `Clone` |
| `Queue` (`IQueue`) | «первый пришёл — первый ушёл»: `Enqueue`, `Dequeue`, `Peek`, `Contains`, `ToArray` |
| `Stack` (`IStack`) | «первый пришёл — последний ушёл»: `Push`, `Pop`, `Peek`, `Contains`, `ToArray` |

```fore
// Динамический массив: добавление, сортировка, поиск
list := New ArrayList.Create;
list.Add(task1);
list.Sort;                    // сортировка по возрастанию значений
idx := list.IndexOf(task1);

// Словарь «ключ-значение» с автоматической сортировкой по ключу
map := New SortedList.Create;
map.Add("01:00", info);
v := map.GetByIndex(0);
k := map.GetKey(0);
```

> **Важно:** `ArrayList.Item` доступно **только на чтение** — для собственного порядка используйте
> **`SortedList`** с ключом-рангом (так сделано в `TaskPlanner.fore`) либо собирайте новый список через `Insert`.

### 5.21. Поиск объектов в репозитории

`IMetabase.CreateFindInfo` → `IMetabaseObjectFindInfo` (условия) → `IMetabase.Find` (поиск):
- `ClassId` — класс объектов; `Text` — текст поиска; `CaseSensitive`, `WholeWordsOnly`;
- `Scope` — область поиска (дескриптор); `ScanNestedNamespaces`, `ScanHiddenFolders`, `InternalObjects`,
  `ContainersContent` — где искать;
- `Attribute`/`AttributeEx` — поиск по значениям атрибутов.

```fore
f := mb.CreateFindInfo;
f.ClassId := MetabaseObjectClass.KE_CLASS_TASK_CONTAINTER;
f.ScanNestedNamespaces := True;
f.InternalObjects := True;
containers := mb.Find(f);   // IMetabaseObjectDescriptors
```

### 5.22. Управление задачей планировщика: сводная карта

Шпаргалка «что за что отвечает» при программной настройке задач (детали — §5.3, §5.10, §5.16;
готовые функции — `Fore/TaskPlanner.fore`, `Fore/TaskContainerLib.fore`):

| Что нужно | Чем делается | Тип / значение |
|-----------|--------------|----------------|
| Найти контейнер задач | `mb.Find(f)` по `KE_CLASS_TASK_CONTAINTER` | §5.21, §6.15, `FindTaskContainers` |
| Перечислить задачи | `(Container.Bind As IScheduledTasksContainer).Tasks` | `IMetabaseObjectDescriptors` |
| Взять задачу для правки | `Descriptor.Edit As IScheduledTask` | фиксируется `Save` |
| Включить/выключить задачу | `Props.Active := True/False` | `Boolean` (**не `Enabled`**) |
| Расписание | `Props.CreatePeriod(тип)` → `Props.Period := period` | `IScheduledTaskPeriod*` |
| Время/частота старта | `period.StartDateTime`, `EveryDays`/`EveryWeeks`/`Months`/`TimeInterval` | по типу периода |
| Очередь планировщика | `Props.Class_ := i Mod Queues` | `Integer` |
| Запрет наложения запусков | `Props.Queueing := True` | `Boolean` |
| Метка ответственного | `Props.UserTag` | `String` (используется в форме) |
| Параметры задачи | `Props.ParamValues` | `IMetabaseObjectParamValues` |
| Рассылка результата | `Props.SendMail`, `MailRecipients`, `MailSubject`, `MailBody`, `AppendAttachment` | из задачи |
| Состояние | `task.State` | `ScheduledTaskState` (0…4) |
| История прогонов | `task.GetResults` → `Item(i).StartDateTime`/`FinishDateTime`/`Succeeded`/`Finished` | `IScheduledTaskResults` |
| Запуск вручную | `task.ExecuteImmediate` | удобно для тестов |
| Сохранить изменение | `(taskObj As IMetabaseObject).Save` | — |

> Свойства `Period`, `Class_`, `Queueing`, `Active` — **записываемые** (подтверждено §6.14, §11.2).
> Общий шаблон правки: собрать дескрипторы → `.Edit` → изменить свойства → `Save` (см. `ApplyPlan`
> в §6.14). Длительность прогона считается как `DateTime.Difference(start, finish)` → `TimeSpan`
> (приём из `GetAverageDurationSeconds`/`GetAverageDurationText`).

---

### 5.23. GUI: основы (сборка Forms, настольное приложение)

Все визуальные компоненты конструктора форм базово реализуют **`IControl`** (наследует
`IComponent`). Форма — класс **`Form`** (сборка `Forms`, каталог `ModForms`).

**Форма `Form`.** Конструктор — **`CreateForm`**. Статические (`IFormClass`): `Active` (параметры
активной формы), `MakeShortcut` (горячие клавиши). Свойства: `ModalResult`, `ParentWindow`,
`Position`, `WindowState`, `WindowStyle`, `Icon`, `MainMenu`, `ActiveControl`, `Constraints`,
`Resources`, `ShowOnTaskbar`, `TopMost`; MDI: `MDIActive`, `MDIChildCount`, `MDIChildren`,
`MDITabLocation`, `MDITabMenu`.
События: `OnCreate`, `OnShow`, `OnHide`, `OnClose`, `OnCloseQuery`, `OnActivate`, `OnDeactivate`,
`OnResize`, `OnCommand`, `OnHelp`, `OnMDIActivate`, `OnMDIClose`.

> **Формы — только настольное приложение** (как `WinApplication.InformationBox`); в веб-клиенте
> GUI-подход иной. Тип `Args` в обработчике зависит от события (для мыши — `IMouseEventArgs`).

**Базовый `IControl`** (есть у всех контролов):

| Группа | Члены |
|--------|-------|
| Геометрия/вид | `Left`, `Top`, `Width`, `Height`, `ClientWidth`, `ClientHeight`, `Align`, `Anchors`, `Color`, `Brush`, `Font`, `Visible`, `Enabled`, `Cursor` |
| Родитель/подсказки | `Parent`, `ParentColor`, `ParentFont`, `ParentShowHint`, `Hint`, `HintTimeout`, `ShowHint`, `HelpContext`, `PopupMenu` |
| Табуляция/текст | `TabOrder`, `TabStop`, `Text`, `Focused` |
| Прочее | `AllowDrag`, `AllowDrop`, `Scrolls` |
| Методы | `SetFocus`, `ClientToScreen`, `ScreenToClient`, `GetImage`, `DoDragDrop` |
| События | `OnClick`, `OnDblClick`, `OnEnter`, `OnExit`, `OnKeyDown`/`OnKeyUp`/`OnKeyPress`/`OnKeyPreview`, `OnMouseDown`/`OnMouseUp`/`OnMouseMove`/`OnMouseWheel`, `OnMouseEnter`/`OnMouseLeave`/`OnMouseHover`, `OnHScroll`/`OnVScroll`, `OnBeginDrag`, `OnDragOver`/`OnDragEnter`/`OnDragLeave`/`OnDragDrop`, `OnControlMove`, `OnControlResize` |

**`IComponent`** (база `IControl`): `Name`, `Tag`, `Data` (произвольные данные),
`ComponentCount`, `Components(i)`.

### 5.24. GUI: контролы (шпаргалка)

| Интерфейс | Компонент | Ключевые члены (сверх `IControl`) |
|-----------|-----------|-----------------------------------|
| `ILabel` | Label | `Alignment`, `Layout`, `AutoSize`, `Transparent`, `WordWrap` |
| `IButton` | Button | `CancelButton`, `DefaultButton`, `ModalResult` |
| `ICustomEdit` | — (база ввода) | `ReadOnly`, `MaxLength`, `AutoSelect`, `SelStart`/`SelLength`/`SelText`, `Modified`, `CanUndo`, `CharacterCasing`; `Clear`, `SelectAll`, `CopyToClipboard`, `CutToClipboard`, `PasteFromClipboard`, `Undo`; событие `OnChange` |
| `IEditBox` | EditBox | + `PasswordChar` |
| `ICheckBox` | CheckBox | `Checked`, `State`, `AllowGrayed`, `Alignment` |
| `IRadioButton` | RadioButton | `Checked`, `Alignment` |
| `IComboBox` | ComboBox | `Items`, `ItemIndex`, `ItemCount`, `Sorted`, `Style`, `DropDownCount`, `DroppedDown`; `ClearEdit`, `SelectAll` |
| `IListBox` | ListBox | `Items`, `ItemIndex`, `MultiSelect`, `SelCount`, `Selected`, `Sorted`, `Columns`, `ItemHeight`, `TopIndex`, `IntegralHeight` |
| `IPanel` | Panel | `Alignment`, `BevelInner`/`BevelOuter`, `BevelWidth`, `BorderWidth`, `BorderStyle`, `FullRepaint` |
| `IGroupBox` | GroupBox | (только унаследованные) |
| `IPageControl` | PageControl | `Pages`, `ActiveSheet`, `Images`, `MultiLine`, `TabPosition`, `Style`, `RaggedRight`, `ScrollOpposite` |
| `IDateTimePicker` | DateTimePicker | `CurrentDate` (значение: дата/время), **`Kind` — что показывает: ЛИБО дату, ЛИБО время** (одновременно нельзя), `Format` (строковый формат: `'dd.MM.yyyy'` / `'HH:mm'`), `DateFormat`, `DateMode`, `AllowEmpty`/`Checked`/`IsEmpty`, `MinDate`/`MaxDate`, `ShowCheckbox`; `Reset`; событие `OnChange` |
| `IMetabaseListView` / `IMetabaseTreeList` | список / дерево репозитория (ExtCtrls) | см. §5.18 |
| `IMetabaseDialog` (+`Open`/`Save`) | диалоги выбора (ExtCtrls) | см. §5.18 |

> Сборки: контролы — `Forms` (`ModForms`), «метабейз»-компоненты — `ExtCtrls` (`KeExtCtrls`).
> `IEditBox`/`IComboBox` наследуют `ICustomEdit` (общие свойства ввода).

### 5.25. GUI: коллекции строк и выбор строк

Коллекция строк — **`IStringList`** (сборка `Collections`, каталог `ModCollections`): `Add`
(возвращает индекс), `Count`, `Item(i)`, `Clear`, `Insert`, `RemoveAt`, `IndexOf`, `Sort`,
`AddRange`, `Text`/`AsString` (склеить/разобрать по разделителю).

`IListBox.Items` / `IComboBox.Items` — коллекция строк; выбранная строка — **`ItemIndex`**
(у списка с `MultiSelect` — `SelCount` и `Selected(i)`).

```fore
lst.Items.Clear;
lst.Items.Add("Строка 1");
lst.Items.Add("Строка 2");
If lst.ItemIndex >= 0 Then
	Debug.WriteLine(lst.Items.Item(lst.ItemIndex));
End If;
```

> Приём: индекс строки `ItemIndex` прямо сопоставляется с элементом модели (`Plan.Item(ItemIndex)`) —
> так показываются **только нужные** строки (напр., затронутые задачи), см. §6.19.

### 5.26. GUI: меню, индикаторы и прочие контролы

| Интерфейс | Компонент | Ключевые члены |
|-----------|-----------|----------------|
| `IMainMenu` (база `IMenu`) | MainMenu | `Items` (коллекция пунктов), `Images`, `AllowUndock` |
| `IMenuItem` | пункт `MainMenu`/`PopupMenu` | `Text`, `Action`, `ShortCut`, `AdditionalShortCuts`, `Checked`, `AutoCheck`, `RadioItem`, `Enabled`, `Visible`, `ImageIndex`, `GroupIndex`, `IsCaption`, `CloseOnCommand`, `DefaultItem`, `Items` (подменю); метод `Click` |
| `IProgressBar` | ProgressBar | `Min`, `Max`, `Position`, `StepSize`, `Orientation`, `Smooth`, `BorderStyle`; методы `StepIt`, `StepBy` |
| `IScrollBox` | ScrollBox | `HScrollPos`, `VScrollPos`, `BorderStyle` |

> Пункты меню описывает `IMenuItem` (общий для `MainMenu` и `PopupMenu`); коллекция пунктов —
> свойство `Items`. Главное меню формы — `Form.MainMenu` (§5.23).
>
> **Привязка данных.** У `IDataGrid` — `DataSource: IUiDataSource`, а у него `Dataset: IUiDataSet`
> (компоненты `UiMemoryTable`/`UiTable`/`UiQuery`/`UiMetabaseDataset`/`UiRdsDictionary`) — см. **§5.29**.
>
> **Итого по GUI:** практически всё подтверждено (см. §5.23–§5.29). Не отысканы лишь подтипы
> коллекций (`IColumn`/`ITreeNode`) — их имена в справочнике не документированы.

### 5.27. GUI: списки, деревья, панели, диалоги (сборка Forms)

| Интерфейс | Компонент | Ключевые члены (сверх `IControl`) |
|-----------|-----------|-----------------------------------|
| `IListView` | ListView | `Items` (`IListViewItems`), `SelectedItem`, `SelectedCount`, `FocusedItem`, `Columns`, `Checkboxes`, `MultiSelect`, `RowSelect`, `Style`, `SortColumn`/`SortType`, `LargeImages`/`SmallImages`/`StateImages`, `GridLines`; методы `AdjustWidth`, `GetItemAt`, `HitTest` |
| `IListViewItems` | коллекция элементов | `Count`, `Item`, `ListView`; методы `Add`, `Insert`, `Clear`, `Delete`, `BeginUpdate`/`EndUpdate` |
| `IListViewItem` | элемент списка | `Index`, `Text`, `ColumnText(i)`, `Checked`, `Selected`, `Focused`, `ImageIndex`, `StateIndex`, `Data`, `ListView`; методы `EditText`, `MakeVisible`, `Delete` |
| `ITreeList` (база `ITreeControl`) | TreeList | `Nodes`, `Columns`, `Selection`, `Selected`, `InnerRoot`, `Checkboxes`, `AutoCheckParent`, `Images`, `StateImages`, `ShowButtons`/`ShowLines`, `Sorted`/`SortColumn`; методы `NodesFilter`, `ShowFindDialog`, `AdjustWidth`, `Sort` |
| `IToolbar` (база `IUiBar`) | Toolbar | `Controls`, `Images`, `ShowCaptions`, `Id`, `MaxHintWidth`; `Dock`, `Float`, `BeginUpdate`/`EndUpdate` |
| `IStatusBar` | StatusBar | `Panels`, `Images`, `SimplePane`, `SizeGrip` |
| `ITimer` | Timer | `Enabled`, `Interval` (+ событие таймера) |
| `ISplitter` | Splitter | `MinSize`, `Style`, `Beveled`, `AutoSnap` |
| `IMemo` (база `ICustomEdit`) | Memo | `Lines` (коллекция строк), `WordWrap`, `ScrollBars`, `WantReturns`, `WantTabs`; `GetLinePos`, `GetCharPos` |
| `IImageList` | ImageList / GlobalImageList | `Count`, `Width`, `Height`, `Item`, `Icon`; `Add`, `AddIcon`, `Clear`, `LoadFromFile`, `LoadFromStream`, `SaveToStream`, `SetOverlay` |
| `IPopupMenu` (база `IMenu`) | PopupMenu | `Items`, `Images`, `AutoPopup`, `Alignment`; метод `Popup` |
| `IFontDialog` | FontDialog | `Font`, `Device`, `Options`, `MinFontSize`, `MaxFontSize`; `Execute` (**настольное**) |
| `IColorDialog` | ColorDialog | `Color`; `Execute` (**настольное**) |
| `ITrackBar` | TrackBar | `Min`, `Max`, `Position`, `Frequency`, `LineSize`/`PageSize`, `Orientation`, `TickMarks`/`TickStyle`, `SelStart`/`SelEnd`; метод `SetTick` |
| `IMonthCalendar` (база `ICommonCalendar`) | MonthCalendar | `CurrentDate`, `BeginDate`/`EndDate`, `MultiSelect`, `FirstDayOfWeek`, `ShowToday`, `WeekNumbers`, `MaxDate`/`MinDate` |
| `IListViewColumn` | столбец ListView | `Caption`, `Width`, `MinWidth`/`MaxWidth`, `Alignment`, `AutoSize`, `SortAscending`, `Visible`, `ImageIndex`, `Index`; метод `Delete` |
| `IDataGrid` (ExtCtrls) | DataGrid (**таблица данных**) | `DataSource` (источник данных), `Columns`/`Rows`, `CellValue`, `Selection`, `AllowEdit`/`AllowAppend`/`AllowDelete`, `Bands`/`RootBands`, `ShowHeaders`/`ShowTotals`, `EnableSort`, `MultiSelect`, `ReadOnly`; `BeginUpdate`/`EndUpdate`, `GetCellCoordAt` |
| `IImageBox` | ImageBox (**картинка**) | `Image`, `AutoSize`, `Center`, `Proportional`, `Stretch`, `Transparent`, `TransparentColor`; метод `LoadImageFromStream` |
| `IFileOpenDialog` / `IFileSaveDialog` (база `IFileDialog`) | FileOpenDialog / FileSaveDialog (**файловые диалоги**) | `FileName`, `FileNames`, `Filter`, `FilterIndex`, `DefaultExt`, `InitialDirectory`, `Title`, `CheckFileExists`/`CheckPathExists`, `ValidateNames`, `ShowHelp`; Open: `MultiSelect`, `ShowReadOnly`/`ReadOnlyChecked`; Save: `OverwritePrompt`, `CreatePrompt`; `Execute` (**настольное**) |

> Дерево репозитория — `IMetabaseTreeList` (ExtCtrls, §5.18) наследует `ITreeList` → `ITreeControl`.
> Списки репозитория (`IMetabaseListView`) наследуют `IListView`. `Images` у меню/списков/панелей —
> это `IImageList`. **Таблица данных** — `IDataGrid` (ExtCtrls) с собственным `DataSource`
> (единственный найденный «привязанный к данным» контрол).
>
> ⚠ `SelectedItem` (унаследован от `IListView`) возвращает `IListViewItem` — **без** `ObjectDescriptor`.
> Описания объектов берите из `SelectedObjects`/`CheckedObjects` (документированы у `IMetabaseListView`),
> либо Id — по индексу строки: `Items(SelectedItem.Index).ColumnText(n)`. Привод
> `As IMetabaseListViewItem` на стенде не сработал — подробнее §5.18.
>
> ⚠ **`Label` не прокручивается.** Для длинного многострочного текста (сводки, логи, расписания)
> берите **`Memo`** (`IMemo`): `Lines` (`IStringList`: `Clear`/`Add`/`AsString`), `WordWrap`,
> `ScrollBars`, `WantReturns`/`WantTabs`, плюс унаследованные от `ICustomEdit` `ReadOnly`, `SelStart`,
> `SelLength`, `SelText`. Полосы прокрутки задаются в **Инспекторе** (свойство `ScrollBars`), так как
> отдельного перечислимого типа для него в справке нет. Текст ставится построчно:
> `Memo1.Lines.Clear; Memo1.Lines.Add('…');`
>
> ⚠ **Колоночное (табличное) представление — `ListView`.** Вид «таблица/отчёт» включается свойством
> `Style`, а его тип — перечисление **`ListViewStyle`** (сборка Forms): `Icon`, `SmallIcon`, `List`,
> `Report` (см. §5.32). Кодом это `Список.Style := ListViewStyle.Report;`. Заголовки столбцов можно
> задать в **Инспекторе** («Колонки» → «Редактор колонок») либо кодом: `Col := Список.Columns.Add;`
> (`IListViewColumns.Add: IListViewColumn`), затем `Col.Caption := …; Col.Width := …;`
> (`IListViewColumn`: `Caption`, `Width`, `MinWidth`/`MaxWidth`, `Alignment`, `Visible`, `AutoSize`;
> у коллекции также `Clear`, `Delete`, `Count`, `Item`). Текст столбца у элемента пишется так:
> `Item.ColumnText(i) := …` (свойство-индекс; в примерах справки — `node.ColumnText(1) := …`).
> Заполнение строк: `Items.Clear` → `Items.Add(<текст 0-го столбца>)` →
> `Items.Item(Items.Count - 1)` → `ColumnText(i) := …`, обёрнутое в `Items.BeginUpdate`/`EndUpdate`.
> Остальное кодом: `GridLines := True` (сетка), `RowSelect := True` (выделяется строка целиком),
> `ShowColumnHeaders := True`, `ReadOnly := True`; сортировка — `SortType` (`ControlSortType`:
> `None`/`Text`/`Custom`), выравнивание значков — `Arrangement` (`ListViewIconArrangement`: `Top`/`Left`).
> Рабочие шаблоны делают это в `SetupPlannerLayout`, `SetupPanelList`, `SetupRecList`, а колонки
> создают `SetupPlanTableColumns` / `SetupRecordsListColumns` / `SetupRecListColumns` — только если их
> ещё нет (`If LV.Columns.Count = 0`).
> **`IDataGrid`** (ExtCtrls) — «настоящая» сетка, но работает только через источник данных
> (`DataSource: IUiDataSource` → `Dataset: IUiDataSet`, реализации `IUiMemoryTable`/`IUiTable`/
> `IUiQuery`/`IUiMetabaseDataset`/`IUiRdsDictionary`), поэтому для показа списка строк проще `ListView`.

### 5.28. GUI: создание и показ формы

Форма-объект репозитория (добавленная в ссылки сборок) создаётся конструктором `CreateForm`;
показ — `Visible := True` либо модально `ShowModal`:

```fore
Sub Button1OnClick(Sender: Object; Args: IMouseEventArgs);
Var
	f: Form;
Begin
	f := New TestForm.CreateForm(Self As IWin32Window);
	f.Visible := True;      // или f.ShowModal;
End Sub Button1OnClick;
```

> `CreateForm([Parent: IWin32Window = Null])`. Без `Parent` созданная форма равноправна текущей;
> с `Parent` — всегда поверх родителя (родитель доступен в `ParentWindow`). `ShowModal` открывает
> форму модально. Только **настольное приложение**.

> ⚠ **Имя класса формы = идентификатор формы-объекта + `Form`.** Модуль формы обязан объявлять класс-наследник
> `Form`, и его имя строится по правилу платформы: **`<Id объекта>` + `Form`** — ВСЕГДА, даже если Id уже
> оканчивается на `Form` (в справке: объект `TEST` → `Class TESTForm: Form`, объект `OBJ3592` →
> `Class OBJ3592Form: Form`). Именно по имени **класса** форму создают
> (`New <ИмяКласса>.CreateForm(Self)`) и находят через ссылку на сборку. Поэтому: объект `SchedulerForm` →
> класс `SchedulerFormForm`, объект `PlanTextForm` → класс `PlanTextFormForm`, объект `Scheduler_COPY` →
> класс `Scheduler_COPYForm`.
> Правила:
> - **одна форма — один класс** (все обработчики этой формы, сколько бы файлов-шаблонов их ни
>   описывало, живут в одном классе);
> - «общими» делают **не классы форм**, а **классы и функции обычных модулей**
>   (`CUnavailWindow`, `CUnavailImpact`, `CUnavailRecord`, `PrepareUnavailabilityPlan`, …) — они
>   доступны любой форме через ссылку на сборку;
> - форму нужно добавить в **«Ссылки сборок»** той сборки/формы, из кода которой её открывают,
>   иначе `CreateForm` класс не увидит;
> - в шаблонах проекта (`Fore/*.fore`) имена классов — рабочие и уже соответствуют правилу:
>   `Class SchedulerFormForm: Form` (одна форма «Планировщик»: и базовый планировщик, и панель
>   недоступности), `Public Class UnavailabilityRecordsFormForm: Form` (окно ведения, оно же
>   используется в `New UnavailabilityRecordsFormForm.CreateForm(...)`), `Public Class PlanTextFormForm: Form`,
>   `Public Class ResponsibleFormForm: Form`, `Public Class PlanParamsFormForm: Form`.
>   Соответствие «имя файла → класс» проверяет линтер: `node tools/fore-lint-check.js Fore` (правило 9).

> ⚠ **Раскладка формы кодом (событие `OnCreate`).** У формы есть свойства `Left`, `Top`, `Width`,
> `Height`, `Position`, `WindowState`, `BorderStyle`, `Color`, `Font` (`Form`), а у любого контрола —
> `Left`, `Top`, `Width`, `Height`, `Visible`, `Align`, `Anchors`, `TabOrder` (`IControl`), поэтому
> «расставить контролы по макету» можно прямо в коде:
>
> ```fore
> Sub MyFormOnCreate(Sender: Object; Args: IEventArgs);
> Begin
> 	Self.Width := 1335;                    // свойства формы
> 	MyList.Left := 20; MyList.Top := 120; MyList.Width := 600; MyList.Height := 240;
> 	MyList.GridLines := True;              // IListView: сетка
> 	MyList.Style := ListViewStyle.Report;   // колоночный вид (перечисление ListViewStyle, §5.32)
> End Sub MyFormOnCreate;
> ```
>
> Событие формы `OnCreate` имеет сигнатуру `(Sender: Object; Args: IEventArgs)` и **оно одно**:
> если код расстановки описан несколькими подпрограммами (`SetupPlannerLayout`, `SetupPanelLayout`),
> вызовите их из одного обработчика. Общий множитель координат (`LayoutK`) удобно держать полем формы —
> тогда подгонка под монитор — правка одного числа. Подробности — `docs/DEPLOY.md` §7.3.

> ⚠ **Динамическое создание компонентов кодом — работает** (справка «Компоненты дизайнера форм», KB;
> подтверждено и справкой языка: `b := New Button.Create; b.Text := 'Кнопка';`).
>
> ```fore
> Class TESTForm: Form
> 	btnRun: Button;
> 	t: Timer;
> 	Sub TESTFormOnCreate(Sender: Object; Args: IEventArgs);
> 	Begin
> 		btnRun := New Button.Create;       // визуальный компонент
> 		btnRun.Parent := Self;             // Self — сама форма; либо контейнер (Panel/ScrollBox/GroupBox)
> 		btnRun.Left := 10; btnRun.Top := 10; btnRun.Width := 120; btnRun.Height := 28;
> 		btnRun.Text := 'Запустить';
> 		btnRun.OnClick := btnOnClick;      // подписка на событие — тоже кодом
> 		t := New Timer.Create;             // невизуальный компонент: Parent не нужен
> 		t.Enabled := False;
> 		t.OnTimer := OnTimer;
> 	End Sub TESTFormOnCreate;
> 	Sub btnOnClick(Sender: Object; Args: IMouseEventArgs);
> 	Begin
> 		// (Sender As Button).Name / .Tag — способ отличить кнопку, если созданы десятки
> 	End Sub btnOnClick;
> 	Sub TESTFormOnClose(Sender: Object; Args: IEventArgs);
> 	Begin
> 		FreeComponent(btnRun); Dispose btnRun;   // визуальный: сначала FreeComponent
> 		Dispose t;                               // невизуальный: достаточно Dispose
> 	End Sub TESTFormOnClose;
> End Class TESTForm;
> ```
>
> Правила и подводные камни:
> - координаты/размеры и «настроечные» свойства (`Style`, `GridLines`, `Kind` пикеров, колонки
>   `ListView`) задаются **только кодом** — в Инспекторе динамических компонентов нет;
> - **утечки памяти:** ссылка на обработчик не даёт сборщику мусора освободить компонент, если у
>   него нет `Parent` (или он невизуальный) — освобождайте через `Dispose`, а визуальные —
>   `FreeComponent` + `Dispose` (в `OnClose`);
> - созданные кодом компоненты **не попадают в структуру формы** (в дизайнере их не видно), поэтому
>   «дорабатываемые руками» панели объявляйте в модуле/дизайнере, а динамику применяйте для
>   массовых/условных элементов;
> - создавать можно любые визуальные компоненты сборки `Forms` (ModForms): `Button`, `Label`,
>   `EditBox`, `Memo`, `CheckBox`, `RadioButton`, `ComboBox`, `ListBox`, `Panel`, `GroupBox`,
>   `ScrollBox`, `PageControl`, `Splitter`, `ProgressBar`, `TrackBar`, `ListView`, `TreeList`,
>   `DateTimePicker`, `MonthCalendar`, `ImageBox`, `Toolbar`, `StatusBar`; невизуальные — `Timer`,
>   диалоги (`FileOpenDialog`/`FileSaveDialog`/`FontDialog`/`ColorDialog`), `ImageList`;
> - при десятках кнопок экономнее **один общий обработчик** + разбор `Sender`/`Name`/`Tag`, чем
>   отдельная процедура на каждую кнопку.

> 🧩 **Фабрика экранов — `Fore/UiFactory.fore`.** Готовый модуль, который создаёт компоненты по
> текстовому описанию (spec) и возвращает карту «имя → компонент»:
>
> ```fore
> Specs := UiSpecsFromText('GROUP;Grp;Данные;10;10;400;200' + UI_CRLF
> 	+ 'BUTTON;BtnSave;Сохранить;20;30;120;26;OnSave;Parent=Grp');
> Map := UiCreate(Self, Specs);                 // Self — форма (или любой контейнер)
> Btn := UiFind(Map, 'BtnSave') As Button;
> Btn.OnClick := OnSave;                        // подписка на событие кодом
> UiSetTimerEnabled(Map, 'Tmr', True);
> // ... в OnClose формы:
> UiFree(Map);                                  // FreeComponent + Dispose по каждому компоненту
> ```
>
> | Что | Функции |
> |---|---|
> | Описания «в коде» | `UiSpec`, `UiLabel`, `UiButton`, `UiEdit`, `UiMemo`, `UiCheck`, `UiCombo`, `UiListBox`, `UiGroup`, `UiPanel`, `UiScrollBox`, `UiProgress`, `UiPicker`, `UiTimer` |
> | Описание из текста и обратно | `UiSpecsFromText`, `UiSpecsToText` |
> | Создание и освобождение | `UiCreate`, `UiCreateOne`, `UiFree`, `UiFreeOne` (⚠ тело `UiFreeOne` **отключено** — TODO: освобождение памяти разбираем позже) |
> | Доступ по имени | `UiFind`, `UiNameOf`, `UiNameOfCtl`, `UiCtlText`, `UiSetCtlText`, `UiChecked`, `UiSetChecked`, `UiMemoAdd`, `UiMemoClear`, `UiCtlLinesText`, `UiSetProgress`, `UiSetTimerEnabled`, `UiButtonsOf` |
> | Служебные | `UiPlace`, `UiSplitText`, `UiStrToInt`, `UiField`, `UiSpecKeyValue` |
>
> Формат строки: `Kind;Name;Caption;Left;Top;Width;Height;Handler;Значение;Min;Max[;Parent=Имя]`;
> строки для `MEMO/COMBO/LISTBOX` — через «|»; вложенность — ключом `Parent=Имя` (можно дописывать в
> конец строки, порядок полей не важен). Демонстрация «экран целиком из кода»:
> `Fore/UiFactoryDemo.fore` — 22 компонента (группы, поля, список, журнал, прогресс, таймер), все
> кнопки работают через **один общий обработчик** с разбором `Sender`. Проверка spec-текста:
> `node tools/fore-ui-spec-check.js` — проверяет **все** `*SpecText` проекта (демо-форма и рабочие формы:
> `SchedulerForm`, `UnavailabilityRecordsForm`, `ResponsibleForm`): имена, числовые координаты и что
> `Parent=` ссылается на **ранее** объявленный контейнер (`GROUP`/`PANEL`/`SCROLLBOX`).

> 🧩 **Рабочие формы проекта переведены на «spec + фабрику»** (компоненты не объявляются вручную):
>
> | Элемент шаблона | Что делает |
> |---|---|
> | `Map_: SortedList` | карта «имя → контрол», которые вернула фабрика |
> | `ScreenSpecText: String` | описание динамической части экрана (кнопки, поля, метки, Memo, панели) — координаты в единицах макета |
> | `CreateFormComponents` | создаёт таблицы/пикеры/диалоги, если их нет (`If IsNull(X)`), затем `Map_ := UiCreateScaled(Self, UiSpecsFromText(ScreenSpecText), LayoutK)`, присваивает «алиасы» полям и подписывает кнопки на их обработчики |
> | `Setup*Layout` | размещает только таблицы/пикеры (динамические контролы позиционирует spec) |
> | `CreateFormComponents; Setup*Layout;` | вызывается из `OnCreate` формы |
>
> Добавить контрол = **одна строка в `ScreenSpecText`** (объявление и размещение не нужны). Текст
> кнопки, координаты и имя обработчика — колонки описания; в шаблоне по-прежнему остаётся одна строка
> подписки (`Ctl := UiFind(Map_, "Btn…") As Button; Ctl.OnClick := …`), потому что обработчики — не данные.
>
> **Почему объявления контролов в классе остались (это «алиасы», а не место создания).** В классе
> по-прежнему есть строки вида `PlanTable: ListView;`, но это **не** создание компонента в дизайнере:
> значение полю присваивает `CreateFormComponents` (`X := UiFind(Map_, "X")` или `X := New X.Create`).
> Смысл — **типизированный доступ**: тело обработчика остаётся прежним (`PlanTable.Items.Add(...)`,
> `UnavailSummaryMemo.Lines.Add(...)`, `ChainNameEditBox.Text`), компилятор видит конкретный тип
> (`ListView`/`Memo`/`EditBox`), а не `Variant`. Варианты, если «поля-алиасы» не нужны:
> 1) брать контрол из карты по месту — `UiButton(Map_, "BtnBuild").Enabled := False;` (или аксессоры
>    `UiEdit/UiMemo/UiList`), тогда объявления удаляются, но каждая строка обработчика начинает
>    работать с `Variant`;
> 2) объявлять **локальную** переменную в каждом обработчике (`Var B: Button; Begin B := UiFind(...)`);
> 3) оставить привязку не к полю, а к событию через `Sender As Button` (как в `UiFactoryDemo`).
> Выбран вариант с полями-алиасами: минимум правок в проверенной логике и лучший контроль типов.
>
> **Координаты внутри контейнера — относительные.** Как в дизайнере (и в VCL): у компонента, чей
> `Parent` — контейнер (`GroupBox`/`Panel`/`ScrollBox`), `Left`/`Top` считаются **от клиентской области
> родителя** (у `GroupBox` сверху ещё подпись ≈15 px). Поэтому в описании для детей указывайте смещения
> внутри контейнера, а не координаты на форме. Если удобнее держать абсолютные (как в макете) —
> включите константу `UI_SPEC_ABS_COORDS = True`: фабрика вычтет положение контейнера (для `Panel`
> и `ScrollBox` точно, для `GroupBox` — с поправкой на подпись; поддержан один уровень вложенности).
>
> **Что пока остаётся вне spec и почему:** `ListView` (нужны колонки: тип коллекции `Columns` в справке
> не документирован), `MetabaseListView`/`MetabaseTreeList` (колонки и корень задаёт Инспектор),
> `DateTimePicker` (свойство `Kind` — дата ИЛИ время; имя перечисления не документировано), файловые
> диалоги. Все они создаются конструктором при `= Null`, поэтому форма одинаково работает и с
> дизайнером, и «целиком из кода». Если на стенде подтвердятся `Columns.Add` и перечисление для `Kind`,
> эти контролы тоже уйдут в описание.

> **Команды между формами (передача данных «в форму»).** Документированный способ передать данные
> из одной формы в другую: получатель создаётся конструктором `CreateForm`, после чего ему отправляется
> команда — `SendCommand(Command: String; [Argument: Variant = Null]): Variant` (синхронно, возвращает
> результат) или `PostCommand(...)` (выполнится после текущей процедуры). Обработка — в событии формы
> **`OnCommand(Sender: Object; Args: ICommandEventArgs)`**, где `Args.Command` — имя команды,
> `Args.Argument` — переданный аргумент, `Args.Result` — результат для вызывающей стороны.
> Класс формы-получателя должен быть объявлен как **`Public Class <Имя>: Form`**, а в «Ссылки сборок»
> вызывающей формы нужно добавить ссылку на форму-получателя. Пример из справки (и наш случай —
> окно «Ведение ответственного»):

```fore
// вызывающая форма (класс получателя виден как тип)
DestForm: ResponsibleFormForm;
DestForm := New ResponsibleFormForm.CreateForm(Self As IWin32Window);
Res := DestForm.SendCommand("EditResponsible", TaskId);    // Command + Argument
DestForm.ShowModal;                                        // обработка — в OnCommand получателя

// форма-получатель (объект ResponsibleForm → класс ResponsibleFormForm)
Public Class ResponsibleFormForm: Form
	Sub ResponsibleFormOnCommand(Sender: Object; Args: ICommandEventArgs);
	Begin
		If Args.Command = "EditResponsible" Then
			TaskId := Args.Argument As String;
			Args.Result := True;
		End If;
	End Sub ResponsibleFormOnCommand;
End Class ResponsibleFormForm;
```

> Заголовок окна формы — свойство `Text` (`Self.Text := "…"`).

### 5.29. GUI: доступ к данным на форме (таблица, источник, набор данных)

Компоненты доступа к данным — сборка **`ExtCtrls`** (`KeExtCtrls`). Цепочка: визуальная таблица →
источник → набор данных.

**`IDataGrid`** (DataGrid, §5.27) — визуальная таблица; её `DataSource: IUiDataSource`.

**`IUiDataSource`** (`UiDataSource`) — «канал» данных: `Dataset: IUiDataSet`, `Enabled`, `State`;
методы `Edit`, `IsLinkedTo`.

**`IUiDataSet`** — базовый набор данных (реализуют `UiMemoryTable`, `UiTable`, `UiQuery`,
`UiMetabaseDataset`, `UiRdsDictionary`):

| Группа | Члены |
|--------|-------|
| Позиция/состояние | `Active`, `Bof`, `Eof`, `RecNo`, `RecordCount`, `State`, `IsEmpty`, `CachedDataset` |
| Навигация | `First`, `Last`, `Next`, `Prior`, `MoveBy`, `Open`, `Close`, `Refresh` |
| Правка записей | `Append`, `Edit`, `Post`, `Cancel`, `Delete`, `Truncate` |
| Поля/фильтр | `Fields`, `FieldByName`, `Filter`, `Filtered` |
| События | `OnBeforeOpen`/`OnAfterOpen`, `OnBeforeClose`/`OnAfterClose`, `OnBeforeScroll`/`OnAfterScroll` |

Реализации:
- `IUiMemoryTable` (`UiMemoryTable`) — таблица в памяти;
- `IUiTable` (`UiTable`) — `Database`, `TableName`, `ReadOnly`, `Exists`;
- `IUiQuery` (`UiQuery`) — `Database`, `SQL`, `Params`, `ParamCheck`;
- `IUiMetabaseDataset` (`UiMetabaseDataset`) — `Dataset` (реляционный источник данных);
- `IUiRdsDictionary` (`UiRdsDictionary`) — `Object` (справочник НСИ), `FetchAll`.

```fore
// на форме: DataGrid1: DataGrid; DataSource1: UiDataSource; Query1: UiQuery;
DataSource1.Dataset := Query1;        // источник ↔ набор данных
Query1.SQL := "select * from t";
Query1.Open;                          // выполнить запрос
DataGrid1.DataSource := DataSource1;  // таблица ↔ источник
Query1.First;                         // навигация: First/Next/Prior/MoveBy
Query1.Edit;                          // правка: Edit → Post/Cancel
```

### 5.30. Стандартная библиотека: System и IO

**Сборка System (каталог `ForeSys`).**

**`String`** (класс + переменная):
- методы класса (статические): `Format`, `Concat`, `Join`, `Chr`, `ASCII`, `Space`, `Replace`,
  `Insert`, `Remove`, `Contains`, `Find`, `Left`, `Right`, `Mid`, `Length_`, `PadLeft`/`PadRight`,
  `ToLower`/`ToUpper`, `Trim`/`TrimStart`/`TrimEnd`, `StartsWith_`/`EndsWith_`, `Min_`/`Max_`;
- свойства переменной: `Length`, `Chars(i)`;
- методы переменной: `SubString`, `Split`, `IndexOf`/`IndexOfAny`, `LastIndexOf`/`LastIndexOfAny`,
  `StartsWith`/`EndsWith`, `IsEmpty`, `Copy`.

**`Array`**: `Length`, `Rank`, `GetLowerBound`/`GetUpperBound`, `GetType`, `IndexOf`/`LastIndexOf`,
`Sort`, `Concat`, `ArrayOperation`/`Operation`, `ToSimpleArray`/`ToVariantArray` (см. §5.20).

**`Double`**: методы класса `Round` (→ `Double`), **`RoundInt` (→ целое)**, `Floor`/`FloorInt`,
`Ceiling`/`CeilingInt`, `Parse`, `TryParse`; у переменной — `ToString`. Приведение к целым секундам
в проекте: `Sec := Double.RoundInt(AvgSeconds);`.

**`TimeSpan`**: см. §5.19; дополнительно `TotalMilliseconds`, `Milliseconds`, `Duration`, `Negate`,
`Compose`, `FromDays`/`FromHours`/`FromMinutes`.

**`Guid`**: `IsGuid`, `Parse`, `TryParse`; у переменной `ToString`.

**`Debug`**: `WriteLine`/`Write`, `Assert`/`AssertMsg`, `Fail`, `Indent`/`Unindent`,
`IndentLevel`/`IndentSize`.

**`Exception`**: `Message`, `MessageID`, `Line`, `Source`, `NestedException`, `ReportError`.

**Сборка IO (каталог `ModIo`).**

| Класс | Ключевые члены |
|-------|----------------|
| `Path` | `Combine`, `GetFileName`, `GetFileNameWithoutExtension`, `GetExtension`/`ChangeExtension`/`HasExtension`, `GetDirectoryName`, `GetFullPath`, `GetPathRoot`/`IsPathRooted`, `GetTempPath`/`GetTempFileName` |
| `File` | `Exists`, `Delete`, `Copy`, `Move`, `Open`, `OpenTextReader`/`OpenTextWriter`, `OpenBinaryReader`/`OpenBinaryWriter`, `AppendText`/`AppendBinary`, `GetAttributes`/`SetAttributes`, `GetCreationTime`/`GetLastWriteTime`/`GetLastAccessTime` (+ `Set*`) |
| `Directory` | `Exists`, `CreateDirectory`, `Delete`, `Move`, `Copy`, `GetFiles`, `GetDirectories`, `GetFileSystemEntries`, `GetCurrentDirectory`/`SetCurrentDirectory`, `GetLogicalDrives`, `GetParent` |
| `MemoryStream` (`IMemoryStream`) | `Capacity`, `Position`/`Size`, `Clear`, `Parse`, `ToString`, `CopyFrom`, `ReadByte`/`WriteByte`, `Seek` |
| `FileStream` (`IFileStream`) | конструктор `Create`, `FileName`, `Position`/`Size`, `CopyFrom`, `ReadByte`/`WriteByte`, `Seek` |
| `BinaryReader`/`BinaryWriter` | `Stream`; чтение/запись `ReadBoolean`/`ReadInteger`/`ReadDouble`/`ReadString`/`ReadDateTime`/`ReadChar` (+`Write*`), `ReadListBegin`/`ReadListEnd`, `Flush` |
| `TextReader` | `Encoding`, `Eof`, `WordDelimiters`; `ReadLine`, `ReadToEnd`, `ReadWord`, `ReadString` |
| `TextWriter` | `Encoding`, `WordDelimiter`; `WriteString`, `WriteWord`, `WriteLnString`/`WriteLnInteger`/…, `Flush` |

> `Path`/`File`/`Directory` — **только статические** методы; для множества операций есть
> `FileInfo`/`DirectoryInfo`. Потоки `MemoryStream`/`FileStream` — базовый `IIOStream`.

#### 5.30.1. Подводные камни языка (по факту стенда)

1. **`Object` «обрезает» данные — для ссылок на компоненты/интерфейсы используйте `Variant`.**
   Если хранить компоненты (например, карту «имя контрола → контрол» в фабрике экранов) в переменных
   типа `Object`, значения теряются: контролы «не работают», вызовы интерфейсов не проходят.
   Рабочая схема: коллекции (`ArrayList`/`SortedList`) хранят `Variant`, а функции-аксессоры
   возвращают/принимают `Variant` и **неявно преобразуют** его к нужному интерфейсу
   (`Ctl := C;` внутри `Try`), см. §5.2 и пример Sample1 из справки по языку.
   > Неявное преобразование `Variant → интерфейс` работает, а при невозможности **генерирует
   > исключительную ситуацию** — поэтому такие присваивания стоит оборачивать в `Try`.
2. **Строковые литералы — только двойные кавычки.** В Fore нет литералов в апострофах: запись
   `Debug.WriteLine('текст')` даёт ошибку компиляции; правильно — `Debug.WriteLine("текст")`.
   Апостроф допустим **внутри** двойных кавычек — именно так собираются SQL-литералы:
   `UnvSqlStr` возвращает `"'" + String.Replace(S, "'", "''") + "'"` (см. §6.22).
   Линтер (`tools/fore-lint-check.js`) теперь это проверяет.
3. **Объявленный в модуле контрол не появляется на форме сам.** Если контрол не размещён в
   дизайнере, поле остаётся `Null`, и обработчики «молчат»: нужны конструктор и родитель —
   `X := New Button.Create; X.Parent := Self;` (§5.28). Совместимая схема «и так, и так» —
   создавать только при `Null` (шаблоны форм так и сделаны: `CreateFormComponents`).
4. **Сравнение с `Null` — только через `IsNull(...)`.** Запись `X = Null` / `X <> Null` читается
   неоднозначно; принятая схема — `If IsNull(X) Then` / `If Not IsNull(X) Then` (свойство ForeSys
   «признак отсутствия значения в переменной»). Составные условия: `If IsNull(A) Or IsNull(B) Then`,
   `If (Not IsNull(L)) And (L.Count > 0) Then`; признак можно присвоить: `Ok := Not IsNull(Cur);`.
   Присваивание `X := Null;` остаётся как есть. Проверяется линтером (п. 7 в шапке `fore-lint-check.js`).
6. **Исключение в обработчике события модальной формы закрывает окно.** Если в `OnCreate`/`OnClick`
   вылетает ошибка (недоступное свойство, не сработавшее приведение интерфейса/подтипа, недоступная
   история задачи), модальный цикл прерывается и форма исчезает — без внятного сообщения (типичный
   симптом «кликнул по задаче — форма закрылась»). Правило: в обработчиках **все внешние чтения — в
   `Try`**, а результат сбоя пишем в журнал и в метку формы. Примеры из шаблонов: `BindScheduledTask`,
   `GetTaskPeriodText` (только базовые `Type`/`Next`, без приведения к `IScheduledTaskPeriodDaily`),
   `GetLastSucceededText`/`GetAverageDurationText`, `TaskPlanner.ApplyPlan` (каждая задача в своём `Try`).

   ```fore
   Stage := "расписание (Period)";
   Try
       NextStartTextLabel.Text := GetTaskPeriodText(Props);
   Except On e: Exception Do
       Debug.WriteLine("Планировщик: сбой на шаге «" + Stage + "»: " + e.Message);
       NextStartTextLabel.Text := "сбой: " + e.Message;
   End Try;
   ```
7. **В склейке строк `+` нужен в начале КАЖДОЙ строки продолжения.** При переносе длинного текста
   пропущенный `+` — не ошибка компиляции, а **тихая потеря** части текста (именно так «съедался»
   хвост описания экрана в `ScreenSpecText`). Правильно:

   ```fore
   Return
       "первая строка" + #13 + #10
       + "вторая строка" + #13 + #10
       + "третья строка";
   ```

   Линтер ловит строку продолжения, начинающуюся с `"` без `+` (п. 8 в шапке `fore-lint-check.js`).

### 5.31. Чтение таблицы репозитория (сборка Db, `IDatasetInstance`)

Любой реляционный источник данных репозитория (присоединённая таблица, запрос, представление,
справочник НСИ) открывается по дескриптору и приводится к `IDatasetInstance`: `Fields` — «коллекция
значений полей **текущей** записи», методы `First`/`Next` (переход по записям), `Eof` (признак последней
записи), `Execute`, `CreateBatchUpdate`, `OpenCached`, `Close`.

```fore
Inst := MB.ItemById("MY_TABLE").Open(Null) As IDatasetInstance;   // сборка Db
Inst.First;
While Not Inst.Eof Do
	TId := (Inst.Fields.FindById("TASK_ID").Value As String);      // Value — Variant
	...
	Inst.Next;
End While;
Inst.Close;
```

> Альтернатива (кэш, правка): `Cache := Inst.OpenCached` — в примере справки используются
> `Cache.Bof`/`Cache.Eof`, `Cache.Append`, `Cache.Post`, `Cache.Prior`/`Cache.Next`, `Cache.Close`.
> Файл кэша открывается так же по `Id`, который может совпадать с `native_name` таблицы.

### 5.32. Перечисления компонентов (сборка `Forms`)

Имена перечислимых типов и значения — из справки Forsight 10.9
(`https://help.fsight.ru/10.9/ru/mergedProjects/modforms/enums/…`), сверены по страницам типов:

| Перечисление | Где применяется | Значения |
|---|---|---|
| **`ListViewStyle`** | `IListView.Style` (в т.ч. `IMetabaseListView` — у него `IListView` в предках) | `0 Icon` — крупные пиктограммы; `1 SmallIcon` — мелкие пиктограммы; `2 List` — список пиктограмм; **`3 Report` — таблица** (колоночный вид) |
| **`DateTimePickerKind`** | `IDateTimePicker.Kind` | `0 Date` — ввод/выбор даты; `1 Time` — ввод/выбор времени |
| **`ControlSortType`** | `IListView.SortType` (также `IDimensionViewer.SortType`, `ITreeControl.SortType`, `IMetaAttributeSetting.SortType`) | `0 None` — без сортировки; `1 Text` — по тексту (значения как строки); `2 Custom` — пользовательская через событие (`OnCompareItems`) |
| **`ListViewIconArrangement`** | `IListView.Arrangement` | `0 Top` — по верхнему краю; `1 Left` — по левому краю |
| **`TextAlignment`** | `IListViewColumn.Alignment`, `ITreeListColumn.Alignment`, `ILabel.Alignment`, `IMemo.Alignment`, `IPanel.Alignment`, `IDimensionViewerColumn.Alignment` | `0 Left`; `1 Center`; `2 Right` |
| **`ControlScrollStyle`** | `IMemo.ScrollBars` (и `IScrollBars.ScrollBars`) | `0 None` (значение по умолчанию); `1 Horizontal`; `2 Vertical`; `3 Both` — например, `Memo1.ScrollBars := ControlScrollStyle.Vertical;` |

```fore
// табличный список + колонки кодом (если их нет в Инспекторе)
LV.Style := ListViewStyle.Report;          // без Report список рисует значки
LV.SortType := ControlSortType.Text;
If LV.Columns.Count = 0 Then
	Col := LV.Columns.Add;                  // IListViewColumns.Add: IListViewColumn
	Col.Caption := "Задание";
	Col.Width := 90;
End If;
```

> Полный список типов — страница «Перечисления сборки Forms»
> (`…/modforms/enums/modforms_enums.htm`): там же `DateTimePickerExMode` (для `DateTimePickerEx`),
> `ComboboxStyle`, `ControlAlign`, `ControlBorderStyle`, `ControlScrollStyle` и др.
> Топики (значения перечислений + страницы `ilistview.*`, `ilistviewcolumns.*`) добавлены в
> `tools/forsite-online-urls.txt`, поэтому при следующей выгрузке справки
> (`tools/fetch-forsite-online.ps1`) они попадут и в локальные дампы `docs/forsite/online/`.

**Меню (кнопка с выпадающим меню).** На стенде используется компонент **`MenuButton`** (Forms):
у него есть свойство **`Menu: IPopupMenu`**, которому присваивается компонент `PopupMenu`
(`RespMenuButton.Menu := RespPopupMenu`). Подпись кнопки — `Text`. Меню показывает сама кнопка,
поэтому **пункты строим заранее** (при создании формы, при выборе задачи и после каждой записи
ответственного — `RespMenuBuild`): событие `PopupMenu.OnPopup` в локальном дампе справки не
документировано, на него не полагаемся.

| Что | Как |
|---|---|
| подключить меню к кнопке | `RespMenuButton: MenuButton; ... RespMenuButton.Menu := RespPopupMenu;` |
| пункты | `PopupMenu.Items` (`IMenuItems`): `Clear`, **`Add(Value: IMenuItem)`**; пункт — `Item := New MenuItem.Create; Item.Text := …; Item.OnClick := …;` (`IMenuItem.Data` — свой код действия) |
| остальные «меню» формы | обычные `Button` + `PopupMenu`, показанные методом `IPopupMenu.Popup` — единый `MenuActionOnClick` (код в `Item.Data`) |

> ⚠ На стенде выяснилось, что **`IPopupMenu.Popup` принимает три аргумента**: `Popup(Владелец; X; Y)`,
> где X/Y — координаты в системе родителя окна. Рабочий вызов из формы:
> `M.Popup(Self, Self.Left + (Sender As IControl).Left + Args.pPoint.X, Self.Top + (Sender As IControl).Top + Args.pPoint.Y)`
> — то есть позиция берётся как «координаты формы + координаты кнопки + точка мыши из события»
> (`IMouseEventArgs.pPoint`). Поэтому обработчики-меню имеют сигнатуру
> `Sub MenuXxxOnClick(Sender: Object; Args: IMouseEventArgs)` и передают `Sender`/`Args` в `MenuShow`.

```fore
// Кнопка с меню: список наполняем заранее (кнопка показывает его сама)
RespMenuButton.Menu := RespPopupMenu;            // IMenuButton.Menu: IPopupMenu
RespMenuBuild;                                   // Items.Clear + Items.Add(New MenuItem)

// Обычная кнопка-меню: строим пункты и показываем меню
Sub MenuMoreOnClick(Sender: Object; Args: IMouseEventArgs);
Begin
	MenuMoreBuild;                                // Items.Clear + Items.Add(New MenuItem)
	MenuShow(Sender, Args, MenuMore);             // IPopupMenu.Popup(Владелец, X, Y) — у точки мыши
End Sub MenuMoreOnClick;
```

> ⚠ `New MenuItem.Create` создаёт пункт как компонент (живёт до конца работы приложения). Пересоздавать
> пункты безопасно: перед наполнением делается `Items.Clear`.

**Автомасштаб при изменении размеров окна.** `IControl.Anchors: IAnchors` — **проценты** привязки краёв
компонента к краям родителя: `Right`/`Bottom` = `100` означает, что правый/нижний край «тянется» вместе
с окном (компонент растягивается), `0` — край не двигается; `Left`/`Top` — левый и верхний края
соответственно. В шаблонах это включает константа **`UI_AUTOSIZE_ON_RESIZE`** (`TaskContainerLib.fore`)
и помощник `SetAutoSize(Ctl; StretchRight; StretchBottom)`, который вызывается в конце
`SetupPlannerLayout`/`SetupPanelLayout`/`SetupRecordsLayout`/`SetupRespLayout`:

| Что | Привязка |
|---|---|
| `MetabaseListView2`, `UnavailRecordsList`, `PlanTable`, `StoredPlanTable`, `UnavailSummaryMemo`, `RecordsList`, поля окна ответственного | `StretchRight = True` — тянутся по ширине окна |
| `RespInfoMemo`, ряды нижних кнопок (`BtnAnalyse`…, `BtnRec*`, `BtnResp*`, кнопки панели) | ещё и `StretchBottom = True` — держатся за нижний край окна |

> Координаты остаются макетными (`Place`), меняются только привязки; при `UI_AUTOSIZE_ON_RESIZE = False`
> `SetAutoSize` сбрасывает все четыре процента в `0` — поведение как раньше (компоненты не двигаются).

**Столбцы списков и дерева — кодом.** Коллекции разные: у `ListView`/`MetabaseListView` —
`IListViewColumns` (`Add: IListViewColumn`, `Item(i)`, `Count`, `Clear`, `Delete`), у `TreeList` —
своя `ITreeListColumns` (`Add: ITreeListColumn`). Свойства у колонок одинаковые: `Caption`,
`Width`, **`AutoSize`** (Boolean — «резиновая» ширина: столбец подстраивается под ширину компонента;
если таких столбцов несколько — свободное место делится пропорционально; `Width` при этом не
используется), **`Alignment: TextAlignment`** (`Left`/`Center`/`Right`), `MaxWidth`, `Visible`,
`SortAscending`, `Index`, `Delete`.
> ⚠ **`MinWidth` у «резинового» столбца не задаём** — проверено на стенде: он ломает авторазмер
> (столбец перестаёт тянуться). В помощниках строка закомментирована.
Готовые помощники — в `Fore/TaskContainerLib.fore`: `SetListColumn` и `SetTreeColumn` (подпись +
ширина + растяжка + выравнивание) и `SetColumnsAutoSize` / `SetTreeColumnsAutoSize` (для колонок,
заданных в Инспекторе: минимальная ширина всем, авторазмер — последней).

```fore
If LV.Columns.Count = 0 Then
	Col := LV.Columns.Add;                                       // IListViewColumns.Add: IListViewColumn
	SetListColumn(Col, "Автор", 220, True, TextAlignment.Left);   // True — тянется по ширине списка
	Col := LV.Columns.Add;
	SetListColumn(Col, "Изменено", 160, False, TextAlignment.Center);
End If;
```

Рабочие шаблоны: `SetupPlanTableColumns`, `SetupRecordsListColumns`, `SetupTaskListColumns` — дерево из
шаблона убрано (вместо него окно `PlanTextForm` для плана «текстом»),
поэтому `SetupTreeColumns`/`SetTreeColumn`/`SetTreeColumnsAutoSize` сейчас не вызываются (оставлены
как готовый помощник для `MetabaseTreeList` → `ITreeControl`);
все создают колонки только при `Columns.Count = 0`, иначе включают авторазмер.
У репозиторных списков (`MetabaseListView` с `Root := контейнер`) значения строк
даёт сам компонент, а **привязка колонки к атрибуту объекта в API колонки не описана** — если на стенде
колонки настроены в Инспекторе («Редактор колонок»), код их не трогает и только включает авторазмер.

> ⚠ Виды списков и пикеров ставятся **кодом**, а не в Инспекторе: `ConfigurePeriodPickers`
> (`Kind := DateTimePickerKind.Date` / `.Time`), `SetupPlannerLayout`, `SetupPanelList`, `SetupRecList`,
> `SetupPlanTableColumns`, `SetupRecordsListColumns`, `SetupRecListColumns` (колонки — только если их нет).
> В фабрике экранов (`UiFactory.fore`) пикер `PICKER` создаётся как «дата»
> (`Dp.Kind := DateTimePickerKind.Date`), время задаётся на форме.

---

### 5.33. Удобство использования: как сократить число кнопок

Инвентаризация форм (по коду): «Планировщик» — **34 кнопки** (4 в левой колонке, 30 в панели),
«Ведение недоступности» — 5, «Ведение ответственного» — 2. Уникальных действий на «Планировщике»
~12, остальное — варианты одного и того же:

| Дубли | Кнопки |
|---|---|
| Решения (4) | Не запускать / Перепланировать × (отмеченные / выбранная) |
| Отметки (3) | Отметить затронутые, Отметить все, Снять все |
| Выгрузка (5) | в файл, из файла, CSV, HTML (Excel), план из таблицы в файл |
| План в таблице (4) | сохранить, загрузить, показать, убрать (+ «применить без простоя») |
| Уведомления (2) | «Письма ответственным» (SMTP) и «Разослать уведомление ответственным» (`SendMailMessage`) |
| Фильтр (2) | «Фильтр», «Сброс» |
| Период (3) | «Панель недоступности…», «Взять период», «Ручной ввод периода» (+ «Обновить список периодов») |
| Сервис (3) | «Монитор», «Журнал действий», «Что будет запущено» |

Дополнительно: **20 мест** с модальным «Сначала выберите контейнер / постройте список…» — вместо
этого кнопки должны быть **неактивными** (`Enabled := False`) и включаться по состоянию, а «Применить
план» (переписывает расписание) — спрашивать подтверждение.

**Предложение (макет `docs/mockups/form-planner-simplified.png`, код — после согласования):**
34 кнопки → **14 элементов**: 5 обычных действий (Выбрать контейнер, Изменить ответственного, Анализ,
Применить план, Построить список) + 9 кнопок-меню; внутри меню 31 действие.

| Видимые (5) | Меню (9 кнопок-меню) |
|---|---|
| Выбрать контейнер, Изменить ответственного, Анализ, Применить план (+подтверждение), Построить список; Ранее использованные ответственные ▾ и Ещё ▾ — меню-кнопки в левой колонке | **Недоступности ▾** (ведение, обновить периоды, взять период, ручной ввод; панель — авто при выборе контейнера), **Отметки ▾**, **Решение ▾** (4 решения + задать время + пересчитать раскладку), **План ▾** (сохранить/загрузить/показать/убрать/без простоя), **Выгрузка ▾** (файл, CSV, HTML, из таблицы), **Уведомления ▾** (ваш `SendMailMessage`; SMTP-письма убираются), **Сервис ▾** (журнал, сухой прогон, монитор, проверка хранилища), **Ещё ▾** (редактировать задачу, ответственный…, снять ответственного) |

Механика уже проверена в проекте (`PopupMenu` + `MenuItem.OnClick`, обычная кнопка-«стрелка», окно
ответственного), пунктам меню доступен `MenuItem.ShortCut` (горячие клавиши). Правки коснутся только описания экрана
и подписок — обработчики остаются те же. Макет `form-planner.png` при этом остаётся **текущим**
состоянием (по коду), `form-planner-simplified.png` — предложением к обсуждению.

> ⚠ Макеты-**предложения** (`form-planner-simplified*.png`) сделаны по состоянию кода **до 1.86**: в них ещё
> есть `AffectedList`, пункты «Задать время…»/«Пересчитать раскладку равномерно», файловые сохранение/загрузка
> плана и выгрузка CSV/HTML. Актуальное состояние интерфейса описывает **`form-planner.png`** — он выверен по
> коду 1.86–1.89: 7 рамок-`GROUP`, блоки `Сообщения` (380;118) и `Раскладка (план)` (504;556), `LblStatus` и
> фильтр внутри блока плана, `BtnRecalcPlan` (724;20), `PlanTable` (12;79;912;440) с 10 колонками и
> «крестиками», кнопки `Построить список`/`Отметки ▾`/`Решение ▾` на y = 1180 и `План ▾`/`Выгрузка ▾`/
> `Сервис ▾` на y = 1214; отдельных кнопок «Взять период», «Журнал выполненных запусков», «Письма
> ответственным», «Выгрузить HTML», «Показать сохранённый план» в форме **нет** — это пункты меню.

**Второй макет — `form-planner-simplified-v2.png` (подписи к данным + разбор дублей).**

*Подписи к выводимым данным.* Сейчас значения выводятся «голыми»:
`ResponsiblePersonLabel.Text := Props.UserTag`, `ChainStatusTextLabel.Text := GetTaskStateText(...)`,
`NextStartTextLabel.Text := GetTaskPeriodText(...)`, `LastSuccesfullStartTextLabel.Text := GetLastSucceededText(...)`,
`LabelAvgTimeVal.Text := GetAverageDurationText(...)` — пользователь видит «Готова» или «12.01.2026 06:00»
без пояснения, что это за значение. Подпись есть только у `Label1`, где она склеена в тексте
(`"Ответственный: " + Row.ResponsibleUser`). Предложение: единый вид «подпись: значение» — статичными
`Label` слева (как на макете v2) либо префиксом в тексте (как у `Label1`, без новых контролов), плюс
заголовки блоков (`GroupBox`): «Карточка задачи», «Задачи контейнера», «Периоды недоступности»,
«Период недоступности», «Затронутые задачи», «Раскладка (план)», «Сообщения».

*Дубли данных.*

| Данные | Где повторяются | Решение (макет v2) |
|---|---|---|
| План | `PlanTextMemo` (текстом) + `PlanTable` (8 колонок) + `StoredPlanTable` (копия из таблицы) — **три представления** | оставить один `PlanTable`; текст — «Выгрузка ▾ → Скопировать план текстом»; сохранённый план — отдельным окном сравнения из «План ▾» |
| Новое время запуска | пикеры `NewDatePicker`/`NewTimePicker` + колонка «Дата нового запуска» в `PlanTable` — **два места ввода** | пикеры убрать: правка только в колонке, «Решение ▾ → Задать время…» спрашивает значение диалогом |
| Период недоступности | 4 пикера + строка `UnavailRecordsList` + строка периода в `UnavailSummaryMemo` | пикеры — единственное место правки, строка списка — только выбор («Взять период»), из сообщений период убрать |
| Счётчики затронутых | строка статуса `LblStatus` + сводка `UnavailPlanHeaderText` | **внедрено:** статус считает «пересекается / обрабатывать / перепланировать / не запускать / без обработки» |
| Журнал/монитор/результаты | тот же `UnavailSummaryMemo`, что и сводка (смешаны функции) | отдельный блок «Сообщения» только для результатов операций (`MsgMemo` — сейчас `UnavailSummaryMemo` в блоке «Сообщения») |
| Ответственный | `ResponsiblePersonLabel` (по объекту), `Label1` (по задаче), колонка `PlanTable.Ответственный` | в карточке — одна строка «Ответственный» (+ «по задаче», если отличается); колонка в плане остаётся: нужна для сохранения в таблицу и для писем |
| Состояние задачи | колонка «Состояние» в `MetabaseListView2` и строка карточки | оставить одно из двух (на макете помечено меткой «дубль») |
| «Прогон» | колонки «Плановое время…» в `PlanTable` | это данные «до/после», дублем не является — подписаны как «Плановое время запуска» / «…окончания» и «Дата нового запуска» |

Итого экран сокращается примерно на 450 px по высоте (уходят `PlanTextMemo` — 300 px, `StoredPlanTable`,
2 пикера и многострочная сводка), место отдаётся списку задач — меньше прокрутки. При этом **ничего
не теряется**: убранные представления доступны через меню («План ▾», «Выгрузка ▾»).

**Как это сделано в коде (внедрено).** Блоки — настоящие `GroupBox`: фабрика поддерживает тип `GROUP`
(`UiFactory.fore`: `UI_GROUP = "GROUP"`, ветка `If Spec.Kind = UI_GROUP Then Gr := New GroupBox.Create`,
хелпер `UiGroup(Name; Caption; L; T; W; H)`), поэтому в `ScreenSpecText` добавлены 9 строк `GROUP`,
а контролы внутри блока ссылаются на него через `Parent=<имя группы>`:

```
GROUP;GrpTaskCard;Карточка задачи;26;110;756;240
GROUP;GrpTasks;Задачи контейнера;26;354;756;282
GROUP;GrpPlanText;Сводка плана (текстом);26;638;756;324
GROUP;GrpPeriods;Периоды недоступности;818;106;936;170
GROUP;GrpPeriod;Период недоступности;818;318;936;52
GROUP;GrpAffected;Затронутые задачи;818;374;936;214
GROUP;GrpMsg;Сообщения и сводка;818;672;936;118
GROUP;GrpPlan;Раскладка (план);818;796;936;264
GROUP;GrpStored;Сохранённый план (из таблицы);818;1064;936;110
```

Что важно знать (проверено на этом внедрении):

1. **Порядок создания = z-порядок.** Строки `GROUP` стоят в описании первыми, а в `CreateFormComponents`
   вызов фабрики (`UiCreateScaled`) идёт **раньше** создания таблиц/пикеров конструктором: контрол,
   созданный позже, рисуется выше — иначе `GroupBox` перекрыл бы список задач или таблицу плана.
2. **Дети задаются относительно клиентской области группы.** У `GroupBox` подпись сверху занимает
   ~15 px, поэтому в описании `Top` детей уменьшен: `Top_ребёнка = Top_цели − Top_группы − 15`
   (видно по строкам карточки: `12;15`, `232;15`, `12;43`, …). Если на стенде при другом системном
   шрифте контролы внутри блока «съедут» на 2–4 px — правьте только `Top` детей в описании.
3. **Не всё можно сделать ребёнком группы.** Таблицы и пикеры фабрика не создаёт (их делает
   конструктор), поэтому они остаются на форме, но лежат внутри рамок блоков и рисуются поверх них:
   координаты заданы в `PlannerPlace`/`PanelPlace` (`SetupPlannerLayout`/`SetupPanelLayout`), в
   комментариях указано, в какой блок попадает контрол.
4. **Автомасштаб.** Рамки блоков включаются в `SetAutoSize` хелпером `AnchorGroup("Grp…"; True; False)`
   (полей класса для групп нет — контрол берётся из карты по имени); у детей `Anchors` считаются от
   клиентской области группы, а не от окна.
5. **Глобальный флаг `UI_SPEC_ABS_COORDS` не включаем:** относительные координаты детей — проверенный
   режим (так описана демо-форма `UiFactoryDemo.fore`), а в абсолютном режиме у `GroupBox` пришлось бы
   дополнительно вычитать подпись (~15 px) в `UiPlaceScaled`.

Ещё **не внедрено** из предложений v2 (ждём отдельного решения): удаление дублей данных (третье
представление плана `PlanTextMemo`, вторая таблица `StoredPlanTable`, пикеры нового времени,
многострочная сводка) и кнопки-меню из v1. Сейчас блоки лишь сгруппировали то, что есть, и добавили
подписи к значениям.

**Доработки по замечаниям стенда (внедрено).**

1. **Задача передаётся в форму ответственного.** `MetabaseListView2OnClick` запоминает Id выбранной
   строки в поле `SelectedTaskId_`, а `SelectedTaskId` возвращает сначала его, затем — «живое» выделение
   списка (`SelectedObjectDescriptor`). `EditResponsibleOnClick` берёт Id этим путём и открывает
   `ResponsibleForm` командой `SendCommand("EditResponsible", TaskId)` → поля сразу заполнены из
   `RESPONSIBLE_FOR_TASK` (раньше форма открывалась «с нуля»); если ничего не выбрано — подсказка
   «Сначала выберите задачу в списке задач».
2. **Выпадающий список ответственных** переделан на документированный API (см. §5.32): обычная кнопка +
   `PopupMenu.Popup(...)` + тот же `PopupMenu` на `IControl.PopupMenu` (правая кнопка мыши). Компонента
   `MenuButton`/`IMenuButton` в сборке Forms нет — прежняя привязка `RespMenuButton.Menu := RespPopupMenu`
   и событие `OnPopup` убраны; пункты строит `RespMenuBuild` перед показом.
3. **Отступ от подписи блока.** У детей групп гарантирован зазор ≥ 20 единиц от верхней границы группы
   (подпись `GroupBox` ≈ 15 px): `PlanTextMemo` — `Top = 22` от группы, строка фильтра плана —
   `Top = 20`, пикеры и таблицы в блоках сдвинуты вниз (`PlannerPlace`/`PanelPlace`), а рамки и списки
   подогнаны по высоте (например, фильтр и таблица плана теперь не под надписью «Раскладка (план)»).
4. **Размеры окна — только пиксельные.** По требованию стенда привязки (`Anchors`) отключены:
   в `TaskContainerLib.fore` константа **`UI_AUTOSIZE_ON_RESIZE = False`** (тогда `SetAutoSize`/`AnchorGroup`
   выставляют нулевые якоря, и при развороте окна контролы остаются на своих местах — как было раньше).
   Раскладка задаётся числами: `LayoutK = 0.8`, компоновка поднята на `LAYOUT_TOP_SHIFT = 20`
   (`UiShiftSpecsTop` из `UiFactory.fore` — сдвигаются только контролы верхнего уровня, дети групп едут
   с рамками).
5. **Форма шире, компоненты не перекрываются.** Правая колонка сдвинута вправо и расширена:
   `PANEL_X_SHIFT = +48` (зазор между колонками 72 единицы) и `PANEL_X_GROW = +100` (рамки блоков,
   таблицы плана/сохранённого плана, списки, memo и поле фильтра — шире; у детей-кнопок `Left += +100`,
   чтобы они остались у правого края блока). Размер формы считается как
   `(1780 + PANEL_X_SHIFT + PANEL_X_GROW) × LayoutK` = 1928 × 0.8 ≈ 1542×1040 (влезает на FullHD).
   Реализация — `UiShiftSpecsRight` в `UiFactory.fore` (для описания) и `PanelPlace`/`PlaceInGroup`
   (для таблиц и пикеров).

**Важно (почему «периоды недоступности не работают»).** Списки репозитория (`MetabaseListView2`,
`UnavailRecordsList`) **размещены в дизайнере заранее**, то есть создаются раньше, чем
`ScreenSpecText` создаст рамки `GROUP`. Любой контрол, созданный позже, рисуется **выше**, поэтому рамки
закрывали списки (кликнуть по строкам было нельзя). Метода `BringToFront`/`SendToBack` у `IControl` нет,
поэтому исправление — **вложенность**: контролы внутри блока получают `Parent := <группа>`
(хелпер `PlaceInGroup`), а ребёнок всегда рисуется поверх своей рамки. Так помещены `UnavailRecordsList`,
4 пикера периода, `PlanTable`, `StoredPlanTable`
(координаты — от угла группы, минус высота подписи `GROUP_CAPTION = 15`).

### 6. Рецепты (готовые сценарии)

### 6.1. Формирование отчёта с параметрами

```fore
reportDesc := mb.ItemByIdNamespace(reportId, mb.GetObjectKeyById(BA_MATERIAL));
params := reportDesc.Params.CreateEmptyValues;
params.FindById("P_BUS_AREA").Value := busArea;
params.FindById("P_DATE1").Value := date1;
params.FindById("P_DATE2").Value := date2;
report := reportDesc.Open(params) As IPrxReport;
```

### 6.2. Экспорт в XLSX (+ оформление листа)

```fore
sheet := (report.ActiveSheet As IPrxTable).TabSheet;
sheet.Columns(0, sheet.MaxNotEmptyColumn).AdjustWidth;   // автоподгонка ширины
sheet.Row(1).Hidden := TriState.OffOption;

exporter := New PrxReportExporter.Create;
exporter.Report := report;
exporter.ExportObjects := True;
exporter.ExportFormulas := True;
exporter.ExportToFile(fileName, "xlsx");                  // напр., Path.GetTempPath + "..."
```

### 6.3. Сохранение в репозиторий как «Документ»

```fore
desc := AppMbExt.ItemById(docId, strict := False);
If desc = Null Then
	createInfo := mb.CreateCreateInfo;
	createInfo.Parent := AppMbExt.ItemById(docFolder);
	createInfo.Permanent := False;
	createInfo.Id := docId;
	createInfo.ClassId := MetabaseObjectClass.KE_CLASS_DOCUMENT;
	createInfo.Name := Path.GetFileName(fileName);
	docObj := mb.CreateObject(createInfo).Edit;
Else
	docObj := desc.Edit;
End If;
With document: docObj As IDocument Do
	document.LoadFromFile(fileName);
End With;
docObj.Save;
```

### 6.4. Скачивание из веб-клиента

```fore
// Серверная часть: вернуть ссылку (JSON) для клиента
link := String.Format("{0}&attach=1&fileName={1}", desc.Key, desc.Name);
Return "{""Download"":""" + link + """}";
```

```javascript
// Клиентская часть (обработчик кнопки): инициировать скачивание
DBA.Helper.Download('<link>');   // link = "<Key>&attach=1&fileName=<Name>"
```

### 6.5. Задача планировщика на расчёт отчёта

Задача — это объект репозитория класса `KE_CLASS_TASK_*`, создаётся через `CreateObject`.
**Не** `Tasks.Add`: `Tasks` у контейнера — это `IMetabaseObjectDescriptors` (только перечисление).

```fore
// 1. Создание задачи в контейнере
createInfo := mb.CreateCreateInfo;
createInfo.Parent := mb.ItemById("SCHEDULED_TASKS");
createInfo.ClassID := MetabaseObjectClass.KE_CLASS_TASK_CALCULATEREPORT;  // код 5380
createInfo.Id := "DAILY_REPORT_TASK";
createInfo.Name := "Ежедневный расчёт отчёта";
taskObj := mb.CreateObject(createInfo).Edit;

// 2. Настройка задачи расчёта отчёта
calcTask := taskObj As ICalculateReportScheduledTask;
calcTask.SourceReport := mb.ItemById("SOURCE_REPORT").Bind As IPrxReport;
calcTask.FormatTag := "xlsx";

// 3. Расписание
props := calcTask.Properties;
period := props.CreatePeriod(ScheduledTaskPeriodType.Daily) As IScheduledTaskPeriodDaily;
period.StartDateTime := DateTime.Compose(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 6, 0, 0, 0);  // 06:00
props.Period := period;
props.Active := True;

// 4. Сохранение
taskObj.Save;
```

### 6.6. Рассылка по e-mail (по мотивам `exmail.txt`)

Адресаты — из справочника (`IRdsDictionaryInstance`), письмо — `CurlMailMessage`,
вложение — `CurlAttachment`, отправка — `CurlSmtpClient`:

```fore
message := New CurlMailMessage.Create;
message.To_.Add(New CurlMailAddress.Create(email));
message.From_ := New CurlMailAddress.Create(fromAddr);
message.Subject := subject;
message.Body := body;
message.Attachments.Add(New CurlAttachment.Create(filePath));
cred := New CurlNetworkCredential.Create(techUser.Login, techUser.Password, "SGC");
client := New CurlSmtpClient.CreateWithHostAndPort(techUser.Host, 587);
client.ThisHostCredentials := cred;
client.EnableSsl := True;
client.Send(message);
File.Delete(filePath);
```

### 6.7. Экспорт данных куба в Excel-шаблон (xlsm) через Python

`ICubeInstance` → `IEaxDataArea`/`IPivot` → `IPivotTable` → данные → `Python.InvokeModule`
(`openpyxl`) в шаблон `DOC_MM_XLSMTEMPLATE`. Используется в `UNIT_MM_EXPORT.txt` /
`UNIT_CE_CCUBEDATAEXPORTER.txt`. Применять, только если целевой отчёт — не регламентный.

### 6.8. Фиксированный SQL получения наименования СП (пример правки)

```sql
SELECT NAME FROM (
    SELECT NAME FROM ba_material.MM_BUS_AREA WHERE BUS_AREA = '<BUS_AREA>' AND SOURCE_SYSTEM = 'sapbw'
    UNION
    SELECT NAME FROM ba_material.MM_BUS_AREA WHERE BUS_AREA = '<BUS_AREA>' AND SOURCE_SYSTEM = 'global'
)
```

---

### 6.9. Ручной запуск задачи и чтение истории

```fore
container := mb.ItemById("SCHEDULED_TASKS").Bind As IScheduledTasksContainer;
container.ExecuteImmediate;                        // выполнить задачу сейчас (удобно для тестов)

results := container.GetResults;                   // история выполнения
result := results.Item(0);                         // последняя запись
Debug.WriteLine("Старт: " + result.StartDateTime.ToString);
Debug.WriteLine("Успех: " + result.Succeeded.ToString);
```

Коллекция `IScheduledTaskResult` даёт `StartDateTime`, `FinishDateTime`, `Succeeded`, `Messages`,
`HasDataStream`; сам результат можно вычитать через `ReadDataStream`.

### 6.10. Варианты расписания задачи

```fore
// Период «через интервал»
period := props.CreatePeriod(ScheduledTaskPeriodType.Timely) As IScheduledTaskPeriodTimely;
period.StartDateTime := DateTime.Now;      // начало отсчёта
period.TimeInterval := intervalValue;      // интервал запуска (тип TimeSpan)
props.Period := period;

// Еженедельный период
weekly := props.CreatePeriod(ScheduledTaskPeriodType.Weekly) As IScheduledTaskPeriodWeekly;
weekly.StartTime := startTimeValue;        // время запуска
weekly.EveryWeeks := 1;
props.Period := weekly;

props.Active := True;
```

> Типы значений `TimeInterval` / `StartTime` уточнить по справке; свойство активности — `Active`.

---

### 6.11. Перечисление задач контейнера и их настроек

```fore
container := mb.ItemById("SCHEDULED_TASKS").Bind As IScheduledTasksContainer;
tasks := container.Tasks;                          // IMetabaseObjectDescriptors

For i := 0 To tasks.Count - 1 Do
	task := tasks.Item(i).Bind As IScheduledTask;
	props := task.Properties;
	Debug.WriteLine("Задача: " + tasks.Item(i).Name);
	Debug.WriteLine("  Активна: " + props.Active.ToString);
	Debug.WriteLine("  Класс (Class_): " + props.Class_.ToString);
	Debug.WriteLine("  Состояние: " + (task.State As Integer).ToString);   // 0..4, см. §5.10
End For;
```

### 6.12. Равномерное разведение задач по времени и классам

```fore
container := mb.ItemById("SCHEDULED_TASKS").Bind As IScheduledTasksContainer;
tasks := container.Tasks;

For i := 0 To tasks.Count - 1 Do
	taskObj := tasks.Item(i).Edit;                 // редактирование задачи
	task := taskObj As IScheduledTask;
	props := task.Properties;

	// 1) Развести старты: окно с 01:00, шаг 5 минут на задачу
	period := props.CreatePeriod(ScheduledTaskPeriodType.Daily) As IScheduledTaskPeriodDaily;
	period.StartDateTime := DateTime.AddMinutes(
		DateTime.Compose(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 1, 0, 0, 0), i * 5);
	props.Period := period;

	// 2) Разнести по очередям планировщика (потоки делятся между классами поровну)
	props.Class_ := i Mod 4;

	// 3) Не накладывать запуски одного задания
	props.Queueing := True;

	taskObj.Save;
End For;
```

> Фактические длительности прогонов берите из `task.GetResults` (`StartDateTime`/`FinishDateTime`/
> `Succeeded`) — по ним подбирайте шаг старта и число очередей (`Class_`).

---

### 6.13. Наполнение формы данными из контейнера задач

**Выбор контейнера** — диалогом с фильтром по классу (в форме «Планировщик»; ниже — вариант с точным
классом, см. предупреждение о двух перечислениях):

```fore
// Точный фильтр по КОНКРЕТНОМУ классу объектов (ObjectClass : MetabaseObjectClass)
Filter := New MetabaseDialogClassFilter.Create;
Filter.ObjectClass := MetabaseObjectClass.KE_CLASS_TASK_CONTAINTER;
Filter.Description := "Контейнер запланированных задач";
MetabaseEtlOpenDialog.Filters.Clear;
MetabaseEtlOpenDialog.Filters.AddFilter(Filter);
MetabaseEtlOpenDialog.FilterIndex := 0;
If MetabaseEtlOpenDialog.Execute(Self) Then
	Cont := MetabaseEtlOpenDialog.Object;   // выбранный контейнер
End If;
```

> ⚠ **`ObjectMetaclass` ≠ `ObjectClass`.** Свойство `IMetabaseDialogMetaclassFilter.ObjectMetaclass` имеет
> тип **`MetabaseObjectMetaclass`** — это «группы» классов (`FOLDER_CLASS` = 0, `SCHEDULEDTASK_CLASS` = 5376,
> `APPSERVER_CLASS` = 3072, `ETL_CLASS` = 4096, …). Присваивание значения `MetabaseObjectClass.KE_CLASS_*`
> даёт ошибку компилятора **«Типы 'MetabaseObjectMetaclass' и 'MetabaseObjectClass' не совместимы»**.
> Варианты: фильтр по *конкретному* классу — `IMetabaseDialogClassFilter.ObjectClass` (`MetabaseObjectClass`,
> рекомендовано); по *группе* — `(Filter As IMetabaseDialogMetaclassFilter).ObjectMetaclass :=
> MetabaseObjectMetaclass.SCHEDULEDTASK_CLASS;` (покажет все задачи планировщика, включая контейнеры).

**Наполнение списка и вывод сводки** — свойство `Root` показывает содержимое контейнера (его задачи);
сводка плана выводится **в `Memo`** (в `Label` многострочный текст не влезает):

```fore
MetabaseListView2.Root := Cont;                                  // список задач контейнера
SetMemoLines(PlanTextMemo, PlanText(Cont));                      // сводка плана — в Memo
```

**Чтение данных задачи** (состояние, расписание, история):

```fore
TaskDesc := MB.ItemById(List.Items(List.SelectedItem.index).columntext(1));  // 1 — колонка Id
Task := TaskDesc.Bind As IScheduledTask;
Props := Task.Properties;
State := Task.State;              // ScheduledTaskState
Period := Props.Period;           // IScheduledTaskPeriod → cast к Daily/Weekly/Monthly/Timely/OneTimeOnly
Results := Task.GetResults;       // IScheduledTaskResults → StartDateTime/FinishDateTime/Succeeded
```

Колонки `MetabaseListView`: индексы зависят от представления (`columntext(n)`); **надёжнее** брать дескриптор
из `SelectedItem.ObjectDescriptor` (свойство `IMetabaseListViewItem`). В коде проекта `columntext(1)` — Id,
`columntext(3)` — тип объекта («Задача ETL»).

Готовые модули: `Fore/TaskContainerLib.fore` (функции) и `Fore/SchedulerForm.fore` (обработчики).

---

### 6.14. Алгоритм равномерной раскладки (реализован в `Fore/TaskPlanner.fore`)

1. **`CollectTaskInfos(Container)`** — по всем задачам контейнера собирает `CTaskInfo`
   (Id/Name, `State`, `Active`, текущий `Class_`, средняя длительность из истории).
2. **`BuildPlan(Infos, WindowStart, WindowEnd, Queues)`**:
   - считается суммарная нагрузка и доступное окно; шаг = `окно / число задач`
     (если окно меньше суммарной нагрузки — шаг по средней длительности);
   - порядок планирования (**LPT**: длинные — вперёд) задаётся через **`SortedList`**:
     ключ — ранг задачи (число задач длиннее её; равные разводятся по исходному индексу),
     поэтому коллекция сама держит порядок и ручная сортировка не нужна;
   - старт i-й задачи = `WindowStart + i × шаг`; `Class_` = `i mod Queues`
     (раскидывание по очередям планировщика).
3. **`ApplyPlan(Infos)`** — каждой задаче записывается период `Daily` со `StartDateTime`, `Class_`,
   `Queueing := True`, затем объект сохраняется.
4. Окно/очереди по умолчанию: `PLAN_WINDOW_START_HOUR = 1`, `PLAN_WINDOW_END_HOUR = 6`, `PLAN_QUEUES = 4`.

Для формы: `PlanText(Container)` — текстовая сводка плана; `PlanAndApply(Container)` — применить план,
вернув число обработанных задач.

> Подтверждено справкой: `Properties.Queueing` — записываемое (`Queueing: Boolean`), `Properties.Period` —
> записываемое; `DateTime.Compose` — метод класса, `DateTime.AddSeconds`/`Difference`, `TimeSpan.FromSeconds`/
> `Add`/`TotalSeconds` — есть.

---

### 6.15. Поиск контейнеров задач в репозитории

```fore
Function FindTaskContainers(Scope: IMetabaseObjectDescriptor = Null): IMetabaseObjectDescriptors;
Var
	mb: IMetabase;
	f: IMetabaseObjectFindInfo;
Begin
	mb := MetabaseClass.Active;
	f := mb.CreateFindInfo;
	f.ClassId := MetabaseObjectClass.KE_CLASS_TASK_CONTAINTER;
	f.ScanNestedNamespaces := True;
	f.InternalObjects := True;
	f.Scope := Scope;
	Return mb.Find(f);
End Function FindTaskContainers;
```

Результат — `IMetabaseObjectDescriptors`; перебрать можно через `For Each … Do`.

---

### 6.16. Диагностика расписания: распределение стартов по часам

Прежде чем менять расписание, полезно **измерить** фактическую картину: сгруппировать старты всех
задач контейнера по часу суток (0…23) и найти перегруженные часы. Функция ниже использует только
подтверждённые члены — `Tasks`, `GetResults`, `IScheduledTaskResult.StartDateTime`/`Succeeded`,
`DateTime.Hour` (§5.10, §5.19, §6.9) — и ничего не меняет в репозитории.

```fore
// Отчёт «сколько запусков в каждый час суток» + перегруженный час. Только чтение.
Function GetStartsByHourReport(Container: IMetabaseObjectDescriptor): String;
Var
	Tasks: IMetabaseObjectDescriptors;
	Task: IScheduledTask;
	Results: IScheduledTaskResults;
	Res: IScheduledTaskResult;
	Buckets: Array[24];
	H, I, K, PeakHour, PeakCnt: Integer;
	S: String;
Begin
	For H := 0 To 23 Do
		Buckets[H] := 0;
	End For;

	Tasks := (Container.Bind As IScheduledTasksContainer).Tasks;
	For I := 0 To Tasks.Count - 1 Do
		Task := Tasks.Item(I).Bind As IScheduledTask;
		Results := Task.GetResults;
		For K := 0 To Results.Count - 1 Do
			Res := Results.Item(K);
			If Res.Succeeded Then
				H := Res.StartDateTime.Hour;      // 0…23 — свойство переменной DateTime (§5.19)
				Buckets[H] := Buckets[H] + 1;
			End If;
		End For;
	End For;

	// Текстовая «гистограмма» + определение пикового часа
	PeakHour := 0;
	PeakCnt := -1;
	S := "";
	For H := 0 To 23 Do
		S := S + String.Format("{0}:00 — {1}", H, Buckets[H]) + CRLF;
		If Buckets[H] > PeakCnt Then
			PeakHour := H;
			PeakCnt := Buckets[H];
		End If;
	End For;
	S := S + "Пик нагрузки: " + PeakHour.ToString + ":00 (" + PeakCnt.ToString + " запусков)" + CRLF;
	Return S;
End Function GetStartsByHourReport;
```

По этой картине выбираются параметры раскладки (§6.14): окно `PLAN_WINDOW_START_HOUR` /
`PLAN_WINDOW_END_HOUR` сдвигают в «дыры», а шаг и число очередей `PLAN_QUEUES` — по высоте пиков.

> `Buckets: Array[24]` — статический массив (§5.20), индексы 0…23 (при сомнениях проверьте
> `GetLowerBound`/`GetUpperBound`). Старты берутся за **всю** хранимую историю — для «свежей» картины
> ограничьте выборку сравнением `Res.StartDateTime` с нужной датой.

---

### 6.17. Сценарий «под ключ»: от выбора контейнера до применённого плана

Собирает вместе рецепты §6.13–6.16 и готовые функции `Fore/*`:

1. **Выбрать контейнер** — диалог с фильтром `KE_CLASS_TASK_CONTAINTER` (§6.13) либо поиск (§6.15);
   сохранить дескриптор в поле формы `CurrentContainer: IMetabaseObjectDescriptor` (см. `Fore/README.md`).
2. **Показать задачи** — `MetabaseListView2.Root := CurrentContainer` (клик по строке привязывается кодом:
   `MetabaseListView2.OnClick := MetabaseListView2OnClick`); сводка плана — в `PlanTextMemo` (Memo),
   ответственный по выбранной задаче — в `Label1` (из таблицы `RESPONSIBLE_FOR_TASK`).
3. **Измерить текущее распределение** — `GetStartsByHourReport(CurrentContainer)` (§6.16): увидеть пики и «дыры».
4. **Построить план без записи** — `PlanText(Container)` (§6.14): собрать `CTaskInfo`, посчитать шаг и
   очереди, показать сводку; в репозиторий **ничего не пишется**.
5. **Применить план** — `PlanAndApply(Container)` (или раздельно `CollectTaskInfos` + `BuildPlan` + `ApplyPlan`):
   каждой задаче пишется период `Daily`, `Class_`, `Queueing := True`, затем вызывается `Save`.
6. **Проверить результат** — повторный `GetStartsByHourReport` (§6.16) и `task.GetResults` (§6.9).
7. **Ответственный по задаче** (наша таблица `RESPONSIBLE_FOR_TASK`, §6.1): чтение — `LoadResponsibleTable` /
   `LoadResponsibleIndex` / `FindTaskResponsibleInIndex` (кэш на форме — `RespIndex_`), запись —
   `SaveTaskResponsible(TableId, TaskField, BaField, RespField, TaskId, BaName, Responsible)`
   (`UnavailabilityStore.fore`): пусто в `Responsible` — строка удаляется, иначе
   `insert … on conflict (TASK_ID) do update` (уникальный индекс `responsible_for_task_task_uq`).
   В форме это кнопка «Изменить ответственного» (`EditResponsibleOnClick` — открывает форму
   ответственного для **выбранной** задачи) и меню выбора (`Button` + `PopupMenu`):
   `LoadResponsibleNames` даёт уникальные ранее использованные значения по алфавиту, пункты строит
   `RespMenuBuild` перед показом меню (`PopupMenu.Popup`), выбор пишет ответственного сразу.

```fore
// Кнопка «Анализ» — только чтение, без Save
Message := PlanText(CurrentContainer);
WinApplication.InformationBox(Message);                 // только настольное приложение (§5.18)

// Кнопка «Применить план» — запись Period/Class_/Queueing + Save по каждой задаче
Applied := PlanAndApply(CurrentContainer);
WinApplication.InformationBox("Расписание применено. Задач: " + Applied.ToString);
```

> Порядок «сначала анализ, потом запись» не случаен: `PlanText` ничего не меняет, а
> `ApplyPlan`/`PlanAndApply` вызывают `Save` по каждой задаче — шаг необратимый. Перед применением
> стоит убедиться, что в форме выбран нужный контейнер, и помнить про отключение `formatOnSave` для
> `[fore]` при строках со `=` (§8). В веб-клиенте `WinApplication.InformationBox` недоступен (§5.18) —
> выводите результат иначе.

---

### 6.18. Планирование недоступности системы (`Fore/UnavailabilityPlanner.fore`)

Доп. функция планировщика: по окну недоступности найти задачи, чей прогон его пересекает, и по
каждой решить «не запускать / перепланировать», разложив разовые запуски после окна.

1. **`CollectAffectedTasks(Container, WindowStart, WindowEnd)`** — перебор прогонов через
   `Period.Next(date)` (подтверждён справкой) начиная с `WindowStart − (след + сутки)`; прогон
   затронут, если `RunStart < WindowEnd` и `RunFinish > WindowStart`, где
   `RunFinish = RunStart +` средняя длительность из `GetResults`. Так ловится задача, стартовавшая
   **до** периода, но по статистике ещё выполняющаяся во время простоя.
2. **`DistributeSchedule(Impacts, WindowEnd, TailHours)`** — «перепланируемые» (LPT через
   `SortedList` по рангу, как в `BuildPlan`) получают `NewStart = WindowEnd + i × шаг`; шаг =
   хвостовое окно / число задач, но не меньше `MIN_STEP_SECONDS`.
3. **`UnavailabilityPlanText` / `AdditionalScheduleText`** — текстовые сводки (для `Debug.WriteLine`
   и отчётов); для формы есть **табличное представление** по схеме из **10 полей**:
   `UnavailPlanColumnId(i)` (идентификаторы `TASK_ID`, `TASK_NAME`, `BA_NAME`, `RESPONSIBLE_USER`,
   `START_TIME_ORIGINAL`, `END_TIME_ORIGINAL`, `TIME_SPAN`, `START_TIME_NEW`, `PROCESSED`, `SKIP_FLAG`),
   `UnavailPlanColumnCaption(i)` (заголовки, последние два — «Обрабатывать» и «Не запускать»),
   `UnavailPlanColumnType(i)` (типы: `Строковый(255)` / `Строковый(1)` / `Дата`),
   `UnavailPlanCell(Impact, i)` (значение ячейки; «крестики» — `✔`/`—`),
   `UnavailPlanHeaderText(Impacts, Window)` (краткая сводка). Порядок задан константами `UNAVAIL_COL_*`
   (`UNAVAIL_PLAN_COLUMNS` = 10) — они же используются при настройке колонок `ListView` в Инспекторе.
   `RESPONSIBLE_USER` берётся из таблицы ответственных `RESPONSIBLE_FOR_TASK` (`RESP_TABLE_ID`,
   `RESP_FIELD_*`; чтение — `IDatasetInstance`, §5.31), `BA_NAME` — подъёмом по `Descriptor.Parent`
   до объекта с `ClassId = 10496` («Бизнес-приложение», §5.1). `TIME_SPAN` — `ЧЧ:ММ:СС`
   (`UnavailDurationText`). Выгрузок в файл (CSV/HTML) больше нет — план живёт только в таблице СУБД.
4. Решения: `DECISION_SKIP` / `DECISION_RESCHEDULE`; правки — `SetImpactDecision`,
   `SetImpactNewStart`, `FindImpactById`; отметки-«крестики» — `ImpactProcessed` / `ImpactSkipped` /
   `SetImpactFlags` (связаны, как радиокнопки); сборка плана — `PrepareUnavailabilityPlan`,
   раскладка по слоям — `DistributeScheduleLayers` / `PlanLayersForFinish`.
5. **Форма «Планировщик» целиком** (`Fore/SchedulerForm.fore`, класс `SchedulerFormForm` — базовая часть и
   панель недоступности в одном файле, одно событие `FormOnCreate`): затронутые задачи автоматически
   отмечаются флажками (`CheckRowsByIds` из `TaskContainerLib`, §5.18); решения применяются пакетно
   ко всем **отмеченным** (`ApplyChecked` → `CheckedObjectIds`/`CheckedObjects`) или к выбранной строке
   (`SelectedObjectDescriptor`); план можно править и **экспортировать/импортировать** в файл
   (`FileSaveDialog` / `FileOpenDialog` + `File.OpenTextWriter` / `File.OpenTextReader`, §5.27 и §5.30).
   Сводка и дополнительное расписание выводятся в **`Memo`** (`UnavailSummaryMemo.Lines`,
   `WordWrap` + `ScrollBars`), а **не в `Label`**: у метки нет полос прокрутки и длинный план
   в неё не помещается (§5.27). Текст ставится построчно (`Lines.Clear` + `Lines.Add`).

Обработчики формы — `Fore/SchedulerForm.fore` (перечень в `README.md`).

> **Ограничение платформы:** у задачи ровно **один** `Period` (`IScheduledTaskProperties.Period`;
> коллекции `Periods` нет), поэтому «дополнительный единичный запуск» нельзя добавить той же
> задаче вторым периодом. Модуль `Fore/UnavailabilityPlanner.fore` **только считает и показывает**
> план и в репозиторий не пишет; материализация плана (реальный запуск разовых прогонов) — в
> `Fore/UnavailabilityRunner.fore`, см. **§6.21**.

```fore
window := New CUnavailWindow.Create;
window.Start := DateTime.Compose(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 2, 0, 0, 0);
window.Stop := DateTime.Compose(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day, 4, 0, 0, 0);
window.TailHours := DEFAULT_TAIL_HOURS;

Impacts := PrepareUnavailabilityPlan(container, window.Start, window.Stop, window.TailHours);
Debug.WriteLine(UnavailabilityPlanText(Impacts, window));
Debug.WriteLine(AdditionalScheduleText(Impacts));
```

---

### 6.19. Заполнение списка строками и обработка выбора (ListBox)

Так показывают в окне **только релевантные строки** (напр., затронутые недоступностью задачи) и
сопоставляют выбранную строку с элементом модели по индексу (§5.24, §5.25, §6.18).

```fore
// Заполнить список подписями задач (индекс строки = индекс в плане)
Sub FillUnavailList(Lst: ListBox; Impacts: ArrayList);
Var
	I: Integer;
Begin
	Lst.Items.Clear;
	For I := 0 To Impacts.Count - 1 Do
		Lst.Items.Add((Impacts.Item(I) As CUnavailImpact).Id);
	End For;
End Sub FillUnavailList;

// Клик по строке: выбранная задача — Impacts.Item(Lst.ItemIndex)
Sub UnavailListOnClick(Sender: Object; Args: IMouseEventArgs);
Var
	Lst: ListBox;
	Idx: Integer;
Begin
	Lst := Sender As ListBox;
	If UnavailImpacts = Null Then
		Return;
	End If;
	Idx := Lst.ItemIndex;
	If (Idx < 0) Or (Idx >= UnavailImpacts.Count) Then
		Return;
	End If;
	// задача: UnavailImpacts.Item(Idx) As CUnavailImpact → далее Skip/Reschedule/новое время
	RenderUnavailSummary;
End Sub UnavailListOnClick;
```

> Держите список и модель плана в **одном порядке**: индекс строки `ItemIndex` = индекс в плане.
> При пересортировке плана (`DistributeSchedule`) перезаполняйте список.

### 6.20. Открыть собственную форму программно

```fore
Sub OpenUnavailFormOnClick(Sender: Object; Args: IMouseEventArgs);
Var
	f: Form;               // Form — базовый класс; конкретная форма — объект репозитория
Begin
	f := New UnavailForm.CreateForm(Self As IWin32Window);
	f.Visible := True;     // или f.ShowModal;
End Sub OpenUnavailFormOnClick;
```

> `UnavailForm` — имя формы-объекта из репозитория; его нужно добавить в **ссылки сборок** текущей
> формы (как `TestForm` в справке). Только настольное приложение (§5.28).

---

### 6.21. Материализация плана недоступности (`Fore/UnavailabilityRunner.fore`)

План недоступности (§6.18) — это «что сделать», а не «как выполнить». У задачи **ровно один**
`Period`, поэтому «разовый запуск после простоя» нельзя добавить ей вторым периодом. Реализация —
`Fore/UnavailabilityRunner.fore`, способ **«диспетчер»** (универсален для любых задач контейнера).

**Как это работает (обновлено в 1.86 — только таблицы БД).** Служебная задача класса «Выполнение
модуля» с периодом `Timely` (каждые N минут) вызывает `Sub RunDuePlannedRunsMain`. Источник истины —
**таблица `UNAVAILABILITY_PLAN`**: берутся записи недоступности, у которых `Now >= StartDt` и
`Now <= EndDt + RUN_PLAN_TAIL_HOURS`, и в их планах выполняются строки с `START_TIME_NEW`, у которых
время уже наступило. Строка «захватывается» атомарно (`ClaimPlanRun`: `RUN_STATE = 'RUNNING'`,
`ATTEMPTS + 1`), результат записывается в колонки `RUN_STATE`/`DONE_AT`/`FINISHED_AT`/`ERROR_TEXT`
(`FinishPlanRun`), а каждая попытка — в журнал **`UNAVAILABILITY_RUN_LOG`** (`WriteRunLog`).
Файловых планов/журналов нет.

```fore
// Однократная настройка: создаём задачу-диспетчер (модуль — тот, где лежит UnavailabilityRunner):
CreateUnavailabilityDispatcher("TASK_CONTAINTER", "UnavailabilityRunner", "RunDuePlannedRunsMain", RUN_POLL_MINUTES);

// «Тик» диспетчера (это и есть тело Sub RunDuePlannedRunsMain):
RunDuePlannedRunsFromTable(Container, RUN_PLAN_TAIL_HOURS);
```

Ключевой член — **`IScheduledTask.ExecuteImmediate(SaveResult: Boolean): IScheduledTaskResult`**:
выполняет задачу в текущем процессе и репозитории, **запущенный планировщик не требуется**, настройки
почты/FTP игнорируются. Класс задачи знать не нужно — поэтому способ универсален.

| Что | Чем | Замечание |
|-----|-----|-----------|
| Выполнить задачу немедленно | `Task.ExecuteImmediate(True)` | планировщик не нужен; история пополняется |
| Создать задачу-диспетчер | `MB.CreateCreateInfo` → `CreateObject` → `Edit` → `Save` | `Parent` — контейнер; `ClassID := KE_CLASS_TASK_EXECUTESUB`; `Exe.Assembly`, `Exe.SubName` |
| Период «через интервал» | `Prop.CreatePeriod(ScheduledTaskPeriodType.Timely)` | `Per.TimeInterval` имеет тип **`DateTime`**: `DateTime.ComposeTimeOfDay(0, мин, 0, 0)` |
| Событие запуска (альтернатива) | `Task.CreateInvokeEvent(Now)` → `Invoke.Invoke(MB)` | есть `Next`, `IScheduledEvents` |

> ⚠ Порядок времени — «сначала план, потом запуск». Диспетчер опрашивает план раз в N минут, поэтому
> фактический запуск может опоздать на интервал опроса (для окна простоя это обычно допустимо).
> Откат = удалить задачу-диспетчер и (по желанию) очистить журналы `UNAVAILABILITY_LOG` /
> `UNAVAILABILITY_RUN_LOG`; файлов, которые надо чистить, больше нет.

**Что читается и пишется.** `LoadDueRunRows(TailHours, MaxRows)` — строки к запуску (время сравнивает
СУБД: `current_timestamp`), `LoadAttentionRunRows` — «требует внимания», `ResetStuckPlanRuns` —
«зависшие» `RUNNING` возвращаются в очередь в начале тика. Задача в состоянии «выполняется»
(`ScheduledTaskState` = 2) не перезапускается: попытка пропускается и в журнале помечается `SKIPPED`.
Настройка диспетчера «идемпотентна»: `EnsureUnavailabilityDispatcher(...)` создаёт задачу, если её нет,
и обновляет интервал опроса, если она уже есть.

### 6.22. Ведение недоступностей и хранение плана в таблицах

Данные по недоступностям и построенные планы живут в **таблицах базы данных репозитория**;
доступ — DAL/SQL (§5.5). Реализация: `Fore/UnavailabilityStore.fore` (запись/чтение),
`Fore/UnavailabilityRecordsForm.fore` (окно ведения), вызовы из `Fore/SchedulerForm.fore`.

**Таблица `UNAVAILABILITY`** (идентификатор = native_name). Период недоступности — **дата и время**
на каждой границе (`UNV_PERIOD_SINGLE_COLUMN = True`, схема по умолчанию):

| Поле | Тип | Смысл |
|------|-----|-------|
| `UNAVAIL_ID` | Числовой | ключ записи, заполняется `MB.GenerateKey` |
| `START_DT` | Дата и время | начало недоступности |
| `END_DT` | Дата и время | окончание недоступности |
| `AUTHOR` | Строковый | автор записи (`MB.LogonSession.UserDescription`) |
| `LAST_CHANGED` | Дата | время последнего изменения (`MB.GetCurrentStamp` — время сервера СУБД) |

> Альтернативная схема (`UNV_PERIOD_SINGLE_COLUMN = False`): четыре колонки — `START_DATE`,
> `START_TIME`, `END_DATE`, `END_TIME`; время пишется текстом `'ЧЧ:ММ'` либо датой
> (`UNV_TIME_AS_TEXT`). Сборка даты и времени — `ComposeDateAndTime`.

**Таблица `UNAVAILABILITY_PLAN`**: `UNAVAIL_ID` (ссылка на запись), `SAVED_AT` (когда сохранён срез),
`AUTHOR` (кто сохранил), `DONE_AT` (когда разовый запуск фактически выполнен) + 8 полей плана
(`TASK_ID`, `TASK_NAME`, `BA_NAME`, `RESPONSIBLE_USER`, `START_TIME_ORIGINAL`, `END_TIME_ORIGINAL`,
`TIME_SPAN`, `START_TIME_NEW`). Пустой `START_TIME_NEW` = решение «не запускать».

**Функции слоя доступа (`UnavailabilityStore.fore`):**

| Функция | Что делает |
|---------|------------|
| `LoadUnavailRecords` | все периоды недоступности (курсор → `ArrayList` из `CUnavailRecord`) |
| `AddUnavailRecord` / `UpdateUnavailRecord` / `DeleteUnavailRecord` | добавление / правка / удаление записи (ключ и штампы — автоматически; удаление чистит и планы) |
| `SavePlanToTable` / `LoadPlanFromTable` | сохранить срез плана (с автором и `SAVED_AT`) / прочитать его |
| `HasStoredPlan` | есть ли по записи сохранённый план (для пометки в списке периодов) |
| `LoadStoredPlanRows` | полные строки сохранённого плана (для просмотра в UI) |
| `LoadPendingRunRows` / `MarkPlanRunDone` | незапущенные строки (`DONE_AT` пусто) / отметка «выполнено» — журнал диспетчера в БД |
| `CheckUnavailStorage` | диагностика: доступ к базе и число записей/строк (проверка на стенде) |
| `ApplyStoredPlanToImpacts` | применить сохранённый план к текущему плану формы (по Id задачи) |
| `ExportStoredPlanToFile` | выгрузить сохранённый план в текстовый файл формата диспетчера (§6.21) |
| `GetCurrentAuthor`, `GetServerStamp` | автор записи и серверное время |
| `UnvSqlDate`/`UnvSqlStr`/`UnvSqlTimePart` | литералы для SQL (ISO-дата; время — текстом `'ЧЧ:ММ'` или датой, см. `UNV_TIME_AS_TEXT`) |
| `UnvPeriodSelectSql`/`UnvPeriodColumnsSql`/`UnvPeriodInsertValuesSql`/`UnvPeriodSetSql` | SQL-фрагменты периода с учётом схемы (одна колонка «дата и время» либо четыре раздельные) |

**Поток в UI:** окно «Ведение недоступности системы» (CRUD по таблице) → в окне «Недоступность
системы» список периодов (колонки: начало, окончание, автор, последнее изменение, **признак
«есть план»** через `HasStoredPlan`), кнопка «Взять период» подставляет даты в пикеры и
**отключает ручной ввод** (`Enabled := False`); «Сохранить план в таблицу» / «Загрузить план из
таблицы» / «Выгрузить план из файла» — способы работы с планом (файл формата диспетчера сохранён).

> ⚠ **Период — двумя пикерами на границу.** Компонента «дата и время» в платформе нет: у `DateTimePicker`
> `Kind` показывает либо дату, либо время. Поэтому на форме по четыре пикера на период
> (`UnavailStartDatePicker` + `UnavailStartTimePicker`, `UnavailEndDatePicker` + `UnavailEndTimePicker`)
> и два на новое время (`NewDatePicker` + `NewTimePicker`); значения собираются `ComposeDateAndTime`
> (год/мес/день из «даты», часы/минуты из «времени»). В окне ведения — те же четыре:
> `RecStartDatePicker`/`RecStartTimePicker`, `RecEndDatePicker`/`RecEndTimePicker`.

> Решение «не удалять прежние срезы»: `SavePlanToTable` сначала удаляет прежние строки этой записи
> недоступности, затем пишет новый срез с общим `SAVED_AT` (историю можно вернуть, если отказаться
> от удаления и читать максимальный `SAVED_AT`).

### 6.23. DDL таблиц недоступности (PostgreSQL 17)

Полный идемпотентный скрипт — `docs/sql/unavailability-postgres.sql` (create/if not exists, индексы,
`comment on`, примеры `insert` для проверки, примечания по поясам и другим СУБД). Ядро скрипта:

```sql
-- 1) периоды недоступности (границы — дата и время)
create table if not exists unavailability
(
	unavail_id   bigint       not null,
	start_dt     timestamp    not null,
	end_dt       timestamp    not null,
	author       varchar(255) not null default '',
	last_changed timestamp    not null,
	constraint unavailability_pk primary key (unavail_id),
	constraint unavailability_period_ck check (end_dt >= start_dt)
);

-- 2) план переноса запусков (строка = задача; start_time_new = null → «не запускать»)
create table if not exists unavailability_plan
(
	id                    bigint generated always as identity,
	unavail_id            bigint       not null,
	saved_at              timestamp    not null,
	author                varchar(255) not null default '',
	task_id               varchar(255) not null,
	task_name             varchar(255) not null default '',
	ba_name               varchar(255) not null default '',
	responsible_user      varchar(255) not null default '',
	start_time_original   timestamp,
	end_time_original     timestamp,
	time_span             varchar(8)   not null default '',
	start_time_new        timestamp,
	done_at               timestamp,
	constraint unavailability_plan_pk primary key (id),
	constraint unavailability_plan_fk foreign key (unavail_id)
		references unavailability (unavail_id) on delete cascade
);

-- 3) индексы: план по записи; «незапущенные» строки диспетчера; поиск активного периода
create index if not exists unavailability_plan_unavail_idx
	on unavailability_plan (unavail_id);
create index if not exists unavailability_plan_pending_idx
	on unavailability_plan (unavail_id, start_time_new)
	where done_at is null;
create index if not exists unavailability_period_idx
	on unavailability (start_dt, end_dt);
```

> ⚠ **Идентификаторы — без кавычек.** PostgreSQL приводит незакавыченные имена к нижнему регистру,
> а Fore собирает SQL тоже без кавычек (`UNV_TABLE`, `UNV_F_*`) — так они совпадают. Если создать
> колонки как `"START_DT"` (в кавычках), запросы из Fore их не найдут.
> Время — `timestamp` **без зоны**: Fore пишет локальный литерал `'ГГГГ-ММ-ДД ЧЧ:ММ:СС'`, поэтому
> пояс сеанса СУБД (`show timezone;`) должен совпадать с поясом планировщика.
> Таблица `UNV_TABLE`/`UNV_PLAN_TABLE` и имена колонок при необходимости меняются одной правкой
> констант в `UnavailabilityStore.fore`.

### 6.24. DDL таблицы ответственных (PostgreSQL 17)

Таблица `responsible_for_task` — источник колонки `RESPONSIBLE_USER` плана (заполняется
`LoadResponsibleTable` через `IDatasetInstance`, §5.31; константы `RESP_TABLE_ID`, `RESP_FIELD_*`).
Полный идемпотентный скрипт — `docs/sql/responsible-for-task-postgres.sql`. Ядро скрипта:

```sql
create table if not exists responsible_for_task
(
	id          bigint       generated always as identity, -- технический ключ строки
	task_id     varchar(255) not null,                     -- Id задачи (объект репозитория) — TASK_ID
	ba_name     varchar(255) not null default '',          -- бизнес-приложение — BA_NAME
	responsible varchar(255) not null default '',          -- ответственный — RESPONSIBLE
	constraint responsible_for_task_pk primary key (id)
);

-- «один ответственный на задачу»: FindTaskResponsible возвращает первую строку с этим task_id
create unique index if not exists responsible_for_task_task_uq
	on responsible_for_task (task_id);

create index if not exists responsible_for_task_ba_idx
	on responsible_for_task (ba_name);
```

> ⚠ **Что важно для стыковки с кодом.**
> - `Fields.FindById(RESP_FIELD_*)` ищет поле по **идентификатору** (native_name), поэтому Id полей
>   объекта «Таблица» в репозитории должны совпадать с колонками: `TASK_ID`, `BA_NAME`, `RESPONSIBLE`
>   (иначе правятся константы `RESP_FIELD_TASK`/`RESP_FIELD_BA`/`RESP_FIELD_RESPONSIBLE`).
> - `task_id` — **строка**, равная Id объекта задачи (`Descriptor.Id`); Fore сравнивает значения как
>   строки с учётом регистра, поэтому написание должно совпадать с задачей.
> - Поле `BA_NAME` обязано существовать, даже если бизнес-приложение берётся обходом владельцев:
>   `LoadResponsibleTable` читает его безусловно.
> - Если у задачи допустимо несколько ответственных (например, по одному на бизнес-приложение) —
>   уникальный индекс не создавайте: код возьмёт первую подходящую строку.
> - Модуль, читающий таблицу, должен иметь **ссылку на сборку `Db`** (тип `IDatasetInstance`).

### 6.25. Состояния разового запуска, журнал и дедупликация

Диспетчер переведён на схему «захват → выполнение → результат»: перед запуском строка плана атомарным
`update` переводится в `RUNNING` (успех = изменена ровно одна строка), после выполнения получает
`DONE` + `DONE_AT` либо `FAILED` + `ERROR_TEXT`. Это снимает два риска сразу: двойной запуск при двух
диспетчерах (или двух серверах одного репозитория) и «молчаливый» сбой задачи.

| Механика | Функция | Примечание |
|---|---|---|
| Захват строки | `ClaimPlanRun` | `update … where done_at is null and coalesce(run_state,'QUEUED') <> 'RUNNING' and coalesce(attempts,0) < N` |
| Результат | `FinishPlanRun` | `DONE` ⇒ `done_at`; `FAILED` ⇒ `error_text`; повторы до `UNV_MAX_ATTEMPTS` |
| «Зависшие» строки | `ResetStuckPlanRuns` | `RUNNING` старше `UNV_STUCK_MINUTES` → `QUEUED` (в начале тика) |
| Что запускать | `LoadDueRunRows` | время сравнивает СУБД (`current_timestamp`), учитываются окно простоя + `RUN_PLAN_TAIL_HOURS` и лимит попыток |
| Требуют внимания | `LoadAttentionRunRows`, `PlanRunsSummaryText` | исчерпаны попытки / просрочено; сводка состояний для формы |
| Журнал | `WriteUnavailLog`, `LoadUnavailLog`, `UnavailLogText` | таблица `UNAVAILABILITY_LOG`, события `RECORD_*`, `PLAN_*`, `RUN_*` |
| Журнал попыток запуска | `WriteRunLog`, `LoadRunLog`, `RunLogText` | таблица `UNAVAILABILITY_RUN_LOG`: одна строка на попытку (`DONE`/`FAILED`/`SKIPPED`/`DRY_RUN`) с плановым временем, началом/окончанием, номером попытки, длительностью и текстом ошибки |
| Сухой прогон | `RUN_DRY_RUN`, `RunDuePlannedRunsDryRunMain`, `UnavailRunTickReport` | ничего не выполняется — «что было бы запущено» |
| Отмена и устаревание | `DeleteStoredPlan`, `IsPlanStale` | удаление среза плана и признак «план устарел» (`SAVED_AT < LAST_CHANGED`) |
| Срез одной транзакцией | `ExecUnavailSqlMany` | `SavePlanToTable` вставляет новый срез и удаляет прежний в одной транзакции — «дырявого» плана не бывает |

**Дедупликация дополнительных запусков.** `CollectAffectedTasks` для каждой затронутой задачи считает
первый штатный запуск после окна (`Period.Next` → поле `NextRegularRun`), а `DistributeSchedule`
подавляет доп. запуск, если до штатного осталось не больше `DEDUP_GAP_MINUTES` минут (`DedupSkipped`,
решение `SKIP`, причина — в `Note`). Сводка `UnavailabilityPlanText` печатает «из них подавлено —
штатный запуск рядом: N» и «требует ручной проверки: M»: во второй счётчик попадают задачи, где перебор
`Period.Next` упёрся в `MAX_SCAN_RUNS` и решение не принято (`DECISION_NONE`, поле `ScanLimited`).

**Связь с базовым планировщиком.** `TaskPlanner.BuildPlanAvoiding` строит обычную раскладку и выносит
старты из запрещённых окон (`CPlanWindow`, `ShiftOutOfWindows`); окна собирает форма
(`BuildForbiddenWindows` из записей недоступности) и передаёт в `PlanAndApplyAvoiding`. Сам
`TaskPlanner` от хранилища не зависит — ему передают список окон.

### 6.26. Уведомления, выгрузки и сервисные проверки

| Механика | Функция | Примечание |
|---|---|---|
| Письма по ответственным | `NoticesFromImpacts`, `NoticeBody`, `NoticeAddressee` | одно письмо на ответственного, тело — HTML-таблица (экранирование `NoticeHtmlEscape`) |
| Тексты для формы | `UnavailNoticesText`, `NoticesSummaryText` | кому и сколько задач |
| Сохранение писем | `SaveNoticesToFolder` | файлы `notice_N_адрес.htm` в `NOTIFY_FOLDER` — резервный/файловый режим, работает всегда |
| Отправка писем | `SendNoticesUserMailer` | функция **заказчика** `SendMailMessage(To_; From_; Subject; Body)` (технический пользователь уже настроен; подключается в сборку отдельно) |
| ~~SMTP~~ | — | ⚠ `SendNoticeSmtp`/`SendNoticesSmtp` (`INetSmtpClient`, `NOTIFY_SMTP_*`) **удалены** по требованию стенда: отправка только через `SendMailMessage` |
| **Уведомления о недоступности** | `NoticesForResponsibles`, `NoticeBodyNotice`, `UnavailNoticesForSendText`, `SendNoticesUserMailer` | по **выбранной записи** недоступности: сроки + автор + задачи ответственного (адрес — колонка **`MAIL`** таблицы ответственных). Отправка — **внешняя** функция проекта `SendMailMessage(To; From; Subject; Body)` (её нужно подключить в сборке); замечания «нет строки в таблице»/«не заполнен MAIL» собирает `AddProblem` и показывает `UnavailNoticesForSendText` |
| Пересчёт плана по слоям | `DistributeScheduleLayers`, `PlanLayersForFinish`, `UNAVAIL_MAX_LAYERS` | кнопка «Пересчитать план» (окно `PlanParamsForm`): начало плана, число слоёв или желаемое окончание |
| Фильтр таблицы плана | `TableFilter`, `UnavailImpactMatchesFilter`, `TextContainsNoCase` | Id / название / БП / ответственный; поиск **без учёта регистра** (`String.ToLower`, §5.30); фильтр влияет только на показ — расчёт идёт по всем строкам |
| Массовые отметки | `SetAllProcessed`, `ApplyProcessed` | «обрабатывать» — у всех/ни у кого; «не запускать»/«перепланировать» — для всех обрабатываемых |
| Разбор импорта | `ApplyStoredPlanReport` | что применено и какие Id не найдены в текущем плане |
| Монитор системы | `UnavailMonitorText` | записи + активные простои (SQL `current_timestamp`) + состояния строк + «требуют внимания» |
| Проверки проекта | `tools/check-all.js`, `tools/fore-spec.js` | линтер + спецификация чистой логики + баланс скобок SQL + наличие макетов; единый код возврата |

> ⚠ Отправка выполняется функцией заказчика `SendMailMessage(To_; From_; Subject; Body)` — подключить её
> в сборку. Прежний SMTP-блок (`SendNoticeSmtp`/`SendNoticesSmtp`, сборка **Net**) удалён по требованию
> стенда; файловый режим `SaveNoticesToFolder` от рассылки не зависит и работает всегда.

---

## 7. Инструменты разработки

### 7.1. Расширение VS Code «foresight FORE Language»

`forecode.foresight-fore-language` (v0.2.2, publisher `ForeCode`, MIT). Для desktop FORe.
Активация — на языке `fore` (файлы `.fore`).

Даёт: подсветку синтаксиса, **170+ сниппетов**, форматирование (`Shift+Alt+F`), линтер (diagnostics),
навигацию (F12 / Shift+F12 / Ctrl+Shift+O — в пределах файла), hover-документацию интерфейсов
с ссылками на `help.fsight.ru`, темы «FORe Dark/Light».

Конфигурация для `[fore]`: форматтер по умолчанию, `formatOnSave: true`, `tabSize: 1`,
`insertSpaces: false` (**табы**).

### 7.2. Автономная проверка `.fore` (без VS Code)

`tools/fore-lint-check.js` — порт линтера расширения. Запуск из корня проекта:

```
node tools/fore-lint-check.js Fore
```

Вывод: `OK <файл>` / `WARN <файл> + сообщения` и итог `Файлов: N, предупреждений: M`.

### 7.3. Быстрая проверка перед сохранением

1. Отступы — табы. 2. `If … Then` в одну строку. 3. Каждому `If` — `End If`, `Begin` — `End`.
4. `Try` — `End Try`. 5. Не использовать `Else If` (с пробелом). 6. Прогнать `fore-lint-check.js`.

---

## 8. Подводные камни

| Тема | Суть | Как правильно |
|------|------|----------------|
| Экспорт в поток | `ExportToStream` в справке не документирован | Использовать `ExportToFile(<файл>, "xlsx")` |
| Класс «Документа» | `KE_CLASS_STORAGE` в перечислении отсутствует | `MetabaseObjectClass.KE_CLASS_DOCUMENT` (код 3329) |
| `PrxMdService` | Это **источник данных** для ReportBox, не сервис экспорта | Не использовать для экспорта/скачивания |
| Скачивание | `Metabase.GetObjects`, `PPService.axd?action=download` не подтверждены | `DBA.Helper.Download('<Key>&attach=1&fileName=<Name>')` |
| Задача (FormatTag) | `ReadResult` нужен, только если `FormatTag` не задан | При `FormatTag` задача сама пишет файл |
| Автоформат VS Code | Форматтер расставляет пробелы вокруг `=`/`:=` и схлопывает пробелы **внутри строковых литералов** | Для строк со `=` отключить `formatOnSave` для `[fore]` |
| Линтер и `Select Case` | Даёт ложные «Незакрытый блок Case» (снимает один `Case` на `End Select`) | Не считать эти предупреждения ошибкой |
| Navigation | Работает только в пределах одного файла | Не рассчитывать на переход между файлами |
| Стиль `exmail.txt` | `=`, `Имя Тип`, комментарии без `//` | В новом коде — `:=`, `Имя: Тип`, `//` |
| Активность задачи | Свойство называется **`Active`**, а не `Enabled` | `props.Active := True;` |
| Шаг по курсору | У `IDalCursor` — метод `Next`, не `MoveNext`; `Eof` — метод | `While Not cur.Eof Do cur.Next; End While;` |
| Поле документа | `IDocument.FileName` (большая «N») | Не `Filename` |
| Нестрогий поиск | У `IMetabase` нет `FindById` | `AppMbExt.ItemById(id, strict := False)` / `Find(CreateFindInfo)` |
| Поток | Абстрактного `IStream` нет | `IMemoryStream` / `IIOStream` (класс `MemoryStream`) |
| Создание задачи | `Tasks.Add` не создаёт задачу (`Tasks` — это `IMetabaseObjectDescriptors`) | `CreateCreateInfo` + `ClassID := KE_CLASS_TASK_*` + `CreateObject` (см. §6.5) |
| Конструкторы и линтер | `Constructor … Begin … End Constructor` → «Незакрытый блок Begin» | Ложное срабатывание: игнорировать либо использовать фабричные функции (см. §9) |
| `Date.Compose` как статика | `Date` — не класс | `DateTime.Compose(DateTime.Now.Year, …)` (год/мес/день — от переменной) |
| UI-ограничение | `IUiCommandTarget.Execute`, `WinApplication.InformationBox` — **только настольное приложение** | В веб-клиенте искать другой механизм |
| `ArrayList.Item` | только чтение (присваивать нельзя) | Собирать новый список (`Insert`) либо `RemoveAt` + `Insert` |
| Секунды: `Double` vs `Integer` | Смешивание `Double` и `Integer` в «секундной» арифметике и в `DateTime.AddSeconds`/`TimeSpan.FromSeconds` → ошибки компилятора | Держать секунды в **`Integer`**: `Sec := Double.RoundInt(AvgSeconds);`, деление — `Double.RoundInt(X / (Cnt As Double))`, где нужен `Double` — `(X As Double)` |
| Сравнение с `Null` | `X = Null` / `X <> Null` читается неоднозначно | `If IsNull(X) Then` / `If Not IsNull(X) Then` (§5.30.1) |
| Склейка строк | Пропущенный `+` в начале строки продолжения — **тихая потеря** текста, а не ошибка компиляции | `+ "…"` в начале каждой строки (§5.30.1) |
| Одна форма — один класс | Объявлять `Class ИмяФормы` в двух файлах шаблона нельзя: форма одна, событие `OnCreate` одно | Держать форму в **одном** файле: один класс, один `FormOnCreate`, один `CreateFormComponents` |

---

## 9. Линтер FORE Language: точные правила

Линтер проверяет **баланс блоков** и пару частных случаев. Все сообщения — уровня Warning.

| Сообщение | Условие |
|-----------|---------|
| `Несоответствующий End: нет открывающего Begin` | `End Sub/Function/Procedure` без `Begin` |
| `Несоответствующий End If: нет открывающего If` | `End If` без соответствующего `If` |
| `Несоответствующий End Try: нет открывающего Try` | `End Try` без `Try` |
| `Except без соответствующего Try` | `Except` вне `Try` |
| `Незакрытый блок <...>` | Остались незакрытые `Begin`/`If`/`Try`/`For`/`While`/`Case` |
| `Then без соответствующего If` | `Then` в начале строки без `If` |

**Особенности распознавания (важно для чистого линта):**

- `If` учитывается, если строка начинается с `If ` или содержит ` If ` **и** содержит ` Then`
  → держите `If … Then` в одну строку.
- `For`/`While` учитываются, только если строка дополнительно содержит ` Do`.
- `Case` учитывается с эвристикой по кавычкам (попытка не ловить `CASE` внутри SQL-строки).
- `Else If` (с пробелом) распознаётся как **второй** `If` → «Незакрытый блок If». Используйте `ElseIf`.
- Один `End Select` снимает только **один** `Case` → `Select Case` даёт ложные предупреждения.
- `Constructor … End Constructor` даёт ложный «Незакрытый блок Begin» (линтер не снимает `Begin` на
  `End Constructor`) — либо игнорируйте, либо вместо конструкторов используйте фабричные функции.

---

## 10. Чек-лист перед сдачей Fore-кода

- [ ] Отступы табами; стиль проекта (`:=`, `Имя: Тип`, `//`-комментарии).
- [ ] `If … Then` в одну строку; `ElseIf` вместо `Else If`; парные `End If`.
- [ ] Парные `Begin/End`, `Try/End Try`, `For/End For`, `While/End While`.
- [ ] Экспорт — `ExportToFile`; сохранение — `KE_CLASS_DOCUMENT` + `IDocument.LoadFromFile`.
- [ ] Скачивание — ссылка `{Key}&attach=1&fileName={Name}` + `DBA.Helper.Download`.
- [ ] Закрытие курсоров/команд/потоков; удаление временных файлов.
- [ ] `node tools/fore-lint-check.js Fore` → 0 предупреждений.
- [ ] Обработка «пусто» (`Null`, `Eof`) и ошибок (`Try/Except`).

---

## 11. Проверенные факты, ссылки и допущения

### 11.1. Подтверждено справкой «Форсайт 10.8 LTS»

- `ICalculateReportScheduledTask`: `SourceReport`, `FormatTag`, `Printer`, `GetExportSettings`,
  `PutExportSettings`, `ReadResult` (+ `Properties`, `State`, `GetResults`, `ResetResults`).
- `ReadResult` — для случая, когда `FormatTag` **не** задан.
- `IPrxReportExporter` (сборка `Report`, наследует `IExporter`): форматы `xlsx, xls, pdf, rtf, ppxt,
  html, mht, ods, emf, png`; документированный метод экспорта — `ExportToFile`.
- `PP.Prx.PrxMdService` — источник данных для компонента ReportBox (не сервис экспорта).
- `IScheduledTaskProperties`: активность — `Active` (**не `Enabled`**); есть `Period`, `CreatePeriod`,
  `ParamValues`, `SendMail`/`MailRecipients`/`MailSubject`/`MailBody`/`AppendAttachment`, `FtpAddress`.
- `IScheduledTasksContainer` наследует `IScheduledTask` и даёт `ExecuteImmediate` (запуск задачи).
- `IScheduledTaskPeriodDaily`: `StartDateTime`, `EveryDays`.
- `IScheduledTaskProperties`: у задачи ровно **один** `Period` (коллекции `Periods` нет); дополнительно
  есть `Alerts`, `EventId`, `MailTargetType`, `UseDynamicMailList`, `LoadParamValues`.
- `IScheduledTaskPeriod.Next(date)` (метод **базового** периода) — расчёт следующей даты и времени
  запуска относительно указанной даты — основа анализа пересечений (§6.18).
- `IScheduledTaskPeriodOneTimeOnly`: `StartDateTime`, `StartMode`.
- `IDateTimePicker` (сборка Forms, каталог `ModForms`): значение — **`CurrentDate`** (унаследовано
  от `ICommonCalendar`); свойства `Kind` (дата/время), `Format`, `AllowEmpty`, `IsEmpty`; метод `Reset`.
- GUI (сборка `Forms`, каталог `ModForms`): базовые `IComponent` → `IControl` (общие свойства и
  события, в т.ч. `OnClick`, `OnChange`); форма `Form` (конструктор `CreateForm`; события `OnCreate`,
  `OnShow`, `OnClose`, `OnCloseQuery`, `OnResize`; **только настольное приложение**); контролы
  `Button`, `Label`, `EditBox` (+базовый `ICustomEdit`), `CheckBox`, `RadioButton`, `ComboBox`,
  `ListBox`, `Panel`, `GroupBox`, `PageControl`, `DateTimePicker`.
- `IStringList` (Collections) — коллекция строк: `Add` (возвращает индекс), `Item`, `Count`, `Clear`.
  `IListBox.Items` / `IComboBox.Items` — коллекция строк; выбранная строка — `ItemIndex`.
- GUI-контролы (Forms): `IListView` (+`IListViewItems`/`IListViewItem`), `ITreeList` (база
  `ITreeControl`), `IToolbar` (база `IUiBar`), `IStatusBar`, `ITimer`, `ISplitter`, `IMemo` (`Lines`),
  `IImageList`, `IPopupMenu`, `IFontDialog`/`IColorDialog` (последние два — только настольное).
- Форма: конструктор `Form.CreateForm([Parent: IWin32Window = Null])`; показ — `Visible := True`
  или `ShowModal`; **только настольное приложение**.
- Свойства **`Form`** (ModForms): `BorderStyle`, `Constraints`, `Icon`, `Position`, `WindowState`,
  `Align`, `Anchors`, `ClientHeight`/`ClientWidth`, `Color`, `Font`, `Height`/`Width`, `Left`/`Top`,
  `Hint`/`ShowHint`, `Visible`, `Name`, `Tag`; события `OnCreate`, `OnShow`, `OnClose`, `OnCloseQuery`,
  `OnResize`.
- Свойства **`IControl`** (общие для контролов): `Left`, `Top`, `Width`, `Height`, `Visible`, `Parent`,
  `Align`, `Anchors`, `TabOrder`, `TabStop`, `Hint`, `Name` — значит, раскладку можно задавать кодом (§5.28).
- **`IListView`**: помимо `Items`/`Columns`/`SelectedItem`/`Checkboxes`/`MultiSelect`/`Style` есть
  `GridLines`, `RowSelect`, `ShowColumnHeaders`, `ReadOnly`, `BorderStyle`, `HotTrackStyles`.
- `WinApplication.ConfirmationBox(<текст>)` — диалог подтверждения (настольное приложение); используется
  в кнопках «Убрать план» и «Применить план без простоя» (§6.25).
- **Динамическое создание компонентов** (справка KB «Компоненты дизайнера форм» + справка языка):
  `X := New <Класс>.Create` (например `New Button.Create`); для визуальных (`IControl`) обязателен
  `Parent` — `Self` (форма) либо контейнер (`Panel`, `GroupBox`, `ScrollBox`), для невизуальных
  (`IComponent`) `Parent` не нужен; события подписываются кодом (`btn.OnClick := Handler`,
  `t.OnTimer := Handler`); освобождение — `Dispose`, для визуальных — `FreeComponent` + `Dispose`.
  `IScrollBox` — прокручиваемый контейнер (ModForms). Подробности и подводные камни — §5.28.

> ⚠ О формулировке «контролы **обязательно размещать в дизайнере**» (встречается в ранних заметках §5.16–5.33):
> это **неподтверждённое** требование — на текущем стенде оно не проверялось, а справка прямо описывает
> динамическое создание компонентов кодом (см. выше). Если на стенде `New <Класс>.Create` + `Parent` работает
> и для списков репозитория (`MetabaseListView`/`MetabaseTreeList`), дизайнер не нужен: контролы создаются
> в `CreateFormComponents` (под `If IsNull(...)` для совместимости с формой, где они уже размещены),
> а вид/колонки/привязки событий задаются кодом. События **самой формы** (`OnCreate`/`OnShow`/`OnCommand`)
> кодом привязать нельзя — API в `IForm` нет: их проставляют в Инспекторе формы (в v1.99 инструмент деплоя
> `Fore/DeployToolForm.fore` выписывает по каждому файлу готовый список «событие → обработчик»).
- `SortedList` (Collections): кроме `Add`/`GetByIndex` есть `IndexOfKey` — поиск значения по ключу без
  перебора (индекс ответственных в §6.19, `FindTaskResponsibleInIndex`).
- `IScheduledTaskResult.Succeeded` — признак **успешного** прогона (в отличие от `Finished`): по нему
  диспетчер отличает «выполнено» от «упало» (§6.25).
- **`IForeSerializer` / `IForeSerializerLoader`** (сборка `Fore`) — перенос модулей, **форм** и сборок
  между репозиториями файлами: `fs := New ForeSerializer.Create; fs.SaveFormToFile(<IForm>, '*.ppform')`,
  `SaveModuleToFile(<IModule>, '*.ppmodule')`, `SaveAssemblyToFile(<IAssembly>, '*.ppassembly')`;
  обратно — `Loader := fs.CreateLoaderFromFile(<файл>, MB)`, затем `Loader.CreateInfo` (`Id`, `Name`,
  `Parent`) и `Loader.LoadForm` / `LoadModule` / `LoadAssembly` (объект создаётся в репозитории;
  при совпадении Id — исключительная ситуация, поэтому Id/Name заранее корректируют).
- **`INetSmtpClient` / `INetMailMessage` / `INetMailAddress`** (сборка `Net`, каталог ModNet): SMTP-клиент
  создаётся конструкторами `CurlSmtpClient.CreateWithHost` / `CreateWithHostAndPort`; свойства `Host`,
  `Port`, `EnableSsl`, `Timeout`, `Credentials`, `ThisHostCredentials`, `UseDefaultCredentials`, метод
  `Send`; у сообщения — `From_`, `To_`, `CC`, `Bcc`, `Subject`, `Body`, `IsBodyHtml`, `Attachments`,
  `Priority`, `ReplyTo`, `Sender` и кодировки. Используется в `UnavailNotify.fore` (§6.26).
- `MetabaseObjectClass.KE_CLASS_FORM` — класс «Форма» (для фильтров/списков объектов, §6.24).
- `IDataGrid` (ExtCtrls): таблица данных с `DataSource`, `Columns`/`Rows`, `CellValue`, `Selection`,
  `AllowEdit`/`AllowAppend`/`AllowDelete`.
- Доп. контролы (Forms/ExtCtrls): `ITrackBar`, `IMonthCalendar` (`CurrentDate`/`BeginDate`/`EndDate`/
  `MultiSelect`), `IListViewColumn` (столбец ListView).
- Привязка данных на форме (ExtCtrls): `IDataGrid` → `IUiDataSource` (`Dataset: IUiDataSet`) →
  `IUiDataSet` (реализации `IUiMemoryTable`/`IUiTable`/`IUiQuery`/`IUiMetabaseDataset`/`IUiRdsDictionary`).
- Файловые диалоги (Forms, **настольное**): `IFileDialog`/`IFileOpenDialog`/`IFileSaveDialog`
  (`FileName`/`FileNames`, `Filter`, `Execute`). Картинка — `IImageBox` (`Image`, `Stretch`).
- `IWinApplication` (UiLib): `Globals`, `Windows`, `Params`, `ApplicationSettings`, `LicenseManager`;
  `GetObjectTarget`, `GetPluginTarget`, `ProcessMessages`.
- Сборка System (`ForeSys`): `String` (методы класса и переменной), `Array`, `TimeSpan`, `Guid`,
  `Debug`, `Exception` — §5.30.
- Сборка IO (`ModIo`): `Path`, `File`, `Directory` (только статические методы), `MemoryStream`/
  `FileStream`, `BinaryReader`/`BinaryWriter`, `TextReader`/`TextWriter` — §5.30.
- `IDalCursor`: `Eof` (метод), `Next`; `IDalCommand`: `SQL`, `Params`, `Parse`, `CreateCursor`, `Close`.
- `IDocument` (базовый `IDocumentBase`): `FileName`, `LoadFromFile`, `SaveToFile`, `GetAsStream`.
- `IMetabase`: есть `GetObjectKeyByIdNamespace`, `GetCurrentStamp`; **нет** `FindById`.
- `IMetabaseObjectParams`: `CreateEmptyValues`, `FindById`; `IMetabaseObjectParamValues`: `FindById`.
- `IPrxReport`: `ActiveSheet`, `Recalc`, `SaveToFile`/`SaveToStream`, `UserButtons`, `Sheets`.
- `ITabSheet`: `Columns`, `Rows`, `Row`, `Cell`, `MaxNotEmptyColumn`; `IPivot`: `ObtainTable`, `Selection`,
  `LeftHeader`/`TopHeader`, `DataSource`, `Refresh`; `ICubeInstance`: `Destinations`, `Cube`.
- `IScheduledTask` — базовый: `Properties`, `State`, `TaskChecker`, `ExecuteImmediate`, `GetResults`,
  `ResetResults`; `IScheduledTaskResult`: `Succeeded`, `StartDateTime`, `FinishDateTime`, `Messages`,
  `ReadDataStream`; периоды: `Weekly` (`DaysOfWeek`, `EveryWeeks`), `Monthly` (`Day`, `WeekOfMonth`,
  `Months`), `Timely` (`TimeInterval`).
- `IDimSelection`: `SelectAll`/`DeselectAll`/`SelectElement`/`DeselectElement`/`SelectChildren`/
  `SelectLevel`/`IsElementSelected`/`CopyTo`/`AttributeToVariant`; `IDimSelectionSet`: `Add`, `FindById`,
  `BeginUpdate`/`EndUpdate`, `CopyTo`; `IDimElements`: `Count`, `Name`, `Id`, `FindById`, `Iterator`.
- `ICubeInstanceDestination`: `CreateDimSelectionSet`, `CreateExecutor`, `Execute`, `FlushCache`;
  `IEaxDataArea`: `Slices`, `Views`, `BeginUpdate`/`EndUpdate`, `Execute`.
- `IDtConsumer`/`IDtExcelConsumerEx` (Dt): `Open`, `Clear`, `Put`, `PutRow`, `Close`; `File`, `Sheet`,
  `HasHeader`; `IPythonUtils`: `AddFolderToPythonPath`, `Invoke`, `InvokeModule`.
- `ILog` (журнал): `Database`, `NativeName`, `Fields`, `CreateLog`, `PutRecord`; `IMetabaseUser`:
  `Name`, `FullName`, `IsAdmin`, `HasAccess`, `GetEffectiveRights`, `MemberOf`.
- `IExporter` (сборка **Drawing**, каталог `ModDrawing`) — свойства `CSSClassName`, `Encoding`,
  `ExportFromWeb`; метод только **`ExportToFile`** (без `ExportToStream`). Класс `PrxReportExporter`
  (сборка `Report`) — экспорт через `IExporter.ExportToFile`.
- `IScheduledTasksContainer.Tasks : IMetabaseObjectDescriptors` — коллекция описаний (только
  перечисление/`Item`); **создание задачи** — `CreateCreateInfo` + `ClassID := MetabaseObjectClass.KE_CLASS_TASK_*`
  + `MB.CreateObject(...).Edit` (подтверждённый пример: `KE_CLASS_TASK_EXECUTESUB`, `IExecuteSubScheduledTask`).
- `IScheduledTask.State : ScheduledTaskState` — `0` неактивна, `1` готова, `2` выполняется, `3` завершена,
  `4` ошибка; дата/время — `DateTime.Compose(year, month, day, h, m, s, ms)`.
- `IDocumentBase`: `GetAsStream`, `LoadFromFile`, `LoadFromStream`, `SaveToFile`, `SaveToStream`.
- `IIOStream` (сборка IO) — база `IFileStream`/`IMemoryStream`; `Position`, `Size`, `CopyFrom`, `Seek`.
- `ITabRange.AdjustWidth([MaxWidth = -1][MinWidth = -1])` — автоподгонка ширины столбцов (мм),
  есть также `AdjustHeight`.
- `IDatasetInstance` (Db): `Fields`, `FieldDefs`, `Dataset`; `Eof`, `Next`, `First`, `Execute`, `Close`.
- В примерах справки указывается «Добавьте ссылки на системные сборки: …» (напр. `Fore`, `Metabase`) —
  для компиляции модуля нужны ссылки на соответствующие сборки.
- Контейнер задач: 8 типов задач (`IExecuteSubScheduledTask`, `ICalculateReportScheduledTask`,
  `ICalculateCubeScheduledTask`, `ICubeCacheUpdateScheduledTask`, `IMDCalculationScheduledTask`,
  `ICalculateModelScheduledTask`, `IExecuteEtlScheduledTask`, `ISearchEngineImportScheduledTask`) — §5.16.
- `IScheduledTaskProperties.Class_`: у каждого класса задач своя очередь, потоки делятся между классами
  «равными частями» — инструмент балансировки; `Queueing` — защита от наложения запусков.
- Чекеры: `IScheduledTaskChecker`/`ModuleChecker`/`ValidationChecker`; алерты: `IScheduledTaskAlert`/
  `AuditAlert`/`CustomAlert` + коллекция `IScheduledTaskAlerts`.
- `IScheduledTaskPeriodOneTimeOnly`: `StartDateTime`, `StartMode`; `IScheduledTaskResults`: `Count`,
  `Item`, `FindByKey`, `FindCurrent`.
- Классы задач (`MetabaseObjectClass`): `KE_CLASS_TASK_CALCULATEREPORT` = 5380,
  `KE_CLASS_TASK_EXECUTESUB` = 5377, `KE_CLASS_TASK_CONTAINTER` = 5378 и др. — полная таблица в §5.16.
- Перечисления: `ScheduledTaskState` (`0 Inactive`…`4 Failed`), `ScheduledTaskPeriodType`
  (`0 None`, `1 Daily`, `2 Weekly`, `3 Monthly`, `4 OneTimeOnly`, `5 Timely`),
  `MetabaseSpecialObject` (…`7 DefaultDatabase`).
- Шаблон URL перечислений в справке: `.../mergedProjects/<Каталог>/enums/<Имя>.htm`.
- `MetabaseObjectClass`: `KE_CLASS_DOCUMENT` = 3329, `KE_CLASS_PROCEDURALREPORT` = 2562 (регламентный
  отчёт), `KE_CLASS_APPSERVER` = 3073 (планировщик задач); `KE_CLASS_STORAGE` отсутствует — см. §5.17.
- UI/диалоги (ExtCtrls): `IMetabaseListView` (`Root`, `Items`, `SelectedItem`, `SelectedObjects`,
  `FindByDescriptor`, `SelectElem`, `AdjustWidth`), `IMetabaseListViewItem` (**`ObjectDescriptor`**, `ColumnText`);
  `IMetabaseDialog` (база для `IMetabaseOpenDialog`/`SaveDialog`): `Execute`, `Object`, `Objects`, `Filters`,
  `FilterIndex`; `IMetabaseDialogFilters`: `AddFilter`, `Clear`, `Remove`; `IMetabaseDialogMetaclassFilter.ObjectMetaclass`.
- `WinApplication` (Ui): `Instance`, `GetObjectTarget`, `GetPluginTarget`; статические диалоги
  `InformationBox`/`ErrorBox`/`ExclamationBox`/`ConfirmationBox`/`YesNoCancelBox`/`InputBox`.
  `IUiCommandTarget.Execute` — **только настольное приложение**.
- `DateTime`: `Compose`/`AddSeconds`/`AddMonths`/`Difference`/`Now` — методы класса; `Year`/`Month`/`Day`/
  `Hour` — свойства переменной; `TimeSpan`: `FromSeconds`/`Add`/`Subtract`/`Zero`/`TotalSeconds`.
- `IArrayList` (Collections): `Add` возвращает индекс; **`Item` — только чтение**; есть `Insert`, `RemoveAt`,
  `Sort`, `Reverse`, `Clear`, `IndexOf`, `ToArray`, `AddRange`.
- `IMetabase.CreateFindInfo` → `IMetabaseObjectFindInfo` (`ClassId`, `Text`, `Scope`, `ScanNestedNamespaces`,
  `ScanHiddenFolders`, `InternalObjects`, `ContainersContent`, `CaseSensitive`, `WholeWordsOnly`) →
  `IMetabase.Find` → `IMetabaseObjectDescriptors`.
- `IUiCommandTarget.Execute(Command: String; Context): Variant`; команды `Object.Open`/`Edit`/`Access`/`History`,
  `ShowMetabaseObject`, `ShowMetabaseFolder`, `ShowFindObjects`, `DebugObject`, `ShowExportPropSetup`,
  `Cube.CreateReport`, `Problem.Run`. `WinApplication.InformationBox(Message; [ParentWindow])`.
  **Оба — только настольное приложение.**
- `IMetabaseListView.Root: IMetabaseObjectDescriptor` — значение: папка или объект-контейнер.
- Массивы (`Array`): `Ar: Array[10, 15]` (статические, многомерные), `Array Of T` (динамические);
  члены переменной — `Length`, `Rank`, `Sort`, `IndexOf`/`LastIndexOf`, `Concat`, `GetLowerBound`/`GetUpperBound`.
- Коллекции (Collections): `IEnumerable` → `ICollection`(`Count`, `CopyTo`; `For Each`) → `IList` → `IArrayList`;
  `IDictionary` → `IHashtable`/`ISortedList`; плюс `IQueue` (`Enqueue`/`Dequeue`/`Peek`),
  `IStack` (`Push`/`Pop`/`Peek`), `IBitArray`, `IStringList`, `IStringMap`.
  `SortedList` — пары «ключ-значение», автосортировка по ключу (`GetByIndex`/`SetByIndex`/`GetKey`).

Ссылки:

- https://help.fsight.ru/10.8/ru/mergedProjects/kereport/interface/icalculatereportscheduledtask/icalculatereportscheduledtask.htm
- https://help.fsight.ru/10.8/ru/mergedProjects/kereport/interface/iprxreportexporter/iprxreportexporter.htm
- https://help.fsight.ru/9.2u10/ru/mergedProjects/kereport/interface/icalculatereportscheduledtask/icalculatereportscheduledtask.readresult.htm
- https://help.fsight.ru/9.2u6/ru/mergedProjects/dhtmlReport/classes/pp.prx.htm

### 11.2. Подтверждено кодом проекта

`KE_CLASS_DOCUMENT` + `CreateCreateInfo` + `IDocument.LoadFromFile`; ссылка
`{0}&attach=1&fileName={1}` и `DBA.Helper.Download(...)`; `ItemByIdNamespace` + параметры отчёта;
`ExportToFile`; приёмы `exmail.txt` (рассылка, SQL).

### 11.3. Не подтверждено (проверить на стенде)

- `DBA.Helper` (JS): **проектный** хелпер, не платформенный. Что известно из кода проекта
  (`UNIT_MM_REPORT_EXPORTER.txt`): вызов `DBA.Helper.Download('<link>')`, где
  `link = "<Key>&attach=1&fileName=<Name>"`, а Fore возвращает JSON `{"Download":"<link>"}`.
  Неизвестно: где определён; полный API; **кто подставляет базовый URL/путь** (в ссылке нет хоста);
  как Fore-функция вызывается из клиента. Проверка: в браузере (devtools) на стенде —
  `DBA.Helper.Download.toString()` покажет построение URL. В справке Форсайт namespace `DBA` не найден
  (есть только платформенное `PP`), в исходниках проекта определение тоже отсутствует.
- Полный префикс URL для `DBA.Helper.Download` и доступность хелпера (Q6).
- Доступность проектных утилит `AppMbExt`, `DBA.Helper` в целевой среде (Q20).
- Точные `Id` объектов: отчёт, папка, контейнер задач (Q11).
- Точная сборка платформы (Q1), часовой пояс планировщика (Q10).
- ~~**Имя перечислимого типа для `IListView.Style`**~~ — **закрыто** (справка 10.9, §5.32): тип
  `ListViewStyle` (`Icon` / `SmallIcon` / `List` / `Report`); коллекция `IListView.Columns` —
  `IListViewColumns` с методами `Add` (`Add: IListViewColumn`), `Clear`, `Delete` и свойствами
  `Count`, `Item`; `DateTimePicker.Kind` — `DateTimePickerKind` (`Date` / `Time`). Шаблоны используют
  это в коде: `LV.Style := ListViewStyle.Report;`, `Columns.Add` (колонки, если их нет),
  `Kind := DateTimePickerKind.Date` / `.Time`.

---

## 12. Открытые вопросы

Список уточнений нового проекта — будет добавлен вместе с ТЗ.
Общие ещё не подтверждённые факты по платформе — §11.3.

Новые вопросы, возникшие при описании балансировки нагрузки (§5.16, §6.14, §6.16):

- **Диапазон `Class_`.** Какие значения допустимы, как планировщик сопоставляет классы потокам и
  влияет ли `Class_` только на разбиение очередей или ещё и на приоритет. Проверить на стенде.
- **Границы статического массива `Array[N]`.** Подтвердить, что индексы начинаются с 0
  (`GetLowerBound`/`GetUpperBound`) — важно для гистограммы из §6.16.
- **Часовой пояс стартов.** В каком поясе планировщик трактует `StartDateTime` (см. Q10) —
  влияет на выбор окна планирования в §6.14.

Вопросы по планированию недоступности системы (§6.18, §6.21):

- ~~**Материализация доп. запусков.**~~ **Решено (§6.21):** служебная задача-диспетчер (`Timely`) +
  `IScheduledTask.ExecuteImmediate(True)` по файлу плана с журналом выполненных (универсально для любого
  класса задачи; запущенный планировщик не требуется). Реализация — `Fore/UnavailabilityRunner.fore`.
- **Точность запуска.** Диспетчер опрашивает план раз в `RUN_POLL_MINUTES` минут, поэтому фактический
  старт может опоздать на интервал опроса. Уточнить на стенде, какой интервал приемлем.
- **Альтернатива «точно по времени» (не используется).** Старт секунда-в-секунду дают задачи с периодом
  `OneTimeOnly` (платформа запускает сама, см. §5.10), но для них нужно знать исполнитель задачи
  (модуль/процедура или отчёт) и они оставляют записи в контейнере — от способа отказались в пользу
  диспетчера. Вернуться к вопросу, если точности опроса окажется недостаточно.

---

## 13. Поддержка этого файла

- При новых находках по API — дополняйте §5 и §11.
- Новые рабочие сценарии — в §6.
- Обнаруженные грабли — в §8.
- Держите §11 в актуальном статусе: подтверждено / не подтверждено.
- Новые термины заносите в **§14** (глоссарий) и синхронизируйте его с §5–§6.
- Источник истины по требованиям — ТЗ/план проекта (будет добавлено).
- Справочник перенесён из проекта «Export button Forsite»; общая часть (§3–§11) одинакова для любых
  проектов на Форсайт/Fore, история версий ниже — из исходного проекта.

---

## 14. Глоссарий (термины проекта и платформы)

Термины, которые чаще всего встречаются в этом справочнике и в коде проекта.

| Термин | Кратко | Где |
|--------|--------|-----|
| **Репозиторий (метабейз)** | Хранилище объектов платформы; из кода — `MetabaseClass.Active` | §3, §5.1 |
| **Дескриптор** | «Указатель» на объект репозитория (`IMetabaseObjectDescriptor`) без открытия | §5.1 |
| **Bind / Open** | `Bind` — получить объект для работы; `Open(params)` — открыть с параметрами (напр., отчёт) | §5.1, §6.1 |
| **`Edit` / `Save`** | `Edit` — режим редактирования объекта; изменения фиксируются `Save` | §5.1, §6.3 |
| **Контейнер задач** | `IScheduledTasksContainer`, объект класса `KE_CLASS_TASK_CONTAINTER` (5378) | §5.16 |
| **Задача** | Объект класса `KE_CLASS_TASK_*`, напр. `KE_CLASS_TASK_CALCULATEREPORT` (5380) | §5.16 |
| **Период** | Расписание задачи: `Daily` / `Weekly` / `Monthly` / `Timely` / `OneTimeOnly` | §5.10, §6.10 |
| **`Class_`** | Класс (очередь) задачи; потоки делятся между классами поровну — инструмент балансировки | §5.16 |
| **`Queueing`** | Флаг «не запускать новый экземпляр, пока идёт предыдущий» | §5.16 |
| **Чекер** | Условие запуска (`IScheduledTaskChecker`): по модулю или по правилу валидации | §5.16 |
| **Алерт** | Событие/уведомление по задаче (`IScheduledTaskAlert`): audit / custom | §5.16 |
| **Результат (прогон)** | Запись истории (`IScheduledTaskResult`): старт, финиш, успех | §5.10, §6.9 |
| **LPT** | Стратегия «самые длинные — первыми»; применена в `BuildPlan` | §6.14 |
| **Документ** | Объект-файл в репозитории (`KE_CLASS_DOCUMENT`, 3329) | §5.17, §6.3 |
| **Регламентный отчёт** | Отчёт-объект (`KE_CLASS_PROCEDURALREPORT`, 2562); экспорт — `ExportToFile` | §5.2, §5.17 |
| **Диспетчер (сервер приложений)** | Объект `KE_CLASS_APPSERVER` (3073) — сам планировщик | §5.17 |
| **Линтер** | Проверка `.fore` на баланс блоков; автономный порт — `tools/fore-lint-check.js` | §7.2, §9 |
| **Разовый запуск** | Доп. одиночный прогон задачи после простоя; у задачи один `Period`, поэтому реализуется диспетчером | §6.18, §6.21 |
| **Диспетчер (наш)** | Служебная задача «Выполнение модуля» с периодом `Timely`, вызывающая `RunDuePlannedRunsMain` | §6.21 |
| **`ExecuteImmediate`** | Выполнить задачу немедленно в текущем процессе/репозитории (планировщик не нужен) | §5.10, §6.21 |

---

> Версия: 1.131 (**этап 6: минимальный мост для агента** — обмен через файлы):
> 1) две кнопки слева (список объектов укорочен 250 → 200; строка y 262…292): **«Агент: контекст → файл»**
>    (`BtnAgentCtx`) и **«Агент: правка ← файл»** (`BtnAgentApply`). Заодно выровнена вся левая колонка:
>    кнопки компиляции встали в одну строку (552…582), флажок «Кириллица» переехал на строку 586…606
>    (раньше он выходил за границу колонки и ложился поверх редактора). Проверено скриптом по всем
>    координатам `ScreenSpecText`: ни один контрол левой колонки не выходит за x = 436, строки не
>    пересекаются;
> 2) **контекст → файл** пишет один UTF-8-файл (`<Имя>-context.txt`): заголовок (объект, файл, сборка,
>    режим списка, символы/строки, применена ли перекодировка кириллицы), **задание для агента**, проблемы
>    линтера (пересчитываются на текущем тексте), состояние сборки (`CheckCompiled`/`Version`/`TimeStamp`),
>    журнал редактора и **текст модуля между маркерами** `--- НАЧАЛО ТЕКСТА МОДУЛЯ (для агента) ---` /
>    `--- КОНЕЦ ТЕКСТА МОДУЛЯ ---`;
> 3) **правка ← файл**: читает ответ агента (текст из маркеров; если маркеров нет — файл целиком),
>    печатает в журнал отчёт «было/стало» (`CompareLinesReport`: число строк, отличия по номерам, первые
>    пять отличий) и применяет текст **только после** `WinApplication.ConfirmationBox`; дальше —
>    «Сохранить в репозиторий» или «Сохранить + компилировать»;
> 4) протокол обмена зафиксирован ниже — тот же приём, что у нашего деплоя (файлы в папке проекта),
>    поэтому внешний агент на Python подключается без изменений в редакторе.
> Проверки: lint `Fore` — 16/0, check-all — 0, spec — 0; файл ~87 КБ (2400+ строк).
>
> **ЦИКЛ РАБОТЫ С АГЕНТОМ (минимум, уже работает):**
> 1. открыть модуль (репозиторий или файл) → **«Агент: контекст → файл»** → получить `…-context.txt`;
> 2. передать файл агенту (человеком или скриптом) → агент возвращает **отдельный файл**, внутри маркеров
>    — только текст модуля (та же кодировка UTF-8, без нумерации строк);
> 3. **«Агент: правка ← файл»** → в журнале отчёт «было/стало» → подтвердить применение;
> 4. **«Сохранить + компилировать»** → в журнале отчёт компиляции (`CheckCompiled`); при ошибках —
>    снова с шага 1 (в контекст попадёт свежий журнал с ошибками).
>
> **ДАЛЬШЕ (после проверки на стенде):** авто-цикл (таймер формы сам находит в папке обмена файл ответа
> `…-fixed.txt` и предлагает применить), чат-панель (Memo + EditBox + «Отправить»), полный набор
> инструментов агента (read/write/patch/compile/lint) и HTTP-транспорт, если платформа даст клиента.
> 1) новый ряд слева (список объектов укорочен 300 → 250, y 304…334): поле номера `InsEdit` + кнопки
>    **«Подсказки (в журнал)»** (`BtnHint`) и **«Вставить подсказку №»** (`BtnInsert`);
> 2) `WordBeforeCaret` — слово слева от курсора: позиция читается через `SelStart` (на чтение он
>    работает, на запись — нет), признаки символов слова определяются по кодам из `ByteTab`
>    (`IsWordChar`: A-Z a-z 0-9 `_` `.`);
> 3) `HintsOnClick` — по префиксу собирает до 30 символов **открытого текста** (`Class`/`Sub`/`Function`/
>    `Const`; имя вытаскивает `HintNameOf`) и печатает их в журнал с номерами, видом и номером строки;
>    если панель «Структура» была выключена флажком — структура перечитывается на месте;
> 4) `InsertHintOnClick` — вставляет выбранный номер через `SelLength := 0; SelText := <слово>` —
>    единственный проверенно работающий способ вставки в этом рантайме (курсор остаётся на месте);
> 5) номер разбирается своим `DigitsToInt` (гарантированного `Integer.Parse` в языке нет, а `Ord`/
>    обратной к `Char.Chr` функции в доступной справке тоже нет — поэтому все коды идут через `ByteTab`).
> Проверки: lint `Fore` — 16/0, check-all — 0, spec — 0; файл 2262 строки.
> **Дополнить чек-лист:** набрать в редакторе «Fo», поставить курсор сразу после «Fo» → «Подсказки
> (в журнал)» → в журнале список (например `FormOnCreate`) → ввести номер в поле → «Вставить подсказку №»
> → слово встанет в позицию курсора. Если список пуст — значит в открытом тексте нет таких объявлений
> (структура собирается из самого текста, словарь платформы — следующий шаг, через `IForeAssembly`).
>
> **СЛЕДУЮЩИЙ ЭТАП (6, агент):** «контекст → файл» (текст модуля + проблемы линтера + отчёт компиляции
> одним UTF-8-файлом), «правка ← файл» (применить текст из файла + отчёт «было/стало» по строкам),
> затем чат-панель и инструменты агента (read/write/patch/compile/lint) — транспорт: папка обмена,
> далее HTTP, если платформа даст клиента.
> 1) причина: платформа отдаёт `IModule.Text` как однобайтовые символы, **коды которых равны байтам
>    UTF-8** («ÐšÐ°Ñ€…» вместо «Кар…»). В справке у `Char` есть только `Char.Chr` (обратной функции
>    «код символа» нет), поэтому таблица «символ → код» строится один раз: `ByteTab` = `Char.Chr(1..255)`,
>    код = `ByteTab.IndexOf(Ch) + 1` (`BuildByteTab`, `ByteCodeOf`);
> 2) **детект** (`LooksLikeMojibake`): ищем ≥ 4 пары «0xD0/0xD1 + 0x80..0xBF» (лидер + продолжение
>    кириллицы в UTF-8) и при этом отсутствие настоящих кириллических букв (пробы `HasRealCyr` по а/е/о/и/А/С).
>    В нормальном тексте (в том числе CP1251) такие пары практически не встречаются — поэтому ложных
>    срабатываний нет; текст с корректной кириллицей не трогаем вообще;
> 3) **декодер** `MojibakeToUnicode`: UTF-8 вручную (1/2/3 байта → символ через `Char.Chr`), любой
>    подозрительный байт или 4-байтный символ → откат и текст возвращается как есть (никакой порчи);
>    ограничение 400 000 символов на перекодировку;
> 4) применяется при **открытии объекта сборки**; исходный текст сохраняется в `OrigRepoText`, поэтому
>    флажок **«Кириллица: исправлять текст из репозитория»** (`ChkCyr`) работает как ручное переключение
>    «исправить ↔ вернуть как было» (с предупреждением, если в перекодированном виде были правки);
>    каждое действие пишется в журнал («Кодировка: похоже на UTF-8-байты — декодирую (символов: N)»);
> 5) при **сохранении в репозиторий** добавлена проверка: модуль читается обратно и длина сравнивается с
>    записанной; при расхождении — «⚠ в репозитории N символов вместо M — вероятна потеря символов
>    при перекодировке (сохраните копию в файл!)». Это страховка от потери кириллицы на записи;
> 6) чтение/запись **файлов** не затронуты (там UTF-8 задаётся явно и работает верно).
> Проверки: lint `Fore` — 16 файлов / 0 предупреждений, check-all — 0 проблем, spec — 0; файл 1994 строки.
>
> **ЧЕК-ЛИСТ УТРЕННЕЙ ПРОВЕРКИ (по порядку):**
> 1. Перезалить `MyCodeEditor1\EditorForm.fore` → закрыть и снова открыть **FOREDITOR** (старая форма
>    держит в памяти свои контролы).
> 2. «Список: сборка» → Id сборки → «Обновить» → открыть модуль: в журнале должна быть строка
>    «Кодировка: …». Если текст стал читаемым — перекодировка сработала; если нет — переключить флажок
>    «Кириллица: исправлять текст из репозитория» и прислать строки журнала (там есть длины до/после).
> 3. «Сохранить и скомпилировать» → в журнале отчёт компиляции (или текст ошибок). Если будет жалоба
>    компилятора на `IForeServices`/`IForeRuntime` — проверьте, что у сборки формы есть ссылка `Fore`
>    (как у `Fore/EditorSpike.fore`; в шапке `EditorForm.fore` отмечено, что эти вызовы уже проверены спайком).
> 4. Пощёлкать 4+1 флажок (карта/структура/проблемы/автообновление/кириллица) — панели уходят и
>    возвращаются, в журнале «Панель «…»: включена/выключена».
> 5. «Номера строк (окно)», «Показать строку», «Найти далее» — строка показывается в журнале с номером
>    (прокрутка Memo платформой не поддерживается — см. 1.126/1.127).
>
> **СЛЕДУЮЩИЕ ЭТАПЫ (реализую дальше):** 4 — подсказки/автодополнение по сборке и локальным символам
> (список в журнал + вставка выбранного номера через `SelText`, он проверенно работает); 6 — мост для
> агента: «контекст → файл» (текст модуля + проблемы линтера + отчёт компиляции) и «правка ← файл»
> (применить текст из файла с отчётом diff), далее — чат-панель и инструменты (read/write/patch/compile/lint).
> 1) в описание экрана добавлены 4 чекбокса (`CHECK;…`, читаются через `UiChecked`) и 2 кнопки:
>    «Карта строк» (`ChkMap`), «Структура (символы)» (`ChkStruct`), «Проблемы (линтер)» (`ChkProblems`),
>    «Автообновление панелей» (`ChkAuto`), «Сохранить и скомпилировать» (`BtnCompile`),
>    «Состояние сборки (CheckCompiled)» (`BtnCompileState`). Список «Структура» укорочен 248 → 148,
>    освободившееся место (y 508…614) занято этими контролами (координаты в `ScreenSpecText`);
> 2) применение чекбоксов — `ApplyExtras` каждый такт таймера (1 с): `ReadExtras` читает флажки
>    (`UiFind` + `UiChecked`; если контрола нет — остаётся True, как раньше), `SetPanelX` «выключает»
>    панель **уводом за левый край** (`Left := -4000`), а не `Visible := False` — у кодом-созданных
>    контролов Visible не срабатывает (урок 1.126). Каждое изменение пишется в журнал:
>    «Панель «X»: включена/выключена», т. е. переключение видно в отчёте;
> 3) `ChkAuto` гасит автообновление структуры/карты в таймере (статус обновляется всегда);
> 4) **компиляция из редактора (основная задача)**: `BtnCompile` = «Сохранить и скомпилировать» →
>    сохраняет открытый модуль в репозиторий (`SaveToRepoOnClick`) → `IForeRuntime.BindToAssembly(AsmId)`
>    — это и есть момент компиляции: ошибки приходят исключением, его текст печатается в журнал/консоль
>    («✖ ОШИБКИ КОМПИЛЯЦИИ сборки …») → затем `ResolveAssembly` + `CheckCompiled`, `Version`, `TimeStamp`,
>    `IsLoaded`, `HiddenReferences` (с временами сборки). `BtnCompileState` — тот же отчёт без
>    повторной компиляции. У `Bin.Version` нельзя вызывать `.ToString` (падает — замеры спайка 1.117).
>    Нужна ссылка на сборку `Fore` у сборки формы (проверка на стенде);
> 5) компиляция работает в режиме «Список: сборка» (нужен Id сборки в поле); для режима «папка» в
>    журнал пишется подсказка. Свой линтер («Проверить (текст)» / «Проверить сборку») по-прежнему даёт
>    номера строк до компиляции — до появления в API текстов ошибок это основной инструмент.
> Проверки: lint `Fore` — 16 файлов / 0 предупреждений, check-all — 0 проблем, spec — 0, refs OK.
> Версия: 1.127 (**исправление регрессии 1.126: редактор перестал принимать ввод**):
> 1) причина: второй `Memo` (`ViewMemo`) создавался **в рантайме** поверх редактора и «скрывался»
>    через `Visible := False` — у рантайм-созданных контролов этот сеттер не срабатывает (та же
>    особенность, что у `SelStart`), поэтому окно «только чтение» оставалось ровно на месте
>    `CodeMemo`: листать можно, печатать нельзя;
> 2) перекрытие убрано полностью: `ViewMemo` удалён из полей класса и из `CreateFormComponents`;
>    над редактором не создаётся ничего, `CodeMemo.ReadOnly := False` задаётся явно и не меняется;
> 3) нумерация строк сделана без окна поверх редактора: `PrintNumberedWindow(FromLine)` печатает
>    **окно 41 строки в журнал** (нужная строка помечена «>», формат «номер + маркер роли/проблемы +
>    текст», заголовок «Строки F–T из N»); вывод идёт через `FragBlock` (лимит 9000 знаков, чтобы окно
>    влезало целиком — у `Frag` хвост всего 4000);
> 4) кнопка `BtnNumbers` («Номера строк (окно)») печатает окно вокруг последней строки, к которой
>    переходили (`LastRefLine`, обновляется в `ScrollToPos` из карты/структуры/проблем/«Найти далее»);
>    при неудачной установке курсора `ScrollToPos` сам печатает это окно — строка видна с номером,
>    но редактор остаётся доступным для правки (режимы больше не переключаются);
> 5) если стенд остался в «залипшем» состоянии — достаточно закрыть и снова открыть форму FOREDITOR:
>    рантайм-контрол умирает вместе с формой.
> Проверки: lint `Fore` — 0 проблем, ui-spec — 0, refs OK, spec 45/0, check-all 0.
> Версия: 1.126 (по вашим двум замечаниям — **пролистывание редактора и нумерация строк**) —
> **пункт про просмотр с номерами поверх редактора отменён в 1.127** (ломало ввод), остальное в силе:
> 1) «пролистывание» сделано помощником **`ScrollToPos(Pos; LineNo)`**: сначала **ставит фокус** на поле кода
>    (`CodeMemo.SetFocus` — метод `IControl`, наследуется `Memo`; раньше фокус не проверяли), затем
>    `SelLength := 0; SelStart := Pos` и читает `SelStart` обратно. Результат честно пишется в журнал:
>    «редактор — на строке N (позиция P)» либо «⚠ поставить курсор не удалось (запросили P, получили G)».
>    Вызов добавлен в клики по **карте**, **структуре**, **проблемам** и в «Найти далее»
>    (`PosOfLine` считает позицию начала строки);
> 2) **нумерация строк** — второй `Memo` (`ViewMemo`, точно на месте редактора, только чтение) и кнопка
>    **«Номера строк: вкл/выкл»**: в режиме просмотра строки показываются с номерами (`Pad4` — выравнивание
>    вправо) и маркером роли/проблемы (`NumberedMark`: `!` для проблем, иначе роль строки), плюс заголовок
>    «строки F–T из N»; переключение — `SetNumbersMode(On_; FromLine)`;
> 3) если поставить курсор не удалось (запись `SelStart` в рантайме не работает), `ScrollToPos` **сам
>    переключает** в просмотр с номерами **окном вокруг нужной строки** (`RefillNumberedView(FromLine)`:
>    15 строк до и 200 после) — строка всё равно оказывается на экране; при успешной установке курсора
>    режим возвращается к правке;
> 4) строка кнопок пересобрана: «Открыть», «Сохранить в репозиторий», «Сохранить в файл», «Найти далее»,
>    «Заменить всё», «Показать строку», «Номера строк: вкл/выкл» (7 кнопок, 16…1384).
> Проверки: lint `Fore` — 16/0, ui-spec — 0 проблем, refs OK, spec 45/0, check-all 0.
> Файл: `Fore/EditorForm.fore` (1648 строк); рабочая копия — `MyCodeEditor1/EditorForm.fore` (CRLF).
> Версия: 1.125 (**Этап 3 проекта «Редактор Fore» — карта строк, вариант A подсветки**):
> 1) цвета внутри `Memo` и элементов списков платформе недоступны (замеры: нет owner-draw, нет цвет/шрифт
>    на уровне символа), поэтому «подсветка» сделана **маркерами ролей**: справа от кода — узкий список
>    **карта строк** (`MapList`, 104 px, колонки «№» и «Роль»), где каждая строка помечена:
>    `.` обычный код, `//` комментарий, `D` объявление, `B` блок/ветка, `T` есть текстовый литерал,
>    `+` продолжение строки, `-` пустая, **`!` строка с проблемой линтера**;
> 2) палитра маркеров — один блок `Const` в начале файла (`MAP_CODE`, `MAP_COMMENT`, `MAP_DECL`, `MAP_BLOCK`,
>    `MAP_TEXT`, `MAP_CONT`, `MAP_EMPTY`, `MAP_PROBLEM`) — менять оформление в одном месте;
> 3) роли определяет `LineRole(Line)`, а список «первых слов» — `StartsWithAny(S; List)`: так условия короткие
>    и без многострочных `If … Or …` (наш линтер требует `Then` в той же строке, что и `If` — на этом он сам
>    поймал первые два варианта);
> 4) `RefillMap` строит карту; номера проблемных строк собирает `AddProblem` в `ProbLines` (номера хранятся
>    строками — сравнение надёжное, без приведения Variant к Integer); клик по строке карты показывает фрагмент;
> 5) обновление карты: при открытии файла, по кнопке «Проверить (текст)» и в таймере — но **только для текстов
>    до 20 000 символов** (на 107 КБ перерисовка 2700 строк раз в секунду могла бы «подтормаживать»).
>    Структура обновляется всегда;
> 6) раскладка: `CodeMemo` сужен до 820 px, карта занимает 104 px справа от кода.
> Проверки: lint `Fore` — 16/0, ui-spec `EditorForm.fore → ScreenSpecText` 24/0, refs OK, spec 45/0, check-all 0.
> Файл: `Fore/EditorForm.fore` (1496 строк); рабочая копия — `MyCodeEditor1/EditorForm.fore` (CRLF).
> Версия: 1.124 (**Этап 2 проекта «Редактор Fore» — структура файла и линтер**):
> 1) панель **«Структура»** (слева, под списком объектов; `ListView` создаётся кодом): разбор текста по строкам —
>    `Class`/`Public Class` → «класс», `Sub`/`Function` → «подпрограмма», `Const` → «константа»; колонки
>    «Символ | Вид | Строка»; клик по записи показывает фрагмент строки (переход — через панель, так как запись
>    `SelStart` не работает); структура обновляется при открытии файла, по кнопке «Проверить» и таймером —
>    только если длина текста изменилась (`LastStructLen`);
> 2) панель **«Проблемы»** (справа внизу) + кнопки **«Проверить (текст)»** и **«Проверить сборку»**.
>    Линтер на Fore — порт правил `tools/fore-lint-check.js`: упрощённый баланс блоков по количеству
>    (`CountOf` считает точные строки: Begin/End, If/End If, Try/Except/End Try, For/End For, While/End While,
>    Sub/End Sub); «Then без If» с учётом **многострочных условий** (флаг `PendIf`); апостроф вне строкового
>    литерала (проверка по «оголённой» строке `WithoutStrings`, символ кавычки берём кодом `#34` в поле `Q_`);
>    сравнение с `Null` (`= Null`, `<> Null`); строка продолжения с кавычки без «+» в конце предыдущей;
>    класс формы против директивы `// ID:` (`ClassNameInLine` + `FormClassNameExpected`);
> 3) «Проверить сборку» проходит по всем объектам сборки (`Desc.Edit As IModule` → `Text`) и пишет отчёт
>    в журнал (может занимать время: в вашей сборке 14 объектов, из них `SCHEDULER` — 107 КБ);
> 4) раскладка: список объектов укорочен до 300 px, под ним «Структура» (248 px), журнал занимает левую
>    половину нижней полосы, «Проблемы» — правую; в описании экрана теперь 24 компонента.
> Проверки: lint `Fore` — 16/0, ui-spec `EditorForm.fore → ScreenSpecText` 24/0, refs OK, spec 45/0, check-all 0.
> Файл: `Fore/EditorForm.fore` (1321 строка); рабочая копия — `MyCodeEditor1/EditorForm.fore` (CRLF).
> Версия: 1.123 (по вашим четырём замечаниям к редактору — все внесены):
> 1) **автопрокрутка журнала**: панель фрагмента держит только «хвост» (последние 4000 символов), а после
>    обновления текста выполняется `FragMemo.SelLength := FragMemo.Text.Length` — поле прокручивается
>    к последней строке (запись `SelStart` в этом рантайме не работает — замеры 1.117; `SelLength` — работает).
>    Если выделение журнала будет мешать — уберём эту строку;
> 2) **«Сохранить в файл» открывает диалог**: компонент `FileSaveDialog` (справка: `IFileSaveDialog`, свойства
>    `FileName`, `Filter`, `DefaultExt`, `InitialDirectory`, `OverwritePrompt`, `Title`; `Execute` — без
>    параметров и скобок, как у `FileOpenDialog` в инструменте деплоя). Папка и имя по умолчанию: если открыт
>    файл (или уже сохраняли) — папка и имя этого файла, иначе — папка из поля сверху и «<Открытое>.fore».
>    После сохранения путь запоминается (`CurPath`), следующий вызов предлагает тот же файл;
> 3) **«Найти далее» пытается поставить курсор**: `SelLength := 0; SelStart := <позиция>`, затем `SelStart`
>    читается обратно и в журнал пишется результат — «курсор — в начале найденного (позиция P)» либо
>    «⚠ курсор поставить не удалось (запросили P, получили P2)». Если на стенде не сработает — строка всё
>    равно показана в панели фрагмента;
> 4) **`From` — зарезервированное слово**: параметр `FindPosFrom(…; From: Integer)` переименован в `StartPos`;
>    проверено, что идентификатора `From` в форме больше нет (поиск по `\bFrom\b` — пусто).
> Проверки: lint `Fore` — 16/0, ui-spec `EditorForm.fore → ScreenSpecText` 22/0, refs OK, spec 45/0, check-all 0.
> Файл: `Fore/EditorForm.fore` (881 строка); рабочая копия — `MyCodeEditor1/EditorForm.fore` (CRLF).
> Версия: 1.122 (по вашему замечанию — **«OnCreate я привязал вручную»**; уточнение поведения инструмента):
> 1) `PatchFormContent` в инструменте вызывается в двух случаях: при **СОЗДАНИИ** формы
>    (`UpsertForm`, ветка `IsNull(Existing)`) и по кнопке **«Привязать события форм сборки»** — для всех
>    форм сборки; при обычном обновлении модуля `Content` существующей формы не перезаписывается, поэтому
>    **ручная привязка `OnCreate` перезаливкой не теряется** (проверено по коду: строка 1683 — только ветка
>    создания, строка 413 — только кнопка);
> 2) если привязка не сработала при создании — вероятная причина: на стенде **старый инструмент деплоя**
>    (до 1.109 — там нет ни `PatchFormContent`, ни «Пробного прогона», ни кнопки привязки событий).
>    Проверка: есть ли на форме инструмента кнопка «Привязать события форм сборки»; если нет — обновить
>    сам инструмент (вставить `Fore/DeployToolForm.fore` в объект `DEPLOYTOOL`);
> 3) в любом случае рабочая схема: при первом создании формы привязать `OnCreate → FormOnCreate` в Инспекторе
>    (или кнопкой «Привязать события форм сборки» — она пишет ровно те привязки, что объявлены в коде
>    формы, и идемпотентна);
> 4) в `docs/EDITOR-TZ.md` §5 добавлено предупреждение об этом — чтобы не повторялось на следующих формах.
> Проверки: lint `Fore` — 16/0, ui-spec 22/0, refs OK, spec 45/0, check-all 0.
> Версия: 1.121 (по вашему сообщению со стенда — **кнопки редактора не реагировали: не было подписки событий**):
> 1) причина: в форме `FOREDITORForm` имена обработчиков были указаны только в описании экрана
>    (`ScreenSpecText`), а **фабрика экранов события не подписывает** — это прямо написано в заголовке
>    `UiFactory.fore`: «ВАЖНО: подписка на события выполняется на стороне формы (фабрика не знает её процедур):
>    Btn := UiFind(Map, 'BtnSave') As Button; Btn.OnClick := …». Моя ошибка при сборке каркаса;
> 2) исправлено: в `CreateFormComponents` добавлена явная подписка всех 9 кнопок проекта
>    (`BtnRepo`, `BtnFolder`, `BtnRefresh`, `BtnOpen`, `BtnSaveRepo`, `BtnSaveFile`, `BtnFindNext`,
>    `BtnReplaceAll`, `BtnGoLine`) через `Ctl := UiFind(Map_, "…") As Button; Ctl.OnClick := <обработчик>;`
>    — как в остальных формах проекта (`SchedulerForm`, `DeployToolForm`, `PlanTextForm` и др.);
> 3) добавлена диагностика в панель фрагмента: «Кнопки подписаны: список (сборка/папка), обновить, открыть,
>    сохранение ×2, поиск, замена, строка.» — по этой строке сразу видно, что `OnCreate` отработал и подписка
>    состоялась; при сбое — «⚠ подписка кнопок не удалась: <причина>»;
> 4) напоминание (для будущих форм): список и таймер тоже подписываются в форме (`ObjectList.OnDblClick := …`,
>    `TmrTick.OnTimer := TimerTick`), а не в описании экрана;
> 5) если после перезаливки форма окажется **пустой** (контролов нет) — значит не привязалось событие формы
>    `OnCreate`: нажмите «Привязать события форм сборки» в инструменте деплоя (или привяжите
>    `OnCreate → FormOnCreate` в Инспекторе формы).
> Проверки: lint `Fore` — 16/0, ui-spec `EditorForm.fore → ScreenSpecText` 22/0, refs OK, spec 45/0, check-all 0.
> Файл: `Fore/EditorForm.fore` (803 строки); рабочая копия — `MyCodeEditor1/EditorForm.fore` (CRLF).
> Версия: 1.120 (**Этап 1 проекта «Редактор Fore» — каркас**):
> 1) новый файл **`Fore/EditorForm.fore`** (объект `FOREDITOR`, шапка `// ID: FOREDITOR`, класс `FOREDITORForm`):
>    слева список объектов сборки или локальных `.fore` (переключается кнопками «Список: сборка/папка»),
>    справа `Memo` с кодом, ниже панель фрагмента/журнала, строка статуса;
> 2) контролы: динамическая часть — фабрикой экранов (`ScreenSpecText`, 22 компонента, `UiCreateScaled`),
>    список объектов — кодом (`New ListView.Create` + `SetListColumn`), таймер статуса — из описания (`TIMER;TmrTick;…;1000`);
> 3) открытие: объект репозитория (`Desc.Edit As IModule` → `Text`) или файл (`File.OpenTextReader` +
>    `ITextReader.Encoding := CodePage.UTF8`; переводы строк приводятся к CRLF; пустой файл не читается — см. 1.107);
> 4) сохранение: в репозиторий (`Modul.Text := …` + `Modified`/`Save`) и в файл (`File.OpenTextWriter` + UTF-8 +
>    обратное чтение и сверка — как в 1.108);
> 5) поиск/замена: «Найти далее» — без учёта регистра, с продолжением с начала текста и показом строки
>    («Найдено: строка N, позиция P» + окружение в панели «>> N: …»); «Заменить всё» — через `String.Replace`
>    (с учётом регистра) со счётом вхождений; «Показать строку» — по номеру строки;
> 6) переход к нужной строке сделан **через панель фрагмента** — это следствие замера 1.117 (запись `SelStart`
>    не работает); для автодополнения (этап 4) подтверждена запись `SelText` (1.119);
> 7) статус по таймеру (раз в секунду): источник (сборка/папка), открытый объект, символов, строка по `SelStart`
>    (чтение работает), «сохранён / ИЗМЕНЁН» (сравнение с последним сохранённым текстом);
> 8) что осталось на следующие шаги: Ctrl+S требует обработки `OnKeyDown` (пока кнопка «Сохранить»),
>    «Структура» и «Проблемы» (этап 2, свой линтер), автодополнение из `docs/forsite/api-index.txt` (этап 4),
>    кнопка «Скомпилировать сборку» (`CheckCompiled`, этап 5).
> Проверки: lint `Fore` — 16/0, ui-spec `EditorForm.fore → ScreenSpecText` 22 компонента/0, refs OK,
> spec 45/0, check-all 0. Рабочая копия для стенда: `MyCodeEditor1/EditorForm.fore` (CRLF).
> Документация: `docs/EDITOR-TZ.md` §4 (этап 1 отмечен сделанным), чек-лист `docs/DEPLOY.md` §9 пункт 63.
> Версия: 1.119 (по вашему прогону с пробой 1b — **`SelText` пишется, вставка автодополнения подтверждена**):
> 1) замер 17.09.2026 01:51: выделено 7 символов (`SelStart = 669`, `SelLength = 7`), записали маркер из
>    8 символов (`SelText := "«ЗАМЕНА»"`) → длина текста **2019 → 2020** (+1 = 8 − 7), `SelStart` стал
>    **677** (= 669 + 8 — курсор ровно после вставки), `SelLength` = 0, маркер встал точно в позицию.
>    Проба после проверки восстанавливает текст, поэтому в файле ничего не портится;
> 2) итог: **автодополнение можно вставлять в позицию курсора** — `SelText := …`; тем же приёмом делаются
>    замена и удаление выделения (`SelText := ""`), вставка шаблонов (`Sub … End Sub`) и «комментирование»;
> 3) этим закрыты **все** неизвестные «Этапа 0» (таблица в `docs/EDITOR-TZ.md` §5): компиляция и её статусы,
>    символы сборки, работа с текстом (107 КБ, чтение выделения, запись `SelText`), метаданные (заменены
>    своим индексом API). Ограничение осталось одно: запись `SelStart` не работает → «перейти к строке»
>    делаем через списки «Структура»/«Проблемы» + панель фрагмента;
> 4) в отчёте также видно `подпрограмм: 11` (залит самый свежий модуль спайка), `TimeStamp = 17.09.2026 01:51:01`.
> Проверки: lint `Fore` — 15/0, lint `MyCodeEditor1` — OK, spec 45/0, check-all 0.
> Версия: 1.118 (по вашему прогону с пробой 1a — **чтение выделения в `Memo` работает**):
> 1) проба 1a дала положительный результат: после клика мышью по тексту `Memo` читаются
>    `SelStart = 1003`, `SelLength = 27`, `SelText = «EDITOR /  / MYCODEEDITOR345»` — то есть
>    **позицию курсора/выделения, заданную пользователем, можно прочитать** (запись `SelStart`
>    при этом не работает — см. 1.117);
> 2) следствие: **автодополнение в позицию курсора возможно** — позицию берём из клика, вставку делаем
>    `SelText := …` (если подтвердится запись) либо перезаписью `Text` с сохранением длины до/после;
>    «перейти к строке» по-прежнему делаем через списки «Структура»/«Проблемы» + панель фрагмента;
> 3) в спайк добавлена кнопка **«Проба: вставка через SelText (сначала выделите слово)»**
>    (`ProbeSelTextOnClick`): запоминает текст, пишет в выделение маркер «ЗАМЕНА», читает результат и
>    позицию курсора после записи, затем **восстанавливает текст как был** (безопасно, ничего не портит);
> 4) в отчёте с пробой 1a подтверждено также: подпрограмм у класса стало 10 (модуль — самая свежая
>    заливка), `TimeStamp = 17.09.2026 01:47:26`, остальные разделы без изменений
>    (`CheckCompiled = True`, `HiddenReferences = 0`, 107 042 символа в `Memo`);
> 5) раскладка формы спайка: добавлена вторая строка кнопок (Memo сдвинут на `Top = 160`).
> Документация: `docs/EDITOR-TZ.md` §5 (строка про `Memo.SelStart/SelLength/SelText` уточнена).
> Проверки: lint `Fore` — 15/0, lint `MyCodeEditor1` — OK, spec 45/0, check-all 0.
> Версия: 1.117 (по третьему прогону спайка — **точный диагноз по выделению в `Memo`**):
> 1) отчёт 17.09.2026 01:43 показал главное: **`SelLength` задаётся** (задали 6 → прочитано 6), а
>    **`SelStart` игнорируется** (задали 4 → прочитано 0) — в обоих порядках, поэтому `SelText` всегда
>    «012345». Значит правило «сначала `SelLength`, затем `SelStart`» (версия 1.116) — **не решение**:
>    сеттер `SelStart` в этом рантайме не работает. Формулировка 1.116 исправлена;
> 2) следствия для редактора: «перейти к строке» и подсветку делаем через списки («Структура», «Проблемы»)
>    + панель фрагмента (вариант A); вставка автодополнения в позицию курсора возможна **только** если
>    выделение ЧИТАЕТСЯ после клика мышью (`SelStart` как чтение, а не запись);
> 3) поэтому в спайк добавлена кнопка **«Проба: что видит Memo (сначала щёлкните в тексте)»**
>    (`ProbeSelOnClick`): читает текущие `SelStart`/`SelLength`/`SelText` без записи и пишет вывод
>    в отчёт («выделение читается / не читается»). Это последний неизвестный пункт по этапам 1 и 4;
> 4) остальное в отчёте стабильно: `CheckCompiled = True`, `IsLoaded = True`, `Builtin = False`,
>    `Name = MYCODEEDITOR`, `Version = 168298638`, `TimeStamp = 17.09.2026 01:43:17`, `HiddenReferences = 0`,
>    1 класс `EDITORSPIKEForm` (родитель `Form`, 9 подпрограмм, порядок = объявление),
>    `BindToClass("SCHEDULERForm")` → `Null` (корректно), `Memo` принял 107 042 символа;
> 5) `SetFocus` в API контролов есть (справка ModForms: «устанавливает фокус на данный компонент») —
>    оставлен запасной гипотезой для `SelStart`.
> Документация: `docs/EDITOR-TZ.md` §5 (строка про `Memo.SelStart` обновлена на ❌ с числами замера).
> Проверки: lint `Fore` — 15/0, lint `MyCodeEditor1` — OK, spec 45/0, check-all 0.
> Версия: 1.116 (по вашему отчёту спайка — **Этап 0 закрыт, два правила по API**):
> 1) **`Bin.Version` — не строка**: `.ToString` на нём даёт ошибку (в коде теперь склейка
>    `"…" + Bin.Version`, а `.ToString` остаётся только у `Bin.TimeStamp`). Из отчёта:
>    `Version = 168298638`, `TimeStamp = 17.09.2026 01:32:46`;
> 2) ~~`Memo`: сначала `SelLength`, затем `SelStart`~~ — **не подтвердилось** (подробности в версии 1.117):
>    `SelStart` не задаётся ни в одном порядке, задаётся только `SelLength`;
> 3) подтверждено на стенде (отчёт `editor-spike-report.txt`, сборка `MYCODEEDITOR`):
>    `IForeServices`/`GetRuntime` — ок; `CheckCompiled = True`, `IsLoaded = True`, `Builtin = False`,
>    `Name = MYCODEEDITOR`, `HiddenReferences = 0`; `BindToAssembly` работает — 1 класс
>    `EDITORSPIKEForm` (родитель `Form`, 9 подпрограмм, порядок = порядок объявления), перечисление
>    подпрограмм с `ModuleName`/`IsConstructor`/`IsStatic` работает; `BindToClass("SCHEDULERForm")`
>    корректно вернул `Null`; `Memo` принял 107 042 символа без ошибок;
> 4) шаг с `GetMetadata` в спайке выключен (версия 1.115) — в отчёте он помечен как ПРОПУЩЕН;
> 5) итоги зафиксированы в `docs/EDITOR-TZ.md` (§5, таблица «Итог Этапа 0»), рабочая копия
>    `MyCodeEditor1/EditorSpike.fore` синхронизирована с `Fore/EditorSpike.fore`;
>    следующий шаг — **Этап 1: каркас редактора `FOREDITOR`**.
> Проверки: lint `Fore` — 15/0, lint `MyCodeEditor1` — OK, spec 45/0, check-all 0.
> Версия: 1.115 (по вашей проверке на стенде — **шаг с метаданными убран из спайка**):
> 1) `Bin.GetMetadata` на стенде устойчиво даёт ошибку: документ не разобран (`parsed = FALSE`,
>    `readyState = 4`, `nodeType = 9`), `xml` пуст, а обращения к членам падают внутри `XMLLib2.dll`.
>    Access violation в DLL может быть **неперехватываемым**, поэтому шаг не «защищаем», а выключаем;
> 2) в `Fore/EditorSpike.fore` удалены: вызов `SpikeMetadata`, сама процедура `SpikeMetadata`, кнопка
>    «Сохранить метаданные (XML)» (`BtnSaveMeta`), обработчик `SaveMetaOnClick` и поле `MetaXml`.
>    Теперь на месте шага 5 в отчёте две строки-пояснения («ПРОПУЩЕНО: документ метаданных не
>    разбирается…»), и отчёт сохраняется целиком, без падений;
> 3) в комментарии оставлено, как вернуть шаг, если стенд обновят (`Bin.GetMetadata.xml`);
> 4) рабочая копия `MyCodeEditor1/EditorSpike.fore` синхронизирована с `Fore/EditorSpike.fore`
>    (ваша строка `// REFS: Andy;Collections;…;Xml` сохранена первой), оба файла — CRLF;
>    линтер: `OK EditorSpike.fore` и в `Fore`, и в `MyCodeEditor1`;
> 5) словарь автодополнения обеспечивается полностью без метаданных: свой индекс API
>    (`docs/forsite/api-index.txt`, 1168 классов, генератор `tools/make-api-index.py`) +
>    `IForeAssembly`/`IForeClass`/`IForeSub` (проверяет шаг 4 спайка) + локальные символы файла.
> Проверки: lint `Fore` — 15/0, lint `MyCodeEditor1` — OK, spec 45/0, check-all 0.
> Версия: 1.114 (по вашей правке спайка в `MyCodeEditor1` — **разбор файлов с LF и починка файла**):
> 1) в `MyCodeEditor1/EditorSpike.fore` был **повреждённый хвост**: после первого «`End Class EDITORSPIKEForm;`»
>    остались 12 строк-дубликатов (`age);`, `End Try;`, `WriteString`, `End Function WriteText;`,
>    второй `End Class …`). Линтер это подтверждал (4 ошибки структуры) — хвост удалён, файл стал CRLF;
>    теперь `node tools/fore-lint-check.js MyCodeEditor1` → `OK EditorSpike.fore`;
> 2) **переводы строк**: файл был с LF (393 LF против 12 CRLF). Это не косметика: инструмент деплоя
>    разбирает шапку и обработчики **построчно по CRLF**, поэтому такой файл «терял» `// ID:` и `// REFS:`
>    (объект создавался бы заново по имени файла вместо обновления) и события формы не привязывались.
>    Теперь `ReadTextFile` **приводит любые переводы строк к CRLF** (CRLF → LF → CR → LF → CRLF) и пишет
>    в журнал «переводы строк приведены к CRLF (в файле были LF или CR)» — линтер и инструмент согласованы;
> 3) ваша правка `Hidden: Array Of string` перенесена и в `Fore/EditorSpike.fore` (для
>    `Bin.HiddenReferences` это точнее, чем `Array`);
> 4) хорошая новость из выгрузки `EDITORSPIKE.form.xml`: форма на стенде создана с классом
>    **`EDITORSPIKEForm`** и событием **`OnCreate → FormOnCreate`** — то есть спайк разворачивается
>    и обработчик привязывается (кодом или вручную) корректно, правило «класс = `<Id>` + `Form`» соблюдено.
> Документация: `docs/DEPLOY.md` §7.7 (приведение переводов строк) и чек-лист **62**.
> Проверки: lint 12/0 (в т.ч. папка `MyCodeEditor1`), spec 45/0, ui-spec 19/0, check-all 0.
> Версия: 1.113 (по вашему замечанию — **ссылки сборок видно и при выгрузке, без разбора кода**):
> 1) новая функция **`RefsFromRepo(Desc)`** — читает ссылки объекта прямо из репозитория, по документированному
>    идиому справки (`IModule.Standalone` / `IModule.ParentAssembly` / `IModule.Assembly` + `IAssembly.References`):
>    объект входит в сборку (`Standalone = False`) → ссылки берутся у **родительской сборки**
>    (`(Module.ParentAssembly.Bind As IAssembly).References`); объект «самостоятельный» (`Standalone = True`) →
>    ссылки его **временной сборки** (`Module.Assembly.References`). В журнал выгрузки пишутся и родительская
>    сборка, и полученный список;
> 2) новая функция **`EnsureRefsHeader(Text; Refs)`** — записывает этот список в шапку выгружаемого файла
>    строкой **`// REFS: …`** (если такая строка уже есть — заменяется, иначе добавляется первой);
> 3) «Выгрузить в файлы» теперь сохраняет файлы с этой шапкой, а в журнале — «сохранён «SCHEDULER.fore»
>    (N символов)  / ссылки сборок: …». Итог: **выгрузка и заливка замыкаются** — залитый из выгруженного
>    файла объект получает ровно те же ссылки, что были в репозитории (проверяется пунктом 61 чек-листа);
> 4) полезная деталь из справки (`IAssembly.References`): «Системная сборка репозитория `System` всегда
>    подключена по умолчанию, указывать её в списке ссылок нет необходимости» — поэтому её отсутствие
>    в шапке файла нормально (распознавание по коду по-прежнему добавляет её как безопасный минимум);
> 5) рядом с этим: у выгружаемых файлов `<Id>.fore` имена берутся из Id объектов, поэтому обратная заливка
>    находит их по `// ID:` (версия 1.111) — ссылки при этом подставляются из шапки файла.
> Документация: `docs/DEPLOY.md` §7.7 (выгрузка: откуда берутся ссылки) и чек-лист **61**.
> Проверки: lint 14/0, spec 45/0, ui-spec 19/0, check-all 0.
> Версия: 1.112 (по вашему запросу — **инструмент деплоя распознаёт подключаемые модули (ссылки сборок)**):
> 1) в `FormOnCreate` появилась таблица правил **`REF_KINDS`** — «Сборка|ключевые слова» для 11 сборок:
>    Metabase, Fore, Db, Dal, Forms, ExtCtrls, Ui, Collections, IO, Net, System. Наборы ключевых слов
>    подобраны по фактическому коду проекта, а где удалось — сверены по документации самой сборки
>    (`IStringList`/`ArrayList` → Collections; `IDalCommand`/`IDalCursor` → Dal; `IDatabaseInstance` →
>    Db; `IScheduledTask*` → Fore; `INetSmtpClient` → Net; `IUiCommandTarget` → Ui; `ITextReader`/`ITextWriter`/
>    `File.`/`Path.` → IO; `MetabaseClass`/`IMetabase*`/`IModule`/`IForm`/`IAssembly` → Metabase;
>    визуальные компоненты → Forms; `MetabaseListView`/`MetabaseTreeList`/`MetabaseOpenDialog` → ExtCtrls);
> 2) новая функция **`RefsForText(Text)`**: ищет ключевые слова в тексте модуля (без учёта регистра) и
>    собирает список сборок, например `Metabase;Forms;IO;System`; базовая `System` добавляется всегда;
>    лишняя ссылка безвредна, пропущенная ломает сборку — поэтому наборы намеренно широкие, а при
>    необходимости правило дописывается одной строкой;
> 3) новая функция **`MergeRefs(A; B)`** — объединение списков без повторов (регистр не важен);
>    итог по каждому файлу = распознанные по коду + `// REFS: …` из шапки + общий список из поля
>    «Ссылки сборок»; в журнале: «ссылки сборок для «<файл>»: …»;
> 4) это работает и в пробном прогоне, и при реальной заливке: `ApplyModuleRefs` (из 1.105) ставит
>    полученный список объекту (`IModule.Assembly.References`), а сборка получает общие ссылки из поля;
> 5) в спецификацию добавлены зеркала (`refsForText`, `mergeRefs`) — проверок стало 45.
> Документация: `docs/DEPLOY.md` §7.7 (таблица «сборка → что содержит → ключевые слова») и чек-лист **60**.
> Проверки: lint 14/0, spec 45/0, ui-spec 19/0, check-all 0.
> Версия: 1.111 (по вашей выгрузке сборки планировщика в `Fore22 unload by deploytool`):
> 1) выгрузка показала, что объекты на стенде названы **ВЕРХНИМ РЕГИСТРОМ** и без слова Form (`SCHEDULER`,
>    `PLANTEXT`, `RESPONSIBLE`, `PLANPARAMS`, `UNAVAILABILITYRECORDS`, `UISCREENDEMO`, `TASKCONTAINERLIB`,
>    `TASKPLANNER`, `UIFACTORY`, `UNAVAILABILITYPLANNER`, `UNAVAILABILITYRUNNER`, `UNAVAILABILITYSTORE`,
>    `UNAVAILNOTIFY`; ещё в сборке `SENDMAIL` — модуль заказчика). XML каждой формы требует класс
>    «`<Id> + Form`»: `SCHEDULERForm`, `PLANTEXTForm`, `RESPONSIBLEForm`, `PLANPARAMSForm`,
>    `UNAVAILABILITYRECORDSForm`, `UISCREENDEMOForm` — а в модулях стояли прежние имена (`SchedulerForm`,
>    `PlanTextForm`, …). Имена платформа сравнивает **без учёта регистра**, поэтому формы работают, но
>    расхождение надо убрать, иначе автопереименование при деплое дало бы «`SchedulerFormForm`» против
>    ожидаемого «`SCHEDULERForm`»;
> 2) поэтому в шаблоны добавлена директива **`// ID:`** (14 файлов), а классы форм приведены к тому, что
>    ждёт XML: `SCHEDULERForm`, `PLANTEXTForm`, `RESPONSIBLEForm`, `PLANPARAMSForm`,
>    `UNAVAILABILITYRECORDSForm`, `UISCREENDEMOForm`, `DEPLOYTOOLForm` — вместе со всеми ссылками
>    (`New PLANTEXTForm.CreateForm(Self As IWin32Window)`, `EditForm: RESPONSIBLEForm;`, `F: PLANPARAMSForm;`).
>    Теперь повторный деплой **обновляет** существующие объекты по Id и не создаёт дубликатов;
> 3) правило 9 линтера учитывает директиву: класс формы сверяется с «`<Id из // ID:>` + `Form`»
>    (регистронезависимо) — новая функция `formObjectId(text, fileName)`;
> 4) `FormEventsXml` нумерует события как платформа: `100`, `101`, `102`, …;
> 5) привязки, найденные в выгрузке (все обработчики есть в коде, поэтому `PatchFormContent` поведение не
>    меняет — только выравнивает XML и класс): `SCHEDULER` — `OnCreate`→`FormOnCreate`; `PLANTEXT` —
>    `OnCreate`→`FormOnCreate`, `OnCommand`→`PlanTextFormOnCommand`; `RESPONSIBLE` — `OnCreate`/`OnShow`/
>    `OnCommand`; `PLANPARAMS` — `OnCreate`; `UNAVAILABILITYRECORDS` — `OnCreate`/`OnShow`; `UISCREENDEMO` —
>    `OnCreate`/`OnClose`;
> 6) у формы `SCHEDULER` в XML формы есть контрол, размещённый **в дизайнере**: `MetabaseListView2`
>    (колонки «Наименование / Идентификатор / Дата изменения / Тип объекта / Примечание» и привязка
>    `OnClick` → `MetabaseListView2OnClick`). То есть список на стенде живёт в дизайнере, а код формы
>    (`If IsNull(X) Then New …`) продолжает работать и без него. `PatchFormContent` правит ТОЛЬКО события
>    самой формы — `COMPONENT.EVENTS` внутри `COMPONENT.CONTROLS` не трогается;
> 7) в сборке есть **пустой объект `anchor`** (0 байт) — след раннего деплоя пустого `.fore`; после версии
>    1.107 такие файлы пропускаются. Объект можно удалить вручную.
> Документация: `docs/DEPLOY.md` §7.0 (таблица «объект стенда → класс»), §7.7 (`// ID:` и перечень Id),
> чек-лист **59**.
> Проверки: lint 14/0, ui-spec 19/0, spec 41/0, check-all 0.
> Версия: 1.110 (по вашей выгрузке папки `DeployTool\` — **привязка событий формы кодом сделана по-настоящему**):
> 1) выгрузка дала точный формат XML формы (`IForm.Content`): имя класса — `<_CMP D101="DEPLOYTOOLForm"/>`,
>    привязки — `<COMPONENT.EVENTS><OnCreate FormOnCreate="100"/></COMPONENT.EVENTS>`. Причём платформа САМА
>    записала класс `DEPLOYTOOLForm` для объекта `DEPLOYTOOL` — прямое подтверждение правила
>    «класс = Id объекта + Form» (версия 1.106);
> 2) новая функция **`FormEventsXml(Text; Q)`** строит блок событий по коду модуля формы
>    (`Sub <Имя>On<Событие>(Sender: Object; Args: …);` — те же объявления, что печатает `FormEventBindings`);
> 3) новая функция **`PatchFormContent(Desc; Text)`**: берёт XML формы (`Frm := Desc.Edit As IForm`),
>    правит ТОЛЬКО два места — `_CMP D101` (имя класса = «`<Id>` + `Form`») и `<COMPONENT.EVENTS>`
>    (все события по коду) — и сохраняет; остальной XML (подпись, размеры, контролы) не трогается, поэтому
>    настройки формы на стенде не теряются. Кавычку атрибутов берём ИЗ самого XML (`Q := Xml.SubString(P, 1)`),
>    чтобы не зависеть от экранирования кавычек в Fore;
> 4) вызовы: при **создании** формы (после применения `<Id>.form.xml` / Content формы-источника) и по новой
>    кнопке **«Привязать события форм сборки»** — она проходит по формам сборки и правит их XML
>    (`BindEventsOnClick`) → идемпотентно («XML формы уже в порядке, сохранять нечего»);
> 5) новая директива **`// ID: DEPLOYTOOL`** в шапке файла: Id объекта берётся из файла, а не из имени файла
>    (у вас объект инструмента называется `DEPLOYTOOL`, а файл — `DeployToolForm.fore`) → класс считается как
>    `DEPLOYTOOLForm`, как и ожидает XML формы;
> 6) предупреждение при **копировании МОДУЛЯ** (`UiFactory` → `UIFACTORY_COPY1`): внутренние классы/функции
>    копии называются так же, как в оригинале — если оба объекта попадут в одну сборку, будет конфликт имён
>    (класс ФОРМЫ-копии переименовывается, модуль — нет).
> Документация: `docs/DEPLOY.md` §7.8 (реальный XML + кнопка + `// ID:`), §7.7 (шапка файла), чек-лист **58**.
> Проверки: lint 14/0, ui-spec 19 компонентов/0, spec 41/0, check-all 0.
> Версия: 1.109 (по вашему запросу — **навесить обработчик события формы кодом**):
> 1) проверено по справке: у `IForm` есть только `Content` и `CreateFormControl` (+ унаследованные от
>    `IModule`: `Text`, `Assembly`, `Modified`, `ParentAssembly`, `Standalone`) — **API событий формы нет**
>    (ни `OnCreate`, ни `Events`, ни `AddEventHandler`); `AddEventHandler`/`HasEventHandler`/
>    `RemoveEventHandler` есть только у отчётов (`IPrxReport`) плюс «обработчики событий отчётов»
>    (`ISharedEventHandlers`). Привязки событий формы лежат **внутри `IForm.Content`** — «содержимое и
>    параметры формы в формате XML» («в данном виде форма хранится в БД репозитория»);
> 2) инструмент деплоя это использует: «Выгрузить в файлы» дополнительно сохраняет для каждой формы
>    **`<Id>.form.xml`** (это и есть `IForm.Content`, UTF-8 + самопроверка записи), а при **создании** формы
>    применяет его — новый `ApplyFormContent`: `Frm := Desc.Edit As IForm; Frm.Content := Xml; … Save`
>    (обработчики формы навешиваются кодом, без Инспектора формы);
> 3) при создании **копии** (`<Id><суффикс>`) привязки переносятся автоматически из формы-источника
>    (новое поле `LastCopySource`, `Content` снимается со «старого» объекта);
> 4) если ни файла, ни источника нет — в журнале предупреждение с инструкцией «привяжите события ОДИН раз
>    в Инспекторе формы, затем «Выгрузить в файлы»»; `Content` существующей формы не перезаписывается
>    (ручные привязки на стенде не теряются). Осторожность платформы («не рекомендуется изменять `Content`,
>    чтобы не потерять работоспособность формы») учтена: применяется только XML, снятый с рабочей формы,
>    всегда в `Try`, ошибка не «роняет» деплой;
> 5) 🔎 **диагностика на стенде**: пришлите `<Id>.form.xml` (появляется после «Выгрузить в файлы») — по нему
>    можно делать точечные правки привязок (например, заменить имя обработчика) прямо в файле, а инструмент
>    применит его при следующей заливке.
> Документация: `docs/DEPLOY.md` §7.8 (новый раздел) и чек-лист **57**.
> Проверки: lint 14/0, spec 41/0, check-all 0.
> Версия: 1.108 (по вашему замечанию — **кодировка при записи файлов**, чтобы кириллица не ломалась):
> 1) `WriteTextFile` (инструмент деплоя, «Выгрузить в файлы»): кодировка **UTF-8** задаётся строго до первой
>    записи; ошибка её установки теперь пишется в **журнал** («⚠ Не удалось задать кодировку записи UTF-8…»),
>    а не только в Debug; после записи файл **читается обратно и сверяется** с исходным текстом
>    (`String.Replace(…, DEPLOY_CRLF, "")` — переводы строк не учитываются): при расхождении —
>    «⚠ Файл записан, но текст при обратном чтении не совпал — вероятно, другая кодировка (или UTF-8 с BOM)»
>    и подсказка сохранить файл как «UTF-8 без BOM». Это самопроверка кодировки прямо на стенде;
> 2) **`UnavailNotify.SaveNoticesToFolder`** (письма ответственным в папку): кодировка вообще не задавалась —
>    добавлено `Writer.Encoding := CodePage.UTF8` до первой записи, иначе кириллица в `.htm`-письмах уходила
>    в системную ANSI;
> 3) обоим телам писем (`NoticeBody` и `NoticeBodyNotice`) добавлен заголовок
>    **`<meta charset='utf-8'>`** — без него кириллица ломалась и при открытии письма в браузере/почте;
> 4) **`UnavailabilityStore.ExportStoredPlanToFile`**: та же правка (UTF-8 до первой записи) — на случай,
>    если эту выгрузку решат вернуть в интерфейс (сейчас функция не вызывается — см. `docs/DEPLOY.md` §7.7).
> Документация: `docs/DEPLOY.md` §7.7 (выгрузка: кодировка + самопроверка), §7.5 (письма: UTF-8 и charset),
> чек-лист **56**.
> Проверки: lint 14/0, spec 39/0, check-all 0.
> Версия: 1.107 (по вашему замечанию — **пустой файл при импорте**):
> 1) `ReadTextFile` больше не вызывает `ReadToEnd` на пустом файле: сначала проверяется документированный
>    признак конца текста **`ITextReader.Eof`** («Eof — признак окончания текста в файле», справка Io) —
>    на 0-байтном файле `ReadToEnd` выбрасывал «Достигнут конец потока». Пустой файл помечается
>    (`LastReadEmpty`) и пропускается с записью в журнал «Файл пуст (0 байт) — пропущен: …»;
> 2) добавлена проверка существования файла: нет файла → «! Файл не найден — пропущен: …», деплой
>    продолжается (раньше это выглядело как ошибка чтения);
> 3) файл из одних пробелов/переводов строк тоже считается пустым (`String.Trim`) — иначе на стенд
>    ушёл бы «пустой» текст и затёр код модуля;
> 4) в `CDeployFile` добавлено поле **`IsEmpty`**, счётчик `Empty` в `RunDeploy`: пустые файлы больше
>    **не попадают в «с ошибками»**, в итоговом журнале и в окне — отдельная строка
>    «пропущено пустых/непрочитанных — N» + пояснение «пустой файл — это не ошибка: он просто не
>    заливается, код модуля на стенде не меняется»;
> 5) `Except`-ветка тоже различает случаи: «конец потока» на пустом файле — запись «Файл пуст — пропущен»,
>    реальные проблемы чтения — «! Файл не прочитан: … — <текст ошибки>» (идут в счётчик ошибок).
> Документация: `docs/DEPLOY.md` §7.7 (пустые файлы и отсутствие файла) и чек-лист **55**.
> Проверки: lint 14/0, spec 39/0, check-all 0.
> Версия: 1.106 (по вашему уточнению со стенда — **класс формы всегда `<Id объекта> + Form`**):
> 1) правило исправлено: раньше инструмент оставлял класс без изменений, если Id уже оканчивался на
>    «Form» (для файла `SchedulerForm.fore` класс оставался `SchedulerForm`) — это НЕВЕРНО. Теперь
>    **`FormClassNameFor(Id) := Id + "Form"`** без исключений: объект `SchedulerForm` → класс
>    `SchedulerFormForm`, объект `PlanText` → `PlanTextForm`, копия `Scheduler_COPY` → `Scheduler_COPYForm`.
>    Подтверждение из справки: объект `TEST` → `Class TESTForm: Form`, объект `OBJ3592` → `Class OBJ3592Form: Form`;
> 2) **исправлена ошибка разбора**: `FormClassNameIn` не находил объявление с модификатором —
>    `Public Class X: Form` (искалось строго «Class » с начала строки), из-за чего у форм с `Public`
>    переименование молча не выполнялось. Теперь `Class ` ищется в любом месте строки, строки-комментарии
>    (`// …`) пропускаются;
> 3) **шаблоны проекта приведены к правилу** (правка только имён КЛАССОВ, объекты/файлы не менялись):
>    `SchedulerForm.fore` → `Class SchedulerFormForm`, `PlanTextForm.fore` → `Public Class PlanTextFormForm`,
>    `ResponsibleForm.fore` → `Public Class ResponsibleFormForm`, `PlanParamsForm.fore` →
>    `Public Class PlanParamsFormForm`, `UnavailabilityRecordsForm.fore` →
>    `Public Class UnavailabilityRecordsFormForm`, `DeployToolForm.fore` → `Class DeployToolFormForm`;
>    вместе с классами обновлены все ссылки (`EditForm: ResponsibleFormForm;`,
>    `New PlanTextFormForm.CreateForm(Self As IWin32Window)`, `F: PlanParamsFormForm;` и т. д.) —
>    это ровно то, что делает автозамена инструмента при деплое (теперь она идемпотентна);
> 4) демо-форма: `Class UiScreenDemoForm` → `Class UiFactoryDemoForm` (+ обработчики
>    `UiFactoryDemoFormOnCreate`/`UiFactoryDemoFormOnClose`) — чтобы класс совпадал с Id объекта `UiFactoryDemo`;
> 5) **новая автопроверка** (правило 9 в `tools/fore-lint-check.js`): для каждого файла с объявлением
>    «`[Public] Class X: Form`» класс обязан быть «`<имя файла>` + `Form`» — иначе предупреждение
>    «на стенде форма не откроется». В `tools/fore-spec.js` добавлены зеркала правила
>    (`formClassNameFor`) — проверок стало 39.
> Документация: `docs/DEPLOY.md` §5.2/§7.0 (таблица «Форма → класс»), §7.7 (правило), чек-лист 54;
> `REFERENCE.md` §5.28; `Fore/README.md`.
> Проверки: lint 14/0 (правило 9 — чисто), spec 39/0, ui-spec 111/0, refs 14/0, check-all 0.
> Версия: 1.105 (по вашему выбору — три усиления инструмента деплоя):
> 1) **Пробный прогон (dry-run)** — новая кнопка «Пробный прогон» и общий `RunDeploy(IsDryRun: Boolean)`
>    (кнопки «Создать сборку и залить модули» → `RunDeploy(False)`, «Пробный прогон» → `RunDeploy(True)`):
>    выполняются ВСЕ чтения и разборы (два прохода, `ResolveExisting`, `FormClassNameFor`/`FormClassNameIn`,
>    список связей событий формы), но ничего не пишется — сборка не создаётся (`AsmDesc := Null`), «Ссылки
>    сборок» не задаются, `UpsertModule`/`UpsertForm` не вызываются. В журнале по каждому файлу
>    «[пробный прогон] создал бы / обновил бы модуль-форму «…»» (`ActionText` + `RefsSuffix`), в конце —
>    «Пробный прогон: было бы обработано файлов — N (новых: K, обновлено: M), с ошибками — E.
>    Изменений не вносилось.» и окно «Пробный прогон завершён — в репозиторий ничего не записано»;
>    попутно исправлена защита в `ResolveExisting`: `Desc.Parent.Key = AsmDesc.Key` проверяется только
>    при `Not IsNull(AsmDesc)` (иначе в пробном прогоне без сборки платформа выбрасывала исключение);
> 2) **«Ссылки сборок» у каждого файла** — необязательная шапка `// REFS: Forms;Ui;Metabase;Io`: функция
>    **`RefsFromText`** ищет первую строку с `REFS:` (регистр не важен, хвост «// пояснение» отрезается) и
>    подставляет её в **`ApplyModuleRefs`** (`IModule.Assembly.References`) для этого модуля/формы —
>    дополнительно к общим ссылкам сборки из поля «Ссылки сборок»; не сработало — в журнале
>    «⚠ ссылки сборок модуля из шапки файла не задались…»;
> 3) **Выгрузка сборки в файлы** — новая кнопка «Выгрузить в файлы» (`ExportOnClick` →
>    **`ExportAssemblyToFolder`**): состав берётся у **`IMetabaseObjectDescriptor.Children`**
>    (`IMetabaseObjectDescriptors`, справка «Children. Чтение объектов»), по каждому объекту
>    `Desc.Edit As IModule` → текст → файл «`<Id>.fore`» через **`WriteTextFile`**
>    (`File.OpenTextWriter(Path, False)` + `ITextWriter.Encoding := CodePage.UTF8` + `WriteString` + `Flush`).
>    Это резервная копия стенда и способ сверить «что лежит в репозитории» с локальной папкой; в журнале
>    «сохранён «X.fore» (N символов)» и итог «объектов — N, сохранено файлов — K, с ошибками — E».
> Документация: `docs/DEPLOY.md` §7.7 (кнопки 4–5, пробный прогон, `REFS:`, выгрузка) и чек-лист 51–53.
> Деплой: `Fore/DeployToolForm.fore`. Проверки: lint 14/0 (DeployToolForm — OK), ui-spec 111/0, refs 14/0, check-all 0.
> Версия: 1.104 (по вашему требованию — **автозамена имени класса формы во всех импортируемых модулях**):
> деплой переведён на **два прохода**, чтобы переименование класса формы применялось ко всему коду сразу:
> 1) **`CDeployFile`** — объект-файл (`FullName`, `BaseName`, `Text`, `NewId`, `Existing`, `IsForm`,
>    `Failed`) и **`CClassName`** — пара «старое → новое». В проходе 1 файлы читаются, Id разбираются
>    (`ResolveExisting` — вопрос «обновить/копия» задаётся здесь, один раз), а для форм сравнивается
>    объявленный класс (`FormClassNameIn`) с требуемым (`FormClassNameFor(Id)`) → собирается список
>    переименований. В журнал: «Переименование класса формы: «X» → «Y» (объект «…»)» и «Автозамена:
>    переименований N — правки применяются ко ВСЕМ импортируемым модулям этого запуска»;
> 2) в проходе 2 к КАЖДОМУ тексту применяется `ApplyRenames` → **`ReplaceIdent`** — замена **по границам
>    идентификатора** (`IsIdentChar`: слева/справа не буква/цифра/`_`, поэтому `SchedulerForm_OLDREF` не
>    портится; счёт замен — `LastReplaceCount`), в журнале по файлу ««старое» → «новое»: замен N», затем
>    файл заливается (`UpsertForm`/`UpsertModule`);
> 3) так закрываются и перекрёстные ссылки: `New SchedulerForm.CreateForm(Self)`, `SchedulerForm` как тип,
>    `End Class SchedulerForm;` — всё переписывается и в формах, и в модулях этого запуска;
> 4) частная функция `FixFormClassName` заменена общим механизмом `FormClassNameIn` + `ApplyRenames`.
> Документация: `docs/DEPLOY.md` §7.7 (правило имени класса + автозамена по всем модулям).
> Деплой: `Fore/DeployToolForm.fore`. Проверки: lint 14/0, ui-spec 109/0, refs 14/0, spec 36/0, check-all 0.
> Версия: 1.103 (по вашему замечанию со стенда — **у формы идентификатор объекта и имя класса связаны**):
> при заливке форм инструмент теперь сам приводит имя класса в коде к идентификатору:
> 1) **`FormClassNameFor(Id)`** — правило «класс = `<Id>` + `Form`», если Id ещё не оканчивается на
>    «Form»: для Id `SchedulerForm` класс остаётся `SchedulerForm` (обычная заливка ничего не меняет),
>    для копии Id `Scheduler_COPY` класс станет `Scheduler_COPYForm`;
> 2) **`FixFormClassName(Text; NewId)`** — построчный разбор текста формы: заменяет строку объявления
>    «`Class <Имя>: Form`» и закрывающую «`End Class <Имя>;`»; если старое имя встречается в коде где-то
>    ещё — предупреждение в журнале («⚠ имя класса «…» встречается в коде ещё где-то, кроме объявления —
>    при копировании проверьте форму»);
> 3) вызов — в `DeployOnClick` перед `UpsertForm` (только для файлов с «`: Form`»); в журнале видно
>    «имя класса формы: «старое» → «новое»».
> Проверки: lint 14 / 0, ui-spec 109 компонентов / 0, refs 14 / 0, spec 36 / 0, `check-all` — 0.
> Деплой: `Fore/DeployToolForm.fore`.
> Версия: 1.102 (по вашим замечаниям со стенда — правки инструмента деплоя):
> 1) `ApplyAssemblyRefs`: **`Asm := AsmDesc.Edit As IAssembly`** (было `Bind` — по факту стенда работает
>    именно `Edit`; свойство `IAssembly.References` тем же способом задаёт «Ссылки сборок»);
> 2) `ReadTextFile`: убран вызов **`Reader.Close`** — такой команды нет; в справке `ITextReader` закрытие
>    не вызывается, чтение завершается `ReadToEnd`;
> 3) `DeployOnClick`: список файлов объявлен как **`Files: Array Of String`**, каталог читается
>    `Directory.GetFiles(LocalPath, "*.fore").ToArray`; элемент берётся как `Files[I]` (без привода `As String`);
> 4) `BrowseLocalOnClick`: у **файлового** диалога `Execute` вызывается **без параметров и без скобок** —
>    `If DeployFileDialog.Execute Then` (у диалога выбора объекта `MetabaseOpenDialog` — как было,
>    `DeployOpenDialog.Execute(Self)`: на стенде это скомпилировалось без ошибок).
> Проверки после правок: lint 14 файлов / 0 предупреждений, ui-spec 109 компонентов / 0 проблем,
> refs 14 / 0, spec 36 / 0, `check-all` — 0 проблем.
> Деплой: `Fore/DeployToolForm.fore`.
> Версия: 1.101 (по вашим двум замечаниям — **кириллица в модулях** и **объект уже есть в другой папке**):
> 1) **кириллица**: `ReadTextFile` теперь задаёт кодировку чтения явно — `Reader.Encoding := CodePage.UTF8`
>    (в `Try`; свойство `Encoding` у `ITextReader` подтверждено справкой Io, значение `CodePage.UTF8` —
>    из официального примера KeSom). Файлы проекта — UTF-8 без BOM, поэтому кириллица в текст модуля
>    попадает без искажений;
> 2) вместо «найти объект по Id и обновить как получится» — новая функция **`ResolveExisting(AsmDesc; Id)`**:
>    * объект **в нашей сборке** → обновляем молча (`LastNewId := Id`);
>    * объекта нет → создаём (`LastNewId := Id`);
>    * объект **в другой папке** → **вопрос** `WinApplication.ConfirmationBox`:
>      «ОК» — обновлять существующий объект там, где он лежит; «Отмена» — создавать **копии** в нашей
>      сборке с Id «<имя><суффикс>». Решение запоминается на весь запуск (`CopyChoiceAsked`/`CopyChoiceCopy`);
>    * для копии Id = «<имя файла> + суффикс» из нового поля формы **«Суффикс для копий»** (по умолчанию
>      `_COPY`, можно изменить на любой, например `_V2`), и **проверяется занятость**: если такой Id уже
>      есть — файл пропускается, в журнал «! Id копии «…» УЖЕ ЗАНЯТ — измените «Суффикс для копий» и
>      повторите деплой» (счёт идёт в «с ошибками»);
> 3) `UpsertModule`/`UpsertForm` принимают готовый результат разбора (`Existing`) — обновляют переданный
>    объект или создают новый, поэтому вопрос не задаётся повторно; `UpsertForm` после создания берёт
>    только что созданную форму напрямую (`MB.ItemById`), а не через поиск с вопросом;
> 4) диалога ввода строки в платформе нет (проверено: `InputBox`/`InputQuery` в справке отсутствуют),
>    поэтому «идентификатор копии» вводится в поле формы; в журнале печатается шаблон копий на запуск.
> Документация: `docs/DEPLOY.md` §7.7 (буллеты про кириллицу и развилку «обновить/копия»).
> Деплой: `Fore/DeployToolForm.fore`.
> Версия: 1.100 (по вашему замечанию — **если в выбранной папке уже лежит одноимённая сборка**):
> инструмент деплоя теперь ведёт себя как надо при повторном развёртывании:
> 1) `FindAssemblyInFolder(AsmId)` — ищем сборку с этим Id **именно в выбранной папке** (или в корне,
>    если выбран «Корень репозитория»); сравнение — по `Descriptor.Parent.Key`;
> 2) если сборка найдена — **спрашиваем пользователя** (`WinApplication.ConfirmationBox`):
>    «В выбранной папке уже есть сборка «X». Обновить код существующих модулей / форм и создать новые файлы,
>    которых в сборке ещё нет?»; «Отмена» — деплой останавливается и **ничего не меняет** (с подсказкой
>    «чтобы создать новую сборку, измените её имя»), «ОК» — обновляем существующую сборку;
> 3) объект с таким Id **в другой папке** — предупреждение в журнале; `EnsureAssembly` теперь только
>    СОЗДАЁТ сборку (если Id занят где-то ещё — сообщаем, что нужно другое имя);
> 4) сводка стала раздельной: «Всего обработано файлов: N / новых модулей-форм: K / обновлено существующих: M /
>    с ошибками: E» (для этого `UpsertModule`/`UpsertForm` выставляют признак `LastCreated`);
> 5) поведение внутри сборки не изменилось: существующие объекты обновляются по Id, отсутствующие создаются,
>    объект из другой сборки — предупреждение и обновление по месту.
> Документация: `docs/DEPLOY.md` §7.7 (bullet про одноимённую сборку и раздельную сводку).
> Деплой: `Fore/DeployToolForm.fore`.
> Версия: 1.99 (по вашим замечаниям — «требование размещать контролы в дизайнере — неподтверждённое» и
> «не забудь в коде связать события компонентов с обработчиками, в том числе `OnCreate`»):
> 1) **неподтверждённое утверждение снято**: в `docs/DEPLOY.md` §7.0 (строка `MetabaseListView2`) и §7.7
>    больше не сказано, что списки репозитория обязательно размещать в дизайнере — помечено как
>    «неподтверждённое требование из ранних заметок, на текущем стенде не проверялось»: если создание
>    кодом (`New <Класс>.Create`) работает, дизайнер не нужен. В коде формы всё и так создаётся в
>    `CreateFormComponents` (под проверкой `IsNull`), а вид/колонки/привязки задаются кодом;
> 2) в `Fore/DeployToolForm.fore` добавлена функция **`FormEventBindings`**: по тексту формы находит
>    обработчики вида `<Имя>On<Событие>(Sender: Object; Args: …)` (`OnCreate`, `OnShow`, `OnHide`,
>    `OnClose`, `OnCommand`, `OnActivate`) и после заливки формы выводит в журнал готовый **чек-лист
>    связей «событие → обработчик»**, а также напоминание, что события динамических контролов форма
>    привязывает сама кодом (`Ctl.OnClick := …`);
> 3) по справке проверено: **API привязки событий формы из кода нет** (`IForm` содержит только `Content`
>    (XML формы) и `CreateFormControl`), поэтому «привязать `OnCreate` программно» невозможно — вместо
>    этого инструмент даёт точный список для Инспектора по каждому залитому файлу.
> Деплой: `Fore/DeployToolForm.fore`, документация `docs/DEPLOY.md`.
> Версия: 1.98 (параллельная задача — **инструмент деплоя**): добавлен `Fore/DeployToolForm.fore` —
> форма-утилита, которая сама собирает код в репозитории:
> 1) «Выбрать папку в репозитории…» (диалог с фильтром `KE_CLASS_FOLDER`) или «Корень репозитория» —
>    родительская папка деплоя; локальная папка с `.fore` — через файловый диалог (берётся папка файла)
>    или вручную;
> 2) «Создать сборку и залить модули» — создаёт/находит **сборку** (`METABASE`-класс `KE_CLASS_ASSEMBLY`,
>    Id по умолчанию `UNVAIL_ASSEMBLY`), задаёт ей «Ссылки сборок» (`IAssembly.References`, по умолчанию
>    `Forms;Ui;Metabase;ExtCtrls;System;Collections;Io;Fore`), затем по каждому файлу создаёт объект
>    **в сборке**: `Class X: Form` → форма (`KE_CLASS_FORM`), иначе — модуль (`KE_CLASS_MODULE`), текст —
>    в `IModule.Text` (+ `IModule.Modified` → `Save`);
> 3) идемпотентность: повторный запуск **обновляет** уже созданные модули/формы по Id (дублей нет);
>    объект с тем же Id вне нашей сборки — предупреждение в журнале и обновление по месту;
> 4) журнал на форме + `Debug`, кнопка «Копировать отчёт», итоговая сводка «залито/обновлено N,
>    с ошибками M»; код формы пишется в её модуль в `Try` — если платформа не даёт, в журнале
>    «⚠ Форма … создана, код автоматически не вставился» + путь к файлу для ручной вставки;
> 5) API подтверждён по документации проекта: `KeSom` — `IModule.Text/Modified/Assembly` (`References`),
>    `IAssembly.References`, `IMetabaseObjectCreateInfo.ClassId/Id/Name/Parent`, `MB.CreateObject(CrInfo).Edit`,
>    `MB.CreateCreateInfo`, `MB.Root`; `Io` — `Directory.GetFiles`, `File.OpenTextReader` (`ITextReader.ReadToEnd`),
>    `Path.GetDirectoryName`; классы: `KE_CLASS_FOLDER`/`KE_CLASS_MODULE`/`KE_CLASS_FORM`/`KE_CLASS_ASSEMBLY`.
> Связи событий: события *динамических* контролов форма привязывает **сама кодом** (`Ctl.OnClick := …`),
> а события *формы* (`OnCreate`/`OnShow`/`OnCommand`) кодом привязать нельзя (в `IForm` такого API нет) —
> см. v1.99: инструмент выписывает их готовым списком «событие → обработчик».
> Документация: `docs/DEPLOY.md` §7.7 (пошагово + «Ссылки сборок» самого инструмента), `Fore/README.md`
> (описание файла). Линтер: 14 файлов, 0 предупреждений.
> Деплой: `Fore/DeployToolForm.fore` (новый файл; остальной код не затрагивался).
> Версия: 1.97 (по вашему заданию — **сквозной аудит логики набора задач с нескольких контейнеров**):
> проверен весь проект, найдено 4 «одноконтейнерных» остатка и исправлено:
> 1) `UnavailabilityRunner.RunDuePlannedRunsFromTable` больше не выходит сразу при `IsNull(Container)`
>    (было `Return 0`): контейнер — только резерв для поиска задачи, основной путь — `ItemById`
>    в репозитории; без контейнера строки плана всё равно обрабатываются (`Debug`-сообщение);
> 2) `UnavailRunTickReport` строит отчёт по строкам плана и без контейнера (убрано «Контейнер задач
>    не выбран.»);
> 3) `RunDuePlannedRunsMain` / `RunDuePlannedRunsDryRunMain` — `MB.ItemById(RUN_CONTAINER_ID)` в `Try`
>    (если служебного объекта нет, диспетчер работает по плану);
> 4) в форме все «пусковые» проверки переведены на набор: `ContainersCount(CurrentContainers) = 0`
>    и текст «выберите контейнеры задач» — в `OpenUnavailabilityOnClick`, `BuildAffectedOnClick`,
>    `DryRunOnClick`, `ApplyPlanAvoidingOnClick` (было `IsNull(CurrentContainer)`).
> Проверено и признано корректным: `GetContainerTasks` вызывается только из циклов по набору;
> `TaskPlanner`/`UnavailabilityPlanner`/`PlanTextForm` работают со списком; `UnavailabilityStore`
> контейнер не использует (всё по ключу записи/плана); в форме `CurrentContainer` остался ровно
> в 5 местах (первый контейнер, `MetabaseListView2.Root` ×2, отчёт «что будет запущено»).
> Документация: `docs/DEPLOY.md` §7.0.2 «Аудит: что работает по одному контейнеру, а что по набору»
> (таблица по модулям) + чек-лист п. 50 (диспетчер без контейнера-параметра).
> ⚠ Найдено вне темы набора: `UnavailabilityStore.ExportStoredPlanToFile` (файловая выгрузка плана)
> **не вызывается** ниоткуда — решение (удалить или оставить как справку) за вами.
> Деплой: `Fore/SchedulerForm.fore`, `Fore/UnavailabilityRunner.fore`.
> Версия: 1.96 (по вашему замечанию — **не удаётся выбрать несколько контейнеров: они в разных папках, и
> при переходе по папкам выделение в диалоге слетает**): так ведёт себя сам диалог репозитория
> (`MultiSelect` действует в пределах текущей папки) — поэтому набор контейнеров теперь **набирается
> за несколько заходов**:
> 1) `SelectContainerOnClick` → `PickContainers` (диалог вынесен в отдельную функцию) — **замена** набора;
>    отмена диалога набор не меняет (раньше при отмене список задач перестраивался зря);
> 2) новая кнопка **«Добавить контейнеры…»** (`BtnAddContainers`, 566;76;228;28) → `AddContainersOnClick`:
>    `PickContainers` + `MergeContainers(CurrentContainers, Picked)` — **добавление** к набору, дубли по Id
>    (в верхнем регистре) пропускаются; сообщение «Добавлено контейнеров: K. Всего выбрано: N.»
>    («Новых контейнеров нет — выбранные уже в наборе»); `ChainNameEditBox` стал 330 px (кнопки в строке две);
> 3) управление набором в меню «Ещё ▾»: «Добавить контейнеры… (из другой папки)» (`cont_add`),
>    по одному пункту на контейнер «Убрать контейнер «A»» (`cont_remove;<Id>` —
>    `RemoveContainerFromSet`), «Очистить выбор контейнеров» (`cont_clear` → `ClearContainersOnClick`);
>    разбор кода действия — по префиксу (`Code.SubString(0, 12) = "cont_remove;"`);
> 4) `TaskContainerLib`: `MergeContainers` + `AppendContainers` (объединение без дублей) и
>    `ContainersCount` (безопасный счёт набора); пустой набор обрабатывается явно: `RefillTaskList`
>    показывает пустой список и подсказку («Контейнеры задач не выбраны. … набирайте набор за несколько
>    заходов»), `MetabaseListView2.Root := Null` — в `Try`;
> 5) документация: `docs/DEPLOY.md` §7.0.1 п. 1 (как набрать контейнеры из разных папок), §7.0 (строки
>    «Выбрать контейнеры…» / «Добавить контейнеры…» / «Ещё ▾»), чек-лист п. 48–49, строка диагностики
>    «выделение в диалоге слетает»; `Fore/README.md`; макет `form-planner.png` (вторая кнопка).
> Деплой: `Fore/SchedulerForm.fore`, `Fore/TaskContainerLib.fore`.
> Версия: 1.95 (по вашему запросу — **пошаговое описание логики выбора нескольких контейнеров**, чтобы
> можно было проверить её без стенда): добавлен раздел `docs/DEPLOY.md` **§7.0.1** — 8 пунктов от
> диалога `MultiSelect := True` / `Objects` до того, какие действия используют все контейнеры
> (анализ, «Построить список», «План «текстом»», «Применить план», «Применить план без простоя»),
> а какое — только первый («Что будет запущено»), плюс режимы левого списка (один контейнер — штатный
> `MetabaseListView2` с двойным кликом; два и более — объединённый `TaskListMerged`), дедупликация по Id
> и страховка «список не заполнился → показываем контейнерный». Попутно в `SelectedTaskId` убран лишний
> страж `If Not IsNull(MetabaseListView2)` — выбранная задача теперь всегда резолвится через
> `SelectedTaskDescriptor` (работает и когда штатный список скрыт, а показан объединённый).
> Деплой: `Fore/SchedulerForm.fore` (документация — без деплоя).
> Версия: 1.94 (по вашим двум замечаниям со стенда):
> 1) `SchedulerForm.MetabaseListView2OnClick` — добавлено объявление **`Stage: String;`**. Оно пропало при
>    рефакторинге 1.92 (карточка вынесена в `ShowTaskCard`), а строка `Stage := "получение списка (Sender)"`
>    в обработчике осталась → компилятор стенда ругался на неизвестный идентификатор. Теперь `Stage`
>    объявлена И используется: вызов карточки обёрнут в `Try`, сбой пишется в `Debug` и в статусную метку
>    (`«сбой на шаге …»`) — форма не закрывается;
> 2) **явные приводы элементов коллекций**: `X.Item(I).Id` заменено на
>    `(X.Item(I) As IMetabaseObjectDescriptor).Id` (или на типизированную локальную переменную) —
>    без привода обращение к свойствам элемента на стенде не срабатывает. Точки: `TaskContainerLib`
>    (`CheckedObjectIds`, `SelectedObjectDescriptor`, `CollectTaskRefs`, `CollectTasksFromContainers`),
>    `TaskPlanner.CollectTaskInfos`, `UnavailabilityPlanner.CollectAffectedTasks`,
>    `UnavailabilityRunner.FindTaskById`; заодно `PlanTable.Columns.Item(I)` приведено к `IListViewColumn`;
> 3) в `docs/DEPLOY.md` добавлена строка диагностики «элемент коллекции: свойство не читается» →
>    «приводите элемент явно (`As IMetabaseObjectDescriptor` / `As IListViewColumn`)».
> Деплой: `Fore/SchedulerForm.fore`, `Fore/TaskContainerLib.fore`, `Fore/TaskPlanner.fore`,
> `Fore/UnavailabilityPlanner.fore`, `Fore/UnavailabilityRunner.fore`.
> Версия: 1.93 (по вашему замечанию — **двойной клик по задаче должен открывать её, как в
> `MetabaseListView`**): у своего списка этого поведения не было (компонент делал это сам).
> Теперь:
> 1) сохранено штатное поведение там, где оно есть: при **ОДНОМ** выбранном контейнере показывается
>    `MetabaseListView2` (`Root` = контейнер) — двойной клик открывает задачу «из коробки» (плюс
>    системное меню элементов); объединённый список нужен только при ДВУХ и более контейнерах
>    (`RefillTaskList`: `Cnt <= 1` → штатный список + строка в «Сообщениях»);
> 2) в объединённом списке добавлено **то же действие**: `TaskListMerged.OnDblClick :=
>    TaskListMergedOnDblClick` (событие `OnDblClick` — из `IControl`, `REFERENCE` §5.3) → `OpenTaskObject`;
> 3) `OpenTaskObject(TaskDesc)` — новая общая подпрограмма: `WinApplication.Instance.GetObjectTarget(Desc)`
>    + `CommandTarget.Execute("Object.Edit", Null)`, всё в `Try` (ошибка открытия — сообщение и `Debug`,
>    форма не закрывается); `EditButtonOnClick` и пункт меню «Редактировать задачу» используют её же,
>    так что «открыть задачу» доступно и кнопкой/меню, и двойным кликом.
> Документация: `docs/DEPLOY.md` §7.0 (обе строки списков + строка обработчиков «двойной клик»),
> чек-лист п. 46–47; `Fore/README.md` (поток); макет `form-planner.png` (подсказка про двойной клик).
> Деплой: `Fore/SchedulerForm.fore`.
> Версия: 1.92 (ответ на ваш вопрос — «у `MetabaseListView` может быть только один `Root`: справился?»):
> **честно: нет, ограничение компонента не обходится.** В 1.91 контейнеры объединялись только в коде
> (план, анализ, применение плана), а левый список показывал задачи одного контейнера с переключением
> `Root`. В 1.92 сделано настоящее объединение — компонент не перегружаем, а показываем свой список:
> 1) `TaskContainerLib.fore`: класс **`CTaskRef`** (`Descriptor`, `TaskId`, `Name`, `ContainerId`,
>    `ContainerName`) и `CollectTaskRefs(Containers)` — строки объединённого списка (задачи всех
>    контейнеров без дублей, каждая со своим контейнером);
> 2) `SchedulerForm.fore`: новый контрол **`TaskListMerged`** — обычный `ListView`, создаётся кодом
>    (`New ListView.Create`, как `PlanTable`), поэтому ограничения `Root` у него нет; поля `TaskRows`
>    (`CTaskRef` по строкам) и `TaskListFilter`; `SetupMergedTaskList` — 4 колонки
>    «Задача | Контейнер | Название | Состояние» (набор пересоздаётся, если колонок не 4);
> 3) `RefillTaskList` — заполняет объединённый список по всем выбранным контейнерам с учётом фильтра,
>    пишет строку состояния в блок «Сообщения» и в `Debug`; **если заполнить не удалось — показывает
>    штатный список контейнера** (`MetabaseListView2.Root` = первый, `Visible` переключается) и пишет
>    причину в `Debug` (страховка на стенде);
> 4) клик: `TaskListMergedOnClick` (строка → задача по `TaskRows`, индекс берётся у
>    `SelectedItem`/`FocusedItem`) и `MetabaseListView2OnClick` — оба вызывают общий **`ShowTaskCard`**
>    (карточка вынесена из обработчика, «по шагам в одном `Try`» сохранено); выбранная задача для
>    меню/окна ответственного — **`SelectedTaskDescriptor`** (сначала объединённый список, затем
>    `SelectedObjects`);
> 5) фильтр списка вместо переключения `Root`: `NextTaskListFilter` + `TaskListFilterText` —
>    «все контейнеры» → по одному → снова все; меню «Ещё ▾» → «Список задач: фильтр «…» → следующий»
>    (код действия `task_filter_next`; `ShowNextContainerTasks` удалена).
> Документация: `docs/DEPLOY.md` §7.0 (контролы `MetabaseListView2`/`TaskListMerged`, обработчики,
> клик, «Ещё ▾»), чек-лист п. 44–46, строка диагностики «список показывает только один контейнер»;
> `Fore/README.md` (поток, контролы); макет `form-planner.png` (объединённый список).
> Деплой: `Fore/SchedulerForm.fore`, `Fore/TaskContainerLib.fore`.
> Версия: 1.91 (по вашему требованию — **задачи «подтягиваются» из НЕСКОЛЬКИХ выбранных контейнеров**):
> модель «один контейнер» заменена списком контейнеров.
> 1) Форма «Планировщик»: кнопка «Выбрать контейнеры…» (была «Выбрать контейнер»), диалог —
>    `MetabaseEtlOpenDialog.MultiSelect := True`, выбранные читаются из **`Objects`
>    (`IMetabaseObjectDescriptorList`)** (пример справки по `MetabaseOpenDialog`); `ChainNameEditBox`
>    показывает «(2) A; B» (ширина в описании экрана увеличена до 440).
> 2) Новые поля формы: `CurrentContainers: ArrayList` (все выбранные), `CurrentContainer` — первый из них
>    (левый список задач `MetabaseListView2.Root` и карточка задачи работают с ним), `CurrentContainerIndex`.
>    Новые подпрограммы: `FillTasksFromContainers(Containers)` (заменила `FillTasksFromContainer`) и
>    `ShowNextContainerTasks` («Ещё ▾» → «Показать задачи следующего контейнера», `cont_next` — обход
>    контейнеров по кругу; план и анализ при этом всегда по всем выбранным).
> 3) `TaskContainerLib.fore` — новые общие помощники: `ContainersText` («A; B»),
>    `ContainersIdsText` («A;B;C»), `ContainersFromIds` (разбор строки в дескрипторы по Id) и
>    `CollectTasksFromContainers` (задачи ВСЕХ контейнеров, **дубли по Id в верхнем регистре — один раз**;
>    «плохой» контейнер не срывает сбор из остальных — причина в `Debug`).
> 4) `TaskPlanner.fore`: `CollectTaskInfos(Containers)` (+ поле `CTaskInfo.ContainerId`),
>    `BuildPlanInfosForContainers` (вместо `BuildPlanInfosForContainer`), `PlanText`,
>    `PlanAndApply`, `PlanTextAvoiding`, `PlanAndApplyAvoiding` — все принимают список;
>    `ApplyPlan` открывает задачу сначала как объект **репозитория** (`ItemById(Info.Id).Edit`),
>    контейнерный дескриптор — резерв (иначе задача из «чужого» контейнера не открывалась).
> 5) `UnavailabilityPlanner.fore`: `CollectAffectedTasks(Containers; …)` и
>    `PrepareUnavailabilityPlan(Containers; …)` — в план попадают задачи всех выбранных контейнеров
>    (дедупликация — `CollectTasksFromContainers`).
> 6) `PlanTextForm.fore`: анализ принимает Id контейнеров строкой «A;B;C» (`ContainersFromIds` →
>    `BuildPlanInfosForContainers`), в таблице анализа добавлена колонка **«Контейнер»**
>    (6 колонок; ширины пересчитаны, чтобы грид 868 px не имел прокрутки), в `LblInfo` —
>    «контейнеров: N (A, B)» (`PlanInfosContainersText` в `TaskPlanner.fore`).
> 7) `UnavailabilityRunner.fore`: `FindTaskById` — сначала `MetabaseClass.Active.ItemById(Id)`
>    (задача любого контейнера), затем поиск в контейнере-параметре `RUN_CONTAINER_ID` (резерв):
>    диспетчер теперь выполняет строки плана, построенного по нескольким контейнерам (DDL не менялся).
> Документация: `docs/DEPLOY.md` §7.0 (контролы, обработчики, поля), чек-лист п. 44/45, 3 строки
> диагностики; `Fore/README.md` (поток, контролы); макет `form-planner.png` (подпись «Выбрать контейнеры…»).
> Деплой: `Fore/SchedulerForm.fore`, `Fore/TaskContainerLib.fore`, `Fore/TaskPlanner.fore`,
> `Fore/UnavailabilityPlanner.fore`, `Fore/UnavailabilityRunner.fore`, `Fore/PlanTextForm.fore`.
> Версия: 1.90 (по вашему вопросу — **макет основного интерфейса `form-planner.png` приведён в соответствие
> коду**; PNG обновлены): в макете оставались контролы, которых в форме нет, — кнопки «Взять период»,
> «Ручной ввод периода», «Разослать уведомление ответственным», «Редактировать» (в форме это «Ещё ▾» →
> `MenuMoreOnClick`), «Журнал выполненных запусков» (`ShowRunLogOnClick` — пункт меню «Сервис ▾»), «Письма
> ответственным», «Выгрузить HTML (Excel)» (обработчик удалён в 1.86), «Показать сохранённый план» (пункт
> меню «План ▾»), а также подсказка про удалённые диалоги `SavePlanDialog`/`OpenPlanDialog`; ширины колонок
> списка периодов не совпадали с `SetupRecordsListColumns`, блок «Раскладка (план)» стоял со сдвигом и сводка
> обещала правку времени в таблице (`ReadOnly`). Исправлено в `tools/make-mockups.py`
> (`build_planner`/`build_records`): геометрия блока плана взята из `ScreenSpecText`/`PlaceInGroup`
> (`FilterEditBox` y = 524, `LblStatus` y = 556, `PlanTable` 830;583;912;440, `BtnRecalcPlan` 1542;524),
> ширины списка периодов — 150/150/«Автор» тянется/150/90, пикеры окна ведения — по `RecPlace`
> (254;400;90 / 356;400;220 / 584;400;90, `RecAuthorLabel` 690;404;480;20), добавлены подсказки по составу
> меню; в окне ведения — про привязку клика **кодом** и подтверждение вида пикеров (1.89). Макеты-предложения
> (`form-planner-simplified*.png`) помечены как состояние «до 1.86» (в `docs/DEPLOY.md` §7 и `Fore/README.md`
> макетов; `REFERENCE.md` §5.33). Перегенерация: `python tools/make-mockups.py`; проверка геометрии:
> `python tools/mockups-check.py` — 0 наложений, «Макеты: OK». Деплой: код форм не менялся.
> Версия: 1.89 (по вашему замечанию — **при выделении строки в окне ведения недоступностей период
> (дата и ВРЕМЯ) снова подставляется в пикеры**):
> причина — подстановка зависела от двух «внешних» привязок: клик по строке привязывался **только в
> Инспекторе** (`RecordsList.OnClick := RecordsListOnClick` в коде не было — в отличие от
> `MetabaseListView2.OnClick` и `PlanTable.OnClick` в планировщике), а вид пикеров (`Kind` = «дата» /
> «время») задавался только в `RecordsFormOnShow`/`FormOnCreate` — если событие не привязано, вид
> пикера пересоздан/сброшен в Инспекторе, значение времени уходило в пикер с видом «дата» и не
> отображалось. Теперь:
> 1) `RecordsList.OnClick := RecordsListOnClick` — привязка **кодом** в `SetupRecordsLayout`
>    (как у `MetabaseListView2`/`PlanTable`), подстановка больше не зависит от Инспектора;
> 2) `ConfigurePeriodPickers` вызывается и из `RecordsFormOnCreate` (не только из `OnShow`), а
>    `SetPeriodPickers` **подтверждает вид пикеров ДО записи значений** — значит время попадает в
>    пикер-«время» даже если `Kind` был сброшен (значения пишутся после настройки и не теряются);
>    то же добавлено в планировщике (`UnavailabilityRecordsForm` + `SchedulerForm`);
> 3) `SelectedRecordKey` берёт строку по `SelectedItem`, а если выделение ещё не обновилось — по
>    `FocusedItem` (как `SelectedPlanImpact`): первый клик по строке больше не «промахивается»;
> 4) в `BuildAffectedOnClick` (планировщик) период выбранной записи возвращается в пикеры перед
>    чтением (настройка вида пикеров не должна «съедать» взятый период);
> 5) диагностика: `Debug`-строки «период в пикеры — <начало> — <окончание>» и «клик по строке —
>    запись не найдена (выбранный ключ N, строк в списке M)».
> Деплой: `Fore/UnavailabilityRecordsForm.fore`, `Fore/SchedulerForm.fore`.
> Версия: 1.88 (по вашему замечанию — **выбор записи о недоступности не должен «слетать»**):
> причина — `BuildAffectedOnClick` вызывал `OpenUnavailabilityOnClick`, а тот сбрасывал
> `UnavailSelectedKey := 0`. После «Взять период» → «Построить список» выбранная запись терялась, и
> «Сохранить в таблицу»/«Загрузить из таблицы» просили выбрать запись заново. Теперь:
> 1) в `OpenUnavailabilityOnClick` **выбор не сбрасывается** (сбрасывает его только «Ручной ввод периода»);
> 2) `FillUnavailPeriods` после пересборки списка **восстанавливает выделение** новой подпрограммой
>    `SelectUnavailPeriodRow(Key)` (`IListViewItem.Selected` + `MakeVisible`, всё в `Try`) — так выбор
>    сохраняется и после «Обновить список периодов», и после закрытия окна ведения недоступностей;
> 3) `ManualPeriodOnClick` снимает выделение (`SelectUnavailPeriodRow(0)`) — в ручном режиме запись не
>    выбрана, и подсветка строки больше не «врёт».
> Деплой: `Fore/SchedulerForm.fore`.
> Версия: 1.87 (по вашему замечанию — **бизнес-приложение задачи ищется по дескриптору РЕПОЗИТОРИЯ**):
> в `CollectAffectedTasks` `BA_NAME` определялся по дескриптору из `IScheduledTasksContainer.Tasks`
> («внутри контейнера») — у таких дескрипторов своя цепочка владельцев, которая **не ведёт** к дереву
> репозитория, поэтому `GetTaskBusinessAppName` (обход `Parent` до класса `10496`) ничего не находил и
> колонка «Бизнес-приложение» оставалась пустой. Добавлена **`TaskRepoDescriptor(TaskId)`** — объект
> репозитория через `MetabaseClass.Active.ItemById` (в `Try`; не открылся — используется прежний
> контейнерный дескриптор, поведение не ухудшается), и по нему теперь берутся все поля строки плана:
> `Descriptor`, `Id`, `Name`, `BusinessApp` (и поиск ответственного по Id). В комментарии
> `GetTaskBusinessAppName` зафиксировано требование передавать дескриптор репозитория (в
> `SchedulerForm.ApplyResponsible` так и было — там `ItemById`). Деплой: `Fore/UnavailabilityPlanner.fore`.
> Версия: 1.86 (по вашему заданию — **работа с планом только через таблицы СУБД + колонки-«крестики» и
> пересчёт плана по слоям**):
> 1) **`AffectedList` убран** — его роль выполняет таблица плана: в ней все задачи, пересекающиеся с
> периодом недоступности, плюс две колонки-«крестика» — «Обрабатывать» (`UNAVAIL_COL_PROCESS`) и
> «Не запускать» (`UNAVAIL_COL_SKIP`), всего **10 колонок** (`UNAVAIL_PLAN_COLUMNS`), значения — `✔`/`—`
> (`UNAVAIL_MARK_ON/OFF`). Отметки связаны, как радиокнопки: `SetImpactFlags(Impact; Processed; Skip)`
> («не запускать» снимает «обрабатывать»; снятие «не запускать» возвращает «обрабатывать»; снятый
> «обрабатывать» — задача вне плана), проверки — `ImpactProcessed` / `ImpactSkipped`. По умолчанию все
> пересекающиеся задачи — «обрабатывать» + «перепланировать». Меню: «Отметки ▾» («Обрабатывать все» /
> «Не обрабатывать все»), «Решение ▾» («Не запускать / Перепланировать — все обрабатываемые» и
> «— выбранная строка»).
> 2) **Клик по ячейке** (`PlanTableOnClick`): колонка — по `Args.pPoint.X` (сумма ширин колонок,
> `PlanTableColumnAt`), строка — по `SelectedItem`/`FocusedItem` (`SelectedPlanImpact` находит задачу по
> Id из первой колонки, поэтому работает и при включённом фильтре). Ширины колонок подобраны так, чтобы
> таблица не имела горизонтальной прокрутки (`UnavailPlanColumnWidth`); если клик на стенде не сработает —
> те же действия доступны пунктами меню.
> 3) **Кнопка «Пересчитать план»** в блоке «Раскладка (план)» (+ пункт меню) → новое окно
> **`Fore/PlanParamsForm.fore`**: начало плана (по умолчанию — окончание периода недоступности),
> «Число слоёв», флажок «Уложиться в желаемое окончание» (тогда `PlanLayersForFinish` считает слои как
> `⌈сумма / (окончание − начало)⌉`, не больше `UNAVAIL_MAX_LAYERS = 50`). Обмен — командами `SetStart` /
> `SetLayers` / `SetFinish` и `GetParams` (`"applied|layers|start|finish"`), окно закрывается крестиком
> (как `ResponsibleForm`; `ModalResult` в справке описан, но значения перечисления — нет).
> 4) **Раскладка по слоям** (теория расписаний): `DistributeScheduleLayers(Impacts; PlanStart; Layers)` —
> LPT-порядок (длинные первыми), каждая задача идёт в **наименее загруженный слой**, внутри слоя задачи
> стоят вплотную (окончание ≈ начало следующей); дедупликация штатного запуска (`DEDUP_GAP_MINUTES`)
> сохранена. `PlanEffectiveSeconds` — длительность для раскладки (нет истории → `MIN_ASSUMED_SECONDS`).
> 5) **Только таблицы СУБД.** Убраны сохранение/загрузка плана в файл, CSV- и HTML-выгрузка
> (`ExportPlanOnClick`, `ImportPlanOnClick`, `ExportTableCsvOnClick`, `ExportHtmlOnClick`,
> `ExportStoredPlanOnClick`, диалоги `SavePlanDialog`/`OpenPlanDialog`, `WritePlan`/`ReadPlan`,
> `UnavailPlanCsvText`/`UnavailPlanHtmlText`/`UnavailHtmlEscape` и соответствующие пункты меню).
> У раннера убран файловый режим целиком (`RUN_PLAN_PATH`, `RUN_DONE_PATH`, `RUN_PLAN_FROM_TABLE`,
> `RUN_DONE_IN_TABLE`, `CUnavailRun`, `RunKey`/`RunTwoDigits`, `SplitRunLines`, `ListHasRunLine`,
> `ReadPlanRuns`, `ReadDoneKeys`, `AppendDoneKey`, `RunDuePlannedRuns`, `RunDuePlannedRunsBySource`): план
> читается из `UNAVAILABILITY_PLAN` (`RunDuePlannedRunsFromTable(Container; TailHours)`), результат
> пишется туда же, история попыток — в `UNAVAILABILITY_RUN_LOG`. Из хранилища удалена `UnvRunKey`.
> 6) Раскладка формы: блок `GrpAffected` убран, «Сообщения» подняты (818;380), «Раскладка (план)» —
> 818;504;936;556 (таблица 912×440), `LblStatus` переехал в блок плана и считает «пересекается /
> обрабатывать / перепланировать / не запускать / без обработки». `SetupPlanTableColumns` пересоздаёт
> колонки, если их набор отличается от 10 (`Columns.Count <> UNAVAIL_PLAN_COLUMNS`).
> 7) `tools/fore-spec.js`: убраны кейсы «ключ журнала» и «CSV», добавлены кейсы раскладки по слоям и
> авто-числа слоёв. Деплой: `Fore/SchedulerForm.fore`, `Fore/UnavailabilityPlanner.fore`,
> `Fore/UnavailabilityRunner.fore`, `Fore/UnavailabilityStore.fore`, новый `Fore/PlanParamsForm.fore`;
> на стенде удалить `AffectedList` из дизайнера и создать форму `PlanParamsForm` (ссылка из формы
> «Планировщик»; сборки: Forms, Ui, System, Collections + UnavailabilityStore).
> Версия: 1.85 (по вашему заданию — **у раннера журнал выполненных запусков и план в таблицах БД**):
> план уже лежит в таблице `UNAVAILABILITY_PLAN` (диспетчер берёт из неё строки, а не из файла —
> `RUN_PLAN_FROM_TABLE = True`), а для ИСТОРИИ попыток добавлена отдельная таблица
> **`UNAVAILABILITY_RUN_LOG`** (`docs/sql/unavailability-run-log-postgres.sql`): одна строка = одна
> попытка диспетчера — `DONE` / `FAILED` / `SKIPPED` (задача занята) / `DRY_RUN`, с плановым временем,
> началом/окончанием (часы процесса диспетчера), номером попытки (= `ATTEMPTS` плана), длительностью
> в секундах, текстом ошибки и автором. В `UnavailabilityStore.fore` добавлены `CUnavailRunLogRow`,
> константы `UNV_RUN_LOG_TABLE`/`RL_F_*` и функции `WriteRunLog` / `LoadRunLog` / `RunLogText` /
> `RunLogStateText`; `CUnavailStoredRun` получил `TaskName`, а `LoadDueRunRows` — колонку `TASK_NAME`
> (нужна журналу). `UnavailabilityRunner.fore` пишет строку журнала после каждой попытки (в т.ч. в
> файловом режиме отметки) через новую `RunSeconds`; состояния — **локальные** константы раннера
> `RUN_LOG_DONE/FAILED/SKIPPED/DRY_RUN` (модуль автономен, значения совпадают с `RUN_STATE_*`
> хранилища — как и `RUN_DECISION_RESCHEDULE`); если таблицы нет — запись гасится в `Try`, в
> `Debug` пишется «Недоступность: запись в журнал запусков — …», работа диспетчера не прерывается.
> На форме — новый пункт **«Сервис ▾ → Журнал выполненных запусков»** (`run_log` →
> `ShowRunLogOnClick`): в блоке «Сообщения» строки «дата | состояние | задача | план: … | попытка N |
> X с | автор». Деплой: `Fore/UnavailabilityStore.fore`, `Fore/UnavailabilityRunner.fore`,
> `Fore/SchedulerForm.fore` + **выполнить DDL** `docs/sql/unavailability-run-log-postgres.sql`
> (или полное пересоздание: `unavailability-recreate-postgres.sql`, он уже подключает этот файл).
> Версия: 1.84 (по вашему заданию — **анализ раскладки контейнера выводится таблицей**): кнопка
> «Анализ» (`AnalyseButtonOnClick`) больше не открывает текст — `SchedulerForm.ShowPlanAnalysis`
> передаёт окну `PlanTextForm` **Id контейнера**
> (`SendCommand("ShowAnalysis", Cont.Id)`: между формами ходят только строки), а окно строит
> грид `AnGrid` (`ListView` вид `ListViewStyle.Report` — **заголовки столбцов и сетка**) с колонками
> «Задача | Название | Очередь | Ср. длительность, с | Плановый старт»; над таблицей — строка `LblInfo`
> («Задач: N; суммарная средняя длительность, ч: X; окно: …»). В `TaskPlanner.fore` добавлены
> `BuildPlanInfosForContainer` (анализ как **данные**: тот же расчёт, что и в `PlanText` —
> `CollectTaskInfos` + `BuildPlan`) и `PlanInfosHeader`; `PlanText` теперь выражается через них.
> Текстовый режим окна сохранён («Выгрузка ▾ → План «текстом»», команда `ShowText`), режимы
> переключаются видимостью (`ApplyMode`); кнопка «Копировать в буфер» отдаёт таблицу текстом с
> разделителем-табуляцией — вставка в Excel раскладывает по столбцам. `MEMO` в окне сдвинут ниже
> строки-заголовка (пустая полоса внизу окна убрана). Деплой: `Fore/PlanTextForm.fore`,
> `Fore/TaskPlanner.fore`, `Fore/SchedulerForm.fore`. ⚠ В «Ссылки сборок» формы `PlanTextForm`
> добавить **Metabase** (`MetabaseClass.Active.ItemById`) и модуль **TaskPlanner**.
> Версия: 1.83 (по вашему вопросу «SaveTaskResponsible — уже сохраняет почту?» — **нет, не сохраняла**):
> в `UnavailabilityStore.SaveTaskResponsible` колонка `MAIL` указывалась только в части
> `on conflict (TASK_ID) do update set …`, а в список колонок `INSERT` не попадала. Поэтому у задачи,
> у которой строки в `RESPONSIBLE_FOR_TASK` ещё НЕТ, строка создавалась **без почты** — адрес терялся
> (это и было причиной, по которой уведомления не уходили, даже после подстановки адреса в форме).
> Теперь почта пишется и в `INSERT`, и в `UPDATE`; если колонки `MAIL` в базе нет (миграция не
> выполнена) — запись автоматически повторяется без неё, чтобы не потерять ФИО, и в `Debug` пишется
> подсказка «выполните миграцию». Деплой: `Fore/UnavailabilityStore.fore` (+ `SchedulerForm.fore` и
> `UnavailabilityPlanner.fore` из версии 1.82).
> Версия: 1.82 (по вашему запросу — **при выборе ранее использованного ответственного подставляется
> его почта**): в `UnavailabilityPlanner.fore` добавлена `LoadResponsibleMail(TableId; Responsible)`
> (читает таблицу ответственных тем же SQL/курсором, что и список имён, и возвращает последнее непустое
> значение `MAIL` для этого ФИО), а в `SchedulerForm.ApplyResponsible` вместо `Null` («сохранить прежнюю
> почту») передаётся найденный адрес — поэтому теперь и в меню «Ранее использованные ответственные ▾»,
> и при любом выборе из списка в таблицу пишется ФИО **вместе с почтой** (пусто — если адрес для этого
> ФИО нигде не заполнен). В карточке задачи строка «Ответственный (по задаче):» показывает адрес в
> скобках — видно, что подстановка сработала. Деплой: `Fore/SchedulerForm.fore` +
> `Fore/UnavailabilityPlanner.fore`. ⚠ Замечание для линтера: `If` с двумя строками продолжения условия
> он считает «незакрытым» — выражение вынесено в отдельную переменную `Mail`.
> Версия: 1.81 (по вашему запросу «проверь scheduler на использование удалённых компонентов»):
> проверка нашла **14 обращений к удалённым именам** — `SetAutoSize(PlanTextMemo, …)`,
> `SetAutoSize(BtnEditTask/BtnExportStored/BtnDeletePlan/BtnDryRun/BtnLog/BtnPlanSafe/BtnMonitor/BtnNotify/BtnExportHtml, …)`,
> мёртвый блок настройки `PlanTextMemo` (`ReadOnly`/`WordWrap`/`ScrollBars`) и `AnchorGroup("GrpPlanText", …)` —
> всё это не компилировалось бы (или молча ничего не делало). Всё убрано, `SetupPlannerLayout`/
> `SetupPanelLayout` вызывают `SetAutoSize` только для существующих контролов, `AnchorGroup` — только для
> реально описанных блоков. Добавлена **постоянная проверка** `tools/fore-refs-check.js` (входит в
> `check-all.js`): R1 — `UiFind(Map_, "Имя")` обязан быть в описании экрана; R2 — `SetAutoSize`/`PlaceInGroup`
> принимают имя из описания или объявленное; R3 — `AnchorGroup`/`PlaceInGroup` ссылаются на существующий
> блок `GROUP`. Проверка валидирована негативным тестом (на временной копии со сломанной ссылкой даёт
> FAIL и код возврата 1). Правило записано в шапке `check-all.js` и в таблице инструментов §2).
> Версия: 1.80 (**чистка мёртвого кода после перехода «кнопки → меню»**, `Fore/SchedulerForm.fore`):
> удалены объявления 31 удалённой кнопки/поля (`BtnMarkAll`, `BtnSkipChecked`, `BtnExportFile`,
> `BtnShowStored`, `PlanTextMemo` и т. д.), их alias-присваивания (`X := UiFind(Map_, "X")`) и 30 блоков
> привязки `Ctl := UiFind(Map_, "X") As Button; … OnClick := …`; вместе с ними убраны пикеры нового
> времени (`NewDatePicker`/`NewTimePicker`, время теперь правится в колонке «Дата нового запуска») и
> обработчик `ApplyNewTimeOnClick`, который на них ссылался. Файл формы: 2492 → 2293 строки; в описании
> экрана 39 элементов, из них **15 кнопок** (7 обычных + 8 кнопок-меню). Оставлено осознанно:
> `SetupTreeColumns` (помощник для дерева задач — дерево убрано из формы, helper сохранён «на случай
> возврата»), `FormOnCreate` и прочие обработчики событий.
> ⚠ **Урок (важно для будущих чисток):** обработчики событий формы (`OnCreate`/`OnShow`/`OnClose`,
> клики, привязанные в дизайнере) **в коде не упоминаются** — автоматическая чистка «неиспользуемых»
> Subs удалила `FormOnCreate` и сломала форму. Правило: обработчики только *перечисляются* для ручного
> решения, автоматически удаляются лишь поля/alias/блоки привязки, имена которых есть в `UiFind`, но
> отсутствуют в описании экрана. Откат делался из `tools/_SchedulerForm.before.fore` (временный бэкап).
> Версия: 1.79 (по вашему замечанию №1 — **кнопка «Ранее использованные ответственные ▾» не нажималась**):
> причина в родителе — `MenuButton` лежала на форме **соседом** рамки `GrpTaskCard`, а в Fore надёжно
> работает только «ребёнок контейнера» (так сделаны остальные контролы блока и списки — `PlaceInGroup`).
> Теперь кнопка — ребёнок `GrpTaskCard` (координаты от её угла, как у соседей по блоку) + подстраховка
> `RespMenuButton.OnClick := RespMenuButtonOnClick` (строит пункты и показывает меню через
> `MenuShow(Sender; Args; RespPopupMenu)`, если свойство `Menu` не всплывёт). **Тело `RespMenuPickOnClick`
> включено обратно** (было отключено блоком `{ … }`): выбор пункта снова пишет ответственного
> (`ApplyResponsible`), «Ввести вручную…» открывает форму ответственного. Замечания №2 и №3 учтены:
> координаты `Popup(Self; …)` оставлены как на стенде (работают), высоты окон 660 сохранены
> (в маленьком окне кнопки обрезались). Правило вынесено в `Fore/README.md` и §5.33).
> Версия: 1.78 (**приняты правки стенда** из папки `Fore15 (from me)`): рабочий вызов меню —
> `MenuShow(Sender; Args; M)` с `M.Popup(Self; Self.Left + (Sender As IControl).Left + Args.pPoint.X;
> Self.Top + (Sender As IControl).Top + Args.pPoint.Y)` (у `IPopupMenu.Popup` **три** аргумента, §5.32);
> окна стали выше — `PlanTextForm` 900×660, `ResponsibleForm` 760×660 (высота задаётся кодом в
> `...OnCreate`); «Построить список» дополнительно вызывает `OpenUnavailabilityOnClick(Sender; Args)`
> (панель сама подготавливает Root/пикеры/периоды); в `TaskPlanner.ApplyPlan` переменная `Errors`
> объявлена в общем списке (`Applied, i,Errors: Integer`); убрано дублирующее объявление `LayoutK`;
> в `UnavailNotify` закрывающий `End Function NoticesSummaryText;` стоит сразу после тела.
> ⚠ В стендовом варианте **тело `RespMenuPickOnClick` отключено блоком `{ … }`** (строки 756–787):
> меню «Ранее использованные ответственные ▾» строится, но выбор пункта пока ничего не делает —
> решить, возвращать ли обработчик (и что именно не компилировалось). Со своей стороны **`SetMemoLines`
> оставлена общей** — в `Fore/TaskContainerLib.fore` (в варианте стенда она лежала в модуле формы,
> откуда её нельзя вызвать из `PlanTextForm`), дубль из `SchedulerForm` убран.
> Версия: 1.77 (**`SetMemoLines` вынесена в общую библиотеку** `Fore/TaskContainerLib.fore` — раньше
> функция была приватной в `SchedulerForm.fore`, из-за чего другое окно (`PlanTextForm`) не могло её
> вызвать. Теперь у неё одно определение, доступное всем формам и модулям; в реализации вместо
> `UNAVAIL_CRLF` используется `#13 + #10` (то же значение) и добавлены проверка `IsNull` и `Try`.
> Для `PlanTextForm` в `docs/DEPLOY.md` указаны ссылки сборок (`TaskContainerLib`, `UnavailabilityStore`)
> и ссылка на форму из «Планировщика»).
> Версия: 1.76 (правки по замечаниям компиляции стенда): **в `SchedulerForm` убрано повторное
> объявление `LayoutK`** (осталось одно, в шапке класса); вызов снятия ответственного исправлен на
> **`ApplyResponsible(TaskId, "")`** (в `ClearResponsibleOnClick` пропущен Id задачи);
> **в `UnavailNotify.fore` функция `NoticesSummaryText` закрывается сразу** (`End Function` после тела —
> прежний закрывающий оператор стоял ниже, после `NoticesForResponsibles`, из-за чего компилятор ругался);
> **все общие классы данных получили `Public`** (`CUnavailWindow`, `CUnavailImpact`, `CTaskResponsible` —
> `UnavailabilityPlanner.fore`; `CUnavailRecord`/`CUnavailStoredRun`/`CUnavailLogRow`/`CUnavailStoredPlanRow`
> — `UnavailabilityStore.fore`; `CUnavailNotice` — `UnavailNotify.fore`; `CUnavailRun`/`CRunOutcome` —
> `UnavailabilityRunner.fore`; `CTaskInfo`/`CPlanWindow` — `TaskPlanner.fore`; `CUiSpec` — `UiFactory.fore`):
> иначе обращение к ним из другого модуля сборки не компилируется. В шапку `SchedulerForm.fore` добавлена
> подсказка, где объявлены типы панели (`CUnavailWindow` — `UnavailabilityPlanner.fore`, стр. ~60).
> Версия: 1.75 (правки по замечаниям стенда): **`RespMenuButton` — снова `MenuButton`** (Forms) со
> свойством `Menu := RespPopupMenu` (пункты строит `RespMenuBuild` заранее — при выборе задачи и после
> записи ответственного, `PopupMenu.OnPopup` не используем: в локальном дампе справки не описан);
> **`UiFreeOne`: тело отключено** (TODO — освобождение памяти разбираем позже, `FreeComponent`/`Dispose`
> не вызываем); **`TaskPlanner.ApplyPlan`: объявлена переменная `Errors: Integer`** (была неявная —
> компилятор/линтер ругались); **`UiFactoryDemo`: добавлены `;` после `End If` и `End For`** в
> `BuildDemoScreen`; **`UnavailNotify`: SMTP-функция `SendNoticeSmtp` и `SendNoticesSmtp` удалены**
> вместе с `NOTIFY_SMTP_*` — отправка везде через функцию заказчика
> `SendMailMessage(To_; From_; Subject; Body: String)` (`SendNoticesUserMailer`), в «Планировщике»
> «Письма ответственным» тоже переведены на неё. §5.32 обновлён по `MenuButton`, §6.26 — по рассылке).
> Версия: 1.74 (**реализация предложения v2 — «разгрузка» основной формы**): вместо 28 кнопок —
> **8 меню** («Ещё ▾» — задача/ответственный; «Недоступности ▾»; «Отметки ▾»; «Решение ▾»;
> «План ▾»; «Выгрузка ▾»; «Уведомления ▾»; «Сервис ▾»), реализованы как `Button` + `PopupMenu`
> (`MenuItemNew` + единый `MenuActionOnClick`, код действия в `Item.Data`; обработчики-кнопки
> вызываются с `(Null, Null)` — они не используют `Sender`/`Args`); видимых элементов 34 → 14.
> **Дубли убраны**: `PlanTextMemo` и пикеры нового времени удалены (плана «текстом» и анализ —
> в новом окне **`Fore/PlanTextForm.fore`**, время — в колонке «Дата нового запуска» таблицы плана);
> вместо многострочной сводки — **строка статуса `LblStatus`** («Затронуто задач: N (перепланировать: X,
> не запускать: Y)»), в `UnavailSummaryMemo` остаются только сообщения о результатах операций (блок
> «Сообщения»); список задач вырос (240 → 560 единиц) на освободившемся месте. `SetAutoSize` в
> `TaskContainerLib.fore` стал Null-безопасным (удалённые из описания контролы больше не роняют форму).
> Ещё в работе: макет `form-planner.png` под новый вид, перенос «Показать сохранённый план» в отдельное
> окно сравнения (пока остаётся блок `GrpStored`), детализация в §5.33).
> Версия: 1.73 (по замечаниям стенда — **только пиксельные размеры**: `UI_AUTOSIZE_ON_RESIZE = False`
> в `TaskContainerLib.fore` (привязки/`Anchors` отключены, `SchedulerFormOnResize` и `ApplyWindowGrowth`
> удалены, окно не «разъезжается»); **списки больше не перекрыты рамками `GROUP`** — контролы внутри
> блока получают `Parent := <группа>` (хелпер `PlaceInGroup`, ребёнок рисуется поверх рамки; причина —
> списки размещены в дизайнере раньше, чем фабрика создаёт группы, а `BringToFront`/`SendToBack` у
> `IControl` нет); **форма шире** — правая колонка `PANEL_X_SHIFT = +48`, блоки/таблицы
> `PANEL_X_GROW = +100` (реализация — `UiShiftSpecsRight` в `UiFactory.fore`), `LayoutK = 0.8`
> (≈1542×1040). Разбор — §5.33, макет обновлён).
> Версия: 1.72 (по замечаниям стенда: **Id задачи передаётся в форму ответственного** — `SelectedTaskId_`
> запоминает выбор в `MetabaseListView2OnClick`, `EditResponsibleOnClick` открывает окно уже заполненным;
> **выпадающий список ответственных** — на `MenuButton` (Forms) со свойством `Menu := RespPopupMenu`;
> пункты строит `RespMenuBuild` заранее (при выборе задачи и после записи ответственного) — §5.32;
> **зазор ≥20 единиц под подписью блока** (`PlanTextMemo`, строка фильтра плана, пикеры/таблицы в блоках)
> и подогнанные рамки; **развёрнутое окно** — `LayoutK := 0.9` (+20% к 0.75), `LAYOUT_TOP_SHIFT = 20`
> (компоновка выше; сдвиг — `UiShiftSpecsTop` в `UiFactory.fore`), `SchedulerFormOnResize` +
> `ApplyWindowGrowth` отдают прибавку высоты сводке плана и таблице плана. Макет `form-planner.png`
> перерисован, версия §5.33 дополнена).
> Версия: 1.71 (внедрены **блоки `GROUP`** и **подписи к выводимым данным** — по предложению v2:
> в `ScreenSpecText` формы «Планировщик» добавлены 9 строк `GROUP` (GroupBox: «Карточка задачи»,
> «Задачи контейнера», «Сводка плана», «Периоды недоступности», «Период недоступности», «Затронутые
> задачи», «Сообщения и сводка», «Раскладка (план)», «Сохранённый план»), дети заданы через `Parent=`
> с координатами от клиентской области группы (подпись ~15 px); у карточки появились статичные
> подписи `LblCap*`, у `Label1` убран префикс «Ответственный:» из текста; вызов фабрики в
> `CreateFormComponents` переставлен ДО создания таблиц/пикеров, чтобы блоки оказались под ними;
> добавлен хелпер `AnchorGroup` (автомасштаб рамок); макет `form-planner.png` перерисован под новый код.
> Дубли данных и кнопки-меню остаются на согласовании. Подробности — §5.33. Заодно `tools/fore-ui-spec-check.js`
> расширен на **все** `*SpecText` проекта (было — только демо-форма): теперь проверяются 4 описания экрана
> (100 компонентов) — имена, числовые координаты, что `Parent=` ссылается на ранее объявленный контейнер
> и что ребёнок **не выходит за рамку** своего `GroupBox` (учёт подписи 15 px). Новая проверка сразу нашла
> дефект в демо-форме (`BtnStop` вылезала за рамку `GrpRight`) — исправлено: рамка 455;10;430;302,
> кнопка `14;259`).
> Версия: 1.70 (подтверждено по коду и перенесено в макет: блоки v2 — настоящие `GroupBox`, то есть строки
> `GROUP;Grp…;Заголовок;L;T;W;H` в `ScreenSpecText` (`UiFactory.fore`: `UI_GROUP = "GROUP"`, `New GroupBox.Create`,
> хелпер `UiGroup`). Правила: дети ссылаются `Parent=Имя`, координаты — от клиентской области группы
> (или `UI_SPEC_ABS_COORDS := True`), таблицы/пикеры — `Parent := GrpX` в раскладке; поддержан один уровень
> вложенности. В макете v2 у каждого блока показана будущая строка описания; разбор — `REFERENCE.md` §5.33,
> код формы не изменён).
> Версия: 1.69 (второй макет предложения — `docs/mockups/form-planner-simplified-v2.png`:
> **подписи к выводимым данным** (метки заполнялись «голыми» значениями — «Готова», «12.01.2026 06:00»;
> подпись была только у `Label1`) и **разбор дублей данных** (план показывался трижды —
> `PlanTextMemo`/`PlanTable`/`StoredPlanTable`; новое время — пикерами и колонкой плана; сводка
> дублировала счётчики и период; «Состояние» — в списке и карточке). Разбор — `REFERENCE.md` §5.33,
> код форм не изменён до согласования; `tools/mockups-check.py` теперь печатает и обрезанные подписи).
> Версия: 1.68 (макет-предложение по удобству: `docs/mockups/form-planner-simplified.png` —
> 34 кнопки → 14 элементов (5 действий + 9 кнопок-меню, внутри 31 действие); анализ дублей и план
> упрощения зафиксированы в §5.33, код форм **не изменён** до согласования. Макет `form-planner.png`
> синхронизирован с кодом (убран `RespEditBox`), в `check-all.js` проверяются 4 PNG).
> Версия: 1.67 (по замечанию стенда: поле `ResponsiblePersonEditBox` на форме «Планировщик» заменено на
> **`ResponsiblePersonLabel: Label`** — значение `Props.UserTag` (автор/ответственный по объекту) теперь
> только показывается, а не редактируется: в описании экрана строка `EDIT;…` стала `LABEL;…`
> (`LABEL;ResponsiblePersonLabel;;26;118;500;20;`), «алиас» и присваивания в карточке задачи обновлены,
> поправлены `README.md`/`DEPLOY.md` и макет).
> Версия: 1.66 (автомасштаб компонентов при изменении размеров окна: новая константа
> **`UI_AUTOSIZE_ON_RESIZE`** и помощник `SetAutoSize(Ctl; StretchRight; StretchBottom)` в
> `TaskContainerLib.fore` — задают `IControl.Anchors: IAnchors` (проценты `Left`/`Top`/`Right`/`Bottom`).
> Вызовы добавлены в `SetupPlannerLayout`/`SetupPanelLayout` (форма «Планировщик»),
> `SetupRecordsLayout` (окно ведения) и `SetupRespLayout` (окно ответственного): списки/таблицы/Memo
> тянутся по ширине, Memo и ряды нижних кнопок — ещё и по высоте. §5.32 дополнен разделом про `Anchors`).
> Версия: 1.65 (правка кнопки «Изменить ответственного»: теперь она **открывает форму ведения
> ответственного** `Fore/ResponsibleForm.fore` (`Public Class ResponsibleFormForm`) — в ней задаются ФИО
> И почта; задача передаётся документированной **командой формы** `SendCommand("EditResponsible", TaskId)`
> → `ResponsibleFormOnCommand` (`Args.Command`/`Args.Argument`/`Args.Result`), форма показывается
> `ShowModal`. В форме: поля `TaskIdEditBox`/`RespNameEditBox`/`RespMailEditBox`, `RespInfoMemo`
> (статус/БП/подсказка о почте) и кнопки «Сохранить»/«Снять ответственного»; запись —
> `SaveTaskResponsible`, которой добавлен параметр `MailField` и `Mail: Variant` (`Null` — колонку не
> трогаем, `""` — очищаем). Из «Планировщика» убрано поле `RespEditBox` (пункт меню «Ввести вручную…»
> тоже открывает форму); пункт меню со списком по-прежнему пишет ответственного сразу. Новый макет
> `docs/mockups/form-responsible.png` (в проверке `check-all.js` уже 3 PNG); линтер научен модификатору
> `Public` у `Class`/`Sub`/`Function`. Обновлены `README.md`, `DEPLOY.md`, §5.28 (команды формы)).
> Версия: 1.64 (чтение таблицы ответственных переведено на **SQL по соединению с базой** — без
> объекта репозитория: `RESP_DB_ID` (база, `IDatabaseInstance`) → `ISecurityConnection.CreateCommand` →
> `Command.Parse` → `Command.CreateCursor` → `Cursor.Fields.Item(n).Value` (поля по НОМЕРУ в порядке
> `select`), как в `UnavailabilityStore.LoadUnavailRecords`. Новая функция `LoadResponsibleTableSql`
> собирает `select TASK_ID, BA_NAME, RESPONSIBLE[, MAIL] from RESPONSIBLE_FOR_TASK`; `LoadResponsibleTable`
> сначала читает с `MAIL`, а при пустом результате повторяет без неё (база без миграции колонки);
> значения приводятся `UnvVarToStr` (Null → «»). Плановому модулю добавлена сборка **Dal**
> (`ISecurityConnection`/`IDalCommand`/`IDalCursor`) — `DEPLOY.md` §5.1/§6.1, `README.md`).
> Версия: 1.63 (кнопка **«Разослать уведомление ответственным»** на панели недоступности: по выбранной
> записи о недоступности ответственным уходят письма со сроками недоступности, автором записи и списком
> их задач (`UnavailNotify.NoticesForResponsibles` + `NoticeBodyNotice` + `UnavailNoticesForSendText`),
> отправка — **ваша** функция `SendMailMessage(To; From; Subject; Body)` через `SendNoticesUserMailer`
> (`NOTIFY_FROM`, новая тема `NOTIFY_SUBJECT_UNAVAIL`). В таблицу ответственных добавлена колонка
> **`MAIL`** (`docs/sql/responsible-for-task-postgres.sql`: `create table … + mail` и миграция
> `alter table … add column if not exists mail …`; скрипт пересоздания перегенерирован), в Fore —
> `CTaskResponsible.Mail` + `RESP_FIELD_MAIL` (чтение MAIL в отдельном `Try` — база без колонки не ломает
> список); обработчик `NotifyResponsiblesOnClick` (+ `CurrentUnavailRecord`) проверяет построенный список
> затронутых задач и выбранную запись, показывает предупреждения об отсутствующих адресах. Обновлены
> `README.md`, `DEPLOY.md` (§5.1 сборки, §6.1/§6.4, §7.0, диагностика) и макет).
> Версия: 1.62 (выбор ответственного через меню: `MenuButton` («Ранее использованные ответственные ▾»)
> + `PopupMenu` — список уникальных ответственных из `RESPONSIBLE_FOR_TASK` по алфавиту
> (`UnavailabilityPlanner.LoadResponsibleNames`) и пункт «Ввести вручную…» (курсор в `RespEditBox`).
> Пункты строятся в `PopupMenu.OnPopup` (`RespMenuBuildOnPopup` + `New MenuItem.Create` →
> `Items.Add(Item)`), выбор обрабатывает `MenuItem.OnClick` (`RespMenuPickOnClick`) и сразу пишет
> значение в таблицу через общую `ApplyResponsible`; ручной ввод (`RespEditBox` + `BtnEditResp`)
> сохранён. §5.32 дополнен разделом «Меню (кнопка с выпадающим меню)» — `IMenuButton.Menu: IPopupMenu`,
> `IMenuItems.Add(Value: IMenuItem)`, `MenuItem.Text`, сигнатуры `OnClick`/`OnPopup`; обновлены `README.md`,
> `DEPLOY.md` (§7.0) и макет).
> Версия: 1.61 (по замечаниям стенда: 1) клик по `MetabaseListView2` привязан **кодом**
> (`MetabaseListView2.OnClick := MetabaseListView2OnClick` в `SetupPlannerLayout`); 2) вместо счётчика задач
> `Label1` показывает **ответственного по выбранной задаче** из таблицы `RESPONSIBLE_FOR_TASK`
> (индекс `RespIndex_` + `ShowTaskResponsible`), рядом — поле ввода `RespEditBox` и кнопка
> «Изменить ответственного» (`EditResponsibleOnClick`): новая функция
> `UnavailabilityStore.SaveTaskResponsible` делает `insert … on conflict (TASK_ID) do update`, пустое
> значение — `delete`; 3) у `PlanTextMemo` (и у `UnavailSummaryMemo`) выставлен
> **`ScrollBars := ControlScrollStyle.Vertical`** — перечисление найдено в справке
> (`None`/`Horizontal`/`Vertical`/`Both`, по умолчанию `None`), §5.32 дополнен; обновлены `README.md`,
> `DEPLOY.md` (§7.0/§7.1) и макет).
> Версия: 1.60 (по замечанию стенда: **дерево `MetabaseTreeList1` убрано** — не использовалось;
> вместо него `Memo` **`PlanTextMemo`** (`MEMO;PlanTextMemo;;26;640;756;300` в описании экрана) для
> сводки плана: `AnalyseButtonOnClick` пишет `SetMemoLines(PlanTextMemo, PlanText(Cont))` внутри `Try`
> (в `Label1` многострочный текст не помещался; `Label1` остался счётчиком задач). Из формы удалены
> поле, раскладка и `Root` дерева; `SetupTreeColumns` в форме оставлен как неиспользуемый помощник,
> `SetTreeColumn`/`SetTreeColumnsAutoSize` — в `TaskContainerLib`; макет перегенерирован (вместо дерева —
> Memo с примером `PlanText`), обновлены §5.28/§6.19, `README.md`, `DEPLOY.md` (§7.0/§7.3)).
> Версия: 1.59 (по замечаниям стенда: 1) обработчик **`OpenUnavailabilityOnClick` был ни к чему не
> привязан** — в описание экрана добавлена кнопка «Панель недоступности…» (`BtnUnavailPanel`,
> `1290;76;230;28`), поле/алиас/подписка и строка в таблице кнопок `DEPLOY.md`; 2) `UNV_DB_ID =
> "CONNECT_SNG_DB"`; 3) поле класса `CUnavailLogRow.Event` переименовано в **`Event_`** (зарезервированное
> слово; колонка таблицы по-прежнему `EVENT_NAME`); 4) у колонок **не задаём `MinWidth`** — он ломает
> авторазмер (`AutoSize`), строки закомментированы в `SetListColumn`/`SetTreeColumn`/`SetColumnsAutoSize`/
> `SetTreeColumnsAutoSize`; 5) `RESP_TABLE_ID = "RESPONSIBLE_FOR_TASK"`; 6) **списки репозитория
> (`MetabaseListView`/`MetabaseTreeList`) и `AffectedList` создаются только на форме заранее** —
> динамическое создание убрано из `CreateFormComponents`, раскладка и настройка обёрнуты в
> `If Not IsNull(...)`, обработчик клика `MetabaseListView2OnClick` привязывается на форме и кодом не
> трогается; в документации отмечено. Обновлены `README.md`, `DEPLOY.md` (§6.1/6.2, §7.0/7.1) и макет).
> Версия: 1.58 (колонки IListView/ITreeControl: в шаблонах они теперь не только создаются кодом, но и
> получают свойства — **`AutoSize`** (растяжение по ширине компонента) и **`Alignment`**
> (`TextAlignment`: `Left`/`Center`/`Right`), плюс `MinWidth` как страховка от нулевой ширины.
> Новые помощники в `TaskContainerLib.fore`: `SetListColumn`, `SetTreeColumn`,
> `SetColumnsAutoSize`, `SetTreeColumnsAutoSize` (последняя пара — для колонок, заданных в Инспекторе).
> Добавлены колонки и для остальных списков: `SetupTaskListColumns` (`MetabaseListView2`),
> `SetupAffectedListColumns` (`AffectedList`), `SetupTreeColumns` (`MetabaseTreeList1` — своя коллекция
> `ITreeListColumns`/`ITreeListColumn`); в таблице плана выравнивание считает `PlanColumnAlign`
> (текст — влево, даты/длительность — по центру), тянется «Задание - название». §5.32 дополнен
> перечислением `TextAlignment` и разделом про столбцы; в `DEPLOY.md` — сборки и шаги 7.x;
> `README.md` — раздел про табличный вид).
> Версия: 1.57 (пересоздание таблиц одной командой: новый `docs/sql/unavailability-recreate-postgres.sql`
> — `begin;` → DROP журнала/плана/периодов в правильном порядке (FK `unavailability_plan_fk` →
> `unavailability`, `on delete cascade`) → `\ir` штатных DDL (`unavailability-postgres.sql`,
> `unavailability-plan-runs-postgres.sql`, `responsible-for-task-postgres.sql`) → `commit;` + проверка;
> плюс **самодостаточный** `unavailability-recreate-all-postgres.sql` (DROP + полный CREATE без
> psql-команд — для pgAdmin/DBeaver/.NET), который собирается новым `tools/make-db-recreate.js`
> (`--check` добавлен в `tools/check-all.js`, поэтому файл не разъедется с DDL). В `DEPLOY.md` —
> команда запуска и предупреждения, `truncate … restart identity cascade` как безопасная альтернатива,
> в диагностике — строки про пересоздание; обновлены `REFERENCE.md` (файл-таблица) и `README.md`).
> Версия: 1.56 (исправлен симптом «кликнул по задаче — форма закрылась»: обработчики событий
> больше не выпускают исключений — у модальной формы это прерывало модальный цикл. `MetabaseListView2OnClick`
> заполняет карточку «по шагам» (`Stage`) в одном `Try`, `Sender As MetabaseListView` тоже в `Try`
> (запасной путь — поле формы) и сбой показывается в метке + журнале; задача открывается через новый
> `BindScheduledTask` (`TaskContainerLib.fore`); `GetTaskPeriodText` переписан **без приведений к
> подтипам периода** (только `IScheduledTaskPeriod.Type`/`Next`, «ближайший запуск» = `Period.Next(Now)`);
> `GetLastSucceededText` / `GetAverageDurationText` / `GetAverageDurationSeconds` (TaskPlanner и
> UnavailabilityPlanner) читают `Task.GetResults` в `Try`; `TaskPlanner.ApplyPlan` применяет план
> «по задаче в своём Try» и считает ошибки; в `TaskPlanner.NewTaskInfo` — защита от неоткрывшейся задачи;
> §5.30.1 (п. 6), §8, `README.md` и диагностика `DEPLOY.md` дополнены этим правилом).
> Версия: 1.55 (закрыты два открытых вопроса по API: **`ListViewStyle`** — перечисление для
> `IListView.Style` (`Icon`/`SmallIcon`/`List`/`Report`), **`DateTimePickerKind`** — для
> `DateTimePicker.Kind` (`Date`/`Time`); добавлен §5.32 «Перечисления компонентов (сборка Forms)»
> (+ `ControlSortType`, `ListViewIconArrangement`); коллекция `IListView.Columns` = `IListViewColumns`
> (`Add: IListViewColumn`, `Clear`, `Delete`, `Count`, `Item`). В шаблонах вместо Инспектора теперь кодом:
> `Style := ListViewStyle.Report` (список задач, `SetupPanelList`, `SetupRecList`),
> `Kind := DateTimePickerKind.Date/Time` (оба `ConfigurePeriodPickers`), новые подпрограммы создания
> колонок `SetupPlanTableColumns` / `SetupRecordsListColumns` / `SetupRecListColumns` — только если
> `Columns.Count = 0`; в `UnavailabilityPlanner.fore` добавлена `UnavailPlanColumnWidth`; фабрика
> ставит `Dp.Kind := DateTimePickerKind.Date` для `PICKER`; обновлены §5.28, §11.3, `README.md`,
> `DEPLOY.md`; топики справки добавлены в `tools/forsite-online-urls.txt`).
> Версия: 1.54 (по замечаниям стенда: **одна форма = один класс** — `SchedulerForm.fore` и
> `UnavailabilityForm.fore` объединяются в один файл `SchedulerForm.fore` (единый `Class SchedulerForm`,
> одно событие `FormOnCreate`, одно описание `ScreenSpecText` на 43 динамических контрола и один
> `CreateFormComponents`; масштаб общий — `LayoutK`; файл `UnavailabilityForm.fore` удалён);
> **сравнение с `Null` заменено на `IsNull(...)`** по всему проекту (155 мест в 10 файлах:
> `X = Null` → `IsNull(X)`, `X <> Null` → `Not IsNull(X)`, включая `Ok := Not IsNull(Cur);`);
> в склейке строк добавлен **`+` в начале каждой строки продолжения** (тихая потеря текста в
> `ScreenSpecText` трёх форм и в `UiFactoryDemo`); в линтер добавлены проверки 7) «сравнение с `Null`»
> и 8) «строка продолжения без `+`» — §5.30.1 (пп. 4–5), §8; обновлены `README.md` и `DEPLOY.md`).
> Версия: 1.53 (учтено правило координат: у компонента внутри контейнера `Left`/`Top` считаются от
> клиентской области родителя — в описание добавлены относительные координаты для детей (`UiFactoryDemo`),
> в фабрику добавлен режим абсолютных координат `UI_SPEC_ABS_COORDS` + параметр `AbsToRel`
> (`UiPlaceScaled` вычитает положение контейнера); пояснение — в §5.28).
> Версия: 1.52 (рабочие формы переведены на **«spec + фабрика»**: в `SchedulerForm.fore`,
> `UnavailabilityForm.fore` и `UnavailabilityRecordsForm.fore` динамическая часть (11/32/6 контролов:
> кнопки, поля, метки, Memo) больше не создаётся и не размещается вручную — она описана текстом
> `ScreenSpecText` и создаётся `UiCreateScaled`; поля формы стали «алиасами» (`X := UiFind(Map_, "X")`),
> подписка кнопок на обработчики — циклом строк; из раскладок убраны `Place(...)` для динамических
> контролов. Таблицы/пикеры/диалоги пока создаются конструктором (`If X = Null`) — колонки `ListView`
> и перечисление `DateTimePicker.Kind` в справке не документированы, их подтверждение откроет полный
> переход. В фабрику добавлено масштабирование (`UiPlaceScaled`, `UiCreateOneScaled`, `UiCreateScaled`).
> Версия: 1.51 (по итогам отладки на стенде: **`Object` «обрезает» данные — карта компонентов и аксессоры
> фабрики переведены на `Variant`** с неявным преобразованием к интерфейсам под `Try`; в `UiFactory.fore`
> убраны `Is`/`As` по `Variant`; **строковые литералы только в `"..."`** (в `UiFactoryDemo.fore` все
> апострофы заменены; линтер получил проверку «апостроф вне литерала»); в шаблоны форм добавлен
> `CreateFormComponents` — создание объявленных контролов конструктором (`X := New X.Create`,
> `X.Parent := Self`) с проверкой `= Null` для совместимости с дизайнером (`SchedulerForm.fore`,
> `UnavailabilityForm.fore`, `UnavailabilityRecordsForm.fore`); новый §5.30.1 «Подводные камни языка»).
> Версия: 1.50 (исправлено по факту стенда: **привод `SelectedItem As IMetabaseListViewItem` не работает** —
> описания объектов берём документированными `IMetabaseListView.SelectedObjects` / `CheckedObjects`
> (и Id — по индексу строки через `Items(SelectedItem.Index).ColumnText(n)`); в `TaskContainerLib.fore`
> добавлены обёртки `SelectedObjectDescriptor`, `SelectedObjectId`, `CheckedObjectDescriptors`,
> `CheckedObjectIds`, `SetAllRowsChecked`, `CheckRowsByIds`; `SchedulerForm.fore` и
> `UnavailabilityForm.fore` переведены на них, поправлены §5.18/§5.27/§6.19, README и диагностика).
> Версия: 1.49 (фабрика экранов: `Fore/UiFactory.fore` — создание компонентов кодом по описанию
> (`UiSpecsFromText`/`UiSpec*`, `UiCreate`, `UiFind`, `UiFree`, доступ по имени), вложенность через
> `Parent=Имя`, перечень создаваемых классов; демо-экран `Fore/UiFactoryDemo.fore` (22 компонента,
> один общий обработчик кнопок, таймер+прогресс, пересборка экрана); проверка spec
> `tools/fore-ui-spec-check.js` (включена в `check-all.js`); §5.28 дополнен разделом о фабрике;
> фильтр таблицы переведён на регистронезависимый поиск (`String.ToLower` — документирован, §5.30),
> поправлены §6.26/README/диагностика).
> Версия: 1.48 (по итогам разбора: **динамическое создание компонентов кодом** подтверждено справкой
> и внесено в §5.28/§11.1 — `New <Класс>.Create` + `Parent := Self`/контейнер, подписка на события
> кодом (`OnClick := Handler`), освобождение `Dispose`/`FreeComponent`, перечень создаваемых классов;
> SMTP-блок `UnavailNotify.fore` приведён к рабочему примеру проекта (`CurlMailAddress`,
> `CurlNetworkCredential`, порт 587/SSL по умолчанию, логин/пароль через `NOTIFY_SMTP_*`).
> Версия: 1.47 (третья волна: `UnavailNotify.fore` — письма ответственным (`NoticesFromImpacts`,
> `SaveNoticesToFolder`, `SendNoticesSmtp` через `INetSmtpClient`, сборка `Net`); HTML-выгрузка плана
> (`UnavailPlanHtmlText`); фильтр таблицы (`FilterEditBox`, `UnavailImpactMatchesFilter`); «Отметить
> все/Снять все» (`SetAllAffectedChecked`); разбор импорта (`ApplyStoredPlanReport`); монитор системы
> (`UnavailMonitorText`); инструменты `tools/check-all.js`, `tools/fore-spec.js`, `.editorconfig`,
> `.gitattributes`; новый §6.26, §11.1 дополнен `IForeSerializer`/`IForeSerializerLoader` (перенос
> форм/модулей/сборок файлами) и `INetSmtpClient`; `docs/DEPLOY.md` §6.4/§7.5, чек-лист и диагностика
> обновлены).
> Версия: 1.46 (устойчивость диспетчера: `RUN_STATE`/`ATTEMPTS`/`ERROR_TEXT` и атомарный захват
> `ClaimPlanRun`, `FinishPlanRun`, `ResetStuckPlanRuns`; сравнение времени вынесено в СУБД
> (`LoadDueRunRows` → `current_timestamp`); сухой прогон (`RUN_DRY_RUN`,
> `RunDuePlannedRunsDryRunMain`, `UnavailRunTickReport`); журнал `UNAVAILABILITY_LOG`;
> отмена плана `DeleteStoredPlan` и признак «план устарел» `IsPlanStale`; срез плана одной транзакцией
> (`ExecUnavailSqlMany`); дедупликация со штатным расписанием (`NextRegularRun`, `DEDUP_GAP_MINUTES`);
> окна недоступности в базовом планировщике (`BuildPlanAvoiding`/`PlanAndApplyAvoiding`); индекс
> ответственных (`LoadResponsibleIndex`/`FindTaskResponsibleInIndex`); средняя длительность — только по
> успешным прогонам; новый §6.25, миграция `docs/sql/unavailability-plan-runs-postgres.sql`,
> обновлены `docs/DEPLOY.md` (§7.4, чек-лист, диагностика), `Fore/README.md` и линтер (Try без Except,
> BOM/CRLF, дубли имён, «висячий» `CreateForm`, код возврата 1).
> Версия: 1.45 (DDL таблицы ответственных `responsible_for_task` —
> `docs/sql/responsible-for-task-postgres.sql` и новый §6.24: колонки `task_id` (Id задачи, уникальный),
> `ba_name`, `responsible`; стыковка с `RESP_TABLE_ID`/`RESP_FIELD_*` и `IDatasetInstance`;
> `docs/DEPLOY.md` шаг 2/шаг 3 и `Fore/README.md` дополнены ссылкой на скрипт).
> Версия: 1.44 (табличный вид списков и раскладка кодом: `IListView.Style` = «таблица/отчёт» (`Report`)
> обязателен для колоночного представления, добавлены `GridLines := True`, `RowSelect`,
> `ShowColumnHeaders`, `ReadOnly`; расстановка контролов по макету в событии формы `OnCreate`
> (`IControl.Left/Top/Width/Height`, координаты макета × `LayoutK`/`PanelLayoutK`/`RecLayoutK`,
> подпрограммы `SetupPlannerLayout`/`SetupPanelLayout`/`SetupRecordsLayout`); §5.27, §5.28, §11.1,
> `docs/DEPLOY.md` §7.3, чек-лист §9, диагностика §10 и `Fore/README.md` обновлены).
> Версия: 1.43 (правило именования классов форм: имя класса = имя формы-объекта, одна форма — один
> класс; в шаблонах классы приведены к единым именам — `Class SchedulerForm` в `SchedulerForm.fore`
> и `UnavailabilityForm.fore`, `Class UnavailabilityRecordsForm` в одноимённом файле (совпадает с
> `CreateForm`); §5.28 и `docs/DEPLOY.md` §7 дополнены пояснением).
> Версия: 1.42 (период недоступности в UI набирается **двумя пикерами на границу**: `Kind` у
> `DateTimePicker` показывает либо дату, либо время — поэтому `UnavailStartDatePicker`+`UnavailStartTimePicker`,
> `UnavailEndDatePicker`+`UnavailEndTimePicker`, `NewDatePicker`+`NewTimePicker`, в окне ведения —
> `RecStart*`/`RecEnd*`; значения собираются `ComposeDateAndTime`. Правки в формах, макетах (§7) и §5.24).
> Версия: 1.41 (макеты форм в PNG — `tools/make-mockups.py` → `docs/mockups/form-planner.png`
> и `form-records.png`; каждый контрол подписан именем из кода, под кнопками — обработчики;
> ссылки добавлены в `docs/DEPLOY.md` §7 и §2 справочника).
> Версия: 1.40 (в `docs/DEPLOY.md` шаг 3 переписан как пошаговый список объектов для **нового стенда**
> (12 позиций, порядок создания), добавлен §7.0 «Форма „Планировщик“» с контролами и обработчиками
> базового планировщика).
> Версия: 1.39 (инструкция по развёртыванию на стенде — `docs/DEPLOY.md`: состав переноса, DDL, объекты
> репозитория, ссылки на сборки, все заполняемые константы, контролы/обработчики обоих окон,
> задача-диспетчер, чек-лист приёмки из 14 шагов, таблица диагностики, откат; §2 дополнен).
> Версия: 1.38 (DDL для PostgreSQL 17 — `docs/sql/unavailability-postgres.sql` (таблицы
> `UNAVAILABILITY`/`UNAVAILABILITY_PLAN`, индексы, `comment on`, примеры) и новый §6.23 в справочнике;
> в §2 добавлена папка `docs/sql/`).
> Версия: 1.37 (период недоступности — «дата и время» на каждой границе: колонки `START_DT`/`END_DT`
> в схеме по умолчанию, переключатель `UNV_PERIOD_SINGLE_COLUMN` сохраняет вариант из четырёх
> раздельных колонок; SQL-фрагменты периода вынесены в `UnvPeriod*Sql`; список в окне ведения
> и пикеры настроены на «дату и время» — `Format := 'dd.MM.yyyy HH:mm'`, `Kind` — в Инспекторе).
> Версия: 1.36 (журнал диспетчера можно вести в БД: колонка `DONE_AT` + `LoadPendingRunRows`/
> `MarkPlanRunDone`, переключатель `RUN_DONE_IN_TABLE`; просмотр сохранённого плана в UI
> (`LoadStoredPlanRows`, `StoredPlanTable`, `ShowStoredPlanOnClick`); `CheckUnavailStorage` и кнопка
> диагностики в окне ведения; идемпотентная настройка диспетчера — `EnsureUnavailabilityDispatcher`).
> Версия: 1.35 (мелкие доработки хранилища и диспетчера: в таблицу плана добавлен `AUTHOR`
> (кто сохранил план), добавлена `HasStoredPlan` и колонка «есть план» в списке периодов; диспетчер
> не перезапускает задачу, находящуюся в состоянии «выполняется» (`ScheduledTaskState` = 2)).
> Версия: 1.34 (диспетчер умеет читать план **из таблицы** `UNAVAILABILITY_PLAN`: `RUN_PLAN_FROM_TABLE`,
> активное окно `EndDt + RUN_PLAN_TAIL_HOURS`, новые функции `RunDuePlannedRunsFromTable` и
> `RunDuePlannedRunsBySource`; файловый режим сохранён, `RunDuePlannedRunsMain` переведён на выбор источника).
> Версия: 1.33 (ведение недоступностей и хранение плана в таблицах — новые модули
> `Fore/UnavailabilityStore.fore` (DAL: записи `UNAVAILABILITY` + срезы плана `UNAVAILABILITY_PLAN`,
> `MB.GenerateKey`/`GetCurrentStamp`/`LogonSession.UserDescription`) и `Fore/UnavailabilityRecordsForm.fore`
> (окно «Ведение недоступности системы»); в `UnavailabilityForm.fore` добавлены выбор периода из таблицы
> (пикеры становятся `Enabled := False`), сохранение/загрузка плана в таблицу и выгрузка в файл; новый
> §6.22, §5.5 дополнен транзакционной записью).
> Версия: 1.32 (секундная арифметика переведена на целые: `Double.RoundInt`, деление через
> `(Cnt As Double)`, `UnavailDurationText(Seconds: Integer)`, `DateTime.AddSeconds(..., Integer)`;
> правки в `UnavailabilityPlanner.fore`, `TaskPlanner.fore`, `TaskContainerLib.fore`; в §5.30 добавлен
> класс `Double`, в §8 — правило про `Double`/`Integer`).
> Версия: 1.31 (`BA_NAME` — подъём по `Descriptor.Parent` до объекта класса «Бизнес-приложение»
> (`ClassId` = 10496); `RESPONSIBLE_USER` — из таблицы `RESPONSIBLE_FOR_TASK` через `IDatasetInstance`
> (новый §5.31 «Чтение таблицы репозитория»); `TIME_SPAN` — `ЧЧ:ММ:СС` (`Строковый(8)`); новые функции
> `LoadResponsibleTable`/`FindTaskResponsible`, класс `CTaskResponsible`; константы `BA_CLASS_ID`,
> `RESP_TABLE_ID`, `RESP_FIELD_*`).
> Версия: 1.30 (схема таблицы плана приведена к 8 полям заказчика: `TASK_ID`, `TASK_NAME`, `BA_NAME`,
> `RESPONSIBLE_USER` (`UserTag`), `START_TIME_ORIGINAL`, `END_TIME_ORIGINAL`, `TIME_SPAN` (`ЧЧ:ММ:СС`),
> `START_TIME_NEW`; добавлены `UnavailPlanColumnId`/`UnavailPlanColumnType`/`UnavailDurationText`/
> `GetTaskBusinessAppName`/`UnavailPlanCsvText` и обработчик `ExportTableCsvOnClick`; в §5.18 добавлен
> `MetabaseObjectMetaclass.DBA_CLASS` = 10496).
> Версия: 1.29 (материализация плана недоступности — новый модуль `Fore/UnavailabilityRunner.fore`
> и раздел **§6.21**: способ **«диспетчер»** — служебная задача `Timely` + `IScheduledTask.ExecuteImmediate`
> по файлу плана с журналом выполненных (универсально для любого класса задачи, запущенный планировщик
> не нужен). §5.10 дополнен `ExecuteImmediate`, `CreateInvokeEvent`/`IScheduledInvoke`,
> `OneTimeOnly.StartMode` и типом `Timely.TimeInterval` (`DateTime`); §12 — вопрос материализации закрыт.
> Альтернативный вариант с разовыми задачами-клонами (`OneTimeOnly`) отклонён: требует знать исполнитель
> задачи и оставляет записи в контейнере — оставлен только «диспетчер»).
> Версия: 1.28 (материализация плана недоступности — черновой вариант реализации в
> `Fore/UnavailabilityRunner.fore`; в 1.29 приведён к способу «диспетчер»).
> Версия: 1.27 (план недоступности показывается **таблицей**: добавлены `UnavailPlanColumnCaption`,
> `UnavailPlanCell`, `UnavailDecisionText`, `UnavailPlanHeaderText` и константы `UNAVAIL_COL_*`;
> на форме — `PlanTable: ListView` (`FillPlanTable`), в `Memo` осталась краткая сводка; §5.27 дополнен
> замечанием о колоночном представлении).
> Версия: 1.26 (сводка доп. окна выводится в `Memo` вместо `Label` — у метки нет прокрутки;
> добавлен `SetMemoLines` (`Lines.Clear`/`Add`), §5.27 дополнен замечанием о `Label` vs `Memo`,
> обновлён `Fore/README.md`).
> Версия: 1.25 (исправлена ошибка «Типы `MetabaseObjectMetaclass` и `MetabaseObjectClass` не совместимы»:
> фильтр диалога переведён на `IMetabaseDialogClassFilter.ObjectClass`; в §5.18 добавлены значения
> `MetabaseObjectMetaclass` и предупреждение; правки в `Fore/SchedulerForm.fore` и §6.13).
> Версия: 1.24 (исправлена ошибка компиляции «Неизвестный идентификатор `ObjectDescriptor`»:
> `SelectedItem` у `IListView` имеет тип `IListViewItem` → нужен явный привод
> `As IMetabaseListViewItem`; поправлены `Fore/SchedulerForm.fore` и `Fore/UnavailabilityForm.fore`;
> §5.18/§5.27 дополнены предупреждением).
> ⚠ **Отменено в 1.50:** привод `As IMetabaseListViewItem` на стенде не сработал — используйте
> `SelectedObjects`/`CheckedObjects`/`FindByDescriptor` (см. §5.18 и версию 1.50).
> Версия: 1.23 (`Fore/UnavailabilityForm.fore` доработан: авто-отметка затронутых задач флажками
> (`IListViewItems`/`IMetabaseListViewItem.Checked`), пакетные действия по отмеченным, экспорт/импорт
> плана через `FileSaveDialog`/`FileOpenDialog` и `File.OpenTextWriter`/`OpenTextReader`; §6.18 обновлён).
> Версия: 1.22 (добавлены `ForeSys` (`Object`/`Variant`/`Int64`), `ModCollections`
> (`IEnumerable`/`ICollection`/`IList`/`IDictionary`/`IBitArray`), `IDataGridColumn`, `IPivotTable`,
> `IPrxSheet`; всего **5219 онлайн-тем**, `INDEX.md` — 10357 тем, `TOPICS.md` — 2257 типов).
> Версия: 1.21 (добавлены каталоги **KeABAC** (`IABACAttribute`/`IABACPolicy`) и веб-клиент
> **dhtmlReport** (`PP.Prx`), плюс классы `ForeSys` (DateTime/Double/Integer/…/ICultureInfo) и
> потоки `ModIo`; всего **5208 онлайн-тем** по 28 каталогам, `INDEX.md` — 10346 тем,
> `TOPICS.md` — 2246 типов).
> Версия: 1.20 (`docs/forsite/online/` — добавлены онлайн-версии языка **Fore** (136 тем) и
> **KnowledgeBase** (40 тем); всего **5190 онлайн-тем** по 26 каталогам, `INDEX.md` — 10328 тем;
> исправлена очистка в загрузчике (точное совпадение имени каталога, чтобы `Fore` не затирал `ForeSys`)).
> Версия: 1.19 (`docs/forsite/online/` — загружены **полные разделы 10.8** для KeSom (1858),
> kereport (1405), TabSheet (1184), KeFore (455) вместе с наборами `Interface` + 20 прочих каталогов:
> **5014 онлайн-тем**; `INDEX.md` — 10152 темы, `TOPICS.md` — 2229 типов; крупные каталоги — частями
> `Online-<Каталог>__<NN>.md`).
> Версия: 1.18 (`docs/forsite/online/` расширен: сгенерированы URL из путей локальных дампов и
> загружены полные разделы 10.8 для **KeFore** (455), **kereport** (364), **TabSheet** (306),
> **KeSom** (132) + 20 прочих каталогов; всего 1369 онлайн-тем, `INDEX.md` — 6507 тем,
> `TOPICS.md` — 1742 типа; скрипт `tools/gen-online-urls.ps1`).
> Версия: 1.17 (`docs/forsite/online/` расширен до **24 каталогов** онлайн-справки 10.8 (СУБД, DAL,
> кубы, пивот, Express, НСИ, измерения, ETL, Python, коллекции, почта, метабейз, задачи…): 149 тем;
> общий `INDEX.md` — 5287 тем, `TOPICS.md` — 1208 типов).
> Версия: 1.16 (`docs/forsite/online/` — добавлены темы **онлайн-справки 10.8** (Forms, System, IO,
> ExtCtrls, UiLib, KeFore, KeReport): +82 темы; общий `INDEX.md` — 5220 тем, `TOPICS.md` — 1141 тип;
> скрипты `tools/fetch-forsite-online.ps1`, `tools/build-forsite-index.ps1`).
> Версия: 1.15 (в `docs/forsite/` добавлены оглавления `Contents:` в каждом файле и указатель типов
> `TOPICS.md`; индекс с номерами строк).
> Версия: 1.14 (извлечены все CHM из `OldDocumentsForsite` в `docs/forsite/` — 5138 тем, `INDEX.md`
> с номерами строк; добавлен `docs/forsite/README.md` и генератор `tools/extract-forsite.ps1`).
> Версия: 1.13 (добавлен **`FORELANG.md`** — руководство по языку Fore из `OldDocumentsForsite/Fore`;
> ссылки в §2 и §4).
> Версия: 1.12 (добавлен **§5.30 «Стандартная библиотека: System и IO»** — подтверждены `String`,
> `Array`, `TimeSpan`, `Guid`, `Debug`, `Exception`, `Path`, `File`, `Directory`, потоки
> `MemoryStream`/`FileStream`, `BinaryReader`/`BinaryWriter`, `TextReader`/`TextWriter`).
> Версия: 1.11 (закрыты неподтверждённые GUI-пункты: картинка — **`IImageBox`**, файловые диалоги —
> **`IFileDialog`/`IFileOpenDialog`/`IFileSaveDialog`**, привязка данных — **§5.29** (`IDataGrid` →
> `IUiDataSource` → `IUiDataSet` и его реализации); добавлен состав `IWinApplication`).
> Версия: 1.10 (добавлены `IDataGrid` — таблица данных со свойством `DataSource`, `ITrackBar`,
> `IMonthCalendar`, `IListViewColumn`; уточнена привязка данных).
> Версия: 1.9 (добавлены **§5.27** «списки/деревья/панели/диалоги», **§5.28** «создание и показ формы»
> и рецепт **§6.20**; подтверждены `IListView`/`IListViewItems`/`IListViewItem`, `ITreeList`,
> `IToolbar`, `IStatusBar`, `ITimer`, `ISplitter`, `IMemo`, `IImageList`, `IPopupMenu`,
> `IFontDialog`/`IColorDialog`, `Form.CreateForm`).
> Версия: 1.8 (добавлен GUI-раздел **§5.23–§5.26** и рецепт **§6.19**; по справке подтверждены
> класс `Form` (`CreateForm`), базовые `IComponent`/`IControl`, контролы
> `Button`/`Label`/`ICustomEdit`/`EditBox`/`CheckBox`/`RadioButton`/`ComboBox`/`ListBox`/`Panel`/
> `GroupBox`/`PageControl`/`DateTimePicker`, меню `IMainMenu`/`IMenuItem`, `IProgressBar`,
> `IScrollBox`, коллекция строк `IStringList`).
> Версия: 1.7 (добавлен **§6.18 «Планирование недоступности системы»**; новые модули
> `Fore/UnavailabilityPlanner.fore`, `Fore/UnavailabilityForm.fore`; подтверждено: у задачи один
> `Period`, `Period.Next` — на базовом периоде, `IDateTimePicker.CurrentDate`).
> Версия: 1.6 (добавлены **§5.22 «Управление задачей планировщика: сводная карта»**, рецепты
> **§6.16 «Диагностика расписания: распределение стартов по часам»** и **§6.17 «Сценарий „под ключ“»**,
> а также **§14 «Глоссарий»**; расширены §12 и §13).
> Версия: 1.5 (добавлен **§5.17 «MetabaseObjectClass — полезные константы»** с кодами объектов;
> подтверждено `KE_CLASS_DOCUMENT` = 3329, `KE_CLASS_PROCEDURALREPORT` = 2562; `KE_CLASS_STORAGE`
> отсутствует).
> Версия 1.4 (найдены страницы **перечислений** `.../<Каталог>/enums/<Имя>.htm`: подтверждены классы
> задач `KE_CLASS_TASK_*` (в т.ч. `KE_CLASS_TASK_CALCULATEREPORT` = 5380) и перечисления
> `ScheduledTaskState` / `ScheduledTaskPeriodType` / `MetabaseSpecialObject`; вопрос Q22 закрыт).
> Ранее 1.3: §5.16 «Контейнер задач…», рецепты 6.11–6.12. Ранее 1.2: §5.10–§5.15, рецепты 6.9–6.10.
> Ранее 1.1: уточнены метабейз, отчёты, планировщик, DAL, таблицы, почта; исправлены `Active`/`Next`/`FileName`.
