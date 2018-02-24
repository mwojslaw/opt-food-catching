import "normalize.css";

import Game from "./game";

const game = new Game(
    document.getElementById("root"), 
    window.innerWidth, 
    window.innerHeight,
);
