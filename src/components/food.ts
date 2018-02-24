import { 
    Texture, 
    Sprite 
} from "pixi.js";

import { Component } from "./";

class Food extends Component<Sprite> {
    constructor(texture: Texture, x: number, y: number) {
        super(new Sprite(texture), x, y);
    }

    drop() {
        this.sprite.position.y += 1;
    }
}

export default Food;