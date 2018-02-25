import Stage from "./../engine/stage";
import {
    loader, Sprite, Text
} from "pixi.js";
import textures from "./../constants/textures";
import keyCodes from "./../utils/keyCodes";
import StageManager from "./../engine/stageManager";
import stages from "./../constants/stages";

class HomeStage extends Stage {
    constructor(){
        super();

        const cover = new Sprite(loader.resources[textures.cover].texture);
        const header = new Text("Press space to start new game");
        header.position.set(100, 100);
        [cover, header].forEach(c => this.addChild(c));

        this.registerEvents();
    }

    private registerEvents(){
        window.addEventListener("keydown", this.keyDownEventListener);
    }

    private keyDownEventListener(e: KeyboardEvent){
        if(e.keyCode !== keyCodes.space) return;

        StageManager.goToStage(stages.game)
    }

    onDestroy(){
        window.removeEventListener("keydown", this.keyDownEventListener);
    }

    onUpdate(){

    }
}

export default HomeStage;