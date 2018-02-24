import { 
    Texture, 
    Sprite 
} from "pixi.js";

type PlayerTextures = {
    turnLeft: Texture,
    straight: Texture,
    turnRight: Texture,
}

class Player {
    sprite: Sprite;

    constructor(protected playerTextures: PlayerTextures, x: number, y: number){
        this.sprite = new Sprite(playerTextures.straight);
        this.sprite.position.x = x;
        this.sprite.position.y = y;
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