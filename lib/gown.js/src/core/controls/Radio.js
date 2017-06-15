var ToggleButton = require('./ToggleButton');

/**
 * A toggleable control that exists in a set that requires a single, exclusive toggled item.
 *
 * @class Radio
 * @extends GOWN.ToggleButton
 * @memberof GOWN
 * @constructor
 */
function Radio(theme, skinName) {
    skinName = skinName || Radio.SKIN_NAME;
    ToggleButton.call(this, theme, skinName);

    this._currentState = 'up';
    // this.selected = preselected || false;
    this._selected = false;
}

Radio.prototype = Object.create(ToggleButton.prototype);
Radio.prototype.constructor = Radio;
module.exports = Radio;

Radio.CHANGE = 'radio';

// name of skin that will be applied
Radio.SKIN_NAME = 'radio';

// the states of the radio as constants
Radio.UP = 'up';
Radio.DOWN = 'down';
Radio.HOVER = 'hover';

// the states of the radio in the 'selected' state as constants
Radio.SELECTED_UP = 'selected_up';
Radio.SELECTED_DOWN = 'selected_down';
Radio.SELECTED_HOVER = 'selected_hover';

// the list of non-selected states
Radio.stateNames = [
    Radio.UP,
    Radio.DOWN,
    Radio.HOVER
];

// the list of selected states
Radio.selectedStateNames = [
    Radio.SELECTED_UP,
    Radio.SELECTED_DOWN,
    Radio.SELECTED_HOVER
];

/**
 * Create/Update the label of the button.
 *
 * @property label
 * @type String
 */
Object.defineProperty(Radio.prototype, 'toggleGroup', {
    get: function () {
        return this._toggleGroup;
    },
    set: function (toggleGroup) {
        if (this._toggleGroup === toggleGroup) {
            return;
        }
        this._toggleGroup = toggleGroup;
        toggleGroup.addItem(this);
    }
});