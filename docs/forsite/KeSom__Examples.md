# KeSom / Examples

> Source: OldDocumentsForsite/KeSom/Examples  (CHM "KeSom"; topics: 4)

Contents:
- 11  Создание объекта собственного класса
- 114  Работа с маской доступа
- 397  Примеры
- 414  Работа с ярлыком

## Создание объекта собственного класса

Создание объекта собственного класса
Для выполнения примера предполагается наличие в репозитории объекта
« Ресурсы » с идентификатором OBJ_RES.
В файловой системе должны содержаться две пиктограммы: C:\Icon_small.ico
и C:\Icon_large.ico.
Добавьте ссылки на системные сборки Metabase, Drawing, IO.
Sub   UserProc;
Var
Mb: IMetabase;
Obj: IMetabaseObject;
CustomClassExtender: IMetabaseCustomExtender;
CustClasses: IMetabaseCustomClasses;
CustomClass: IMetabaseCustomClass;
Operations: IMetabaseCustomClassOperations;
Operation: IMetabaseCustomClassOperation;
CreateInfo: IMetabaseObjectCreateInfo;
Description: IMetabaseObjectDescriptor;
ImgList, ImgList32: IGxImageList;
Icon: IGxIcon;
CustomObject: IMetabaseCustomObject;
se: IMetabaseSecurity;
AL: IAuditLog;
ALogs: IAuditLogons;
AOperat: IAuditOperations;
i: Integer;
Lic: Object;
Begin
Mb := MetabaseClass.Active;
// Создание контейнера пользовательских классов
CreateInfo := Mb.CreateCreateInfo;
CreateInfo.ClassId := MetabaseObjectClass.KE_CLASS_CUSTOM_EXTENDER;
CreateInfo.Name :=   "CUSTOM_EXTENDER"  ;
CreateInfo.Permanent :=   True  ;
CreateInfo.Parent := Mb.Root;
Description := Mb.CreateObject(CreateInfo);
Obj := Description.Edit;
CustomClassExtender := Obj   As   IMetabaseCustomExtender;
ImgList :=   New   GxImageList.Create;
ImgList.Height :=   16  ;
Icon :=   New   GxIcon.CreateFromFile(  "C:\Icon_small.ico"  );
ImgList.AddIcon(Icon);
CustomClassExtender.SmallImages := ImgList;
ImgList32 :=   New   GxImageList.Create;
ImgList32.Height :=   32  ;
Icon :=   New   GxIcon.CreateFromFile(  "C:\Icon_large.ico"  );
ImgList32.AddIcon(Icon);
CustomClassExtender.LargeImages := ImgList32;
CustomClassExtender.IsShared :=   True  ;
CustomClassExtender.Resource := Mb.ItemById(  "OBJ_RES"  ).Bind   As   IResourceObject;
CustomClassExtender.NameResource :=   "ID_CUSTOM_EXTENDER"  ;
// Добавление пользовательского класса в контейнер
CustClasses := CustomClassExtender.Classes;
CustomClass := CustClasses.Add;
CustomClass.Description :=   "Собственный класс"  ;
CustomClass.Id :=   "MY_CLASS"  ;
CustomClass.Name :=   "My_Class"  ;
CustomClass.ImageIndex :=   0  ;
Operations := CustomClass.Operations;
Operation := Operations.Add(  0  );
Operation.Name :=   "Новый метод"  ;
Obj.Save;
// Создание объекта пользовательского класса
CreateInfo.ClassId := CustomClass.ClassId;
CreateInfo.Name :=   "Объект собственного класса"  ;
CreateInfo.Permanent :=   True  ;
CreateInfo.Parent := Mb.Root;
Description := Mb.CreateObject(CreateInfo);
Obj := Description.Edit;
CustomObject := Obj   As   IMetabaseCustomObject;
CustomObject.Extender := CustomClassExtender;
CustomObject.CustomClass := CustomClass;
Obj.Save;
// Проверка прав доступа к операции пользовательского класса.
Lic := MB.RequestLicense(UiLicenseFeatureType.Adm);
se := Mb.Security;
Description.CheckAndAudit(CustomClass.Key,   "Проверка прав доступа к операции"  );
Al := se.OpenAuditLog;
ALogs := AL.OpenLogons(  False  );
AOperat := AL.OpenOperations(ALogs.Session);
For   i :=   0     To     4     Do
Debug.WriteLine(  "Объект: "   + AOperat.ObjectName);
Debug.WriteLine(  "Операция: "   + AOperat.Name);
Debug.WriteLine(  "Успешно выполнена: "   + AOperat.Succeeded.ToString);
Debug.WriteLine(  "Примечание: "   + AOperat.Comment);
Debug.WriteLine(  "--------"  );
AOperat.Next;
End     For  ;
Lic :=   Null  ;
End     Sub   UserProc;
После выполнения примера будет создан контейнер пользовательских классов,
содержащий один класс: My_Class. Для контейнера будет определен идентификатор
строкового ресурса ID_CUSTOM_EXTENDER из ресурсов OBJ_RES. Для класса
будет определена одна операция. В репозитории будет создан объект класса
My_Class. Источником большой пиктограммы для объекта будет файл C:\Icon_large.ico,
маленькой - C:\Icon_small.ico. Для объекта будет проведена проверка прав
доступна на операцию класса, результаты будут записаны в протокол доступа.
Последние пять записей протокола доступа будут выведены в окно консоли.
Примеры  |  IMetabaseCustomExtender
|  IMetabaseCustomClass
|  IMetabaseCustomClassOperation
|  IMetabaseCustomObject
## Работа с маской доступа

Работа с маской доступа
Для раздачи прав доступа на объекты, настройки аудита и ведения истории
в соответствующих свойствах и методах используется  маска
доступа . Данная маска формируется на основе значений перечисления
MetabaseObjectPredefinedRights .
Если для объекта доступны специфические операции, то значение маски дополняется
значениями одного из следующих перечислений:
AuditLogSpecificRights
- специфические операции, доступные для протокола доступа.
CalculatedCubeSpecificRights
- специфические операции, доступные для вычисляемых кубов.
CubeLoaderSpecificRights
- специфические операции, доступные для загрузчика данных в куб.
CubeSpecificRights
- специфические операции, доступные для различных видов кубов.
CustomObjectSpecificRights
- специфические операции, доступные для объектов пользовательских
классов.
DataBaseSpecificRights
- специфические операции, доступные для объекта репозитория - База
данных.
DictionarySpecificRights
- специфические операции, доступные для объектов репозитория - Справочник
НСИ и Составной справочник НСИ.
MDCalcSpecificRights
- специфические операции, доступные для объекта репозитория - Многомерный
расчет на сервере БД.
ProblemSpecificRights
- специфические операции, доступные для объекта контейнера моделирования
- Задача моделирования.
ProcedureSpecificRights
- специфические операции, доступные для объекта репозитория - Процедура.
ScenarioDimensionSpecificRights
- специфические операции, доступные для объекта репозитория - Сценарий
моделирования.
ScheduledTaskSpecificRights
- специфические операции, доступные для задач, создаваемых в контейнере
запланированных задач.
SecuritySpecificRights
- специфические операции, доступные для политики безопасности.
TableSpecificRights
- специфические операции, доступные для следующих объектов репозитория
- Таблица, Представление, Журнал, Присоединенная таблица.
UpdateObjectSpecificRights
- специфические операции, доступные для объекта репозитория - Обновление.
ValidationSpecificRights
- специфические операции, доступные для объекта репозитория - Правило
валидации и Группа валидаций.
При раздаче прав, настройке аудита и истории сформировать значение маски
из значений указанных перечислений не представляет трудности. Для составления
комбинации операций необходимо использовать логическую операцию  Or .
Mask := MetabaseObjectPredefinedRights.Access  Or  MetabaseObjectPredefinedRights.Delete;
Если возникает обратная ситуация, когда по имеющейся маске, необходимо
определить какие операции доступны, то необходимо писать собственную функцию
для разбора значения маски.
Пример 1
Рассмотрим пример разбора маски, возвращаемой методом  GetEffectiveRights .
Значение маски является 4-x байтовым двоичным числом, приведённым в десятичную
форму. Для разбора маски потребуется функция, осуществляющая обратное
преобразование из десятичной формы в двоичную:
Function  DecToBin(Value: Double): String;
Var
i, k: Integer;
Str, Str2: String;
Begin
// Учитываем 32 бит маски,
при наличии которого значение будет отрицательное
If  Value <  0   Then
Str :=  "1" ;
Value := (Value - Integer.MinValue)  As  Double;
k :=  29  - (Math.Trunc(Math.Log(Value,  2 ),  0 )  As  Integer);
For  i :=  0   To  k  Do
Str := Str +  "0" ;
End   For ;
End   If ;
While  Value >  1   Do
k := (Value - ( 2  * Math.Quotient(Value,  2 )))  As  Integer;
Value := Math.Trunc(Value /  2 ,  0 );
Str := Str + k.ToString;
End   While ;
Str := Str + Value.ToString;
For  i :=  0   To  Str.Length -  1   Do
Str2 := Str2 + Str.SubString(Str.Length - i -  1 ,  1 );
End   For ;
Return  Str2;
End   Function  DecToBin;
Данная функция возвращает двоичное число представленное в виде символьной
строки.
Допустим, что в репозитории имеется объект с идентификатором «Obj_1».
В менеджере безопасности платформы создан пользователь «TestUser».
Создадим форму и расположим на ней кнопку. Для кнопки создадим обработчик
события «OnClick» и укажем следующий код:
Sub  Button1OnClick(Sender: Object; Args: IMouseEventArgs);
Var
MB: IMetabase;
MDesc: IMetabaseObjectDescriptor;
SecDesc: ISecurityDescriptor;
Subj: ISecuritySubject;
Rights: Integer;
BinRights: String;
Begin
MB := MetabaseClass.Active;
//Субъект безопасности
Subj := MB.Security.ResolveName( "TestUser" );
//Объект, на который будут определены эффективные права для субъекта безопасности
MDesc := MB.ItemById( "Obj_1" );
SecDesc := MDesc.SecurityDescriptor;
//Получение эффективных прав в десятичном виде
Rights := SecDesc.GetEffectiveRights(Subj);
//Представление эффективных прав в двоичном виде
BinRights := DecToBin(Rights);
End   Sub  Button1OnClick;
При нажатии на кнопку в переменной «Rights» будет содержаться значение,
соответствующее эффективным правам пользователя на указанный объект, представленное
в десятичном виде. В переменной «BinRights» будет это же значение, представленное
в двоичном виде.
Допустим для объекта «Obj_1» доступны только основные и дополнительные
операции и метод вернул следующее значение:
Rights := 114440 и BinRights := 11011111100001000. Каждый бит маски
соответствует одной из операций. Если значение бита « 0 »,
то операция для пользователя не определена (значение по операции не установлено,
либо запрещено). Если значение бита « 1 »,
то операция разрешена для пользователя.
Для сопоставления операций и битов в двоичной маске осуществим обратное
преобразование к десятичному виду каждого бита в отдельности. Преобразование
из двоичной формы в десятичную заключается в возведении числа 2 в степень,
равную номеру бита. Нумерация битов начинается с 0, при этом двоичное
число рассматривается справа налево.
В указанных перечислениях каждое значение, соответствующие какой-либо
операции, также равно определенной степени числа 2 (MetabaseObjectPredefinedRights.All
= 1 = 2^0; MetabaseObjectPredefinedRights.Print = 16384 = 2^14 и т.д.).
Поэтому для проверки битов маски необходимо возвести число 2 в степень,
равную номеру бита, и полученное значение сравнить со значениями в перечислениях.
Для сравнения значений со значениями перечислений реализуем следующую
функцию:
Public   Function  CheckRight(Right: Double): String;
Begin
Select   Case  Right
//Основные права
Case  MetabaseObjectPredefinedRights.All:
Return   "All" ;
Case  MetabaseObjectPredefinedRights.Read:
Return   "Read" ;
Case  MetabaseObjectPredefinedRights.Write:
Return   "Write" ;
Case  MetabaseObjectPredefinedRights.Access:
Return   "Access" ;
Case  MetabaseObjectPredefinedRights.Delete:
Return   "Delete" ;
Case  MetabaseObjectPredefinedRights.ReadDescr:
Return   "ReadDescr" ;
Case  MetabaseObjectPredefinedRights.WriteDescr:
Return   "WriteDescr" ;
Case  MetabaseObjectPredefinedRights.ReadPars:
Return   "ReadPars" ;
Case  MetabaseObjectPredefinedRights.WritePars:
Return   "WritePars" ;
Case  MetabaseObjectPredefinedRights.ReadBody:
Return   "ReadBody" ;
Case  MetabaseObjectPredefinedRights.WriteBody:
Return   "WriteBody" ;
Case  MetabaseObjectPredefinedRights.Create_:
Return   "Create_" ;
//Дополнительные права
Case  MetabaseObjectPredefinedRights.Print:
Return   "Print" ;
Case  MetabaseObjectPredefinedRights.ExportData:
Return   "ExportData" ;
Case  MetabaseObjectPredefinedRights.ImportData:
Return   "ImportData" ;
Else
Return   "Unknown
rights"
End   Select ;
End   Function  CheckRight;
Данная функция по значению операции возвращает ее наименование. Если
передаваемое значение отсутствует среди значений, используемых в перечислении,
то функция вернет «Unknown rights».
Для проверки всех битов маски создадим дополнительную процедуру.
Sub  CheckBits(BinRights: String);
Var
i: Integer;
TwoPower: Double;
c: Char;
Begin
//Проверка битов двоичной маски
//Обратный цикл для просмотра строки справа налево
For  i := BinRights.Length  To   1   Step  -  1   Do
//Т.к. индексация в символьной строке начинается с 0, то уменьшаем текущую позицию на 1
//Это необходимо для корректной работы свойства String.Chars
c := BinRights.Chars(i -  1 );
//Нумерация битов осуществляется справа налево. Для получения номера бита вычитаем
//текущую позицию из общей длины.
//Получаем десятичное значение для соответствующего бита путем возведения 2 в степень,
//равную номеру бита.
TwoPower := Math.Power( 2 , BinRights.Length - i);
//Если значение текущего бита - 1, то операция доступна
//Если значение текущего бита - 0, то операция не определена, либо запрещена
If  c =  '1'   Then
Debug.WriteLine( "Доступная операция: "  + CheckRight(TwoPower));
Else
Debug.WriteLine( "Не определена/Запрещена операция: "  + CheckRight(TwoPower));
End   If ;
End   For ;
End   Sub  CheckBits;
В данной процедуре осуществляется просмотр всей маски справа налево.
В консоль среды разработки будут выведена информация о доступных и неопределенных
операциях.
Остается добавить вызов данной процедуры в обработчик нажатия кнопки:
//...
//Получение эффективных прав в десятичном виде
Rights := SecDesc.GetEffectiveRights(Subj);
//Представление эффективных прав в двоичном виде
BinRights := DecToBin(Rights);
CheckBits(BinRights);
//...
Для указанных выше значений маски (Rights := 114440 и BinRights :=
11011111100001000) в консоль среды разработки будут выведены следующие
значения:
Номер бита: 0 Не определена/Запрещена операция:
All
Номер бита: 1 Не определена/Запрещена операция:
Read
Номер бита: 2 Не определена/Запрещена операция:
Write
Номер бита: 3 Доступная операция: Access
Номер бита: 4 Не определена/Запрещена операция:
Delete
Номер бита: 5 Не определена/Запрещена операция:
Unknown rights
Номер бита: 6 Не определена/Запрещена операция:
Unknown rights
Номер бита: 7 Не определена/Запрещена операция:
Unknown rights
Номер бита: 8 Доступная операция: ReadDescr
Номер бита: 9 Доступная операция: WriteDescr
Номер бита: 10 Доступная операция: ReadPars
Номер бита: 11 Доступная операция: WritePars
Номер бита: 12 Доступная операция: ReadBody
Номер бита: 13 Доступная операция: WriteBody
Номер бита: 14 Не определена/Запрещена операция:
Print
Номер бита: 15 Доступная операция: ExportData
Номер бита: 16 Доступная операция: ImportData
Для 5-7 бита неизвестные значения, потому что они не используются в
перечислении для задания операций.
Функцию «CheckRight» можно легко доработать для проверки специфических
операций, в зависимости от класса объекта.
Пример 2
Рассмотренный выше пример используется для проверки всех битов маски
доступа. Если необходимо проверить наличие прав на какие-либо определенные
операции, то можно использовать более простой способ. Так как маска является
двоичным числом, то для проверки значений битов можно использовать логическую
операцию  And . Если результат будет
отличен от нуля, значит в маске в соответствующем бите установлено значение
« 1 », что соответствует наличию
прав на операцию:
Sub  UserProc;
Var
MB: IMetabase;
MDesc: IMetabaseObjectDescriptor;
SecDesc: ISecurityDescriptor;
Subj: ISecuritySubject;
Rights: Integer;
Begin
MB := MetabaseClass.Active;
//Субъект безопасности
Subj := MB.Security.ResolveName( "TestUser" );
//Объект, на который будут определены эффективные права для субъекта безопасности
MDesc := MB.ItemById( "Obj_1" );
SecDesc := MDesc.SecurityDescriptor;
//Получение эффективных прав в десятичном виде
Rights := SecDesc.GetEffectiveRights(Subj);
//Проверка наличия прав на удаление объекта
If  (Rights  And  MetabaseObjectPredefinedRights.Delete) <>  0   Then
Debug.WriteLine( "Удаление разрешено" );
Else
Debug.WriteLine( "Удаление запрещено" );
End   If ;
End   Sub  UserProc;
Примеры
## Примеры

Примеры
Ниже представлены примеры реализации различных задач программирования
на языке Fore с использованием сборки Metabase .
Краткое описание примеров |
Создание
объекта собственного класса
|
Работа с
маской доступа
|
Работа с ярлыком
|
Интерфейсы сборки Metabase
|  Перечисления
сборки Metabase  |  Классы сборки Metabase
## Работа с ярлыком

Работа с ярлыком
В репозитории платформы реализованы различные классы объектов, имеющие
определенное назначение и выполняющие определенные для них функции.
Также в репозитории имеется такой класс объектов как -  Ярлык .
Ярлык  - это ссылка на существующий
объект какого-либо класса. Ярлык инкапсулирует в себе свойства объекта,
на который он ссылается. При просмотре/редактировании ярлыка будет
открыт соответствующий инструмент платформы или мастер, предназначенный
для редактирования свойств соответствующего объекта.
При работе из языка  Fore
для проверки объекта на соответствие ярлыку можно использовать следующие
свойства:
IMetabaseObjectDescriptor.IsShortcut .
Свойство возвращает значение  True ,
если объект является ярлыком на объект в текущем репозитории;
IMetabaseObjectDescriptor.IsLink .
Свойство возвращает значение  True ,
если объект является ярлыком на объект из другого репозитория.
Класс
ярлыка  будет соответствовать классу объекта, на который он ссылается.
Создание ярлыка
Создание ярлыка осуществляется таким же образом как и создание других
объектов репозитория. Для создания ярлыка необходимо в параметрах
создаваемого объекта свойству  IMetabaseObjectCreateInfo.IsShortcut
установить значение  True ,
а в свойстве  IMetabaseObjectCreateInfo.Shortcut
указать описание объекта, на который будет ссылаться ярлык:
Var
MB: IMetabase;
CrInfo: IMetabaseObjectCreateInfo;
ShortcutDesc: IMetabaseObjectDescriptor;
Begin
MB := MetabaseClass.Active;
CrInfo := MB.CreateCreateInfo;
CrInfo.Id :=  "Shortcut_OBJTEST" ;
CrInfo.Name :=  "Ярлык для OBJTEST" ;
CrInfo.Parent := MB.Root;
CrInfo.Permanent :=  True ;
CrInfo.Shortcut := MB.ItemById( "OBJTEST" );
CrInfo.IsShortcut :=  True ;
ShortcutDesc := MB.CreateObject(CrInfo);
При выполнении примера в корневом каталоге репозитория будет создан
ярлык для объекта «OBJTEST».
Создание ярлыка на объект из другого репозитория
Для создания ярлыка на объект из другого репозитория предварительно
в текущем репозитории необходимо создать объект -  Связь
с репозиторием . После этого в коде в свойстве  IMetabaseObjectCreateInfo.Link
указывается связь с репозиторием, а в свойстве  IMetabaseObjectCreateInfo.Shortcut
описание объекта из другого репозитория. Также в свойстве  IMetabaseObjectCreateInfo.ClassId
необходимо указать класс объекта, для которого создается ярлык:
Var
MB: IMetabase;
CrInfo: IMetabaseObjectCreateInfo;
Link: IMetabaseObject;
LinkInst: IMetabaseLinkInstance;
ObjDesc, ShortcutDesc: IMetabaseObjectDescriptor;
Begin
MB := MetabaseClass.Active;
CrInfo := MB.CreateCreateInfo;
CrInfo.Id :=  "Shortcut_Report_1" ;
CrInfo.Name :=  "Ярлык для Report_1" ;
CrInfo.Parent := MB.Root;
CrInfo.Permanent :=  True ;
Link := MB.ItemById( "Link_Test" ).Bind;
LinkInst := Link.Open( Null )  As  IMetabaseLinkInstance;
ObjDesc := LinkInst.Metabase.ItemById( "OBJTEST" );
CrInfo.Link := Link  As  IMetabaseLink;
CrInfo.ClassId := ObjDesc.ClassId;
CrInfo.Shortcut := ObjDesc;
ShortcutDesc := MB.CreateObject(CrInfo);
При выполнения примера в корневом каталоге репозитория будет создан
ярлык на объект из репозитория, на который настроена связь с репозиторием
«Link_Test».
Редактирование объектов через ярлык
Для редактирования объекта (описания объекта), на который ссылается
ярлык, получите описание ярлыка и вызовите метод  IMetabaseObjectDescriptor.Edit
( IMetabaseObjectDescriptor.EditDescriptor ).
Результат метода приведите к необходимому интерфейсу и измените параметры/структуру
объекта. Например, если исходный объект является справочником НСИ,
то, используя ярлык на него, можно следующим образом изменить наименование
атрибута:
Var
MB: IMetabase;
SHDesc: IMetabaseObjectDescriptor;
Dict: IRdsDictionary;
Begin
MB := MetabaseClass.Active;
SHDesc := MB.ItemById( "SHORTCUT_TO_DICTIONARY" );
Dict := SHDesc.Edit  As  IRdsDictionary;
Dict.Attributes.FindById( "COUNTRY" ).Name := Dict.Attributes.FindById( "Страны мира" ).Name;
(Dict  As  IMetabaseObject).Save;
Если ярлык ссылается на объект из другого репозитория, то редактирование
ярлыка не позволит изменить структуру (описание) объекта в виду имеющихся
особенностей реализации. Для изменения объекта необходимо получить
его описание, открыть на редактирование, внести необходимые изменения
и сохранить. Для этого можно воспользоваться следующим кодом:
Sub  Edit;
Var
MB: IMetabase;
SHDesc, ObjDesc: IMetabaseObjectDescriptor;
Dict: IRdsDictionary;
Begin
MB := MetabaseClass.Active;
SHDesc := MB.ItemById( "SHORTCUT_TO_DICTIONARY" );
ObjDesc := CheckShorcut(SHDesc);
Dict := ObjDesc.Edit  As  IRdsDictionary;
Dict.Attributes.FindById( "COUNTRY" ).Name := Dict.Attributes.FindById( "Страны мира" ).Name +  "1" ;
(Dict  As  IMetabaseObject).Save;
End   Sub  Edit;
Function  CheckShorcut(Desc: IMetabaseObjectDescriptor): IMetabaseObjectDescriptor;
Var
Result: IMetabaseObjectDescriptor;
Begin
//Если ярлык на объект из другого репозитория
If  Desc.IsLink  Then
Desc := Desc.Open( Null ).Object;
End   If ;
//Если ярлык на
объект текущего репозитория, то рекурсивная проверка для
получения описания исходного объекта
If  Desc.IsShortcut  Then
Result := CheckShorcut(Desc.Shortcut);
Else
Result := Desc;
End   If ;
Return  Result;
End   Function  CheckShorcut;
Функция  CheckShorcut  осуществляет
проверку является ли объект ярлыком и рекурсивно доходит до исходного
объекта. После этого она возвращает его описание. Данная функция также
подходит для использования, если возникают случаи, когда ярлык ссылается
на другой ярлык (из текущего или другого репозитория).
Примеры
|  IMetabaseObjectDescriptor.IsShortcut
|  IMetabaseObjectDescriptor.IsLink
