import $ = require('jquery');
import {Utils} from "../core/Utils";
import {Html} from "../const/Html";
import {DomComponent} from "../const/DomComponent";
import {App} from "../const/App";
import {Img} from "../const/Img";
import Texture = PIXI.Texture;
export class DomBasePopup {
    private title: string;
    private _w: number;
    private _h: number;
    private xPopup: number;
    private yPopup: number;

    constructor(title: string = '', w: number = 658, h: number = 399, isShowBGInside: boolean = true) {
        this.title = Utils.setUpLowCaseText(title);
        this._w = w;
        this._h = h;
    }

    static get tagGameContainer() {
        return $('body');
    }

    private appendPopup() {
        // if (this.isShowBGInside) {
        //     DomBasePopup.tagGameContainer.append('<div id="bg-base-popup"></div>');
        // }

        DomBasePopup.tagGameContainer.append(Html.basePopup).css({
            width: DomComponent.canvasSize.width,
            height: DomComponent.canvasSize.height
        });
        DomBasePopup.tagBasePopup.css({
            width: this._w,
            height: this._h,
        })
    }

    static get tagBgBasePopup() {
        return $('#bg-base-popup');
    }

    setSize = () => {
        DomBasePopup.tagBgBasePopup.css({
            width: DomComponent.canvasSize.width,
            height: DomComponent.canvasSize.height
        });

        this.xPopup = Math.floor((DomComponent.canvasSize.width - this._w) / 2);
        this.yPopup = Math.floor((DomComponent.canvasSize.height - this._h) / 2);
        DomBasePopup.tagBasePopup
            .css({
                left: this.xPopup,
                top: this.yPopup,
                transform: `scale(${App.Scale})`
            })
    };

    active() {
        if (!DomBasePopup.tagBasePopup.hasClass('base-popup')) {
            this.appendPopup();
            this.setSize();
            let title = DomBasePopup.tagBasePopup.find('#popup-title')
            title.html(this.title);
            let titleWidth = title.text().length * parseInt(title.css('fontSize'))
            let PopupTitleWidth = Utils.getTexture(Img.PopupTitle).width
            title.css({
                width: (titleWidth < PopupTitleWidth ? PopupTitleWidth : titleWidth) + 'px',
                'line-height': title.css('height')
            })
            document.addEventListener('fullscreenchange', this.setSize);
            document.addEventListener('webkitfullscreenchange', this.setSize);

            DomBasePopup.tagBasePopup
                .css({top: -this._h})
                .animate({top: this.yPopup + 50}, 'fast', () => {
                    DomBasePopup.tagBasePopup.animate({top: this.yPopup}, 'fast');
                });
        }
    }

    appendContent = (html: string) => {
        DomBasePopup.tagBasePopup.find('#popup-content').html(html);
    };

    static get tagBasePopup() {
        return $('#base-popup');
    }
}