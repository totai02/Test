var Scrollable = require('./Scrollable'),
    SliderData = require('../../utils/SliderData');

/**
 * Simple slider with min. and max. value
 *
 * @class Slider
 * @extends GOWN.Scrollable
 * @memberof GOWN
 * @constructor
 */

function Slider(thumb, theme, skinName) {
    this.skinName = skinName || Slider.SKIN_NAME;

    this._minimum = this._minimum || 0;
    this._maximum = this._maximum || 100;
    this._step = this._step || 0; //TODO: implement me!
    this.page = this.page || 10; //TODO: implement me!
    this._value = this.minimum;
    this.change = null;

    Scrollable.call(this, thumb, theme);
    this.thumb.y = -10;

    this._enabled = true;
}

Slider.prototype = Object.create(Scrollable.prototype);
Slider.prototype.constructor = Slider;
module.exports = Slider;

Slider.SKIN_NAME = 'scroll_bar';

/**
 * thumb has been moved - calculate new value
 *
 * @param x x-position to scroll to (ignored when vertical)
 * @param y y-position to scroll to (ignored when horizontal)
 */
Slider.prototype.thumbMoved = function (x, y) {
    var pos = 0;
    if (this.orientation === Scrollable.HORIZONTAL) {
        pos = x;
    } else {
        pos = y;
    }
    this.value = this.pixelToValue(pos);
};

/**
 * calculate value of slider based on current pixel position of thumb
 *
 * @param position
 * @method pixelToValue
 * @returns Number value between minimum and maximum
 */
Slider.prototype.pixelToValue = function (position) {
    var max = 0;
    if (this.orientation === Scrollable.HORIZONTAL) {
        max = this.maxWidth();
    } else {
        max = this.maxHeight();
    }
    if (this._inverse) {
        position = max - position;
    }
    return position / max * (this.maximum - this.minimum) + this.minimum;
};

/**
 * calculate current pixel position of thumb based on given value
 *
 * @param value
 * @method valueToPixel
 * @returns Number position of the scroll thumb in pixel
 */
Slider.prototype.valueToPixel = function (value) {
    var max = 0;
    if (this.orientation === Scrollable.HORIZONTAL) max = this.maxWidth();
    else max = this.maxHeight();

    var position = (value - this.minimum) / (this.maximum - this.minimum) * max;
    // if (max === 0) {
    //     position = this.minimum;
    // } else {
    //     position = (value - this.minimum) / (this.maximum - this.minimum) * max;
    // }

    if (this._inverse) position = max - position;

    return position;
};

/**
 * set value (between minimum and maximum)
 *
 * @property value
 * @type Number
 * @default 0
 */
Object.defineProperty(Slider.prototype, 'value', {
    get: function () {
        return this._value;
    },
    set: function (value) {
        if (isNaN(value)) {
            return;
        }
        value = Math.min(value, this.maximum);
        value = Math.max(value, this.minimum);

        if (this._value === value) return;

        this._value = value;
        var pos = this.valueToPixel(value);

        if (this._step) {
            var temp = Math.round((value - this._minimum) / this._step);
            
            if (this._maximum === this._minimum) {
                pos = 0;
            } else {
                let wStep = Math.round(this.width / Math.ceil((this._maximum - this._minimum) / this._step));

                this._value = this._step * (Math.floor(this._minimum / this._step) + temp);
                /*
                 prohibit to slide over [minimum, maximum] range when minimum or maximum is not a multiple of step
                 */
                if (this._value < this._minimum) {
                    this._value = this._minimum;
                }
                if (this._value > this._maximum) {
                    this._value = this._maximum;
                }
                
                // this._stepPos = wStep * temp;
            }
        }

        if (this.orientation === Scrollable.HORIZONTAL) {
            this.moveThumb(pos, 0);
        } else {
            this.moveThumb(0, pos);
        }

        if (this.change) {
            var sliderData = new SliderData();
            sliderData.value = this._value;
            sliderData.target = this;
            this.change(sliderData);
        }
    }
});

Slider.prototype.handleDown = function (mouseData) {
    var local = mouseData.data.getLocalPosition(this);
    if (mouseData.target === this) {
        var center = {
            x: local.x - this.thumb.width / 2,
            y: local.y - this.thumb.height / 2
        };
        this._start = [center.x, center.y];
        this.thumbMoved(center.x, center.y);
    }
};

Slider.prototype.handleUp = function (mouseData) {
    // jump to exactly step pos
    // if (this._step) {
    //     if (this.orientation === Scrollable.HORIZONTAL) {
    //         if (this.moveThumb(this._stepPos, 0)) {
    //             this.thumbMoved(this._stepPos, 0)
    //         }
    //     } else {
    //         if (this.moveThumb(0, this._stepPos)) {
    //             this.thumbMoved(0, this._stepPos)
    //         }
    //     }
    // }
    
    this._start = null;
}

Slider.prototype.handleMove = function (mouseData) {
    if (this._start) {
        // let wStep = Math.round(this.width / Math.ceil((this._maximum - this._minimum) / this._step));

        var local = mouseData.data.getLocalPosition(this),
            x = this.thumb.x + local.x - this._start[0] - this.thumb.width / 2,
            // x = this.thumb.x + local.x - this._start[0] - wStep,
            y = this.thumb.y + local.y - this._start[1] - this.thumb.height / 2;

        this.thumbMoved(x, y);
        this._start = [x, y];
    }
};

/**
 * set minimum and update value if necessary
 *
 * @property minimum
 * @type Number
 * @default 0
 */
Object.defineProperty(Slider.prototype, 'minimum', {
    get: function () {
        return this._minimum;
    },
    set: function (minimum) {
        if (!isNaN(minimum) && this.minimum !== minimum && minimum <= this.maximum) {
            this._minimum = minimum;
        }
        if (this._value < this.minimum) {
            this.value = this._value;
        }
    }
});

/**
 * set maximum and update value if necessary
 *
 * @property maximum
 * @type Number
 * @default 100
 */
Object.defineProperty(Slider.prototype, 'maximum', {
    get: function () {
        return this._maximum;
    },
    set: function (maximum) {
        if (!isNaN(maximum) && this.maximum !== maximum && maximum >= this.minimum) {
            this._maximum = maximum;
        }
        if (this._value > this.maximum) {
            this.value = maximum;
        }
    }
});

Object.defineProperty(Slider.prototype, 'enabled', {
    get: function () {
        return this._enabled;
    },
    set: function (is) {
        this._enabled = this.interactive = is;
        if (this.thumb) {
            this.thumb.interactive = is;
        }
        if (is) {
            this.alpha = 1;
        } else {
            this.alpha = 0.5;
        }
    }
});

Object.defineProperty(Slider.prototype, 'step', {
    get: function () {
        return this._step;
    },
    set: function (step) {
        this._step = (step >= 0 && step <= (this._maximum - this._minimum)) ? step : 0;
    }
});