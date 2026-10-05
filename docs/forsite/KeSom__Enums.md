# KeSom / Enums

> Source: OldDocumentsForsite/KeSom/Enums  (CHM "KeSom"; topics: 93)

Contents:
- 100  AccessElementApplyOptions
- 128  AccessElementAttributes
- 151  AceType
- 171  AdmUserType
- 184  ApplyStateType
- 206  AuditLogArchiveFormat
- 231  AuditLogSpecificRights
- 248  AuditUserCredsScope
- 287  AuthenticationMode
- 337  CalculatedCubeSpecificRights
- 372  CallbackOperationState
- 397  CertificateStorageType
- 422  CheckAuditLoginConsistencyOptions
- 449  ControlMethodsCombineAlgorithm
- 486  CubeLoaderSpecificRights
- 515  CubeSpecificRights
- 556  CustomObjectSpecificRights
- 624  DataBaseSpecificRights
- 657  DeleteObjectOptions
- 682  DictionarySpecificRights
- 725  DomainLogonType
- 746  DomainSelectType
- 772  DomainSubjectAddState
- 808  FindAttribute
- 837  FindAttributeEx
- 869  IsaModePromoteOptions
- 886  Перечисления сборки Metabase
- 1310  MbElementDependenciesTrackingType
- 1333  MDCalcSpecificRights
- 1366  MetabaseCheckStatus
- 1385  MetabaseConnectForAuditMode
- 1400  MetabaseDefinitionScope
- 1417  MetabaseExportObjectsRightsOrder
- 1432  MetabaseFetchOptions
- 1468  MetabaseObjectAlterType
- 1484  MetabaseObjectAuditOperationState
- 1505  MetabaseObjectCachingMode
- 1535  MetabaseObjectClass
- 2003  MetabaseObjectMetaclass
- 2080  MetabaseObjectOperation
- 2101  MetabaseObjectParamReadWriteMode
- 2120  MetabaseObjectPredefinedRights
- 2254  MetabaseObjectUpdateBoundType
- 2278  MetabaseObjectUpdateConstraint
- 2301  MetabaseObjectUpdateOrder
- 2326  MetabaseObjectUpdatePart
- 2371  MetabaseObjectUpdateType
- 2426  MetabaseObjectUpdateUnboundType
- 2447  MetabasePolicyPredefinedPrivilege
- 2481  MetabaseRefreshOptions
- 2524  MetabaseSecurityApplyInformation
- 2539  MetabaseSecuritySubjectUpdateType
- 2566  MetabaseSpecialObject
- 2613  MetabaseUpdateAccessTokenOptions
- 2634  MetabaseUpdateAccessType
- 2658  MetabaseUpdateApplyOptions
- 2724  MetabaseUpdateCopyType
- 2752  MetabaseUpdateMethod
- 2773  MetabaseUpdateNodeAccessType
- 2798  MetabaseUpdateNodeType
- 2835  MetabaseUpdateObjectApplyState
- 2891  MetabaseUpdateProgressStage
- 2920  MetabaseUpdateRemappingType
- 2952  MetabaseUserLockedState
- 2971  MetabaseUsersUpdateCallbackResult
- 2989  MetabaseUsersUpdateErrorType
- 3004  NameCasePlural
- 3028  ObjectUpdateDataBatchMode
- 3050  ProblemSpecificRights
- 3083  ProcedureSpecificRights
- 3121  ProtocolSelectType
- 3150  ScenarioDimensionSpecificRights
- 3192  ScheduledTaskSpecificRights
- 3213  ScreenshotType
- 3265  SecurityDescriptorApplyFlags
- 3282  SecurityDescriptorFlags
- 3299  SecurityPackageUserPrivilege
- 3354  SecuritySpecificRights
- 3377  SecuritySubjectLocation
- 3401  SecuritySubjectMemberOfO
- 3436  SecuritySubjectType
- 3458  SnapshotApplyOperationType
- 3489  StationAccessType
- 3507  SysLogProtocol
- 3527  SysLogSettingsScope
- 3548  TableSpecificRights
- 3599  TeradataAuthenticationMethod
- 3620  UpdateDataConstraintsHandlingType
- 3662  UpdateLoadMode
- 3705  UpdateObjectSpecificRights
- 3726  UpdateReflectObjectsRightsType
- 3745  UpdateSortMode
- 3768  ValidationSpecificRights

## AccessElementApplyOptions

AccessElementApplyOptions
Описание
Перечисление  AccessElementApplyOptions
содержит возможные варианты применения прав доступа на элемент.
Используется следующими методами:
IAccessElement.Apply ;
IAccessElement.ApplyAccessToken .
Возможные значения
Значение |
Краткое описание |
0 |
None  .
Заданные права будут применены только для настраиваемого элемента. |
1 |
ByHierarhy  . З аданные
права будут применены ко всем дочерним элементам настраиваемого
элемента. |
2 |
ByLevel  .
З аданные права будут применены к элементам всего
уровня, к которому принадлежит настраиваемый элемент. |
4 |
TreatAsMask . Рассматривать
применяемое значение как битовую маску, при применении выполнить
AND с текущим значением по всем субъектам безопасности. |
Перечисления сборки Metabase
## AccessElementAttributes

AccessElementAttributes
Описание
Перечисление  AccessElementAttributes  содержит типы атрибутов доступа.
Используется следующим свойством:
IAccessElement.AttributeAccess .
Возможные значения
Значение |
Краткое описание |
0 |
None  . Н е определено. |
1 |
Read . Право на чтение. |
2 |
Write . Право на запись. |
4 |
Delete . Право на удаление. |
8 |
Access  . П раво на изменение прав. |
16 |
Mandatory . Мандатный доступ. |
Перечисления сборки Metabase
## AceType

AceType
Описание
Перечисление  AceType  содержит типы дополнительных параметров безопасности объекта.
Используется следующими свойствами и методами:
IAccessControlEntry.Type ;
IAccessControlList.AddAce .
Возможные значения
Значение |
Краткое описание |
0 |
Unknown . Неизвестно. |
1 |
AccessAllowed . Параметр разрешения доступа к объекту. |
2 |
AccessDenied . Параметр запрещения доступа к объекту. |
3 |
Audit . Параметр аудита событий доступа к объекту. |
Перечисления сборки Metabase
## AdmUserType

AdmUserType
Описание
Перечисление  AdmUserType  содержит типы администраторов. Используется свойством  IMetabasePolicy.AdmUserTitle .
Возможные значения
Значение |
Краткое описание |
1 |
ISA . Администратор информационной безопасности (или пользователь, обладающий привилегией «Изменение метки безопасности и списка контроля доступа любого объекта»). |
2 |
Admin . Прикладной администратор (или пользователь, обладающий привилегией «Создание, удаление пользователей»). |
Перечисления сборки Metabase
## ApplyStateType

ApplyStateType
Описание
Перечисление  ApplyStateType  содержит типы состояний восстановления субъектов безопасности.
Используется следующими свойствами и методами:
ISecuritySnapshotCallback.OnSubjectApply ;
ISecuritySnapshotLog.ApplyState .
Возможные значения
Значение |
Краткое описание |
0 |
None . Нет изменений. |
1 |
Created . Создан. |
2 |
Changed . Изменен. |
3 |
Error . Ошибка. |
4 |
Deleted . Удален. |
Перечисления сборки Metabase
## AuditLogArchiveFormat

AuditLogArchiveFormat
Описание
Перечисление  AuditLogArchiveFormat
содержит форматы файлов, в которые может быть сохранен протокол доступа.
Используется следующими свойствами и методами:
IAuditLog.Archive ;
IAuditLog.ArchiveToDate .
Возможные значения
Значение |
Краткое описание |
0 |
Binary . Протокол доступа
сохраняется в двоичный файл в формате, поддерживаемом платформой.
Файл должен иметь расширение « ppl ». |
1 |
CSV . Протокол доступа
сохраняется в текстовый файл в формате, поддерживаемом MS Excel.
Файл должен иметь расширение « csv ». |
2 |
CEF . Протокол доступа
сохраняется в текстовый файл в формате, поддерживаемом  SIEM-системами .
Файл должен иметь расширение « cef ». |
Перечисления сборки Metabase
## AuditLogSpecificRights

AuditLogSpecificRights
Описание
Перечисление  AuditLogSpecificRights  содержит список специфических операций, доступных для протокола доступа.
Комментарии
Список основных и дополнительных операций доступен в перечислении  MetabaseObjectPredefinedRights .
Используется следующими свойствами и методами:
IMetabaseAuditPolicy.FilterClass ;
IMetabaseAuditPolicy.TrackClassHistory ;
IAuditFilterCondition.Operation .
Возможные значения
Значение |
Краткое описание |
1048576 |
Archive . Сохранение протокола доступа в файл. |
Перечисления сборки Metabase
## AuditUserCredsScope

AuditUserCredsScope
Описание
Перечисление  AuditUserCredsScope
используется для определения способа сохранения учётных данных  служебного
пользователя .
Комментарии
Используется следующим свойством:
IMetabaseAuditUserInfo.Scope .
Для получения подробной информации о способах сохранения учётных данных
служебного пользователя обратитесь к разделу « Создание
служебного пользователя ».
Возможные значения
Значение |
Краткое описание |
0 |
Default . По умолчанию.
Учётные данные будут храниться в файле  settings.xml .
Примечание .
Значение используется в  PP.Util
для добавления учётных данных служебного пользователя на каждый
компьютер пользователя, если не задан способ сохранения учётных
данных в параметре  [/SCOPE scope] .
|
1 |
CurrentUser . Учётные
данные будут храниться в  реестре
текущего пользователя и доступны для использования только текущему
пользователю на компьютере. |
2 |
LocalMachine . Учётные
данные будут храниться в  реестре
локальной машины и доступны для использования всем пользователям
на компьютере. |
3 |
File . Учётные данные
будут храниться в файле  settings.xml . |
Перечисления сборки Metabase
## AuthenticationMode

AuthenticationMode
Описание
Перечисление  AuthenticationMode
сдержит типы аутентификации, используемые для какого-либо подключения.
Используется следующими свойствами и методами:
IDatabase.Authentication ;
ICredentials.Authentication ;
ISecurityPackage.SupportsAuthentication ;
ISecurityPackage.CreateCredentials ;
ISecurityPackageUserData.Authentication ;
IMetabaseLinkBase.Authentication ;
IAdoMdCatalog.Authentication .
Возможные значения
Значение |
Краткое описание |
0 |
AnyAccepted . Любой
принятый тип аутентификации. |
1 |
Password . Парольная
аутентификация. Требуется явное указание  имени
и пароля пользователя. Для обработки учетных данных используется
интерфейс   IPasswordCredentials . |
2 |
Domain . Интегрированная
доменная аутентификация.  При
подключении будут использоваться те же имя пользователя и пароль,
используя которые пользователь подключился к домену. Для обработки
учетных данных используется интерфейс   IDomainCredentials . |
3 |
Role . Ролевая аутентификация.
При данном типе аутентификации
каждый пользователь ассоциируется с определенной ролью.  |
4 |
DomainExplicit . Доменная
аутентификация. Требуется явное указание  домена,
имени пользователя и пароля. Для обработки учетных данных используется
интерфейс   IDomainCredentials .
Использование доменной аутентификации
актуально для СУБД MSSQL, Oracle, PostgreSQL.  |
5 |
Certificate  . Аутентификация по сертификату.
Владелец сертификата может работать в репозитории под любым пользователем.  |
6 |
PasswordEncrypted .
Парольная аутентификация с шифрованием.  Использование
актуально только для сервера приложений.  |
Перечисления сборки Metabase
## CalculatedCubeSpecificRights

CalculatedCubeSpecificRights
Описание
Перечисление  CalculatedCubeSpecificRights  содержит список специфических операций, доступных для вычисляемых кубов.
Комментарии
Список основных и дополнительных операций доступен в перечислении  MetabaseObjectPredefinedRights .
Используется следующими свойствами и методами:
IMetabaseObjectDescriptor.HasAccess ;
IMetabaseObjectDescriptor.CheckAndAudit ;
IMetabaseObjectDescriptor.CheckAndAuditLabel ;
IMetabaseUser.HasAccess ;
ISecurityDescriptor.HasAccess ;
ISecurityDescriptor.HasAccessAudit ;
ISecurityDescriptor.HasAccessAuditLabel ;
ISecurityDescriptor.GetEffectiveRights ;
ISecurityDescriptor.GetEffectiveRightsAudit ;
ISecurityDescriptor.GetEffectiveRightsAuditLabel ;
IAccessControlList.AddAce ;
IAccessControlEntry.AccessMask ;
IMetabaseAuditPolicy.FilterClass ;
IMetabaseAuditPolicy.TrackClassHistory ;
IAuditFilterCondition.Operation .
Возможные значения
Значение |
Краткое описание |
1048576 |
ReadData . Извлечение данных. |
2097152 |
SaveData . Сохранение данных. |
4194304 |
ReadFormulas . Чтение формул. |
8388608 |
SaveFormulas . Сохранение формул. |
Перечисления сборки Metabase
## CallbackOperationState

CallbackOperationState
Описание
Перечисление  CallbackOperationState  содержит варианты разрешения конфликтов, возникающих при импорте контейнера фильтров протокола доступа.
Используется следующим методом:
IOperationCallback.OnOperation .
Возможные значения
Значение |
Краткое описание |
0 |
None . Действие не определено. |
1 |
Replace . Заменить. |
2 |
Skip . Пропустить. |
4 |
Add . Добавить. |
8 |
Append . Дополнить. |
16 |
Stop . Остановить. |
32 |
Keep . Запомнить выбор. |
Перечисления сборки Metabase
## CertificateStorageType

CertificateStorageType
Описание
Перечисление  CertificateStorageType
определяет тип хранилища сертификатов.
Используется следующими свойствами и методами:
IMetabaseuser.InitCertificate .
Возможные значения
Значение |
Краткое описание |
0 |
Default_ . Тип хранилища
сертификатов по умолчанию. В настоящий момент типом хранилища
по умолчанию является  WinStorage  .  |
1 |
WinStorage . Тип хранилища
сертификатов, при котором выбор сертификата осуществляется из
хранилища пользователя. |
2 |
File . Тип хранилища
сертификатов, при котором выбор сертификата осуществляется путем
выбора файла. |
Перечисления
сборки Metabase
## CheckAuditLoginConsistencyOptions

CheckAuditLoginConsistencyOptions
Описание
Перечисление  CheckAuditLoginConsistencyOptions
содержит варианты проверки служебного пользователя подсистемы безопасности.
Комментарии
Используется методом  IMetabaseSecurity.CheckAuditLoginConsistency .
Служебный пользователь подсистемы безопасности необходим для обеспечения
безопасности и входа в систему. Для служебного пользователя используется
сложный пароль длина, наличие спецсимволов и пр.).
Возможные значения
Значение |
Краткое описание |
0 |
Default . Только проверить
служебного пользователя. |
1 |
RecreateIfNeeded . Пересоздать
или обновить, если требуется. |
2 |
ForceSimplePassword .
Создать пользователя с простым паролем. |
Примечание .
Значение « NoPasswordChange » не
предназначено для использования в прикладном коде.
Перечисления сборки Metabase
## ControlMethodsCombineAlgorithm

ControlMethodsCombineAlgorithm
Описание
Перечисление  ControlMethodsCombineAlgorithm
содержит  алгоритмы
комбинации прав  по атрибутному и дискреционному методу
разграничения доступа.
Используется свойством  IMetabasePolicy.MethodsCombineAlgorithm .
Комментарии
При одновременном использовании  атрибутного
и  дискреционного
метода используется  алгоритм
комбинации прав :
AND . Операция разрешена,
если одновременно настроено разрешение операции по двум методам разграничения
доступа. Если по одному из методов разграничения доступа операция
запрещена или права доступа не определены, то результатом будет запрет
операции;
OR . Операция разрешена,
если настроено разрешение операции хотя бы по одному из методов разграничения
доступа, а по другому права доступа не определены. Если по одному
из методов разграничения доступа операция запрещена, то результатом
будет запрет операции.
Возможные значения
Значение |
Краткое описание |
1 |
Default_ . По умолчанию.
Используется алгоритм комбинации « AND ». |
1 |
Deny . Используется
алгоритм комбинации « AND ». |
3 |
Permit . Используется
алгоритм комбинации «OR». |
Перечисления сборки Metabase
## CubeLoaderSpecificRights

CubeLoaderSpecificRights
Описание
Перечисление  CubeLoaderSpecificRights  содержит список специфических операций, доступных для загрузчика данных в куб.
Комментарии
Список основных и дополнительных операций доступен в перечислении  MetabaseObjectPredefinedRights .
Используется следующими свойствами и методами:
IMetabaseObjectDescriptor.HasAccess ;
IMetabaseObjectDescriptor.CheckAndAudit ;
IMetabaseObjectDescriptor.CheckAndAuditLabel ;
IMetabaseUser.HasAccess ;
ISecurityDescriptor.HasAccess ;
ISecurityDescriptor.HasAccessAudit ;
ISecurityDescriptor.HasAccessAuditLabel ;
ISecurityDescriptor.GetEffectiveRights ;
ISecurityDescriptor.GetEffectiveRightsAudit ;
ISecurityDescriptor.GetEffectiveRightsAuditLabel ;
IAccessControlList.AddAce ;
IAccessControlEntry.AccessMask ;
IMetabaseAuditPolicy.FilterClass ;
IMetabaseAuditPolicy.TrackClassHistory ;
IAuditFilterCondition.Operation .
Возможные значения
Значение |
Краткое описание |
16777216 |
Execute . Выполнение загрузки данных. |
Перечисления сборки Metabase
## CubeSpecificRights

CubeSpecificRights
Описание
Перечисление  CubeSpecificRights
содержит список специфических операций, доступных для различных видов
кубов.
Комментарии
Список основных и дополнительных операций доступен в перечислении  MetabaseObjectPredefinedRights .
Используется следующими свойствами и методами:
IMetabaseObjectDescriptor.HasAccess ;
IMetabaseObjectDescriptor.CheckAndAudit ;
IMetabaseObjectDescriptor.CheckAndAuditLabel ;
IMetabaseUser.HasAccess ;
ISecurityDescriptor.HasAccess ;
ISecurityDescriptor.HasAccessAudit ;
ISecurityDescriptor.HasAccessAuditLabel ;
ISecurityDescriptor.GetEffectiveRights ;
ISecurityDescriptor.GetEffectiveRightsAudit ;
ISecurityDescriptor.GetEffectiveRightsAuditLabel ;
IAccessControlList.AddAce ;
IAccessControlEntry.AccessMask ;
IMetabaseAuditPolicy.FilterClass ;
IMetabaseAuditPolicy.TrackClassHistory ;
IRubricatorFactor.GetEffectiveRights ;
IRubricatorSegment.GetEffectiveRights ;
IRubricatorSegmentsSet.GetEffectiveRights ;
IRubricatorFactor.GetSubjectEffectiveRights ;
IRubricatorSegment.GetSubjectEffectiveRights ;
IRubricatorSegmentsSet.GetSubjectEffectiveRights ;
IAuditFilterCondition.Operation .
Возможные значения
Значение |
Краткое описание |
1048576 |
ReadData . Извлечение
данных. |
2097152 |
SaveData . Сохранение
данных. |
Перечисления сборки Metabase
## CustomObjectSpecificRights

CustomObjectSpecificRights
Описание
Перечисление  CustomObjectSpecificRights
содержит список специфических операций, доступных для объектов пользовательских
классов.
Комментарии
Количество используемых значений зависит от количества операций, созданных
для определенного пользовательского класса объектов. Коллекцию операций
пользовательского класса можно получить в свойстве  Operations .
Список основных и дополнительных операций доступен в перечислении  MetabaseObjectPredefinedRights .
Используется следующими свойствами и методами:
IMetabaseObjectDescriptor.HasAccess ;
IMetabaseObjectDescriptor.CheckAndAudit ;
IMetabaseObjectDescriptor.CheckAndAuditLabel ;
IMetabaseUser.HasAccess ;
ISecurityDescriptor.HasAccess ;
ISecurityDescriptor.HasAccessAudit ;
ISecurityDescriptor.HasAccessAuditLabel ;
ISecurityDescriptor.GetEffectiveRights ;
ISecurityDescriptor.GetEffectiveRightsAudit ;
ISecurityDescriptor.GetEffectiveRightsAuditLabel ;
IAccessControlList.AddAce ;
IAccessControlEntry.AccessMask ;
IMetabaseAuditPolicy.FilterClass ;
IMetabaseAuditPolicy.TrackClassHistory ;
IAuditFilterCondition.Operation .
Возможные значения
Значение |
Краткое описание |
1048576 |
Operation0 . Операция
№1. |
2097152 |
Operation1 . Операция
№2. |
4194304 |
Operation2 . Операция
№3. |
8388608 |
Operation3  - операция
№4. |
16777216 |
Operation4  - операция
№5. |
33554432 |
Operation5  - операция
№6. |
67108864 |
Operation6  - операция
№7. |
134217728 |
Operation7  - операция
№8. |
268435456 |
Operation8  - операция
№9. |
536870912 |
Operation9  - операция
№10. |
1073741824 |
Operation10  - операция
№11. |
-2147483648 |
Operation11  - операция
№12. |
Перечисления сборки Metabase
## DataBaseSpecificRights

DataBaseSpecificRights
Описание
Перечисление  DataBaseSpecificRights
содержит список специфических операций, доступных для объекта репозитория
« База
данных ».
Комментарии
Список основных и дополнительных операций доступен в перечислении  MetabaseObjectPredefinedRights .
Используется следующими свойствами и методами:
IMetabaseObjectDescriptor.HasAccess ;
IMetabaseObjectDescriptor.CheckAndAudit ;
IMetabaseObjectDescriptor.CheckAndAuditLabel ;
IMetabaseUser.HasAccess ;
ISecurityDescriptor.HasAccess ;
ISecurityDescriptor.HasAccessAudit ;
ISecurityDescriptor.HasAccessAuditLabel ;
ISecurityDescriptor.GetEffectiveRights ;
ISecurityDescriptor.GetEffectiveRightsAudit ;
ISecurityDescriptor.GetEffectiveRightsAuditLabel ;
IAccessControlList.AddAce ;
IAccessControlEntry.AccessMask ;
IMetabaseAuditPolicy.FilterClass ;
IMetabaseAuditPolicy.TrackClassHistory ;
IAuditFilterCondition.Operation .
Возможные значения
Значение |
Краткое описание |
1048576 |
OpenConnection . Открытие
соединения. |
Перечисления сборки Metabase
## DeleteObjectOptions

DeleteObjectOptions
Описание
Перечисление  DeleteObjectOptions
содержит способы удаления ссылок на объекты репозитория.
Используется следующим методом:
IMetabase.DeleteObjectO .
Возможные значения
Значение |
Краткое описание |
0 |
Default_ . Значение
по умолчанию. Будет выполнена проверка ссылок на объекты репозитория
и выдано информационное сообщение. |
1 |
IgnoreDependents . Будет
выполнена проверка ссылок на объекты репозитория. Ссылки на объекты
репозитория не будут удалены. |
2 |
ForceDeleteDependents .
Будут удалены ссылки на объекты репозитория. Ссылки в справочниках
не будут удалены. |
Перечисления
сборки Metabase
## DictionarySpecificRights

DictionarySpecificRights
Описание
Перечисление  DictionarySpecificRights
содержит список специфических операций, доступных для различных  справочников НСИ .
Комментарии
Список основных и дополнительных операций доступен в перечислении  MetabaseObjectPredefinedRights .
Используется следующими свойствами и методами:
IMetabaseObjectDescriptor.HasAccess ;
IMetabaseObjectDescriptor.CheckAndAudit ;
IMetabaseObjectDescriptor.CheckAndAuditLabel ;
IMetabaseUser.HasAccess ;
ISecurityDescriptor.HasAccess ;
ISecurityDescriptor.HasAccessAudit ;
ISecurityDescriptor.HasAccessAuditLabel ;
ISecurityDescriptor.GetEffectiveRights ;
ISecurityDescriptor.GetEffectiveRightsAudit ;
ISecurityDescriptor.GetEffectiveRightsAuditLabel ;
IAccessControlList.AddAce ;
IAccessControlEntry.AccessMask ;
IMetabaseAuditPolicy.FilterClass ;
IMetabaseAuditPolicy.TrackClassHistory ;
IAuditFilterCondition.Operation .
Возможные значения
Значение |
Краткое описание |
1048576 |
ReadElements . Чтение
элементов справочника. |
2097152 |
UpdateElements . Изменение
элементов справочника. |
4194304 |
InsertElements . Добавление
элементов справочника. |
8388608 |
DeleteElements . Удаление
элементов справочника. |
16777216 |
AccessElements . Изменение
прав на элементы. |
Перечисления сборки Metabase
## DomainLogonType

DomainLogonType
Описание
Перечисление  DomainLogonType  тип содержит типы подключений к серверу, используемые при использовании доменной аутентификации.
Используется следующим свойством:
IDomainCredentials.LogonType .
Возможные значения
Значение |
Краткое описание |
0 |
Unknown . Использовать способ подключения по умолчанию. |
2 |
Interactive . Данный тип подключения предназначен для пользователей, которые в интерактивном режиме будут использовать компьютер, например для пользователей, подключающихся к терминальному серверу. |
3 |
Network . Данный тип используется при подключении к серверам с большой производительностью для проверки паролей, переданных открытым текстом. Системная функция не будет осуществлять кэширование указанных учетных данных при данном типе подключения. |
4 |
Batch . Данный тип используется при подключении к пакетному серверу, на котором процессы могут выполняться от имени пользователя без его прямого вмешательства. Данный тип также используется при подключении к серверам с большой производительностью, которые обрабатывают множество попыток аутентификации с паролем, передаваемым открытым текстом, например при подключении к почтовым или Веб-серверам. Кэширование учетных данных не производится. |
5 |
Service . Сервисное подключение. Соответствующий пользователь должен обладать соответствующей привилегией на сервере. |
Перечисления сборки Metabase
## DomainSelectType

DomainSelectType
Описание
Перечисление  DomainSelectType
содержит способы указания домена при поиске субъектов безопасности.
Используется следующими свойствами и методами:
ISecuritySubjectsSearch.DomainSelectCriteria .
Возможные значения
Значение |
Краткое описание |
0 |
Default_ . По умолчанию
(домен текущего пользователя). |
1 |
CurrentComputerDomain .
Домен текущего компьютера. |
2 |
SpecifiedDomain . Название
домена задано явно. Наименование указывается в свойстве  ISecuritySubjectsSearch.NameCriteria . |
3 |
DomainController . Задано
название контроллера домена. Наименование указывается в свойстве
ISecuritySubjectsSearch.NameCriteria . |
Перечисления
сборки Metabase
## DomainSubjectAddState

DomainSubjectAddState
Описание
Перечисление  DomainSubjectAddState  содержит значения, определяющие настройки добавления доменных субъектов безопасности.
Используется следующими свойствами и методами:
IMetabase.CurrentDomainSubjectAddState ;
IMetabaseSecurity.CurrentDomainSubjectAddState .
Возможные значения
Значение |
Краткое описание |
0 |
None . Действие не определено. |
1 |
CancelAdd . Отменить добавление. |
2 |
MakeExternalOn . Установить признак пользователя, подключаемого с сервера.
Если используется данный флаг, то для различных СУБД будут произведены следующие действия:
Oracle: в репозитории будет создан доменный пользователь, подключаемый с сервера. На сервере СУБД ни каких действий произведено не будет.
MSSQL: в репозитории будет создан доменный пользователь, подключаемый с сервера. На сервере СУБД в схеме репозитория будет создан пользователь.
|
4 |
MakeExternalOff . Не устанавливать признак пользователя, подключаемого с сервера.
Если используется данный флаг, то для различных СУБД будут произведены следующие действия:
Oracle: на сервере СУБД будет создан пользователь, наименование которого соответствует доменному пользователю. Созданный пользователь будет включен в список пользователей репозитория.
MSSQL: на сервере СУБД будут созданы учетные данные, соответствующие доменному пользователю. В схеме репозитория будет создан пользователь, имеющий соответствующие учетные данные.
|
16 |
ManageDBGrantsOff . Не раздавать права на объекты репозитория.
При использовании данного флага созданному пользователю не будут раздаваться права на уровне СУБД при изменении прав пользователя в платформе (включение пользователя в состав групп, изменение привилегий, изменения прав доступа к объектам платформы). |
32 |
ManageDBGrantsOn . Раздавать права на объекты репозитория.
При использовании данного флага созданному пользователю будут раздаваться права на уровне СУБД при изменении прав пользователя в платформе (включение пользователя в состав групп, изменение привилегий, изменения прав доступа к объектам платформы). |
64 |
Keep . Запомнить настройки для всех остальных случаев. |
Перечисления сборки Metabase
## FindAttribute

FindAttribute
Описание
Перечисление  FindAttribute  определяет
атрибут объектов репозитория, по которому будет осуществляться поиск.
Используется следующим свойством:
IMetabaseObjectFindInfo.Attribute .
Комментарии
Перечисление используется для совместимости с более старыми версиями
платформы. Для определения атрибута, по значениям которого требуется осуществить
поиск, в новых версиях платформы рекомендуется использовать перечисление
FindAttributeEx  .
Возможные значения
Значение |
Краткое описание |
-1 |
None . Значение не
определено. |
0 |
Name . Поиск будет осуществляться
по наименованиям объектов. |
1 |
Ident . Поиск будет
осуществляться по идентификаторам объектов. |
2 |
NameOrIdent . Поиск
будет осуществляться по наименованиям и идентификаторам объектов. |
Перечисления сборки Metabase
## FindAttributeEx

FindAttributeEx
Описание
Перечисление  FindAttributeEx
определяет атрибут объектов репозитория, по которому будет осуществляться
расширенный поиск.
Используется следующим свойством:
IMetabaseObjectFindInfo.AttributeEx .
Возможные значения
Значение |
Краткое описание |
0 |
None . Значение не определено. |
1
|
Name . Поиск будет осуществляться
по наименованиям объектов. |
2 |
Ident . Поиск будет
осуществляться по идентификаторам объектов. |
4
|
Key . Поиск будет осуществляться
по ключам объектов. |
8
|
Cache . Поиск будет
осуществляться по кэшируемым объектам.
|
Перечисления
сборки Metabase
## IsaModePromoteOptions

IsaModePromoteOptions
Описание
Перечисление  IsaModePromoteOptions  содержит параметры активации режима разделения ролей между администратором информационной безопасности (АИБ) и прикладным администратором (ПА). Используется свойством  IMetabasePolicy.PromoteToIsaMode .
Возможные значения
Значение |
Краткое описание |
0 |
None . АИБ не имеет прав на обновление пользователей. |
1 |
GrantDbSecurityAdmin . АИБ будет обладать привилегией «Применение прав пользователей на уровне СУБД», то есть сможет производить обновление пользователей. Прикладной администратор также сможет обновлять пользователей. |
2 |
RestrictAdminAccess . Пользователи, имеющие привилегию как у ПА ( Создание, удаление пользователей ), не смогут открывать объекты репозитория, будет игнорироваться наличие привилегии «Право чтения и открытия всех объектов». При попытке открыть объект репозитория будет выдано сообщение о том, что недостаточно прав для выполнения операции. |
4 |
RestrictIsaAccess . Пользователи, имеющие привилегию как у АИБ'а ( Изменение метки безопасности и списка контроля доступа любого объект ), не смогут открывать объекты репозитория, будет игнорироваться наличие привилегии «Право чтения и открытия всех объектов». При попытке открыть объект репозитория будет выдано сообщение о том, что недостаточно прав для выполнения операции. |
Перечисления сборки Metabase
## Перечисления сборки Metabase

Перечисления сборки Metabase
|
Перечисление |
Краткое описание |
|
AccessElementApplyOptions  |
Перечисление  AccessElementApplyOptions
содержит возможные варианты применения прав доступа на элемент. |
|
AccessElementAttributes  |
Перечисление  AccessElementAttributes
содержит типы атрибутов доступа. |
|
AceType  |
Перечисление  AceType
содержит типы дополнительных параметров безопасности объекта. |
|
AdmUserType  |
Перечисление  AdmUserType
содержит типы администраторов. |
|
ApplyStateType  |
Перечисление  ApplyStateType
содержит типы состояний восстановления пользователей/групп. |
|
AuditLogArchiveFormat  |
Перечисление  AuditLogArchiveFormat
содержит форматы файлов, в которые может быть сохранен протокол
доступа. |
|
AuditLogSpecificRights  |
Перечисление  AuditLogSpecificRights
содержит список специфических операций, доступных для протокола
доступа. |
|
AuditUserCredsScope  |
Перечисление  AuditUserCredsScope
используется для определения способа сохранения учётных данных
служебного
пользователя . |
|
AuthenticationMode  |
Перечисление  AuthenticationMode
сдержит типы аутентификации, используемые для какого-либо подключения. |
|
CalculatedCubeSpecificRights  |
Перечисление  CalculatedCubeSpecificRights
содержит список специфических операций, доступных для вычисляемых
кубов. |
|
CallbackOperationState  |
Перечисление  CallbackOperationState
содержит варианты разрешения конфликтов, возникающих при импорте
контейнера фильтров протокола доступа. |
|
CertificateStorageType  |
Перечисление  Перечисления сборки Metabase
определяет тип хранилища сертификатов. |
|
CheckAuditLoginConsistencyOptions  |
Перечисление  CheckAuditLoginConsistencyOptions
содержит варианты проверки служебного пользователя подсистемы
безопасности. |
|
ControlMethodsCombineAlgorithm  |
Перечисление  ControlMethodsCombineAlgorithm
содержит   алгоритмы
комбинации прав  по атрибутному и дискреционному
методу разграничения доступа. |
|
CubeLoaderSpecificRights  |
Перечисление  CubeLoaderSpecificRights
содержит список специфических операций, доступных для загрузчика
данных в куб. |
|
CubeSpecificRights  |
Перечисление  CubeSpecificRights
содержит список специфических операций, доступных для различных
видов кубов. |
|
CustomObjectSpecificRights  |
Перечисление  CustomObjectSpecificRights
содержит список специфических операций, доступных для объектов
пользовательских классов. |
|
DataBaseSpecificRights  |
Перечисление  DataBaseSpecificRights
содержит список специфических операций, доступных для объекта
репозитория « База
данных ». |
|
DeleteObjectOptions  |
Перечисление  DeleteObjectOptions
содержит способы удаления ссылок на объекты репозитория. |
|
DictionarySpecificRights  |
Перечисление  DictionarySpecificRights
содержит список специфических операций, доступных для различных
справочников
НСИ . |
|
DomainLogonType  |
Перечисление  DomainLogonType
тип содержит типы подключений к серверу, используемые при использовании
доменной аутентификации. |
|
DomainSelectType  |
Перечисление  Перечисления сборки Metabase
содержит способы указания домена при поиске субъектов безопасности. |
|
DomainSubjectAddState  |
Перечисление  DomainSubjectAddState
содержит значения, определяющие настройки добавления доменных
субъектов безопасности. |
|
FindAttribute  |
Перечисление  FindAttribute
определяет атрибут объектов репозитория, по которому будет осуществляться
поиск. |
|
FindAttributeEx  |
Перечисление  FindAttributeEx
определяет атрибут объектов репозитория, по которому будет осуществляться
расширенный поиск. |
|
IsaModePromoteOptions  |
Перечисление  IsaModePromoteOptions
содержит параметры активации режима разделения ролей администраторов. |
|
MbElementDependenciesTrackingType  |
Перечисление  MbElementDependenciesTrackingType
содержит типы отслеживания связей. |
|
MDCalcSpecificRights  |
Перечисление  MDCalcSpecificRights
содержит список специфических операций, доступных для объекта
репозитория « Многомерный
расчет на сервере БД ». |
|
MetabaseCheckStatus  |
Перечисление  MetabaseCheckStatus
возвращает статус объекта после проверки контрольной суммы. |
|
MetabaseConnectForAuditMode  |
Перечисление  MetabaseConnectForAuditMode
содержит режимы установки соединения с сервером БД для аудита
неудачных подключений. |
|
MetabaseDefinitionScope  |
Перечисление  MetabaseDefinitionScope
определяет для кого будет доступно описание репозитория. |
|
MetabaseExportObjectsRightsOrder  |
Перечисление  MetabaseExportObjectsRightsOrder
содержит варианты порядка записей в результирующем файле. |
|
MetabaseFetchOptions  |
Перечисление  Перечисления сборки Metabase
содержит варианты чтения объектов метабазы при  отложенной
загрузке описания . |
|
MetabaseObjectAlterType  |
Перечисление  MetabaseObjectAlterType
содержит варианты пересоздания объектов на уровне СУБД. |
|
MetabaseObjectAuditOperationState  |
Перечисление  MetabaseObjectAuditOperationState
содержит варианты аудита операции. |
|
MetabaseObjectCachingMode  |
Перечисление  MetabaseObjectCachingMode
используется для определения режима кэширования. |
|
MetabaseObjectClass  |
Перечисление  MetabaseObjectClass
содержит типы объектов репозитория. |
|
MetabaseObjectMetaclass  |
Перечисление  MetabaseObjectMetaclass
содержит классы объектов репозитория. |
|
MetabaseObjectOperation  |
Перечисление  MetabaseObjectOperation
содержит виды операций, которые могут производиться с объектами
репозитория. |
|
MetabaseObjectParamReadWriteMode  |
Перечисление  MetabaseObjectParamReadWriteMode
содержит режимы связи параметра объекта с глобальной переменной. |
|
MetabaseObjectPredefinedRights  |
Перечисление  MetabaseObjectPredefinedRights
содержит список операций, на которые могут раздаваться права пользователям и
вестись аудит доступа. |
|
MetabaseObjectUpdateBoundType  |
Перечисление  MetabaseObjectUpdateBoundType
определяет тип обновления объектов. |
|
MetabaseObjectUpdateConstraint  |
Перечисление  MetabaseObjectUpdateConstraint
определяет способ обновления объектов. |
|
MetabaseObjectUpdateOrder  |
Перечисление  MetabaseObjectUpdateOrder
используется для определения порядка обновления данных объектов. |
|
MetabaseObjectUpdatePart  |
Перечисление  MetabaseObjectUpdatePart
определяет способ обновления данных объектов репозитория. |
|
MetabaseObjectUpdateType  |
Перечисление  MetabaseObjectUpdateType
определяет тип обновления объектов репозитория. |
|
MetabaseObjectUpdateUnboundType  |
Перечисление  MetabaseObjectUpdateUnboundType
определяет тип обновления для репликации. |
|
MetabasePolicyPredefinedPrivilege  |
Перечисление  MetabasePolicyPredefinedPrivilege
содержит системные привилегии. |
|
MetabaseRefreshOptions  |
Перечисление  MetabaseRefreshOptions
определяет параметры обновления репозитория. |
|
MetabaseSecurityApplyInformation  |
Перечисление  MetabaseSecurityApplyInformation
содержит результаты применения политики безопасности. |
|
MetabaseSecuritySubjectUpdateType  |
Перечисление  MetabaseSecuritySubjectUpdateType
содержит способы обновления пользователей репозитория. |
|
MetabaseSpecialObject  |
Перечисление  MetabaseSpecialObject
содержит типы специальных объектов репозитория. |
|
MetabaseUpdateAccessTokenOptions  |
Перечисление  MetabaseUpdateAccessTokenOptions
содержит опции сохранения настроек мандатного контроля доступа
при сохранении параметров обновления объекта. |
|
MetabaseUpdateAccessType  |
Перечисление  MetabaseUpdateAccessType
содержит тип доступа к обновлению. |
|
MetabaseUpdateApplyOptions  |
Перечисление  MetabaseUpdateApplyOptions
содержит параметры обновления. |
|
MetabaseUpdateCopyType  |
Перечисление  MetabaseUpdateCopyType
содержит тип копирования обновления. |
|
MetabaseUpdateMethod  |
Перечисление  MetabaseUpdateMethod
определяет способ обновления объектов, содержащих какие-либо данные. |
|
MetabaseUpdateNodeAccessType  |
Перечисление  MetabaseUpdateNodeAccessType
содержит тип доступа к объекту обновления. |
|
MetabaseUpdateNodeType  |
Перечисление  MetabaseUpdateNodeType
определяет тип объекта обновления. |
|
MetabaseUpdateObjectApplyState  |
Перечисление  MetabaseUpdateObjectApplyState
содержит значения, соответствующие состоянию готовности объекта
к обновлению. |
|
MetabaseUpdateProgressStage  |
Перечисление  MetabaseUpdateProgressStage
содержит значения, соответствующие стадиям обновления объектов. |
|
MetabaseUpdateRemappingType  |
Перечисление  MetabaseUpdateRemappingType
используется для определения типа повторно сопоставляемого элемента
обновления. |
|
MetabaseUserLockedState  |
Перечисление  MetabaseUserLockedState
содержит состояния блокировки пользователей. |
|
MetabaseUsersUpdateCallbackResult  |
Перечисление  MetabaseUsersUpdateCallbackResult
содержит действия при работе с ошибками, возникшими при обновлении
пользователей. |
|
MetabaseUsersUpdateErrorType  |
Перечисление  MetabaseUsersUpdateErrorType
содержит типы ошибок при обновлении пользователей. |
|
NameCasePlural  |
Перечисление  NameCasePlural
содержит список падежей. |
|
ObjectUpdateDataBatchMode  |
Перечисление  ObjectUpdateDataBatchMode
содержит варианты обновления данных объекта. |
|
ProblemSpecificRights  |
Перечисление  ProblemSpecificRights
содержит список специфических операций, доступных для объекта
контейнера моделирования « Задача
моделирования ». |
|
ProcedureSpecificRights  |
Перечисление  ProcedureSpecificRights
содержит список специфических операций, доступных для объекта
репозитория « Процедура ». |
|
ProtocolSelectType  |
Перечисление  ProtocolSelectType
содержит протоколы, которые могут использоваться при подключении
к службе каталогов. |
|
ScenarioDimensionSpecificRights  |
Перечисление  ScenarioDimensionSpecificRights
содержит список специфических операций для объекта репозитория
« Сценарий
моделирования ». |
|
ScheduledTaskSpecificRights  |
Перечисление  ScheduledTaskSpecificRights
содержит список специфических операций, доступных для задач, создаваемых
в  контейнере
запланированных задач . |
|
ScreenshotType  |
Перечисление  ScreenshotType
используется для определения типа изображения при предварительном
просмотре объектов репозитория. |
|
SecurityDescriptorFlags  |
Перечисление  SecurityDescriptorFlags
определяет признак наследования прав доступа от родительского
объекта. |
|
SecurityPackageUserPrivilege  |
Перечисление  SecurityPackageUserPrivilege
содержит привилегии. |
|
SecuritySpecificRights  |
Перечисление  SecuritySpecificRights
содержит список специфических операций, доступных для политики
безопасности. |
|
SecuritySubjectLocation  |
Перечисление  SecuritySubjectLocation
содержит варианты размещения субъектов безопасности. |
|
SecuritySubjectMemberOfO  |
Перечисление  SecuritySubjectMemberOfO
содержит параметры получения групп, в которые входит субъект безопасности. |
|
SecuritySubjectType  |
Перечисление  SecuritySubjectType
содержит типы субъектов безопасности. |
|
SnapshotApplyOperationType  |
Перечисление  SnapshotApplyOperationType
содержит типы операций, производимых при применении политики безопасности. |
|
StationAccessType  |
Перечисление  StationAccessType
содержит типы доступа с рабочих станций. |
|
SysLogProtocol  |
Перечисление  SysLogProtocol
содержит типы протокола передачи сообщений о событиях безопасности
на syslog-сервер. |
|
SysLogSettingsScope  |
Перечисление  SysLogSettingsScope
содержит варианты местоположения хранения настроек подключения
к syslog-серверу. |
|
TableSpecificRights  |
Перечисление  TableSpecificRights
содержит список специфических операций, доступных для следующих
объектов репозитория: « Таблица »,
« Представление »,
« Журнал »,
« Присоединенная
таблица ». |
|
TeradataAuthenticationMethod  |
Перечисление  TeradataAuthenticationMethod
содержит типы механизмов аутентификации к СУБД Teradata. |
|
UpdateDataConstraintsHandlingType  |
Перечисление  UpdateDataConstraintsHandlingType
определяет способ обработки ограничений целостности данных. |
|
UpdateLoadMode  |
Перечисление  UpdateLoadMode
определяет метод загрузки объектов в обновление. |
|
UpdateObjectSpecificRights  |
Перечисление  UpdateObjectSpecificRights
содержит список специфических операций, доступных для объекта
репозитория - Обновление. |
|
UpdateReflectObjectsRightsType  |
Перечисление  UpdateReflectObjectsRightsType
определяет метод переноса прав на объекты репозитория при обновлении. |
|
UpdateSortMode  |
Перечисление  UpdateSortMode
содержит виды сортировки, которые можно применить к объектам обновления. |
|
ValidationSpecificRights  |
Перечисление  ValidationSpecificRights
содержит список специфических операций, доступных для объекта
репозитория «Правило валидации» и «Группа валидаций». |
Интерфейсы сборки Metabase
|  Классы
сборки Metabase  |
Примеры
## MbElementDependenciesTrackingType

MbElementDependenciesTrackingType
Описание
Перечисление  MbElementDependenciesTrackingType
содержит типы отслеживания связей.
Используется следующим свойством:
IMetabaseObjectDescriptor.ElementDependenciesTrackingType .
Возможные значения
Значение |
Краткое описание |
0 |
None . Отслеживание
связей не ведется. |
1 |
Dependecies . Отслеживать
использование элементов справочников НСИ в данном объекте. |
2 |
Dependents . Отслеживать
использование элементов объекта в других объектах репозитория
(Используется для справочников НСИ). |
Перечисления
сборки Metabase
## MDCalcSpecificRights

MDCalcSpecificRights
Описание
Перечисление  MDCalcSpecificRights
содержит список специфических операций, доступных для объекта репозитория
« Многомерный
расчет на сервере БД ».
Комментарии
Список основных и дополнительных операций доступен в перечислении  MetabaseObjectPredefinedRights .
Используется следующими свойствами и методами:
IMetabaseObjectDescriptor.HasAccess ;
IMetabaseObjectDescriptor.CheckAndAudit ;
IMetabaseObjectDescriptor.CheckAndAuditLabel ;
IMetabaseUser.HasAccess ;
ISecurityDescriptor.HasAccess ;
ISecurityDescriptor.HasAccessAudit ;
ISecurityDescriptor.HasAccessAuditLabel ;
ISecurityDescriptor.GetEffectiveRights ;
ISecurityDescriptor.GetEffectiveRightsAudit ;
ISecurityDescriptor.GetEffectiveRightsAuditLabel ;
IAccessControlList.AddAce ;
IAccessControlEntry.AccessMask ;
IMetabaseAuditPolicy.FilterClass ;
IMetabaseAuditPolicy.TrackClassHistory ;
IAuditFilterCondition.Operation .
Возможные значения
Значение |
Краткое описание |
1048576 |
Execute . Выполнения
расчет. |
Перечисления сборки Metabase
## MetabaseCheckStatus

MetabaseCheckStatus
Описание
Перечислиение  MetabaseCheckStatus  возвращает статус объекта после проверки контрольной суммы.
Используется следующим свойством:
IMetabaseCheckListItem.Status .
Возможные значения
Значение |
Краткое описание |
0 |
Undefined . Статус не определен. |
1 |
Identical . Объект в репозитории идентичен источнику. |
2 |
Different . Объект в репозитории отличен от источника. |
3 |
Absent . Объект в репозитории отсутствует. |
Перечисления сборки Metabase
## MetabaseConnectForAuditMode

MetabaseConnectForAuditMode
Описание
Перечисление  MetabaseConnectForAuditMode  содержит режимы установки соединения с сервером БД для аудита неудачных подключений.
Используется следующим свойством:
IMetabaseDefinition.ConnectForAuditMode .
Возможные значения
Значение |
Краткое описание |
0 |
SimpleThenComplex . Сначала с простым паролем, затем со сложным. |
1 |
ComplexThenSimple . Сначала со сложным паролем, затем с простым. |
Перечисления сборки Metabase
## MetabaseDefinitionScope

MetabaseDefinitionScope
Описание
Перечисление  MetabaseDefinitionScope  определяет местоположение хранения настроек подключения репозитория.
Используется следующими свойствами и методами:
IMetabaseDefinition.Scope .
Возможные значения
Значение |
Краткое описание |
0 |
CurrentUser . Настройки репозитория хранятся в ветке CURRENT_USER. |
1 |
LocalMachine . Настройки репозитория хранятся в ветке LOCAL_MACHINE. |
2 |
File . Н астройки репозитория хранятся в файле Metabases.xml, размещенном в каталоге с «Форсайт. Аналитическая платформа».  |
Перечисления сборки Metabase
## MetabaseExportObjectsRightsOrder

MetabaseExportObjectsRightsOrder
Описание
Перечисление  MetabaseExportObjectsRightsOrder  содержит варианты порядка записей в результирующем файле.
Комментарии
Используется свойством  IMetabaseSecurityExporter.ExportObjectsRights .
Возможные значения
Значение |
Краткое описание |
0 |
ByType . Права доступа в файле будут представлены по типу объектов. Например, сначала буду приведены права для всех папок, имеющихся в репозитории, затем для всех таблиц и т.д. |
1 |
Hierarchical . Права доступа в файле будут представлены в соответствии с имеющейся структурой в репозитории, то есть будет сформирована развернутая иерархия объектов репозитория, где дочерние объекты будут отсортированы по типу. Например, сначала буду приведены права для папки, расположенной в корне; затем будут представлены права для объектов, содержащихся внутри нее, но отсортированных по типу объектов и т.д. |
Перечисления сборки Metabase
## MetabaseFetchOptions

MetabaseFetchOptions
Описание
Перечисление  MetabaseFetchOptions  содержит варианты чтения объектов метабазы при  отложенной загрузке описания .
Используется следующими свойствами и методами:
IMetabase.FetchItem ;
IMetabase.FetchItemById ;
IMetabase.FetchItems ;
IMetabase.FetchItemsById .
Возможные значения
Значение |
Краткое описание |
0 |
None . Читается только объект. Значение по умолчанию. |
1 |
NoFetch . Чтение объектов только из памяти. |
2 |
Parent  . Чтение объектов вместе с родительскими.  |
4 |
ParentRec  . Чтение объектов вместе с родительскими (рекурсивное).  |
8 |
Children . Чтение объектов вместе с дочерними. |
16 |
ChildrenRec . Чтение объектов вместе с дочерними (рекурсивное). |
32 |
Dependencies . Чтение объектов вместе с теми, от которых они зависят. |
64 |
DependenciesRec . Чтение объектов месте с теми, от которых они зависят (рекурсивное). |
128 |
Dependents  . Чтение объектов вместе с теми, которые от них зависят.  |
256 |
DependentsRec  . Чтение объектов вместе с теми, которые от них зависят.  |
512 |
HasChildren  . Чтение объектов вместе с подсчётом количества дочерних объектов.  |
Перечисления сборки Metabase
## MetabaseObjectAlterType

MetabaseObjectAlterType
Описание
Перечисление  MetabaseObjectAlterType  содержит варианты пересоздания объектов на уровне СУБД. Используется следующим свойством:
IMetabaseUpdate.AlterType .
Возможные значения
Значение |
Краткое описание |
0 |
Default_ . По умолчанию. Производить пересоздание объекта, только если структура объекта изменилась. Данный вариант не актуален для класса «Процедура». |
1 |
Recreate . Всегда производить пересоздание объекта. Сначала производится удаление, потом создание нового. |
2 |
Restrict . Никогда не производить пересоздание объекта. |
Перечисления сборки Metabase
## MetabaseObjectAuditOperationState

MetabaseObjectAuditOperationState
Описание
Перечисление  MetabaseObjectAuditOperationState  содержит варианты аудита операции.
Комментарии
Используется следующими методами:
IMetabaseObjectDescriptor.CheckAndAuditOperation ;
IMetabaseObjectDescriptor.CheckAndAuditOperationLabel ,
Возможные значения
Значение |
Краткое описание |
0 |
Default . По умолчанию, используются настройки аудита репозитория. |
1 |
ForceDeny . Выполнение операции запрещено. Операция будет занесена в протокол с результатом неуспешно, если включен аудит для типа проверяемого объекта. |
2 |
ForceAudit . Операция будет запротоколирована. |
3 |
ForceDenyAndAudit . Выполнение операции запрещено. Операция будет занесена в протокол с результатом неуспешно. |
Перечисления сборки Metabase
## MetabaseObjectCachingMode

MetabaseObjectCachingMode
Описание
Перечисление  MetabaseObjectCachingMode
используется для определения режима кэширования.
Используется следующим свойством:
IMetabaseObject.CachingMode .
Возможные значения
Значение |
Краткое описание |
0 |
Default_ . Значение
по умолчанию. Используется для всех  объектов
репозитория.  |
1 |
DontCache . После открытия
объект репозитория не кэшируется, при каждом новом открытии будет
открываться некэшированная версия объекта репозитория. |
2 |
FlushCacheByTimestamp .
При открытии объект будет открыт, заново записан и сохранён в
кэш, если временная отметка кэшируемого объекта меньше, чем временная
отметка объекта в базе данных. |
Комментарии
Изменение значения перечисления  MetabaseObjectCachingMode
доступно только для справочников, в том числе, для справочников НСИ любого
типа.
Перечисления
сборки Metabase
## MetabaseObjectClass

MetabaseObjectClass
Описание
Перечисление  MetabaseObjectClass
содержит типы объектов репозитория.
Используется следующими свойствами и методами:
IAuditFilterCondition.ClassId ;
ICustomObjectResolver.ClassId ;
ICubeMetaUpdateAdditionalObject.SourceClassId ;
IMetabaseClass.CommonClassName ;
IMetabaseClass.GetMetabaseObjectClass ;
IMetabaseClass.IconIndex ;
IMetabaseCustomClass.ClassId ;
IMetabaseCreateFindInfo.ClassId ;
IMetabaseObjectCreateInfo.ClassId
IMetabaseObjectDescriptor.ClassId ;
IMetabaseObjectFindInfo.ClassId ;
IMetabaseObjectHistoryItem.ClassId ;
IMetabaseUpdateKeyMap.FindByOldId ;
IMetabaseUpdateObjectRemapping.ClassId ;
IMetabaseUpdateRemappings.FindByOldId ;
IMetabaseUpdateUnresolved.ClassId ;
IUiMetabaseObject.ObjectClassId .
Возможные значения
Значение |
Краткое описание |
0 |
KE_CLASS_FOLDER . Папка. |
1 |
KE_CLASS_SPECIALOBJECTS .
Специальный объект. |
2 |
KE_CLASS_METABASEUPDATEOBJECT .
Обновление. |
4 |
KE_CLASS_NAMESPACE_FOLDER .
Контейнер. Папка с собственным пространством имен для идентификаторов. |
16 |
KE_CLASS_SHORTCUT_AUDIT .
Специальный класс для аудита ярлыков. Данный класс можно передать
в настройки фильтра аудита по классам объектов репозитория  IMetabaseAuditPolicy.FilterClass
и нельзя использовать для создания объектов. |
32 |
KE_CLASS_REPOSITORY_AUDIT .
Специальный класс для аудита операций с репозиторием.
Примечание .
Создание объектов данного класса не поддерживается.
|
513 |
KE_CLASS_DATABASE .
База данных. |
769 |
KE_CLASS_TABLE . Таблица. |
770 |
KE_CLASS_QUERY . Запрос. |
771 |
KE_CLASS_VIEW . Представление. |
772 |
KE_CLASS_EXCEL_DS .
Источник данных - Excel.
Примечание .
Создание объектов данного класса не поддерживается.
|
773 |
KE_CLASS_DBF_DS . Источник
данных - DBF.
Примечание .
Создание объектов данного класса не поддерживается.
|
774 |
KE_CLASS_ACCESS_DS .
Источник данных - Access.
Примечание .
Создание объектов данного класса не поддерживается.
|
775 |
KE_CLASS_TXT_DS . Источник
данных - текстовый файл.
Примечание .
Создание объектов данного класса не поддерживается.
|
776 |
KE_CLASS_ODBC_DS . Источник
данных - ODBC. |
777 |
KE_CLASS_LOG . Журнал. |
778 |
KE_CLASS_EXTERNTABLE .
Присоединенная таблица. |
779 |
KE_CLASS_EXTERNVIEW .
Присоединенное представление. |
780 |
KE_CLASS_SEQUENCE  .
Сиквенс.  |
1025 |
KE_CLASS_STDDIM . Табличный
справочник. |
1026 |
KE_CLASS_CLNDIM . Календарный
справочник. |
1027 |
KE_CLASS_USERDIM . Вычисляемый
справочник. |
1028 |
KE_CLASS_CUSTOMDIM .
Конструируемый справочник. |
1029 |
KE_CLASS_DIMELEMENTGROUP .
Группа элементов измерения. |
1030 |
KE_CLASS_DIMSELECTIONSCHEMA .
Схема отметки элементов справочника. |
1031 |
KE_CLASS_ADOMDDIM .
Справочник ADOMD. |
1032 |
KE_CLASS_MSSCENARIODIM .
Сценарный справочник моделирования. |
1033 |
KE_CLASS_AUTOCUBEUNITSDIM .
Справочник единиц измерения. |
1034 |
KE_CLASS_RUBRICATORREVISIONSDIM .
Справочник ревизий в базе данных временных рядов. |
1035 |
KE_CLASS_COMPOUNDDIM .
Составной справочник. |
1036 |
KE_CLASS_COMPOUNDCLNDIM .
Составной календарный справочник. |
1037 |
KE_CLASS_VALIDATIONDIM .
Справочник валидаций в базе данных временных рядов. |
1038 |
KE_CLASS_RUBRICATORCALENDARLEVELSDIM .
Календарное измерение базы данных временных рядов. |
1039 |
KE_CLASS_SOURCEANDFIELDDIM .
Справочник источников и полей. |
1040 |
KE_CLASS_NUMSROWSDIM .
Справочник номеров строк. |
1041 |
KE_CLASS_DYNAMICDIM .
Справочник с динамической загрузкой данных.
Примечание .
Создание объектов данного класса не поддерживается.
|
1042 |
KE_CLASS_ATTRIBUTESDIM .
Справочник атрибутов базы данных временных рядов. |
1043 |
KE_CLASS_VIRTUALDIM .
Виртуальное измерение для строк/столбцов таблицы. |
1281 |
KE_CLASS_STDCUBE . Стандартный
куб. |
1282 |
KE_CLASS_CALCCUBE .
Вычисляемый куб. |
1283 |
KE_CLASS_CUBEVIEW .
Представление - куб. |
1284 |
KE_CLASS_VIRTUALCUBE .
Виртуальный куб. |
1285 |
KE_CLASS_CUBELINK .
Связь с кубом. |
1286 |
KE_CLASS_ADOMDCUBE .
Куб ADOMD. |
1287 |
KE_CLASS_AUTOCUBE .
Автоматический куб. |
1289 |
KE_CLASS_CUBELOADER .
Загрузчик в куб. |
1290 |
KE_CLASS_CUBEMETALOADER .
Загрузчик показателей. |
1291 |
KE_CLASS_SUBJECTAREA  .
Предметная область.  |
1292 |
KE_CLASS_INFOCUBE  .
«И нфокуб» для хранения параметров создания куб. |
1293 |
KE_CLASS_METRIC  .
Метрика.  |
1294 |
KE_CLASS_CUBE_CACHE_SAVER  .
О бъект кэша для кубов и измерений. |
1537 |
KE_CLASS_MODULE . Модуль. |
1538 |
KE_CLASS_FORM . Форма. |
1539 |
KE_CLASS_ASSEMBLY .
Сборка. |
1540 |
KE_CLASS_WEBFORM . Веб-форма. |
1793 |
KE_CLASS_WORKSPACE .
Рабочее пространство. |
2049 |
KE_CLASS_PIVOT . Основа
для построения таблицы с данными следующих объектов:
рабочая книга;
экспресс-отчет.
Примечание .
Создание объектов данного класса не поддерживается.
|
2561 |
KE_CLASS_EXPRESSREPORT .
Экспресс-отчет. |
2562 |
KE_CLASS_PROCEDURALREPORT .
Регламентный отчет. |
2817 |
KE_CLASS_BUSRUB . Бизнес
рубрикатор.
Примечание .
Работа с объектами данного класса более не поддерживается.
|
2818 |
KE_CLASS_BUSRUBCON .
Бизнес рубрикатор соединитель.
Примечание .
Работа с объектами данного класса более не поддерживается.
|
2819 |
KE_CLASS_BUSRUBFACT .
Бизнес рубрикатор показатель.
Примечание .
Работа с объектами данного класса более не поддерживается.
|
2820 |
KE_CLASS_BUSRUBCOMPOSITEFACT .
Бизнес рубрикатор составной показатель.
Примечание .
Работа с объектами данного класса более не поддерживается.
|
2822 |
KE_CLASS_RUBRICATOR .
Б аза данных временных рядов. |
2823 |
KE_CLASS_RUBRICATORFACTOR .
Показатель базы данных временных рядов. |
2823 |
KE_CLASS_RUBRICATORFACTORTRANSFORM .
Преобразованный показатель базы данных временных рядов. |
2824 |
KE_CLASS_IMPORTREQUEST .
Параметры импорта показателей в базу данных временных рядов. |
2825 |
KE_CLASS_EXPORTREQUEST .
Параметры экспорта показателей из базы данных временных рядов. |
2826 |
KE_CLASS_RUBRICATORSEGMENT .
Диапазон данных (сегмент) базы данных временных рядов. |
2827 |
KE_CLASS_WORKBOOK .
Рабочая книга. |
2828 |
KE_CLASS_CUBEMETAUPDATE .
Объект репликации. |
2829 |
KE_CLASS_RUBRICATORHIERARCHY  .
Иерархия ба зы данных временных рядов. |
3073 |
KE_CLASS_APPSERVER .
Планировщик задач. |
3074 |
KE_CLASS_METADICTIONARY .
Метаатрибуты базы данных временных рядов. |
3075 |
KE_CLASS_METARECORD .
Зарезервировано для внутреннего использования. |
3076 |
KE_CLASS_METADICTIONARYRDS .
Табличный справочник НСИ. |
3077 |
KE_CLASS_METADICTIONARYCOMPRDS .
Составной табличный справочник НСИ. |
3329 |
KE_CLASS_DOCUMENT .
Документ. |
3330 |
KE_CLASS_TOPOBASE .
Карта. |
3331 |
KE_CLASS_RESOURCEOBJECT .
Ресурсы. |
3332 |
KE_CLASS_STYLESHEET .
Таблица стилей. |
3333 |
KE_CLASS_SHAREDPARAMS .
Глобальные параметры. |
3841 |
KE_CLASS_SQLCOMMAND .
Команда СУБД. |
3842 |
KE_CLASS_PROCEDURE .
Процедура. |
3843 |
KE_CLASS_MDCALCULATION  .
Многомерный расчет на сервере базы данных. |
4097 |
KE_CLASS_ETLTASK . Задача
ETL. |
4353 |
KE_CLASS_RDS_DATABASE .
База данных НСИ. |
4354 |
KE_CLASS_RDS_DICTIONARY .
Справочник НСИ. |
4355 |
KE_CLASS_RDS_COMPDICTIONARY .
Составной справочник НСИ. |
4357 |
KE_CLASS_RDS_IMPORTREQUEST .
Объект импорта в справочник НСИ. |
4358 |
KE_CLASS_RDS_EXPORTREQUEST .
Объект экспорта из справочника НСИ. |
4609 |
KE_CLASS_DW_DATABASE .
База данных DW.
Примечание .
Создание объектов данного класса не поддерживается.
|
4610 |
KE_CLASS_DW_FACT . Показатель
DW.
Примечание .
Создание объектов данного класса не поддерживается.
|
4611 |
KE_CLASS_DW_FACTCUBE .
Куб показателя DW.
Примечание .
Создание объектов данного класса не поддерживается.
|
4624 |
KE_CLASS_DW_REPOSITORYDB .
Репозиторий расширенного хранилища данных.
Примечание .
Создание объектов класса не поддерживается.
|
4865 |
KE_CLASS_ADOMD_CATALOG .
База данных ADOMD. |
5121 |
KE_CLASS_MODELSPACE .
Контейнер моделирования. |
5122 |
KE_CLASS_MSVARIABLE .
Переменная моделирования. |
5123 |
KE_CLASS_MSPROBLEM .
Задача моделирования. |
5124 |
KE_CLASS_MSSCENARIO .
Сценарий моделирования. |
5125 |
KE_CLASS_MSMODEL . Модель. |
5126 |
KE_CLASS_MSMETAMODEL .
Метамодель. |
5127 |
KE_CLASS_MSMETAMODELCHART .
Граф метамодели. |
5128 |
KE_CLASS_CALCULATIONHISTORY .
История расчета. |
5129 |
KE_CLASS_VALIDATION  .
Валидация.  |
5130 |
KE_CLASS_VALIDATIONFILTER .
Фильтр валидации. |
5131 |
KE_CLASS_VALIDATIONGROUP .
Группа валидаций. |
5132 |
KE_CLASS_MSTABLEVIEW .
Табличный визуализатор для контейнера моделирования. |
5377 |
KE_CLASS_TASK_EXECUTESUB .
Выполнение модуля. |
5378 |
KE_CLASS_TASK_CONTAINTER .
Контейнер запланированных задач. |
5379 |
KE_CLASS_TASK_CALCULATECUBE .
Расчет вычисляемого куба. |
5380 |
KE_CLASS_TASK_CALCULATEREPORT .
Вычисление регламентного отчета. |
5381 |
KE_CLASS_TASK_EXECUTEETL .
Выполнение задачи ETL. |
5382 |
KE_CLASS_TASK_CALCULATEMODEL .
Задача вычисления модели. |
5384 |
KE_CLASS_TASK_CALCULATEMDCALCULATION .
Выполнение многомерного расчета на сервере БД. |
5386 |
KE_CLASS_TASK_UPDATE_CUBE_CACHE  .
Обновление кэша  для планировщика задач. |
5387 |
KE_CLASS_TASK_UPDATE_DIMENSION  .
Задача обновления измерения.  |
5388 |
KE_CLASS_TASK_SEARCHENGINE_IMPORT .
Задача обновления поискового индекса.  |
5389 |
KE_CLASS_BPM_SCHEDULEDTASK .
Задача бизнес-процесса. |
5889 |
KE_CLASS_CUSTOM_EXTENDER .
Контейнер пользовательских классов. |
5890 |
KE_CLASS_CUSTOM_CLASS .
Класс пользовательских метаданных. |
5891 |
KE_CLASS_CUSTOM_OBJECT .
Объект пользовательских метаданных. |
7937 |
KE_CLASS_SECURITY .
Политика безопасности. |
7938 |
KE_CLASS_AUDITLOG .
Протокол доступа. |
8193 |
KE_CLASS_METABASELINK .
Связь с репозиторием. |
8448 |
KE_ADHOC_REPORT . Аналитическая
панель. |
8449 |
KE_ADHOC_DATASOURCES .
Источники данных аналитической панели. |
8450 |
KE_ADHOC_THEME . Тема
оформления аналитической панели. |
8960
|
KE_CLASS_BPM_WORKSPACE .
Исполнитель бизнес-процесса.
|
8961
|
KE_CLASS_BPM_PROCESS .
Бизнес-процесс.
|
9473 |
KE_CLASS_PYTHON_MODULE .
Python-модуль. |
10241 |
KE_CLASS_JAVA_MODULE .
Java-модуль. |
Перечисления сборки Metabase
## MetabaseObjectMetaclass

MetabaseObjectMetaclass
Описание
Перечисление  MetabaseObjectMetaclass
содержит классы объектов репозитория.
Используется следующими свойствами и методами:
IMetabaseObjectFindInfo.ClassId ;
IMetabaseDialogMetaclassFilter.ObjectMetaclass .
Возможные значения
Значение |
Краткое описание |
0 |
FOLDER_CLASS . Папки. |
512 |
DATABASE_CLASS . Базы
данных. |
768 |
DATASET_CLASS . Наборы
данных. |
1024 |
DIMENSION_CLASS . Справочники. |
1280 |
CUBE_CLASS . Кубы. |
1536 |
FORE_CLASS . Объекты
среды разработки (модули, формы, сборки). |
1792 |
WORKSPACE_CLASS . Рабочие
пространства. |
2048 |
PIVOT_CLASS . Ядро экспресс-отчетов. |
2560 |
REPORT_CLASS . Отчеты. |
2816 |
BUSINESS_CLASS . Бизнес-объекты. |
3072 |
APPSERVER_CLASS . Планировщик
задач. |
3328 |
DOCUMENT_CLASS . Документ. |
3840 |
SQLCOMMAND_CLASS . SQL-команды. |
4096 |
ETL_CLASS . Задачи ETL. |
4352 |
RDS_CLASS . Объекты
репозитория НСИ. |
4608 |
DW_CLASS . Объекты базы
данных временных рядов. |
4864 |
ADOMD_CLASS . Объекты
кубов ADOMD. |
5120 |
MODEL_CLASS . Объекты
контейнера моделирования. |
5376 |
SCHEDULEDTASK_CLASS .
Задачи планировщика. |
5888 |
EXTENDER_CLASS . Класс
поддержки пользовательских метаданных. |
7936 |
SECURITY_CLASS . Политика
безопасности. |
8192 |
METABASELINK_CLASS .
Связи с репозиториями. |
8448 |
ADHOCREPORT_CLASS .
Аналитические панели. |
9472 |
PYTHON_CLASS . Python-модули. |
10240 |
JAVA_CLASS . Java-модули. |
Перечисления сборки Metabase
## MetabaseObjectOperation

MetabaseObjectOperation
Описание
Перечисление  MetabaseObjectOperation  содержит виды операций, которые могут производиться с объектами репозитория.
Используется следующим методом:
ISpecialObjects.Operation .
Возможные значения
Значение |
Краткое описание |
0 |
None . Операция не определена. |
1 |
Bind . Получение информации об объекте. |
2 |
Create . Создание нового объекта. |
4 |
Edit . Редактирование объекта. |
6 |
CreateAndEdit . Создание объекта и открытие его на редактирование. |
Перечисления сборки Metabase
## MetabaseObjectParamReadWriteMode

MetabaseObjectParamReadWriteMode
Описание
Перечисление  MetabaseObjectParamReadWriteMode
содержит режимы связи параметра объекта с глобальной переменной.
Используется следующими свойствами и методами:
IMetabaseObjectParamLink.ReadWriteMode .
Возможные значения
Значение |
Краткое описание |
0 |
ReadOnly . Режим с возможностью
только получения значения из глобальной переменной. |
1 |
ReadWrite . Режим с
возможностью получения и изменения значения глобальной переменной. |
Перечисления
сборки Metabase
## MetabaseObjectPredefinedRights

MetabaseObjectPredefinedRights
Описание
Перечисление  MetabaseObjectPredefinedRights
содержит список операций, на которые могут раздаваться права пользователям
и вестись аудит доступа.
Используется следующими свойствами и методами:
IMetabaseObjectDescriptor.HasAccess ;
IMetabaseObjectDescriptor.CheckAndAudit ;
IMetabaseObjectDescriptor.CheckAndAuditLabel ;
IMetabaseUser.HasAccess ;
ISecurityDescriptor.HasAccess ;
ISecurityDescriptor.HasAccessAudit ;
ISecurityDescriptor.HasAccessAuditLabel ;
ISecurityDescriptor.GetEffectiveRights ;
ISecurityDescriptor.GetEffectiveRightsAudit ;
ISecurityDescriptor.GetEffectiveRightsAuditLabel ;
IAccessControlList.AddAce ;
IAccessControlEntry.AccessMask ;
IMetabaseAuditPolicy.FilterClass ;
IMetabaseAuditPolicy.TrackClassHistory ;
IRubricatorFactor.GetEffectiveRights ;
IRubricatorSegment.GetEffectiveRights ;
IRubricatorSegmentsSet.GetEffectiveRights ;
IRubricatorFactor.GetSubjectEffectiveRights ;
IRubricatorSegment.GetSubjectEffectiveRights ;
IRubricatorSegmentsSet.GetSubjectEffectiveRights ;
IAuditFilterCondition.Operation .
Возможные значения
Значение |
Краткое описание |
1 |
All . Полный доступ. |
2 |
Read . Чтение данных
объекта.
При изменении прав на данное действие автоматически
будут изменены права на следующие операции: чтение дескриптора
( ReadDescr ), чтение параметров
( ReadPars ), чтение метаданных
( ReadBody ), а также на
дополнительные операции печать ( Print ),
экспорт ( ExportData ) и
специфические операции: извлечение данных, чтение формул, выполнение,
чтение элементов справочника, изменение прав на элементы. |
4 |
Write . Изменение данных
объекта.
При изменении прав на данное действие автоматически
будут изменены права на следующие операции: изменение дескриптора
( WriteDescr ), изменение
параметров ( WritePars ),
изменение метаданных ( WriteBody ),
создание ( Create_ ), а
также на дополнительную операцию импорт ( ImportData )
и специфические операции, связанные с изменением данных: вставка,
удаление, изменение данных, изменение структуры таблицы, сохранение
данных и формул, изменение текста процедуры, изменение и добавление
элементов справочника, изменение прав на элементы. |
8 |
Access . Изменение прав
доступа к объекту.
При изменении прав на данное действие автоматически
будут изменены права на следующие специфические операции: передача
прав на данные, изменение прав на элементы. |
16 |
Delete . Удаление объекта.
При изменении прав на данное действие автоматически
будут изменены права на следующие специфические операции: удаление
элементов из справочника, изменение прав на элементы. |
256 |
ReadDescr . Чтение дескриптора
(описания) объекта. |
512 |
WriteDescr . Изменение
дескриптора (описания) объекта. |
1024 |
ReadPars . Чтение параметров
объекта. |
2048 |
WritePars . Изменение
параметров объекта. |
4096 |
ReadBody . Чтение метаданных
объекта. |
8192 |
WriteBody . Изменение
метаданных объекта. |
16384 |
Print . Печать объекта. |
32768 |
ExportData . Экспорт
данных объекта. |
65536 |
ImportData . Импорт
данных объекта. |
131072 |
Create_ . Создание объектов. |
Комментарии
Значения данного перечисления используются при изменении следующих настроек:
настройка прав доступа к объекту;
настройка аудита доступа к объекту;
настройка аудита доступа по классам объектов;
настройка ведения истории по классам объектов.
О  бщие
операции  можно производить со всеми объектами репозитория. Операции
Print ,  ExportData
и  ImportData  являются  дополнительными
и доступны объектам, для которых есть возможность осуществить печать,
экспорт или импорт данных. Также различным классам объектов могут быть
доступны  специфические операции ,
представленные в перечислениях:
AuditLogSpecificRights ;
CalculatedCubeSpecificRights ;
CubeLoaderSpecificRights ;
CubeSpecificRights ;
CustomObjectSpecificRights ;
DataBaseSpecificRights ;
DictionarySpecificRights ;
MDCalcSpecificRights ;
ProblemSpecificRights ;
ProcedureSpecificRights ;
ScenarioDimensionSpecificRights ;
ScheduledTaskSpecificRights ;
SecuritySpecificRights ;
TableSpecificRights ;
UpdateObjectSpecificRights ;
ValidationSpecificRights .
Дополнительные  и  специфические
операции , доступные для различных видов объектов, представлены
в разделе «  Классы
объектов  ».
Перечисления сборки Metabase
## MetabaseObjectUpdateBoundType

MetabaseObjectUpdateBoundType
Описание
Перечисление  MetabaseObjectUpdateBoundType   определяет тип обновления объектов .
Используется следующими свойствами и методами:
IMetabaseUpdate.BoundType ;
IMetabaseUpdateObjectNode.BoundType .
Комментарии
None . Значение используется только для объекта репликации.
Inherit . Тип обновления для всего обновления определяется свойством  IMetabaseUpdate.BoundType .
MetabaseObjectUpdateBoundType  и  MetabaseObjectUpdateConstraint  следует использовать вместо  MetabaseObjectUpdateType .
Возможные значения
Значение |
Краткое описание |
0 |
None . Тип обновления не задан. |
1 |
ByKey . Обновление объектов по ключам. |
2 |
ById . Обновление объектов по идентификаторам. |
3 |
Inherit . Обновление объекта будет производиться так, как указано для всего обновления. |
Перечисления сборки Metabase
## MetabaseObjectUpdateConstraint

MetabaseObjectUpdateConstraint
Описание
Перечисление  MetabaseObjectUpdateConstraint  определяет способ обновления объектов.
Используется следующими свойствами и методами:
IMetabaseUpdate.Constraint ;
IMetabaseUpdateObjectNode.Constraint .
Комментарии
Inherit . Способ обновления для всего обновления определяется свойством  IMetabaseUpdate.Constraint .
MetabaseObjectUpdateConstraint  и  MetabaseObjectUpdateBoundType  следует использовать вместо  MetabaseObjectUpdateType .
Возможные значения
Значение |
Краткое описание |
0 |
None . Создавать новые и обновлять существующие объекты. |
1 |
CreateOnly . Всегда создавать новые объекты. |
2 |
UpdateOnly . Только обновлять объекты. |
3 |
Inherit . Обновление объекта будет производиться способом, указанным для всего обновления. |
Перечисления сборки Metabase
## MetabaseObjectUpdateOrder

MetabaseObjectUpdateOrder
Описание
Перечисление  MetabaseObjectUpdateOrder
используется для определения порядка обновления данных объектов.
Используется следующим свойством:
IMetabaseUpdateObjectNode.UpdateOrder .
Возможные значения
Значение |
Краткое описание |
0 |
Default . Порядок по
умолчанию. |
1 |
BeforeParent . Перед
родительским объектом. |
2 |
AfterParent . После
родительского объекта. |
3 |
AfterParentData . После
обновления данных родительского объекта. |
Перечисления
сборки Metabase
## MetabaseObjectUpdatePart

MetabaseObjectUpdatePart
Описание
Перечисление  MetabaseObjectUpdatePart
определяет способ обновления данных объектов репозитория.
Используется следующим свойством:
IMetabaseUpdateObjectNode.UpdatePart .
Возможные значения
Значение |
Краткое описание |
0 |
None . Значение не инициализировано. |
1 |
Metadata . Метаданные. |
2 |
SecurityDescriptor .
Права доступа. |
3 |
MetadataSD . Метаданные
+ Права доступа. |
4 |
Data . Данные (для справочников
НСИ, реляционных таблиц). |
5 |
DataMetadata . Данные
(для справочников НСИ, реляционных таблиц) + Метаданные. |
6 |
DataSD . Данные (для
справочников НСИ, реляционных таблиц) + Права доступа. |
7 |
DataMetadataSD . Данные
(для справочников НСИ, реляционных таблиц) + Метаданные + Права
доступа. |
16 |
CreateDescriptor . Создание
описания объекта. |
32 |
ReplaceSecurityDescriptor .
Дополнительные параметры безопасности объекта + настройки мандатного
доступа. Если   IMetabaseUpdate.AllowReplaceSD
установлено в значение  False ,
то значение игнорируется. |
Перечисления
сборки Metabase
## MetabaseObjectUpdateType

MetabaseObjectUpdateType
Описание
Перечисление  MetabaseObjectUpdateType
определяет тип обновления объектов репозитория.
Используется следующими свойствами и методами:
IMetabaseUpdate.UpdateType ;
IMetabaseUpdateObjectNode.UpdateType .
Возможные значения
Значение |
Краткое описание |
0 |
Simple . Значение по
умолчанию.
Если значение по умолчанию установлено для объектов
обновления, то будет использоваться тип обновления, установленный
для всего обновления.
Значение по умолчанию установленное для всего
обновления определяет обновление по ключу. Имеющиеся объекты будут
обновляться, отсутствующие - создаваться. |
1 |
Unbound . Значение,
зарезервированное для внутреннего использования. Используется
при репликации базы данных временных рядов. |
2 |
UnboundUpdate . Значение,
зарезервированное для внутреннего использования. Используется
при репликации базы данных временных рядов. |
4 |
UnboundParent . Значение,
зарезервированное для внутреннего использования. Используется
при репликации базы данных временных рядов. |
8 |
Bound . Объект имеет
собственные параметры типа обновления. Данное значение устанавливается
автоматически со следующими значениями:
MetabaseObjectUpdateType.BindById;
MetabaseObjectUpdateType.BindByKey;
MetabaseObjectUpdateType.UpdateOnly;
MetabaseObjectUpdateType.CreateOnly.
|
16 |
BindById . Обновляемый
объект будет искаться по идентификатору. |
32 |
BindByKey . Обновляемый
объект будет искаться по ключу. |
64 |
UpdateOnly . Объект
можно только обновлять. Создавать новый запрещено. |
128 |
CreateOnly . Объект
можно только создавать. Обновлять существующий объект запрещено. |
Перечисления сборки Metabase
## MetabaseObjectUpdateUnboundType

MetabaseObjectUpdateUnboundType
Описание
Перечисление  MetabaseObjectUpdateUnboundType  определяет тип обновления для репликации.
Используется следующим свойством:
IMetabaseUpdateObjectNode.UnboundType .
Комментарии
Перечисление предназначено для внутреннего использования при репликации базы данных временных рядов.
Возможные значения
Значение |
Краткое описание |
0 |
Bound . Объект обновляется. |
1 |
Unbound . Всегда создается новый объект. |
2 |
UnboundUpdate . Объект создается или обновляется. |
3 |
UnboundParent . Используется только для поиска дочерних объектов. |
Перечисления сборки Metabase
## MetabasePolicyPredefinedPrivilege

MetabasePolicyPredefinedPrivilege
Описание
Перечисление  MetabasePolicyPredefinedPrivilege  содержит системные привилегии.
Используется следующими свойствами и методами:
IPrivilege.Predefined ;
IMetabasePolicy.PredefinedPrivilege .
Возможные значения
Значение |
Краткое описание |
0 |
None . Привилегия не определена. |
1 |
Login . Привилегия входа в систему. |
2 |
ChangePrivileges . Изменение метки безопасности и списка контроля доступа любого объекта. Просмотр всех объектов в навигаторе. |
3 |
ChangeRights . Привилегия изменения прав пользователей, раздача ролей, изменение политики. |
4 |
ReadAnyObject . Право чтения и открытия всех объектов в навигаторе. |
5 |
ReadJournal . Привилегия просмотра протокола доступа. |
6 |
ClearJournal . Привилегия очистки протокола доступа. |
7 |
CreateUsers . Привилегия создания, удаления пользователей. |
8 |
DisconnectUsers . Привилегия отключения пользователей, подключенных к схеме. |
9 |
DbSecurityAdmin . Привилегия применения прав пользователей на уровне СУБД (обновление пользователей). |
10 |
OpenNavObjects . Привилегия входа в навигатор объектов репозитория. |
Перечисления сборки Metabase
## MetabaseRefreshOptions

MetabaseRefreshOptions
Описание
Перечисление  MetabaseRefreshOptions
определяет параметры обновления репозитория.
Используется следующим методом:
IMetabase.RefreshO .
Возможные значения
Значение |
Краткое описание |
0 |
Objects . Обновлять
объекты репозитория. |
1 |
ClearSecurity . Обновлять
политику безопасности. |
2 |
NoObjects . Не обновлять
объекты репозитория. |
4 |
NoRefreshEvent . Не
обновлять элементы управления, привязанные к списку объектов. |
8 |
AppendOnly . Не обновлять
объекты, находящиеся на удаленном компьютере. |
16 |
NoDependents . Не обновлять
элементы, зависимые от изменения объектов. |
32 |
FindParent . Значение
не используется, зарезервировано на будущее. |
64 |
Reconnect . Пересоединиться
с сервером БД репозитория. Для проверки состояния соединения с
сервером используется свойство  IsDisconnected . |
Комментарии
Обновление репозитория в режиме  Reconnect
не поддерживается, если код на Fore выполняется с помощью операции
ForeExec
при настроенном для BI-сервера  пуле
соединений  (группа настроек Pool).
Перечисления сборки Metabase
## MetabaseSecurityApplyInformation

MetabaseSecurityApplyInformation
Описание
Перечисление  MetabaseSecurityApplyInformation  содержит результаты применения политики безопасности. Используется следующими свойствами и методами:
IMetabaseSecurity.Apply ;
IMetabaseSecurity.ApplyWithInfo .
Возможные значения
Значение |
Краткое описание |
0 |
Default . Применение политики прошло нормально. |
1 |
NoSysGrants . При применении политики безопасности отсутствовали права на системные таблицы. Изменения вступят в силу после обновления пользователей. |
Перечисления сборки Metabase
## MetabaseSecuritySubjectUpdateType

MetabaseSecuritySubjectUpdateType
Описание
Перечисление  MetabaseSecuritySubjectUpdateType
содержит способы обновления пользователей репозитория. Используется следующими
свойствами и методами:
IMetabaseSecuritySubjectUpdateSetup.UpdateType ;
IMetabaseUsersUpdate.AddGroupUsers ;
IMetabaseUsersUpdate.AddSubject .
Возможные значения
Значение |
Краткое описание |
0 |
None . Не обновлять. |
1 |
DBGrant . Раздать права
на сервере БД в соответствии с правами на объекты репозитория. |
2 |
DBCreate . Создать пользователя
на сервере БД. |
3 |
DBGrantCreate . Создать
пользователя на сервере БД и раздать права на сервере БД в соответствии
с правами на объекты репозитория. |
Перечисления
сборки Metabase
## MetabaseSpecialObject

MetabaseSpecialObject
Описание
Перечисление  MetabaseSpecialObject
содержит типы специальных объектов репозитория.
Используется следующими свойствами и методами:
IMetabase.SpecialObject ;
IMetabaseObjectDescriptor.IsSpecial ;
IMetabaseUpdateSpecialObjectsNode.ApplyObject ;
IMetabaseUpdateSpecialObjectsNode.ObjectNode ;
ISpecialObjects.SpecialObject ;
ISpecialObjects.Operation .
Возможные значения
Значение |
Краткое описание |
0 |
None . Отсутствует. |
1 |
DefaultTopobase . Карта
по умолчанию. |
2 |
DimensionImageList .
Пиктограммы элементов измерения по умолчанию. |
3 |
SharedParams  .
Область глобальных переменных.  |
4 |
CustomExtender . Пользовательские
метаданные. |
5 |
Printers . Коллекция
принтеров, на которые пользователям разрешена печать. |
6 |
RdsDatabase . Репозиторий
НСИ по умолчанию. |
7 |
DefaultDatabase . База
данных по умолчанию. |
8 |
DefaultModelSpace .
Контейнер моделирования по умолчанию. |
10 |
MetabaseCustomEvents .
Обработчик пользовательских событий при работе с репозиторием
с помощью веб-сервиса. |
Перечисления сборки Metabase
## MetabaseUpdateAccessTokenOptions

MetabaseUpdateAccessTokenOptions
Описание
Перечисление  MetabaseUpdateAccessTokenOptions
содержит опции сохранения настроек мандатного контроля доступа при
сохранении параметров обновления объекта.
Используется следующим свойством:
IMetabaseUpdateObjectNode.AccessTokenOptions .
Возможные значения
Значение |
Краткое описание |
0 |
Default . По умолчанию:
1 |
из настроек мандатного контроля доступа исходного объекта. |
2 |
Manual . Ручное формирование
настроек мандатного контроля доступа. |
Перечисления
сборки Metabase
## MetabaseUpdateAccessType

MetabaseUpdateAccessType
Описание
Перечисление  MetabaseUpdateAccessType
содержит тип доступа к обновлению.
Используется следующими свойствами и методами:
IMetabaseUpdate.AccessAllowed .
Возможные значения
Значение |
Краткое описание |
0 |
None . Значение не определено. |
1 |
Full . Полный доступ
к обновлению. |
2 |
Restricted . Нет доступа
к обновлению. |
4 |
PartAccess . Доступ
к части объектов обновления. |
Перечисления
сборки Metabase
## MetabaseUpdateApplyOptions

MetabaseUpdateApplyOptions
Описание
Перечисление  MetabaseUpdateApplyOptions
содержит параметры обновления.
Используется следующим свойством:
IMetabaseUpdate.ApplyOptions .
Возможные значения
Значение |
Краткое описание |
0 |
None . Параметры отсутствуют. |
1 |
ReopenMetabase . После
обновления переоткрыть репозиторий. |
2 |
FlushCache . После обновления
очистить кэш, включая локальный кэш сборок. |
4 |
SetCurrentStamp . В
процессе установки обновления даты изменения обновляемых объектов
будут соответствовать реальным датам изменения объектов в репозитории
на момент формирования обновления. По умолчанию даты изменения
объектов, содержащихся в обновлении, будут соответствовать дате
установке обновления. |
8 |
UpdateUsers . После
обновления обновить пользователей. |
16 |
EnableIgnoreErrors .
Возможность игнорирования исключительных ситуаций. |
32 |
AutoCheckConflicts .
Автоматическая проверка на конфликты при выборе файла обновления.
Будет осуществляться автоматическая проверка файла обновления
при выборе файла в мастере обновления. |
64 |
EnableIgnoreConflicts .
Возможность игнорирования ошибок в процессе установке обновления.
В мастере обновления после проверки файла и при наличии каких-либо
конфликтов все равно будет возможность осуществить обновление. |
128 |
RequireResolveLinks .
Все ссылки должны быть разрешены. Под ссылками понимаются зависимости
объектов обновления от объектов репозитория-источника, которые
отсутствуют в репозитории назначения. При наличии неразрешенных
ссылок будет сгенерирована исключительная ситуация. |
256
|
SkipEnabled . При установке
пропускать элементы обновления, на которые нет прав. |
512
|
MakeExternalUsers .
При установке обновления делать пользователя подключаемым с сервера,
если он существует на уровне СУБД. |
1024
|
ClearMemberOf . Очищать
группы, в которые входит субъект безопасности. Например, если
в исходном репозитории субъект входит в группу А, а в целевом
репозитории - в группу Б, то после применения обновления в целевом
репозитории субъект будет входить только в группу А. |
Перечисления
сборки Metabase
## MetabaseUpdateCopyType

MetabaseUpdateCopyType
Описание
Перечисление  MetabaseUpdateCopyType
содержит тип копирования обновления.
Используется следующими свойствами и методами:
IMetabaseUpdateNode.AccessAllowed ;
IMetabaseUpdate.Copy .
Возможные значения
Значение |
Краткое описание |
0 |
Full . Полная копия. |
1 |
Available . Копия доступная
текущему пользователю. |
2 |
AvailableAdmin . Копия
доступная прикладному администратору при  разделении
ролей  администраторов. |
3 |
AvailableISA . Копия
доступная администратору информационной безопасности  при
разделении
ролей  администраторов. |
Перечисления
сборки Metabase
## MetabaseUpdateMethod

MetabaseUpdateMethod
Описание
Перечисление  MetabaseUpdateMethod
определяет способ обновления объектов, содержащих какие-либо данные.
Используется следующим свойством:
IMetabaseUpdateDataObjectNode.Method .
Возможные значения
Значение |
Краткое описание |
0 |
MetadataOnly . Обновлять
только метаданные объекта. |
1 |
DataOnly . Обновлять
только данные объекта. |
2 |
All . Обновлять данные
и метаданные объекта. |
Перечисления сборки Metabase
## MetabaseUpdateNodeAccessType

MetabaseUpdateNodeAccessType
Описание
Перечисление  MetabaseUpdateNodeAccessType
содержит тип доступа к объекту обновления.
Используется следующими свойствами и методами:
IMetabaseUpdateNode.AccessAllowed .
Возможные значения
Значение |
Краткое описание |
0 |
None . Значение не инициализировано. |
1 |
MetadataAllowed . Есть
доступ к метаданным. |
2 |
SecurityAllowed . Есть
доступ к правам. |
3 |
Full . Полный доступ. |
4 |
Restricted . Нет доступа. |
Перечисления
сборки Metabase
## MetabaseUpdateNodeType

MetabaseUpdateNodeType
Описание
Перечисление  MetabaseUpdateNodeType
определяет тип объекта обновления.
Используется следующими свойствами и методами:
IMetabaseUpdateNode.NodeType ;
IMetabaseUpdateFolderNode.Add .
Возможные значения
Значение |
Краткое описание |
0 |
Folder . Папка. |
1 |
Object . Объект репозитория. |
2 |
Sql . SQL-оператор. |
3 |
DeleteObject . Удаление
объекта репозитория. |
4 |
DataObject . Объект
репозитория, данные которого хранятся в связанных объектах на
сервере БД (таблицы, справочник НСИ). |
5 |
Comment . Комментарий. |
6 |
SecuritySubject  .
Субъект безопасности.  |
7 |
SpecialObjects . Специальные
объекты. |
8 |
AbacRules . Правила
атрибутного доступа. |
Перечисления сборки Metabase
## MetabaseUpdateObjectApplyState

MetabaseUpdateObjectApplyState
Описание
Перечисление  MetabaseUpdateObjectApplyState
содержит значения, соответствующие состоянию готовности объекта к обновлению.
Используется следующим свойством:
IMetabaseUpdateObjectApplyState.State .
Возможные значения
Значение |
Краткое описание |
0 |
None . Состояние не
определено. |
1 |
CreateNew . Создание
нового объекта. |
2 |
EditExisting . Обновление
существующего объекта. |
4 |
Conflict . Конфликт
при подготовке к обновлению. Данное состояние возникает в комбинации
со следующими значениями:
MetabaseUpdateObjectApplyState.ConflictKey
MetabaseUpdateObjectApplyState.ConflictId
MetabaseUpdateObjectApplyState.ConflictClassId
MetabaseUpdateObjectApplyState.ConflictObjectNotFound
MetabaseUpdateObjectApplyState.ConflictMissingMetadata
|
8 |
ConflictKey . Существует
объект с таким же ключом. |
16 |
ConflictId . Существует
объект с таким же идентификатором. |
32 |
ConflictClassId . Найденный
объект имеет другой класс. |
64 |
ConflictObjectNotFound .
Не найден объект, для которого установлен тип обновления  MetabaseObjectUpdateType.UpdateOnly . |
128 |
ConflictMissingMetadata .
В обновлении отсутствуют метаданные для создания объекта. |
256 |
ConflictVcsObject .
Найденный объект находится под управлением VCS. |
512 |
MandatoryConflict  .
Несоответствие между уровнями или категориями мандатного
доступа в обновлении и обновляемом репозитории. |
8192 |
ConflictDependenciesMissing .
У объекта отсутствуют зависимости. |
Перечисления сборки Metabase
## MetabaseUpdateProgressStage

MetabaseUpdateProgressStage
Описание
Перечисление  MetabaseUpdateProgressStage  содержит значения, соответствующие стадиям обновления объектов.
Используется следующим свойством:
IMetabaseUpdateProgressData.Stage .
Возможные значения
Значение |
Краткое описание |
0 |
Unknown . Неизвестное состояние. |
1 |
Start . Начало применения обновления к объектам репозитория. |
2 |
Prepare . Подготовка объекта к обновлению. |
3 |
Apply . Изменение объекта в репозитория в соответствии с настройками объекта в обновлении. |
4 |
Finish . Завершение применения обновления. |
5 |
LoadPrepare . Подготовка к синхронизации объектов репозитория с объектами в обновлении. |
6 |
LoadApply . Синхронизация объектов репозитория с объектами в обновлении. |
7 |
LoadFinish . Завершение синхронизации объектов репозитория с объектами в обновлении. |
8 |
AfterApply . Происходит после обновления объектов, перед завершением. На данной стадии осуществляется удаление объектов, для которых в репозитории были созданы шаблоны, но которые не удалось восстановить из обновления. |
Перечисления сборки Metabase
## MetabaseUpdateRemappingType

MetabaseUpdateRemappingType
Описание
Перечисление  MetabaseUpdateRemappingType
используется для определения типа повторно сопоставляемого элемента обновления.
Используется следующими свойствами и методами:
IMetabaseUpdateContext.RegisterAttributeIdChange ;
IMetabaseUpdateObjectRemapping.Map ;
IMetabaseUpdateRemapping.Type ;
IMetabaseUpdateRemappings.Type .
Возможные значения
Значение |
Краткое описание |
0 |
Unknown . Неизвестный
тип. |
1 |
Object . Объект репозитория. |
2 |
Hierarchy . Альтернативная
иерархия. |
3 |
MetafactsAttribute .
Атрибуты временных рядов. |
4 |
MetavalsAttribute .
Атрибуты объектов наблюдения. |
5 |
None . Тип не задан. |
Перечисления
сборки Metabase
## MetabaseUserLockedState

MetabaseUserLockedState
Описание
Перечисление  MetabaseUserLockedState  содержит состояния блокировки пользователей.
Используется следующим свойством:
IMetabaseUser.LockedState .
Комментарии
При установке значения «LockedForever» не будет возможности сменить состояние блокировки пользователя.
Возможные значения
Значение |
Краткое описание |
0 |
NotLocked . Не заблокирован. |
1 |
Locked . Заблокирован. |
3 |
LockedForever . Заблокирован навсегда. |
Перечисления сборки Metabase
## MetabaseUsersUpdateCallbackResult

MetabaseUsersUpdateCallbackResult
Описание
Перечисление  MetabaseUsersUpdateCallbackResult  содержит действия при работе с ошибками, возникшими при обновлении пользователей.
Используется следующими свойствами и методами:
IMetabaseUsersUpdateCallback.CallbackResult ;
IMetabaseUsersUpdateCallback.RequestAction .
Возможные значения
Значение |
Краткое описание |
0 |
Default_ . Действие по умолчанию. Продолжить до следующей ошибки. |
1 |
SilentContinue . Продолжить обновление без уведомления об ошибке. |
2 |
Abort . Прервать обновление. |
Перечисления сборки Metabase
## MetabaseUsersUpdateErrorType

MetabaseUsersUpdateErrorType
Описание
Перечисление  MetabaseUsersUpdateErrorType  содержит типы ошибок при обновлении пользователей.
Используется следующими свойствами и методами:
IMetabaseUsersUpdateError.Type .
Возможные значения
Значение |
Краткое описание |
1 |
Error .  Критическая ошибка.  |
2 |
Warning . Предупреждение. |
Перечисления сборки Metabase
## NameCasePlural

NameCasePlural
Описание
Перечисление  NameCasePlural  содержит список падежей.
Используется следующими свойствами и методами:
IMetabaseClass.CommonClassName ;
IMetabaseObjectDescriptor.CommonClassName .
Возможные значения
Значение |
Краткое описание |
0 |
Nominative . Именительный падеж. |
1 |
NominativePlural . Именительный падеж, множественное число. |
2 |
Genitive . Родительный падеж. |
3 |
GenitivePlural . Родительный падеж, множественное число. |
4 |
Accusative . Винительный падеж. |
5 |
AccusativePlural . Винительный падеж, множественное число. |
Перечисления сборки Metabase
## ObjectUpdateDataBatchMode

ObjectUpdateDataBatchMode
Описание
Перечисление  ObjectUpdateDataBatchMode  содержит варианты обновления данных объекта.
Используется следующими свойствами и методами:
IMetabaseUpdateDataObjectNode.BatchMode ;
ICubeMetaUpdateAdditionalObjectDataSettings.BatchMode .
Возможные значения
Значение |
Краткое описание |
-1 |
Default . Новые записи добавляются, имеющиеся будут обновлены, отсутствующие будут удалены. |
0 |
Override . Переписывать все данные объекта. Перед обновлением осуществляется очистка обновляемого объекта. |
1 |
InsertOnly . Только дополнять новыми записями данные объекта. |
2 |
UpdateOnly . Только обновлять данные объекта без добавления новых записей. |
3 |
UpdateInsert . Обновлять и дополнять данные объекта. В обновляемом объекте будут оставлены записи/элементы, отсутствующие в исходном объекте. |
Перечисления сборки Metabase
## ProblemSpecificRights

ProblemSpecificRights
Описание
Перечисление  ProblemSpecificRights
содержит список специфических операций, доступных для объекта контейнера
моделирования « Задача
моделирования ».
Комментарии
Список основных и дополнительных операций доступен в перечислении  MetabaseObjectPredefinedRights .
Используется следующими свойствами и методами:
IMetabaseObjectDescriptor.HasAccess ;
IMetabaseObjectDescriptor.CheckAndAudit ;
IMetabaseObjectDescriptor.CheckAndAuditLabel ;
IMetabaseUser.HasAccess ;
ISecurityDescriptor.HasAccess ;
ISecurityDescriptor.HasAccessAudit ;
ISecurityDescriptor.HasAccessAuditLabel ;
ISecurityDescriptor.GetEffectiveRights ;
ISecurityDescriptor.GetEffectiveRightsAudit ;
ISecurityDescriptor.GetEffectiveRightsAuditLabel ;
IAccessControlList.AddAce ;
IAccessControlEntry.AccessMask ;
IMetabaseAuditPolicy.FilterClass ;
IMetabaseAuditPolicy.TrackClassHistory ;
IAuditFilterCondition.Operation .
Возможные значения
Значение |
Краткое описание |
1048576 |
Execute . Запуск расчета
задачи моделирования. |
Перечисления сборки Metabase
## ProcedureSpecificRights

ProcedureSpecificRights
Описание
Перечисление  ProcedureSpecificRights
содержит список специфических операций, доступных для объекта репозитория
« Процедура ».
Комментарии
Список основных и дополнительных операций доступен в перечислении  MetabaseObjectPredefinedRights .
Используется следующими свойствами и методами:
IMetabaseObjectDescriptor.HasAccess ;
IMetabaseObjectDescriptor.CheckAndAudit ;
IMetabaseObjectDescriptor.CheckAndAuditLabel ;
IMetabaseUser.HasAccess ;
ISecurityDescriptor.HasAccess ;
ISecurityDescriptor.HasAccessAudit ;
ISecurityDescriptor.HasAccessAuditLabel ;
ISecurityDescriptor.GetEffectiveRights ;
ISecurityDescriptor.GetEffectiveRightsAudit ;
ISecurityDescriptor.GetEffectiveRightsAuditLabel ;
IAccessControlList.AddAce ;
IAccessControlEntry.AccessMask ;
IMetabaseAuditPolicy.FilterClass ;
IMetabaseAuditPolicy.TrackClassHistory ;
IAuditFilterCondition.Operation .
Возможные значения
Значение |
Краткое описание |
1048576 |
Execute . Выполнение
процедуры. |
2097152 |
Alter . Изменение текста
процедуры. |
4194304 |
Grant . Передача прав
на данные. |
Перечисления сборки Metabase
## ProtocolSelectType

ProtocolSelectType
Описание
Перечисление  ProtocolSelectType
содержит протоколы, которые могут использоваться при подключении к службе
каталогов.
Используется следующими свойствами и методами:
ISecuritySubjectsSearch.ProtocolSelectCriteria .
Возможные значения
Значение |
Краткое описание |
0 |
LDAP . Протокол LDAP
(Используется по умолчанию). |
1 |
GC . Подключение к службе
каталогов на базе Active Directory по протоколу LDAP. |
2 |
OpenLDAP . Подключение
к службе каталогов с использованием OpenLDAP (открытая реализация
протокола LDAP). Используется, если служба каталогов организована
на сервере с ОС Linux. |
Комментарии
Для подключения к службе каталогов с использованием OpenLDAP требуется
задание дополнительных настроек. Более подробно читайте в статье « Механизм работы
с службами каталогов ».
Перечисления
сборки Metabase
## ScenarioDimensionSpecificRights

ScenarioDimensionSpecificRights
Описание
Перечисление  ScenarioDimensionSpecificRights
содержит список специфических операций для объекта репозитория « Сценарий
моделирования ».
Комментарии
Список основных и дополнительных операций доступен в перечислении  MetabaseObjectPredefinedRights .
Используется следующими свойствами и методами:
IMetabaseObjectDescriptor.HasAccess ;
IMetabaseObjectDescriptor.CheckAndAudit ;
IMetabaseObjectDescriptor.CheckAndAuditLabel ;
IMetabaseUser.HasAccess ;
ISecurityDescriptor.HasAccess ;
ISecurityDescriptor.HasAccessAudit ;
ISecurityDescriptor.HasAccessAuditLabel ;
ISecurityDescriptor.GetEffectiveRights ;
ISecurityDescriptor.GetEffectiveRightsAudit ;
ISecurityDescriptor.GetEffectiveRightsAuditLabel ;
IAccessControlList.AddAce ;
IAccessControlEntry.AccessMask ;
IMetabaseAuditPolicy.FilterClass ;
IMetabaseAuditPolicy.TrackClassHistory ;
IAuditFilterCondition.Operation .
Возможные значения
Значение |
Краткое описание |
1048576 |
WriteFact . Запись данных
по сценарию « Факт ». Это
право наследуется от прав  MetabaseObjectPredefinedRights.Write
и  MetabaseObjectPredefinedRights.WriteBody .
Если разрешено право  Write
или  WriteBody , то право
WriteFact  тоже будет
разрешено для пользователя. И наоборот: если право  WriteFact
явно запрещено для пользователя, то права  Write
и  WriteBody  будут тоже
явно запрещены. |
Перечисления
сборки Metabase
## ScheduledTaskSpecificRights

ScheduledTaskSpecificRights
Описание
Перечисление  ScheduledTaskSpecificRights
содержит список специфических операций, доступных для задач, создаваемых
в  контейнере
запланированных задач .
Комментарии
Список основных и дополнительных операций доступен в перечислении  MetabaseObjectPredefinedRights .
Используется следующими свойствами и методами:
IMetabaseAuditPolicy.FilterClass ;
IMetabaseAuditPolicy.TrackClassHistory ;
IAuditFilterCondition.Operation .
Возможные значения
Значение |
Краткое описание |
1048576 |
Execute  - выполнение
задачи. |
Перечисления сборки Metabase
## ScreenshotType

ScreenshotType
Описание
Перечисление  ScreenshotType
используется для определения типа изображения при предварительном просмотре
объектов репозитория.
Используется следующими свойствами и методами:
IMetabaseObjectDescriptor.Screenshot ;
IMetabaseObjectDescriptor.LoadChildScreenshots .
Комментарии
Под предварительным просмотром понимается представление объектов репозитория
в навигаторе в виде  огромных
значков .
Предварительный просмотр в виде изображения первой страницы доступен для
отчётов, созданных с помощью инструментов «  Аналитические
панели  », «  Аналитические
запросы (OLAP)  », «  Отчёты  »
и «  Анализ временных рядов  ».
В  конструкторе
бизнес-приложений  вид элемента в навигаторе определяется
при  настройке
параметров отображения пользовательских объектов .
Возможные значения
Значение |
Краткое описание |
1 |
Default_ . По умолчанию.
Тип изображения при предварительном просмотре - «PNG» любого
размера. |
2 |
Emf . Тип изображения
при предварительном просмотре - «EMF». |
3 |
Custom .  Огромные значки .
Тип изображения при предварительном просмотре - «PNG». Изображение
не обновляется при сохранении отчёта. |
4 |
CustomM .  Крупные значки .
Тип изображения при предварительном просмотре - «PNG». Изображение
не обновляется при сохранении отчёта. |
5 |
CustomS .  Мелкие значки .
Тип изображения при предварительном просмотре - «PNG». Изображение
не обновляется при сохранении отчёта. |
Примечание .
Значения « CustomM » и « CustomS »
используются только для определения типа  заданного
эскиза объекта  в  конструкторе
бизнес-приложений .
Перечисления
сборки Metabase
## SecurityDescriptorApplyFlags

SecurityDescriptorApplyFlags
Описание
Перечисление  SecurityDescriptorApplyFlags  содержит варианты применения прав для объектов репозитория.
Используется следующим методом:
ISecurityDescriptor.ApplyO .
Возможные значения
Значение |
Краткое описание |
0 |
None . Права для текущего объекта не применяются. |
1 |
ByHierarchy . Права применяются для всех вложенных объектов по иерархии. |
2 |
ToInternal . Права применяются для внутренних объектов и объектов, для которых установлен признак  отложенной загрузки описания . |
Перечисления сборки Metabase
## SecurityDescriptorFlags

SecurityDescriptorFlags
Описание
Перечисление  SecurityDescriptorFlags  определяет признак наследования прав доступа от родительского объекта.
Используется следующим свойством:
ISecurityDescriptor.Flags .
Возможные значения
Значение |
Краткое описание |
0 |
InheritedByChildren . Наследование для детей. Права доступа к объекту не будут наследоваться для родительского объекта, но будут наследоваться от родительского объекта для его детей. |
1 |
AutoInherited . Описание является унаследованным. Права доступа к объекту будут наследоваться от родительского объекта, а также определяться списком субъектов безопасности, определенных для объекта. |
2 |
Locked . Защита от унаследования. Права доступа к объекту будут определяться списком субъектов безопасности, определенных для объекта. |
Перечисления сборки Metabase
## SecurityPackageUserPrivilege

SecurityPackageUserPrivilege
Описание
Перечисление  SecurityPackageUserPrivilege
содержит привилегии и настройки политики безопасности. Используется следующими
свойствами:
ISecurityPackageUserData.HasPrivilege ;
IApplicationRole.Privilegies .
Возможные значения
Значение |
Краткое описание |
0 |
None . |
1 |
ChangeUsers . Привилегия
создания, удаления пользователей. |
2 |
ChangeRights . Привилегия
изменения прав пользователей, раздача ролей, изменение политики. |
4 |
ReadJournal . Привилегия
просмотра протокола доступа. |
8 |
ClearJournal . Привилегия
очистки протокола доступа. |
16 |
LoginDB . Привилегия
входа в систему. |
32 |
ConnectServer . Привилегия
установки соединения с сервером. |
64 |
EnforceApplicationRole .
Включена роль приложения. |
128 |
DerivedPasswords . Включено
хэширование пароля. |
256 |
IsApplicationRole .
Признак роли приложения. |
512 |
DisconnectUsers . Привилегия
отключения пользователей, подключенных к схеме. |
1024 |
DbSecurityAdmin . Привилегия
применения прав пользователей на уровне СУБД. |
2048 |
DbAdmin . Привилегия
db_owner в БД MSSQL. |
4096 |
ProcGrantRevoke . Привилегия
на запуск процедуры, которая раздает права на системные таблицы
репозитория. |
Перечисления сборки Metabase
## SecuritySpecificRights

SecuritySpecificRights
Описание
Перечисление  SecuritySpecificRights  содержит список специфических операций, доступных для политики безопасности.
Комментарии
Список основных и дополнительных операций доступен в перечислении  MetabaseObjectPredefinedRights .
Используется следующими свойствами и методами:
IMetabaseAuditPolicy.FilterClass ;
IMetabaseAuditPolicy.TrackClassHistory ;
IAuditFilterCondition.Operation .
Возможные значения
Значение |
Краткое описание |
1048576 |
Read . Чтение политики безопасности. |
2097152 |
Write . Запись политики безопасности. |
4194304 |
SaveSnapshot . Сохранение контура политики безопасности. |
8388608 |
ApplySnapshot . Применение контура политики безопасности. |
Перечисления сборки Metabase
## SecuritySubjectLocation

SecuritySubjectLocation
Описание
Перечисление  SecuritySubjectLocation
содержит варианты размещения субъектов безопасности.
Используется следующим свойством:
Команда
SelectSecSubject .
Возможные значения
Значение |
Краткое описание |
0 |
None . Размещение субъектов
безопасности по умолчанию. |
1 |
All . Все субъекты безопасности
(доменные и субъекты СУБД). |
2 |
DbUsers . Субъекты СУБД. |
3 |
DomainUsers . Доменные
субъекты. |
Перечисления сборки Metabase
## SecuritySubjectMemberOfO

SecuritySubjectMemberOfO
Описание
Перечисление  SecuritySubjectMemberOfO
содержит параметры получения групп, в которые входит субъект безопасности.
Используется следующим методом:
ISecuritySubject.MemberOfO .
Возможные значения
Значение |
Краткое описание |
0 |
Default_ . Значение
по умолчанию, при этом метод будет выполнен также, как и метод
ISecuritySubject.MemberOf . |
2097152 |
GetStored . Зарезервировано
для внутреннего использования. |
33554432 |
CheckSsExists . Зарезервировано
для внутреннего использования. |
67108864 |
NoNTFetch . Не обращаться
за информацией к службе каталогов, возвращать список групп, кэшированный
в репозитории. |
268435456 |
NoGroupInGroup . Зарезервировано
для внутреннего использования. |
Комментарии
Если в организации, где будет использоваться прикладной проект, организована
сложная структура служб каталогов, то использование метода  ISecuritySubject.MemberOfO
с параметром  NoNTFetch  может значительно
сократить время выполнения метода.
Перечисления
сборки Metabase
## SecuritySubjectType

SecuritySubjectType
Описание
Перечисление  SecuritySubjectType
содержит типы субъектов безопасности.
Используется следующими свойствами и методами:
ISecuritySnapshotLog.SubjectType ;
ISecuritySubjectsSearch.SubjectCriteria ;
Команда
SelectSecSubject .
Возможные значения
Значение |
Краткое описание |
0 |
Unknown . Неизвестный
тип субъекта. |
1 |
User . Пользователь. |
2 |
Group . Группа. |
Перечисления сборки Metabase
## SnapshotApplyOperationType

SnapshotApplyOperationType
Описание
Перечисление  SnapshotApplyOperationType  содержит типы операций, производимых при применении политики безопасности.
Используется следующим методом:
ISecuritySnapshotCallback.OnOperation .
Возможные значения
Значение |
Краткое описание |
0 |
None . Нет. |
1 |
Begin . Начало. |
2 |
Read . Чтение из файла. |
3 |
Prepare . Чтение из репозитория и сравнение. |
4 |
Descriptors . Добавление дескрипторов прав доступа. |
5 |
Objects . Установка прав на объекты. |
6 |
Security . Политика безопасности. |
7 |
IsaUser . Активация АИБ. |
8 |
UpdateUsers . Обновление пользователей. |
9 |
End . Окончание. |
Перечисления сборки Metabase
## StationAccessType

StationAccessType
Описание
Перечисление  StationAccessType  содержит типы доступа с рабочих станций.
Используется следующими свойствами и методами:
IStation.Access ;
IStations.Access .
Возможные значения
Значение |
Краткое описание |
0 |
Default . Доступ по умолчанию. |
1 |
Forbidden . Запрещен доступ. |
2 |
Allowed . Разрешен доступ. |
Перечисления сборки Metabase
## SysLogProtocol

SysLogProtocol
Описание
Перечисление  SysLogProtocol
содержит типы протокола передачи сообщений о событиях безопасности на
syslog-сервер.
Используется следующими свойствами и методами:
ISysLogSettings.Protocol .
Возможные значения
Значение |
Краткое описание |
0
|
UDP . Протокол UDP.
По умолчанию. |
1 |
TCP . Протокол TCP. |
Перечисления
сборки Metabase
## SysLogSettingsScope

SysLogSettingsScope
Описание
Перечисление  SysLogSettingsScope
содержит варианты местоположения хранения настроек подключения к syslog-серверу.
Используется следующими свойствами и методами:
ISysLogSettings.Scope .
Возможные значения
Значение |
Краткое описание |
0 |
File . В файле settings.xml. |
1 |
CurrentUser . В реестре
в разделе [HKEY_CURRENT_USER]. |
2 |
LocalMachine . В реестре
в ветке в разделе [HKEY_LOCAL_MACHINE].  |
Перечисления
сборки Metabase
## TableSpecificRights

TableSpecificRights
Описание
Перечисление  TableSpecificRights
содержит список специфических операций, доступных для следующих объектов
репозитория: « Таблица »,
« Представление »,
« Журнал »,
« Присоединенная
таблица ».
Комментарии
Список основных и дополнительных операций доступен в перечислении  MetabaseObjectPredefinedRights .
Используется следующими свойствами и методами:
IMetabaseObjectDescriptor.HasAccess ;
IMetabaseObjectDescriptor.CheckAndAudit ;
IMetabaseObjectDescriptor.CheckAndAuditLabel ;
IMetabaseUser.HasAccess ;
ISecurityDescriptor.HasAccess ;
ISecurityDescriptor.HasAccessAudit ;
ISecurityDescriptor.HasAccessAuditLabel ;
ISecurityDescriptor.GetEffectiveRights ;
ISecurityDescriptor.GetEffectiveRightsAudit ;
ISecurityDescriptor.GetEffectiveRightsAuditLabel ;
IAccessControlList.AddAce ;
IAccessControlEntry.AccessMask ;
IMetabaseAuditPolicy.FilterClass ;
IMetabaseAuditPolicy.TrackClassHistory ;
IAuditFilterCondition.Operation .
Возможные значения
Значение |
Краткое описание |
1048576 |
SelectRows . Извлечение
данных. |
2097152 |
InsertRows . Вставка
данных. |
4194304 |
UpdateRows . Изменение
данных. |
8388608  |
DeleteRows . Удаление
данных. |
16777216 |
Grant  . Передача
прав на данные.  |
33554432 |
Alter . Изменение структуры
таблицы. |
Перечисления сборки Metabase
## TeradataAuthenticationMethod

TeradataAuthenticationMethod
Описание
Перечисление  TeradataAuthenticationMethod
содержит типы механизмов аутентификации к СУБД Teradata.
Используется следующими свойствами и методами:
IPrimaryTeradataSPLD.AuthenticationMethod .
Возможные значения
Значение |
Краткое описание |
0 |
Default_ . Встроенный
механизм аутентификации. |
1 |
LDAP . Механизм аутентификации
LDAP. |
2 |
Kerberos . Механизм
аутентификации Kerberos. |
Перечисления сборки Metabase
## UpdateDataConstraintsHandlingType

UpdateDataConstraintsHandlingType
Описание
Перечисление  UpdateDataConstraintsHandlingType
определяет способ обработки ограничений целостности данных.
Используется следующими свойствами и методами:
IMetabaseUpdateDataObjectNode.ReferenceConstraintsHandling ;
IMetabaseUpdateUserEvents.OnAskConstraintsHandling ;
IMetabaseUpdateProgress.OnAskConstraintsHandling ;
ICubeMetaUpdateAdditionalObjectDataSettings.ReferenceConstraintsHandling .
Возможные значения
Значение |
Краткое описание |
0 |
Default_ . Способ не
установлен. Выбирается ядром. |
1 |
Ask . Запрашивать в
диалоге. В случае если в обновляемом объекте присутствуют элементы/записи,
отсутствующие в обновлении, будет выдан диалог, в котором производится
выбора действия. При обновлении через язык Fore будет генерироваться
событие  OnAskConstraintsHandling ,
в котором можно обработать конкретные ситуации. |
2 |
NoCheck . Не проверять.
Объект будет обновлен без проверки целостности. |
3 |
KeepRecordUnchanged .
Не удалять/не изменять элементы/записи. В случае если в обновляемом
объекте присутствуют элементы/записи, отсутствующие в обновлении,
то такие записи будут сохранены. |
4 |
KeepTableUnchanged .
Не обновлять весь справочник/таблицу. Объект не будет обновлен,
если в нем присутствуют элементы/записи, отсутствующие в обновлении. |
5 |
ErrorBreak . Генерировать
исключительную ситуацию. Процесс обновления объекта будет прерван
с ошибкой, если присутствуют элементы/записи, отсутствующие в
обновлении. |
Перечисления сборки Metabase
## UpdateLoadMode

UpdateLoadMode
Описание
Перечисление  UpdateLoadMode
содержит режимы обновления различных объектов.
определяет метод загрузки объектов в обновление.
Используется следующими методами:
IMetabaseUpdate.LoadFromFile ;
IMetabaseUpdate.LoadFromFileNF ;
IMetabaseUpdateObject.ReadUpdate ;
IMetabaseUpdateObject.WriteUpdate ;
IMetaRdsImportSchema.Mode ;
IMetaRdsLoader.Load ;
IDtRdsConsumer.UpdateMode .
Возможные значения
Значение |
Краткое описание |
0 |
Replace . Замещать объекты
в обновлении. |
1 |
Insert . Добавлять только
новые объекты. |
2 |
Update . Обновлять только
существующие объекты. |
3 |
InsertUpdate . Добавлять
новые объекты и обновлять существующие. |
4 |
NoUpdate . Не обновлять
существующие объекты. |
128 |
Refresh . Данное значение
не предназначено для использования в прикладном коде. |
256 |
Start . Данное значение
не предназначено для использования в прикладном коде. |
512 |
Apply . Данное значение
не предназначено для использования в прикладном коде. |
Перечисления сборки Metabase
## UpdateObjectSpecificRights

UpdateObjectSpecificRights
Описание
Перечисление  UpdateObjectSpecificRights  содержит список специфических операций, доступных для объекта репозитория - Обновление.
Комментарии
Список основных и дополнительных операций доступен в перечислении  MetabaseObjectPredefinedRights .
Используется следующими свойствами и методами:
IMetabaseAuditPolicy.FilterClass ;
IMetabaseAuditPolicy.TrackClassHistory ;
IAuditFilterCondition.Operation .
Возможные значения
Значение |
Краткое описание |
1048576 |
Read . Чтение обновления. |
2097152 |
Write . Сохранение изменений в обновлении. |
4194304 |
Apply . Применение обновления. |
Перечисления сборки Metabase
## UpdateReflectObjectsRightsType

UpdateReflectObjectsRightsType
Описание
Перечисление  UpdateReflectObjectsRightsType  определяет метод переноса прав на объекты репозитория при обновлении.
Используется следующим свойством:
IMetabaseUpdate.ReflectObjectsRights .
Возможные значения
Значение |
Краткое описание |
0 |
AfterAll . Переносить права после выполнения всего обновления. |
1 |
Ask . Запрашивать в диалоге после выполнения всего обновления. При обновлении через язык Fore будет генерироваться событие  IMetabaseUpdateProgress.OnAskReflectRights , в котором следует обработать конкретные ситуации. |
2 |
AfterEach . Переносить права после обновления каждого объекта. |
4 |
Never . Не переносить права. |
Перечисления сборки Metabase
## UpdateSortMode

UpdateSortMode
Описание
Перечисление  UpdateSortMode  содержит виды сортировки, которые можно применить к объектам обновления.
Используется следующим методом:
IMetabaseUpdateFolderNode.Sort .
Комментарии
ByDepends . Родительские объекты (объекты, из которых состоит обновляемый объект) будут размещены выше дочерних без нарушения состава (содержания) папок.
Destructive . При необходимости родительские объекты будут вынесены за пределы папок, в которых они располагались. Исключением являются объекты-контейнеры (справочник НСИ, контейнер моделирования и пр.): их дочерние объекты выносится за их пределы не будут.
Deleted . Может использоваться совместно со значениями  ByType ,  ByDepends  и  Destructive . Для этого указывайте необходимые значения перечисления через « Or ».
Возможные значения
Значение |
Краткое описание |
0 |
ByType . Сортировать по типу объектов. |
1 |
ByDepends . Сортировать в порядке зависимости объектов. |
16 |
Destructive . Выстраивать объекты на панели обновления в порядке их зависимости с нарушением структуры. |
32 |
Deleted . Сортировать удаленные объекты. |
Перечисления сборки Metabase
## ValidationSpecificRights

ValidationSpecificRights
Описание
Перечисление  ValidationSpecificRights
содержит список специфических операций, доступных для объекта репозитория
«Правило валидации» и «Группа валидаций».
Комментарии
Список основных и дополнительных операций доступен в перечислении  MetabaseObjectPredefinedRights .
Используется следующими свойствами и методами:
IMetabaseObjectDescriptor.HasAccess ;
IMetabaseObjectDescriptor.CheckAndAudit ;
IMetabaseObjectDescriptor.CheckAndAuditLabel ;
IMetabaseUser.HasAccess ;
ISecurityDescriptor.HasAccess ;
ISecurityDescriptor.HasAccessAudit ;
ISecurityDescriptor.HasAccessAuditLabel ;
ISecurityDescriptor.GetEffectiveRights ;
ISecurityDescriptor.GetEffectiveRightsAudit ;
ISecurityDescriptor.GetEffectiveRightsAuditLabel ;
IAccessControlList.AddAce ;
IAccessControlEntry.AccessMask ;
IMetabaseAuditPolicy.FilterClass ;
IMetabaseAuditPolicy.TrackClassHistory ;
IAuditFilterCondition.Operation .
Возможные значения
Значение |
Краткое описание |
1048576 |
Execute . Выполнение. |
Перечисления сборки Metabase
