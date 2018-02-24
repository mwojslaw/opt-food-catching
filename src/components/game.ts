
import { 
    Container,
    WebGLRenderer,
    CanvasRenderer,
    autoDetectRenderer,
    Text
} from "pixi.js";

import Player from "./player";
import Food from "./food";
import { boxesIntersect } from "../utils/collision";

export class Game {
    score: number = 0;
    numberOfDropped: number = 0;
    droppedFoodText:Text;
    catchedFoodText: Text;
    stage: Container;
    renderer: WebGLRenderer | CanvasRenderer;
    visibleFood: Food[] = [];

    dropFood(food: Food) {
        this.visibleFood.push(food);
        this.stage.addChild(food.sprite);
    }

    constructor(element: HTMLElement, width: number, height: number, protected player: Player){
        this.stage = new Container();
        this.renderer = autoDetectRenderer(width, height, {
            backgroundColor: 15068144,
            antialias: true
        });
        this.renderer.view.style.position = "absolute";

        this.stage.addChild(player.sprite);

        this.droppedFoodText = new Text(this.numberOfDropped.toString());
        this.stage.addChild(this.droppedFoodText);

        this.catchedFoodText = new Text(this.score.toString());
        this.catchedFoodText.position.set(500, 0)

        this.stage.addChild(this.catchedFoodText);

        element.appendChild(this.renderer.view);

        requestAnimationFrame(this.loop);
    }

    loop = () => {
        this.visibleFood.forEach(f => f.drop());

        const eated = this.visibleFood.find(f => boxesIntersect(f.sprite, this.player.sprite));
        const dropped = this.visibleFood.find(f => f.sprite.position.y > this.renderer.height);

        if(dropped){
            this.visibleFood = this.visibleFood.filter(f => f !== dropped)
            this.stage.removeChild(dropped.sprite);
            this.numberOfDropped++;
            this.droppedFoodText.text = this.numberOfDropped.toString();

            if(this.numberOfDropped === 10){
                console.log("game over");
            }
        }

        if(eated){
            this.visibleFood = this.visibleFood.filter(f => f !== eated)
            this.stage.removeChild(eated.sprite);
            this.score++;
            this.catchedFoodText.text = this.score.toString();
        }

        this.renderer.render(this.stage);
        requestAnimationFrame(this.loop);
    }
}

export default Game;