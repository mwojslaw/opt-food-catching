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
import * as playerPng from "./images/player_0.png";

import Game from "./game";
import Food from "./food";
import Player from "./player";
import CollisionManager from "./collisionManager";
import keyCodes from "./utils/keyCodes";

let player: Player;

loader.add(playerPng).load(() => {
    
    const baseTexture = BaseTexture.from(foodPng, null, 1);
    
    baseTexture.on("loaded", baseTexture => {
        const spritesheet = new Spritesheet(baseTexture, foodSet);
        spritesheet.parse(function (textures) {
            player = new Player(loader.resources[playerPng].texture, window.innerWidth / 2, window.innerHeight - 100);
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

window.addEventListener("keydown", (e: KeyboardEvent) => {
    if(e.keyCode === keyCodes.arrowLeft) {
        player.moveLeft();
    }

    if(e.keyCode === keyCodes.arrowRight){
        player.moveRight();
    }
});