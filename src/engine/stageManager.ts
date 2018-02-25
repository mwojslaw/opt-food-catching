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
        stage: StageConstructor,
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

    static addStage(id: string, stage: new () => Stage){
        this.stages = [...this.stages, {
            id,
            stage
        }];

        return this;
    }

    static goToStage(id: string){
        if(this.activeStage)
            this.activeStage.onDestroy();
            
        const stageConstructor = this.stages.find(s => s.id === id).stage;
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