import {Img} from "../const/Img";
import {SDTheme} from "../core/SDTheme";
import {DomComponent} from "../const/DomComponent";
import {App} from "../const/App";
export class ThemeConfig {
    static CORE: SDTheme;
    private static cb: any;

    static init = (cb) => {
        ThemeConfig.cb = cb;
        ThemeConfig.loadTheme();
        DomComponent.addCss(App.ASSETS_DIR + 'common.css');
    }

    static loadTheme = () => {
        if (ThemeConfig.CORE != undefined) {
            ThemeConfig.removeTheme();
        }
        ThemeConfig.CORE = new SDTheme(Img.JThemePath, ThemeConfig.cb)
    }

    static removeTheme() {
        SDTheme.removeTheme();
    }
}