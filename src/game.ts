
import { loader } from "pixi.js";
import GameOverStage from "./stages/gameOverStage";
import GameStage from "./stages/gameStage";
import HomeStage from "./stages/homeStage";
import StageManager from "./engine/stageManager";
import textures from "./constants/textures";
import stages from "./constants/stages";

export class Game {
    constructor(element: HTMLElement, width: number, height: number){
        // TODO: object.values ?
        Object.keys(textures)
            .forEach(key =>  loader.add(textures[key]));

        loader.load(() => {
            StageManager
                .create(element, width, height, {
                    backgroundColor: 15068144,
                    antialias: true
                })
                .addStage(
                    stages.game,
                    GameStage
                )
                .addStage(
                    stages.gameOver,
                    GameOverStage
                )
                .addStage(
                    stages.home,
                    HomeStage
                )
                .goToStage(stages.home);
        });
    }

}

export default Game;