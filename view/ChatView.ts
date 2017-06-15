import {BaseView} from "./BaseView";
import DisplayObject = PIXI.DisplayObject;
import Text = PIXI.Text;
import TextStyle = PIXI.TextStyle;
import Graphics = PIXI.Graphics;
import Container = PIXI.Container;
import {Img} from "../const/Img";
import AnimatedSprite = PIXI.extras.AnimatedSprite;
import {Utils} from "../core/Utils";
import view = require("../core/view");
import {SDScrollPane} from "../component/SDScrollPane";
import TextInput = GOWN.TextInput;
import {SDTextInput} from "../component/SDTextInput";
export class ChatView extends BaseView {
    constructor() {
        super()
        
        let graphic = new Graphics()
        graphic.beginFill(0xff0000)
        graphic.drawRect(0, 0, 200, 150)
        graphic.endFill()
        this.addChild(graphic)

        let uname = 'quyetdx: ',
            message = 'Hà Nội m:-SSùa này v;;)ắng những cơn mưa :-SS. Cái rét đầu đông ~O)',
            mod = 'mod20'

        let name = new Text(uname, new TextStyle({
            fill: '#7AC0DF'
        }))
        graphic.addChild(name)

        let lastLineX = name.width
        let lastLineY = name.y

        let jEmoticon: Array<any>;
        let loadJSON = (file: string, callback: Function) => {
            let xobj: XMLHttpRequest = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', file, true);
            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == 200) {
                    callback(xobj.responseText);
                }
            };
            xobj.send(null);
        }

        loadJSON(Img.JEmoticonPath, (text) => {
            jEmoticon = JSON.parse(text)

            // add message
            let chars = [message]
            let emoticons = []
            /**
             * split text & emoticon
             * Note: should process only in this loop
             */
            let count: number = 0;
            for (let i = 0; i < jEmoticon.length && count < 3; i++) {
                for (let j = 0; j < jEmoticon[i].keys.length && count < 3; j++) {
                    for (let k = 0; k < chars.length; k++) {
                        if (chars[k].indexOf(jEmoticon[i].keys[j]) > -1) {
                            let resultTxts = chars[k].split(jEmoticon[i].keys[j])
                            chars.splice(k, 1, ...resultTxts)

                            for (let l = 1; l < resultTxts.length; l++) {
                                emoticons.splice(k, 0, jEmoticon[i].id)
                            }
                            count += resultTxts.length - 1
                        }
                    }
                }
            }

            for (let i = 0; i < chars.length; i++) {
                // add char
                let partIdx = 0
                let txtParts = chars[i].split(' ')
                let part = txtParts[partIdx]
                let txt = new Text(part)
                let lineHeight = txt.height
                let oldPart = part
                while (partIdx < txtParts.length) {
                    if (txt.width + lastLineX < graphic.width) {
                        partIdx++
                        if (partIdx < txtParts.length) {
                            oldPart = part

                            part += ' ' + txtParts[partIdx]
                            txt.text = part
                        } else {
                            graphic.addChild(txt)
                            txt.x = lastLineX
                            txt.y = lastLineY

                            lastLineX += txt.width

                            if (txt.height > lineHeight) {
                                lineHeight = txt.height
                            }
                        }
                    } else {
                        txt.text = oldPart
                        // check if msg is still wider than allowed width
                        if (graphic.width < txt.width + lastLineX) {
                            let lastCharIdx = oldPart.length - 1
                            part = oldPart.substr(0, lastCharIdx)
                            txt.text = part
                            while (graphic.width < txt.width + lastLineX) {
                                lastCharIdx--
                                part = oldPart.substr(0, lastCharIdx)
                                txt.text = part
                            }
                            // Note: maybe part == '' (for e.g: name width is nearly equal graphic width or oldMsg come after an emoticon
                            // part here will be the remain text of oldPart
                            part = oldPart.substr(lastCharIdx)
                        } else {
                            part = txtParts[partIdx]
                        }

                        graphic.addChild(txt)
                        txt.x = lastLineX
                        txt.y = lastLineY

                        if (txt.height > lineHeight) {
                            lineHeight = txt.height
                        }

                        lastLineX = 0
                        lastLineY += lineHeight
                        txt = new Text(part)
                        lineHeight = txt.height
                        oldPart = part
                    }
                }

                if (i < emoticons.length) {
                    // add emoticon

                    let emoticon = Utils.getGif(emoticons[i].toString())
                    if (graphic.width < lastLineX + emoticon.width) {
                        lastLineX = 0
                        lastLineY = lastLineY + lineHeight
                    }
                    emoticon.x = lastLineX
                    emoticon.y = lastLineY + (lineHeight - emoticon.height) / 2

                    lastLineX += emoticon.width

                    graphic.addChild(emoticon)
                }
            }
        })
    }
}