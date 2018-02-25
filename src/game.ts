
import { loader } from "pixi.js";
import GameOverStage from "./stages/gameOverStage";
import GameStage from "./stages/gameStage";
import StageManager from "./engine/stageManager";
import textures from "./constants/textures";

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
                    "game",
                    GameStage
                )
                .addStage(
                    "gameOver",
                    GameOverStage
                )
                .goToStage("game");
        });
    }

}

export default Game;