import { 
    Texture, 
    Sprite 
} from "pixi.js";

class Player {
    sprite: Sprite;

    constructor(texture: Texture, x: number, y: number){
        this.sprite = new Sprite(texture);
        this.sprite.position.x = x;
        this.sprite.position.y = y;
    }

    moveLeft() {
        this.sprite.position.x -= 10;
    }

    moveRight() {
        this.sprite.position.x += 10;
    }
}

export default Player;