import { 
    Texture, 
    Sprite,
    Container
} from "pixi.js";

type PlayerTextures = {
    turnLeft: Texture,
    straight: Texture,
    turnRight: Texture,
}

class Player extends Container {
    private playerSprite: Sprite;
    constructor(protected playerTextures: PlayerTextures) {
        super();

        this.playerSprite = new Sprite(playerTextures.straight);
        this.addChild(this.playerSprite);
    }

    turnLeft() {
        this.playerSprite.texture = this.playerTextures.turnLeft;
        this.position.x -= 10;
    }

    turnRight() {
        this.playerSprite.texture = this.playerTextures.turnRight;
        this.position.x += 10;
    }

    standStraight() {
        this.playerSprite.texture = this.playerTextures.straight;
    }
}

export default Player;