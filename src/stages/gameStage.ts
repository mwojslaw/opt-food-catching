import Stage from "./../engine/stage";
import Player from "./../components/player";
import Food from "./../components/food";
import Score from "./../components/score";
import PlayerLives from "./../components/playerLives";
import keyCodes from "./../utils/keyCodes";
import { getRandomElement } from "./../utils/array";
import { boxesIntersect } from "./../utils/collision";
import StageManager from "./../engine/stageManager";
import textures from "./../constants/textures";

import {
    loader,
} from "pixi.js";

const foodTextures = [
    textures.food1,
    textures.food2,
    textures.food3,
    textures.food4,
    textures.food5,
    textures.food6
];

class GameStage extends Stage {
    player: Player;
    score: Score;
    playerLives: PlayerLives;
    food: Food[] = [];

    constructor(){
        super();
        this.composeUI();
    }

    composeUI(){
        this.player = new Player({
            straight: loader.resources[textures.playerStraight].texture,
            turnLeft: loader.resources[textures.playerTurnLeft].texture,
            turnRight: loader.resources[textures.playerTurnRight].texture,
        }, window.innerWidth / 2, window.innerHeight - 100);
        this.score = new Score(800, 100);
        this.playerLives = new PlayerLives(1, 100, 100);

        [
            this.player.sprite,
            this.score.sprite,
            this.playerLives.sprite
        ].forEach(c => this.addChild(c));

        this.dropFood();

        this.addKeyboardListeners();
    }

    addKeyboardListeners(){
        window.addEventListener("keydown", e => {
            if(e.keyCode === keyCodes.arrowLeft)
                this.player.turnLeft();
        
            if(e.keyCode === keyCodes.arrowRight)
                this.player.turnRight();
        });
        
        window.addEventListener("keyup", e => {
            if([keyCodes.arrowLeft, keyCodes.arrowRight].indexOf(e.keyCode) !== -1 )
                this.player.standStraight();
        });
    }

    dropFood(){
        setInterval(() => {
            const f = new Food(loader.resources[getRandomElement(foodTextures)].texture, Math.random() * 800, 100);
            this.addChild(f.sprite);
            this.food.push(f);
        }, 1000)
    }

    onUpdate(){
        this.food.forEach(f => f.drop());

        const eated = this.food.find(f => boxesIntersect(f.sprite, this.player.sprite));
        const dropped = this.food.find(f => f.sprite.position.y > this.height);

        if(dropped){
            this.food = this.food.filter(f => f !== dropped)
            this.removeChild(dropped.sprite);
            
            this.playerLives.decreaseLives();

            if(this.playerLives.lives === 0)
                StageManager.goToStage("gameOver");
        }

        if(eated){
            this.food = this.food.filter(f => f !== eated)
            this.removeChild(eated.sprite);

            this.score.increaseScore();
        }
    }
}

export default GameStage;