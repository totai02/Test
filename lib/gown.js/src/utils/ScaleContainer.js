/**
 * Scale 9 Container.
 * e.g. useful for scalable buttons.
 *
 * @class ScaleContainer
 * @extends PIXI.Container
 * @memberof GOWN
 * @constructor
 */

function ScaleContainer(texture, rect) {
    PIXI.Container.call( this );

    this.rect = rect;
    this.baseTexture = texture.baseTexture;
    this.frame = texture.frame;

    this._width = this.frame.width;
    this._height = this.frame.height;

    // left / middle / right width
    var lw = rect.x;
    var mw = rect.width;
    var rw = this.frame.width - (mw + lw);

    // top / center / bottom height
    var th = rect.y;
    var ch = rect.height;
    var bh = this.frame.height - (ch + th);

    // top
    if (lw > 0 && th > 0) {
        this.tl = this._getTexture(0, 0, lw, th);
        this.addChild(this.tl);
    }
    if (mw > 0 && th > 0) {
        this.tm = this._getTexture(lw, 0, mw, th);
        this.addChild(this.tm);
        this.tm.x = lw;
    }
    if (rw > 0 && th > 0) {
        this.tr = this._getTexture(lw + mw, 0, rw, th);
        this.addChild(this.tr);
    }

    // center
    if (lw > 0 && ch > 0) {
        this.cl = this._getTexture(0, th, lw, ch);
        this.addChild(this.cl);
        this.cl.y = th;
    }
    if (mw > 0 && ch > 0) {
        this.cm = this._getTexture(lw, th, mw, ch);
        this.addChild(this.cm);
        this.cm.y = th;
        this.cm.x = lw;
    }
    if (rw > 0 && ch > 0) {
        this.cr = this._getTexture(lw + mw, th, rw, ch);
        this.addChild(this.cr);
        this.cr.y = th;
    }

    // bottom
    if (lw > 0 && bh > 0) {
        this.bl = this._getTexture(0, th + ch, lw, bh);
        this.addChild(this.bl);
    }
    if (mw > 0 && bh > 0) {
        this.bm = this._getTexture(lw, th + ch, mw, bh);
        this.addChild(this.bm);
        this.bm.x = lw;
    }
    if (rw > 0 && bh > 0) {
        this.br = this._getTexture(lw + mw, th + ch, rw, bh);
        this.addChild(this.br);
    }
}

// constructor
ScaleContainer.prototype = Object.create( PIXI.Container.prototype );
ScaleContainer.prototype.constructor = ScaleContainer;
module.exports = ScaleContainer;

/**
 * set scaling width and height
 *
 * @method _updateScales
 * @private
 */
ScaleContainer.prototype._updateScales = function() {
    this._positionTilable();

    var scaleOriginals = this.scaleOriginals = {};

    var scaleOriginal = function(name, elem) {
        if (elem && elem.width && elem.height) {
            scaleOriginals[name] = {
                width: elem.width,
                height: elem.height
            };
        }
    };

    scaleOriginal('tl', this.tl);
    scaleOriginal('tm', this.tm);
    scaleOriginal('tr', this.tr);

    scaleOriginal('cl', this.cl);
    scaleOriginal('cm', this.cm);
    scaleOriginal('cr', this.cr);

    scaleOriginal('bl', this.bl);
    scaleOriginal('bm', this.bm);
    scaleOriginal('br', this.br);
};

/**
 * create a new texture from a base-texture by given dimensions
 *
 * @method _getTexture
 * @private
 */
ScaleContainer.prototype._getTexture = function(x, y, w, h) {
    var frame = new PIXI.Rectangle(this.frame.x+x, this.frame.y+y, w, h);
    var t = new PIXI.Texture(this.baseTexture, frame, frame.clone(), null);
    let sp = new PIXI.Sprite(t);
    sp.w = w, sp.h = h;
    return sp;
};

/**
 * The width of the container, setting this will redraw the component.
 *
 * @property width
 * @type Number
 */
Object.defineProperty(ScaleContainer.prototype, 'width', {
    get: function() {
        return this._width;
    },
    set: function(value) {
        if (this._width !== value) {
            this._width = value;
            this.invalid = true;
            this._updateScales();
        }
    }
});

/**
 * The height of the container, setting this will redraw the component.
 *
 * @property height
 * @type Number
 */
Object.defineProperty(ScaleContainer.prototype, 'height', {
    get: function() {
        return this._height;
    },
    set: function(value) {
        if (this._height !== value) {
            this._height = value;
            this.invalid = true;
            this._updateScales();
        }
    }
});

/**
 * update before draw call (reposition textures)
 *
 * @method redraw
 */
ScaleContainer.prototype.redraw = function() {
    if (this.invalid) {
        this._positionTilable();
        this.invalid = false;
    }
};

/**
 * recalculate the position of the tiles (every time width/height changes)
 *
 * @method _positionTilable
 * @private
 */
ScaleContainer.prototype._positionTilable = function() {
    // left / middle / right width
    var lw = this.rect.x;
    var mw = this.rect.width;
    var rw = this.frame.width - (mw + lw);

    // top / center / bottom height
    var th = this.rect.y;
    var ch = this.rect.height;
    var bh = this.frame.height - (ch + th);

    var rightX = this._width - rw;
    var bottomY = this._height - bh;
    if (this.cr) {
        this.cr.x = rightX;
    }
    if (this.br) {
        this.br.x = rightX;
        this.br.y = bottomY;
    }
    if (this.tr) {
        this.tr.x = rightX;
    }

    var middleWidth = this._width - (lw + rw);
    var centerHeight = this._height - (th + bh);
    this.cl.h = centerHeight;
    if (this.cm) {
        this.cm.width = middleWidth;
        this.cm.height = centerHeight;
    }
    if (this.bm) {
        this.bm.width = middleWidth;
        this.bm.y = bottomY;
    }
    if (this.tm) {
        this.tm.width = middleWidth;
    }
    if (this.cl) {
        this.cl.height = centerHeight;
    }
    if (this.cr) {
        this.cr.height = centerHeight;
    }

    if (this.bl) {
        this.bl.y = bottomY;
    }
};

/**
 *
 * Helper function that creates a sprite that will contain a texture from the TextureCache based on the frameId
 * The frame ids are created when a Texture packer file has been loaded
 *
 * @method fromFrame
 * @static
 * @param frameId {String} The frame Id of the texture in the cache
 * @param rect {Rectangle} defines tilable area
 * @return {ScaleTexture} A new Scalable Texture (e.g. a button) using a texture from the texture cache matching the frameId
 */
ScaleContainer.fromFrame = function(frameId, rect) {
    var texture = PIXI.utils.TextureCache[frameId];
    if(!texture) {
        throw new Error('The frameId "' + frameId + '" does not exist ' +
                        'in the texture cache');
    }
    return new ScaleContainer(texture, rect);
};

/**
 * add a greenshock Timeline {height: 0}
 * @param d: duration of tween
 * @param delay
 */
ScaleContainer.prototype.timelineHeight = function (duration, delay) {
    new TimelineMax({delay: delay}).from([this.tl, this.tm, this.tr], duration * this.tl.h / this.height, {height: 0})
        .from([this.cl, this.cm, this.cr], duration * this.cl.h / this.height, {height: 0})
        .from([this.bl, this.bm, this.br], duration * this.bl.h / this.height, {height: 0})
}