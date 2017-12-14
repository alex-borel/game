import {
    RequestAnimationFrame,
    NewCancelAnimationFrame,
} from './animation.js';

import {
    soundT,
    soundR,
    soundB,
    soundBoom,
    soundBonuce
} from './sound.js';

import {
    paintBonuce,
    bonLife,
    bonLife2,
    bonLife3,
    bonLife4,
    bonWidth,
    bonWidth2,
    bonWidth3,
    bonWidth4
} from './bonuse.js';

import {
    level1,
    level2
} from './levels.js';

// Description of object of ball
const ball = {
    posX: 450,
    posY: 493,
    speedX: 0,
    speedY: -5,
    radius: 7,
};

// Change speed ball
let speedBall = -5;

const highSpeed = function highSpeed() {
    speedBall = -6;
    ball.speedY = -6;
};

const mediumSpeed = function mediumSpeed() {
    speedBall = -5;
    ball.speedY = -5;
};

const lowSpeed = function lowSpeed() {
    speedBall = -4;
    ball.speedY = -4;
};

// Description of object of racket
const racketWidth = 100;

const racket = {
    posX: 400,
    posY: 500,
    width: racketWidth,
    height: 12,
    speed: 15,
};

// Description of object of brick
const brick = {
    width: 89,
    height: 18,
    rows: 10,
    cols: 10,
    padding: 1,
};

// Colors of bricks
const colors = ['magenta', 'blueviolet', 'dodgerblue', 'lightskyblue', 'darkgrey', 'orange', 'limegreen', 'yellow', 'lightgrey', 'red'];

let activeBonuce = [];
const wrap = document.querySelector('.wrapper');


// Initilization of Canvas
const Canvas = document.createElement('canvas');
const Context = Canvas.getContext('2d');
Canvas.width = 900;
Canvas.height = 520;
wrap.appendChild(Canvas);
const widthCN = Canvas.width;
const heightCN = Canvas.height;

let lifes = 3;
let row;
let col;
let arr = Array.from(level1);
let myStop;
let score = 0;

// Function of drawing objects
const paint = function paintBricks() {
    Context.clearRect(0, 0, Canvas.width, Canvas.height);
    Context.font = '24px serif';
    Context.fillStyle = 'silver';
    Context.fillText(`Score: ${score}`, 10, 320);
    Context.fillText(`Lifes: ${lifes}`, 10, 350);

    // Position of bonuces
    bonLife.posY += bonLife.speed;
    bonLife2.posY += bonLife2.speed;
    bonLife3.posY += bonLife3.speed;
    bonLife4.posY += bonLife4.speed;
    bonWidth.posY += bonWidth.speed;
    bonWidth2.posY += bonWidth2.speed;
    bonWidth3.posY += bonWidth3.speed;
    bonWidth4.posY += bonWidth4.speed;
    paintBonuce();

    // Draw ball when loading screen
    Context.fillStyle = 'green';
    Context.beginPath();
    Context.arc(ball.posX, ball.posY, ball.radius, 0, Math.PI * 2, true);
    Context.fill();

    // Draw racket when loading screen
    Context.fillStyle = 'silver';
    Context.fillRect(racket.posX, racket.posY, racket.width, racket.height);

    // Draw bricks when loading screen
    Context.strokeStyle = 'silver';
    for (let i = 0; i < brick.rows; i += 1) {
        for (let j = 0; j < brick.cols; j += 1) {
            Context.fillStyle = colors[i];
            if (arr[i][j] === 1) {
                Context.fillRect(j * (brick.width + brick.padding), i * (brick.height +
                    brick.padding), brick.width, brick.height);
                Context.strokeRect(j * (brick.width + brick.padding), i * (brick.height +
                    brick.padding), brick.width, brick.height);
            };

            if (arr[i][j] === 2) {
                Context.fillStyle = 'grey';
                Context.fillRect(j * (brick.width + brick.padding), i * (brick.height +
                    brick.padding), brick.width, brick.height);
                Context.strokeRect(j * (brick.width + brick.padding), i * (brick.height +
                    brick.padding), brick.width, brick.height);
            };
        };
    };
};

// Function of drawing of racket
const startR = function startRacket() {
    Context.clearRect(0, 400, 900, 120);
    Context.fillStyle = 'silver';
    Context.fillRect(racket.posX, racket.posY, racket.width, racket.height);
    Context.fillStyle = 'green';
    Context.beginPath();
    Context.arc(ball.posX, ball.posY, ball.radius, 0, Math.PI * 2, true);
    Context.fill();
};

// Function of drawing of ball
const startB = function startBall() {
    soundT.play();
    ball.speedY = speedBall;
    myStop = RequestAnimationFrame(game);
};

// Functions for restart game
const restart = function restart() {
    soundT.currentTime = 0;
    soundT.pause();
    arr.forEach(item => item.fill(1));
    arr[4].fill(2);
    arr[8].fill(2);
    Context.clearRect(0, 0, Canvas.width, Canvas.height);
    Context.fillStyle = 'silver';
    Context.fillText(`You score is: ${score}. Restart game.`, 260, 120);
    score = 0;
    lifes = 3;
};

const startPosition = function startPosition() {
    ball.speedY = 0;
    ball.speedX = 0;
    ball.posX = 450;
    ball.posY = 493;
    racket.posX = 400;
    racket.posY = 500;
    racket.width = racketWidth;
    bonLife.posY = 188;
    bonLife2.posY = 150;
    bonLife3.posY = 150;
    bonLife4.posY = 110;
    bonWidth.posY = 188;
    bonWidth2.posY = 148;
    bonWidth3.posY = 73;
    bonWidth4.posY = 73;
    bonLife.speed = 0;
    bonLife2.speed = 0;
    bonLife3.speed = 0;
    bonLife4.speed = 0;
    bonWidth.speed = 0;
    bonWidth2.speed = 0;
    bonWidth3.speed = 0;
    bonWidth4.speed = 0;
};

// Function of mechanic of game
const game = function Tick() {
    Context.clearRect(0, 0, widthCN, heightCN);
    ball.posX += ball.speedX;
    ball.posY += ball.speedY;

    // Mechanic ball with walls
    if (ball.posX + ball.radius > widthCN || ball.posX - ball.radius < 0) {
        ball.speedX = -ball.speedX;
    };

    if (ball.posY - ball.radius < 0) {
        ball.speedY = -ball.speedY;
    };

    // Mechanic with items of bonuce
    if ((bonLife.posY === racket.posY) && (bonLife.posX > racket.posX && bonLife.posX < racket.posX + racket.width)) {
        bonLife.speed = 10;
        soundBonuce.play();
        lifes = lifes + 1;
    };

    if ((bonLife2.posY === racket.posY) && (bonLife2.posX > racket.posX && bonLife2.posX < racket.posX + racket.width)) {
        bonLife2.speed = 10;
        soundBonuce.play();
        lifes = lifes + 1;
    };

    if ((bonLife3.posY === racket.posY) && (bonLife3.posX > racket.posX && bonLife3.posX < racket.posX + racket.width)) {
        bonLife3.speed = 10;
        soundBonuce.play();
        lifes = lifes - 1;
    };

    if ((bonLife4.posY === racket.posY) && (bonLife4.posX > racket.posX && bonLife4.posX < racket.posX + racket.width)) {
        bonLife4.speed = 10;
        soundBonuce.play();
        lifes = lifes - 1;
    };

    if ((bonWidth.posY === racket.posY) && (bonWidth.posX > racket.posX && bonWidth.posX < racket.posX + racket.width)) {
        bonWidth.speed = 10;
        soundBonuce.play();
        racket.width = 150;
    };

    if ((bonWidth2.posY === racket.posY) && (bonWidth2.posX > racket.posX && bonWidth2.posX < racket.posX + racket.width)) {
        bonWidth2.speed = 10;
        soundBonuce.play();
        racket.width = 150;
    };

    if ((bonWidth3.posY === racket.posY) && (bonWidth3.posX > racket.posX && bonWidth3.posX < racket.posX + racket.width)) {
        bonWidth3.speed = 10;
        soundBonuce.play();
        racket.width = 50;
    };

    if ((bonWidth4.posY === racket.posY) && (bonWidth3.posX > racket.posX && bonWidth4.posX < racket.posX + racket.width)) {
        bonWidth4.speed = 10;
        soundBonuce.play();
        racket.width = 50;
    };

    // Mechanic ball with bottom
    if (ball.posY + ball.radius > heightCN && lifes > 0) {
        soundBoom.play();
        ball.speedY = 0;
        ball.speedX = 0;
        ball.posX = 450;
        ball.posY = 493;
        racket.posX = 400;
        racket.posY = 500;
        lifes -= 1;
        racket.width = racketWidth;
        activeBonuce.forEach(item => item.posY = 1000);
        paint();

        if (lifes === 0) {
            restart();
            startPosition();
            NewCancelAnimationFrame(myStop);
        };
        return false;
    };

    // Mechanic ball with racket
    if ((ball.posY + ball.radius > racket.posY) && ((ball.posX +
            ball.radius > racket.posX) && (ball.posX - ball.radius < racket.posX + racket.width))) {
        ball.speedY = -ball.speedY;
        soundR.play();
        ball.speedX = 6 * (ball.posX - (racket.posX + racket.width / 2)) / racket.width;
    };

    row = Math.floor(ball.posY / (brick.height + brick.padding));
    col = Math.floor(ball.posX / (brick.width + brick.padding));

    // Mechanic delete of bricks
    if (ball.posY < 190 && arr[row][col] >= 1) {
        arr[row][col] -= 1;
        soundB.play();
        ball.speedY = -ball.speedY;
        if (arr[row][col] === 0) {
            score += 1;
        };

        if (row === 9 && col === 1) {
            bonLife.speed = 1;
            activeBonuce.push(bonLife);
        };

        if (row === 7 && col === 7) {
            bonLife2.speed = 1;
            activeBonuce.push(bonLife2);
        };

        if (row === 7 && col === 3) {
            bonLife3.speed = 1;
            activeBonuce.push(bonLife3);
        };

        if (row === 5 && col === 5) {
            bonLife4.speed = 1;
            activeBonuce.push(bonLife4);
        };

        if (row === 9 && col === 4) {
            bonWidth.speed = 1;
            activeBonuce.push(bonWidth);
        };

        if (row === 7 && col === 1) {
            bonWidth2.speed = 1;
            activeBonuce.push(bonWidth2);
        };

        if (row === 3 && col === 7) {
            bonWidth3.speed = 1;
            activeBonuce.push(bonWidth3);
        };

        if (row === 3 && col === 2) {
            bonWidth4.speed = 1;
            activeBonuce.push(bonWidth4);
        };

        if (score === 100) {
            soundT.pause();
            arr = level2;
            NewCancelAnimationFrame(myStop);
            startPosition();
            paint();
            return false;
        };

        if (score === 164) {
            restart();
            startPosition();
            NewCancelAnimationFrame(myStop);
            return false;
        };
    };

    paint();
    RequestAnimationFrame(game);
};

export {
    ball,
    racket,
    startR,
    startB,
    paint,
    highSpeed,
    mediumSpeed,
    lowSpeed,
    Context
};

