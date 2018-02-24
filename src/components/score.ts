import { Text } from "pixi.js";
import { Component } from "./";

class Score extends Component<Text> {
    score: number = 0;

    constructor(x: number, y: number){
        super(new Text("0"), x, y);
    }

    increaseScore(){
        this.score++;
        this.sprite.text = this.score.toString();
    }
}

export default Score;