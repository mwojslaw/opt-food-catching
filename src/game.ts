
import { 
    Container,
    WebGLRenderer,
    CanvasRenderer,
    autoDetectRenderer,
    
} from "pixi.js";

import Player from "./player";
import Food from "./food";
import food from "./food";
import player from "./player";

function boxesIntersect(a, b)
{
  var ab = a.getBounds();
  var bb = b.getBounds();
  return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}

export class Game {
    score: number = 0;
    numberOfDropped: number = 0;
    stage: Container;
    renderer: WebGLRenderer | CanvasRenderer;
    visibleFood: Food[] = [];

    dropFood(food: Food) {
        this.visibleFood.push(food);
        this.stage.addChild(food.sprite);
    }

    constructor(element: HTMLElement, width: number, height: number, protected player: Player){
        this.stage = new Container();
        this.renderer = autoDetectRenderer(width, height);
        this.renderer.view.style.position = "absolute";

        this.stage.addChild(player.sprite);

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
            console.log(`dropped: ${this.numberOfDropped}`);

            if(this.numberOfDropped === 10){
                console.log("game over");
            }
        }

        if(eated){
            this.visibleFood = this.visibleFood.filter(f => f !== eated)
            this.stage.removeChild(eated.sprite);
            this.score++;
            console.log(`score: ${this.score}`);
        }

        this.renderer.render(this.stage);
        requestAnimationFrame(this.loop);
    }
}

export default Game;