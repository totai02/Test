import Container = PIXI.Container;
import Rectangle = PIXI.Rectangle;
import Texture = PIXI.Texture;
import Sprite = PIXI.Sprite;

/**
 * See class Img for specific image rectangle parameters
 */
export class Scale9Component extends Container {
    private frame;
    private rect: Rectangle;
    private _width: number;
    private _height: number;
    private invalid: boolean;
    private baseTexture;
    private tl: Sprite;
    private tm: Sprite;
    private tr: Sprite;
    private cl: Sprite;
    private cm: Sprite;
    private cr: Sprite;
    private bl: Sprite;
    private bm: Sprite;
    private br: Sprite;
    private scaleOriginals: Object;
    
    constructor(texture: Texture, rect: Rectangle) {
        super();
        this.rect = rect;
        this.baseTexture = texture.baseTexture;
        this.frame = texture.frame;

        this._width = this.frame.width;
        this._height = this.frame.height;

        // left / middle / right width
        let lw = rect.x;
        let mw = rect.width;
        let rw = this.frame.width - (mw + lw);

        // top / center / bottom height
        let th = rect.y;
        let ch = rect.height;
        let bh = this.frame.height - (ch + th);

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
            this.tr.x = lw + mw;
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
            this.cr.x = lw + mw;
            this.cr.y = th;
        }

        // bottom
        if (lw > 0 && bh > 0) {
            this.bl = this._getTexture(0, th + ch, lw, bh);
            this.addChild(this.bl);
            this.bl.y = th + ch;
        }
        if (mw > 0 && bh > 0) {
            this.bm = this._getTexture(lw, th + ch, mw, bh);
            this.addChild(this.bm);
            this.bm.x = lw;
            this.bm.y = th + ch;
        }
        if (rw > 0 && bh > 0) {
            this.br = this._getTexture(lw + mw, th + ch, rw, bh);
            this.addChild(this.br);
            this.br.x = lw + mw;
            this.br.y = th + ch;
        }
    }

    _getTexture = (x, y, w, h) => {
        let frame = new PIXI.Rectangle(this.frame.x + x, this.frame.y + y, w, h);
        let t = new PIXI.Texture(this.baseTexture, frame, frame.clone(), null);
        return new PIXI.Sprite(t);
    };

    set width(value) {
        if (this._width !== value) {
            this._width = value;
            this.invalid = true;
            this._updateScales();
        }
        this.redraw();
    }

    get width() {
        return this._width;
    }

    set height(value) {
        if (this._height !== value) {
            this._height = value;
            this.invalid = true;
            this._updateScales();
        }
        this.redraw();
    }

    get height() {
        return this._height;
    }

    _positionTilable = () => {
        // left / middle / right width
        let lw = this.rect.x;
        let mw = this.rect.width;
        let rw = this.frame.width - (mw + lw);

        // top / center / bottom height
        let th = this.rect.y;
        let ch = this.rect.height;
        let bh = this.frame.height - (ch + th);

        let rightX = this._width - rw;
        let bottomY = this._height - bh;
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

        let middleWidth = this._width - (lw + rw);
        let centerHeight = this._height - (th + bh);

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

    _updateScales = () => {
        this._positionTilable();

        let scaleOriginals = this.scaleOriginals = {};

        let scaleOriginal = function (name, elem) {
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

    redraw = () => {
        if (this.invalid) {
            this._positionTilable();
            this.invalid = false;
        }
    };
}