import {
    paint,
    highSpeed,
    mediumSpeed,
    lowSpeed
} from './game.js';

import {
    startGame,
    controlKeyboard,
    controlMouse
} from './input.js';

import {
    soundT,
    soundR,
    soundB,
    soundBoom,
    soundBonuce
} from './sound.js';


const controlSettings = document.querySelector('.control');
const mouse = document.getElementById('mouse');
const controlSpeed = document.querySelector('.speed');
const highSpeedControl = document.getElementById('high');
const mediumSpeedControl = document.getElementById('medium');
const controlSound = document.querySelector('.sound');
const soundOn = document.getElementById('sound-on');
const restart = document.getElementById('restart');

window.addEventListener('load', paint);
window.addEventListener('keydown', startGame);
window.addEventListener('keydown', controlKeyboard);


controlSettings.addEventListener('click', () => {
    if (keyboard.checked) {
        window.addEventListener('keydown', controlKeyboard);
        window.removeEventListener('mousemove', controlMouse);
    } else {
        window.addEventListener('mousemove', controlMouse);
        window.removeEventListener('keydown', controlKeyboard);
    };
});

controlSpeed.addEventListener('click', () => {
    if (highSpeedControl.checked) {
        highSpeed();
    } else if (mediumSpeedControl.checked) {
        mediumSpeed();
    } else {
        lowSpeed();
    };
});

controlSound.addEventListener('click', () => {
    if (soundOn.checked) {
        soundT.volume = 0.2;
        soundR.volume = 1.0;
        soundB.volume = 1.0;
        soundBoom.volume = 1.0;
    } else {
        soundT.volume = 0;
        soundR.volume = 0;
        soundB.volume = 0;
        soundBoom.volume = 0;
        soundBonuce.volume = 0;
    };
});

restart.addEventListener('click', () => {
    paint();
});

