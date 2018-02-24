import { Text } from "pixi.js";

class Score {
    score: number = 0;
    scoreText: Text;

    constructor(x: number, y: number){
        this.scoreText = new Text(this.score.toString());
        this.scoreText.position.set(x, y);
    }

    increaseScore(){
        this.score++;
        this.scoreText.text = this.score.toString();
    }
}

export default Score;