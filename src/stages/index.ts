import { Container, Text, DisplayObject } from "pixi.js";

export abstract class Stage {
    private _container: Container;
    constructor(){
        this._container = new Container();
    }

    get container(): Container {
        return this._container;
    }

    addChildren(children: DisplayObject[]){
        children.forEach(c => this.container.addChild(c));
    }

    removeChildren(children: DisplayObject[]){
        children.forEach(c => this.container.removeChild(c));
    }

    show(){
        this.container.visible = true;
    }

    hide(){
        this.container.visible = false;
    }

    abstract onUpdate(): void;
}