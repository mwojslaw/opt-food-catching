import { 
    WebGLRenderer,
    CanvasRenderer,
    autoDetectRenderer,
    RendererOptions
} from "pixi.js";
import Stage from "./stage";

interface StageConstructor {
    new (): Stage
}

class StageManager {
    static width: number;
    static height: number;
    static renderer: WebGLRenderer | CanvasRenderer;
    static activeStage: Stage;
    static stages: {
        constructor: StageConstructor,
        id: string
    }[] = [];

    static create(root: HTMLElement, width: number, height:number, options?: RendererOptions){
        if (this.renderer) return this;
        
        this.width = width;
        this.height = height;
        this.renderer = autoDetectRenderer(width, height, options);
        this.renderer.view.style.position = "absolute"

        root.appendChild(this.renderer.view);
        requestAnimationFrame(() => this.loop());

        return this;
    }

    static addStage(id: string, constructor: new () => Stage){
        this.stages = [...this.stages, {
            id,
            constructor
        }];

        return this;
    }

    static goToStage(id: string){
        const stage = this.stages.find(s => s.id === id);

        if(!stage)
            throw new Error("stage don't exists");

        if(this.activeStage)
            this.activeStage.onDestroy();
            
        const stageConstructor = stage.constructor;
        this.activeStage = new stageConstructor();

        return this;
    }

    private static loop() {
        requestAnimationFrame(() => this.loop());

        if(this.activeStage.paused) return;

        this.activeStage.onUpdate();
        this.renderer.render(this.activeStage);
    }

}

export default StageManager;