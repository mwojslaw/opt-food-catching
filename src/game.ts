
import { 
    WebGLRenderer,
    CanvasRenderer,
    autoDetectRenderer,
} from "pixi.js";

import GameOverStage from "./stages/gameOverStage";
import GameStage from "./stages/gameStage";
import { Stage } from "./stages";

export class Game {
    stage: Stage;
    renderer: WebGLRenderer | CanvasRenderer;

    constructor(element: HTMLElement, width: number, height: number){
        this.stage = new GameStage(this.changeStageToGameOver);
        this.renderer = autoDetectRenderer(width, height, {
            backgroundColor: 15068144,
            antialias: true
        });
        this.renderer.view.style.position = "absolute";

        element.appendChild(this.renderer.view);
        requestAnimationFrame(this.loop);
    }

    changeStageToGameOver = () => {
        this.stage = new GameOverStage();
    }

    loop = () => {
        this.stage.onUpdate();
        this.renderer.render(this.stage.container);
        requestAnimationFrame(this.loop);
    }
}

export default Game;