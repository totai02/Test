import {BaseView} from "./BaseView";
import {Img} from "../const/Img";
import {Style} from "../const/Style";
import {Scale9Component} from "../component/Scale9Component";
import view = require("../core/view");
import Sprite = PIXI.Sprite;
import Text = PIXI.Text;
import Rectangle = PIXI.Rectangle;
import {ThiDinhInfoBoardSprite, BtnBase} from "../component/CustomButton";
import {MultiStyleText} from "../component/MultiStyleText";
export class ThiDinhRoomInfoView extends BaseView {
    @view({type: ThiDinhInfoBoardSprite})
    background: ThiDinhInfoBoardSprite
    @view({type: Scale9Component, ninepatch: {
        id: Img.PopUpBG_Small
        , rect: new Rectangle(25, 25, 331, 265)
    }, x: 13, y: 13})
    contentBg: Scale9Component;
    @view({type: Sprite, id: Img.RoomNumberBackground, x: 10, y: 10})
    roomNumberBg: Sprite
    @view({type: Text, text: 'Phòng thi ', style: Style.ThiDinhRoomNumber})
    roomNo: Text
    @view({type: Sprite, id: Img.HorizontalLine})
    horizontalLine: Sprite
    @view({type: Text, text: '', css: Style.ThiDinhRoomPlayer})
    playerList: Text
    @view({type: Sprite, id: Img.TourSpectator})
    tourSpectator: Sprite
    @view({type: MultiStyleText, text: '<count>25</count> người đang xem', css: Style.TourSpectator})
    tourSpectatorCount: MultiStyleText
    @view({type: BtnBase})
    nutChauRia: BtnBase

    constructor(roomNo: number, playerList: string[]) {
        super()
        
        this.roomNo.text += roomNo
        if (playerList.length > 0) {
            this.playerList.text = playerList[0]
            for (let i = 1; i < playerList.length; i++) {
                this.playerList.text += '\n' + playerList[i]
            }
        }
        
        this.contentBg.width = 129
        this.contentBg.height = 132

        this.roomNumberBg.alpha = 0.5

        this.roomNo.anchor.set(0.5, 0.5)
        this.roomNo.x = this.roomNumberBg.x + this.roomNumberBg.width / 2
        this.roomNo.y = this.roomNumberBg.y + this.roomNumberBg.height / 2
        
        this.horizontalLine.x = this.contentBg.x + (this.contentBg.width - this.horizontalLine.width) / 2
        this.horizontalLine.y = this.roomNumberBg.y + this.roomNumberBg.height
        
        this.playerList.anchor.set(0.5, 0.5)
        this.playerList.x = this.horizontalLine.x + this.horizontalLine.width / 2
        this.playerList.y = this.contentBg.y + (this.contentBg.height + this.roomNumberBg.height + this.horizontalLine.height) / 2
        
        this.tourSpectator.position.x = this.contentBg.x + 2
        this.tourSpectator.position.y = this.contentBg.y + this.contentBg.height + 5
        
        this.tourSpectatorCount.position.x = this.tourSpectator.x + this.tourSpectator.width + 6
        this.tourSpectatorCount.position.y = this.tourSpectator.y + 2

        this.nutChauRia.label = 'Chầu Rìa'
        this.nutChauRia.width = 88
        this.nutChauRia.height = 33
        this.nutChauRia.x = this.contentBg.x + (this.contentBg.width - this.nutChauRia.width) / 2
        this.nutChauRia.y = this.tourSpectator.y + this.tourSpectator.height + 4
    }
}