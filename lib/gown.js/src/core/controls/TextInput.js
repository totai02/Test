var Control = require('../Control'),
    InputControl = require('./InputControl'),
    InputWrapper = require('../../utils/InputWrapper'),
    ThemeFont = require('../skin/ThemeFont'),
    Skinable = require('../Skinable');
/**
 * The basic Text Input - based on PIXI.Input Input by Sebastian Nette,
 * see https://github.com/SebastianNette/PIXI.Input
 *
 * @class TextInput
 * @extends GOWN.InputControl
 * @memberof GOWN
 * @param text editable text shown in input
 * @param displayAsPassword Display TextInput as Password (default false)
 * @param theme default theme
 * @constructor
 */

function TextInput(text, displayAsPassword, theme, skinName) {
    // show and load background image as skin (exploiting skin states)
    this.skinName = skinName || TextInput.SKIN_NAME;
    this._validStates = this._validStates || InputControl.stateNames;

    this.invalidState = true;

    InputControl.call(this, text, theme);

    this._displayAsPassword = displayAsPassword || false;

    /**
     * timer used to indicate if the cursor is shown
     *
     * @property _cursorTimer
     * @type {Number}
     * @private
     */
    this._cursorTimer = 0;

    /**
     * indicates if the cursor position has changed
     *
     * @property _cursorNeedsUpdate
     * @type {Boolean}
     * @private
     */

    this._cursorNeedsUpdate = true;

    /**
     * interval for the cursor (in milliseconds)
     *
     * @property blinkInterval
     * @type {number}
     */
    this.blinkInterval = 500;

    /**
     * selected area (start and end)
     *
     * @type {Array}
     * @private
     */
    this.selection = [0, 0];

    // caret/selection sprite
    this.cursor = new PIXI.Text('|', TextInput.TextStyle);
    this.addChild(this.cursor);

    // selection background
    this.selectionBg = new PIXI.Graphics();
    this.addChildAt(this.selectionBg, 0);

    // set up events
    this.boundOnMouseUp = this.onMouseUp.bind(this);
    this.boundOnMouseUpOutside = this.onMouseUpOutside.bind(this);
    this.boundOnMouseDown = this.onMouseDown.bind(this);
    this.boundOnMouseMove = this.onMouseMove.bind(this);

    this.mousemove = this.touchmove = this.boundOnMouseMove;
    this.mousedown = this.touchstart = this.boundOnMouseDown;
    this.mouseup = this.touchend = this.boundOnMouseUp;
    this.mouseupoutside = this.touchendoutside = this.boundOnMouseUpOutside;

    this._enabled = false;
    this._restrict = '';
    this._padding = this._paddingX = this._paddingY = 5;
}

TextInput.prototype = Object.create(InputControl.prototype);
TextInput.prototype.constructor = TextInput;
module.exports = TextInput;

//SD: set style for text input
TextInput.TextStyle = TextInput.TextStyle || new ThemeFont();

// name of skin
TextInput.SKIN_NAME = 'text_input';

Object.defineProperty(TextInput.prototype, 'enabled', {
    get: function () {
        return this._enabled;
    },
    set: function (is) {
        this._enabled = is;

        if (is) {
            this.currentState = TextInput.DISABLE;
            this.interactive = is;
        }
    }
});

/**
 * set the text that is shown inside the input field.
 * calls onTextChange callback if text changes
 *
 * @property text
 * @type String
 */
Object.defineProperty(TextInput.prototype, 'text', {
    get: function () {
        if (this._displayAsPassword) {
            return this._origText;
        }
        return this._text;
    },
    set: function (text) {
        text += ''; // add '' to assure text is parsed as string
        if (this._origText === text) {
            // return if text has not changed
            return;
        }
        this._origText = text;
        if (this._displayAsPassword) {
            text = text.replace(/./gi, '*');
        }
        this._text = text || '';
        if (!this.pixiText) {
            this.pixiText = new PIXI.Text(text, TextInput.TextStyle);
            this.addChild(this.pixiText);
        } else {
            this.pixiText.text = text;
        }

        if (this.padding !== 0) {
            this.pixiText.x = this.pixiText.y = this.padding;
        } else {
            if (this.paddingX !== 0)
                this.pixiText.x = this.paddingX;
            
            if (this.paddingY !== 0)
                this.pixiText.y = this.paddingY;
        }

        // update text input if this text field has the focus
        if (this.hasFocus) {
            // InputWrapper.setText(this.value);
        }

        for (var child of this.children) {
            if (child.name == 'hint') {
                if (text != '') child.visible = false;
            }
        }

        // reposition cursor
        this._cursorNeedsUpdate = true;
        if (this.change) {
            this.change(text);
        }
    }
});


/**
 * The maximum number of characters that may be entered. If 0,
 * any number of characters may be entered.
 * (same as maxLength for DOM inputs)
 *
 * @default 0
 * @property maxChars
 * @type String
 */
Object.defineProperty(TextInput.prototype, 'maxChars', {
    get: function () {
        return this._maxChars;
    },
    set: function (value) {
        if (this._maxChars === value) {
            return;
        }
        InputWrapper.setMaxLength(value);
        this._maxChars = value;
    }
});

Object.defineProperty(TextInput.prototype, 'restrict', {
    get: function () {
        return this._restrict;
    },
    set: function (regex) {
        this._restrict = regex;
    }
});

Object.defineProperty(TextInput.prototype, 'padding', {
    get: function () {
        return this._padding;
    },
    set: function (value) {
        this._padding = value;
    }
});

Object.defineProperty(TextInput.prototype, 'paddingX', {
    get: function () {
        return this._paddingX;
    },
    set: function (value) {
        this._paddingX = value;
    }
});

Object.defineProperty(TextInput.prototype, 'paddingY', {
    get: function () {
        return this._paddingY;
    },
    set: function (value) {
        this._paddingY = value;
    }
});

Object.defineProperty(TextInput.prototype, 'value', {
    get: function () {
        return this._origText;
    }
});

/**
 * set text and type of DOM text input
 *
 * @method onfocus
 */
TextInput.prototype.onfocus = function () {
    InputWrapper.setText(this.value);
    InputWrapper.setMaxLength(this.maxChars);
    if (this._displayAsPassword) {
        InputWrapper.setType('password');
    } else {
        InputWrapper.setType('text');
    }
};

TextInput.prototype.clear = function () {
    InputWrapper.setText('');
};

/**
 * set selected text
 *
 * @method updateSelection
 * @param start
 * @param end
 * @returns {boolean}
 */
TextInput.prototype.updateSelection = function (start, end) {
    if (this.selection[0] !== start || this.selection[1] !== end) {
        this.selection[0] = start;
        this.selection[1] = end;
        InputWrapper.setSelection(start, end);
        this._cursorNeedsUpdate = true;
        this.updateSelectionBg();
        return true;
    } else {
        return false;
    }
};

TextInput.prototype.updateSelectionBg = function () {
    var start = this.posToCoord(this.selection[0]),
        end = this.posToCoord(this.selection[1]);

    this.selectionBg.clear();
    if (start !== end) {
        this.selectionBg.beginFill(0x0080ff);
        this.selectionBg.drawRect(0, 0, end - start, this.pixiText.height);
        this.selectionBg.x = start;
        this.selectionBg.y = this.pixiText.y;
    }
};

TextInput.prototype.onblur = function () {
    this.updateSelection(0, 0);
};

TextInput.prototype.onSubmit = function () {
};

TextInput.prototype.onKeyDown = function (e) {
    var keyCode = e.which;

    // ESC
    if (e.which === 27) {
        this.blur();
        return;
    }

    // add support for Ctrl/Cmd+A selection - select whole input text
    if (keyCode === 65 && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.updateSelection(0, this.text.length);
        return;
    }

    // block keys that shouldn't be processed
    if (keyCode === 17 || e.metaKey || e.ctrlKey) {
        return;
    }

    // enter key
    if (keyCode === 13) {
        e.preventDefault();
        this.onSubmit(e);
    }

    // update the canvas input state information from the hidden input
    this.updateTextState();
};

TextInput.prototype.onKeyUp = function () {
    this.updateTextState();
};

/**
 * position cursor on the text
 */
TextInput.prototype.setCursorPos = function () {
    this.cursor.x = (this.textWidth(this._text.substring(0, this.cursorPos)) + (this.padding !== 0 ? this.padding : (this.paddingX !== 0 ? this.paddingX : 0)) - 1) | 0;
    this.cursor.y = this.padding !== 0 ? this.padding : (this.paddingY !== 0 ? this.paddingY : 0) - 3;
};

/**
 * draw the cursor
 *
 * @method drawCursor
 */
TextInput.prototype.drawCursor = function () {
    if (this.hasFocus || this._mouseDown) {
        var time = Date.now();

        // blink interval for cursor
        if ((time - this._cursorTimer) >= this.blinkInterval) {
            this._cursorTimer = time;
            this.cursor.visible = !this.cursor.visible;
        }

        // update cursor position
        if (this.cursor.visible && this._cursorNeedsUpdate) {
            this.setCursorPos();
            this._cursorNeedsUpdate = false;
        }
    } else {
        this.cursor.visible = false;
    }
};

TextInput.prototype.redraw = function () {
    this.drawCursor();
    Control.prototype.redraw.call(this);
};

TextInput.prototype.onMouseMove = function (e) {
    var mouse = this.mousePos(e);
    if (!this.hasFocus || !this._mouseDown || this.selectionStart < 0) { // || !this.containsPoint(mouse)) {
        return false;
    }

    var curPos = this.clickPos(mouse.x, mouse.y),
        start = Math.min(this.selectionStart, curPos),
        end = Math.max(this.selectionStart, curPos);

    if (this.updateSelection(start, end)) {
        this.cursorPos = curPos;
        this.setCursorPos();
        this._cursorNeedsUpdate = true;
    }
    return true;
};

TextInput.prototype.onMouseDown = function (e) {
    var originalEvent = e.data.originalEvent;
    if (originalEvent.which === 2 || originalEvent.which === 3) {
        originalEvent.preventDefault();
        return false;
    }

    // focus input
    this.focus();

    this._mouseDown = true;
    var mouse = this.mousePos(e);

    // start the selection drag if inside the input
    this.selectionStart = this.clickPos(mouse.x, mouse.y);
    this.updateSelection(this.selectionStart, this.selectionStart);
    this.cursorPos = this.selectionStart;
    this.setCursorPos();
    return true;
};

TextInput.prototype.onMouseUp = function (e) {
    var originalEvent = e.data.originalEvent;
    if (originalEvent.which === 2 || originalEvent.which === 3) {
        originalEvent.preventDefault();
        return false;
    }

    var mouse = this.mousePos(e);

    // update selection if a drag has happened
    var clickPos = this.clickPos(mouse.x, mouse.y);

    // update the cursor position
    if (!(this.selectionStart >= 0 && clickPos !== this.selectionStart)) {
        this.cursorPos = clickPos;
        this.setCursorPos();
        this.updateSelection(this.cursorPos, this.cursorPos);
    }

    this.selectionStart = -1;
    this._mouseDown = false;
    return true;
};

/**
 * synchronize TextInput with DOM element
 *
 * @method updateTextState
 */
TextInput.prototype.updateTextState = function () {
    var text = InputWrapper.getText();
    var sel = InputWrapper.getSelection();
    
    if (text !== this.text) {
        if (this.restrict) {
            if (text == '' || new RegExp(this.restrict).test(text)) {
                this.text = text;
            } else {
                InputWrapper.setText(this.text);
                sel.forEach(function (el, i) {
                    sel[i]--;
                })
                InputWrapper.setSelection(sel[0], sel[1]);
            }
        } else {
            this.text = text;
        }
    }
    
    if (this.updateSelection(sel[0], sel[1])) {
        this.cursorPos = sel[0];
    }

    this.setCursorPos();
};

/**
 * The current state (one of _validStates)
 * TODO: move to skinable?
 *
 * @property currentState
 * @type String
 */