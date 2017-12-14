// Audio files, volume level
const soundT = new Audio('sound/sound.mp3');
soundT.volume = 0.2;

const soundR = new Audio('sound/racket.wav');
soundR.volume = 1.0;

const soundB = new Audio('sound/block.wav');
soundB.volume = 1.0;

const soundBoom = new Audio('sound/boom.wav');
soundBoom.volume = 1.0;

const soundBonuce = new Audio('sound/bonuce.wav');
soundBonuce.volume = 1.0;

export {
    soundT,
    soundR,
    soundB,
    soundBoom,
    soundBonuce
};

