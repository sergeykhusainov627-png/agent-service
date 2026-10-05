# Fore — исходники проекта «Планировщик задач»

| Файл | Назначение |
|------|------------|
| `TaskContainerLib.fore` | Чтение задач контейнера, текстовые представления (состояние, расписание, последний успех, средняя длительность) |
| `TaskPlanner.fore` | Анализ загрузки и равномерная раскладка: `BuildPlan` / `ApplyPlan` / `PlanText` / `PlanAndApply`; анализ как данные — `BuildPlanInfosForContainer` / `PlanInfosHeader` (таблица в окне `PlanTextForm`); плюс `BuildPlanAvoiding` / `PlanAndApplyAvoiding` / `ShiftOutOfWindows` — старты не назначаются внутрь окна недоступности |
| `SchedulerForm.fore` | **Форма «Планировщик» (OBJ1473491) целиком** — базовая часть (выбор контейнера, карточка задачи, анализ, применение плана, редактирование) **и** панель «Недоступность системы» (период, решения, таблица плана, выгрузки). Одна форма = один класс `SCHEDULERForm` (объект на стенде `SCHEDULER` задан директивой `// ID:` в шапке файла; класс = `<Id> + Form` — правило платформы); одно событие `FormOnCreate` создаёт контролы и обе раскладки |
| `UnavailabilityPlanner.fore` | Планирование недоступности системы: поиск затронутых задач, решения «не запускать / перепланировать», равномерная раскладка доп. разовых запусков, дедупликация со штатным расписанием (без записи в репозиторий) |
| `UnavailabilityRunner.fore` | **Материализация плана**: диспетчер (`Timely`) — атомарный «захват» строки, `ExecuteImmediate`, состояние `DONE/FAILED`, сухой прогон, восстановление «зависших» строк; журнал попыток — таблица `UNAVAILABILITY_RUN_LOG` (`WriteRunLog`) |
| `UnavailabilityStore.fore` | **Хранилище**: `UNAVAILABILITY` (периоды), `UNAVAILABILITY_PLAN` (срез плана + состояния запуска), `UNAVAILABILITY_LOG` (журнал действий), `UNAVAILABILITY_RUN_LOG` (журнал выполненных запусков — история попыток диспетчера) — DAL/SQL, автор и серверное время |
| `UnavailNotify.fore` | **Уведомления и выгрузки**: письма ответственным (по ответственным, HTML), SMTP или файлы, экранирование HTML |
| `UiFactory.fore` | **Фабрика экранов**: создание компонентов кодом по описанию (spec) — `UiCreate`/`UiCreateScaled`, `UiSpecsFromText`, `UiFind`, `UiFree`, доступ по имени. **Используется рабочими формами** (их динамическая часть описана в `ScreenSpecText`) |
| `UiFactoryDemo.fore` | Демо-форма «весь экран из кода»: 22 компонента из spec-текста, один общий обработчик кнопок, таймер + прогресс. Объект — `UISCREENDEMO` (шапка `// ID: UISCREENDEMO`), класс — `UISCREENDEMOForm` |
| `UnavailabilityRecordsForm.fore` | Окно **«Ведение недоступности системы»**: добавить / изменить / удалить записи о недоступности. Класс — `UNAVAILABILITYRECORDSForm` (объект стенда `UNAVAILABILITYRECORDS` из шапки `// ID:` + `Form`) |
| `ResponsibleForm.fore` | Окно **«Ведение ответственного»**: ФИО и почта (`MAIL`) строки таблицы ответственных по задаче; открывается из «Планировщика» командой формы `SendCommand("EditResponsible", TaskId)`. Класс — `Public Class RESPONSIBLEForm` |
| `PlanTextForm.fore` | Окно **анализа/текста плана**: анализ раскладки **всех выбранных контейнеров** **таблицей** — грид `ListView` с заголовками (**Задача / Название / Очередь / Ср. длительность, с / Плановый старт / Контейнер**) и строкой-заголовком `LblInfo`; там же текстовый режим (план «текстом»). Открывается из «Планировщика» командами `SendCommand("SetCaption", …)` + `SendCommand("ShowAnalysis", "A;B;C")` либо `SendCommand("ShowText", Текст)`. Класс — `Public Class PLANTEXTForm` |
| `EditorForm.fore` | **Редактор Fore (этап 1, каркас)**: список объектов сборки/локальных `.fore`, `Memo` с кодом, открытие и сохранение (репозиторий `IModule.Text` и файл UTF-8 с самопроверкой), поиск/замена, показ строки через панель фрагмента, статус по таймеру. Объект — `FOREDITOR` (шапка `// ID: FOREDITOR`), класс — `FOREDITORForm`. См. `docs/EDITOR-TZ.md` |
| `EditorSpike.fore` | **Спайк редактора (этап 0)**: проверка на стенде API компиляции и метаданных (`IForeServices`/`IForeRuntime`/`IForeAssembly`/`IForeAssemblyBinary`), поведения `Memo` и проб выделения (`SelText`). Объект — `EDITORSPIKE`, класс — `EDITORSPIKEForm` |
| `DeployToolForm.fore` | **Инструмент деплоя** (параллельная утилита): выбираете папку репозитория и локальную папку с `.fore` → создаётся **сборка** (`KE_CLASS_ASSEMBLY`), в неё заливаются **модули** (`IModule.Text`) и **формы**; **«Ссылки сборок» распознаются по коду модуля** (таблица `REF_KINDS`: Metabase, Fore, Db, Dal, Forms, ExtCtrls, Ui, Collections, IO, Net, System + директива `// REFS:` + список из поля), а **при выгрузке те же ссылки читаются из репозитория** (`IModule.Standalone`/`ParentAssembly`/`Assembly` → `IAssembly.References`) и пишутся в шапку файла `// REFS:`; повторный запуск обновляет код. Дополнительно: **«Пробный прогон»** (то же, но без записи в репозиторий — только отчёт «создал бы / обновил бы …»), **«Выгрузить в файлы»** (содержимое сборки `IMetabaseObjectDescriptor.Children` → файлы `<Id>.fore`, а для форм ещё и `<Id>.form.xml` = `IForm.Content` с привязками событий — резервная копия стенда) и **«Привязать события форм сборки»** (события формы навешиваются **кодом**: в XML формы правятся `_CMP D101` = «`<Id объекта>` + `Form`» и блок `COMPONENT.EVENTS` по обработчикам из модуля). Необязательная шапка файла: `// ID: DEPLOYTOOL` (Id объекта отличается от имени файла) и `// REFS: …` (ссылки сборок конкретного модуля). При создании формы применяется и `<Id>.form.xml`, и `Content` формы-источника (для копий). См. `docs/DEPLOY.md` §7.7–7.8 |

> **Как развернуть на стенде** — пошаговая инструкция: `docs/DEPLOY.md` (DDL, объекты репозитория,
> ссылки на сборки, константы, контролы и обработчики, задача-диспетчер, чек-лист приёмки, откат).
> **Макеты форм** — `docs/mockups/form-planner.png`, `docs/mockups/form-records.png`,
> `docs/mockups/form-responsible.png` (текущее состояние, по коду), а также **предложения** (по состоянию
> кода до 1.86 — в них ещё есть `AffectedList` и удалённые пункты меню):
> `docs/mockups/form-planner-simplified.png` (v1: 34 кнопки → 14 элементов: 5 действий + 9 кнопок-меню)
> и `docs/mockups/form-planner-simplified-v2.png` (v2: те же кнопки + подписи к выводимым данным и
> разбор дублирующихся данных — план показывался трижды, время вводилось в двух местах).
> Разбор — `REFERENCE.md` §5.33, код меняем после согласования.
> Перегенерация: `python tools/make-mockups.py`; проверка геометрии: `python tools/mockups-check.py`.

## Обработчики формы (SchedulerForm.fore)

0. `FormOnCreate` — **единственный** обработчик события формы `OnCreate` (`Args: IEventArgs`): задаёт
   `LayoutK`, создаёт контролы (`CreateFormComponents` — динамическая часть фабрикой по описанию
   `ScreenSpecText`, таблицы/пикеры/диалоги конструктором), затем раскладывает левую колонку
   (`SetupPlannerLayout`) и панель недоступности (`SetupPanelLayout`).
1. `SelectContainerOnClick` — выбор контейнеров задач (диалог с фильтром `KE_CLASS_TASK_CONTAINTER`,
   **несколько** — `MultiSelect := True` → `Objects`; набор **заменяется**), а `AddContainersOnClick`
   («Добавить контейнеры…») **добавляет** контейнеры к набору — так набираются контейнеры из РАЗНЫХ
   папок (в диалоге выделение «слетает» при смене папки); «Ещё ▾» → «Убрать контейнер «A»» / «Очистить
   выбор контейнеров» (`MergeContainers`/`RemoveContainerFromSet`/`ClearContainersOnClick`).
2. `FillTasksFromContainers` — `CurrentContainers` (список выбранных), задачи «подтягиваются» из ВСЕХ
   контейнеров (`CollectTaskRefs`, дубли по Id — один раз). **Один контейнер** — показывается штатный
   список компонента `MetabaseListView2` (`Root`, у него «из коробки» двойной клик = открыть задачу и
   системное меню); **два и более** — свой **объединённый список** `TaskListMerged` (обычный `ListView`,
   создаётся кодом — у `MetabaseListView.Root` только ОДИН контейнер): колонки
   «Задача | Контейнер | Название | Состояние», строки набирает `RefillTaskList`, «строка ↔ задача» —
   `TaskRows` (`CTaskRef`); клик — `TaskListMergedOnClick` → `ShowTaskCard`, **двойной клик** —
   `TaskListMergedOnDblClick` → `OpenTaskObject` («открыть задачу», как в списке контейнера).
   `NextTaskListFilter` (меню «Ещё ▾») фильтрует объединённый список по кругу; если он не заполнился —
   причина в `Debug`, показывается список контейнера.
3. `MetabaseListView2OnClick` — карточка выбранной задачи. Заполняется «по шагам» внутри `Try`
   (переменная `Stage` + журнал `Debug`): задача открывается через `BindScheduledTask`, расписание —
   `GetTaskPeriodText` (только базовые `Type`/`Next`, без приведения к подтипам периода), история —
   `GetLastSucceededText`/`GetAverageDurationText`. Если шаг не удался, в статусной метке появится его
   имя и текст ошибки, а **форма не закроется** (см. «Замечания»).
4. `AnalyseButtonOnClick` → `ShowPlanAnalysis` — анализ загрузки и раскладки **всех выбранных контейнеров**
   выводится **таблицей**: окно `PlanTextForm` открывается командой `SendCommand("ShowAnalysis", "A;B;C")` и
   строит грид `AnGrid` (`ListView`, вид «отчёт»: заголовки столбцов + сетка) с колонками
   «Задача | Название | Очередь | Ср. длительность, с | Плановый старт | Контейнер» — данные даёт
   `BuildPlanInfosForContainers` (`TaskPlanner.fore`); над таблицей строка `LblInfo`
   («Задач: N; контейнеров: 2 (A, B); суммарная средняя длительность, ч; окно»). План «текстом» (меню «Выгрузка ▾»)
   открывает то же окно в текстовом режиме, «Копировать в буфер» отдаёт таблицу текстом с
   табуляцией (вставка в Excel — по столбцам).
5. `EditResponsibleOnClick` / `OpenResponsibleForm` («Изменить ответственного») — открывает **форму
   ведения ответственного** (`Fore/ResponsibleForm.fore`) **уже для выбранной задачи**: Id берётся из
   выделенной строки списка (`SelectedTaskId_` запоминается в `MetabaseListView2OnClick`, затем —
   «живое» выделение списка), поэтому в окне сразу заполнены ФИО и почта из `RESPONSIBLE_FOR_TASK`
   (передача — `SendCommand("EditResponsible", TaskId)`, обработка — `ResponsibleFormOnCommand`),
   после закрытия индекс `RespIndex_` и подпись `Label1` перечитываются. Без выбора — подсказка
   «Сначала выберите задачу в списке задач». Тот же путь — у пункта меню «Ввести вручную…».
6. `RespMenuButtonOnClick` / `RespMenuBuild` / `RespMenuPickOnClick` — выпадающий список ответственных:
   **обычная кнопка + компонент `PopupMenu`** (в сборке Forms **нет** `MenuButton`/`IMenuButton`, см.
   `REFERENCE.md` §5.32). По щелчку кнопки строятся пункты (уникальные ответственные из таблицы по
   алфавиту + «Ввести вручную…») и меню показывается методом `IPopupMenu.Popup`; тот же `PopupMenu`
   висит на `IControl.PopupMenu`, поэтому список открывается и по правой кнопке мыши.
7. `NotifyResponsiblesOnClick` («Разослать уведомление ответственным») — по **выбранной записи**
   недоступности: `NoticesForResponsibles` собирает письма (сроки + автор + задачи ответственного;
   адрес — колонка `MAIL`), отправка — ваша функция `SendMailMessage(To; From; Subject; Body)`
   через `UnavailNotify.SendNoticesUserMailer`; сводка и замечания — в `UnavailSummaryMemo`.
5. `ApplyPlanOnClick` — построить и применить расписание (назначить на кнопку).
6. `EditButtonOnClick` — открыть выбранную задачу на редактирование.

## Как использовать

1. `TaskContainerLib.fore` и `TaskPlanner.fore` — подключить как модули (общие) либо перенести функции
   в модуль формы.
2. `SchedulerForm.fore` — скопировать **только тела обработчиков** (пункты 1–6) в соответствующие
   обработчики своей формы; имена контролов совпадают с формой «Планировщик» из `TaskConf`.
3. В модуль формы добавить поле для хранения выбранного контейнера:
   `CurrentContainer: IMetabaseObjectDescriptor;` (используется в обработчиках 2, 4, 5).
4. Обработчики 4 и 5 работают только в **настольном** приложении, если используют
   `WinApplication.InformationBox` / `IUiCommandTarget`.

## Планирование недоступности системы

Доп. функция планировщика: задать период недоступности (простоя) и разобраться с задачами,
чей прогон в него попадает (модули `UnavailabilityPlanner.fore` + `SchedulerForm.fore`).

Поток:
1. `OpenUnavailabilityOnClick` («Недоступности ▾ → …») или `BuildAffectedOnClick` — подготовить панель:
пикеры периода, список периодов из таблицы, затем построить список пересекающихся задач.
2. Задать период в `DateTimePicker` (значение — `CurrentDate`) → `BuildAffectedOnClick`.
3. `CollectAffectedTasks` (в `UnavailabilityPlanner.fore`) — задачи, чей прогон пересекает период
   (в т.ч. начавшийся раньше, но по статистике длительности ещё идущий). Все они получают
   `Decision = DECISION_RESCHEDULE` («обрабатывать» + «перепланировать» по умолчанию).
4. Пользователь правит отметки **в таблице плана** (`PlanTable`, блок «Раскладка (план)»):
   колонка **«Обрабатывать»** — участвует ли задача в плане, колонка **«Не запускать»** — решение
   `DECISION_SKIP`. Отметки связаны (как радиокнопки), переключаются кликом по ячейке
   (`PlanTableOnClick` → `SetImpactFlags`) или пунктами меню «Отметки ▾» / «Решение ▾»
   (`SetAllProcessed`, `ApplyProcessed`). Фильтр по ответственному влияет только на показ — расчёт
   всегда идёт по всем строкам с «обрабатывать».
5. `DistributeScheduleLayers(Impacts, PlanStart, Layers)` — раскладка **по слоям**: задачи
   сортируются по средней длительности (LPT), каждая идёт в наименее загруженный слой, внутри слоя
   задачи идут вплотную (окончание ≈ начало следующей). Результат — таблица `PlanTable`
   (10 колонок), над ней в `UnavailSummaryMemo` — строка статуса (`UpdateStatusLine`) и сводка
   (`UnavailPlanHeaderText`).
6. Кнопка **«Пересчитать план»** (`RecalcPlanOnClick`) открывает окно `PlanParamsForm`:
   начало плана (по умолчанию — окончание периода недоступности), число слоёв либо флажок
   «Уложиться в желаемое окончание» (тогда слои считает `PlanLayersForFinish`). После закрытия окна
   план пересчитывается, ручные правки «Дата нового запуска» сбрасываются.
7. Период недоступности берётся из **таблицы**: `RefreshUnavailPeriodsOnClick` (список периодов) →
   `TakeUnavailPeriodOnClick` (выбранная запись подставляет даты, ручной ввод отключается);
   `ManualPeriodOnClick` возвращает ручной ввод. Ведение записей — окно `OpenRecordsWindowOnClick`
   (`UnavailabilityRecordsForm`). План живёт **только в таблицах СУБД**: `SavePlanToTableOnClick`
   (сохранить снимок), `LoadPlanFromTableOnClick` (загрузить), `ShowStoredPlanOnClick`
   (`StoredPlanTable`), `DeletePlanOnClick` (убрать). Файловых сохранений/CSV/HTML больше нет (1.86).
   Ещё есть «Что будет запущено» (`DryRunOnClick` — отчёт диспетчера без запуска), «Журнал действий»
   (`ShowLogOnClick`), «Журнал выполненных запусков» (`ShowRunLogOnClick`) и «Применить план без
   простоя» (`ApplyPlanAvoidingOnClick` — базовый планировщик не назначает старты внутрь периода).

**Схема таблицы плана** (8 полей; задана константами `UNAVAIL_COL_*` в `UnavailabilityPlanner.fore`):

| Заголовок | Идентификатор | Тип поля |
|---|---|---|
| Задание | `TASK_ID` | Строковый(255) |
| Задание - название | `TASK_NAME` | Строковый(255) |
| Бизнес-приложение | `BA_NAME` | Строковый(255) |
| Ответственный | `RESPONSIBLE_USER` | Строковый(255) |
| Плановое Время запуска | `START_TIME_ORIGINAL` | Дата |
| Плановое время окончания | `END_TIME_ORIGINAL` | Дата |
| Длительность | `TIME_SPAN` | Дата |
| Дата нового запуска | `START_TIME_NEW` | Дата |

> «Дата нового запуска» пуста = задача не перепланируется (решение «не запускать»).
> `TIME_SPAN` выводится как `ЧЧ:ММ:СС` (средняя длительность из истории; в ТЗ тип был указан как «Дата» —
> опечатка). `RESPONSIBLE_USER` берётся из **таблицы ответственных** `RESPONSIBLE_FOR_TASK`, `BA_NAME` —
> подъёмом по владельцам задачи (`Descriptor.Parent`) до объекта класса «Бизнес-приложение» (`ClassId` = 10496).

Откуда берётся каждое поле:

| Поле | Источник |
|---|---|
| `TASK_ID` | Id задачи (`Descriptor.Id`) |
| `TASK_NAME` | название задачи (`Descriptor.Name`) |
| `BA_NAME` | подъём по `Descriptor.Parent` до объекта класса «Бизнес-приложение» (`ClassId` = `BA_CLASS_ID` = 10496), берётся его `Name` |
| `RESPONSIBLE_USER` | таблица `RESPONSIBLE_FOR_TASK` (константа `RESP_TABLE_ID` = native_name): строка по `RESP_FIELD_TASK` = Id задачи, значение `RESP_FIELD_RESPONSIBLE` |
| `START_TIME_ORIGINAL` | прогноз старта прогона (`RunStart`) |
| `END_TIME_ORIGINAL` | прогноз окончания (`RunFinish`) |
| `TIME_SPAN` | средняя длительность из истории в формате `ЧЧ:ММ:СС` |
| `START_TIME_NEW` | новое время разового запуска; пусто = «не запускать» |

Константы в `UnavailabilityPlanner.fore`: `RESP_TABLE_ID = "RESPONSIBLE_FOR_TASK"` (уже задана;
это `native_name` таблицы ответственных — меняйте, только если на стенде она называется иначе),
`RESP_DB_ID` (база данных этой таблицы) и `RESP_FIELD_*` (идентификаторы её полей). Таблица читается
**SQL-курсором по соединению с базой** (`LoadResponsibleTableSql`: `IDatabaseInstance.Connection` →
`CreateCommand` → `Command.Parse` → `Command.CreateCursor`), объект репозитория «Таблица» не нужен;
поэтому модулю требуются ссылки на сборки **Db** и **Dal**. Модуль, читающий таблицу,
должен иметь **ссылку на сборку `Db`** (тип `IDatasetInstance`). Готовая физическая таблица
(PostgreSQL 17): `docs/sql/responsible-for-task-postgres.sql` — `id (identity PK) + task_id (уникальный)
+ ba_name + responsible + mail`; DDL для таблиц недоступности — `docs/sql/unavailability-postgres.sql`.
Колонка `MAIL` (почта ответственного) добавлена миграцией в том же скрипте и используется кнопкой
«Разослать уведомление ответственным» (отправка — ваша функция `SendMailMessage`).

> Модуль **только считает и готовит план** — в репозиторий ничего не пишется. Как план превратить в
> реальные запуски — см. «Запуск разовых прогонов» ниже и `REFERENCE.md`, §6.21.

## Запуск разовых прогонов (материализация плана)

У задачи ровно **один** `Period`, поэтому «разовый запуск после простоя» нельзя добавить ей вторым
периодом. `UnavailabilityRunner.fore` решает это способом **«диспетчер»** — универсально для любых задач.

**Диспетчер.** Источник плана — **только таблица `UNAVAILABILITY_PLAN`** (план, сохранённый формой);
констант файлового режима больше нет (1.86). Служебная задача «Выполнение модуля» с периодом `Timely`
каждые N минут вызывает `RunDuePlannedRunsMain`:

```fore
// однократная настройка (модуль — тот, где лежит UnavailabilityRunner.fore)
CreateUnavailabilityDispatcher("TASK_CONTAINTER", "UnavailabilityRunner", "RunDuePlannedRunsMain", RUN_POLL_MINUTES);

// «тик» диспетчера (тело RunDuePlannedRunsMain): план из таблицы, хвостовое окно — RUN_PLAN_TAIL_HOURS
RunDuePlannedRunsFromTable(Container, RUN_PLAN_TAIL_HOURS);

// настройка диспетчера: создаёт задачу, а при повторном вызове просто обновляет интервал опроса
EnsureUnavailabilityDispatcher("TASK_CONTAINTER", "UnavailabilityRunner", "RunDuePlannedRunsMain", RUN_POLL_MINUTES);
```

**Как выбираются запуски:** берутся записи недоступности, у которых `Now >= StartDt` и
`Now <= EndDt + RUN_PLAN_TAIL_HOURS` (период уже начался и «хвост» ещё не истёк), в их планах
выполняются строки с заполненным `START_TIME_NEW`, чьё время наступило (`Now >= NewStart`).
Строка «захватывается» атомарно (`ClaimPlanRun` → `RUN_STATE = 'RUNNING'`, `ATTEMPTS + 1`); результат —
`FinishPlanRun` (`DONE` + `DONE_AT` либо `FAILED` + `ERROR_TEXT`; повторы до `UNV_MAX_ATTEMPTS`),
каждая попытка пишется в журнал `UNAVAILABILITY_RUN_LOG` (`WriteRunLog`).

Внутри — `IScheduledTask.ExecuteImmediate(True)`: выполняет задачу в текущем процессе и репозитории,
запущенный планировщик **не требуется**, класс задачи знать не нужно. Задача в состоянии
«выполняется» (`ScheduledTaskState` = 2) не перезапускается: попытка пропускается и в журнале
помечается `SKIPPED`. Повторные «тики» уже выполненные строки не запускают (`RUN_STATE`/`DONE_AT`).

Перед запуском на стенде прописать реальные значения констант `RUN_CONTAINER_ID`, `RUN_DISPATCHER_ID`,
`RUN_PLAN_TAIL_HOURS` (файловых путей больше нет — план и журнал в таблицах БД).

> Это **единственный** модуль проекта, который меняет состояние системы (выполняет задачи).
> Планировщик и форма по-прежнему ничего не пишут.

## Ведение недоступностей и хранение плана (таблицы)

Периоды недоступности и планы переноса хранятся в таблицах базы данных репозитория (DAL/SQL, §5.5).
**Готовый DDL для PostgreSQL 17 — `docs/sql/unavailability-postgres.sql`** (идемпотентный: таблицы,
индексы, `comment on`, примеры `insert` для проверки).
**Пересоздать все таблицы «с нуля» (DROP, затем CREATE) — одной командой:**
`psql -U <user> -d <db> -v ON_ERROR_STOP=1 -f docs/sql/unavailability-recreate-postgres.sql`
(удаляет данные `unavailability`, `unavailability_plan`, `unavailability_log`; для GUI-клиентов —
самодостаточный `docs/sql/unavailability-recreate-all-postgres.sql`; только очистка данных —
`truncate table unavailability_plan, unavailability_log, unavailability restart identity cascade;`).

| Таблица | Назначение | Поля |
|---|---|---|
| `UNAVAILABILITY` | периоды простоя | `UNAVAIL_ID`, `START_DT`, `END_DT`, `AUTHOR`, `LAST_CHANGED` (границы периода — **дата и время**) |
| `UNAVAILABILITY_PLAN` | срезы плана переноса | `UNAVAIL_ID`, `SAVED_AT`, `AUTHOR`, `DONE_AT` + 8 полей плана (пустой `START_TIME_NEW` = «не запускать») |

| Модуль | Что |
|---|---|
| `UnavailabilityStore.fore` | `LoadUnavailRecords`, `AddUnavailRecord`, `UpdateUnavailRecord`, `DeleteUnavailRecord`, `SavePlanToTable`, `LoadPlanFromTable`, `LoadStoredPlanRows`, `HasStoredPlan`, `LoadPendingRunRows`, `MarkPlanRunDone`, `ApplyStoredPlanToImpacts`, `ExportStoredPlanToFile`, `CheckUnavailStorage`; автор — `MB.LogonSession.UserDescription`, штампы — `MB.GetCurrentStamp`, ключ — `MB.GenerateKey` |
| `UnavailabilityRecordsForm.fore` | окно «Ведение недоступности системы»: `ReloadRecords`, `AddRecordOnClick`, `UpdateRecordOnClick`, `DeleteRecordOnClick`, `CheckStorageOnClick` (диагностика) |

Что заполнить под стенд: `UNV_DB_ID` (`CONNECT_SNG_DB` — уже задано; Id объекта «База данных»),
`UNV_TABLE`, `UNV_PLAN_TABLE` и `UNV_F_*`/`PLN_F_*`
(имена полей). Период недоступности — «дата и время» в одной колонке (`START_DT`/`END_DT`,
`UNV_PERIOD_SINGLE_COLUMN := True`); если таблица уже создана с четырьмя колонками (`START_DATE`,
`START_TIME`, `END_DATE`, `END_TIME`) — поставьте `False` (тогда время пишется текстом `'ЧЧ:ММ'`
или датой, `UNV_TIME_AS_TEXT`). `TIME_SPAN` в плане пишется как `ЧЧ:ММ:СС` (поле строковое).
Пикеры периода показывают дату и время: `Format := 'dd.MM.yyyy HH:mm'` (задаётся кодом),
вид компонента `Kind` = «дата и время» — в Инспекторе. Модулям нужны ссылки на сборки
**Metabase, Db, Dal**.

## Создание контролов: фабрика и «поля-алиасы»

Динамическая часть формы (кнопки, поля, метки, `Memo`) **не размещается в дизайнере**: она описана
текстом в `ScreenSpecText` и создаётся фабрикой (`Fore/UiFactory.fore`) одним вызовом
`Map_ := UiCreateScaled(Self, UiSpecsFromText(ScreenSpecText), LayoutK)`. Таблицы и диалоги фабрика не
создаёт (пикер `PICKER` — создаёт), поэтому их создаёт конструктор, если контрол отсутствует на форме.
То, что раньше можно было задать только в Инспекторе, теперь делается кодом: табличный вид
(`ListViewStyle.Report`), колонки (`Columns.Add`), вид пикера (`DateTimePickerKind.Date`/`Time`) —
значения перечислений и API в `REFERENCE.md` §5.32:

```fore
If IsNull(PlanTable) Then
	PlanTable := New ListView.Create;
	PlanTable.Parent := Self;
End If;
```

Объявления полей в классе при этом **остаются** (`PlanTable: ListView;`, `BtnBuild: Button;`) — это
«алиасы», а не место создания: значение полю присваивает `CreateFormComponents`
(`X := UiFind(Map_, "X")`). Так обработчики не пришлось переписывать ( `PlanTable.Items.Add(...)`,
`UnavailSummaryMemo.Lines.Add(...)`), и сохраняется типизированный доступ вместо `Variant`.
Альтернативы: брать контрол из карты по месту (`UiButton(Map_, "BtnBuild")`), объявлять локальную
переменную в каждом обработчике или работать через `Sender As Button` (как в `UiFactoryDemo.fore`).
Добавить контрол = **одна строка** в `ScreenSpecText`; подписка кнопки — одна строка
(`Ctl := UiFind(Map_, "BtnBuild") As Button; Ctl.OnClick := BuildAffectedOnClick;`).
Подробнее — `REFERENCE.md` §5.28.

### Блоки на форме (`GROUP` = GroupBox) и подписи к значениям

С версии 1.71 экран разделён на **блоки** — в описании это строки `GROUP`, фабрика создаёт по ним
настоящие `GroupBox`, а контролы блока ссылаются на рамку через `Parent=<имя группы>`:

| Блок | Что внутри |
|---|---|
| `GrpTaskCard` «Карточка задачи» | 6 пар «подпись + значение» (`LblCapResponsible` + `ResponsiblePersonLabel`, `LblCapState` + `ChainStatusTextLabel`, `LblCapNextStart` + `NextStartTextLabel`, `LblCapLastStart` + `LastSuccesfullStartTextLabel`, `LblCapAvgTime` + `LabelAvgTimeVal`, `LblCapRespTask` + `Label1`), кнопка `BtnEditResp` |
| `GrpTasks` «Задачи контейнера» | `MetabaseListView2` (создаёт конструктор, лежит внутри рамки) |
| `GrpPeriods` «Периоды недоступности» | `UnavailRecordsList` |
| `GrpPeriod` «Период недоступности» | 4 пикера периода |
| `GrpMsg` «Сообщения» | `UnavailSummaryMemo` |
| `GrpPlan` «Раскладка (план)» | `LblStatus`, `FilterEditBox`, `BtnApplyFilter`, `BtnResetFilter`, **`BtnRecalcPlan`**, `PlanTable` (10 колонок) |
| `GrpStored` «Сохранённый план (из таблицы)» | `StoredPlanTable` |

Правила: `Top` детей считается от клиентской области группы (подпись `GroupBox` занимает ~15 px,
поэтому в описании координаты уменьшены); группы создаются **первыми** (см. порядок в
`CreateFormComponents`), иначе рамка перекроет таблицу. **Контролы, размещённые в дизайнере заранее**
(списки репозитория) и создаваемые конструктором, помещаются ВНУТРЬ блока хелпером `PlaceInGroup`
(`Parent := <группа>`) — ребёнок всегда рисуется поверх рамки; иначе `GROUP` закрывает список
(симптом «периоды недоступности не работают»). **Это же правило — для любого контрола, который лежит
на рамке блока:** кнопка «Ранее использованные ответственные ▾» (`MenuButton`) не нажималась, пока
была соседом рамки `GrpTaskCard` — внутри группы (ребёнком) она работает. Размеры окна — **только пиксельные**: привязки
отключены (`UI_AUTOSIZE_ON_RESIZE = False` в `TaskContainerLib.fore`), раскладка задаётся числами
`LayoutK` / `LAYOUT_TOP_SHIFT` / `PANEL_X_SHIFT` / `PANEL_X_GROW`. Подробнее — `REFERENCE.md` §5.33.

## Контролы, которые используются

`MetabaseEtlOpenDialog` (`MetabaseOpenDialog`), `MetabaseListView2` (**список контейнера** — запасной путь
при выборе одного контейнера), `TaskListMerged` (обычный `ListView`, создаётся кодом: **объединённый
список задач** по всем выбранным контейнерам, 4 колонки), `PlanTextMemo` (сводка `PlanText`;
дерево `MetabaseTreeList1` убрано — в Memo текст помещается, в `Label` нет),
`ChainNameEditBox` (**Id выбранных контейнеров через «;»**, с числом при нескольких), `ResponsiblePersonLabel` (`Label` — значение `Props.UserTag`, только показ), `ChainStatusTextLabel`, `NextStartTextLabel`,
`LastSuccesfullStartTextLabel`, `LabelAvgTimeVal`, `Label1` (**ответственный по выбранной задаче**),
`BtnEditResp` («Изменить ответственного» — открывает форму ведения ответственного)
и `RespMenuButton` (`Button`) + `RespPopupMenu` (`PopupMenu`) — выбор ответственного из ранее
использованных или ручной ввод (тоже открывает форму). На панели недоступности — `BtnNotifyResp`
(«Разослать уведомление ответственным»: сроки недоступности + автор записи + задачи ответственного,
адрес — колонка `MAIL` таблицы ответственных, отправка — ваша функция `SendMailMessage`).

Доп. окно «Недоступность системы»: `UnavailStartDatePicker` + `UnavailStartTimePicker`,
`UnavailEndDatePicker` + `UnavailEndTimePicker`
(`DateTimePicker`: пикер даты `Kind` = «дата», пикер времени — «время»; ставится кодом —
`DateTimePickerKind.Date` / `.Time` в `ConfigurePeriodPickers`; значение — `CurrentDate`),
`UnavailSummaryMemo` (**`Memo`** — сообщения и сводка: `Lines`, `WordWrap`, `ScrollBars` — кодом,
`ControlScrollStyle.Vertical`),
`PlanTable` (**`ListView`** — таблица плана: все задачи, пересекающиеся с периодом, **10 колонок**,
включая «Обрабатывать» и «Не запускать»; колонки создаёт `SetupPlanTableColumns`),
`UnavailRecordsList` (**`ListView`** — список периодов недоступности из таблицы; колонки: начало,
окончание, автор, последнее изменение, признак «есть план»),
`StoredPlanTable` (**`ListView`** — просмотр сохранённого в таблице плана, 8 колонок),
`LblStatus` (**`Label`** — строка статуса блока «Раскладка (план)»),
`FilterEditBox` + `BtnApplyFilter` / `BtnResetFilter` (фильтр таблицы плана) и **`BtnRecalcPlan`**
(«Пересчитать план»).

Окно «Ведение недоступности системы» (`UnavailabilityRecordsForm`): `RecordsList` (`ListView`,
колонки — Начало (дата и время) | Окончание (дата и время) | Автор | Последнее изменение),
`RecStartDatePicker` / `RecStartTimePicker` и `RecEndDatePicker` / `RecEndTimePicker`
(`DateTimePicker`: дата — `Kind` = `DateTimePickerKind.Date`, время — `DateTimePickerKind.Time`
(ставится кодом в `ConfigurePeriodPickers`); значение — `CurrentDate`),
`RecAuthorLabel` (`Label`).
Клик по строке `RecordsList` привязывается **кодом** (`RecordsList.OnClick := RecordsListOnClick` в
`SetupRecordsLayout`) — как `MetabaseListView2.OnClick` в планировщике, чтобы подстановка периода не
зависела от привязки в Инспекторе. Вид пикеров (`ConfigurePeriodPickers`) подтверждается и в
`RecordsFormOnCreate`, и в `SetPeriodPickers` **перед записью значений**: иначе время уходило в пикер с
видом «дата» и в поле времени ничего не появлялось.

## Табличный вид списков и раскладка по макету

* **Колоночное представление `ListView`** требует `Style` = «таблица» (`Report`): без него список рисует
  значки. Тип перечисления — **`ListViewStyle`** (сборка Forms): `Icon`, `SmallIcon`, `List`, `Report`;
  в шаблонах это `LV.Style := ListViewStyle.Report;` (`SetupPlannerLayout`, `SetupPanelList`,
  `SetupRecList`). Колонки — либо в **Инспекторе**, либо кодом: создают их
  `SetupPlanTableColumns`/`SetupRecordsListColumns`/`SetupTaskListColumns` (списки) — **только если их ещё
  нет** (`If LV.Columns.Count = 0`; для таблицы плана — ещё и если набор колонок отличается от
  `UNAVAIL_PLAN_COLUMNS`); каждая настраивается помощником `SetListColumn` (подпись, ширина,
  «резиновость», выравнивание) — см. `TaskContainerLib.fore` (для `TreeList` есть однотипный
  `SetTreeColumn`/`SetupTreeColumns`, но дерево из шаблона убрано).
  Если колонки заданы в Инспекторе,
  код включает только авторазмер (`SetColumnsAutoSize`). Свойства колонок: **`AutoSize`** (растяжение
  по ширине списка; при нехватке места — `MinWidth`), **`Alignment`** (`TextAlignment`:
  `Left`/`Center`/`Right`), `MinWidth`/`MaxWidth`, `Visible`, `SortAscending`.
  Там же кодом: `GridLines := True` (сетка), `RowSelect := True` (выделение строки),
  `ShowColumnHeaders := True`, `ReadOnly := True`; сортировка — `SortType` (`ControlSortType`:
  `None`/`Text`/`Custom`), выравнивание значков — `Arrangement` (`ListViewIconArrangement`: `Top`/`Left`).
  Значения перечислений — `REFERENCE.md` §5.32.
* **Расстановка контролов по макету** — в событии формы `OnCreate` (`(Sender: Object; Args: IEventArgs)`):

  | Подпрограмма | Файл | Что делает |
  |---|---|---|
  | `FormOnCreate` → `SetupPlannerLayout` | `SchedulerForm.fore` | левая колонка формы 1780×1300 (`LayoutK`) |
  | `FormOnCreate` → `SetupPanelLayout` | `SchedulerForm.fore` | правая колонка — панель недоступности (тот же `LayoutK`) |
  | `RecordsFormOnCreate` → `SetupRecordsLayout` | `UnavailabilityRecordsForm.fore` | окно 1180×600 (`RecLayoutK`) |
  | `ResponsibleFormOnCreate` → `SetupRespLayout` | `ResponsibleForm.fore` | окно 760×300 (`RespLayoutK`) |

  **Автомасштаб при изменении размеров окна** включается константой `UI_AUTOSIZE_ON_RESIZE`
  (`TaskContainerLib.fore`) и помощником `SetAutoSize(Ctl; StretchRight; StretchBottom)`
  (`IControl.Anchors` — проценты привязки краёв): списки/таблицы/Memo тянутся по ширине, Memo и ряды
  нижних кнопок — ещё и по высоте. Подробнее — `REFERENCE.md` §5.32.

  Хелперы `PlannerPlace` / `PanelPlace` / `RecPlace` умножают макетные координаты на масштаб
  (`1.0` — «как в макете», `0.75` — компактно под 1920×1080), поэтому подгонка под монитор —
  правка одного числа. Форма «Планировщик» — **одна**: контролы панели и планировщика создаются
  одним `CreateFormComponents` и одним событием `FormOnCreate` (масштаб у них общий — `LayoutK`).

## Проверка

```
cd F:\Scheduler Tasks
node tools/check-all.js        # всё сразу: линтер + спецификация + SQL + макеты
node tools/fore-lint-check.js Fore   # только линтер
node tools/fore-spec.js             # только спецификация чистой логики
```

Ожидается: `Файлов: 13, предупреждений в файлах: 0, предупреждений по проекту: 0` (+ информационные
отметки об именах, встречающихся в разных файлах, — это нормально, если файлы попадут в разные
модули). Линтер возвращает код 1, если есть предупреждения, поэтому его удобно ставить в CI.
Проверяет: баланс блоков (в т.ч. многострочные `If`), `Try` без `Except`, «Then без If»,
BOM/кодировку/смешанные переводы строк, дубли имён между файлами, `New <X>.CreateForm` без
объявленного класса, **сравнение с `Null`** (`X = Null` → `IsNull(X)`) и **пропущенный `+`**
в начале строки продолжения склейки строк.

## Устойчивость диспетчера: захват строки, состояния, журнал

| Что | Как это работает |
|---|---|
| **Двойные запуски** | перед запуском строка плана «захватывается» в СУБД (`ClaimPlanRun`: `update … where run_state is null`, успех = изменена 1 строка). Два диспетчера не выполнят одну строку дважды |
| **Результат** | `FinishPlanRun` пишет `RUN_STATE` (`DONE`/`FAILED`), `FINISHED_AT`, `ERROR_TEXT`; `DONE_AT` — только при успехе. Успех определяется по `IScheduledTaskResult.Succeeded` |
| **Повторы** | до `UNV_MAX_ATTEMPTS` (3) попыток; дальше строка попадает в «требуют внимания» (`LoadAttentionRunRows`) |
| **Сбой процесса** | «зависшие» `RUNNING` старше `UNV_STUCK_MINUTES` возвращаются в очередь (`ResetStuckPlanRuns`) в начале тика |
| **Часы и пояса** | «пора запускать» решает СУБД (`LoadDueRunRows` → `current_timestamp`), поэтому часы сервера приложения/задачи и локаль не влияют |
| **Наблюдаемость** | журнал `UNAVAILABILITY_LOG` (`WriteUnavailLog`/`UnavailLogText`), сводка `PlanRunsSummaryText`, кнопки «Журнал действий», «Что будет запущено» |
| **Сухой прогон** | `RUN_DRY_RUN := True` или `RunDuePlannedRunsDryRunMain` / `UnavailRunTickReport` — показывают, что было бы запущено, ничего не выполняя |
| **Лишние запуски** | дедупликация: если до штатного запуска задачи ≤ `DEDUP_GAP_MINUTES` (60), доп. запуск подавляется и помечается в сводке |

## Уведомления, выгрузки и мелкие инструменты UI

| Что | Реализация |
|---|---|
| **Письма ответственным** | `UnavailNotify.fore`: `NoticesFromImpacts` (одно письмо на ответственного, HTML-таблица), `UnavailNoticesText` (в Memo), `SaveNoticesToFolder` (файлы `notice_*.htm` — работают без SMTP), `SendNoticesSmtp` (SMTP через сборку `Net`; при пустом `NOTIFY_SMTP_HOST` — только файлы) |
| **Выгрузка «в Excel»** | `UnavailPlanHtmlText` — HTML-таблица 8 колонок (открывается в Excel/Word); для .xlsx нужен объект-отчёт |
| **Фильтр плана** | поле `FilterEditBox` + `TableFilter`: фильтруются Id, название, бизнес-приложение, ответственный (поиск без учёта регистра — `String.ToLower`) |
| **Отметки-«крестики»** | колонки «Обрабатывать» / «Не запускать» в `PlanTable`: `SetImpactFlags` (клик по ячейке — `PlanTableOnClick`, колонка по `Args.pPoint.X`), `SetAllProcessed`, `ApplyProcessed` |
| **Разбор импорта** | `ApplyStoredPlanReport` — что применено и какие Id не найдены в текущем плане |
| **Монитор системы** | `UnavailMonitorText` — записи, активные простои (по часам СУБД), строки плана по состояниям, «требуют внимания» |

## Замечания

* **Обработчик события модальной формы не должен выбрасывать исключение.** Если внутри `OnCreate`/`OnClick`
  «вылетает» ошибка (недоступное свойство, не сработавшее приведение интерфейса, чтение истории задачи),
  модальный цикл прерывается — **окно закрывается** (симптом ровно такой: «кликнул по задаче — форма
  исчезла»). Поэтому в шаблонах все внешние чтения обёрнуты в `Try`, и сбой только пишется в журнал:
  * карточка задачи — «по шагам» (`Stage`, `Debug.WriteLine("… сбой на шаге «" + Stage + "» …")`);
  * задача — `BindScheduledTask(TaskDesc)` (не бросает исключение, возвращает `Null`);
  * расписание — `GetTaskPeriodText`: используются только свойства базового `IScheduledTaskPeriod`
    (`Type`, метод `Next`), без приведения к `IScheduledTaskPeriodDaily`/`Weekly`/`Monthly`/`Timely`
    (такие приведения на стенде ненадёжны), «ближайший запуск» считает `Period.Next(DateTime.Now)`;
  * история (последний успех, средняя длительность) — `GetResults` и разбор записей в `Try`;
  * применение плана (`TaskPlanner.ApplyPlan`) — каждая задача в своём `Try`: одна «плохая» задача
    не мешает остальным (`применено N, с ошибками M` в журнале).
  Диагностика: искать в журнале (Debug/журнал задачи) строки `Планировщик: карточка задачи — сбой на шаге …`,
  `Контейнер: …`, `Недоступность: …` — там указан и шаг, и текст ошибки.

- **Динамическое создание компонентов возможно** (проверено по справке KB «Компоненты дизайнера форм»
  и справке языка): `btn := New Button.Create; btn.Parent := Self;` (или контейнер — `Panel`,
  `GroupBox`, `ScrollBox`), координаты/свойства — кодом, события тоже кодом
  (`btn.OnClick := Handler`), освобождение — `Dispose` (для визуальных — `FreeComponent` + `Dispose`).
  Важно: созданные кодом компоненты **в дизайнере не видны**, поэтому панели, которые нужно
  дорабатывать руками, объявляйте в модуле/дизайнере, а динамику применяйте для массовых/условных
  элементов. Полный рецепт и подводные камни — `REFERENCE.md` §5.28.

- **`SelectedItem` и дескриптор объекта (проверено на стенде).** `SelectedItem` у `ListView`/`MetabaseListView`
  унаследован от `IListView` и имеет тип `IListViewItem` — у него **нет** `ObjectDescriptor`. Запись
  «в лоб» даёт ошибку «Неизвестный идентификатор `ObjectDescriptor`», а привод
  `Item := List.SelectedItem As IMetabaseListViewItem;` **на стенде не сработал** (хотя справка его
  разрешает). Работающие способы:
  ```fore
  // 1) документированные коллекции (рекомендуется) — без приводов:
  Descs := List.SelectedObjects;     // описания выделенных объектов
  Descs := List.CheckedObjects;      // описания объектов, отмеченных флажками
  Desc  := SelectedObjectDescriptor(List);   // обёртка из TaskContainerLib
  // 2) Id по индексу строки (так сделано в рабочем коде проекта):
  Id := List.Items(List.SelectedItem.Index).ColumnText(1);   // 1 — колонка с Id
  Desc := MetabaseClass.Active.ItemById(Id);
  ```
  Готовые обёртки: `SelectedObjectDescriptor`, `CheckedObjectIds`, `SetAllRowsChecked`, `CheckRowsByIds`
  (`Fore/TaskContainerLib.fore`). Отдельная сборка не нужна — `IMetabaseListView` из `ExtCtrls`.
- **`Object` «обрезает» данные — для контролов/интерфейсов берите `Variant`.** Проверено на стенде:
  если хранить компоненты (например, карту «имя → контрол» или элементы списков) в переменных типа
  `Object`, значения теряются и контролы «не работают». Схема: коллекции хранят `Variant`,
  аксессоры принимают/возвращают `Variant`, а к интерфейсу приводим **неявным присваиванием**
  (`Ctl := C;` внутри `Try`). В справке по языку это пример `Sample1` (неявное преобразование
  `Variant → интерфейс`, при невозможности — исключение).
- **Строковые литералы — только двойные кавычки.** `Debug.WriteLine('текст')` — ошибка компиляции,
  нужно `Debug.WriteLine("текст")`; апостроф допустим только внутри `"..."` (так собираются SQL-литералы).
  Линтер (`node tools/fore-lint-check.js Fore`) это проверяет.
- **Объявленный контрол надо создать конструктором.** Если контрол не размещён в дизайнере, поле
  остаётся `Null` и обработчики «молчат»: `X := New Button.Create; X.Parent := Self;`. В шаблонах форм
  это делает `CreateFormComponents` — создаёт только то, чего нет (`If X = Null`), поэтому годится и для
  форм с дизайнером, и для форм «целиком из кода».
- **Фильтр диалога выбора объекта.** `IMetabaseDialogMetaclassFilter.ObjectMetaclass` имеет тип
  `MetabaseObjectMetaclass` (группы классов: `SCHEDULEDTASK_CLASS`, `ETL_CLASS`, …), поэтому
  `ObjectMetaclass := MetabaseObjectClass.KE_CLASS_TASK_CONTAINTER` даёт ошибку
  «Типы 'MetabaseObjectMetaclass' и 'MetabaseObjectClass' не совместимы». Для точного фильтра
  используйте **`IMetabaseDialogClassFilter`**:
  ```fore
  Filter := New MetabaseDialogClassFilter.Create;
  Filter.ObjectClass := MetabaseObjectClass.KE_CLASS_TASK_CONTAINTER;
  Filter.Description := "Контейнер запланированных задач";
  MetabaseEtlOpenDialog.Filters.AddFilter(Filter);
  ```
- **Сводка — в `Memo`, а не в `Label`.** У `Label` нет полос прокрутки, и длинный текст в него не
  влезает. Сводка выводится в `UnavailSummaryMemo`: `Lines.Clear` + `Lines.Add(...)`, а `WordWrap` и
  `ScrollBars` включаются в **Инспекторе** (свойство `ScrollBars` — «наличие полос прокрутки текста»).
  Готовый помощник — `SetMemoLines` в `SchedulerForm.fore` (разбивает строку по CRLF).
- **Таблица плана — `ListView`.** `PlanTable: ListView` даёт колоночное представление
  (`IListViewColumn`: `Caption`, `Width`; у элемента — `ColumnText(i) := ...`). Заголовки 8 колонок
  задаются в **Инспекторе** и берутся из `UnavailPlanColumnCaption(i)` («Задание», «Задание - название»,
  «Бизнес-приложение», «Ответственный», «Плановое Время запуска», «Плановое время окончания»,
  «Длительность», «Дата нового запуска»); вид «таблица/отчёт» включается там же свойством `Style`
  (тип перечисления в справке не документирован). Строки заполняются в `FillPlanTable`:
  `Items.Clear` → `Items.Add(<TASK_ID>)` → `Items.Item(Count - 1)` → `ColumnText(i) := ...`.
- Индексы колонок `MetabaseListView` (`columntext(n)`) зависят от представления: в коде проекта
  колонка 1 — идентификатор, колонка 3 — тип объекта.
- Свойство `MetabaseListView.Root` (и `MetabaseTreeList.Root` — дерево из шаблона убрано) показывает
  содержимое объекта-контейнера, то есть его задачи.
- `Select Case` намеренно не используется: линтер расширения даёт на него ложные срабатывания —
  применены цепочки `If … End If`.
