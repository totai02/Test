import Button = GOWN.Button;
import {ThemeConfig} from "../config/ThemeConfig";
import {Img} from "../const/Img";
import ITextStyleStyle = PIXI.ITextStyleStyle;
import Theme = GOWN.Theme;
export class SDButton extends Button {
    static stateNames: Array<string> = [Button.UP, Button.DOWN, Button.HOVER, Button.DISABLE];
    private static skinDefault: Array<string> = ["btn_up", "btn_hover", "btn_hover", "btn_dis"];

    textStyles

    constructor() {
        super(ThemeConfig.CORE, Button.SKIN_NAME);
    }

    public set css(style: ITextStyleStyle|Object) {
        this.textStyle = style;
    }

    public set csses(styles) {
        this.textStyles = styles;
    }

    public set skin(state: Array<string>) {
        this.removeChildren();
        let path: string;
        for (let key in  SDButton.stateNames) {
            if (key in state) {
                if (typeof (state[key]) === 'function') {
                    ThemeConfig.CORE.setSkin(Button.SKIN_NAME, SDButton.stateNames[key], state[key]);
                }
                else {
                    if (typeof (state[key]) === 'string') {
                        ThemeConfig.CORE.setSkin(Button.SKIN_NAME, SDButton.stateNames[key], ThemeConfig.CORE.getImage(state[key]));
                        path = state[0];
                    }
                    else if (key in SDButton.skinDefault) {
                        ThemeConfig.CORE.setSkin(Button.SKIN_NAME, SDButton.stateNames[key], ThemeConfig.CORE.getImage(SDButton.skinDefault[key]));
                        path = SDButton.skinDefault[0];
                    }

                    let texture = GOWN.loader.resources[Img.JThemePath].textures[path];
                    this.width = texture ? texture.width : 0;
                    this.height = texture ? texture.height : 0;
                }
            }
        }

        this.preloadSkins();
        this.invalidState = true;
    }

    setStateStyle(state: string) {
        this.currentState = state;
        if (this.textStyle)
            this.label = this.textStyle.fill.toString()
        if (this.textStyles)
            this.textStyle = this.textStyles[state];
    }
    
    get enabled(): boolean {
        return this._enabled
    }

    set enabled(is: boolean) {
        this._enabled = this.interactive = is;

        if (is) {
            if (this.currentState == Button.DISABLE)
                this.setStateStyle(Button.UP)
        } else {
            this.setStateStyle(Button.DISABLE)
        }

        this.updateLabel = true;
    }

    handleEvent(type: string) {
        let strongPress = 2;

        if (!this.enabled) {
            this.setStateStyle(Button.DISABLE)
        } else {
            if (type === Button.DOWN) {
                this.setStateStyle(Button.DOWN)
                this._pressed = true;
                if (this.skinName === 'button')
                    this.y += strongPress;
            } else if (type === Button.UP) {
                this._pressed = false;
                if (this._over && this.theme.hoverSkin) {
                    this.setStateStyle(Button.HOVER)
                } else {
                    this.setStateStyle(Button.UP)
                }
            } else if (type === Button.HOVER) {
                this._over = true;
                if (this._pressed) {
                    this.setStateStyle(Button.HOVER)
                    this._pressed = false;
                } else if (this.theme.hoverSkin) {
                    this.setStateStyle(Button.HOVER)
                }

            } else {
                if (this._over) {
                    this._over = false;
                }
                this.setStateStyle(Button.UP)
            }
        }
        if (this.skinName === 'button') {
            if (this.prevState == Button.DOWN)
                this.y -= strongPress;
            this.prevState = this.currentState;
        }
    }
}