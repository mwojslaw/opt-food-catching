import {
    Text
} from "pixi.js";

import { Component } from "./";

class PlayerLives extends Component<Text>{
    constructor(public lives: number, x: number, y: number){
        super(new Text(lives.toString()), x, y);
    }

    decreaseLives(){
        this.lives--;
        this.sprite.text = this.lives.toString();
    }
}

export default PlayerLives;