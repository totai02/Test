/// <reference path="node_modules/awesome-typescript-loader/lib/runtime.d.ts" />
import "reflect-metadata";
import "pixi.js";
require('./lib/pixi.TextInput')
require("./lib/gown.js/src");
import {App} from "./const/App";
import {ResLoader} from "./core/ResLoader";
import Container = PIXI.Container;
import {ThiDinhWaitingUsersView} from "./view/ThiDinhWaitingUsersView";
import {ChauRiaThiDinhView} from "./view/ChauRiaThiDinhView";
import {ChatView} from "./view/ChatView";
import {NoticeView} from "./view/NoticeView";
class Main {
    stage: Container;
    renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;

    constructor() {
        this.renderer = PIXI.autoDetectRenderer(App.W, App.H, {
            antialias: true,
            roundPixels: true // If true Pixi will Math.floor() x/y values when rendering, stopping pixel interpolation.
        })

        document.body.appendChild(this.renderer.view)

        this.stage = new PIXI.Container();
        ResLoader.init(this.resLoaded);
    }

    resLoaded = () => {
        this.initView();
    }

    initView = () => {
        let view = new NoticeView()
        
        // view.position.set(100, 100)
        // this.stage.addChild(view);
    }

    render = () => {
        this.renderer.render(this.stage);
        window.requestAnimationFrame(this.render);
    };
}

let main = new Main();
main.render();