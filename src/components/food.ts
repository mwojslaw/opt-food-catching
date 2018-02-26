import { 
    Texture, 
    Sprite, 
    Container
} from "pixi.js";

class Food extends Container {
    private sprite: Sprite;
    constructor(texture: Texture) {
        super();
        this.sprite = new Sprite(texture);
        this.addChild(this.sprite);
    }

    drop() {
        this.position.y += 1;
    }
}

export default Food;