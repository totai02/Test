/// <reference path="pixijs.d.ts" />

declare module GOWN {
    import Container = PIXI.Container;
    import Graphics = PIXI.Graphics;
    import Sprite = PIXI.Sprite;
    import DisplayObject = PIXI.DisplayObject;
    import Point = PIXI.Point;
    import Text = PIXI.Text;
    import TextStyle = PIXI.TextStyle;
    import ITextureDictionary = PIXI.loaders.ITextureDictionary;
    import ITextStyleStyle = PIXI.ITextStyleStyle;
    import Texture = PIXI.Texture;
    import EventEmitter = PIXI.utils.EventEmitter;

    export var loader: PIXI.loaders.Loader;

    export class Control extends Container {
        redraw(): void;

        theme: Theme;
        tap: Function;
        click: Function;
    }

    export class Skinable extends Control {
        constructor(theme)

        controlSetTheme: void;
        skinCache: Object;

        getSkin(comp, state): any;

        setTheme(theme: Theme): void

        changeSkin(skin: DisplayObject): void

        preloadSkins(): void

        fromSkin(name, callback): void

        skinName: string;
        invalidState: boolean;
    }

    export class ScaleContainer extends Container {
        constructor(texture, rect);

        width: number;
        height: number;

        redraw(): void;
    }

    export class InputWrapper {
        static hiddenInput;

        static createInput(): any;

        static textProp: string;

        static focus(): void;

        static blur(): void;

        static setSelection(start: number, end: number): void;

        static getSelection(): Array<number>;

        static getText(): string;

        static setText(text: string): void;

        static setMaxLength(length: number): void;

        static setType(type: string): void;

        static getType(): string;
    }

    export class CheckBox extends Skinable {
        constructor(preselected, theme, skinName?);

        static SKIN_NAME: string;
        static UP: string;
        static DOWN: string;
        static HOVER: string;
        static DISABLE: string;
        static SELECTED_UP: string;
        static SELECTED_DOWN: string;
        static SELECTED_HOVER: string;
        static SELECTED_DISABLE: string;
        static OUT: string;

        mousedown(): void;

        mouseup(): void;

        mousemove(): void;

        mouseover(): void;

        mouseout(): void;

        currentState: string;

        selected: boolean;

        toggleSelected(): void;

        handleEvent(type): void;
    }

    export class Radio extends ToggleButton {
        constructor(theme, skinName?);

        _selected: boolean;

        static SKIN_NAME: string;
        static UP: string;
        static DOWN: string;
        static HOVER: string;
        static SELECTED_UP: string;
        static SELECTED_DOWN: string;
        static SELECTED_HOVER: string;

        toggleGroup: any;
    }

    export class InputControl extends Skinable {
        constructor(text, theme);

        static currentInput: any;

        cursor: PIXI.Text;
        pixiText: PIXI.Text;

        onKeyUp(): void;

        onKeyDown(e: any): void;

        clickPos(): number;

        posToCoord(): number;

        textWidth(): any;

        focus(): void;

        hasFocus: boolean;

        onMouseUpOutside(): void;

        onfocus(): void;

        blur(): void;

        onblur(): void;
    }

    export class TextAreaControl extends Skinable {
        constructor(theme);

        static UP: string;
        static DOWN: string;
        static HOVER: string;
        static OUT: string;
        static stateNames: Array<string>;

        onKeyDown(eventData): void;
        onKeyUp(eventData):void;

        moveCursorLeft(): void;

        moveCursorRight(): void;

        insertChar(char): void;

        deleteSelection(): void;

        deleteText(fromPos, toPos): string;

        setTheme(theme): void;

        setText(text): void;

        text: string;
        maxChars: string;
        value: string;

        updateSelection(start, end): boolean;

        textWidth(text): void;

        focus(): void;

        onMouseUpOutside(): void;

        onfocus(): void;

        blur(): void;

        setCursorPos(): void;

        lineHeight(): number;

        drawCursor(): void;

        onMove(e): boolean;

        onDown(e): boolean;

        onUp(e): boolean;

        textToPixelPos(textPos, position): Point;

        pixelToTextPos(pixelPos): number;

        onblur(): void;

        hasFocus: boolean;
        style: ITextStyleStyle;
        currentState: string;
    }

    export class LayoutGroup extends Control {
        constructor();

        layout: VerticalLayout;
        gap: number;
    }
    export class HorizontalLayout extends LayoutAlignment {
        constructor();
    }
    export class Scrollable extends Skinable {
    }
    export class ScrollArea extends Control {
        constructor(content?, addListener?, scrolldelta?, bar?)

        redraw();

        mask: Graphics;

        _useMask: boolean;

        scrolldirection: string;
    }
    export class ScrollBar extends Scrollable {
        constructor(scrollArea, thumb?, theme?, skinName?)

        static SKIN_NAME: string;

        thumbMoved(x: number, y: number);

        moveThumb(x: number, y: number);

        redraw();

        maxHeight(): number;

        thumb: ScrollThumb;

        invalidTrack;

        scrollArea;

        orientation;

        scrollableredraw(any);
        timelineHeight(duration: number, delay: number);
    }
    export class ScrollThumb extends Button {
    }
    export class Slider extends Scrollable {
        constructor(thumb, theme, skinName?)

        static SKIN_NAME: string;

        thumbMoved(): void;

        pixelToValue(): number;

        valueToPixel(): number;

        change: Function;
        enabled: boolean;
        value: number;
        minimum: number;
        maximum: number;
        step: number;
    }

    export class ToggleGroup implements EventEmitter {
        eventNames(): string[];
        off(event: string, fn: Function, context?: any, once?: boolean): EventEmitter;
        constructor();

        addListener(event: string, listener: Function): EventEmitter;

        on(event: string, listener: Function): EventEmitter;

        once(event: string, listener: Function): EventEmitter;

        removeListener(event: string, listener: Function): EventEmitter;

        removeAllListeners(event?: string): EventEmitter;

        setMaxListeners(n: number): void;

        listeners(event: string): Function[];

        emit(event: string, ...args: any[]): boolean;

        static CHANGE: string;

        addItem(item): void;

        _toggleChanged(item): void;

        removeItem(item): void;

        destroy(): void;

        selectedItem: any;
        selectedIndex: any;
        isSelectionRequired: any;

        _items: Array<Sprite>;

    }

    export class ToggleButton extends Button {
        constructor(theme, skinName?)

        static CHANGE: string;
        static SKIN_NAME: string;
        static UP: string;
        static DOWN: string;
        static HOVER: string;
        static SELECTED_UP: string;
        static SELECTED_DOWN: string;
        static SELECTED_HOVER: string;

        // originalCurrentState: any;
        currentState: string;
        selected: boolean;

        setSelected(selected, emit): void;

        toggle(): void;

        handleEvent(): void;

        skinFallback: any;
    }

    export class Layout {
        static VERTICAL_ALIGN_TOP: string;
        static VERTICAL_ALIGN_MIDDLE: string;
        static ALIGN_JUSTIFY: string;
        static VERTICAL_ALIGN_BOTTOM: string;
        static HORIZONTAL_ALIGN_LEFT: string;
        static HORIZONTAL_ALIGN_CENTER: string;
        static HORIZONTAL_ALIGN_RIGHT: string;

        gap: number;
        needUpdate: any;
        padding: number;
        paddingTop: number;
        paddingBottom: number;
        paddingLeft: number;
        paddingRight: number;

        // layout();
    }
    export class ViewPortBounds {
    }
    export class LayoutAlignment extends Layout {
    }
    export class VerticalLayout extends LayoutAlignment {
        constructor();

        static VERTICAL_ALIGNMENT: string;
        static HORIZONTAL_ALIGNMENT: string;

        applyPercent(items, explicit): void;

        _currentGap(i, items): any;

        layout(items, viewPortBounds): void;

        firstGap: string;
        lastGap: string;
    }
    export class TiledLayout extends Layout {
    }
    export class TiledColumnsLayout extends TiledLayout {
    }
    export class TiledRowsLayout extends TiledLayout {
    }
    export class Shape extends Graphics {
    }
    export class Diamond extends Shape {
    }
    export class Line extends Shape {
    }
    export class Rect extends Shape {
        constructor(color, alpha, width, height, radius)
    }

    export class Theme {
        constructor(callback?: Function, global?: any);

        static inputTextStyle: ThemeFont;

        static textStyle: ThemeFont;

        setSkin(comp, id, skin): void;

        loadImage(jsonPath: Array<string>): void;

        getImage(name: string): Function;

        getSpriteImage(name: string): Sprite;

        loadComplete(loader, resources): void;

        getScaleContainer(name, grid): Function;

        getSkin(comp, state): Sprite;

        static removeTheme(): void;

        getTextureCache(name: string): Texture;

        scaleContainer: ScaleContainer;

        hoverSkin: boolean;

    }

    export class ThemeFont {
        constructor(data);

        clone(): ThemeFont;

        align?: string;
        breakWords?: boolean;
        dropShadow?: boolean;
        dropShadowAngle?: number;
        dropShadowBlur?: number;
        dropShadowColor?: string | number;
        dropShadowDistance?: number;
        fill?: string | string[] | number | number[] | CanvasGradient | CanvasPattern;
        fillGradientType?: number;
        fontFamily?: string;
        fontSize?: number | string;
        fontStyle?: string;
        fontVariant?: string;
        fontWeight?: string;
        letterSpacing?: number;
        lineHeight?: number;
        lineJoin?: string;
        miterLimit?: number;
        padding?: number;
        stroke?: string | number;
        strokeThickness?: number;
        textBaseline?: string;
        wordWrap?: boolean;
        wordWrapWidth?: number;
    }

    export class AeonTheme {
        constructor(jsonPath: any, onComplete?: Function, global?: any);
    }

    export class MetalWorksMobileTheme {
        constructor(jsonPath: any, onComplete?: Function, global?: any);
    }

    export class ShapeTheme {
        constructor(onComplete?: Function, global?: any);
    }


    /**
     * The basic Button with 3 states (up, down and hover) and a label that is
     * centered on it
     *
     * @class Button
     * @extends GOWN.Skinable
     * @memberof GOWN
     *
     * @param theme default them
     * @param skinName default SKIN_NAME
     *
     * @constructor
     */
    export class Button extends Skinable {
        constructor(theme, skinName?);

        mousedown(): void;

        mouseup(): void;

        mousemove(): void;

        mouseover(): void;

        mouseout(): void;


        static SKIN_NAME: string;
        static UP: string;
        static DOWN: string;
        static HOVER: string;
        static DISABLE: string;
        textStyle: ITextStyleStyle;

        protected _label;
        protected _enabled: boolean;
        protected worldWidth;
        protected worldHeight;
        private labelFont;
        private labelColor;
        protected updateLabel: boolean;

        label: string;
        labelText: Text;
        enabled: boolean;

        handleEvent(type: string);

        _pressed: boolean;
        currentState: string;
        _over: boolean;
        prevState: string;
    }

    /**
     * The basic Text Input
     *
     * @class TextInput
     * @extends GOWN.InputControl
     * @memberof GOWN
     *
     * @param text editable text shown in input
     * @param displayAsPassword Display TextInput as Password (default false)
     * @param theme default theme
     * @param skinName default SKIN_NAME
     *
     * @constructor
     */
    export class TextInput extends InputControl {
        constructor(text, displayAsPassword?, theme?, skinName?);

        pixiText: PIXI.Text;
        text: string;
        maxChars: number;
        value: string;
        type: string;
        _displayAsPassword: boolean;
        restrict: string;
        padding: number;
        paddingX: number;
        paddingY: number;

        static SKIN_NAME: string;
        static UP: string;
        static DOWN: string;
        static DISABLE: string;
        static TextStyle: ThemeFont;
        static stateNames: Array<string>;

        onfocus(): void;

        updateSelection(start, end): boolean;

        updateSelectionBg(): void;

        onblur(): void;

        onSubmit(): void;

        onKeyDown(e: KeyboardEvent): void

        onKeyUp(): void;

        setCursorPos(): void;

        clear(): void;

        drawCursor(): void;

        onMouseMove(): boolean;

        onMouseDown(): boolean;

        onMouseUp(): boolean;

        updateTextState(): void;
    }

    export class TextArea extends TextAreaControl {
        constructor(theme, skinName?);

        static SKIN_NAME: string;

        updateSelectionBg(): void;

        textToLinePos(textPos, position): Point;

        _drawSelectionBg(fromTextPos, toTextPos): void;

        getLines(): string;

        width: number;
        style: ITextStyleStyle;
        cursor: PIXI.Text;

    }

    interface DDL_Element {
        text: string;
        [key: string]: any;
    }

    export class DropDownList extends Skinable {
        constructor(theme: Theme);

        static SKIN_NAME: string;
        static HOVER_CONTAINER: string;
        static NORMAL: string;
        static CLICKED: string;
        static CHANGE: string;

        createLabel(): void;

        createDropDown(): void;

        handleEvent(type, option): void;

        mousedown(event): void;

        touchstart(event): void;

        toggleDropDown(): void;

        initiate(): void;

        getStage(element);

        cleanChilds(): void;

        selectDropDownElement(text): void;

        addEventListener(event, callback): void;

        handelSubscribedCallouts(eventName, text, element, index): void;

        _label;
        selectedItemText: Text;
        label: string;
        labelText;
        theme: Theme;
        elementList: DDL_Element[];
        updateLabel;
        updateDropDown;
        protected showDropDown: boolean;
        protected initiated: boolean;
    }
}

// utils
declare class SliderData {
    value: number;
    target: PIXI.Sprite;
}

declare module 'gown.js' {
    export = GOWN;
}