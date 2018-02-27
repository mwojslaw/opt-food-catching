import "normalize.css";
import "./index.css";
import Game from "./game";
import gameConstants from "constants/game";

const game = new Game(
    document.getElementById("root"),
    gameConstants.width,
    gameConstants.height
);
