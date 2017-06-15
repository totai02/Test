import {BasePopup} from "./BasePopup";
import {Img} from "../const/Img";
import {Scale9Component} from "../component/Scale9Component";
import view = require("../core/view");
import Rectangle = PIXI.Rectangle;
export class TinhDiemView extends BasePopup {
    @view({
        type: Scale9Component,
        ninepatch: {id: Img.Box, rect: new Rectangle(27, 47, 356, 242)},
        width: 599,
        height: 345,
        x: 20,
        y: 58
    })
    bgBangDiem: Scale9Component;

    constructor() {
        super("Bảng Tổng Kết", 643, 421)
    }
}