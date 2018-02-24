import { 
    Texture, 
    Sprite 
} from "pixi.js";

class Food {
    sprite: Sprite;
    constructor(texture: Texture, x: number, y: number) {
        this.sprite = new Sprite(texture);
        this.sprite.position.x = x;
        this.sprite.position.y = y;
    }

    drop() {
        this.sprite.position.y += 1;
    }
}

export default Food;