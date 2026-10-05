# TabSheet / Enums

> Source: OldDocumentsForsite/TabSheet/Enums  (CHM "TabSheet"; topics: 81)

Contents:
- 88  TabAccessRights
- 115  TabActivationEditorMode
- 139  TabAutoFilterAction
- 167  TabBorder
- 213  TabBorderStyle
- 252  TabBorderWeight
- 280  TabCellContentChange
- 313  TabCellIteratorOrder
- 329  TabCellSearchDirection
- 347  TabCellSearchTarget
- 371  TabCleanPart
- 433  TabConditionCellContentDate
- 475  TabConditionCellContentText
- 502  TabConditionCellContentValue
- 539  TabConditionIconRangeCond
- 563  TabConditionIconType
- 634  TabConditionPredefinedDataBarStyle
- 666  TabConditionPredefinedGradientStyle
- 704  TabConditionPredefinedScaleStyle
- 736  TabConditionType
- 776  TabCursor
- 930  TabCustomSortDirection
- 949  TabCustomSortType
- 968  TabDeleteShiftDirection
- 991  TabEmptyValuesTreatmentType
- 1020  TabExpanderKind
- 1039  TabFindReplaceFormat
- 1066  TabFixedBehaviour
- 1091  TabFontCharset
- 1158  TabFootnotesLocation
- 1178  TabFootnotesNumberingRule
- 1198  TabFormatAlignment
- 1222  TabFormatAverageType
- 1246  TabFormatColorScaleTargetType
- 1264  TabFormatContentType
- 1292  TabFormatDlgItems
- 1379  TabFormatDlgPages
- 1425  TabFormatDuplicateType
- 1444  TabFormatGrowthDirection
- 1460  TabFormatLayout
- 1483  TabFormatNumericScaleTargetType
- 1499  TabFormatRankType
- 1517  TabFormatValuesStyle
- 1542  TabFormatValueType
- 1577  TabFormatWordWrap
- 1601  TabFormatWrapMode
- 1646  TabHyperlinkObjectType
- 1662  TabHyperlinkTarget
- 1698  TabHyperlinkActionType
- 1734  TabInsertShiftDirection
- 1757  TabInteractiveSelectionType
- 1777  TabMargin
- 1800  TabNumberStyle
- 1834  TabObjectAction
- 1852  TabObjectActivationMode
- 1879  TabObjectChangeType
- 1899  TabObjectFlip
- 1918  TabObjectInteractiveRestrictions
- 1959  TabObjectMovementMode
- 1989  TabObjectResizingSide
- 2018  TabObjectsAdjustment
- 2042  TabObjectsAlignment
- 2078  TabPasteMode
- 2110  TabPattern
- 2234  TabPictureHorizontalAlignment
- 2253  TabPictureVerticalAlignment
- 2276  TabRangeAdjustHeightFlags
- 2295  TabRangeCombineMode
- 2321  TabRangeFillType
- 2373  TabRangeToArrayFlags
- 2397  TabRangeType
- 2427  TabRowColumnResizeType
- 2454  TabSelectionMovementDirection
- 2480  TabSelectionStyle
- 2519  Перечисления сборки Tab
- 2955  TabTableCleanPart
- 2980  TabTablePredefinedStyle
- 3081  TabUserInteractiveSelectionChangeType
- 3116  TabViewArea
- 3140  TabViewEventGroups
- 3237  TabViewScrollBars

## TabAccessRights

TabAccessRights
Описание
Перечисление  TabAccessRights
содержит варианты прав доступа к данным.
Используется следующим свойством:
ITabCellStyle.AccessRights .
Возможные значения
Значение |
Краткое описание |
-1 |
Undefined  .
Права доступа не определены. |
0 |
NoAccess  .
Нет прав доступа. |
1 |
Read  .
Право на чтение. |
2 |
Write  .
Право на запись. |
3 |
FullAccess  .
По умолчанию. Полный доступ. |
Перечисления сборки Tab
## TabActivationEditorMode

TabActivationEditorMode
Описание
Перечисление  TabActivationEditorMode
содержит типы активации редактора ячейки.
Используется следующими свойствами и методами:
ITabCellStyle.ActivationEditorMode
Возможные значения
Значение |
Краткое описание |
-1 |
Undefined . Тип не определен. |
0 |
None . Редактор ячейки
активируется при двойном щелчке кнопкой мыши по ячейке. |
1 |
Always . Редактор активирован
всегда. |
2 |
OnFocus . Редактор активируется
при получении фокуса ячейкой. |
Перечисления
сборки Tab
## TabAutoFilterAction

TabAutoFilterAction
Описание
Перечисление  TabAutoFilterAction
содержит типы выбранного условия автофильтра.
Используется следующим свойством:
ITabAutoFilterEventArgs.Action .
Возможные значения
Значение |
Краткое описание |
0 |
None  .
Автофильтр не установлен. |
1 |
SortAscending  .
Сортировка по возрастанию. |
2 |
SortDescending  .
Сортировка по убыванию. |
3 |
Condition  .
Выбраны первые n значений либо установлено какое-либо условие. |
4 |
Filter  .
Выбраны все значения либо установлен автофильтр по конкретному
значению, содержащемуся в списке. |
Перечисления сборки Tab
## TabBorder

TabBorder
Описание
Перечисление  TabBorder  содержит
варианты границ ячейки, для которой устанавливаются какие-либо параметры.
Используется следующими свойствами и методами:
ITabCellStyle.BorderStyle ;
ITabCellStyle.BorderColor ;
ITabCellStyle.BorderWeight .
Возможные значения
Значение |
Краткое описание |
0 |
DiagonalDown  .
По диагонали сверху вниз. |
1 |
DiagonalUp  .
По диагонали снизу вверх. |
2 |
EdgeTop  .
Верхняя граница. |
3 |
EdgeLeft  .
Левая граница. |
4 |
EdgeBottom  .
Нижняя граница. |
5 |
EdgeRight  .
Правая граница. |
6 |
InsideHorizontal  .
Между ячейками горизонтальная. |
7 |
InsideVertical  .
Между ячейками вертикальная. |
8 |
Outline  .
Вокруг ячейки. |
9 |
All  .  Вокруг
всех ячеек и по диагоналям. |
Примечание .
В веб-приложении не поддерживается отображение диагональных границ ячейки.
Перечисления сборки Tab
## TabBorderStyle

TabBorderStyle
Описание
Перечисление  TabBorderStyle
содержит типы линий границы ячеек.
Используется следующим свойством:
ITabCellStyle.BorderStyle ;
ITabUserInteractiveSelection.BorderStyle ;
ITabRegion.BorderStyle .
Возможные значения
Значение |
Краткое описание |
-1 |
Undefined  .
Значение не определено .  |
0 |
Continuous  .
Непрерывная линия. |
1 |
Dash  .
Пунктирная линия. |
2 |
DashDot.  Точка тире. |
3 |
DashDotDot  .
Точка точка тире. |
4 |
Dot.  Точка. |
5 |
Double.  Двойная линия. |
6 |
SlantDashDot  .
Зарезервировано на будущее. В данный момент при установке данного
стиля будет устанавливаться непрерывный стиль линии. |
7 |
LineStyleNone  .
Нет линии. |
Перечисления сборки Tab
## TabBorderWeight

TabBorderWeight
Описание
Перечисление  TabBorderWeight
содержит варианты толщины линии границы ячеек.
Используется следующим свойством:
ITabCellStyle.BorderWeight ;
ITabRegion.BorderWeight .
Возможные значения
Значение |
Краткое описание |
-1 |
Undefined . Н е
известно.  |
0 |
Thick  .
Толстая. |
1 |
Medium  .
Средняя. |
2 |
Thin  .
Тонкая. |
3 |
Hairline  .
Очень тонкая. |
Перечисления сборки Tab
## TabCellContentChange

TabCellContentChange
Описание
Перечисление  TabCellContentChange
содержит типы изменения в ячейке таблицы.
Используется следующими свойствами:
ITabCellContentChangeEventArgs.Type ;
IReportCellContentChangeEventArgs.Type .
Возможные значения
Значение |
Краткое описание |
1 |
Value  .
Было изменено  значение
в ячейке . |
2 |
Formula  .
Была изменена  формула
в ячейке . |
3 |
Text  .
Был изменен  текст
в ячейке . |
4 |
FormattedText  .
Было  применено сложное  форматирование
текста в ячейке . |
5 |
Style . Был изменен
стиль отображения
ячеек . |
Перечисления сборки Tab
## TabCellIteratorOrder

TabCellIteratorOrder
Описание
Перечисление  TabCellIteratorOrder  содержит варианты упорядочивания элементов в итераторе.
Используется свойством  ITabCellIterator.Order .
Возможные значения
Значение |
Краткое описание |
0 |
None . Элементы упорядочены по строкам в пределах одной страницы. Страницы в некоторых случаях могут обходиться не по порядку. |
1 |
Rows . Элементы упорядочены по строкам. |
2 |
Columns . Элементы упорядочены по столбцам. |
Перечисления сборки Tab
## TabCellSearchDirection

TabCellSearchDirection
Описание
Перечисление  TabCellSearchDirection
содержит варианты направлений, в которых может производиться поиск.
Используется следующим свойством:
ITabCellSearch.Direction .
Возможные значения
Значение |
Краткое описание |
0 |
Rows  .
Поиск по строкам. |
1 |
Columns  .
Поиск по столбцам. |
Перечисления сборки Tab
## TabCellSearchTarget

TabCellSearchTarget
Описание
Перечисление  TabCellSearchTarget
содержит варианты свойства ячейки, по которым будет осуществляться поиск.
Используется следующим свойством:
ITabCellSearch.Target .
Возможные значения
Значение |
Краткое описание |
1 |
Value  . Поиск
по значению в ячейке.  |
2 |
Formula  .
Поиск по формуле в ячейке. |
4 |
Text  .
Поиск по тексту в ячейке. |
8 |
MetaData . Поиск по
метаданным ячейки. |
Перечисления сборки Tab
## TabCleanPart

TabCleanPart
Описание
Перечисление  TabCleanPart  содержит
варианты диапазона, которые можно очистить.
Используется следующим свойством:
ITabRange.ClearPart .
Возможные значения
Значение |
Краткое описание |
1 |
Value.  Удаление всех
значений из ячеек диапазона. |
2 |
Formula.  Удаление всех
формул из ячеек диапазона. |
4 |
Expander  . Удаление всех
символов иерархии, установленных в   ячейках
диапазона.  |
8 |
Hyperlink .  Удаление всех
гиперссылок из ячеек диапазона.  |
16 |
Margins  .
Удаление всех полей у ячеек диапазона. |
32 |
Borders  .
Удаление всех рамок у ячеек диапазона. |
64 |
Colors  .
Очистка установленного цвета фона у ячеек диапазона. |
128 |
Pictures  .
Удаление всех установленных картинок в ячейках диапазона. |
256 |
Font  .
Очистка всех изменений шрифта у ячеек диапазона. |
368 |
Format  .
Очистка всего форматирования ячеек диапазона. |
512 |
Comment  .
Очистка примечаний ячеек диапазона. |
1024 |
Conditions . Очистка
условного форматирования ячеек диапазона. |
2048 |
DataBinding . Очистка
параметров редактора ячеек диапазона. Параметры редактора задаются
свойством  ITabCellStyle.Binding . |
4096 |
Prefix . Очистка префиксов
ячеек диапазона. |
8192 |
Suffix . Очистка суффиксов
ячеек диапазона. |
16384 |
Footnotes . Очистка
сносок, добавленных для ячеек диапазона. |
Перечисления сборки Tab
## TabConditionCellContentDate

TabConditionCellContentDate
Описание
Перечисление  TabConditionCellContentDate
содержит условия, которые могут выполняться для дат в форматируемых ячейках.
Используется следующим свойством:
ITabFormatCellContent.DateCondition .
Возможные значения
Значение |
Краткое описание |
0 |
Yesterday  .
Вчера. |
1 |
Today  .
Сегодня. |
2 |
Tomorrow  .
Завтра. |
3 |
Last7Days  .
За последние 7 дней. |
4 |
LastWeek  .
Прошлая неделя. |
5 |
ThisWeek  .
Текущая неделя. |
6 |
NextWeek  .
Следующая неделя. |
7 |
LastMonth  .
Предыдущий месяц. |
8 |
ThisMonth  .
Текущий месяц. |
9 |
NextMonth  .
Следующий месяц. |
Перечисления сборки Tab
## TabConditionCellContentText

TabConditionCellContentText
Описание
Перечисление  TabConditionCellContentText
содержит условия, которые могут выполняться для текста форматируемых ячеек.
Используется следующим свойством:
ITabFormatCellContent.TextCondition .
Возможные значения
Значение |
Краткое описание |
0 |
Exact  .
Равен. |
1 |
Contains  .
Содержит. |
2 |
NotContains  .
Не содержит. |
3 |
BeginsWith  .
Начинается с. |
4 |
EndsWith  .
Заканчивается на. |
Перечисления сборки Tab
## TabConditionCellContentValue

TabConditionCellContentValue
Описание
Перечисление  TabConditionCellContentValue
содержит условия, которые могут выполняться для значений форматируемых
ячеек.
Используется следующим свойством:
ITabFormatCellContent.ValueCondition .
Возможные значения
Значение |
Краткое описание |
0 |
Between  .
Между. |
1 |
Outside  .
Не между. |
2 |
Equal  .
Равно. |
3 |
NotEqual  .
Не равно. |
4 |
Above  .
Больше. |
5 |
Below  .
Меньше. |
6 |
AboveEqual  .
Больше или равно. |
7 |
BelowEqual  .
Меньше или равно. |
Перечисления сборки Tab
## TabConditionIconRangeCond

TabConditionIconRangeCond
Описание
Перечисление  TabConditionIconRangeCond
содержит соотношения, по которым осуществляется отбор значений, удовлетворяющих
указанному правилу.
Используется следующим свойством:
ITabFormatValues.PointCondition .
Возможные значения
Значение |
Краткое описание |
0 |
Above  .
Больше. Пиктограмма отображается для ячеек, значения которых больше
значения, установленного для текущего правила и меньше (меньше,
либо равно) значения, установленного для предыдущего правила. |
1 |
AboveEqual  .
Больше, либо равно. Пиктограмма отображается для ячеек, значения
которых больше либо равно значению, установленному для текущего
правила и меньше (меньше, либо равно) значения, установленного
для предыдущего правила. |
Перечисления сборки Tab
## TabConditionIconType

TabConditionIconType
Описание
Перечисление  TabConditionIconType
содержит стили пиктограмм, используемые при условном форматировании ячеек.
Используется следующими свойствами и методами:
ITabFormatValues.IconType ;
ITabFormatCondition.AssignPredefinedIcons ;
ITabFormatCondition.AssignPredefinedGrowth .
Возможные значения
Значение |
Краткое описание |
0 |
Circles  .
Светофор.
|
1 |
CircleFillB  .
Круговая заливка (серая).
|
2 |
CircleFillC  .
Круговая заливка (цветная).
|
3 |
ArrowsB  .
Стрелки (серые).
|
4 |
ArrowsC  .
Стрелки (цветные).
|
5 |
BarFillB  .
Оценки (серые).
|
6 |
BarFillC  .
Оценки (цветные).
|
7 |
Cylinders  .
Цилиндры.
|
8 |
Flags1  .
Флажки (тип 1).
|
9 |
Flags2  .
Флажки (тип 2).
|
10 |
Triangles  .
Треугольники.
|
11 |
Symbols  .
Символы.
|
12 |
Arrows . Горизонтальные
стрелки (тип 1).
|
13 |
Arrows2 . Горизонтальные
стрелки (тип 2). Используется при построении  индикатора
роста .
|
Перечисления сборки Tab
## TabConditionPredefinedDataBarStyle

TabConditionPredefinedDataBarStyle
Описание
Перечисление  TabConditionPredefinedDataBarStyle
содержит стандартные стили гистограмм, используемые при условном форматировании
ячеек.
Используется следующим методом:
ITabFormatCondition.AssignPredefinedDataBar .
Возможные значения
Значение |
Краткое описание |
0 |
Blue
|
1 |
Green
|
2 |
Red
|
3 |
Yellow
|
4 |
LightBlue
|
5 |
Purple
|
Перечисления
сборки Tab
## TabConditionPredefinedGradientStyle

TabConditionPredefinedGradientStyle
Описание
Перечисление  TabConditionPredefinedGradientStyle
содержит стандартные стили градиентных заливок, используемые при условном
форматировании ячеек.
Используется следующим методом:
ITabFormatCondition.AssignPredefinedGradient .
Возможные значения
Значение |
Краткое описание |
0 |
GreenYellowRed
|
1 |
BlueYellowRed
|
2 |
YellowRed
|
3 |
YellowGreen
|
4 |
GreenYellow
|
5 |
RedYellow
|
6 |
RedYellowBlue
|
7 |
RedYellowGreen
|
Перечисления
сборки Tab
## TabConditionPredefinedScaleStyle

TabConditionPredefinedScaleStyle
Описание
Перечисление  TabConditionPredefinedScaleStyle
содержит стандартные стили цветовой шкалы, используемые при условном форматировании
ячеек.
Используется следующим методом:
ITabFormatCondition.AssignPredefinedScale .
Возможные значения
Значение |
Краткое описание |
0 |
RedGreen
|
1 |
GreenRed
|
2 |
BlueGradient
|
3 |
GreenGradient
|
4 |
RedGradient
|
5 |
GreyGradient
|
Перечисления
сборки Tab
## TabConditionType

TabConditionType
Описание
Перечисление  TabConditionType
содержит типы условного форматирования, применяемого к ячейкам.
Используется следующим свойством:
ITabFormatCondition.Type .
Возможные значения
Значение |
Краткое описание |
0 |
Values  .
Форматирование ячеек на основе их значений. |
1 |
CellContent  .
Форматирование ячейки с определенными значениями. |
2 |
MinMax  .
Форматировать ячейки с наибольшими/наименьшими значениями. |
3 |
Average  .
Форматировать ячейки со значениями выше/ниже среднего. |
4 |
Duplicate  .
Форматировать ячейки с уникальными/дублирующимися значениями. |
5 |
Formula  .
Форматировать ячейки, удовлетворяющие формуле. |
6 |
Growth . Формирование
для ячеек индикатора роста относительно значений первой строки/столбца
диапазона. |
7 |
Scale . Цветовая шкала
на основании значений ячеек. |
8 |
NumericScale . Числовая
шкала на основании значений ячеек. |
Перечисления сборки Tab
## TabCursor

TabCursor
Описание
Перечисление  TabCursor  содержит
типы курсора, которые могут отображаться при наведении мыши.
Используется следующими свойствами и методами:
ITabCellStyle.Cursor ;
ITabCellStyle.PictureCursor .
Возможные значения
Значение |
Краткое описание |
-1 |
Undefined  . Курсор
не определен.  |
0 |
StdAppStarting  .
Фоновый режим.
|
1 |
StdArrow  . Основной
режим.
|
2 |
StdCross  . Графическое
выделение.
|
3 |
Hand  . Выбор ссылки.
|
4 |
StdHelp  . Выбор
справки.
|
5 |
StdNo  . Операция
невозможна.
|
6 |
StdSizeAll  . Перемещение.
|
7 |
StdSizeNESW  .
Изменение размеров по диагонали 2.
|
8 |
StdSizeNS  . Изменение
вертикальных размеров.
|
9 |
StdSizeNWSE  .
Изменение размеров по диагонали 1.
|
10 |
StdSizeWE  . Изменение
горизонтальных размеров.
|
11 |
StdUpArrow  . Специальное
выделение.
|
12 |
StdWait .  Система
недоступна.
|
13 |
SelectRow  . Выделение
строки.
|
14 |
DragCopy  . Копирование
данных с помощью мыши.
|
15 |
DragMove  . Перемещение
данных с помощью мыши.
|
16 |
HandMove  . Перемещение
видимой области документа
|
17 |
HandMovig  . Перемещение
над документом.
|
18 |
ResizeColumn  .
Изменение размера столбца.
|
19 |
ResizeRow .  Изменение
размера строки.
|
20 |
ResizeScroll  .
Прокрутка документа.
|
21 |
ScrollDown  . Прокрутка
документа вниз.
|
22 |
ScrollDownLeft  .
Прокрутка документа в левый нижний угол.
|
23 |
ScrollDownRight  .
Прокрутка документа в правый нижний угол.
|
24 |
ScrollLeft .  Прокрутка
документа влево.
|
25 |
ScrollRight .  Прокрутка
документа вправо.
|
26 |
ScrollUp .  Прокрутка
документа вверх.
|
27 |
ScrollUpLeft .  Прокрутка
документа в левый верхний угол.
|
28 |
ScrollUpRight .  Прокрутка
документа в правый верхний угол.
|
29 |
SelectCell . В ыделение
ячейки.
|
30 |
SelectColumn . В ыделение
столбца.
|
31 |
ShowColumn . О тобразить
скрытый столбец.
|
32 |
ShowRow  . Отобразить
скрытую строку.
|
38 |
StdIbeam . Текстовое
выделение.
|
39 |
StdHand .  Выбор
ссылки.
|
Перечисления сборки Tab
## TabCustomSortDirection

TabCustomSortDirection
Описание
Перечисление  TabCustomSortDirection
содержит направления сортировки строк/столбцов таблицы данных.
Используется следующим свойством:
ITabCustomSortItem.Direction .
Возможные значения
Значение |
Краткое описание |
0 |
Ascending . Сортировать
по возрастанию. |
1 |
Descending . Сортировать
по убыванию. |
Перечисления
сборки Tab
## TabCustomSortType

TabCustomSortType
Описание
Перечисление  TabCustomSortType
содержит типы сортировки, применяемой к строкам/столбцам таблицы данных.
Используется следующим свойством:
ITabCustomSortItem.Type .
Возможные значения
Значение |
Краткое описание |
0 |
Value . Сортировка по
значению в ячейке. |
1 |
Text . Сортировка по
тексту в ячейке. |
Перечисления
сборки Tab
## TabDeleteShiftDirection

TabDeleteShiftDirection
Описание
Перечисление  TabDeleteShiftDirection
используется для определения способа удаления диапазона ячеек.
Используется следующими методами, свойствами, конструкторами и событиями:
ITabRange.Delete ;
TabRangeDeleteEventArgs.Create ;
ITabRangeDeleteEventArgs.ShiftDirection ;
TabSheetBox.OnAfterDeleteRange ;
TabSheetBox.OnBeforeDeleteRange .
Возможные значения
Значение |
Краткое описание |
0 |
ShiftToLeft . Удаление
со сдвигом ячеек влево. |
1 |
ShiftToUp . Удаление
со сдвигом ячеек вверх. |
Перечисления
сборки Tab
## TabEmptyValuesTreatmentType

TabEmptyValuesTreatmentType
Описание
Перечисление  TabEmptyValuesTreatmentType
содержит варианты действий, которые необходимо произвести для формул,
ссылающихся на пустые ячейки.
Используется следующим свойством:
ITabErrorCheckingOptions.EmptyValuesTreatmentType .
Возможные значения
Значение |
Краткое описание |
-1 |
Undefined . Считать
пустое значение нулём. |
0 |
AsZero  .
Пустое значение заменить нулем и вычислять формулу. |
1 |
AsZeroWithInfo  .
Пустое значение заменить нулем и вычислять формулу, а также отображать
индикатор ошибки и выводить контекстную кнопку для управления
ошибкой в формуле при установке фокуса в ячейку. |
2 |
ThrowException  .
Не вычислять формулу, выводить сообщение об ошибке в качестве
текста ячейки. |
Перечисления
сборки Tab
## TabExpanderKind

TabExpanderKind
Описание
Перечисление  TabExpanderKind
содержит типы экспандера.
Используется следующими свойствами и методами:
ITabSheet.ExpanderKind ;
ITabSheet.CreateExpander .
Возможные значения
Значение |
Краткое описание |
0 |
Columns . Экспандер,
раскрывающийся по столбцам. |
1 |
Rows . Экспандер, раскрывающийся
по строкам. |
Перечисления сборки Tab
## TabFindReplaceFormat

TabFindReplaceFormat
Описание
Перечисление  TabFindReplaceFormat
содержит варианты задания формата для искомого и заменяемого текста.
Используется плагином  PerformSearch
регламентного отчета.
Возможные значения
Значение |
Краткое описание |
0 |
None  . Задать
формат   для искомого и заменяемого текста нельзя.  |
1 |
Find  .
Можно задать формат только   для искомого текста.  |
2 |
Replace  .
Можно задать формат   только для заменяемого
текста.  |
3 |
Both  .
Можно задать формат   для искомого и заменяемого
текста.  |
Перечисления
сборки Tab
## TabFixedBehaviour

TabFixedBehaviour
Описание
Перечисление  TabFixedBehaviour
содержит режимы работы со строками и столбцами при наличии фиксированной
области.
Используется следующим свойством:
ITabView.FixedBehaviour .
Возможные значения
Значение |
Краткое описание |
0 |
Off  .  Стандартное
поведение. |
1 |
Resizable  .
Изменение размеров ячеек мышью. |
2 |
Selectable  . В ыделение
строк/столбцов щелчком по ячейке. |
3 |
All  .  Все
в одном. |
Перечисления сборки Tab
## TabFontCharset

TabFontCharset
Описание
Перечисление  TabFontCharset
содержит кодировки шрифта.
Используется следующим свойством:
ITabFont.Charset .
Возможные значения
Значение |
Краткое описание |
.1 |
Undefined  . неопределенное
значение кодировки.  |
0 |
ANSI  . Кодировка
ASCII.  |
1 |
System  . Расширенная
кодировка ASCII.  |
2 |
Symbol  . Символьная
кодировка.  |
128 |
Shiftjis  . Японская
кодировка.  |
129 |
Hangeul  . Корейская
кодировка.  |
134 |
GB2321  . Китайская
кодировка используется в континентальном Китае.  |
136 |
ChineseBig5  .
Китайская кодировка по большей части используется в специальном
административном районе Гонконг и Тайване.  |
161 |
Greek  . Греческая
кодировка.  |
162 |
Turkish  . Турецкая
кодировка.  |
163 |
Vietnamese  . Вьетнамская
кодировка.  |
177 |
Hebrew  . Кодировка
иврита.  |
178 |
Arabic  . Арабская
кодировка.  |
186 |
Baltic  . Балтийская
кодировка.  |
204 |
Russian  . Русская
кодировка.  |
222 |
Thai  . Тайская
кодировка.  |
238 |
EastEurope  . Восточноевропейская
кодировка.  |
255 |
OEM  . Расширенная
кодировка ASCII.  |
Перечисления сборки Tab
## TabFootnotesLocation

TabFootnotesLocation
Описание
Перечисление  TabFootnotesLocation
содержит варианты расположения сносок при разбивке таблицы на отдельные
страницы.
Используется следующим свойством:
ITabFootnotes.Location .
Возможные значения
Значение |
Краткое описание |
0 |
BottomOfPage . В конце
каждой страницы. |
1 |
EndOfSheet . После всех
страниц. |
Перечисления
сборки Tab
## TabFootnotesNumberingRule

TabFootnotesNumberingRule
Описание
Перечисление  TabFootnotesNumberingRule
содержит правила нумерации сносок при переходе к таблицам других листов.
Используется следующим свойством:
ITabFootnotes.NumberingRule .
Возможные значения
Значение |
Краткое описание |
0 |
Continue . Продолжать
нумерацию сносок при переходе к таблицам других листов. |
1 |
Restart . На каждом
листе производится собственная нумерация сносок. Начальное значение
указывается в свойстве  ITabFootnotes.StartingNumber . |
Перечисления
сборки Tab
## TabFormatAlignment

TabFormatAlignment
Описание
Перечисление  TabFormatAlignment
содержит варианты выравниваний текста ячейки по горизонтали.
Используется следующим свойством:
ITabCellStyle.HorizontalAlignment .
Возможные значения
Значение |
Краткое описание |
-1 |
Undefined . Не известно. |
0 |
General . По значению. |
1 |
Left . По левому краю. |
2 |
Center . По центру. |
3 |
Right . По правому краю. |
4 |
Justify . По ширине. |
Перечисления сборки Tab
## TabFormatAverageType

TabFormatAverageType
Описание
Перечисление  TabFormatAverageType
содержит типы значений, которые необходимо форматировать.
Используется следующим свойством:
ITabFormatAverage.Type .
Возможные значения
Значение |
Краткое описание |
0 |
Above . Значения больше
среднего в выделенной области. |
1 |
Below . Значения меньше
среднего в выделенной области. |
2 |
EqualAbove . Значения
больше либо равны среднему в выделенной области. |
3 |
EqualBelow . Значения
меньше либо равны среднему в выделенной области. |
Перечисления сборки Tab
## TabFormatColorScaleTargetType

TabFormatColorScaleTargetType
Описание
Перечисление  TabFormatColorScaleTargetType
используется для определения области применения цветовой шкалы.
Используется следующим свойством:
ITabFormatScale.TargetType .
Возможные значения
Значение |
Краткое описание |
0 |
BkColor . Заливка ячеек. |
1 |
FontColor . Работа с
цветами шрифта. |
Перечисления
сборки Tab
## TabFormatContentType

TabFormatContentType
Описание
Перечисление  TabFormatContentType
содержит типы содержимого ячеек, по которому ставится условие для форматирования.
Используется следующим свойством:
ITabFormatCellContent.ContentType .
Возможные значения
Значение |
Краткое описание |
0 |
CellValue . Значение
ячейки. |
1 |
SpecificText . Текст. |
2 |
Date . Дата. |
3 |
Blanks . Пустые значения. |
4 |
NoBlanks . Непустые
значения. |
5 |
Error . Ошибка. |
6 |
NoError . Не ошибка. |
Перечисления сборки Tab
## TabFormatDlgItems

TabFormatDlgItems
Описание
Перечисление  TabFormatDlgItems
содержит значения, соответствующие элементам, которые располагаются на
страницах диалога форматирования.
Используется следующими свойствами и методами:
ITabCellFormatDlg.DisableItem ;
ITabCellFormatDlg.EnableItem .
Возможные значения
Значение |
Краткое описание |
0 |
NotImplemented . Зарезервировано
для внутреннего использования. |
1 |
BkColor . Цвет фона. |
2 |
PatternColor . Цвет
узора фона. |
3 |
PatternType . Узор. |
4 |
HorizontalAlignment .
Выравнивание по горизонтали. |
5 |
VerticalAlignment .
Выравнивание по вертикали. |
6 |
TextWrap . Перенос текста. |
7 |
Margins . Отступы от
полей. |
8 |
Cursor . Курсор. |
9 |
UserFormat . Пользовательский
формат. |
10 |
Binding . Настройка
редактора. |
11 |
FontCharset . Набор
символов. |
12 |
FontName . Наименование
шрифта. |
13 |
FontSize . Размер шрифта. |
14 |
FontColor . Цвет текста. |
15 |
FontBold . Жирный шрифт |
16 |
FontItalic . Курсивный
шрифт. |
17 |
FontUnderline . Подчеркнутый
шрифт. |
18 |
FontStrikeOut .  Зачеркнутый
шрифт. |
19 |
TextAngle . Угол поворота
текста. |
20 |
Borders . Оформление
границ. |
21 |
Category . Категории
форматов. |
22 |
Locked . Защита. |
23 |
Printable . Печать. |
24 |
ActiveEditor . Показывать
редактор только при активации ячейки. |
25 |
FormulaHidden . Скрыть
формулу. |
26 |
Unselectable . Запрет
выделения. |
Перечисления
сборки Tab
## TabFormatDlgPages

TabFormatDlgPages
Описание
Перечисление  TabFormatDlgPages
содержит значения, соответствующие страницам диалога форматирования.
Используется следующими свойствами и методами:
ITabCellFormatDlg.ActivePage ;
ITabCellFormatDlg.ExcludePage ;
ITabCellFormatDlg.IncludePage .
Возможные значения
Значение |
Краткое описание |
0 |
CellView  .
Страница « Заливки ». |
1 |
CellAlignment  .
Страница « Выравнивание ». |
2 |
CellFormat  .
Страница « Формат числа ». |
3 |
CellFont  .
Страница « Шрифт ». |
4 |
CellBorders  .
Страница « Границы ». |
5 |
CellProtect  .
Группа элементов для настройки защиты ячеек. Отображается на странице
« Прочее ». |
6 |
CellConditionFormat  .
Страница с настройкой условного форматирования. |
7 |
CellProtectEmpty  .
Страница « Прочее » с группой
настроек защиты ячеек, настройками для замены пустых и нулевых
ячеек, а также настройки печати. |
8 |
CellFillImage  .
Группа элементов для настройки заливки с изображением. Отображается
на странице « Заливка ». |
Перечисления
сборки Tab
## TabFormatDuplicateType

TabFormatDuplicateType
Описание
Перечисление  TabFormatDuplicateType
содержит значения, для которых можно задать форматирование.
Используется следующим свойством:
ITabFormatDuplicate.Type .
Возможные значения
Значение |
Краткое описание |
0 |
Duplicate  .
Осуществляется форматирование ячеек, содержащих повторяющиеся
значения. |
1 |
Unique  .
Осуществляется форматирование ячеек, содержащих уникальные значения. |
Перечисления сборки Tab
## TabFormatGrowthDirection

TabFormatGrowthDirection
Описание
Перечисление  TabFormatGrowthDirection  содержит варианты построения индикатора роста.
Используется следующими свойствами и методами:
ITabFormatCondition.AssignPredefinedGrowth ;
ITabFormatGrowth.Direction .
Возможные значения
Значение |
Краткое описание |
0 |
Rows . Строить индикатор роста по значениям в строках. |
1 |
Columns  . Строить индикатор роста по значениям в столбцах.  |
Перечисления сборки Tab
## TabFormatLayout

TabFormatLayout
Описание
Перечисление  TabFormatLayout
содержит варианты выравнивания текста ячейки по вертикали.
Используется следующим свойством:
ITabCellStyle.VerticalAlignment .
Возможные значения
Значение |
Краткое описание |
-1 |
Undefined  .
Не известно. |
0 |
Top  .  По
верхнему краю. |
1 |
Center.  По центру. |
2 |
Bottom  .
По нижнему краю. |
Перечисления сборки Tab
## TabFormatNumericScaleTargetType

TabFormatNumericScaleTargetType
Описание
Перечисление  TabFormatNumericScaleTargetType
используется для определения области применения числовой шкалы.
Используется следующим свойством:
ITabFormatNumericScale.TargetType .
Возможные значения
Значение |
Краткое описание |
0 |
FontSize . Работа с
размерами шрифта. |
Перечисления
сборки Tab
## TabFormatRankType

TabFormatRankType
Описание
Перечисление  TabFormatRankType
содержит типы значений, для которых можно настроить условное форматирование.
Используется следующим свойством:
ITabFormatRankValues.Type .
Возможные значения
Значение |
Краткое описание |
0 |
Top  .  Наибольшие
значения. |
1 |
Bottom  .
Наименьшие значения. |
Перечисления сборки Tab
## TabFormatValuesStyle

TabFormatValuesStyle
Описание
Перечисление  TabFormatValuesStyle
содержит стили форматирования, используемые при форматировании ячеек на
основе их значений.
Используется следующим свойством:
ITabFormatValues.Style .
Возможные значения
Значение |
Краткое описание |
0 |
ThreeColorScale  .
Трехцветный градиент. |
1 |
TwoColorScale  .
Двухцветный градиент. |
2 |
DataBar  .
Гистограмма. |
3 |
IconSets  .
Пиктограммы. |
Перечисления сборки Tab
## TabFormatValueType

TabFormatValueType
Описание
Перечисление  TabFormatValueType
содержит способы указания конечных и промежуточных значений, для которых
настраивается условный формат на основе значений ячеек с определенным
стилем.
Используется следующими свойствами и методами:
ITabFormatValues.MaxValueType ;
ITabFormatValues.MidValueType ;
ITabFormatValues.MinValueType ;
ITabFormatValues.PointType .
Возможные значения
Значение |
Краткое описание |
0 |
Lowest  .
Наименьшее значение в диапазоне. |
1 |
Highest  .
Наибольшее значение в диапазоне. |
2 |
Number  .
Конкретное значение. |
3 |
Percent  .
Процент от наибольшего значения. |
4 |
Formula  .
Формула. |
5 |
Percentile  .
Процентиль. |
Перечисления сборки Tab
## TabFormatWordWrap

TabFormatWordWrap
Описание
Перечисление  TabFormatWordWrap
содержит способы переноса текста в ячейках таблицы.
Используется следующим свойством:
ITabCellStyle.WrapText .
Возможные значения
Значение |
Краткое описание |
-1 |
Undefined  .
Не известно. |
0 |
None  .
Не переносить. |
1 |
BreakWords  .
Текст по словам. |
2 |
Syllable  .
Слово по слогам. |
Перечисления сборки Tab
## TabFormatWrapMode

TabFormatWrapMode
Описание
Перечисление  TabFormatWrapMode
содержит варианты наложения фонового изображения в ячейке если размер
изображения меньше чем заполняемая область.
Используется следующим свойством:
ITabCellStyle.BackgroundPictureWrapMode .
Возможные значения
Значение |
Краткое описание |
-1 |
Undefined . Растянуть
изображение таким образом, чтобы оно занимало всю область ячейки. |
0 |
Tile . Чередующееся
заполнение изображением всей области ячейки. |
1 |
TileFlipX . Отражение
изображения по горизонтали и отрисовка полученного отражения справа
относительно исходного изображения. Затем осуществляется чередующееся
заполнение всей области ячейки. |
2 |
TileFlipY  .    Отражение изображения по вертикали
и отрисовка полученного отражения снизу относительно исходного
изображения. Затем осуществляется чередующееся заполнение всей
области ячейки. |
3 |
TileFlipXY  . Отрисовка
четырех изображений:
Исходное изображение;
Под исходным отрисовывается изображение, отраженное
по горизонтали;
Справа от исходного  отрисовывается изображение, отраженное
по вертикали;
Под правым изображением отрисовывается само правое
изображение, отраженное по горизонтали.
З атем осуществляется чередующееся заполнение всей
области ячейки полученными четырьмя изображениями. |
4 |
Clamp . Фиксация одного
изображения в верхнем левом углу области ячейки. |
Перечисления
сборки Tab
## TabHyperlinkObjectType

TabHyperlinkObjectType
Описание
Перечисление  TabHyperlinkObjectType  содержит типы элементов, расположенных в ячейке с гиперссылкой.
Используется следующими свойствами:
IReportHyperlinkClickEventArgs.Type ;
ITabHyperlinkClickEventArgs.Type .
Возможные значения
Значение |
Краткое описание |
0 |
Text . Текст. |
1 |
Picture . Изображение. |
Перечисления сборки Tab
## TabHyperlinkTarget

TabHyperlinkTarget
Описание
Перечисление  TabHyperlinkTarget
содержит способы загрузки страницы при переходе по ссылке.
Используется следующими свойствами и методами:
ITabHyperlink.Target ;
IPrxDimensionDrill ;
IEaxDrillSettings.Target .
Возможные значения
Значение |
Краткое описание |
-1 |
Undefined . Способ загрузки
не определен. |
0 |
Blank . Загружает страницу
в новое окно браузера. Значение установлено по умолчанию. |
1 |
Self . Загружает страницу
в текущее окно. |
2 |
Parent . Загружает страницу
во фрейм-родитель, если фреймов нет, то этот параметр работает
как Self. |
3 |
Top . Отменяет все фреймы
и загружает страницу в полном окне браузера, если фреймов нет,
то этот параметр работает как  Self. |
Комментарии
Способы загрузки страниц не учитываются при настройке гиперссылок в
таблицах  форм
ввода .
Перечисления
сборки Tab
## TabHyperlinkActionType

TabHyperlinkActionType
Описание
Перечисление  TabHyperlinkActionType
содержит типы действий, выполняемого при щелчке по гиперссылке.
Используется следующими свойствами и методами:
ITabHyperlink.ActionType ;
IPrxDimensionDrill.ActionType ;
IEaxDrillSettings.ActionType .
Возможные значения
Значение |
Краткое описание |
-1 |
None . Не определено. |
1 |
OpenFile . Открыть файл. |
2 |
OpenURL . Открыть ссылку. |
3 |
GoToSheet . Открыть
лист отчета. |
4 |
ShowRange . Показать
диапазон ячеек. |
5 |
ShowObject . Показать
объект в центре экрана. |
6 |
OpenObject . Открыть
объект репозитория. |
7 |
RunMacros . Выполнить
процедуру/функцию. |
Перечисления
сборки Tab
## TabInsertShiftDirection

TabInsertShiftDirection
Описание
Перечисление  TabInsertShiftDirection
используется для определения способа вставки диапазона ячеек.
Используется следующими методами, свойствами, конструкторами и событиями:
ITabRange.Insert ;
TabRangeInsertEventArgs.Create ;
ITabRangeInsertEventArgs.ShiftDirection ;
TabSheetBox.OnAfterInsertRange ;
TabSheetBox.OnBeforeInsertRange .
Возможные значения
Значение |
Краткое описание |
0 |
ShiftToRight . Вставка
со сдвигом ячеек вправо. |
1 |
ShiftDown . Вставка
со сдвигом ячеек вниз. |
Перечисления
сборки Tab
## TabInteractiveSelectionType

TabInteractiveSelectionType
Описание
Перечисление  TabInteractiveSelectionType
содержит типы событий, при которых происходит визуальное перемещение выделенной
области ячеек в таблице.
Используется следующим свойством:
ITabInteractiveSelectionEventArgs.Type .
Возможные значения
Значение |
Краткое описание |
0 |
Move . Перемещение выделенного
диапазона ячеек. |
1 |
AutoFill . Автоматическое
заполнение диапазона ячеек. |
Перечисления
сборки Tab
## TabMargin

TabMargin
Описание
Перечисление  TabMargin  содержит
варианты границ, от которых может быть установлен отступ.
Используется следующим свойством:
ITabCellStyle.Margins .
Возможные значения
Значение |
Краткое описание |
0 |
Left  .
Левая. |
1 |
Top  .  Верхняя. |
2 |
Right  .
Правая. |
3 |
Bottom  .
Нижняя. |
Перечисления сборки Tab
## TabNumberStyle

TabNumberStyle
Описание
Перечисление  TabNumberStyle
содержит стили цифр, которые могут использоваться для нумерации сносок.
Используется следующим свойством:
ITabFootnotes.NumberStyle .
Возможные значения
Значение |
Краткое описание |
0 |
Arabic . Арабские цифры
(0, 1, 2, 3 …). |
1 |
LowercaseLetter . Буквы
латиницы в нижнем регистре (a, b, c, d…). |
2 |
UppercaseLetter . Буквы
латиницы в верхнем регистре (A, B, C, D…). |
3 |
LowercaseRoman . Римские
цифры в нижнем регистре (i, ii, iii, iv…). |
4 |
UppercaseRoman . Римские
цифры в верхнем регистре (I, II, III, IV…). |
5 |
LowercaseCyrillic .
Буквы кириллицы в нижнем регистре (а, б, в, г…). |
6 |
UppercaseCyrillic .
Буквы кириллицы в верхнем регистре (А, Б, В, Г…). |
Перечисления
сборки Tab
## TabObjectAction

TabObjectAction
Описание
Перечисление  TabObjectAction
содержит типы действия, совершенного над объектом таблицы.
Используется следующим свойством:
ITabObjectEventArgs.Action .
Возможные значения
Значение |
Краткое описание |
0 |
Activate  .
Активация. |
1 |
Deactivate  .
Деактивация. |
Перечисления сборки Tab
## TabObjectActivationMode

TabObjectActivationMode
Описание
Перечисление  TabObjectActivationMode
содержит режимы активации объектов таблицы.
Используется следующим свойством:
ITabObject.ActivationMode .
Возможные значения
Значение |
Краткое описание |
0 |
MouseFly  .
На движение мышью поверх объекта. |
1 |
Selection  .
На выделение объекта. |
2 |
DoubleClick  .
На двойной щелчок мышью. |
3 |
Never  .
Запрет активации. |
4 |
OnPreview  .
При открытии отчёта. |
Перечисления сборки Tab
## TabObjectChangeType

TabObjectChangeType
Описание
Перечисление  TabObjectChangeType
используется для определения типа изменения, которое происходит с объектом.
Используется следующими свойствами и конструкторами:
ITabObjectChangeEventArgs.Type ;
TabObjectChangeEventArgs.CreateObjectChangeArgs ;
IReportObjectChangeEventArgs .
Возможные значения
Значение |
Краткое описание |
0 |
Rect . Объект перемещают
или изменяют его размер. |
1 |
Angle . Объект вращают. |
Перечисления
сборки Tab
## TabObjectFlip

TabObjectFlip
Описание
Перечисление  TabObjectFlip  содержит
типы отражения объекта таблицы.
Используется следующим методом:
ITabObject.Flip .
Возможные значения
Значение |
Краткое описание |
0 |
Horizontal . Отражение
по горизонтали. |
1 |
Vertical . Отражение
по вертикали. |
Перечисления
сборки Tab
## TabObjectInteractiveRestrictions

TabObjectInteractiveRestrictions
Описание
Перечисление  TabObjectInteractiveRestrictions
используется для определения режимов перемещения и изменения размеров,
которые недоступны для объекта.
Используется следующим свойством:
ITabObject.InteractiveRestrictions .
Возможные значения
Значение |
Краткое описание |
0 |
None . На перемещение
и изменение размеров объекта не накладывается никаких ограничений. |
1 |
MoveHorizontal . Запрещено
перемещение объекта по горизонтали. |
2 |
MoveVertical . Запрещено
перемещение объекта по вертикали. |
4 |
ResizeTop . Запрещено
изменение размеров объекта путём перемещения верхней границы. |
8 |
ResizeLeft . Запрещено
изменение размеров объекта путём перемещения левой границы. |
16 |
ResizeRight . Запрещено
изменение размеров объекта путём перемещения правой границы. |
32 |
ResizeBottom . Запрещено
изменение размеров объекта путём перемещения нижней границы. |
64 |
Rotate . Запрещено вращение
объекта. |
Комментарии
Для использования нескольких значений перечисления одновременно укажите
их через оператор  Or .
Перечисления
сборки Tab
## TabObjectMovementMode

TabObjectMovementMode
Описание
Перечисление  TabObjectMovementMode
содержит режимы изменения позиции и размеров объекта.
Используется следующим свойством:
ITabObject.MovementMode .
Возможные значения
Значение |
Краткое описание |
0 |
Fixed  .
Не перемещать. |
1 |
FixedSize  .
С фиксированными размерами. |
2 |
FixedHeight  .
С фиксированной высотой. |
3 |
FixedWidth  .
С фиксированной шириной. |
4 |
Free  .
Свободное перемещение. |
5 |
FreeWithCells . Перемещение
объекта вместе с ячейками. |
Перечисления сборки Tab
## TabObjectResizingSide

TabObjectResizingSide
Описание
Перечисление  TabObjectResizingSide
содержит варианты сторон при изменении размеров объектов.
Используется следующими свойствами и методами:
IReportObjectResizingEventArgs.Side ;
ITabObjectResizingEventArgs.Side .
Возможные значения
Значение |
Краткое описание |
0 |
None . Отсутствует изменение
размеров. |
1 |
Left . Изменение размеров
слева. |
2 |
Right . Изменение размеров
справа. |
4 |
Top . Изменение размеров
сверху. |
8 |
Bottom . Изменение размеров
снизу. |
Перечисления
сборки Tab
## TabObjectsAdjustment

TabObjectsAdjustment
Описание
Перечисление  TabObjectsAdjustment
содержит способы подбора размера выделенных элементов.
Используется следующим методом:
ITabObjects.AdjustSelected .
Возможные значения
Значение |
Краткое описание |
0 |
MinWidth  .
По минимальной ширине. |
1 |
MaxWidth  .
По максимальной ширине. |
2 |
MinHeight  .
По минимальной высоте. |
3 |
MaxHeight  .
По максимальной высоте. |
Перечисления сборки Tab
## TabObjectsAlignment

TabObjectsAlignment
Описание
Перечисление  TabObjectsAlignment
содержит способы выравнивания нескольких выделенных объектов.
Используется следующим методом:
ITabObjects.AlignSelected .
Возможные значения
Значение |
Краткое описание |
0 |
Left  .
По левому краю. |
1 |
Right  .
По правому краю. |
2 |
HorizontalCenter  .
По горизонтальному центру. |
3 |
Top  .  По
верхнему краю. |
4 |
Bottom  .
По нижнему краю. |
5 |
VerticalCenter  .
По вертикальному центру. |
6 |
DistributeHorizontal  .
Распределить по горизонтали. |
7 |
DistributeVertical  .
Распределить по вертикали. |
Перечисления сборки Tab
## TabPasteMode

TabPasteMode
Описание
Перечисление  TabPasteMode  содержит
режимы специальной вставки.
Используется следующими методами:
ITabSheet.PasteEx ;
ITabRange.PasteFromStreamEx .
Возможные значения
Значение |
Краткое описание |
1 |
Values  .
Только значение. |
2 |
Formulas  .
Только формулы. |
3 |
ValuesAndFormulas  .
Значения и формулы. |
4 |
Format.  Стиль оформления. |
5 |
ValuesAndFormat  .
Значения и стиль оформления. |
8 |
Comments  .
Комментарии к ячейкам. |
15 |
All  .  Все. |
Перечисления сборки Tab
## TabPattern

TabPattern
Описание
Перечисление  TabPattern  содержит
узоры фона ячейки.
Используется следующим свойством:
ITabCellStyle.PatternStyle.
Возможные значения
Значение |
Краткое описание |
-1 |
Undefined |
-2 |
None |
0 |
Horizontal |
1 |
Vertical |
2 |
ForwardDiagonal |
3 |
BackwardDiagonal |
4 |
Cross |
5 |
DiagonalCross |
6 |
Percent05 |
7 |
Percent10 |
8 |
Percent20 |
9 |
Percent25 |
10 |
Percent30 |
11 |
Percent40 |
12 |
Percent50 |
13 |
Percent60 |
14 |
Percent70 |
15 |
Percent75 |
16 |
Percent80 |
17 |
Percent90 |
18 |
LightDownwardDiagonal |
19 |
LightUpwardDiagonal |
20 |
DarkDownwardDiagonal |
21 |
DarkUpwardDiagonal |
22 |
WideDownwardDiagonal |
23 |
WideUpwardDiagonal |
24 |
LightVertical |
25 |
LightHorizontal |
26 |
NarrowVertical |
27 |
NarrowHorizontal |
28 |
DarkVertical |
29 |
DarkHorizontal |
30 |
DashedDownwardDiagonal |
31 |
DashedUpwardDiagonal |
32 |
DashedHorizontal |
33 |
DashedVertical |
34 |
SmallConfetti |
35 |
LargeConfetti |
36 |
ZigZag |
37 |
Wave |
38 |
DiagonalBrick |
39 |
HorizontalBrick |
40 |
Weave |
41 |
Plaid |
42 |
Divot |
43 |
DottedGrid |
44 |
DottedDiamond |
45 |
Shingle |
46 |
Trellis |
47 |
Sphere |
48 |
SmallGrid |
49 |
SmallCheckerBoard |
50 |
LargeCheckerBoard |
51 |
OutlinedDiamond |
52 |
SolidDiamond |
53 |
Total |
Перечисления сборки Tab
## TabPictureHorizontalAlignment

TabPictureHorizontalAlignment
Описание
Перечисление  TabPictureHorizontalAlignment  содержит варианты ориентаций изображений в ячейке по горизонтали.
Используется следующим свойством:
ITabCellStyle.PictureHorizontalAlignment .
Возможные значения
Значение |
Краткое описание |
-1 |
Undefined  .  Не известно. |
0 |
Left  .  Слева. |
1 |
Right  .  Справа. |
2 |
Center  .  По центру. |
Перечисления сборки Tab
## TabPictureVerticalAlignment

TabPictureVerticalAlignment
Описание
Перечисление  TabPictureVerticalAlignment
содержит варианты ориентаций картинки в ячейке по вертикали.
Используется следующим свойством:
ITabCellStyle.PictureVerticalAlignment .
Возможные значения
Значение |
Краткое описание |
-1 |
Undefined  .
Не известно. |
0 |
Top  .  Сверху. |
1 |
Bottom  .
Снизу. |
2 |
Center  .
По центру. |
Перечисления сборки Tab
## TabRangeAdjustHeightFlags

TabRangeAdjustHeightFlags
Описание
Перечисление  TabRangeAdjustHeightFlags
содержит варианты подгонки высоты строки.
Используется следующим свойством:
ITabRange.AdjustHeightEx .
Возможные значения
Значение |
Краткое описание |
0 |
None  .
Автоподгонка высоты строки. |
1 |
OnlyDefault  .
Автоподгонка высоты строки не работает, если задано пользовательское
значение. |
Перечисления сборки Tab
## TabRangeCombineMode

TabRangeCombineMode
Описание
Перечисление  TabRangeCombineMode
содержит типы изменений, совершаемых над диапазонами элементов таблицы.
Используется следующим методом:
ITabRange.Combine .
Возможные значения
Значение |
Краткое описание |
1 |
And_ . Перекрытие диапазонов. |
2 |
Or_ . Объединение диапазонов. |
3 |
Xor_ . Объединение диапазонов
с исключением их перекрытия. |
4 |
Diff . Текущий диапазон
с исключением перекрытия. |
5 |
Copy . Копия текущего
диапазона. |
Перечисления
сборки Tab
## TabRangeFillType

TabRangeFillType
Описание
Перечисление  TabRangeFillType
содержит способы заполнения диапазона.
Используется следующим методом:
ITabRange.AutoFill .
Возможные значения
Значение |
Краткое описание |
1 |
Formats . При заполнении
будет скопировано только оформление ячеек.
При копировании оформления копируются следующие
свойства стиля ячеек:
BackgroundColor;
Binding ;
BorderColor ;
BorderStyle ;
BorderWeight ;
CustomFormat ;
DisplayEmptyAs ;
DisplayZeroAs ;
Font ;
HorizontalAlignment ;
Hyperlink ;
LocalCustomFormat ;
Margins ;
PatternColor;
PatternStyle;
VerticalAlignment ;
WrapText .
|
2 |
Values . При заполнении
будут скопированы только данные ячеек ( Формулы ,
значения
и  текст ).
При использовании данного способа в методе  ITabRange.AutoFill
можно указать шаг заполнения. |
4 |
Fill . При заполнении
будет использован метод  линейного
тренда . |
5 |
Default_ . Способ заполнения
по умолчанию. По умолчанию при заполнении будут скопированы данные
ячеек, их оформление и использован метод  линейного
тренда . |
Перечисления
сборки Tab
## TabRangeToArrayFlags

TabRangeToArrayFlags
Описание
Перечисление  TabRangeToArrayFlags
содержит флаги для преобразования диапазона.
Используется следующим свойством:
ITabRange.ToDoubleArrayEx .
Возможные значения
Значение |
Краткое описание |
0 |
None  .
Без особенностей. |
1 |
SkipNonNumber  .
Исключать нечисловые значения. |
2 |
ExcludeHidden  .
Исключать спрятанные ячейки. |
4 |
IncludeCollapsed  .
Включать значения свернутых экспандеров. |
Перечисления сборки Tab
## TabRangeType

TabRangeType
Описание
Перечисление  TabRangeType  содержит
типы диапазона.
Используется следующим свойством:
ITabRange.Type .
Возможные значения
Значение |
Краткое описание |
0 |
Cells  .
Ячейки. |
1 |
Rows  .
Строки. |
2 |
Columns  .
Колонки. |
3 |
Table  .
Вся таблица. |
4 |
None  .
Пусто. |
5 |
MultiPart  .
Несколько частей. |
Перечисления сборки Tab
## TabRowColumnResizeType

TabRowColumnResizeType
Описание
Перечисление  TabRowColumnResizeType
содержит типы действий, в результате которых изменяются размеры строк/столбцов
таблицы.
Используется следующими свойствами и методами:
ITabColumnResizeEventArgs.Type ;
ITabRowResizeEventArgs.Type .
Возможные значения
Значение |
Краткое описание |
0 |
Resize . Изменение размера
столбца/строки в результате визуального перемещении границы, либо
изменения  ширины / высоты
в коде приложения. |
1 |
Hide . Скрытие столбца/строки
в результате сворачивания экспандера, либо установки нулевой ширины/высоты. |
2 |
Show . Отображение столбца/строки
в результате разворачивания экспандера, либо установки не нулевой
ширины/высоты. |
Перечисления
сборки Tab
## TabSelectionMovementDirection

TabSelectionMovementDirection
Описание
Перечисление  TabSelectionMovementDirection
содержит направления перехода выделения после нажатия клавиши ENTER.
Используется следующим свойством:
ITabView.SelectionMovementDirection .
Возможные значения
Значение |
Краткое описание |
0 |
Down  .
Вниз.  |
1 |
Up  . Вверх.  |
2 |
Left  .
Влево. |
3 |
Right  .
Вправо. |
4 |
None  . Без перехода.  |
Перечисления
сборки Tab
## TabSelectionStyle

TabSelectionStyle
Описание
Перечисление  TabSelectionStyle
содержит способы выделения ячеек таблицы.
Используется следующим свойством:
ITabSelection.Style .
Возможные значения
Значение |
Краткое описание |
0 |
Normal  .
Обычный. |
1 |
RowOnly  .
Только одна строка. |
2 |
RowsOnly  .
Только несколько строк. |
3 |
ColumnOnly  .
Только один столбец. |
4 |
ColumnsOnly  .
Только несколько столбцов. |
5 |
Cell  .
Одна ячейка. |
6 |
CellCross  .
Одна ячейка вместе с фиксированной областью. |
7 |
Cross  .
Ячейки вместе с фиксированной областью. |
8 |
FocusOnly  .
Нет выделения, меняется только фокус. |
Перечисления сборки Tab
## Перечисления сборки Tab

Перечисления сборки Tab
|
Перечисление |
Краткое описание |
|
TabAccessRights
|
Перечисление  TabAccessRights
содержит варианты прав доступа к данным. |
|
TabActivationEditorMode
|
Перечисление  TabActivationEditorMode
содержит типы активации редактора ячейки. |
|
TabAutoFilterAction
|
Перечисление  TabAutoFilterAction
содержит типы выбранного условия автофильтра. |
|
TabBorder
|
Перечисление  TabBorder
содержит варианты границ ячейки, для которой устанавливаются какие-либо
параметры. |
|
TabBorderStyle
|
Перечисление  TabBorderStyle
содержит типы линий границы ячеек. |
|
TabBorderWeight
|
Перечисление  TabBorderWeight
содержит варианты толщины линии границы ячеек. |
|
TabCellContentChange
|
Перечисление  TabCellContentChange
содержит типы изменения в ячейке таблицы. |
|
TabCellIteratorOrder
|
Перечисление  TabCellIteratorOrder
содержит варианты упорядочивания элементов в итераторе. |
|
TabCellSearchDirection
|
Перечисление  TabCellSearchDirection
содержит варианты направлений, в которых может производиться поиск. |
|
TabCellSearchTarget
|
Перечисление  TabCellSearchTarget
содержит варианты свойства ячейки, по которым будет осуществляться
поиск. |
|
TabCleanPart
|
Перечисление  TabCleanPart
содержит варианты диапазона, которые можно очистить. |
|
TabConditionCellContentDate
|
Перечисление  TabConditionCellContentDate
содержит условия, которые могут выполняться для дат в форматируемых
ячейках. |
|
TabConditionCellContentText
|
Перечисление  TabConditionCellContentText
содержит условия, которые могут выполняться для текста форматируемых
ячеек. |
|
TabConditionCellContentValue
|
Перечисление  TabConditionCellContentValue
содержит условия, которые могут выполняться для значений форматируемых
ячеек. |
|
TabConditionIconRangeCond
|
Перечисление  TabConditionIconRangeCond
содержит соотношения, по которым осуществляется отбор значений,
удовлетворяющих указанному правилу. |
|
TabConditionIconType
|
Перечисление  TabConditionIconType
содержит стили пиктограмм, используемые при условном форматировании
ячеек. |
|
TabConditionPredefinedDataBarStyle
|
Перечисление  TabConditionPredefinedDataBarStyle
содержит стандартные стили гистограмм, используемые при условном
форматировании ячеек. |
|
TabConditionPredefinedGradientStyle
|
Перечисление  TabConditionPredefinedGradientStyle
содержит стандартные стили градиентных заливок, используемые при
условном форматировании ячеек. |
|
TabConditionPredefinedScaleStyle
|
Перечисление  TabConditionPredefinedScaleStyle
содержит стандартные стили цветовой шкалы, используемые при условном
форматировании ячеек. |
|
TabConditionType
|
Перечисление  TabConditionType
содержит типы условного форматирования, применяемого к ячейкам. |
|
TabCursor
|
Перечисление  TabCursor
содержит типы курсора, которые могут отображаться при наведении
мыши. |
|
TabCustomSortDirection
|
Перечисление  TabCustomSortDirection
содержит направления сортировки строк/столбцов таблицы данных. |
|
TabCustomSortType
|
Перечисление  TabCustomSortType
содержит типы сортировки, применяемой к строкам/столбцам таблицы
данных. |
|
TabDeleteShiftDirection
|
Перечисление  TabDeleteShiftDirection
используется для определения способа удаления диапазона ячеек. |
|
TabEmptyValuesTreatmentType
|
Перечисление  TabEmptyValuesTreatmentType
содержит варианты действий, которые необходимо произвести для
формул, ссылающихся на пустые ячейки. |
|
TabExpanderKind
|
Перечисление  TabExpanderKind
содержит типы экспандера. |
|
TabFindReplaceFormat
|
Перечисление  TabFindReplaceFormat
содержит варианты задания формата для искомого и заменяемого текста. |
|
TabFixedBehaviour
|
Перечисление  TabFixedBehaviour
содержит режимы работы со строками и столбцами при наличии фиксированной
области. |
|
TabFontCharset
|
Перечисление  TabFontCharset
содержит кодировки шрифта. |
|
TabFootnotesLocation
|
Перечисление  TabFootnotesLocation
содержит варианты расположения сносок при разбивке таблицы на
отдельные страницы. |
|
TabFootnotesNumberingRule
|
Перечисление  TabFootnotesNumberingRule
содержит правила нумерации сносок при переходе к таблицам других
листов. |
|
TabFormatAlignment
|
Перечисление  TabFormatAlignment
содержит варианты выравниваний текста ячейки по горизонтали. |
|
TabFormatAverageType
|
Перечисление  TabFormatAverageType
содержит типы значений, которые необходимо форматировать. |
|
TabFormatColorScaleTargetType
|
Перечисление  TabFormatColorScaleTargetType
используется для определения области применения цветовой шкалы. |
|
TabFormatContentType
|
Перечисление  TabFormatContentType
содержит типы содержимого ячеек, по которому ставится условие
для форматирования. |
|
TabFormatDlgItems
|
Перечисление  TabFormatDlgItems
содержит значения, соответствующие элементам, которые располагаются
на страницах диалога форматирования. |
|
TabFormatDlgPages
|
Перечисление  TabFormatDlgPages
содержит значения, соответствующие страницам диалога форматирования. |
|
TabFormatDuplicateType
|
Перечисление  TabFormatDuplicateType
содержит значения, для которых можно задать форматирование. |
|
TabFormatGrowthDirection
|
Перечисление  TabFormatGrowthDirection
содержит варианты построения индикатора роста. |
|
TabFormatLayout
|
Перечисление  TabFormatLayout
содержит варианты выравнивания текста ячейки по вертикали. |
|
TabFormatNumericScaleTargetType
|
Перечисление  TabFormatNumericScaleTargetType
используется для определения области применения числовой шкалы. |
|
TabFormatRankType
|
Перечисление  TabFormatRankType
содержит типы значений, для которых можно настроить форматирование
. |
|
TabFormatValuesStyle
|
Перечисление  TabFormatValuesStyle
содержит стили форматирования, используемые при форматировании
ячеек на основе их значений. |
|
TabFormatValueType
|
Перечисление  TabFormatValueType
содержит способы указания конечных и промежуточных значений, для
которых настраивается условный формат на основе значений ячеек
с определенным стилем. |
|
TabFormatWordWrap
|
Перечисление  TabFormatWordWrap
содержит способы переноса текста в ячейках таблицы. |
|
TabFormatWrapMode
|
Перечисление  TabFormatWrapMode
содержит варианты наложения фонового изображения в ячейке если
размер изображения меньше чем заполняемая область. |
|
TabHyperlinkActionType
|
Перечисление  TabHyperlinkActionType
содержит типы действий, выполняемого при щелчке по гиперссылке. |
|
TabHyperlinkObjectType
|
Перечисление  TabHyperlinkObjectType
содержит типы элементов, расположенных в ячейке с гиперссылкой. |
|
TabHyperlinkTarget
|
Перечисление  TabHyperlinkTarget
содержит способы загрузки страницы при переходе по ссылке. |
|
TabInsertShiftDirection
|
Перечисление  TabInsertShiftDirection
используется для определения способа вставки диапазона ячеек. |
|
TabInteractiveSelectionType
|
Перечисление  TabInteractiveSelectionType
содержит типы событий, при которых происходит визуальное перемещение
выделенной области ячеек в таблице. |
|
TabMargin
|
Перечисление  TabMargin
содержит варианты границ, от которых может быть установлен отступ. |
|
TabNumberStyle
|
Перечисление  TabNumberStyle
содержит стили цифр, которые могут использоваться для нумерации
сносок. |
|
TabObjectAction
|
Перечисление  TabObjectAction
содержит типы действия, совершенного над объектом таблицы. |
|
TabObjectActivationMode
|
Перечисление  TabObjectActivationMode
содержит режимы активации объектов таблицы. |
|
TabObjectChangeType
|
Перечисление  TabObjectChangeType
используется для определения типа изменения, которое происходит
с объектом. |
|
TabObjectFlip
|
Перечисление  TabObjectFlip
содержит типы отражения объекта таблицы. |
|
TabObjectInteractiveRestrictions
|
Перечисление  TabObjectInteractiveRestrictions
используется для определения режимов перемещения и изменения размеров,
которые недоступны для объекта. |
|
TabObjectMovementMode
|
Перечисление  TabObjectMovementMode
содержит режимы изменения позиции и размеров объекта. |
|
TabObjectsAdjustment
|
Перечисление  TabObjectsAdjustment
содержит способы подбора размера выделенных элементов. |
|
TabObjectsAlignment
|
Перечисление  TabObjectsAlignment
содержит способы выравнивания нескольких выделенных объектов. |
|
TabPasteMode
|
Перечисление  TabPasteMode
содержит режимы специальной вставки. |
|
TabPattern
|
Перечисление  TabPattern
содержит узоры фона ячейки. |
|
TabPictureHorizontalAlignment
|
Перечисление  TabPictureHorizontalAlignment
содержит варианты ориентаций картинки в ячейке по горизонтали. |
|
TabPictureVerticalAlignment
|
Перечисление  TabPictureVerticalAlignment
содержит варианты ориентаций картинки в ячейке по вертикали. |
|
TabRangeAdjustHeightFlags
|
Перечисление  TabRangeAdjustHeightFlags
содержит варианты подгонки высоты строки. |
|
TabRangeCombineMode
|
Перечисление  TabRangeCombineMode
содержит типы изменений, совершаемых над диапазонами элементов
таблицы. |
|
TabRangeFillType
|
Перечисление  TabRangeFillType
содержит способы заполнения диапазона. |
|
TabRangeToArrayFlags
|
Перечисление  TabRangeToArrayFlags
содержит флаги для преобразования диапазона. |
|
TabRangeType
|
Перечисление  TabRangeType
содержит типы диапазона. |
|
TabRowColumnResizeType
|
Перечисление  TabRowColumnResizeType
содержит типы действий, в результате которых изменяются размеры
строк/столбцов таблицы.. |
|
TabSelectionMovementDirection
|
Перечисление  TabSelectionMovementDirection
содержит направления перехода выделения после нажатия клавиши
ENTER. |
|
TabSelectionStyle
|
Перечисление  TabSelectionStyle
содержит способы выделения ячеек таблицы. |
|
TabTableCleanPart
|
Перечисление  TabTableCleanPart
содержит варианты очищаемой области таблицы. |
|
TabTablePredefinedStyle
|
Перечисление  TabTablePredefinedStyle
содержит стили оформления таблицы. |
|
TabUserInteractiveSelectionChangeType
|
Перечисление  TabUserInteractiveSelectionChangeType
содержит варианты ограничений по изменению границ интерактивного
диапазона. |
|
TabViewArea
|
Перечисление  TabViewArea
содержит варианты областей таблицы, в которых расположена точка. |
|
TabViewEventGroups
|
Перечисление  TabViewEventGroups
используется для определения групп событий, вызываемых для  таблицы . |
|
TabViewScrollBars
|
Перечисление  TabViewScrollBars
содержит варианты видимости полос прокрутки таблицы. |
Интерфейсы сборки Tab
|  Классы
сборки Tab  |  Статические методы сборки Tab
|  Делегаты сборки Tab
## TabTableCleanPart

TabTableCleanPart
Описание
Перечисление  TabTableCleanPart
содержит варианты очищаемой области таблицы.
Используется следующим методом:
ITabSheet.ClearPart .
Возможные значения
Значение |
Краткое описание |
1 |
Cells  .
Очистить все, что связано с ячейками. |
2 |
Rows  .
Очистить все, что связано со строками таблицы. |
4 |
Columns  .
Очистить все, что связано со столбцами таблицы. |
7 |
All  .  Очистить
все содержимое таблицы. Осуществляется очистка всего, что связано
с ячейками, строками и столбцами таблицы. |
Перечисления сборки Tab
## TabTablePredefinedStyle

TabTablePredefinedStyle
Описание
Перечисление  TabTablePredefinedStyle
содержит стили оформления таблицы.
Используется следующими методами и свойствами:
ITabTableStyle.AssignPredefined ;
ITabTableStyle.PredefinedStyle .
Возможные значения
Значение |
Краткое описание |
-1 |
Undefined  . Чередующийся
стиль создан пользователем.  |
0 |
Blue  .
Синий:
|
1 |
DarkBlue  .
Темно-синий:
|
2 |
Red  .  Красный:
|
3 |
DarkRed  .
Темно-красный:
|
4 |
Green  .
Зеленый:
|
5 |
DarkGreen  .
Темно-зеленый:
|
6 |
Purple  .
Фиолетовый:
|
7 |
DarkPurple  .
Темно-фиолетовый:
|
8 |
Orange  .
Оранжевый:
|
9 |
DarkOrange  .
Темно-оранжевый:
|
10 |
ExtBlueStriped . Синий
(без границ):
|
11 |
ExtBlue . Синий (с границами):
|
12 |
ExtGreyStriped . Серый
(без границ):
|
13 |
ExtGrey . Серый (с границами):
|
14 |
ExtDarkBlueStriped .
Темно-синий (без границ):
|
15 |
ExtDarkBlue . Темно-синий
(с границами):
|
16 |
ExtGreenStriped . Зеленый
(без границ):
|
17 |
ExtGreen . Зеленый (с
границами):
|
18 |
ExtBrownStriped . Коричневый
(без границ):
|
19 |
ExtBrown . Коричневый
(с границами):
|
20 |
ExtRedStriped . Красный
(без границ):
|
21 |
ExtRed . Красный (с
границами):
|
Перечисления сборки Tab
## TabUserInteractiveSelectionChangeType

TabUserInteractiveSelectionChangeType
Описание
Перечисление  TabUserInteractiveSelectionChangeType
содержит варианты ограничений по изменению границ интерактивного диапазона.
Используется следующими свойствами и методами:
ITabUserInteractiveSelection.InteractiveRestrictions ;
ITabUserInteractiveSelectionEventArgs.Type ;
TabUserInteractiveSelectionEventArgs.CreateInteractiveSelectionArgs .
Возможные значения
Значение |
Краткое описание |
0 |
None . Ограничения отсутствуют. |
1 |
Move . Запрещено перемещать
интерактивный диапазон целиком. |
2 |
Left . Запрещено изменять
левую границу диапазона. |
4 |
Top . Запрещено изменять
верхнюю границу диапазона. |
8 |
Right . Запрещено изменять
правую границу диапазона. |
16 |
Bottom . Запрещено изменять
нижнюю границу диапазона. |
31 |
All . Запрещено любое
изменение интерактивного диапазона. |
Перечисления
сборки Tab
## TabViewArea

TabViewArea
Описание
Перечисление  TabViewArea  содержит
варианты областей таблицы, в которых расположена точка.
Используется следующим методом:
ITabView.HitTest .
Возможные значения
Значение |
Краткое описание |
0 |
Client  .
Область ячеек. |
1 |
TopLeftCorner  .
Верхний левый угол. |
2 |
ColumnsHeader  .
Заголовки столбцов. |
3 |
RowsHeader  .
Заголовки строк. |
Перечисления сборки Tab
## TabViewEventGroups

TabViewEventGroups
Описание
Перечисление  TabViewEventGroups
используется для определения групп событий, вызываемых для  таблицы .
Используется следующим свойством:
ITabSheet.EventMask .
Возможные значения
Значение |
Краткое описание |
1 |
ClickEvents . Группа
событий при щелчках кнопкой мыши:
OnCellClick ;
OnColumnClick ;
OnRowClick ;
OnTableClick .
|
2 |
SelectionEvents . Группа
событий при выделении ячеек:
OnBeginSelectionChange ;
OnEndSelectionChange ;
OnSelectionChange .
|
4 |
CellChangeEvents . Группа
событий при изменении содержания ячеек/ячейки:
OnBeforeCellChange ;
OnBeforeCellsChange ;
OnCellChange ;
OnCellsChange ;
OnChangeCellContent .
|
8 |
ResizeEvents . Группа
событий при изменении размеров:
OnBeforeColumnResize ;
OnBeforeRowResize ;
OnColumnResize ;
OnColumnResizing ;
OnRowResize ;
OnRowResizing .
|
16 |
EditEvents . Группа
событий при редактировании ячейки:
OnAfterEdit ;
OnBeforeEdit .
|
32 |
InteractiveEvents .
Группа интерактивных событий:
OnAutoFilter ;
OnBeforeExpanderChanged ;
OnBeginInteractiveSelectionChange ;
OnCellPictureClick ;
OnEndInteractiveSelectionChange ;
OnExpanderChanged ;
OnHyperlinkClick ;
OnInteractiveSelectionChange ;
OnObjectActivate .
|
64 |
NotifyEvents . Группа
событий при работе с таблицей:
OnProtectionFail ;
OnRCChange (внутреннее событие);
OnScaleChange ;
OnStartCalc (внутреннее событие).
|
128 |
EditorEvents . Группа
событий, связанных с редактированием данных в ячейках:
OnEditorTextChanged .
|
256 |
InsertOrDeleteRangeEvents .
Группа событий, связанных с добавлением и удалением диапазонов
таблицы:
OnAfterDeleteRange ;
OnAfterInsertRange ;
OnBeforeDeleteRange ;
OnBeforeInsertRange .
|
512 |
ObjectEvents . Группа
событий, связанных с перемещением, вращением или измерением размера
объекта:
OnAfterObjectChange ;
OnBeforeObjectChange .
|
65535 |
AllEvents . Все события
таблицы . |
Перечисления сборки Tab
## TabViewScrollBars

TabViewScrollBars
Описание
Перечисление  TabViewScrollBars
содержит варианты видимости полос прокрутки таблицы.
Используется следующим свойством:
ITabView.VisibleScrollBars .
Возможные значения
Значение |
Краткое описание |
0 |
None  .
Полосы прокрутки не отображаются. |
1 |
Horizontal  .
Отображается только горизонтальная полоса прокрутки. |
2 |
Vertical  .
Отображается только вертикальная полоса прокрутки. |
3 |
Both  .
Отображаются горизонтальная и вертикальная полосы прокрутки. |
4 |
Auto . Автоматическое
определение необходимости отображения определенной полосы прокрутки
в зависимости от содержимого таблицы. |
Перечисления сборки Tab
