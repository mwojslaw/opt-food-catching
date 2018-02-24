
import { 
    Container,
    WebGLRenderer,
    CanvasRenderer,
    autoDetectRenderer,
    Text
} from "pixi.js";

import Player from "./player";
import Food from "./food";
import Score from "./score";
import PlayerLives from "./playerLives";
import { boxesIntersect } from "../utils/collision";

export class Game {
    score: Score;
    playerLives: PlayerLives;
    stage: Container;
    renderer: WebGLRenderer | CanvasRenderer;
    visibleFood: Food[] = [];

    dropFood(food: Food) {
        this.visibleFood.push(food);
        this.stage.addChild(food.sprite);
    }

    constructor(element: HTMLElement, width: number, height: number, protected player: Player){
        this.composeUI(
            element,
            width,
            height,
            player
        );
        requestAnimationFrame(this.loop);
    }

    composeUI(
        root: HTMLElement,
        width: number,
        height: number,
        player: Player,
    ){
        this.stage = new Container();
        this.renderer = autoDetectRenderer(width, height, {
            backgroundColor: 15068144,
            antialias: true
        });
        this.renderer.view.style.position = "absolute";

        this.stage.addChild(this.player.sprite)

        this.score = new Score(800, 100);
        this.stage.addChild(this.score.scoreText);

        this.playerLives = new PlayerLives(10, 100, 100);
        this.stage.addChild(this.playerLives.livesText);

        root.appendChild(this.renderer.view);
    }

    loop = () => {
        this.visibleFood.forEach(f => f.drop());

        const eated = this.visibleFood.find(f => boxesIntersect(f.sprite, this.player.sprite));
        const dropped = this.visibleFood.find(f => f.sprite.position.y > this.renderer.height);

        if(dropped){
            this.visibleFood = this.visibleFood.filter(f => f !== dropped)
            this.stage.removeChild(dropped.sprite);
            
            this.playerLives.decreaseLives();
        }

        if(eated){
            this.visibleFood = this.visibleFood.filter(f => f !== eated)
            this.stage.removeChild(eated.sprite);

            this.score.increaseScore();
        }

        this.renderer.render(this.stage);
        requestAnimationFrame(this.loop);
    }
}

export default Game;