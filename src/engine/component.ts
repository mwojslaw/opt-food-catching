import { Sprite } from "pixi.js";

export class Component<T extends Sprite>{
    private _sprite: T;

    get sprite(){
        return this._sprite;
    }
}