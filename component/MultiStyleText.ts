export interface ExtendedTextStyle extends PIXI.TextStyle {
    valign?: "top" | "middle" | "bottom";
}

export interface TextStyleSet {
    [key: string]: ExtendedTextStyle;
}

interface FontProperties {
    ascent: number;
    descent: number;
    fontSize: number;
}

interface TextData {
    text: string;
    style: ExtendedTextStyle;
    width: number;
    height: number;
    fontProperties: FontProperties;
}

// Lazy fill for Object.assign
function assign(destination: any, ...sources: any[]): any {
    for (let source of sources) {
        for (let key in source) {
            destination[key] = source[key];
        }

        /**
         * workaround for non-enumerable properties in styles (which emerged when created PIXI.TextStyle) 
         */
        for (let key in source) {
            if (key.charAt(0) == '_') {
                destination[key.substr(1)] = source[key];
            } else {
                if (destination.hasOwnProperty('_' + key)) {
                    destination['_' + key] = source[key];
                }
            }
        }
    }

    return destination;
}

export class MultiStyleText extends PIXI.Text {
    private textStyles: TextStyleSet;

    constructor(text?: string, styles?: TextStyleSet) {
        super(text);

        this.style = styles;
    }

    public set style(styles: TextStyleSet|any) {
        this.textStyles = {};

        this.textStyles["default"] = <any>{
            align: "left",
            breakWords: false,
            dropShadow: false,
            dropShadowAngle: Math.PI / 6,
            dropShadowBlur: 0,
            dropShadowColor: "#000000",
            dropShadowDistance: 5,
            fill: "black",
            fillGradientType: PIXI.TEXT_GRADIENT.LINEAR_VERTICAL,
            fontFamily: "Arial",
            fontSize: 26,
            fontStyle: "normal",
            fontVariant: "normal",
            fontWeight: "normal",
            letterSpacing: 0,
            lineHeight: 0,
            lineJoin: "miter",
            miterLimit: 10,
            padding: 0,
            stroke: "black",
            strokeThickness: 0,
            textBaseline: "alphabetic",
            wordWrap: false,
            wordWrapWidth: 100
        };

        for (let style in styles) {
            if (typeof styles[style].dropShadowColor === "number") {
                styles[style].dropShadowColor = PIXI.utils.hex2string(styles[style].dropShadowColor as number);
            }

            if (typeof styles[style].fill === "number") {
                styles[style].fill = PIXI.utils.hex2string(styles[style].fill as number);
            }

            if (typeof styles[style].stroke === "number") {
                styles[style].stroke = PIXI.utils.hex2string(styles[style].stroke as number);
            }

            if (style == "default") {
                assign(this.textStyles['default'], styles[style]);
            } else {
                if (style.charAt(0) == '_') {
                    style = style.substr(1);
                }

                if (this.textStyles['default'].hasOwnProperty(style)) {
                    this.textStyles['default'][style] = styles[style];
                } else {
                    this.textStyles[style] = assign({}, styles[style]);
                }
            }
        }

        this._style = this.textStyles["default"];
        this.dirty = true;
    }

    private _getTextDataPerLine(lines: string[]) {
        let outputTextData: TextData[][] = [];

        let tags = Object.keys(this.textStyles).join("|");
        let re = new RegExp(`<\/?("${tags})>`, "g");

        let styleStack = [assign({}, this.textStyles["default"])];

        // determine the group of word for each line
        for (let i = 0; i < lines.length; i++) {
            let lineTextData: TextData[] = [];

            // find tags inside the string
            let matches: RegExpExecArray[] = [];
            let matchArray: RegExpExecArray;

            while (matchArray = re.exec(lines[i])) {
                matches.push(matchArray);
            }

            // if there is no match, we still need to add the line with the default style
            if (matches.length === 0) {
                lineTextData.push(this.createTextData(lines[i], styleStack[styleStack.length - 1]));
            }
            else {
                // We got a match! add the text with the needed style
                let currentSearchIdx = 0;
                for (let j = 0; j < matches.length; j++) {
                    // if index > 0, it means we have characters before the match,
                    // so we need to add it with the default style
                    if (matches[j].index > currentSearchIdx) {
                        lineTextData.push(this.createTextData(
                            lines[i].substring(currentSearchIdx, matches[j].index),
                            styleStack[styleStack.length - 1]
                        ));
                    }

                    if (matches[j][0][1] === "/") { // reset the style if end of tag
                        if (styleStack.length > 1) {
                            styleStack.pop();
                        }
                    } else { // set the current style
                        styleStack.push(assign({}, styleStack[styleStack.length - 1], this.textStyles[matches[j][1]]));
                    }

                    // update the current search index
                    currentSearchIdx = matches[j].index + matches[j][0].length;
                }

                // is there any character left?
                if (currentSearchIdx < lines[i].length) {
                    lineTextData.push(this.createTextData(
                        lines[i].substring(currentSearchIdx),
                        styleStack[styleStack.length - 1]
                    ));
                }
            }

            outputTextData.push(lineTextData);
        }

        return outputTextData;
    }

    private createTextData(text: string, style: ExtendedTextStyle): TextData {
        return {
            text,
            style,
            width: 0,
            height: 0,
            fontProperties: undefined
        };
    }

    public updateText(): void {
        if (!this.dirty) {
            return;
        }

        this.texture.baseTexture.resolution = this.resolution;
        let textStyles = this.textStyles;
        let outputText = this.text;

        // TODO(bluepichu): Reword word wrapping as breakWord is broken
        // if (this._style.wordWrap) {
        //     outputText = this.wordWrap(this.text);
        // }

        // split text into lines
        let lines = outputText.split(/(?:\r\n|\r|\n)/);

        // get the text data with specific styles
        let outputTextData = this._getTextDataPerLine(lines);

        // calculate text width and height
        let lineWidths: number[] = [];
        let lineHeights: number[] = [];
        let maxLineWidth = 0;

        for (let i = 0; i < outputTextData.length; i++) {
            let lineWidth = 0;
            let lineHeight = 0;
            for (let j = 0; j < outputTextData[i].length; j++) {
                // let sty = outputTextData[i][j].style;

                // save the font properties
                outputTextData[i][j].fontProperties = PIXI.Text.calculateFontProperties(PIXI.Text.getFontStyle(this._style));

                // save the height
                outputTextData[i][j].height = outputTextData[i][j].fontProperties.fontSize
                    + outputTextData[i][j].style.strokeThickness;
                lineHeight = Math.max(lineHeight, outputTextData[i][j].height);

                // Workaround for specific font style make PIXI calculate wrong font properties
                this.context.font = PIXI.Text.getFontStyle(outputTextData[i][j].style);

                // save the width
                if (this._style.wordWrap === true) {
                    let textWidth = this.context.measureText(outputTextData[i][j].text).width;
                    if (textWidth + lineWidth > this._style.wordWrapWidth) {
                        const charNum = Math.floor(this._style.wordWrapWidth / textWidth *
                            outputTextData[i][j].text.length);

                        // get more chars to fill space to have width close to word wrap width
                        let charNeed = Math.floor((this._style.wordWrapWidth - lineWidth) /
                            textWidth * outputTextData[i][j].text.length);
                        let text = outputTextData[i][j].text.substr(0, charNeed);

                        // if the calculated charNeed wrong, update it
                        while (this.context.measureText(text).width + lineWidth >
                                this._style.wordWrapWidth) {
                            charNeed--;
                            text = text.substr(0, charNeed);
                        }

                        // process breakWords if there is char left after wrapping
                        if (charNeed < outputTextData[i][j].text.length) {
                            if (this._style.breakWords === true) {
                                let i = text.lastIndexOf(' ');
                                if (i !== -1) {
                                    text = text.substr(0, i);

                                    charNeed = i + 1; // throw away the space
                                } else {
                                    // if line already had character & we cut @ the middle of a word, don't take any chars
                                    if (j > 0) {
                                        charNeed = 0;
                                        text = text.substr(0, charNeed);
                                    }
                                }
                            }
                        }

                        // put those chars to outputTextData
                        let leftText = outputTextData[i][j].text.substr(charNeed);
                        outputTextData[i][j].text = text;
                        outputTextData[i][j].width = this.context.measureText(
                            outputTextData[i][j].text).width;
                        lineWidth += outputTextData[i][j].width;

                        // put each piece of cut text to outputTextData array
                        let k = j;
                        let oldI = i;
                        while (leftText.length > 0) {
                            lineWidths[i] = lineWidth;
                            lineHeights[i] = lineHeight;
                            if (lineWidth > maxLineWidth) {
                                maxLineWidth = lineWidth;
                            }

                            let copy = <TextData>JSON.parse(JSON.stringify(outputTextData[i][k]));
                            let num = charNum;
                            copy.text = leftText.substr(0, num);

                            while (this.context.measureText(copy.text).width >
                                    this._style.wordWrapWidth) {
                                num--;
                                copy.text = copy.text.substr(0, num);
                            }

                            if (num < leftText.length) {
                                if (this._style.breakWords === true) {
                                    let idx = copy.text.lastIndexOf(' ');
                                    if (idx !== -1) {
                                        num = idx;
                                    }

                                    copy.text = copy.text.substr(0, num);
                                    num++;
                                }
                            }

                            lineWidth = copy.width = this.context.measureText(copy.text).width;
                            let array = [];
                            array.push(copy);
                            i++;
                            outputTextData.splice(i, 0, array);

                            lineWidths[i] = lineWidth;
                            lineHeights[i] = lineHeight;
                            if (lineWidth > maxLineWidth) {
                                maxLineWidth = copy.width;
                            }
                            k = 0;

                            leftText = leftText.substr(num);
                        }

                        j++;
                        if (j < outputTextData[oldI].length) {
                            outputTextData[i].splice(1, 0, ...outputTextData[oldI].splice(j));
                            j = 0;
                        } else {
                            lineWidths.pop();
                            lineHeights.pop();
                        }
                    } else {
                        outputTextData[i][j].width = textWidth;
                        lineWidth += outputTextData[i][j].width;
                    }
                } else {
                    outputTextData[i][j].width = this.context.measureText(
                        outputTextData[i][j].text).width;
                    lineWidth += outputTextData[i][j].width;
                }
            }

            lineWidths[i] = lineWidth;
            lineHeights[i] = lineHeight;
            maxLineWidth = Math.max(maxLineWidth, lineWidth);
        }

        // transform styles in array
        let stylesArray = Object.keys(textStyles).map((key) => textStyles[key]);

        let maxStrokeThickness = stylesArray.reduce(
            (prev, curr) => Math.max(prev, curr.strokeThickness || 0),
            0);

        let maxDropShadowDistance = stylesArray.reduce(
            (prev, curr) => Math.max(prev, curr.dropShadow ? (curr.dropShadowDistance || 0) : 0),
            0);

        let maxLineHeight = lineHeights.reduce((prev, curr) => Math.max(prev, curr), 0);

        // define the right width and height
        let width = maxLineWidth + maxStrokeThickness + maxDropShadowDistance;
        let height = (maxLineHeight * outputTextData.length) + maxDropShadowDistance + this._style.padding;

        if (this._style.lineSpacing != undefined && this._style.lineSpacing !== 0) {
            height += this._style.lineSpacing * (outputTextData.length - 1);
            for (let i = 1; i < lineHeights.length; i++) {
                lineHeights[i] += this._style.lineSpacing;
            }
        }

        this.canvas.width = (width + this.context.lineWidth) * this.resolution;
        this.canvas.height = height * this.resolution;

        this.context.scale(this.resolution, this.resolution);

        this.context.textBaseline = "alphabetic";
        this.context.lineJoin = "round";

        // Draw the text
        for (let i = 0; i < outputTextData.length; i++) {
            let line = outputTextData[i];
            let linePositionX = 0;

            for (let j = 0; j < line.length; j++) {
                let textStyle = line[j].style;
                let text = line[j].text;
                let fontProperties = line[j].fontProperties;

                this.context.font = PIXI.Text.getFontStyle(textStyle);
                this.context.strokeStyle = <string>textStyle.stroke;
                this.context.lineWidth = textStyle.strokeThickness;

                linePositionX += maxStrokeThickness / 2;
                let linePositionY = (maxStrokeThickness / 2 + i * lineHeights[i]) + fontProperties.ascent;

                if (this._style.align === "right") {
                    linePositionX += maxLineWidth - lineWidths[i];
                }
                else if (this._style.align === "center" && (linePositionX === 0 || maxStrokeThickness !== 0)) {
                    linePositionX += (maxLineWidth - lineWidths[i]) / 2;
                }

                if (textStyle.valign === "bottom") {
                    linePositionY += lineHeights[i] - line[j].height -
                        (maxStrokeThickness - textStyle.strokeThickness) / 2;
                } else if (textStyle.valign === "middle") {
                    linePositionY += (lineHeights[i] - line[j].height) / 2 -
                        (maxStrokeThickness - textStyle.strokeThickness) / 2;
                }

                // draw shadow
                if (textStyle.dropShadow) {
                    this.context.fillStyle = <string>textStyle.dropShadowColor;

                    let xShadowOffset = Math.sin(textStyle.dropShadowAngle) * textStyle.dropShadowDistance;
                    let yShadowOffset = Math.cos(textStyle.dropShadowAngle) * textStyle.dropShadowDistance;

                    if (textStyle.fill) {
                        this.context.fillText(text, linePositionX + xShadowOffset, linePositionY + yShadowOffset);
                    }
                }

                // set canvas text styles
                this.context.fillStyle = <string>textStyle.fill;

                // draw lines
                if (textStyle.stroke && textStyle.strokeThickness) {
                    this.context.strokeText(text, linePositionX, linePositionY);
                }

                if (textStyle.fill) {
                    this.context.fillText(text, linePositionX, linePositionY);
                }

                // set Position X to the line width
                // remove the strokeThickness otherwise the text will be to far from the previous group
                linePositionX += line[j].width;
                linePositionX -= maxStrokeThickness / 2;
            }
        }

        this.updateTexture();
    }
}
