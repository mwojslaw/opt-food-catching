import { Text } from "pixi.js";
import { Stage } from "./";

class GameOverStage extends Stage {
    constructor(){
        super();
        const message = new Text("Game over !");

        this.addChildren([message]);
    }

    onUpdate(){
        
    }
}

export default GameOverStage;