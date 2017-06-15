import Sprite = PIXI.Sprite;
import Text = PIXI.Text;
import {BaseView} from "./BaseView";
import view = require("../core/view");
import {Img} from "../const/Img";
import {Style} from "../const/Style";
import {MultiStyleText} from "../component/MultiStyleText";
import {BtnBase} from "../component/CustomButton";

export class TourView extends BaseView {
    @view({type: Sprite, src: Img.LogoTourHuong})
    logo: Sprite;

    // @view({type: Text, x: 61, y: 65, css: Style.TourViewTime, text: '...'})
    // txtDate: Text;

    txtInfo;

    @view({type: BtnBase, x: 61, y: 225, enable: false})
    btnJoin: BtnBase;
    //
    // @view({type: BtnTourHelp, y: 39})
    // btnHelp: BtnTourHelp;

    // @view({type: Text, x: 60, y: 40, css: Style.TourViewTime})
    // txtLocation: Text;

    public zone: number;

    constructor() {
        super();
        // this.btnHelp.x = this.width - this.btnHelp.width - 15;
        // this.btnJoin.x = (this.width -  this.btnJoin.width)/2;
        this.txtInfo = new MultiStyleText();
        this.txtInfo.text = 'Bạn không có suất thi Hương';
        this.txtInfo.style = Style.TourView;
        this.txtInfo.x = (this.logo.width - this.txtInfo.width) / 2;
        this.txtInfo.y = 163;
        this.addChild(this.txtInfo);
        
        this.btnJoin.label = 'Bốc'
        this.btnJoin.on('click', () => {
            this.btnJoin.enabled = false
            this.btnJoin.label = this.btnJoin.textStyle.fill.toString()
        })
    }
}