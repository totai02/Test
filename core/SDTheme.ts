import Theme = GOWN.Theme;
import ScrollBar = GOWN.ScrollBar;
import ScrollThumb = GOWN.ScrollThumb;
import Rectangle = PIXI.Rectangle;
export class SDTheme extends Theme {
    constructor(jsonPath: any, onComplete?: Function) {
        super(onComplete)

        if (jsonPath) this.loadImage(jsonPath);
        else this.loadComplete();
    }

    static HORIZONTAL_SCROLL_BAR_TRACK_SCALE_9_GRID: Rectangle = new Rectangle(1, 2, 2, 11);
    static VERTICAL_SCROLL_BAR_TRACK_SCALE_9_GRID: Rectangle = new Rectangle(2, 2, 4, 231);
    static VERTICAL_SCROLL_BAR_Thumbb_SCALE_9_GRID: Rectangle = new Rectangle(3, 6, 2, 8);

    loadComplete(loader?, resources?): void {
        super.loadComplete(loader, resources);

        if (ScrollBar) {
            let sb = ScrollBar;

            this.setSkin(sb.SKIN_NAME, "horizontal_track", this.getScaleContainer("tray", SDTheme.HORIZONTAL_SCROLL_BAR_TRACK_SCALE_9_GRID));
            this.setSkin(sb.SKIN_NAME, "vertical_track", this.getScaleContainer("tray", SDTheme.VERTICAL_SCROLL_BAR_TRACK_SCALE_9_GRID));
        }

        if (ScrollThumb) {
            let st = ScrollThumb;

            let btn = GOWN.Button;

            this.setSkin(st.SKIN_NAME, "horizontal_" + btn.UP, this.getImage("slider_thumb_up"));

            this.setSkin(st.SKIN_NAME, "vertical_" + btn.UP, this.getScaleContainer("thumb", SDTheme.VERTICAL_SCROLL_BAR_Thumbb_SCALE_9_GRID));
        }
    }
}