import { Text } from "pixi.js";

class PlayerLives {
    livesText: Text;

    constructor(protected lives: number, x: number, y: number){
        this.livesText = new Text(this.lives.toString());
        this.livesText.position.set(x, y);
    }

    decreaseLives(){
        this.lives--;
        this.livesText.text = this.lives.toString();
    }
}

export default PlayerLives;