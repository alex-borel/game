import {
    ball,
    racket,
    startR,
    startB,
} from './game.js';

const spaceBar = 32;
const leftArrow = 37;
const rightArrow = 39;
const ballStartPos = 493;
const canvasWidth = 900;
const mouseLeft = 49;
const mouseRight = 855;

// Function to start game
const startGame = function (event) {
    const x = event.keyCode;
    if (x === spaceBar && ball.posY === ballStartPos) {
        startB();
    };
}

// Functions of control
const controlKeyboard = function controlKeyboard(event) {
    const x = event.keyCode;
    if (x === leftArrow && racket.posX > 0) {
        racket.posX -= racket.speed;

        if (ball.posY === ballStartPos) {
            ball.posX -= racket.speed;
        };
        startR();
    }

    if (x === rightArrow && (racket.posX + racket.width < canvasWidth)) {
        racket.posX += racket.speed;
        if (ball.posY === ballStartPos) {
            ball.posX += racket.speed;
        };
        startR();
    };
};

const controlMouse = function controlMouse(event) {
    const x = event.offsetX;
    if (x > mouseLeft && x < mouseRight) {
        racket.posX = x - racket.width / 2;
        if (ball.posY === ballStartPos) {
            ball.posX = x;
        };
        startR();
    } else {
        return false;
    };
};

export {
    startGame,
    controlKeyboard,
    controlMouse
};

