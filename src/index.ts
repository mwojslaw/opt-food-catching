import "normalize.css";
import "./index.css";

import Game from "./game";

const game = new Game(
    document.getElementById("root"), 
    500, 
    500,
);
