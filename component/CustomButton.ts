import {SDButton} from "./SDButton";
import {Utils} from "../core/Utils";
import {Scale9Component} from "./Scale9Component";
import {Img} from "../const/Img";
import Rectangle = PIXI.Rectangle;
import {Style} from "../const/Style";
import Button = GOWN.Button;

class ImgButton {
    static readonly BtnBase = ["btn_up", "btn_hover", "btn_hover", "btn_dis"];
    static readonly BtnClose = ["close_btn_up", "close_btn_up", "close_btn_hover", "close_btn_up"];
    static readonly BtnTabThongBao = ["bg_up", "bg_selected", "bg_hover", "bg_dis"];
    static readonly BtnJoinTour = ["btn-tour", "btn-tour_hover", "btn-tour_hover", "btn-tour_dis"];
    static readonly BtnBoc3d = ["boc3d_up", "boc3d_up", "boc3d_hover", "boc3d_dis"];
}

export class BtnClose extends SDButton {
    constructor() {
        super();
        this.skin = ImgButton.BtnClose;
    }
}

export class BtnBase extends SDButton {
    constructor() {
        super();
        this.skin = ImgButton.BtnBase;
        this.css = Style.BtnBase;

        let stateStyle = {}
        stateStyle[Button.UP] = Style.BtnBase
        stateStyle[Button.DOWN] = Style.BtnBase
        stateStyle[Button.HOVER] = Style.BtnBase
        stateStyle[Button.DISABLE] = Style.BtnBaseDis
        this.csses = stateStyle;
    }
}
export class BtnJoinTour extends SDButton {
    constructor() {
        super();
        this.skin = ImgButton.BtnJoinTour;
        this.css = Style.BtnJoinTour;

        this.css = Style.BtnJoinTour;
        let stateStyle = {}
        stateStyle[Button.UP] = Style.BtnJoinTour.fill
        stateStyle[Button.DOWN] = Style.BtnJoinTourHover.fill
        stateStyle[Button.HOVER] = Style.BtnJoinTourHover.fill
        stateStyle[Button.DISABLE] = Style.BtnJoinTourDis.fill
        this.csses = stateStyle;
    }
}

export class BtnBoc3d extends SDButton {
    constructor() {
        super();
        this.skin = ImgButton.BtnBoc3d;
        this.css = Style.BtnBoc3d;

        let stateStyle = {}
        stateStyle[Button.UP] = Style.BtnBoc3d
        stateStyle[Button.DOWN] = Style.BtnBoc3d
        stateStyle[Button.HOVER] = Style.BtnBoc3d
        stateStyle[Button.DISABLE] = Style.BtnBoc3dDis
        this.csses = stateStyle;
    }

    updateLabelDimensions = () => {
        if (this.labelText && this.labelText.text &&
            (this.worldWidth - this.labelText.width) >= 0 &&
            (this.worldHeight - this.labelText.height) >= 0) {
            this.labelText.x = Math.floor((this.worldWidth - this.labelText.width) / 2);
            this.labelText.y = Math.floor((this.worldHeight - this.labelText.height) / 2) - 4;
        }
    };
}

export class ThiDinhInfoBoardSprite extends SDButton {
    constructor() {
        super();
        let state = [];
        for (let img of ImgButton.BtnTabThongBao) {
            state.push(() => {
                let scale9comp = new Scale9Component(Utils.getTexture(img, Img.JThemePath),
                    new Rectangle(30, 30, 183, 23));

                return scale9comp;
            })
        }
        this.skin = state;
        this.width = 155;
        this.height = 216;

        this.css = Style.BtnTabThongBao;
    }
}