# KeSom / Class

> Source: OldDocumentsForsite/KeSom/Class  (CHM "KeSom"; topics: 27)

Contents:
- 34  AccessAttributeValue.Create
- 79  AccessAttributeValue
- 120  AuditFiltersContainer
- 173  ForeMetabaseCustomEvents
- 193  Классы сборки Metabase
- 295  MbElementDependencyTemplateClass.Create
- 356  MbElementDependencyTemplateClass.CreateByDictionary
- 404  MbElementDependencyTemplateClass.CreateByElement
- 451  MbElementDependencyTemplateClass.CreateByObject
- 505  MbElementDependencyTemplateClass
- 571  MbElementDependentTemplateClass.Create
- 629  MbElementDependentTemplateClass.CreateByDictionary
- 687  MbElementDependentTemplateClass.CreateByElement
- 742  MbElementDependentTemplateClass.CreateByObject
- 799  MbElementDependentTemplateClass
- 873  MetabaseClass
- 906  MetabaseCustomForeEvent.Create
- 920  MetabaseCustomForeEvent
- 955  MetabaseLogonEvents
- 971  MetabaseManagerFactory
- 986  MetabaseSid
- 1008  OperationCallback
- 1024  SecuritySnapshotCallback
- 1044  StandardSecurityPackage
- 1103  SysLogSettings
- 1152  UpdateEvents
- 1188  UpdateProgress

## AccessAttributeValue.Create

AccessAttributeValue.Create
Синтаксис
Create(BitCount: Integer; Value: Variant);
Параметры
BitCount  - количество субъектов доступа, для которых могут быть определены права;
Value  - маска доступа. Значение маски задается 4-x байтовым двоичным числом. Каждый символ двоичного числа определяет разрешение на соответствующее действие определенному субъекту безопасности:
0 - действие запрещено;
1 - действие разрешено.
Номер бита соответствует порядку следования субъектов в списке на вкладке « Субъекты доступа », если нумерацию начинать с нуля. Нумерация приведена справа налево.
Значение маски |
... 1 1 1 0 1 1 0 |
Порядок следования субъектов в списке |
... 7 6 5 4 3 2 1 |
Значение маски, приведенной к десятичному виду |
118 |
Маска может быть задана в числовом и символьном виде. Для задания в числовом виде двоичное число должно быть приведено к десятичному виду. Для задания в символьном виде вся маска разбивается на группы по 32 бита, затем каждая группа преобразовывается к десятичному числу. К каждому полученному десятичному числу должны быть добавлены пробелы, таким образом, чтобы получилось 12 символов. Из полученных подстрок составляется полная строка. Рассмотрим следующий пример. Значение маски в двоичном виде (34 бита): 1010101010101010101010101010101010. Для задания в строковом виде необходимо разбить строку на группы: 10101010101010101010101010101010 и 10. Каждую группу приводим к десятичному виду: 2863311530 и 2. Затем дополняем группы пробелами: "2863311530  " и "2           ". Значение строки, которое должно быть передано параметру Value: "2863311530  2           ".
Описание
Метод  Create  создает атрибут доступа.
Пример
Для выполнения примера в схеме должен существовать репозиторий НСИ с идентификатором «RDS» и справочник НСИ с идентификатором «Dict_1». Для справочника НСИ в списке субъектов доступа должны присутствовать 4 пользователя/группы.
Sub  UserProc;
Var
MB : IMetabase;
Object : IMetabaseObjectDescriptor;
AOS : IAccessObjectSecurity;
Iterator : IAccessElementsIterator;
level : integer;
element : IAccessElement;
AttributeValue : IAccessAttributeValue;
Begin
MB := MetabaseClass.Active;
Object := MB.ItemByIdNamespace("Dict_1", MB.ItemById("RDS").Key);
AOS := Object.GetSecurity;
Iterator := AOS.GetElements;
Level := Iterator.Next;
element := Iterator.Current;
element := element.Edit;
AttributeValue :=  New  AccessAttributeValue.Create(32,"12          "); // значение маски задано в строковом виде
element.AttributeAccess(AccessElementAttributes.Read) := AttributeValue;
element.Apply(AccessElementApplyOptions.ByHierarhy  Or  AccessElementApplyOptions.ByLevel);
End Sub  UserProc;
После выполнения примера будут изменены права доступа на чтение для первого элемента, всех его дочерних и для элементов, расположенных на одном уровне с первым. Для первых двух субъектов безопасности доступ к данным элементам будет запрещен. Задание маски в числовом виде приведено в примере для  IAccessElement.Apply .
AccessAttributeValue
## AccessAttributeValue

AccessAttributeValue
Описание
Класс  AccessAttributeValue  предназначен для создания атрибута доступа.
Конструкторы
|
Имя конструктора |
Краткое описание |
|
Create  |
Конструктор  Create  создает атрибут доступа. |
Свойства, унаследованные от  IAccessAttributeValue
|
Имя свойства |
Краткое описание |
|
BitCount
|
Свойство  BitCount  возвращает
количество субъектов безопасности, для которых могут быть определены
права. |
|
ToInteger
|
Свойство  ToInteger
возвращает число в десятичном виде, соответствующее битовой маске
доступа. |
|
ToString
|
Свойство  ToString  возвращает
строку, соответствующую битовой маске доступа. |
|
Value
|
Свойство  Value  определяет
значение права доступа. При значении  True
соответствующие права имеются, при значении  False
- прав нет. |
Классы сборки Metabase
## AuditFiltersContainer

AuditFiltersContainer
Описание
Класс  AuditFiltersContainer
содержит свойства и методы для работы с контейнером фильтров протокола
доступа.
Свойства, унаследованные от  IAuditFiltersContainer
|
Имя свойства |
Краткое описание |
|
Callback  |
Свойство  Callback  определяет
действие, выполняемое при возникновении конфликта во время загрузки
контейнера. |
|
DefaultFileName  |
Свойство  DefaultFileName
возвращает полное имя файла контейнера по умолчанию. |
|
FileName  |
Свойство  FileName  определяет
имя файла, из которого был загружен контейнер. |
|
Filters  |
Свойство  Filters  возвращает
фильтры, которые содержит контейнер. |
Методы, унаследованные от  IAuditFiltersContainer
|
Имя метода |
Краткое описание |
|
Append  |
Метод  Append  дополняет
контейнер новыми фильтрами. |
|
Assign  |
Метод  Assign  выполняет
копирование контейнера. |
|
Load  |
Метод  Load  осуществляет
загрузку контейнера из файла по умолчанию. |
|
LoadFromFile  |
Метод  LoadFromFile
осуществляет загрузку контейнера из файла. |
|
SaveToFile  |
Метод  SaveToFile  осуществляет
сохранение контейнера в файл. |
Классы сборки Metabase
## ForeMetabaseCustomEvents

ForeMetabaseCustomEvents
Сборка : Metabase;
Описание
Класс  ForeMetabaseCustomEvents
реализует методы, используемые для отслеживания событий при работе с репозиторием
из веб-сервиса.
Методы объекта класса, унаследованные от  IMetabaseCustomEvents
|
Имя метода |
Краткое описание |
|
OnBeforeLogon
|
Метод  OnBeforeLogon
реализует событие, которое наступает перед подключением к репозиторию
с помощью веб-сервиса. |
Классы
сборки Metabase
## Классы сборки Metabase

Классы сборки Metabase
|
Класс |
Краткое описание |
|
AccessAttributeValue
|
Класс  AccessAttributeValue
предназначен для создания атрибута доступа. |
|
AuditFiltersContainer
|
Класс  AuditFiltersContainer
содержит свойства и методы для работы с контейнером фильтров протокола
доступа. |
|
ForeMetabaseCustomEvents
|
Класс  ForeMetabaseCustomEvents
реализует методы, используемые для отслеживания событий при работе
с репозиторием из веб-сервиса. |
|
MbElementDependencyTemplateClass
|
Класс  MbElementDependencyTemplateClass
реализует шаблон зависимостей объекта репозитория от элементов
справочника НСИ. |
|
MbElementDependentTemplateClass
|
Класс  MbElementDependentTemplateClass
реализует шаблон зависимостей объектов и элементов справочников
НСИ от объектов репозитория. |
|
MetabaseClass
|
Класс  MetabaseClass
реализует объект, предоставляющий возможность работы с объектами
репозитория. |
|
MetabaseCustomForeEvent
|
Класс  MetabaseCustomForeEvent
предназначен для работы с пользовательским событием. |
|
MetabaseLogonEvents
|
Класс  MetabaseLogonEvents
реализует события происходящие при подключении к базе данных. |
|
MetabaseManagerFactory
|
Класс  MetabaseManagerFactory
реализует объект, предоставляющий возможность работы с менеджером
репозиториев. |
|
MetabaseSid
|
Класс  MetabaseSid  реализует
экземпляр идентификатора субъекта безопасности. |
|
OperationCallback
|
Класс  OperationCallback
реализует объект, используемый для разрешения конфликтов, которые
могут возникнуть во время загрузки контейнера фильтров протокола
доступа. |
|
SecuritySnapshotCallback
|
Класс  SecuritySnapshotCallback
реализует объект, используемый для отслеживания событий, возникающих
при восстановлении настроек политики безопасности из резервной
копии. |
|
StandardSecurityPackage
|
Класс  StandardSecurityPackage
реализует стандартный пакет безопасности платформы. |
|
SysLogSettings
|
Класс  SysLogSettings
реализует объект, используемый для подключения syslog-сервера
для пересылки сообщений о событиях безопасности. |
|
UpdateEvents
|
Класс  UpdateEvents
реализует объект, используемый для отслеживания событий в модуле
обновления. |
|
UpdateProgress
|
Класс  UpdateProgress
реализует объект, используемый для отслеживания событий, возникающих
при обновлении объектов репозитория из файлов. |
Интерфейсы сборки Metabase
|  Перечисления
сборки Metabase  |  Примеры
## MbElementDependencyTemplateClass.Create

MbElementDependencyTemplateClass.Create
Синтаксис
Create(ObjectKey: Integer; DictionaryKey: Integer;
ElementKey: Integer);
Параметры
ObjectKey.  Ключ объекта, для
которого создается шаблон зависимостей.
DictionaryKey.  Ключ справочника
НСИ, содержащего элемент  ElementKey.
ElementKey.  Ключ элемента справочника
НСИ, от которого зависит объект  ObjectKey.
Описание
Конструктор  Create  создает новый
шаблон зависимостей в соответствии с указанными параметрами объекта, справочника
НСИ и элемента справочника.
Комментарии
Для получения ключей объекта и справочника используйте свойство  IMetabaseObjectDescriptor.Key ,
либо метод  IMetabase.GetObjectKeyById .
Для получения ключа элемента используйте свойство  IRdsDictionaryElement.Key ,
либо  IRdsDictionaryElements.Element .
Пример
Для выполнения примера предполагается наличие в репозитории объекта
с идентификатором «Obj_1» и справочника НСИ с идентификатором «Country».
Объект поддерживает отслеживание зависимостей от элементов справочников.
Справочник хранится в репозитории НСИ с идентификатором «RDS».
Sub  UserProc;
Var
MB: IMetabase;
Obj, Dictionary: IMetabaseObjectDescriptor;
Elements: IRdsDictionaryElements;
Depends: IMbElementDependencies;
Template: IMbElementDependencyTemplate;
Begin
MB := MetabaseClass.Active;
Obj := MB.ItemById( "Obj_1" );
Dictionary := MB.ItemByIdNamespace( "Country" , MB.ItemById( "RDS" ).Key);
Elements := (Dictionary.Open( Null )  As  IRdsDictionaryInstance).Elements;
//Меняем настройки для использования отслеживание зависимостей для объекта
Obj := Obj.EditDescriptor;
Obj.ElementDependenciesTrackingType := MbElementDependenciesTrackingType.Dependecies;
Obj.SaveDescriptor;
//Меняем настройки для использования отслеживание ссылок на элементы у справочника
Dictionary := Dictionary.EditDescriptor;
Dictionary.ElementDependenciesTrackingType := MbElementDependenciesTrackingType.Dependents;
Dictionary.SaveDescriptor;
//Новый шаблон для добавления зависимости
//Шаблон создается для первого элемента справочника НСИ
Template :=  New  MbElementDependencyTemplateClass.Create(
Obj.Key, Dictionary.Key, Elements.Element( 1 ));
//Коллекция зависимостей объекта
Depends := Obj.ElementDependencies;
Depends.Add(Template);
Mb.ElementDependenciesDatabase.Update(Depends);
End   Sub  UserProc;
После выполнения примера для указанного объекта и справочника НСИ будет
включена функция отслеживания зависимостей от элементов справочника. Для
объекта будет создана новая зависимость от первого элемента справочника.
Список зависимостей будет сохранен в базу репозитория.
MbElementDependencyTemplateClass
## MbElementDependencyTemplateClass.CreateByDictionary

MbElementDependencyTemplateClass.CreateByDictionary
Синтаксис
CreateByDictionary(DictionaryKey: Integer);
Параметры
DictionaryKey.  Ключ справочника
НСИ .
Описание
Конструктор  CreateByDictionary
создает новый шаблон зависимостей в соответствии с указанными параметрами
справочника НСИ.
Комментарии
Для получения ключа справочника используйте свойство  IMetabaseObjectDescriptor.Key ,
либо метод  IMetabase.GetObjectKeyById .
Пример
Для выполнения примера предполагается наличие в репозитории объекта
с идентификатором «Obj_1» и справочника НСИ с идентификатором «Country».
Для объекта включено отслеживание зависимостей от элементов справочника
НСИ. Справочник хранится в репозитории НСИ с идентификатором «RDS».
Sub  UserProc;
Var
MB: IMetabase;
Obj, Dictionary: IMetabaseObjectDescriptor;
Elements: IRdsDictionaryElements;
Depends: IMbElementDependencies;
Template: IMbElementDependencyTemplate;
ElemKeys: Array  Of  Integer;
Begin
MB := MetabaseClass.Active;
Obj := MB.ItemById( "Obj_1" );
Dictionary := MB.ItemByIdNamespace( "Country" , MB.ItemById( "RDS" ).Key);
Elements := (Dictionary.Open( Null )  As  IRdsDictionaryInstance).Elements;
Template :=  New  MbElementDependencyTemplateClass.CreateByDictionary(Dictionary.Key);
ElemKeys :=  New  Integer[ 2 ];
ElemKeys[ 0 ] := Elements.Element( 1 );
ElemKeys[ 1 ] := Elements.Element( 2 );
Template.ElementKeys := ElemKeys;
//Коллекция зависимостей объекта
Depends := Obj.ElementDependencies;
Depends.Add(Template);
Mb.ElementDependenciesDatabase.Update(Depends);
End   Sub  UserProc;
При выполнении примера будет получена коллекция зависимостей объекта
от элементов справочника НСИ. В список зависимостей будут добавлены две
зависимости от двух элементов справочника. Список зависимостей будет сохранен
в базу репозитория.
MbElementDependencyTemplateClass
## MbElementDependencyTemplateClass.CreateByElement

MbElementDependencyTemplateClass.CreateByElement
Синтаксис
CreateByElement(DictionaryKey: Integer; ElementKey:
Integer);
Параметры
DictionaryKey.  Ключ справочника
НСИ, содержащего элемент  ElementKey.
ElementKey.  Ключ элемента справочника
НСИ, от которого зависят объекты .
Описание
Конструктор  CreateByElement
создает новый шаблон зависимостей в соответствии с указанными параметрами
справочника НСИ и элемента справочника.
Комментарии
Для получения ключа спправочника используйте свойство  IMetabaseObjectDescriptor.Key ,
либо метод  IMetabase.GetObjectKeyById .
Пример
Для выполнения примера предполагается наличие в репозитории объекта
с идентификатором «Obj_1» и справочника НСИ с идентификатором «Country».
Для объекта включено отслеживание зависимостей от элементов справочника
НСИ. Справочник хранится в репозитории НСИ с идентификатором «RDS».
Sub  UserProc;
Var
MB: IMetabase;
Obj, Dictionary: IMetabaseObjectDescriptor;
Elements: IRdsDictionaryElements;
Depends: IMbElementDependencies;
Template: IMbElementDependencyTemplate;
Begin
MB := MetabaseClass.Active;
Obj := MB.ItemById( "Obj_1" );
Dictionary := MB.ItemByIdNamespace( "Country" , MB.ItemById( "RDS" ).Key);
Elements := (Dictionary.Open( Null )  As  IRdsDictionaryInstance).Elements;
Template :=  New  MbElementDependencyTemplateClass.CreateByElement(
Dictionary.Key, Elements.Element( 1 ));
//Коллекция зависимостей объекта
Depends := Obj.ElementDependencies;
Depends.Add(Template);
Mb.ElementDependenciesDatabase.Update(Depends);
End   Sub  UserProc;
При выполнении примера будет получена коллекция зависимостей объекта
от элементов справочника НСИ. В список зависимостей будут добавлена новая
зависимость от указанного элемента справочника. Список зависимостей будет
сохранен в базу репозитория.
MbElementDependencyTemplateClass
## MbElementDependencyTemplateClass.CreateByObject

MbElementDependencyTemplateClass.CreateByObject
Синтаксис
CreateByObject(ObjectKey: Integer);
Параметры
ObjectKey.  Ключ объекта, для
которого создается шаблон зависимостей.
Описание
Конструктор  CreateByObject  создает
новый шаблон зависимостей в соответствии с указанными параметрами объекта
репозитория.
Комментарии
Для получения ключа объекта используйте свойство  IMetabaseObjectDescriptor.Key ,
либо метод  IMetabase.GetObjectKeyById .
Пример
Для выполнения примера предполагается наличие в репозитории объекта
с идентификатором «Obj_1» и справочника НСИ с идентификатором «Country».
Для объекта включено отслеживание зависимостей от элементов справочника
НСИ. Справочник хранится в репозитории НСИ с идентификатором «RDS».
Sub  UserProc;
Var
MB: IMetabase;
DepDB: IMbElementDependenciesDatabase;
Obj, Dictionary: IMetabaseObjectDescriptor;
Elements: IRdsDictionaryElements;
Depends: IMbElementDependencies;
Template: IMbElementDependencyTemplate;
ElemKeys: Array  Of  Integer;
Begin
MB := MetabaseClass.Active;
DepDB := MB.ElementDependenciesDatabase;
Depends := DepDB.New_;
Obj := MB.ItemById( "Obj_1" );
//Создание шаблона
Template :=  New  MbElementDependencyTemplateClass.CreateByObject(Obj.Key);
Dictionary := MB.ItemByIdNamespace( "Country" , MB.ItemById( "RDS" ).Key);
Elements := (Dictionary.Open( Null )  As  IRdsDictionaryInstance).Elements;
//Указываем справочник
Template.DictionaryKey := Dictionary.Key;
ElemKeys :=  New  Integer[ 2 ];
ElemKeys[ 0 ] := Elements.Element( 1 );
ElemKeys[ 1 ] := Elements.Element( 2 );
//Указываем ключи элементов
Template.ElementKeys := ElemKeys;
//Добавляем зависимости
Depends.Add(Template);
Mb.ElementDependenciesDatabase.Update(Depends);
End   Sub  UserProc;
При выполнении примера будет получена коллекция зависимостей объекта
от элементов справочника НСИ. В список зависимостей будут добавлены две
зависимости от двух элементов справочника. Список зависимостей будет сохранен
в базу репозитория.
MbElementDependencyTemplateClass
## MbElementDependencyTemplateClass

MbElementDependencyTemplateClass
Сборка : Metabase;
Описание
Класс  MbElementDependencyTemplateClass
реализует шаблон зависимостей объекта репозитория от элементов справочника
НСИ.
Комментарии
Шаблоны зависимостей используются для поиска зависимостей, создания
новых, либо удаления существующих зависимостей.
Конструкторы
|
Имя конструктора |
Краткое описание |
|
Create  |
Конструктор  Create
создает новый шаблон зависимостей в соответствии с указанными
параметрами объекта, справочника НСИ и элемента справочника. |
|
CreateByDictionary  |
Конструктор  CreateByDictionary
создает новый шаблон зависимостей в соответствии с указанными
параметрами справочника НСИ. |
|
CreateByElement  |
Конструктор  CreateByElement
создает новый шаблон зависимостей в соответствии с указанными
параметрами справочника НСИ и элемента справочника. |
|
CreateByObject  |
Конструктор  CreateByObject
создает новый шаблон зависимостей в соответствии с указанными
параметрами объекта репозитория. |
Свойства объекта класса, унаследованные от  IMbElementDependencyTemplate
|
Имя свойства |
Краткое описание |
|
DictionaryKey  |
Свойство  DictionaryKey
определяет ключ справочника НСИ, с зависимостями от элементов
которого осуществляется работа. |
|
ElementKey  |
Свойство  ElementKey
определяет ключ элемента справочника НСИ, с зависимостями от которого
осуществляется работа. |
|
ElementKeys  |
Свойство  ElementKeys
определяет массив ключей элементов справочника НСИ, с зависимостями
от которых осуществляется работа. |
|
ElementKeysCount  |
Свойство  ElementKeysCount
возвращает количество ключей элементов, с зависимостями от которых
осуществляется работа. |
|
ObjectKey  |
Свойство  ObjectKey
определяет ключ объекта, с зависимостями которого осуществляется
работа. |
Классы
сборки Metabase
## MbElementDependentTemplateClass.Create

MbElementDependentTemplateClass.Create
Синтаксис
Create(ObjectKey: Integer; DictionaryKey:
Integer; ElementKey: Integer);
Параметры
ObjectKey . Ключ объекта, от
которого будет зависеть элемент  ElementKey .
DictionaryKey . Ключ справочника
НСИ, содержащего элемент ElementKey.
ElementKey . Ключ элемента справочника
НСИ, который будет зависеть от объекта  ObjectKey .
Описание
Конструктор  Create  создает новый
шаблон зависимостей в соответствии с указанными параметрами объекта, справочника
НСИ и элемента справочника.
Комментарии
Для получения ключей объекта и справочника используйте свойство  IMetabaseObjectDescriptor.Key ,
либо метод  IMetabase.GetObjectKeyById .
Для получения ключа элемента используйте свойство  IRdsDictionaryElement.Key ,
либо  IRdsDictionaryElements.Element .
Пример
Для выполнения примера предполагается наличие в репозитории объекта
с идентификатором «Obj_1» и табличного справочника НСИ с идентификатором
«Dict_1».
Добавьте ссылки на системные сборки: Metabase, Rds.
Sub   UserProc;
Var
MB: IMetabase;
Obj, Dictionary: IMetabaseObjectDescriptor;
Elements: IRdsDictionaryElements;
Depends: IMbElementDependents;
Template: IMbElementDependentTemplate;
Begin
MB := MetabaseClass.Active;
Dictionary := MB.ItemById(  "Dict_1"  );
Obj := MB.ItemById(  "Obj_1"  );
Elements := (Dictionary.Open(  Null  )   As   IRdsDictionaryInstance).Elements;
// Настройки объекта:
Dictionary := Dictionary.EditDescriptor;
Dictionary.ElementDependenciesTrackingType := MbElementDependenciesTrackingType.Dependents;
Dictionary.SaveDescriptor;
// Новый шаблон для добавления зависимости
// Шаблон создается для первого элемента справочника НСИ
Template :=   New   MbElementDependentTemplateClass.Create(Obj.Key, Dictionary.Key, Elements.Element(  1  ));
// Коллекция зависимостей элементов
Depends := Dictionary.ElementDependents;
Depends.Clear;
Depends.Add(Template);
Depends.Database.Update(Depends);
Debug.WriteLine(  "Количество записей зависимости элементов справочника НСИ от объектов: "   + Depends.Count.ToString);
End     Sub   UserProc;
После выполнения примера для указанного справочника будет включена функция
отслеживания зависимостей элементов справочника от объектов репозитория.
Для первого элемента будет создана новая зависимость от указанного объекта.
Список зависимостей будет сохранен в базу репозитория.
MbElementDependentTemplateClass
## MbElementDependentTemplateClass.CreateByDictionary

MbElementDependentTemplateClass.CreateByDictionary
Синтаксис
CreateByDictionary(DictionaryKey: Integer);
Параметры
DictionaryKey . Ключ справочника
НСИ.
Описание
Конструктор  CreateByDictionary
создает новый шаблон зависимостей в соответствии с указанными параметрами
справочника НСИ.
Комментарии
Для получения ключей объекта и справочника используйте свойство  IMetabaseObjectDescriptor.Key ,
либо метод  IMetabase.GetObjectKeyById .
Для получения ключа элемента используйте свойство  IRdsDictionaryElement.Key ,
либо  IRdsDictionaryElements.Element .
Пример
Для выполнения примера предполагается наличие в репозитории двух объектов
с идентификаторами «Obj_1», «Obj_2» и табличного справочника НСИ с идентификатором
«Dict_1».
Добавьте ссылки на системные сборки: Metabase, Rds.
Sub   UserProc;
Var
MB: IMetabase;
Dictionary: IMetabaseObjectDescriptor;
Elements: IRdsDictionaryElements;
Depends: IMbElementDependents;
Template: IMbElementDependentTemplate;
ObjKeys: Array   Of   Integer;
Begin
MB := MetabaseClass.Active;
Dictionary := MB.ItemById(  "Dict_1"  );
Elements := (Dictionary.Open(  Null  )   As   IRdsDictionaryInstance).Elements;
// Настройки объекта:
Dictionary := Dictionary.EditDescriptor;
Dictionary.ElementDependenciesTrackingType := MbElementDependenciesTrackingType.Dependents;
Dictionary.SaveDescriptor;
// Новый шаблон для добавления зависимости
// Шаблон создается для первого элемента справочника НСИ
Template :=   New   MbElementDependentTemplateClass.CreateByDictionary(Dictionary.Key);
Template.ElementKey := Elements.Element(  1  );
ObjKeys :=   New   Integer[  2  ];
ObjKeys[  0  ] := Mb.GetObjectKeyById(  "Obj_1"  );
ObjKeys[  1  ] := Mb.GetObjectKeyById(  "Obj_2"  );
Template.ObjectKeys := ObjKeys;
// Коллекция зависимостей элементов
Depends := Dictionary.ElementDependents;
Depends.Clear;
Depends.Add(Template);
Depends.Database.Update(Depends);
Debug.WriteLine(  "Количество записей зависимости элементов справочника НСИ от объектов: "   + Depends.Count.ToString);
End     Sub   UserProc;
После выполнения примера для указанного справочника будет включена функция
отслеживания зависимостей элементов справочника от объектов репозитория.
Для первого элемента будут созданы новые зависимости от указанных объектов.
Список зависимостей будет сохранен в базу репозитория.
MbElementDependentTemplateClass
## MbElementDependentTemplateClass.CreateByElement

MbElementDependentTemplateClass.CreateByElement
Синтаксис
CreateByElement(DictionaryKey: Integer;
ElementKey: Integer);
Параметры
DictionaryKey . Ключ справочника
НСИ;
ElementKey . Ключ элемента справочника
НСИ.
Описание
Конструктор  CreateByElement
создает новый шаблон зависимостей в соответствии с указанными параметрами
справочника НСИ и элемента справочника.
Комментарии
Для получения ключей объекта и справочника используйте свойство  IMetabaseObjectDescriptor.Key ,
либо метод  IMetabase.GetObjectKeyById .
Для получения ключа элемента используйте свойство  IRdsDictionaryElement.Key ,
либо  IRdsDictionaryElements.Element .
Пример
Для выполнения примера предполагается наличие справочников НСИ с идентификаторами
«DICT» и «DICT1».
Добавьте ссылки на системные сборки Metabase, Rds.
Sub   UserProc;
Var
MB: IMetabase;
Obj, Dictionary: IMetabaseObjectDescriptor;
Elements: IRdsDictionaryElements;
Depends: IMbElementDependents;
Template: IMbElementDependentTemplate;
Begin
MB := MetabaseClass.Active;
Dictionary := MB.ItemById(  "Dict_1"  );
Obj := MB.ItemById(  "Obj_1"  );
Elements := (Dictionary.Open(  Null  )   As   IRdsDictionaryInstance).Elements;
// Настройки объекта:
Dictionary := Dictionary.EditDescriptor;
Dictionary.ElementDependenciesTrackingType := MbElementDependenciesTrackingType.Dependents;
Dictionary.SaveDescriptor;
// Новый шаблон для добавления зависимости
// Шаблон создается для первого элемента справочника НСИ
Template :=   New   MbElementDependentTemplateClass.CreateByElement(Dictionary.Key, Elements.Element(  1  ));
Template.ObjectKey := Obj.Key;
// Коллекция зависимостей элементов
Depends := Dictionary.ElementDependents;
Depends.Add(Template);
Depends.Database.Update(Depends);
Debug.WriteLine(  "Количество записей зависимости элементов справочника НСИ от объектов: "   + Depends.Count.ToString);
End     Sub   UserProc;
После выполнения примера для указанного справочника будет включена функция
отслеживания зависимостей элементов справочника от объектов репозитория.
Для первого элемента будет создана новая зависимость от указанного объекта.
Список зависимостей будет сохранен в базу репозитория.
MbElementDependentTemplateClass
## MbElementDependentTemplateClass.CreateByObject

MbElementDependentTemplateClass.CreateByObject
Синтаксис
CreateByObject(ObjectKey: Integer);
Параметры
ObjectKey . Ключ объекта репозитория,
от которого будут зависть элементы справочника НСИ.
Описание
Конструктор  CreateByObject  создает
новый шаблон зависимостей в соответствии с указанными параметрами объекта
репозитория.
Комментарии
Для создания нового шаблона зависимостей в соответствии с указанными
параметрами объекта, справочника НСИ и элемента справочника используйте
конструктор  MbElementDependentTemplateClass.Create .
Пример
Для выполнения примера предполагается наличие справочников НСИ с идентификаторами
«DICT» и «DICT1».
Добавьте ссылки на системные сборки Metabase, Rds.
Sub   UserProc;
Var
MB: IMetabase;
Obj, Dictionary: IMetabaseObjectDescriptor;
Elements: IRdsDictionaryElements;
Depends: IMbElementDependents;
Template: IMbElementDependentTemplate;
ElemKeys: Array   Of   Integer;
Begin
MB := MetabaseClass.Active;
Dictionary := MB.ItemById(  "Dict_1"  );
Obj := MB.ItemById(  "Obj_1"  );
Elements := (Dictionary.Open(  Null  )   As   IRdsDictionaryInstance).Elements;
// Настройки объекта:
Dictionary := Dictionary.EditDescriptor;
Dictionary.ElementDependenciesTrackingType := MbElementDependenciesTrackingType.Dependents;
Dictionary.SaveDescriptor;
// Новый шаблон для добавления зависимости
// Шаблон создается для первого элемента справочника НСИ
Template :=   New   MbElementDependentTemplateClass.CreateByObject(Obj.Key);
ElemKeys :=   New   Integer[  2  ];
ElemKeys[  0  ] := Elements.Element(  1  );
ElemKeys[  0  ] := Elements.Element(  2  );
Template.DictionaryKey := Dictionary.Key;
Template.ElementKeys := ElemKeys;
// Коллекция зависимостей элементов
Depends := Dictionary.ElementDependents;
Depends.Clear;
Depends.Add(Template);
Depends.Database.Update(Depends);
Debug.WriteLine(  "Количество записей зависимости элементов справочника НСИ от объектов: "   + Depends.Count.ToString);
End     Sub   UserProc;
После выполнения примера для указанного справочника будет включена функция
отслеживания зависимостей элементов справочника от объектов репозитория.
Для двух элементов будут созданы новые зависимости от указанного объекта.
Список зависимостей будет сохранен в базу репозитория.
MbElementDependentTemplateClass
## MbElementDependentTemplateClass

MbElementDependentTemplateClass
Сборка : Metabase;
Описание
Класс  MbElementDependentTemplateClass
реализует шаблон зависимостей объектов и элементов справочников НСИ от
объектов репозитория.
Комментарии
Шаблоны зависимостей используются для поиска зависимостей, создания
новых, либо удаления существующих зависимостей.
Конструкторы
|
Имя конструктора |
Краткое описание |
|
Create  |
Конструктор  Create
создает новый шаблон зависимостей в соответствии с указанными
параметрами объекта, справочника НСИ и элемента справочника. |
|
CreateByDictionary  |
Конструктор  CreateByDictionary
создает новый шаблон зависимостей в соответствии с указанными
параметрами справочника НСИ. |
|
CreateByElement  |
Конструктор  CreateByElement
создает новый шаблон зависимостей в соответствии с указанными
параметрами справочника НСИ и элемента справочника. |
|
CreateByObject  |
Конструктор  CreateByObject
создает новый шаблон зависимостей в соответствии с указанными
параметрами объекта репозитория. |
Свойства объекта класса, унаследованные от  IMbElementDependentTemplate
|
Имя свойства |
Краткое описание |
|
DictionaryKey  |
Свойство  DictionaryKey
возвращает ключ справочника НСИ, зависящего от объекта репозитория. |
|
ElementKey  |
Свойство  ElementKey
возвращает ключ элемента справочника НСИ, зависящего от объекта
репозитория. |
|
ElementKeys  |
Свойство  ElementKeys
возвращает массив ключей элементов справочника НСИ, зависящего
от объекта репозитория. |
|
ElementKeysCount  |
Свойство  ElementKeysCount
возвращает количество ключей элементов справочника НСИ, зависящего
от объекта репозитория. |
|
ObjectKey  |
Свойство  ObjectKey
возвращает ключ объекта репозитория, зависящего от объекта репозитория. |
|
ObjectKeys  |
Свойство  ObjectKeys
возвращает массив ключей объектов репозитория, зависящих от объекта
репозитория. |
|
ObjectKeysCount  |
Свойство  ObjectKeysCount
возвращает количество ключей объектов репозитория, зависящих от
объекта репозитория. |
Классы
сборки Metabase
## MetabaseClass

MetabaseClass
Описание
Класс  MetabaseClass  реализует объект, предоставляющий возможность работы с объектами репозитория.
Свойства, унаследованные от  IMetabaseClass
|
Имя свойства |
Краткое описание |
|
Active  |
Свойство  Active  возвращает
данные текущего репозитория. |
|
CommonClassName  |
Свойство  CommonClassName
возвращает наименование указанного класса объекта репозитория
в заданном падеже. |
|
IconIndex  |
Свойство  IconIndex
возвращает индекс пиктограммы, установленной для указанного класса
объекта. |
Методы, унаследованные от  IMetabaseClass
|
Имя метода |
Краткое описание |
|
GetMetabaseObjectClass  |
Метод  GetMetabaseObjectClass
возвращает класс объекта, реализуемый перечислимым типом  MetabaseObjectClass ,
по числовому значению идентификатора класса. |
Классы сборки Metabase
## MetabaseCustomForeEvent.Create

MetabaseCustomForeEvent.Create
Синтаксис
Create(Id: String);
Параметры
Id . Идентификатор пользовательского
события.
Описание
Конструктор  Create  создает пользовательское
событие.
Комментарии
Для вызова наступления пользовательского события используйте метод  IMetabaseCustomForeEvent.Invoke .
MetabaseCustomForeEvent
## MetabaseCustomForeEvent

MetabaseCustomForeEvent
Сборка : Metabase;
Описание
Класс  MetabaseCustomForeEvent
предназначен для работы с пользовательским событием.
Комментарии
Для работы с пользовательским событием используйте интерфейс  IMetabaseCustomForeEvent .
Конструкторы
|
Имя конструктора |
Краткое описание |
|
Create
|
Конструктор  Create
создает пользовательское событие. |
Методы объекта класса, унаследованные от  IMetabaseCustomForeEvent
|
Имя метода |
Краткое описание |
|
Invoke
|
Метод  Invoke  вызывает
наступление пользовательского события. |
|
InvokeEvent
|
Метод  InvokeEvent  вызывает
наступление пользовательского события при соединении с сервером
базы данных. |
Классы
сборки Metabase
## MetabaseLogonEvents

MetabaseLogonEvents
Описание
Класс  MetabaseLogonEvents  реализует
события происходящие при подключении к базе данных.
Методы, унаследованные от  IMetabaseLogonEvents
|
Имя метода |
Краткое описание |
|
OnLogonUserMustChangePassword  |
Метод  OnLogonUserMustChangePassword
реализует событие смены пароля пользователя при истечении его
срока действия. |
Классы сборки Metabase
## MetabaseManagerFactory

MetabaseManagerFactory
Описание
Класс  MetabaseManagerFactory
реализует объект, предоставляющий возможность работы с менеджером репозиториев.
Свойства, унаследованные от  IMetabaseManagerFactory
|
Имя свойства |
Краткое описание |
|
Active  |
Свойство  Active  возвращает
параметры менеджера репозиториев активного репозитория. |
Классы сборки Metabase
## MetabaseSid

MetabaseSid
Сборка : Metabase;
Описание
Класс  MetabaseSid  реализует экземпляр идентификатора субъекта безопасности.
Комментарии
При создании субъектов безопасности идентификатор безопасности для них генерируется автоматически. В дальнейшем он не может быть изменен. Экземпляр данного класса может использоваться, например, для поиска субъектов безопасности, если известно строковое представление их идентификатора безопасности.
Пример использования класса  MetabaseSid  для поиска субъектов безопасности приведен в описании свойства  ISid.AsString .
Свойства объекта класса, унаследованные от  ISid
|
Имя свойства |
Краткое описание |
|
AsString  |
Свойство  AsString  определяет
идентификатор субъекта безопасности в строковом виде. |
|
Valid  |
Свойство  Valid  возвращает
признак корректности (валидности) идентификатора субъекта безопасности. |
Классы сборки Metabase
## OperationCallback

OperationCallback
Описание
Класс  OperationCallback  реализует
объект, используемый для разрешения конфликтов, которые могут возникнуть
во время загрузки контейнера фильтров протокола доступа.
Методы, унаследованные от  IOperationCallback
|
Имя метода |
Краткое описание |
|
OnOperation  |
Метод  OnOperation  выполняет
действия, необходимые для разрешения конфликта. |
Классы сборки Metabase
## SecuritySnapshotCallback

SecuritySnapshotCallback
Описание
Класс  SecuritySnapshotCallback
реализует объект, используемый для отслеживания событий, возникающих при
восстановлении настроек политики безопасности из резервной копии.
Методы, унаследованные от  ISecuritySnapshotCallback
|
Имя метода |
Краткое описание |
|
OnOperation  |
Метод  OnOperation  реализует
событие, происходящее во время применения политики безопасности. |
|
OnSubjectApply  |
Метод  OnSubjectApply
реализует событие, происходящее в процессе восстановления пользователей/групп. |
Классы сборки Metabase
## StandardSecurityPackage

StandardSecurityPackage
Описание
Класс  StandardSecurityPackage
реализует стандартный пакет безопасности платформы.
Свойства, унаследованные от  ISecurityPackage
|
Имя свойства |
Краткое описание |
|
CertProvider  |
Свойство  CertProvider
возвращает поставщик сертификатов. |
|
Id  |
Свойство  Id  возвращает
идентификатор модуля безопасности. |
|
Name  |
Свойство  Name  возвращает
наименование модуля безопасности. |
Методы, унаследованные от  ISecurityPackage
|
Имя метода |
Краткое описание |
|
CopyCredentials  |
Метод  CopyCredentials
копирует учетные данные из объекта, который передается в качестве
входного параметра. |
|
CreateCredentials  |
Метод  CreateCredentials
создает учетные данные репозитория с заданным типом аутентификации. |
|
CreateLogonData  |
Метод  CreateLogonData
возвращает объект, содержащий свойства параметров модуля безопасности. |
|
GetAdminCredentials  |
Метод  GetAdminCredentials
создает учетные данные администратора в соответствии с параметрами
указанного подключения. |
|
IsCompatibleDriver  |
Метод  IsCompatibleDriver
возвращает признак поддержки текущим модулем безопасности указанного
драйвера БД. |
|
PerformLogon  |
Метод  PerformLogon
возвращает объект, содержащий новое соединение с сервером БД. |
|
SupportsAuthentication  |
Метод  SupportsAuthentication
возвращает признак поддержки текущим модулем безопасности указанного
вида аутентификации. |
Классы сборки Metabase
## SysLogSettings

SysLogSettings
Сборка : Metabase;
Описание
Класс  SysLogSettings
реализует объект, используемый для подключения syslog-сервера для пересылки
сообщений о событиях безопасности.
Свойства объекта класса, унаследованные от  ISysLogSettings
|
Имя свойства |
Краткое описание |
|
IsActive
|
Свойство  IsActive  определяет
признак активного подключения к syslog-серверу. |
|
Port
|
Свойство  Port  определяет
порт syslog-сервера для входящих соединений. |
|
Protocol
|
Свойство  Protocol
определяет протокол, используемый для передачи.
|
|
Scope
|
Свойство  Scope  определяет
расположение настроек подключения syslog-сервера. |
|
Server
|
Свойство  Server  определяет
IP-адрес syslog-сервера. |
Методы объекта класса, унаследованные от  ISysLogSettings
|
Имя метода |
Краткое описание |
|
Save
|
Метод  Save  сохраняет
настройки подключения syslog-сервера. |
Классы
сборки Metabase
## UpdateEvents

UpdateEvents
Описание
Класс  UpdateEvents  реализует объект, используемый для отслеживания событий в  модуле обновления .
Методы, унаследованные от  IMetabaseUpdateUserEvents
|
Имя метода |
Краткое описание |
|
OnAskConstraintsHandling  |
Метод  OnAskConstraintsHandling
реализует событие, возникающее при необходимости обработать ограничение
целостности данных обновляемого объекта. |
|
OnAskReflectRights  |
Метод  OnAskReflectRights
реализует событие, возникающее перед обновлением прав на объекты. |
|
OnBeforeApplyUpdate  |
Метод  OnBeforeApplyUpdate
реализует событие, возникающее после подготовки объектов к обновлению. |
|
OnBeginUpdate  |
Метод  OnBeginUpdate
реализует событие, возникающее перед применением обновления. |
|
OnEndUpdate  |
Метод  OnEndUpdate  реализует
событие, возникающее после применения обновления. |
|
OnUpdateObject  |
Метод  OnUpdateObject
реализует событие, возникающее непосредственно перед обновлением
объекта репозитория. |
Классы сборки Metabase
## UpdateProgress

UpdateProgress
Описание
Класс  UpdateProgress  реализует
объект, используемый для отслеживания событий, возникающих при обновлении
объектов репозитория из файлов.
Методы, унаследованные от  IMetabaseUpdateProgress
|
Имя метода |
Краткое описание |
|
OnAfterApplyCustomObject
|
Метод  OnAfterApplyCustomObject
реализует событие, возникающее после применения обновления пользовательского
объекта, но до его сохранения в репозиторий.  |
|
OnAskConstraintsHandling
|
Метод  OnAskConstraintsHandling
реализует событие, возникающее при необходимости обработать ограничение
целостности данных обновляемого объекта. |
|
OnAskReflectRights
|
Метод  OnAskReflectRights
реализует событие, возникающее перед обновлением прав на объекты. |
|
OnBeforeCustomObjectSaveToPef
|
Метод  OnBeforeCustomObjectSaveToPef
реализует событие, возникающее перед сохранением пользовательского
объекта в pef-файл.  |
|
OnContext
|
Метод  OnContext
р еализует событие, возникающее при обновлении с использованием
дополнительных настроек. |
|
OnError
|
Метод  OnError  реализует
событие, происходящее при возникновении ошибки во время синхронизации
объекта репозитория с объектом в обновлении. |
|
OnNullLinks
|
Метод  OnNullLinksResolve
реализует событие, возникающее при наличии ссылок, которые отсутствуют
в репозитории назначения. |
|
OnProgress
|
Метод  OnProgress  реализует
событие общего статуса процесса обновления/синхронизации. |
|
OnResolve
|
Метод  OnResolve  реализует
событие, возникающее при наличии зависимостей обновления от объектов
репозитория-источника, которые отсутствуют в репозитории назначения. |
|
OnSkip
|
Метод   OnSkip
реализует событие пропуска элемента обновления при установке обновления.  |
Классы сборки Metabase
