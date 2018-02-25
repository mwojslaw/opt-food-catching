import { Container, Text, DisplayObject} from "pixi.js";

abstract class Stage extends Container{
    paused: boolean;

    constructor(){
        super();
    }

    abstract onUpdate(): void;
}

export default Stage;