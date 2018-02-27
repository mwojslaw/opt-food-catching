import { Container } from "pixi.js";

abstract class Stage extends Container {
    paused: boolean = false;

    pause() {
        this.paused = true;
    }

    resume() {
        this.paused = false;
    }

    abstract onUpdate(): void;
    abstract onDestroy(): void;
}

export default Stage;
