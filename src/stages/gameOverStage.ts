import { Text } from "pixi.js";
import Stage from "./../engine/stage";
import keyCodes from "./../utils/keyCodes";
import StageManager from "./../engine/stageManager";
import stages from "./../constants/stages";
import { centerX, centerY } from "./../utils/sprite";

class GameOverStage extends Stage {
    constructor() {
        super();
        const message = new Text("GAME OVER", {
            fontSize: 40,
            fontWeight: "bold",
        });
        centerX(message, StageManager.width);
        centerY(message, StageManager.height);

        [message].forEach(c => this.addChild(c));
        this.registerEvents();
    }

    private registerEvents() {
        window.addEventListener("keydown", this.keyDownEventListener);
    }

    private keyDownEventListener(e: KeyboardEvent) {
        if(e.keyCode !== keyCodes.space)
            return;

        StageManager.goToStage(stages.game);
    }

    onUpdate() {
        
    }

    onDestroy() {
        window.removeEventListener("keydown", this.keyDownEventListener);
    }
}

export default GameOverStage;