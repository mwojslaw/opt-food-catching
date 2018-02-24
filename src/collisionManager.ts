
import {
    DisplayObject
} from "pixi.js";

import Game from "./game";
import Food from "./food";
import Player from "./player";
import player from "./player";

function boxesIntersect(a, b)
{
  var ab = a.getBounds();
  var bb = b.getBounds();
  return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}

class CollisionManager {
    constructor(protected game: Game, protected onCollision: (food: DisplayObject, player:DisplayObject) => void){
        window.addEventListener("update", () => this.checkCollisions());
    }

    checkCollisions(){
        const player = this.game.stage.children.find(c => c.name === "player");
        const food = this.game.stage.children.filter(c => c.name === "food").find(f => boxesIntersect(f, player));
        if(food)
            this.onCollision(food, player);
    }
}

export default CollisionManager;