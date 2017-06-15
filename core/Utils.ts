import {Img} from "../const/Img";
import DisplayObject = PIXI.DisplayObject;
import Rectangle = PIXI.Rectangle;
import Sprite = PIXI.Sprite;
import Container = PIXI.Container;
import Graphics = PIXI.Graphics;
import AnimatedSprite = PIXI.extras.AnimatedSprite;
import Texture = PIXI.Texture;
export class Utils {
    static setUpLowCaseText = (strData: string) => {
        strData = strData.toLowerCase();
        let strArray: Array<string> = strData.split(' ');
        let newArray: Array<string> = [];
        for (let strTemp of strArray) {
            newArray.push(strTemp.charAt(0).toUpperCase() + strTemp.slice(1));
        }
        return newArray.join(' ');
    };

    static getTexture = (n: string, json: string = null, isPixi: boolean = true): Texture => {
        if (isPixi) {
            if (json != null)
                return PIXI.loader.resources[json].textures[n];
            else
                return PIXI.loader.resources[Img.JComponentsName].textures[n];
        } else {
            if (json != null)
                return GOWN.loader.resources[json].textures[n];
            else
                return GOWN.loader.resources[Img.JThemePath].textures[n];
        }
    };
    
    static getGif = (id: string): AnimatedSprite => {
        let frames = []
        let i = 0
        let frame
        while ((frame = PIXI.loader.resources[Img.JGifName].textures[id + '_' + (i < 10 ? '0' + i : i)]) != undefined) {
            frames.push(frame)
            i++
        }
        
        if (frames[0] != undefined) {
            let gif = new AnimatedSprite(frames)
            gif.animationSpeed = 0.15
            gif.play()
            return gif
        } else {
            return undefined
        }
    }
}