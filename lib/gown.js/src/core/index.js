/**
 * @file        Main export of the gown.js core library
 * @author      Andreas Bresser <andreasbresser@gmail.com>
 * @copyright   2015 Andreas Bresser
 * @license     {@link https://github.com/brean/gown.js/blob/master/LICENSE|Apache License}
 */

/**
 * @namespace GOWN.core
 */
module.exports = {
    Control:        require('./Control'),
    Skinable:       require('./Skinable'),

    // controls
    Application:            require('./controls/Application'),
    Button:                 require('./controls/Button'),
    CheckBox:               require('./controls/CheckBox'),
    Radio:                  require('./controls/Radio'),
    InputControl:           require('./controls/InputControl'),
    TextAreaControl:        require('./controls/TextAreaControl'),
    LayoutGroup:            require('./controls/LayoutGroup'),
    Scrollable:             require('./controls/Scrollable'),
    ScrollArea:             require('./controls/ScrollArea'),
    ScrollBar:              require('./controls/ScrollBar'),
    ScrollThumb:            require('./controls/ScrollThumb'),
    Slider:                 require('./controls/Slider'),
    TextInput:              require('./controls/TextInput'),
    TextArea:               require('./controls/TextArea'),
    ToggleButton:           require('./controls/ToggleButton'),
    ToggleGroup:            require('./controls/ToggleGroup'),
    DropDownList:           require('./controls/DropDownList'),

    // layout
    HorizontalLayout:     require('./layout/HorizontalLayout'),
    Layout:               require('./layout/Layout'),
    LayoutAlignment:      require('./layout/LayoutAlignment'),
    TiledColumnsLayout:   require('./layout/TiledColumnsLayout'),
    TiledLayout:          require('./layout/TiledLayout'),
    TiledRowsLayout:      require('./layout/TiledRowsLayout'),
    VerticalLayout:       require('./layout/VerticalLayout'),
    ViewPortBounds:       require('./layout/ViewPortBounds'),

    // shapes
    Diamond:           require('./shapes/Diamond'),
    Ellipse:           require('./shapes/Ellipse'),
    Line:              require('./shapes/Line'),
    Rect:              require('./shapes/Rect'),
    Shape:             require('./shapes/Shape'),

    // skin
    Theme:           require('./skin/Theme')
};
