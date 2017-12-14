import {
    Context
} from './game.js';

const bonLife = {
    posX: 130,
    posY: 188,
    speed: 0,
};

const bonLife2 = {
    posX: 670,
    posY: 150,
    speed: 0,
};

const bonLife3 = {
    posX: 310,
    posY: 150,
    speed: 0
};

const bonLife4 = {
    posX: 490,
    posY: 110,
    speed: 0
};

const bonWidth = {
    posX: 390,
    posY: 188,
    speed: 0
};

const bonWidth2 = {
    posX: 120,
    posY: 148,
    speed: 0
};

const bonWidth3 = {
    posX: 660,
    posY: 73,
    speed: 0
};

const bonWidth4 = {
    posX: 212,
    posY: 73,
    speed: 0
};

const paintBonuce = function paintBonLife() {
    Context.beginPath();
    Context.fillStyle = 'green';
    Context.font = '700 26px Arial';
    Context.fillText(`L`, bonLife.posX, bonLife.posY);
    Context.fillText(`L`, bonLife2.posX, bonLife2.posY);
    Context.fillText('W', bonWidth.posX, bonWidth.posY);
    Context.fillText('W', bonWidth2.posX, bonWidth2.posY);
    Context.fillStyle = 'red';
    Context.fillText(`L`, bonLife3.posX, bonLife3.posY);
    Context.fillText(`L`, bonLife4.posX, bonLife4.posY);
    Context.fillText('W', bonWidth3.posX, bonWidth3.posY);
    Context.fillText('W', bonWidth4.posX, bonWidth4.posY);
};

export {
    paintBonuce,
    bonLife,
    bonLife2,
    bonLife3,
    bonLife4,
    bonWidth,
    bonWidth2,
    bonWidth3,
    bonWidth4,

};

