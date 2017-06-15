import Container = PIXI.Container;
import Text = PIXI.Text;
import {MetaKey} from "../core/MetaKey";
import loader = PIXI.loader;
import {Img} from "../const/Img";
import {Scale9Component} from "../component/Scale9Component";
import Sprite = PIXI.Sprite;
import {Style} from "../const/Style";
import {MultiStyleText} from "../component/MultiStyleText";
export class BaseView extends Container {
    constructor(w?: number, h?: number) {
        super();
        
        let baseProps = [];
        let props = [];

        let metaValues = [];
        Object.keys(MetaKey).forEach((key) => {
            metaValues.push(MetaKey[key]);
        });

        for (let prop in this) {
            let meta = Reflect.getMetadata("view", this, prop);
            if (!meta) continue;
            if (Reflect.getPrototypeOf(this).hasOwnProperty(prop)) props.push(prop);
            else baseProps.push(prop);

            switch (meta[MetaKey.Type]) {
                case Sprite:
                    if (meta.hasOwnProperty(MetaKey.Id)) {
                        if (meta.hasOwnProperty(MetaKey.JSon))
                            this[prop] = <any>new Sprite(loader.resources[meta[MetaKey.JSon]].textures[meta[MetaKey.Id]]);
                        else
                            this[prop] = <any>new Sprite(loader.resources[Img.JComponentsName].textures[meta[MetaKey.Id]]);
                    } else if (meta.hasOwnProperty(MetaKey.Src)) {
                        this[prop] = <any>Sprite.fromImage(meta[MetaKey.Src]);
                    } else
                        this[prop] = <any>new Sprite();
                    break;
                case MultiStyleText:
                    let multiStyleText = new MultiStyleText();

                    if (meta.hasOwnProperty(MetaKey.Text)) {
                        multiStyleText.text = meta[MetaKey.Text];
                    }

                    if (meta.hasOwnProperty(MetaKey.Css)) {
                        multiStyleText.style = meta[MetaKey.Css];
                    }

                    this[prop] = <any>multiStyleText;

                    break;
                case Scale9Component:
                    if (meta.hasOwnProperty(MetaKey.NinePatch)) {
                        let ninepatch: any = meta[MetaKey.NinePatch];
                        let jsonTemp: string = Img.JComponentsName;
                        if (meta.hasOwnProperty(MetaKey.JSon))
                            jsonTemp = meta[MetaKey.JSon];
                        this[prop] = <any>new Scale9Component(loader.resources[jsonTemp].textures[ninepatch.id], ninepatch.rect);
                    }
                    break;
                case Text:
                    let style = meta.hasOwnProperty(MetaKey.Css) ? meta[MetaKey.Css] : Style.DefaultText;
                    let text = meta.hasOwnProperty(MetaKey.Text) ? meta[MetaKey.Text] : '';
                    this[prop] = new meta[MetaKey.Type](text, style);
                    break;
                default:
                    if (!meta.hasOwnProperty(MetaKey.Object))
                        this[prop] = new meta[MetaKey.Type];
            }

            for (let metaProp in meta) {
                if (metaValues.indexOf(metaProp) === -1) {
                    this[prop][metaProp] = meta[metaProp];
                }
            }

            for (let prop of baseProps) this.addChild(this[prop]);
            for (let prop of props) this.addChild(this[prop]);
        }
    }
}   