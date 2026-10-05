# KeFore / Samples

> Source: OldDocumentsForsite/KeFore — копия/Samples  (CHM "KeFore"; topics: 6)

Contents:
- 13  Примеры
- 42  Создание документа
- 64  Создание контейнера запланированных задач
- 84  Создание задачи в контейнере запланированных задач
- 125  Выполнения задачи контейнера запланированных задач
- 147  История выполнения задачи контейнера запланированных задач

## Примеры

Примеры
Ниже представлены примеры реализации различных задач программирования
на языке Fore с использованием сборки Fore.
Краткое описание примеров |
Документ
|
Создание
документа
|
Контейнер запланированных
задач
|
Создание
контейнера запланированных задач
|
Создание
задачи в контейнере запланированных задач
|
Выполнение
задачи контейнера запланированных задач
|
История
выполнения задачи контейнера запланированных задач
|
Интерфейсы сборки Fore
|  Перечисления
сборки Fore  |  Классы сборки Fore
## Создание документа

Создание документа
Для выполнения примера предполагается наличие файла "Icons_1.bmp", содержащего набор пиктограмм.
Sub  Main;
Var
MB: IMetabase;
CrInfo: IMetabaseObjectCreateInfo;
Doc: IDocument;
Begin
MB := MetabaseClass.Active;
CrInfo := MB.CreateCreateInfo;
CrInfo.ClassID := MetabaseObjectClass.KE_CLASS_DOCUMENT;
CrInfo.Id := "NewDocument";
CrInfo.Name := "Документ с пиктограммами";
CrInfo.Parent := MB.Root;
Doc := MB.CreateObject(CrInfo).Edit  As  IDocument;
Doc.LoadFromFile("c:\Icons_1.bmp");
(Doc  As  IMetabaseObject).Save;
End Sub  Main;
После выполнения примера в корневом каталоге будет создан новый объект Документ. Данный документ будет содержать в себе графический файл "Icons_1.bmp". В дальнейшем может использоваться для подключения в компоненте GlobalImageList.
Примеры
## Создание контейнера запланированных задач

Создание контейнера запланированных задач
Sub  Main;
Var
MB: IMetabase;
CrInfo: IMetabaseObjectCreateInfo;
MObj: IMetabaseObject;
Begin
MB := MetabaseClass.Active;
CrInfo := MB.CreateCreateInfo;
CrInfo.ClassID := MetabaseObjectClass.KE_CLASS_TASK_CONTAINTER;
CrInfo.Id := "NewSTCont";
CrInfo.Name := "Новый контейнер запланированных задач";
CrInfo.Parent := MB.Root;
MObj := MB.CreateObject(CrInfo).Edit;
MObj.Save;
End Sub  Main;
После выполнения примера в корневом каталоге репозитория будет создан новый контейнер запланированных задач.
Примеры
## Создание задачи в контейнере запланированных задач

Создание задачи в контейнере запланированных задач
Рассмотрим пример создания задачи, осуществляющей выполнения модуля.
Для выполнения примера предполагается наличие в репозитории контейнера запланированных задач с идентификатором "NewSTCont" и модуля с идентификатором "Module_1". В модуле имеется процедура "Main".
Sub  Main;
Var
MB: IMetabase;
CrInfo: IMetabaseObjectCreateInfo;
MObj: IMetabaseObject;
Exe: IExecuteSubScheduledTask;
Period: IScheduledTaskPeriodWeekly;
Prop: IScheduledTaskProperties;
Begin
MB := MetabaseClass.Active;
CrInfo := MB.CreateCreateInfo;
CrInfo.ClassID := MetabaseObjectClass.KE_CLASS_TASK_EXECUTESUB;
CrInfo.Id := "Task_module_execute";
CrInfo.Name := "Выполнение модуля";
CrInfo.Parent := MB.ItemById("NewSTCont");
MObj := MB.CreateObject(CrInfo).Edit;
Exe := MObj  As  IExecuteSubScheduledTask;
Exe.Assembly := (MB.ItemById("Module_1").Bind  As  IModule).Assembly;
Exe.SubName := "Main";
Prop := Exe.Properties;
Period := Prop.CreatePeriod(ScheduledTaskPeriodType.Weekly)  As  IScheduledTaskPeriodWeekly;
Period.DaysOfWeek(CalendarDayOfWeek.Monday) :=  True ;
Period.DaysOfWeek(CalendarDayOfWeek.Wednesday) :=  True ;
Period.DaysOfWeek(CalendarDayOfWeek.Friday) :=  True ;
Period.StartTime := DateTime.ComposeTimeOfDay(12, 0, 0, 0);
Prop.Period := Period;
MObj.Save;
End Sub  Main;
После выполнения примера в контейнере запланированных задач будет создана новая задача выполнения модуля. Модуль будет запускаться по понедельникам, средам и пятницам в "12:00".
Более подробную информацию по работе с различными задачами можно найти в описании следующих интерфейсов:
ICalculateCubeScheduledTask  - задача расчета вычисляемого куба.
ICalculateReportScheduledTask  - задача вычисления регламентного отчета.
IExecuteSubScheduledTask  - задача выполнения модуля.
IExecuteEtlScheduledTask  - задача выполнения задачи Etl.
ICalculateModelScheduledTask  - задача расчета задачи моделирования.
Примеры
## Выполнения задачи контейнера запланированных задач

Выполнения задачи контейнера запланированных задач
Для выполнения примера предполагается наличие в репозитории контейнера запланированных задач с идентификатором "NewSTCont".
Sub  Main;
Var
MB: IMetabase;
Cont: IScheduledTasksContainer;
Tasks: IMetabaseObjectDescriptors;
Task: IScheduledTask;
Invoke: IScheduledInvoke;
i: Integer;
Begin
MB := MetabaseClass.Active;
Cont := MB.ItemById("NewSTCont").Bind  As  IScheduledTasksContainer;
Tasks := Cont.Tasks;
Task := Tasks.Item(0).Bind  As  IScheduledTask;
Invoke := Task.CreateInvokeEvent(DateTime.Now);
Invoke.Invoke(MB);
End Sub  Main;
После выполнения примера будет создано событие выполнения первой задачи контейнера запланированных задач. Данное событие будет выполнено. В историю будет добавлена запись с учетом текущей даты и времени.
Примеры
## История выполнения задачи контейнера запланированных задач

История выполнения задачи контейнера запланированных задач
Для выполнения примера предполагается наличие в репозитории контейнера запланированных задач с идентификатором "NewSTCont".
Sub  Main;
Var
MB: IMetabase;
Cont: IScheduledTasksContainer;
Tasks: IMetabaseObjectDescriptors;
Task: IScheduledTask;
Results: IScheduledTaskResults;
Result: IScheduledTaskResult;
i: Integer;
Begin
MB := MetabaseClass.Active;
Cont := MB.ItemById("NewSTCont").Bind  As  IScheduledTasksContainer;
Tasks := Cont.Tasks;
Task := Tasks.Item(0).Bind  As  IScheduledTask;
Results := Task.GetResults;
For  i := 0  To  Results.Count - 1  Do
Result := Results.Item(i);
Debug.Write(Result.StartDateTime.ToString + " | ");
Debug.Write(Result.FinishDateTime.ToString + " | ");
If  Result.Succeeded  Then
Debug.WriteLine("Завершена успешно");
Else
Debug.WriteLine("Завершена с ошибкой");
End If ;
End For ;
End Sub  Main;
После выполнения примера в консоль среды разработки будет выведена история выполнения первой задачи контейнера запланированных задач. Будет выведена дата и время начала и завершения выполнения задачи, а так же результат выполнения (Завершена успешно/с ошибкой).
Примеры
