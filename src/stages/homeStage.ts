import Stage from "./../engine/stage";
import {
    loader, Sprite, Text
} from "pixi.js";
import textures from "./../constants/textures";
import keyCodes from "./../utils/keyCodes";
import StageManager from "./../engine/stageManager";
import stages from "./../constants/stages";
import { centerY, centerX } from "./../utils/sprite";

class HomeStage extends Stage {
    flashingItervalId: number;
    header: Text;
    constructor(){
        super();

        const cover = new Sprite(loader.resources[textures.cover].texture);
        cover.scale.set(0.5, 0.5);
        centerX(cover, StageManager.width);
        centerY(cover, StageManager.height);

        this.header = new Text("[SPACE] TO START");
        centerX(this.header, StageManager.width);
        centerY(this.header, StageManager.height);

        [cover, this.header].forEach(c => this.addChild(c));

        this.registerEvents();
    }

    private registerEvents(){
        window.addEventListener("keydown", this.keyDownEventListener);

        this.flashingItervalId = setInterval(() => {
            this.header.visible = !this.header.visible;
        }, 500);
    }

    private keyDownEventListener(e: KeyboardEvent){
        if(e.keyCode !== keyCodes.space) return;

        StageManager.goToStage(stages.game)
    }

    onDestroy(){
        window.removeEventListener("keydown", this.keyDownEventListener);
        clearInterval(this.flashingItervalId);
    }

    onUpdate(){

    }
}

export default HomeStage;