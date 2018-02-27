import { Sprite } from "pixi.js";

export const centerX = (object: Sprite, width: number) => {
    object.anchor.set(0.5, 0.5);
    object.x = width / 2;
};

export const centerY = (object: Sprite, height: number) => {
    object.anchor.set(0.5, 0.5);
    object.y = height / 2;
};
