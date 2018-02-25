import { Text } from "pixi.js";
import Stage from "./../engine/stage";
import keyCodes from "./../utils/keyCodes";
import StageManager from "./../engine/stageManager";

class GameOverStage extends Stage {
    constructor(){
        super();
        const message = new Text("Game over !");

        [message].forEach(c => this.addChild(c));
        this.addKeyboardListeners();
    }

    addKeyboardListeners(){
        window.addEventListener("keydown", e => {
            if(e.keyCode !== keyCodes.space)
                return;

            StageManager.goToStage("game");
        });
    }

    onUpdate(){
        
    }
}

export default GameOverStage;