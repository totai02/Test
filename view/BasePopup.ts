import Rectangle = PIXI.Rectangle;
import {Img} from "../const/Img";
import {BaseView} from "./BaseView";
import {Scale9Component} from "../component/Scale9Component";
import {Style} from "../const/Style";
import view = require("../core/view");
import Sprite = PIXI.Sprite;
import Text = PIXI.Text;
import {Utils} from "../core/Utils";
import {BtnClose} from "../component/CustomButton";
export class BasePopup extends BaseView {
    @view({
        type: Scale9Component,
        ninepatch: {id: Img.PopUpBG, rect: new Rectangle(116, 116, 422, 135)}
    })
    bg: Scale9Component;
    @view({type: Sprite, y: -24, id: Img.PopupTitle})
    titleBg: Sprite;
    @view({type: Text, y: -13, css: Style.TitlePopupText})
    title: Text;
    @view({type: BtnClose, y: -9, z: 1})
    btnClose: BtnClose;

    constructor(title: string = '', w: number = 656, h: number = 463, isShowBGInside: boolean = true) {
        super(w, h);
        
        this.bg.width = w;
        this.bg.height = h;

        this.title.text = title != '' ? Utils.setUpLowCaseText(title) : '';
        
        this.positionElement()
    }

    // calculate title & btnClose position base on background width
    positionElement() {
        this.titleBg.x = this.bg.width / 2;
        this.titleBg.anchor.x = 0.5;
        this.title.x = this.titleBg.x
        this.title.anchor.x = this.titleBg.anchor.x

        this.btnClose.x = this.bg.width - this.btnClose.width + 19;
    }
}