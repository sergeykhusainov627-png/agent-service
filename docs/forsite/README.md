# docs/forsite — выжимка справок Форсайт (контекст для разработки на Fore)

Здесь — **читаемый текст** всех распакованных CHM-справок из `OldDocumentsForsite/`
(HTML → Markdown, windows-1251 → UTF-8). Предназначено для быстрого поиска и точечного чтения
контекста при разработке на Fore.

## Как пользоваться

1. **Найти тип** (есть ли интерфейс/класс/перечисление) — по `TOPICS.md`: только имена типов,
   с именем файла и номером строки.
2. **Найти тему/член** — по `INDEX.md` (10357 тем). Формат строки:
   ```
   <файл>                                                  <строка>  <Заголовок темы>
   ```
   Пример: `KeFore__Interface.md   9807  IScheduledTaskProperties.Active`
3. **Читать** — каждый `.md` начинается блоком `Contents:` (оглавление с номерами строк), далее темы
   идут заголовками `## <Имя>`; читать нужный диапазон. Большие файлы (напр. `KeSom__Interface.md`)
   читаются точечно.
4. **Быстрый «grep»** — искать имя интерфейса/члена прямо по `.md`-файлам.

## Файлы

| Файл | Тем | ~Размер | Что внутри |
|------|----:|--------:|------------|
| `INDEX.md` | 10357 | 868 KB | Указатель: файл → строка → заголовок темы |
| `TOPICS.md` | 2257 | 167 KB | Указатель **типов** (интерфейсы/классы/перечисления/делегаты): файл:строка |
| `Fore-Language__01_Dictionary.md` | 1 | 1.8 KB | Комментарии |
| `Fore-Language__02_GeneralInfo.md` | 3 | 14 KB | Классы и объекты, переменные, константы |
| `Fore-Language__03_dataTypes.md` | 1 | 33 KB | Типы данных |
| `Fore-Language__05_Classes.md` | 1 | 4 KB | Конструкторы / `New` |
| `Fore-Language__06_SyntRules.md` | 10 | 60 KB | Свойства, интерфейсы, делегаты, перечисления, пространства имён, параметры, процедуры/функции, видимость, массивы, Comimport |
| `Fore-Language__07_Operations.md` | 5 | 7 KB | Арифметические/логические/унарные операции, отношения, `Is`/`As` |
| `Fore-Language__08_Operators.md` | 6 | 27 KB | `If`, `Select Case`, `For`/`For Each`/`Repeat`/`While`, `With`, `Break`/`Continue`/`Return`, `Dispose`, `Pyimport` |
| `Fore-Language__10_Processing_Exceptions.md` | 2 | 12 KB | Исключения (системные классы, обработка) |
| `Fore-Language__11_Compiler_Errors.md` | 107 | 153 KB | Сообщения компилятора (коды 1005…1152) |
| `KeFore__Interface.md` | 416 | 557 KB | Интерфейсы сборки **Fore** (задачи планировщика, документы, ETL, потоки и др.) |
| `KeFore__Class.md` | 15 | 25 KB | Классы сборки Fore |
| `KeFore__Enums.md` | 27 | 29 KB | Перечисления сборки Fore |
| `KeFore__Samples.md` | 6 | 8 KB | Примеры |
| `KeReport__Interface.md` | 1050 | 1.4 MB | Интерфейсы регламентных отчётов (`IPrxReport*`, события, экспорт) |
| `KeReport__Class.md` | 198 | 316 KB | Классы отчётов |
| `KeReport__Delegate.md` | 93 | 78 KB | Делегаты (события отчётов) |
| `KeReport__Enums.md` | 32 | 44 KB | Перечисления отчётов |
| `KeReport__Intro.md` | 37 | 69 KB | Введение (архитектура отчётов) |
| `KeReport__Samples.md` | 3 | 8 KB | Примеры |
| `KeSom__Interface.md` | 1775 | 2.5 MB | Интерфейсы репозитория/метабейза (объекты, классы объектов, права, базы данных…) |
| `KeSom__Class.md` | 27 | 58 KB | Классы метабейза |
| `KeSom__Enums.md` | 93 | 160 KB | Перечисления (`MetabaseObjectClass` и др.) |
| `KeSom__Examples.md` | 4 | 31 KB | Примеры |
| `TabSheet__Interface.md` | 883 | 1.1 MB | Интерфейсы таблиц (`ITabSheet`, `ITabRange`, форматирование) |
| `TabSheet__Class.md` | 156 | 291 KB | Классы таблиц |
| `TabSheet__Enums.md` | 81 | 94 KB | Перечисления таблиц |
| `TabSheet__Delegate.md` | 37 | 27 KB | Делегаты |
| `TabSheet__Intro.md` | 27 | 47 KB | Введение (таблицы) |
| `TabSheet__Static.md` | 1 | 41 KB | Статические члены |
| `KnowledgeBase__01_Fore.md` | 41 | 255 KB | База знаний по Fore |

## Соответствие CHM → файлы

| CHM | Каталог-источник | Файлы |
|-----|------------------|-------|
| Fore | `OldDocumentsForsite/Fore` | `Fore-Language__*.md` |
| KeFore | `OldDocumentsForsite/KeFore — копия` | `KeFore__*.md` |
| KeReport | `OldDocumentsForsite/KeReport` | `KeReport__*.md` |
| KeSom | `OldDocumentsForsite/KeSom` | `KeSom__*.md` |
| TabSheet | `OldDocumentsForsite/TabSheet` | `TabSheet__*.md` |
| KnowledgeBase | `OldDocumentsForsite/KnowledgeBase` | `KnowledgeBase__*.md` |
| Report | `OldDocumentsForsite/Report` | (только ресурсы, тем нет) |

> Каталоги `Fore — копия`, `KeFore — копия` и т.п. — дубликаты CHM; в выжимку не включались.

## Онлайн-справка (10.8 LTS) — `online/`

Загружены темы из **онлайн-справки** `help.fsight.ru/10.8` — по **28 каталогам**, **5219 тем**
(неудачи — в логах `online/_log-*.txt`). Полные разделы KeFore / kereport / KeSom / TabSheet
(включая наборы `Interface`), а также язык **Fore** и **KnowledgeBase**. Крупные каталоги сохранены
частями: `Online-<Каталог>__<NN>.md`.

| Файл | Тем | Что внутри |
|------|----:|------------|
| `online/Online-ModForms.md` | 41 | Контролы форм: `IControl`, кнопки/поля/списки, `IListView`, `ITreeList`, `IToolbar`, `IStatusBar`, `ITimer`, `ISplitter`, диалоги (`IFileDialog`/`IFontDialog`/`IColorDialog`), `DateTimePicker`, `IMainMenu`/`IPopupMenu`, `IImageBox`, класс `Form` |
| `online/Online-KeExtCtrls.md` | 18 | `MetabaseListView`/`MetabaseTreeList`, `IDataGrid` (+`IDataGridColumn`), `IUiDataSource`/`IUiDataSet`, диалоги выбора объекта |
| `online/Online-KeSom__*.md` | 1858 | метабейз (10.8): интерфейсы/классы/перечисления/примеры (`IMetabase*`, дескрипторы, права, БД) |
| `online/Online-KeFore__*.md` | 455 | 10.8: задачи планировщика (`IScheduledTask*`), `IDocument`/`IDocumentBase`, модули, классы (`AppServerClass`, `ForeThread`, `ForeSerializer`…) |
| `online/Online-ModIo.md` | 16 | IO: `Path`, `File`, `Directory`, потоки (`IIOStream`/`IMemoryStream`/`IFileStream`), `Binary`/`TextReader`/`Writer` |
| `online/Online-ModCollections.md` | 12 | `IEnumerable`, `ICollection`, `IList`, `IDictionary`, `IArrayList`, `ISortedList`, `IHashtable`, `IBitArray`, `IQueue`, `IStack`, `IStringList`, `IStringMap` |
| `online/Online-ForeSys.md` | 17 | System: `Object`, `String`, `Array`, `DateTime`, `Double`, `Integer`, `Int64`, `Boolean`, `Char`, `Currency`, `Decimal`, `Variant`, `TimeSpan`, `Guid`, `Debug`, `Exception`, `ICultureInfo` |
| `online/Online-kereport__*.md` | 1405 | 10.8: отчёты — интерфейсы/классы/делегаты/интро (`IPrxReport*`, события, экспорт) |
| `online/Online-TabSheet__*.md` | 1184 | 10.8: таблицы — интерфейсы/классы/делегаты/интро (`ITabSheet`, `ITabRange`, …) |
| `online/Online-kedims.md` | 4 | измерения: `IDimSelection`, `IDimSelectionSet`, `IDimElements`, `IDimInstance` |
| `online/Online-KePython.md` | 4 | Python: `IPythonUtils`, `IPythonList`, `IPythonModule`, `IPythonObject` |
| `online/Online-KeCubes.md` | 3 | кубы: `ICubeInstance`, `ICubeInstanceDestination`, `ICubeModel` |
| `online/Online-KeRds.md` | 3 | НСИ: `IRdsDictionaryInstance`, `IRdsDictionaryElements`, `IRdsAttributes` |
| `online/Online-KeDt.md` | 3 | ETL-приёмники: `IDtConsumer`, `IDtExcelConsumerEx`, `IDtTextConsumer` |
| `online/Online-ModNet.md` | 3 | почта: `INetMailMessage`, `INetMailAddress`, `INetSmtpClient` |
| `online/Online-Dal.md` | 2 | DAL: `IDalCommand`, `IDalCursor` |
| `online/Online-KeDb.md` | 2 | БД: `IDatabaseInstance`, `IDatasetInstance` |
| `online/Online-UiLib.md` | 2 | `IWinApplication`, `IUiCommandTarget` |
| `online/Online-KeEtl.md` | 1 | `IExecuteEtlScheduledTask` |
| `online/Online-KeMs.md` | 1 | `ICalculateModelScheduledTask` |
| `online/Online-KeBISearch.md` | 1 | `ISearchEngineImportScheduledTask` |
| `online/Online-KePivot.md` | 2 | `IPivot`, `IPivotTable` |
| `online/Online-KeExpress.md` | 1 | `IEaxDataArea` |
| `online/Online-ModDrawing.md` | 1 | `IExporter` |
| `online/Online-KeABAC.md` | 2 | ABAC: `IABACAttribute`, `IABACPolicy` |
| `online/Online-dhtmlReport.md` | 1 | веб-клиент: пространство `PP.Prx` (отчёты в веб) |
| `online/Online-Fore.md` | 136 | язык Fore (10.8): типы данных, синтаксис, операции/операторы, исключения, ошибки компилятора |
| `online/Online-KnowledgeBase.md` | 40 | база знаний (KB0000xx; работа с C#/Java/Python) |
| `online/_log-*.txt` | — | Логи загрузки по спискам (OK / FAIL) |

> Списки URL: `tools/forsite-online-urls.txt` (вручную) и `tools/forsite-online-urls-auto.txt`
> (генерируются из путей локальных дампов).

## Связанные файлы

- **`FORELANG.md`** (в корне проекта) — краткое структурированное руководство по языку Fore
  (выжимка из `Fore`); удобно читать целиком.
- **`REFERENCE.md`** — справочник по платформе/API для текущего проекта.
- **Скрипты** (`tools/`): `extract-forsite.ps1` (локальные CHM → `*.md`), `gen-online-urls.ps1`
  (генерация URL), `fetch-forsite-online.ps1` (загрузка онлайн-тем), `build-forsite-index.ps1`
  (общий `INDEX.md`/`TOPICS.md`). `README.md` при генерации сохраняется.

## Генерация

```
# 1) локальные дампы CHM (9.9) -> docs/forsite/*.md
powershell -NoProfile -ExecutionPolicy Bypass -File "tools\extract-forsite.ps1"
# 2) сгенерировать URL онлайн-тем из путей локальных дампов
powershell -NoProfile -ExecutionPolicy Bypass -File "tools\gen-online-urls.ps1"
# 3) загрузить онлайн-темы (10.8): по умолчанию — оба списка URL
powershell -NoProfile -ExecutionPolicy Bypass -File "tools\fetch-forsite-online.ps1"
#    либо по конкретному списку:  ... -List "tools\urls-KeFore.txt"
# 4) общий индекс (INDEX.md + TOPICS.md)
powershell -NoProfile -ExecutionPolicy Bypass -File "tools\build-forsite-index.ps1"
```
