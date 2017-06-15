import {App} from "./App";
export class Img {
    static readonly JCardName = "cards";
    static readonly JCardPath = App.ASSETS_DIR + "cards.json";
    static JComponentsName = "ts-components";
    static JGifName = "gif";
    static JCompPath = App.ASSETS_DIR + Img.JComponentsName + ".json";
    static JGifPath = App.ASSETS_DIR + Img.JGifName + ".json";
    static JThemeName = "ts-core";
    static JThemePath = App.ASSETS_DIR + Img.JThemeName + ".json";
    static readonly JEmoticonPath = App.ASSETS_DIR + "emoticon.json";
    static PopUpBG = 'popup_bg';
    static PopupTitle = "base-popup-title";
    static HorizontalLine = "horizontal-line";
    static TourSpectator = "TourSpectator";
    static RoomNumberBackground = "room-number-background";
    static readonly PopUpBG_Small = 'popup_bg2'; // 25, 25, 331, 265
    static readonly LogoTourHuong = "tour-huong";
    static readonly Box = "box";
    static readonly ColumnSeparator = "ColumnSeparator"; // 0, 0, 1, 1
}