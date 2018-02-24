import { Sprite } from "pixi.js";

export class Component<T extends Sprite>{
    private _sprite: T;

    constructor(sprite: T, x: number, y: number){
        this._sprite = sprite;
        this._sprite.position.set(x, y);
    }

    get sprite(){
        return this._sprite;
    }
}