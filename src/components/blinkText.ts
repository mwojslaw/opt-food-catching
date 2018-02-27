import { Text, TextStyleOptions } from "pixi.js";

class BlinkText extends Text {
    constructor(
        blinkInterval: number,
        text?: string,
        textStyleOptions?: TextStyleOptions
    ) {
        super(text, textStyleOptions);

        setInterval(() => {
            this.visible = !this.visible;
        }, blinkInterval);
    }
}

export default BlinkText;
