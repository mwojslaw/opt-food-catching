import { Stage } from "./";
import Player from "./../components/player";
import Food from "./../components/food";
import Score from "./../components/score";
import PlayerLives from "./../components/playerLives";
import keyCodes from "./../utils/keyCodes";
import { getRandomElement } from "./../utils/array";
import { boxesIntersect } from "./../utils/collision";

import {
    loader,
} from "pixi.js";

import * as playerStraight from "./../images/player_straight.png";
import * as playerTurnLeft from "./../images/player_turnLeft.png";
import * as playerTurnRight from "./../images/player_turnRight.png";

import * as food1 from "./../images/food_1.png";
import * as food2 from "./../images/food_2.png";
import * as food3 from "./../images/food_3.png";
import * as food4 from "./../images/food_4.png";
import * as food5 from "./../images/food_5.png";
import * as food6 from "./../images/food_6.png";

const foodTextures = [
    food1,
    food2,
    food3,
    food4,
    food5,
    food6
];

class GameStage extends Stage {
    player: Player;
    score: Score;
    playerLives: PlayerLives;
    food: Food[] = [];

    constructor(protected onStageChange: () => void){
        super();

        loader.add([
            playerStraight,
            playerTurnLeft,
            playerTurnRight,
            ...foodTextures
        ])
        .load(() => {
            this.player = new Player({
                straight: loader.resources[playerStraight].texture,
                turnLeft: loader.resources[playerTurnLeft].texture,
                turnRight: loader.resources[playerTurnRight].texture,
            }, window.innerWidth / 2, window.innerHeight - 100);
            this.score = new Score(800, 100);
            this.playerLives = new PlayerLives(10, 100, 100);

            this.addChildren([
                this.player.sprite,
                this.score.sprite,
                this.playerLives.sprite
            ]);

            this.dropFood();

            this.addKeyboardListeners();
        });
        
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
            this.addChildren([f.sprite]);
            this.food.push(f);
        }, 1000)
    }

    onUpdate(){
        this.food.forEach(f => f.drop());

        const eated = this.food.find(f => boxesIntersect(f.sprite, this.player.sprite));
        const dropped = this.food.find(f => f.sprite.position.y > this.container.height);

        if(dropped){
            this.food = this.food.filter(f => f !== dropped)
            this.removeChildren([dropped.sprite]);
            
            this.playerLives.decreaseLives();

            if(this.playerLives.lives === 0)
                this.onStageChange();
        }

        if(eated){
            this.food = this.food.filter(f => f !== eated)
            this.removeChildren([eated.sprite]);

            this.score.increaseScore();
        }
    }
}

export default GameStage;