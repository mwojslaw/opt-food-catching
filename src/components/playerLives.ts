import {
    Text, 
    Container
} from "pixi.js";

class PlayerLives extends Container {
    private sprite: Text;
    constructor(protected lives: number){
        super();
        this.sprite = new Text(lives.toString());
        this.addChild(this.sprite);
    }

    isAlive() {
        return this.lives > 0;
    }

    decreaseLives() {
        this.lives--;
        this.sprite.text = this.lives.toString();
    }
}

export default PlayerLives;