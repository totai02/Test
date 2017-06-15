import $ = require('jquery');
import WebFont = require("webfontloader");
export class DomComponent {
    static get tagCanvas() {
        return $('canvas');
    }

    /** @return Object */
    static get canvasSize() {
        return {
            width: this.tagCanvas.width(),
            height: this.tagCanvas.height()
        };
    }

    static addCss(url: string) {
        let font: Array<string> = [url];
        WebFont.load({
            custom: {urls: font}
        });
    }
}