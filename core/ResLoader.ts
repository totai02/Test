import WebFont = require("webfontloader");
import {Img} from "../const/Img";
import {Style} from "../const/Style";
import {App} from "../const/App";
import {ThemeConfig} from "../config/ThemeConfig";
import loader = PIXI.loader;
export class ResLoader {
    private static readonly fontConfig = [
        {
            custom: {
                families: [Style.Roboto, Style.RobotoBold],
                urls: [App.ASSETS_DIR + 'Roboto.css']
            }
        }
        , {
            custom: {
                families: [Style.AvoBold],
                urls: [App.ASSETS_DIR + 'UtmAvo.css']
            }
        }
        , {
            custom: {
                families: [Style.UVNButLong2],
                urls: [App.ASSETS_DIR + 'UvnButLong2.css']
            }
        }
    ];

    static cb: Function = null;

    public static init(cb: any): void {
        ResLoader.cb = cb
        ResLoader.fontConfig.forEach(font => WebFont.load(font))
        loader.add(Img.JComponentsName, Img.JCompPath);
        loader.add(Img.JCardName, Img.JCardPath);
        loader.add(Img.JGifName, Img.JGifPath);
        loader.load(this.loadTheme)
    }

    static loadTheme = () => {
        ThemeConfig.init(ResLoader.cb);
    }
}