import Container = PIXI.Container;
import Graphics = PIXI.Graphics;
import LayoutGroup = GOWN.LayoutGroup;
import {ThemeConfig} from "../config/ThemeConfig";
import DisplayObject = PIXI.DisplayObject;
import VerticalLayout = GOWN.VerticalLayout;

export class SDScrollPane extends Container {
    private _widthArea: number = 0;
    private _heightArea: number = 0;

    private group: LayoutGroup = new LayoutGroup();
    private innerGroup: LayoutGroup = new LayoutGroup();
    private scrollArea: SDScrollArea;
    private maskSD: Graphics;
    private scrollBar: SDScrollBar;
    
    constructor(width, height) {
        super();
        this._widthArea = width;
        this._heightArea = height;
        this.init();
    }

    public set source(array: Array<DisplayObject>) {
        this.innerGroup = new LayoutGroup();
        this.innerGroup.layout = new VerticalLayout();
        for (let item of array) {
            this.innerGroup.addChild(item);
        }

        if (this.scrollArea != null && this.group.children.indexOf(this.scrollArea) >= 0) {
            this.group.removeChild(this.scrollArea);
        }
        this.scrollArea = new SDScrollArea(this.innerGroup);
        this.scrollArea.x = 0;
        this.scrollArea.y = 0;
        this.scrollArea.width = this._widthArea;
        this.scrollArea.height = this._heightArea;
        this.group.addChild(this.scrollArea);

        if (this.scrollBar != null && this.group.children.indexOf(this.scrollBar) >= 0) {
            this.group.removeChild(this.scrollBar);
        }

        this.scrollBar = new SDScrollBar(this.scrollArea);
        this.group.addChild(this.scrollBar);
        this.scrollBar.x = this.scrollArea.width + 4;
        this.scrollBar.height = this.scrollArea.height;
        this.drawMask(this.scrollArea);
        this.scrollArea.mask = this.maskSD;
    }

    init = () => {
        this.group = new LayoutGroup();
        this.innerGroup = new LayoutGroup();
        this.maskSD = new Graphics();
        this.scrollArea = new SDScrollArea(this.innerGroup);
        this.drawMask(this.scrollArea);
        this.group.addChild(this.maskSD);
        this.addChild(this.group);
    };

    private drawMask = (scroll) => {
        this.maskSD.clear();
        this.maskSD.beginFill(0xFFFFFF, 1);
        this.maskSD.drawRect(scroll.x, scroll.y, scroll.width, scroll.height);
        this.maskSD.endFill();
    };
}

class SDScrollArea extends GOWN.ScrollArea {
    constructor(content?, addListener?, scrolldelta?, bar?) {
        super(content, addListener, scrolldelta, bar);
        this.scrolldirection = 'vertical';
    }
}

export class SDScrollBar extends GOWN.ScrollBar {
    constructor(scrollArea, thumb?) {
        super(scrollArea, thumb, ThemeConfig.CORE, GOWN.ScrollBar.SKIN_NAME);
    }

    redraw() {
        if (this.invalidTrack) {
            if (this.scrollArea && this.thumb) {
                if (this.orientation === 'horizontal') {
                    this.thumb.width = Math.max(20, this.scrollArea.width /
                        (this.scrollArea.content.width / this.scrollArea.width));
                } else {
                    if(this.scrollArea.content.height > this.scrollArea.height){
                        this.visible = true;
                        this.thumb.height = Math.max(20, this.scrollArea.height /
                            (this.scrollArea.content.height / this.scrollArea.height));
                    }else {
                        this.visible = false;
                    }
                    this.thumb.width = 8;
                }
            }
            this.scrollableredraw(this);
        }
    }
}