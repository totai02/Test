import Sprite = PIXI.Sprite;
import {Img} from "../const/Img";
import TweenMax = gsap.TweenMax;
export class CardView extends Sprite {
    public static readonly AnchorY = 1.05;
    public static readonly LiftingAnchorY = 1.25;
    
    lift: boolean

    constructor(public v: number, public onHand: boolean = false, public bocNoc = false) {
        super(PIXI.loader.resources[Img.JCardName].textures[v]);
        this.buttonMode = this.interactive = onHand;
        this.lift = false
    }
    
    liftCard = (lift: boolean) => {
        let newY = lift ? CardView.LiftingAnchorY : CardView.AnchorY;
        TweenMax.to(this.anchor, 1 / 6, {y: newY});
        this.lift = lift
    };
}