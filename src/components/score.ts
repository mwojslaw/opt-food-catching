import { Text, Container } from "pixi.js";

class Score extends Container {
    private score: number = 0;
    private sprite: Text;

    constructor() {
        super();

        this.sprite = new Text(this.score.toString());
        this.addChild(this.sprite);
    }

    increaseScore() {
        this.score++;
        this.sprite.text = this.score.toString();
    }
}

export default Score;
