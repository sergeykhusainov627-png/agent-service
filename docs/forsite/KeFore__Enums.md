# KeFore / Enums

> Source: OldDocumentsForsite/KeFore — копия/Enums  (CHM "KeFore"; topics: 27)

Contents:
- 34  AccessSpecificatorKind
- 67  AppServerState
- 89  CalendarMonth
- 125  CalendarWeekOfMonth
- 150  EtlTemplateType
- 175  ForeClassType
- 198  ForeMethodType
- 216  ForeResultType
- 257  ForeSubType
- 281  ForeThreadState
- 302  Перечисления сборки Fore
- 450  RepositoryDriverType
- 515  RepositoryOperationType
- 549  RepositoryType
- 570  RepsitoryScriptInitError
- 604  ResourceImportLogState
- 622  ResourceImportType
- 647  ScheduledAlertAuditResult
- 670  ScheduledTaskAlertType
- 692  ScheduledTaskCheckerType
- 711  ScheduledTaskMailTarget
- 742  ScheduledTaskPeriodType
- 767  ScheduledTaskState
- 795  SharedEventHandlerType
- 810  STValidationCheckerConditionType
- 831  TaskPeriodOneTimeStartMode
- 853  UiMetabaseObjectOperationMode

## AccessSpecificatorKind

AccessSpecificatorKind
Описание
Перечисление  AccessSpecificatorKind
содержит список модификаторов доступа, доступных в языке Fore.
Используется следующими свойствами и методами:
IForeClass.ClassAccessSpecificatorKind ;
IForeSub.SubAccessSpecificatorKind .
Возможные значения
Значение |
Краткое описание |
0 |
Private_ . Конструкция
доступна только в контексте его объявления. |
1 |
Protected_ . Конструкция
доступна внутри класса/интерфейса, а также во всех классах/интерфейсах,
производных от данного. |
2 |
Public_ . Конструкция
доступна в любом месте текущего кода, во всех модулях/формах сборки,
а также там, где текущая сборка подключена по ссылке. |
3 |
Friend_ . Конструкция
доступна в любом месте кода текущей сборки. Конструкции с модификатором
Friend  будут недоступны во внешних сборках. |
4 |
ProtectedFriend . Конструкция
доступна в текущей сборке, а также из класса/интерфейса, производного
от данного, но находящегося в другой сборке. |
Перечисления
сборки Fore
## AppServerState

AppServerState
Описание
Перечисление  AppServerState
содержит возможные состояния планировщика задач.
Используется следующим методом:
IAppServerClass.Refresh .
Возможные значения
Значение |
Краткое описание |
0 |
Unknown . Не опознанное
состояние планировщика задач. Возможно планировщик задач не запущен. |
1 |
Running . Планировщик
задач запущен. |
3 |
Refreshed . Были обновлены
настройки запущенного планировщика задач. |
Перечисления
сборки Fore
## CalendarMonth

CalendarMonth
Описание
Перечисление  CalendarMonth  содержит
месяцы, по которым необходимо установить признак расчета.
Используется следующим свойством:
IScheduledTaskPeriodMonthly.Months .
Возможные значения
Значение |
Краткое описание |
1 |
January . Январь. |
2 |
February . Февраль. |
3 |
March . Март. |
4 |
April . Апрель. |
5 |
May . Май. |
6 |
June . Июнь. |
7 |
July . Июль. |
8 |
August . Август. |
9 |
September . Сентябрь. |
10 |
October . Октябрь. |
11 |
November . Ноябрь. |
12 |
December . Декабрь. |
Перечисления сборки Fore
## CalendarWeekOfMonth

CalendarWeekOfMonth
Описание
Перечисление  CalendarWeekOfMonth
содержит недели месяца, в которых будет производиться расчет.
Используется следующим свойством:
IScheduledTaskPeriodMonthly.WeekOfMonth .
Возможные значения
Значение |
Краткое описание |
0 |
None . Неделя не установлена. |
1 |
First . Первая неделя. |
2 |
Second . Вторая неделя. |
3 |
Third . Третья неделя. |
4 |
Fourth . Четвертая неделя. |
5 |
Last . Последняя неделя
месяца. |
Перечисления сборки Fore
## EtlTemplateType

EtlTemplateType
Описание
Перечисление  EtlTemplateType
используется для определения типа пользовательского шаблона в задаче ETL.
Используется следующими свойствами:
ISharedParams.EtlTemplates ;
IEtlTemplate.Type .
Возможные значения
Значение |
Краткое описание |
1 |
Provider . Шаблон для
пользовательского источника. |
2 |
Consumer . Шаблон для
пользовательского приёмника. |
3 |
Transformer . Шаблон
для пользовательского преобразователя. |
4 |
CodeBlock . Шаблон для
пользовательской процедуры. |
Перечисления сборки Fore
## ForeClassType

ForeClassType
Описание
Перечисление  ForeClassType  содержит
типы конструкций, которые могут использоваться в Fore для написания кода
приложений.
Используется следующими свойствами и методами:
IForeClass.ClassType .
Возможные значения
Значение |
Краткое описание |
0 |
Class_ . Класс. |
1 |
Enum_ . Перечислимый
тип. |
2 |
Interface_ . Интерфейс. |
3 |
Sub_ . Процедура/функция. |
Перечисления
сборки Fore
## ForeMethodType

ForeMethodType
Описание
Перечисление  ForeMethodType
содержит типы пользовательского метода.
Используется следующим свойством:
IForeMethod.Type .
Возможные значения
Значение |
Краткое описание |
0 |
Arithmetic . Арифметический. |
1 |
Pointwise . Поточечный. |
2 |
Serie . Векторный. |
Перечисления сборки Fore
## ForeResultType

ForeResultType
Описание
Перечисление  ForeResultType
содержит типы данных возвращаемого результата.
Используется следующими свойствами и методами:
IBaseMethod.ResultType ;
IForeMethodParam.Type .
Возможные значения
Значение |
Краткое описание |
0 |
Unknown . Не установлен. |
1 |
Char . Один символ Unicode. |
2 |
String . Символьная
строка. |
3 |
Integer . Целое число. |
4 |
Real . Вещественное
число. |
5 |
Date . Дата и время. |
6 |
Boolean . Логический
тип данных. |
7 |
Matrix . Матрица. |
8 |
Variant . Тип данных
Variant. |
9 |
Object . Пользовательский
объект (может содержать любой тип данных). |
10 |
RealArray . Массив вещественных
чисел. |
Перечисления сборки Fore
## ForeSubType

ForeSubType
Описание
Перечисление  ForeSubType  содержит
типы структуры метода в коде.
Используется следующими свойствами и методами:
IForeSub.SubType .
Возможные значения
Значение |
Краткое описание |
0 |
Unknown . Тип структуры
метода не определен. |
1 |
Sub_ . Процедура. |
2 |
Function_ . Функция. |
3 |
Delegate_ . Делегат. |
Для получения подробной информации обратитесь к разделам « Процедуры
и функции » и « Делегаты и события ».
Перечисления
сборки Fore
## ForeThreadState

ForeThreadState
Описание
Перечисление  ForeThreadState
содержит возможные состояния потока.
Используется следующими свойствами и методами:
IForeThread.State .
Возможные значения
Значение |
Краткое описание |
0 |
Unstarted . Поток создан,
но не запущен. |
1 |
Running . Поток выполняется. |
2 |
Stopped . Поток отработал,
можно запустить повторно. |
Перечисления
сборки Fore
## Перечисления сборки Fore

Перечисления сборки Fore
|
Перечисление |
Краткое описание |
|
AccessSpecificatorKind
|
Перечисление  AccessSpecificatorKind
содержит список модификаторов доступа, доступных в языке Fore. |
|
AppServerState
|
Перечисление  AppServerState
содержит возможные состояния планировщика задач. |
|
CalendarMonth
|
Перечисление  CalendarMonth
содержит месяцы, по которым необходимо установить признак расчета. |
|
CalendarWeekOfMonth
|
Перечисление  CalendarWeekOfMonth
содержит недели месяца, в которых будет производиться расчет. |
|
EtlTemplateType
|
Перечисление  EtlTemplateType
используется для определения типа пользовательского шаблона в
задаче ETL. |
|
ForeClassType
|
Перечисление  ForeClassType
содержит типы конструкций, которые могут использоваться в Fore
для написания кода приложений. |
|
ForeMethodType
|
Перечисление  ForeMethodType
содержит типы пользовательского метода. |
|
ForeResultType
|
Перечисление  ForeResultType
содержит типы данных возвращаемого результата. |
|
ForeSubType
|
Перечисление  ForeSubType
содержит типы структуры метода в коде. |
|
ForeThreadState
|
Перечисление  ForeThreadState
содержит возможные состояния потока. |
|
RepositoryDriverType
|
Перечисление  RepositoryDriverType
содержит список драйверов, которые могут использоваться для работы
с репозиторием платформы. |
|
RepositoryOperationType
|
Перечисление  RepositoryOperationType
содержит тип операций, которые можно применить к репозиторию. |
|
RepositoryType
|
Перечисление  RepositoryType
содержит типы репозиториев, с которыми можно работать в платформе. |
|
RepsitoryScriptInitError
|
Перечисление  RepsitoryScriptInitError
содержит список ошибок, которые могут возникнуть при создании/обновлении
репозитория. |
|
ResourceImportLogState
|
Перечисление  ResourceImportLogState
содержит статусы импорта строки ресурсов. |
|
ResourceImportType
|
Перечисление  ResourceImportType
содержит режимы импорта ресурсов. |
|
ScheduledAlertAuditResult
|
Перечисление  ScheduledAlertAuditResult
используется для  определения  типа результата выполнения
задачи. |
|
ScheduledTaskAlertType
|
Перечисление  ScheduledTaskAlertType
используется для определения  типа  события. |
|
ScheduledTaskCheckerType
|
Перечисление  ScheduledTaskCheckerType
используется для определения типа условия выполнения  задачи.  |
|
ScheduledTaskMailTarget
|
Перечисление  ScheduledTaskMailTarget
содержит воды адресов электронной почты, на которые может быть
отправлен результат выполнения задач. |
|
ScheduledTaskPeriodType
|
Перечисление  ScheduledTaskPeriodType
содержит виды периода, в котором будет производиться расчет задачи. |
|
ScheduledTaskState
|
Перечисление  ScheduledTaskState
содержит список текущих состояний задачи в контейнере запланированных
задач. |
|
SharedEventHandlerType
|
Перечисление  SharedEventHandlerType
используется для определения типа отчетов, использующих обработчик
событий. |
|
STValidationCheckerConditionType
|
Перечисление  STValidationCheckerConditionType
используется для определения  типа  исключений. |
|
TaskPeriodOneTimeStartMode
|
Перечисление  TaskPeriodOneTimeStartMode
содержит периоды, когда будет производиться одноразовый запуск
задачи. |
|
UiMetabaseObjectOperationMode
|
Перечисление  UiMetabaseObjectOperationMode
содержит режимы подключения объекта. |
Интерфейсы сборки Fore
|  Классы
сборки Fore  |  Примеры
## RepositoryDriverType

RepositoryDriverType
Описание
Перечисление  RepositoryDriverType
содержит список драйверов, которые могут использоваться для работы с репозиторием
платформы.
Используется следующим свойством:
IRepositoryScriptManager.Driver .
Возможные значения
Значение |
Краткое описание |
0 |
Unknown . Неизвестный
тип драйвера. |
1 |
ORCL . Оracle 7.x\8.x.
Примечание .
Значение не предназначено для использования в прикладном коде.
Оставлено для совместимости с предыдущими версиями.
|
2 |
ORCL9 . Оracle 11.x\12.x. |
3 |
MSSQL . Мicrosoft SQL
Server 6.x\7.x\2000.
Примечание .
Значение не предназначено для использования в прикладном коде.
Оставлено для совместимости с предыдущими версиями.
|
4 |
MSSQL2005 . Microsoft
SQL Server 2005.
Примечание .
Значение не предназначено для использования в прикладном коде.
Оставлено для совместимости с предыдущими версиями.
|
5 |
DB2 . DB2.
Примечание .
Значение не предназначено для использования в прикладном коде.
Оставлено для совместимости с предыдущими версиями.
|
6 |
MSSQL2008 . Microsoft
SQL Server 2008. |
7 |
MSSQL2012 . Microsoft
SQL Server 2012\2014\2016\2017. |
8 |
Postgres . PostgreSQL
9.5\9.6\10.x\11.x\12.x\13.x. Postgres Pro 9.5\9.6\10.x\11.x\12.x\13.x. |
9 |
Teradata . Teradata
15\15.10\16. |
10 |
SQLite . SQLite 3.35.5. |
11 |
Vertica . HP Vertica.
Примечание .
Значение не предназначено для использования в прикладном коде.
Оставлено для совместимости с предыдущими версиями.
|
Перечисления
сборки Fore
## RepositoryOperationType

RepositoryOperationType
Описание
Перечисление  RepositoryOperationType
содержит тип операций, которые можно применить к репозиторию.
Используется следующим свойством:
IRepositoryScriptManager.Operation .
Возможные значения
Значение |
Краткое описание |
0 |
Unknown . Неизвестная
операция. |
1 |
Create . Создание репозитория/репозитория
НСИ. |
2 |
Update . Обновление
репозитория/репозитория НСИ. |
3 |
CreateArchive . Создание
архива со скриптами для создания/обновления репозитория.
Примечание .
Значение не предназначено для использования в прикладном коде.
|
4 |
UnpackArchive . Распаковка
архива со скриптами для создания/обновления репозитория.
Примечание .
Значение не предназначено для использования в прикладном коде.
|
Перечисления
сборки Fore
## RepositoryType

RepositoryType
Описание
Перечисление  RepositoryType
содержит типы репозиториев, с которыми можно работать в платформе.
Используется следующим свойством:
IRepositoryScriptManager.Repository .
Возможные значения
Значение |
Краткое описание |
0 |
Unknown . Неопределенный
тип репозитория. |
1 |
Metabase . Основной
репозиторий платформы. |
2 |
RDS . Репозиторий НСИ. |
Перечисления
сборки Fore
## RepsitoryScriptInitError

RepsitoryScriptInitError
Описание
Перечисление  RepsitoryScriptInitError
содержит список ошибок, которые могут возникнуть при создании/обновлении
репозитория.
Используется следующим методом:
IRepositoryScriptCallback.OnStart .
Возможные значения
Значение |
Краткое описание |
0 |
None . Ошибки отсутствуют. |
1 |
NoTables . В указанной
базе нет таблиц репозитория. |
2 |
TablesAlreadyExist .
В указанной базе уже есть таблицы репозитория. |
3 |
EmptyRepository . Пустой
репозиторий для обновления. |
4 |
CannotUpdateVers . Текущую
версию репозитория обновить нельзя. |
5 |
UnicodeMismatch . Несоответствие
юникод версии репозитория в базе и в указанном файле обновления. |
6 |
Unknown . Неопознанная
ошибка. |
Перечисления
сборки Fore
## ResourceImportLogState

ResourceImportLogState
Описание
Перечисление  ResourceImportLogState
содержит статусы импорта строки ресурсов.
Используется следующим свойством:
IResourceImporterLog.State .
Возможные значения
Значение |
Краткое описание |
0 |
Added . Строка добавлена. |
1 |
Updated . Строка обновлена. |
2 |
Missing . Строка пропущена. |
Перечисления сборки Fore
## ResourceImportType

ResourceImportType
Описание
Перечисление  ResourceImportType
содержит режимы импорта ресурсов.
Используется следующим свойством:
IResourceImporter.Method .
Возможные значения
Значение |
Краткое описание |
0 |
OnlyAdd . Добавлять
только новые. Импортироваться будут только элементы, отсутствующие
в текущих ресурсах. |
1 |
UpdateAndAdd . Добавлять
новые и обновлять существующие. Импортироваться будут элементы,
отсутствующие в текущих ресурсах, значения существующих элементов
будут обновлены. |
2 |
OnlyUpdate . Только
обновлять существующие. Будут обновлены только значения существующих
элементов ресурсов. |
Перечисления сборки Fore
## ScheduledAlertAuditResult

ScheduledAlertAuditResult
Описание
Перечисление  ScheduledAlertAuditResult
используется для определения типа результата выполнения задачи.
Используется следующими свойствами:
IScheduledTaskAuditAlert.Result ;
ISheduledAuditEvent.Result .
Возможные значения
Значение |
Краткое описание |
-1 |
None . Любой результат
выполнения задачи. |
0 |
Failed . Результат выполнения
задачи «неуспешно». |
1 |
Succeeded . Результат
выполнения задачи «успешно». |
Перечисления
сборки Fore
## ScheduledTaskAlertType

ScheduledTaskAlertType
Описание
Перечисление  ScheduledTaskAlertType
используется для определения типа события.
Используется следующими свойствами и методами:
IScheduledTaskAlert.Type ;
IScheduledTaskAlerts.Add .
Возможные значения
Значение |
Краткое описание |
0 |
None . Не задано. |
1 |
Audit . По наступлению
системного события. |
2 |
Custom . По наступлению
настраиваемого события. |
Перечисления
сборки Fore
## ScheduledTaskCheckerType

ScheduledTaskCheckerType
Описание
Перечисление  ScheduledTaskCheckerType
используется для определения типа условия выполнения задачи.
Используется следующими свойствами и методами:
IScheduledTask.CreateChecker ;
IScheduledTaskChecker.Type .
Возможные значения
Значение |
Краткое описание |
0 |
Module . Модуль. |
1 |
Validation . Правило
валидации. |
Перечисления
сборки Fore
## ScheduledTaskMailTarget

ScheduledTaskMailTarget
Описание
Перечисление  ScheduledTaskMailTarget
содержит виды адресов электронной почты, на которые может быть отправлен
результат выполнения задач.
Используется следующими свойствами и методами:
IScheduledTaskProperties.MailTargetType .
Возможные значения
Значение |
Краткое описание |
0 |
Default_ . Электронная
почта, установленная для пользователя по умолчанию. Данная почта
указывается в свойстве  Email
профиля пользователя. |
1 |
Mobile . Мобильная электронная
почта пользователя. Данная почта указывается в свойстве  Mobile
профиля пользователя. |
2 |
Personal . Личная электронная
почта пользователя. Данная почта указывается в свойстве   Personal
профиля пользователя. |
4 |
Work . Рабочая электронная
почта пользователя. Данная почта указывается в свойстве  Working
профиля пользователя. |
Перечисления
сборки Fore
## ScheduledTaskPeriodType

ScheduledTaskPeriodType
Описание
Перечисление  ScheduledTaskPeriodType
содержит виды периода, в котором будет производиться расчет задачи.
Используется следующими свойствами и методами:
IScheduledTaskPeriod.Type ;
IScheduledTaskProperties.CreatePeriod .
Возможные значения
Значение |
Краткое описание |
0 |
None . Период не задан. |
1 |
Daily . Ежедневно. |
2 |
Weekly . Еженедельно. |
3 |
Monthly . Ежемесячно. |
4 |
OneTimeOnly . Одноразово. |
5 |
Timely . Временной интервал. |
Перечисления сборки Fore
## ScheduledTaskState

ScheduledTaskState
Описание
Перечисление  ScheduledTaskState
содержит список текущих состояний задачи в контейнере запланированных
задач.
Используется следующим свойством:
IScheduledTask.State .
Возможные значения
Значение |
Краткое описание |
0 |
Inactive  . З адача
не активна. |
1 |
Ready  . З адача
готова к выполнению. |
2 |
Executing  . З адача
выполняется в данный момент времени. |
3 |
Succeeded  . З адача
выполнена удачно. |
4 |
Failed  . З адача
выполнена с ошибкой. |
Перечисления сборки Fore
## SharedEventHandlerType

SharedEventHandlerType
Описание
Перечисление  SharedEventHandlerType
используется для определения типа отчетов, использующих обработчик событий.
Используется следующими свойством:
ISharedEventHandlers.EventHandler
Возможные значения
Значение |
Краткое описание |
1 |
ExpressReport . Экспресс-отчеты. |
Перечисления
сборки Fore
## STValidationCheckerConditionType

STValidationCheckerConditionType
Описание
Перечисление  STValidationCheckerConditionType
используется для определения типа исключений.
Используется следующим свойством:
IScheduledTaskValidationChecker.Condition .
Возможные значения
Значение |
Краткое описание |
0 |
Equal . Равно. |
1 |
Less . Меньше. |
2 |
More . Больше. |
3 |
Inequal . Не равно. |
Перечисления
сборки Fore
## TaskPeriodOneTimeStartMode

TaskPeriodOneTimeStartMode
Описание
Перечисление  TaskPeriodOneTimeStartMode
содержит периоды, когда будет производиться одноразовый запуск задачи.
Используется следующим свойством:
IScheduledTaskPeriodOneTimeOnly.StartMode .
Возможные значения
Значение |
Краткое описание |
0 |
Queued . В порядке очереди. |
1 |
Immediate . Немедленно. |
2 |
ByTime . В указанное
время. |
3 |
OnLogon . При открытии
репозитория. |
Перечисления сборки Fore
## UiMetabaseObjectOperationMode

UiMetabaseObjectOperationMode
Описание
Перечисление  UiMetabaseObjectOperationMode
содержит режимы подключения объекта.
Используется следующим свойством:
IUiMetabaseObject.OperationMode .
Возможные значения
Значение |
Краткое описание |
0 |
Open . Подключение объекта
без возможности сохранения изменений. В данном режиме будет возможность
редактирования всех параметров и данных объекта, но не будет возможности
сохранения изменений в исходный объект. Можно сохранить только
копию объекта. |
1 |
Edit . Режим редактирования
объекта. В данном режиме будет возможность редактирования всех
параметров и данных объекта, с возможностью сохранения внесенных
изменений. |
2 |
External . Загрузка
в компонент уже имеющегося экземпляра объекта без его переоткрытия.
Загрузка осуществляется путем указания открытого экземпляра объекта
в свойстве  Instance . |
Примечание .
Режим  Open  предназначен для работы
с объектами, на которые у пользователя есть права на просмотр, но нет
прав на изменение.
Перечисления сборки Fore
