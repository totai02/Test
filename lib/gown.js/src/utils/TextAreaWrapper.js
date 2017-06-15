/**
 * Wrapper for DOM Text Input
 *
 * based on PIXI.Input InputObject by Sebastian Nette,
 * see https://github.com/SebastianNette/PIXI.Input
 *
 * @class TextAreaWrapper
 * @memberof GOWN
 * @static
 */
function TextAreaWrapper() {
}
module.exports = TextAreaWrapper;

/**
 * DOM input field.
 * we use one input field for all TextAreaControls
 *
 * @property hiddenInput
 * @type DOMObject
 * @static
 */
TextAreaWrapper.hiddenInput = null;

/**
 * create/return unique input field.
 * @returns {DOMObject}
 */
TextAreaWrapper.createInput = function () {
    if (!TextAreaWrapper.hiddenInput) {
        var input = document.createElement('textarea');
        input.type = 'text';
        input.row = '20';
        input.tabindex = -1;
        input.style.position = 'fixed';
        input.style.opacity = 0;
        input.style.pointerEvents = 'none';
        input.style.left = '0px';
        input.style.bottom = '0px';
        input.style.left = '-100px';
        input.style.top = '-100px';
        input.style.zIndex = 10;

        // add blur handler
        input.addEventListener('blur', function () {
            if (GOWN.TextAreaControl.currentInput) {
                GOWN.TextAreaControl.currentInput.onMouseUpOutside();
            }
        }, false);

        // on key down
        input.addEventListener('keydown', function (e) {
            if (GOWN.TextAreaControl.currentInput) {
                e = e || window.event;
                if (GOWN.TextAreaControl.currentInput.hasFocus) {
                    GOWN.TextAreaControl.currentInput.onKeyDown(e);
                }
            }
        });

        // on key up
        input.addEventListener('keyup', function (e) {
            if (GOWN.TextAreaControl.currentInput) {
                e = e || window.event;
                if (GOWN.TextAreaControl.currentInput.hasFocus) {
                    GOWN.TextAreaControl.currentInput.onKeyUp(e);
                }
            }
        });

        document.body.appendChild(input);

        TextAreaWrapper.hiddenInput = input;
    }
    return TextAreaWrapper.hiddenInput;
};

/**
 * key to get text ('value' for default input field)
 * @type {string}
 * @static
 * @private
 */
TextAreaWrapper.textProp = 'value';

/**
 * activate the text input
 */
TextAreaWrapper.focus = function () {
    if (TextAreaWrapper.hiddenInput) {
        TextAreaWrapper.hiddenInput.focus();
    }
};

/**
 * deactivate the text input
 */
TextAreaWrapper.blur = function () {
    if (TextAreaWrapper.hiddenInput) {
        TextAreaWrapper.hiddenInput.blur();
    }
};


/**
 * set selection
 * @returns {DOMObject}
 */
TextAreaWrapper.setSelection = function (start, end) {
    if (TextAreaWrapper.hiddenInput) {
        TextAreaWrapper.hiddenInput.selectionStart = start;
        TextAreaWrapper.hiddenInput.selectionEnd = end;
    } else {
        TextAreaWrapper._selection = [start, end];
    }
};

/**
 * get start and end of selection
 * @returns {Array}
 */
TextAreaWrapper.getSelection = function () {
    if (TextAreaWrapper.hiddenInput) {
        return [
            TextAreaWrapper.hiddenInput.selectionStart,
            TextAreaWrapper.hiddenInput.selectionEnd
        ];
    } else {
        return TextAreaWrapper._selection;
    }
};

/**
 * get text value from hiddenInput
 * @returns {String}
 */
TextAreaWrapper.getText = function () {
    if (TextAreaWrapper.hiddenInput) {
        var textProp = TextAreaWrapper.textProp;
        var txt = TextAreaWrapper.hiddenInput[textProp];
        return txt.replace(/\r/g, '');
    } else {
        return TextAreaWrapper._text;
    }

};

/**
 * get text value to hiddenInput
 * @param {String} text
 */
TextAreaWrapper.setText = function (text) {
    if (TextAreaWrapper.hiddenInput) {
        var textProp = TextAreaWrapper.textProp;
        TextAreaWrapper.hiddenInput[textProp] = text;
    } else {
        TextAreaWrapper._text = text;
    }
};

/**
 * set max. length setting it to 0 will allow unlimited text input
 * @param length
 */
TextAreaWrapper.setMaxLength = function (length) {
    if (TextAreaWrapper.hiddenInput) {
        if (!length || length < 0) {
            TextAreaWrapper.hiddenInput.removeAttribute('maxlength');
        } else {
            TextAreaWrapper.hiddenInput.setAttribute('maxlength', length);
        }
    } else {
        TextAreaWrapper._maxLength = length;
    }
};