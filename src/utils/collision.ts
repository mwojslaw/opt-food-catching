import {
    Sprite
} from "pixi.js"

export const boxesIntersect = (a: Sprite, b: Sprite) => {
  var ab = a.getBounds();
  var bb = b.getBounds();
  return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}