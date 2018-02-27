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
import stages from "./../constants/stages";
import { centerX } from "./../utils/sprite";
import game from "./../constants/game";
import { loader, Text } from "pixi.js";

class GameStage extends Stage {
    player: Player;
    score: Score;
    playerLives: PlayerLives;
    food: Food[] = [];

    constructor() {
        super();

        this.score = new Score();
        this.score.position.set(0, 0);

        this.playerLives = new PlayerLives(10);
        this.playerLives.position.set(
            StageManager.width - this.playerLives.width,
            0
        );

        this.player = new Player(
            {
                straight: loader.resources[textures.playerStraight].texture,
                turnLeft: loader.resources[textures.playerTurnLeft].texture,
                turnRight: loader.resources[textures.playerTurnRight].texture
            },
            game.playerStep
        );
        this.player.position.set(
            StageManager.width / 2 - this.player.width / 2,
            StageManager.height - this.player.height
        );

        const components = [this.player, this.playerLives, this.score];

        components.forEach(c => this.addChild(c));

        this.dropFood();
        this.registerEvents();
    }

    private registerEvents() {
        window.addEventListener("keydown", this.keyDownEventListener);
        window.addEventListener("keyup", this.keyUpEventListener);
    }

    private dropFood() {
        setInterval(() => {
            if (this.paused) return;

            const food = new Food(
                loader.resources[
                    getRandomElement([
                        textures.food1,
                        textures.food2,
                        textures.food3,
                        textures.food4,
                        textures.food5,
                        textures.food6
                    ])
                ].texture
            );

            food.position.set(Math.random() * StageManager.width, 0);
            this.addChild(food);
            this.food.push(food);
        }, game.dropFoodInterval);
    }

    private keyDownEventListener = (e: KeyboardEvent) => {
        if (
            !this.paused &&
            e.keyCode === keyCodes.arrowLeft &&
            this.player.position.x - game.playerStep >= 0
        )
            this.player.turnLeft();

        if (
            !this.paused &&
            e.keyCode === keyCodes.arrowRight &&
            this.player.position.x + this.player.width + game.playerStep <=
                StageManager.width
        )
            this.player.turnRight();

        if (e.keyCode === keyCodes.space) {
            if (this.paused) this.resume();
            else this.pause();
        }
    };

    private keyUpEventListener = (e: KeyboardEvent) => {
        if ([keyCodes.arrowLeft, keyCodes.arrowRight].includes(e.keyCode))
            this.player.standStraight();
    };

    onDestroy() {
        window.removeEventListener("keydown", this.keyDownEventListener);
        window.removeEventListener("keyup", this.keyUpEventListener);
    }

    onUpdate() {
        this.food.forEach(f => f.drop());

        const eated = this.food.find(f => boxesIntersect(f, this.player));
        const dropped = this.food.find(f => f.position.y > StageManager.height);

        if (dropped) {
            this.removeChild(dropped);
            this.playerLives.decreaseLives();
        }

        if (eated) {
            this.removeChild(eated);
            this.score.increaseScore();
        }

        this.food = this.food.filter(f => ![eated, dropped].includes(f));
        if (!this.playerLives.isAlive())
            StageManager.goToStage(stages.gameOver);
    }
}

export default GameStage;
