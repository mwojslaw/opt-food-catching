import { loader } from "pixi.js";
import GameOverStage from "./stages/gameOverStage";
import GameStage from "./stages/gameStage";
import HomeStage from "./stages/homeStage";
import StageManager from "./engine/stageManager";
import textures from "constants/textures";
import stages from "constants/stages";

export class Game {
    constructor(element: HTMLElement | null, width: number, height: number) {
        if (element === null) throw new Error("Element must exists");

        Object.values(textures).forEach(value => loader.add(value));

        loader.load(() => {
            StageManager.create(element, width, height, {
                backgroundColor: 10263708
            })
                .addStage(stages.game, GameStage)
                .addStage(stages.gameOver, GameOverStage)
                .addStage(stages.home, HomeStage)
                .goToStage(stages.home);
        });
    }
}

export default Game;
