import {
    BaseTexture,
    Spritesheet,
    Point,
    loader,
    Sprite,
} from "pixi.js";

import "normalize.css";

import * as foodSet from "./images/food.json";
import * as foodPng from "./images/food.png";
import * as playerStraight from "./images/player_straight.png";
import * as playerTurnLeft from "./images/player_turnLeft.png";
import * as playerTurnRight from "./images/player_turnRight.png";

import Game from "./components/game";
import Food from "./components/food";
import Player from "./components/player";
import keyCodes from "./utils/keyCodes";

let player: Player;

loader
.add(playerStraight)
.add(playerTurnLeft)
.add(playerTurnRight)
.load(() => {
    
    const baseTexture = BaseTexture.from(foodPng, null, 1);
    
    baseTexture.on("loaded", baseTexture => {
        const spritesheet = new Spritesheet(baseTexture, foodSet);
        spritesheet.parse(function (textures) {
            player = new Player({
                straight: loader.resources[playerStraight].texture,
                turnLeft: loader.resources[playerTurnLeft].texture,
                turnRight: loader.resources[playerTurnRight].texture,
            }, window.innerWidth / 2, window.innerHeight - 100);
            const game = new Game(
                document.getElementById("root"), 
                window.innerWidth, 
                window.innerHeight,
            player);
            
            dropFood(game, textures);
        });
    });
});

const dropFood = (game: Game, spritesheet: Spritesheet) => {
    setInterval(() => {
        const f = new Food(spritesheet["0"], Math.random() * 800, 100);
        game.dropFood(f);
    }, 200)
};

window.addEventListener("keydown", e => {
    if(e.keyCode === keyCodes.arrowLeft) {
        player.turnLeft();
    }

    if(e.keyCode === keyCodes.arrowRight){
        player.turnRight();
    }
});

window.addEventListener("keyup", e => {
    if([keyCodes.arrowLeft, keyCodes.arrowRight].indexOf(e.keyCode) !== -1 )
        player.standStraight();
});