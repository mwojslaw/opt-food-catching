import Stage from "./../engine/stage";
import { loader, Sprite, Text } from "pixi.js";
import textures from "constants/textures";
import keyCodes from "utils/keyCodes";
import StageManager from "./../engine/stageManager";
import stages from "constants/stages";
import BlinkText from "./../components/blinkText";
import { centerY, centerX } from "utils/sprite";

class HomeStage extends Stage {
    header: BlinkText;
    constructor() {
        super();

        const cover = new Sprite(loader.resources[textures.cover].texture);
        cover.scale.set(0.5, 0.5);
        centerX(cover, StageManager.width);
        centerY(cover, StageManager.height);

        this.header = new BlinkText(500, "SPACE TO START");
        centerX(this.header, StageManager.width);
        centerY(this.header, StageManager.height);

        [cover, this.header].forEach(c => this.addChild(c));

        this.registerEvents();
    }

    private registerEvents() {
        window.addEventListener("keydown", this.keyDownEventListener);
    }

    private keyDownEventListener(e: KeyboardEvent) {
        if (e.keyCode !== keyCodes.space) return;

        StageManager.goToStage(stages.game);
    }

    onDestroy() {
        window.removeEventListener("keydown", this.keyDownEventListener);
    }

    onUpdate() {}
}

export default HomeStage;
