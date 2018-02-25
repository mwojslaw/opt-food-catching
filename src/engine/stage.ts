import { Container, Text, DisplayObject} from "pixi.js";

abstract class Stage extends Container{
    paused: boolean;

    constructor(){
        super();
    }

    abstract onUpdate(): void;
    abstract onDestroy(): void;
}

export default Stage;