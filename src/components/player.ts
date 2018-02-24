import { 
    Texture, 
    Sprite
} from "pixi.js";

import { Component } from "./";

type PlayerTextures = {
    turnLeft: Texture,
    straight: Texture,
    turnRight: Texture,
}

class Player extends Component<Sprite> {
    constructor(protected playerTextures: PlayerTextures, x: number, y: number){
        super(new Sprite(playerTextures.straight), x, y);
    }

    turnLeft() {
        this.sprite.texture = this.playerTextures.turnLeft;
        this.sprite.position.x -= 10;
    }

    turnRight() {
        this.sprite.texture = this.playerTextures.turnRight;
        this.sprite.position.x += 10;
    }

    standStraight(){
        this.sprite.texture = this.playerTextures.straight;
    }
}

export default Player;