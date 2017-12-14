/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Context = exports.lowSpeed = exports.mediumSpeed = exports.highSpeed = exports.paint = exports.startB = exports.startR = exports.racket = exports.ball = undefined;

var _animation = __webpack_require__(3);

var _sound = __webpack_require__(1);

var _bonuse = __webpack_require__(4);

var _levels = __webpack_require__(6);

// Description of object of ball
var ball = {
    posX: 450,
    posY: 493,
    speedX: 0,
    speedY: -5,
    radius: 7
};

// Change speed ball
var speedBall = -5;

var highSpeed = function highSpeed() {
    speedBall = -6;
    ball.speedY = -6;
};

var mediumSpeed = function mediumSpeed() {
    speedBall = -5;
    ball.speedY = -5;
};

var lowSpeed = function lowSpeed() {
    speedBall = -4;
    ball.speedY = -4;
};

// Description of object of racket
var racketWidth = 100;

var racket = {
    posX: 400,
    posY: 500,
    width: racketWidth,
    height: 12,
    speed: 15
};

// Description of object of brick
var brick = {
    width: 89,
    height: 18,
    rows: 10,
    cols: 10,
    padding: 1
};

// Colors of bricks
var colors = ['magenta', 'blueviolet', 'dodgerblue', 'lightskyblue', 'darkgrey', 'orange', 'limegreen', 'yellow', 'lightgrey', 'red'];

var activeBonuce = [];
var wrap = document.querySelector('.wrapper');

// Initilization of Canvas
var Canvas = document.createElement('canvas');
var Context = Canvas.getContext('2d');
Canvas.width = 900;
Canvas.height = 520;
wrap.appendChild(Canvas);
var widthCN = Canvas.width;
var heightCN = Canvas.height;

var lifes = 3;
var row = void 0;
var col = void 0;
var arr = Array.from(_levels.level1);
var myStop = void 0;
var score = 0;

// Function of drawing objects
var paint = function paintBricks() {
    Context.clearRect(0, 0, Canvas.width, Canvas.height);
    Context.font = '24px serif';
    Context.fillStyle = 'silver';
    Context.fillText('Score: ' + score, 10, 320);
    Context.fillText('Lifes: ' + lifes, 10, 350);

    // Position of bonuces
    _bonuse.bonLife.posY += _bonuse.bonLife.speed;
    _bonuse.bonLife2.posY += _bonuse.bonLife2.speed;
    _bonuse.bonLife3.posY += _bonuse.bonLife3.speed;
    _bonuse.bonLife4.posY += _bonuse.bonLife4.speed;
    _bonuse.bonWidth.posY += _bonuse.bonWidth.speed;
    _bonuse.bonWidth2.posY += _bonuse.bonWidth2.speed;
    _bonuse.bonWidth3.posY += _bonuse.bonWidth3.speed;
    _bonuse.bonWidth4.posY += _bonuse.bonWidth4.speed;
    (0, _bonuse.paintBonuce)();

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
    for (var i = 0; i < brick.rows; i += 1) {
        for (var j = 0; j < brick.cols; j += 1) {
            Context.fillStyle = colors[i];
            if (arr[i][j] === 1) {
                Context.fillRect(j * (brick.width + brick.padding), i * (brick.height + brick.padding), brick.width, brick.height);
                Context.strokeRect(j * (brick.width + brick.padding), i * (brick.height + brick.padding), brick.width, brick.height);
            };

            if (arr[i][j] === 2) {
                Context.fillStyle = 'grey';
                Context.fillRect(j * (brick.width + brick.padding), i * (brick.height + brick.padding), brick.width, brick.height);
                Context.strokeRect(j * (brick.width + brick.padding), i * (brick.height + brick.padding), brick.width, brick.height);
            };
        };
    };
};

// Function of drawing of racket
var startR = function startRacket() {
    Context.clearRect(0, 400, 900, 120);
    Context.fillStyle = 'silver';
    Context.fillRect(racket.posX, racket.posY, racket.width, racket.height);
    Context.fillStyle = 'green';
    Context.beginPath();
    Context.arc(ball.posX, ball.posY, ball.radius, 0, Math.PI * 2, true);
    Context.fill();
};

// Function of drawing of ball
var startB = function startBall() {
    _sound.soundT.play();
    ball.speedY = speedBall;
    myStop = (0, _animation.RequestAnimationFrame)(game);
};

// Functions for restart game
var restart = function restart() {
    _sound.soundT.currentTime = 0;
    _sound.soundT.pause();
    arr.forEach(function (item) {
        return item.fill(1);
    });
    arr[4].fill(2);
    arr[8].fill(2);
    Context.clearRect(0, 0, Canvas.width, Canvas.height);
    Context.fillStyle = 'silver';
    Context.fillText('You score is: ' + score + '. Restart game.', 260, 120);
    score = 0;
    lifes = 3;
};

var startPosition = function startPosition() {
    ball.speedY = 0;
    ball.speedX = 0;
    ball.posX = 450;
    ball.posY = 493;
    racket.posX = 400;
    racket.posY = 500;
    racket.width = racketWidth;
    _bonuse.bonLife.posY = 188;
    _bonuse.bonLife2.posY = 150;
    _bonuse.bonLife3.posY = 150;
    _bonuse.bonLife4.posY = 110;
    _bonuse.bonWidth.posY = 188;
    _bonuse.bonWidth2.posY = 148;
    _bonuse.bonWidth3.posY = 73;
    _bonuse.bonWidth4.posY = 73;
    _bonuse.bonLife.speed = 0;
    _bonuse.bonLife2.speed = 0;
    _bonuse.bonLife3.speed = 0;
    _bonuse.bonLife4.speed = 0;
    _bonuse.bonWidth.speed = 0;
    _bonuse.bonWidth2.speed = 0;
    _bonuse.bonWidth3.speed = 0;
    _bonuse.bonWidth4.speed = 0;
};

// Function of mechanic of game
var game = function Tick() {
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
    if (_bonuse.bonLife.posY === racket.posY && _bonuse.bonLife.posX > racket.posX && _bonuse.bonLife.posX < racket.posX + racket.width) {
        _bonuse.bonLife.speed = 10;
        _sound.soundBonuce.play();
        lifes = lifes + 1;
    };

    if (_bonuse.bonLife2.posY === racket.posY && _bonuse.bonLife2.posX > racket.posX && _bonuse.bonLife2.posX < racket.posX + racket.width) {
        _bonuse.bonLife2.speed = 10;
        _sound.soundBonuce.play();
        lifes = lifes + 1;
    };

    if (_bonuse.bonLife3.posY === racket.posY && _bonuse.bonLife3.posX > racket.posX && _bonuse.bonLife3.posX < racket.posX + racket.width) {
        _bonuse.bonLife3.speed = 10;
        _sound.soundBonuce.play();
        lifes = lifes - 1;
    };

    if (_bonuse.bonLife4.posY === racket.posY && _bonuse.bonLife4.posX > racket.posX && _bonuse.bonLife4.posX < racket.posX + racket.width) {
        _bonuse.bonLife4.speed = 10;
        _sound.soundBonuce.play();
        lifes = lifes - 1;
    };

    if (_bonuse.bonWidth.posY === racket.posY && _bonuse.bonWidth.posX > racket.posX && _bonuse.bonWidth.posX < racket.posX + racket.width) {
        _bonuse.bonWidth.speed = 10;
        _sound.soundBonuce.play();
        racket.width = 150;
    };

    if (_bonuse.bonWidth2.posY === racket.posY && _bonuse.bonWidth2.posX > racket.posX && _bonuse.bonWidth2.posX < racket.posX + racket.width) {
        _bonuse.bonWidth2.speed = 10;
        _sound.soundBonuce.play();
        racket.width = 150;
    };

    if (_bonuse.bonWidth3.posY === racket.posY && _bonuse.bonWidth3.posX > racket.posX && _bonuse.bonWidth3.posX < racket.posX + racket.width) {
        _bonuse.bonWidth3.speed = 10;
        _sound.soundBonuce.play();
        racket.width = 50;
    };

    if (_bonuse.bonWidth4.posY === racket.posY && _bonuse.bonWidth3.posX > racket.posX && _bonuse.bonWidth4.posX < racket.posX + racket.width) {
        _bonuse.bonWidth4.speed = 10;
        _sound.soundBonuce.play();
        racket.width = 50;
    };

    // Mechanic ball with bottom
    if (ball.posY + ball.radius > heightCN && lifes > 0) {
        _sound.soundBoom.play();
        ball.speedY = 0;
        ball.speedX = 0;
        ball.posX = 450;
        ball.posY = 493;
        racket.posX = 400;
        racket.posY = 500;
        lifes -= 1;
        racket.width = racketWidth;
        activeBonuce.forEach(function (item) {
            return item.posY = 1000;
        });
        paint();

        if (lifes === 0) {
            restart();
            startPosition();
            (0, _animation.NewCancelAnimationFrame)(myStop);
        };
        return false;
    };

    // Mechanic ball with racket
    if (ball.posY + ball.radius > racket.posY && ball.posX + ball.radius > racket.posX && ball.posX - ball.radius < racket.posX + racket.width) {
        ball.speedY = -ball.speedY;
        _sound.soundR.play();
        ball.speedX = 6 * (ball.posX - (racket.posX + racket.width / 2)) / racket.width;
    };

    row = Math.floor(ball.posY / (brick.height + brick.padding));
    col = Math.floor(ball.posX / (brick.width + brick.padding));

    // Mechanic delete of bricks
    if (ball.posY < 190 && arr[row][col] >= 1) {
        arr[row][col] -= 1;
        _sound.soundB.play();
        ball.speedY = -ball.speedY;
        if (arr[row][col] === 0) {
            score += 1;
        };

        if (row === 9 && col === 1) {
            _bonuse.bonLife.speed = 1;
            activeBonuce.push(_bonuse.bonLife);
        };

        if (row === 7 && col === 7) {
            _bonuse.bonLife2.speed = 1;
            activeBonuce.push(_bonuse.bonLife2);
        };

        if (row === 7 && col === 3) {
            _bonuse.bonLife3.speed = 1;
            activeBonuce.push(_bonuse.bonLife3);
        };

        if (row === 5 && col === 5) {
            _bonuse.bonLife4.speed = 1;
            activeBonuce.push(_bonuse.bonLife4);
        };

        if (row === 9 && col === 4) {
            _bonuse.bonWidth.speed = 1;
            activeBonuce.push(_bonuse.bonWidth);
        };

        if (row === 7 && col === 1) {
            _bonuse.bonWidth2.speed = 1;
            activeBonuce.push(_bonuse.bonWidth2);
        };

        if (row === 3 && col === 7) {
            _bonuse.bonWidth3.speed = 1;
            activeBonuce.push(_bonuse.bonWidth3);
        };

        if (row === 3 && col === 2) {
            _bonuse.bonWidth4.speed = 1;
            activeBonuce.push(_bonuse.bonWidth4);
        };

        if (score === 100) {
            _sound.soundT.pause();
            arr = _levels.level2;
            (0, _animation.NewCancelAnimationFrame)(myStop);
            startPosition();
            paint();
            return false;
        };

        if (score === 164) {
            restart();
            startPosition();
            (0, _animation.NewCancelAnimationFrame)(myStop);
            return false;
        };
    };

    paint();
    (0, _animation.RequestAnimationFrame)(game);
};

exports.ball = ball;
exports.racket = racket;
exports.startR = startR;
exports.startB = startB;
exports.paint = paint;
exports.highSpeed = highSpeed;
exports.mediumSpeed = mediumSpeed;
exports.lowSpeed = lowSpeed;
exports.Context = Context;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// Audio files, volume level
var soundT = new Audio('sound/sound.mp3');
soundT.volume = 0.2;

var soundR = new Audio('sound/racket.wav');
soundR.volume = 1.0;

var soundB = new Audio('sound/block.wav');
soundB.volume = 1.0;

var soundBoom = new Audio('sound/boom.wav');
soundBoom.volume = 1.0;

var soundBonuce = new Audio('sound/bonuce.wav');
soundBonuce.volume = 1.0;

exports.soundT = soundT;
exports.soundR = soundR;
exports.soundB = soundB;
exports.soundBoom = soundBoom;
exports.soundBonuce = soundBonuce;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.controlMouse = exports.controlKeyboard = exports.startGame = undefined;

var _game = __webpack_require__(0);

var spaceBar = 32;
var leftArrow = 37;
var rightArrow = 39;
var ballStartPos = 493;
var canvasWidth = 900;
var mouseLeft = 49;
var mouseRight = 855;

// Function to start game
var startGame = function startGame(event) {
    var x = event.keyCode;
    if (x === spaceBar && _game.ball.posY === ballStartPos) {
        (0, _game.startB)();
    };
};

// Functions of control
var controlKeyboard = function controlKeyboard(event) {
    var x = event.keyCode;
    if (x === leftArrow && _game.racket.posX > 0) {
        _game.racket.posX -= _game.racket.speed;

        if (_game.ball.posY === ballStartPos) {
            _game.ball.posX -= _game.racket.speed;
        };
        (0, _game.startR)();
    }

    if (x === rightArrow && _game.racket.posX + _game.racket.width < canvasWidth) {
        _game.racket.posX += _game.racket.speed;
        if (_game.ball.posY === ballStartPos) {
            _game.ball.posX += _game.racket.speed;
        };
        (0, _game.startR)();
    };
};

var controlMouse = function controlMouse(event) {
    var x = event.offsetX;
    if (x > mouseLeft && x < mouseRight) {
        _game.racket.posX = x - _game.racket.width / 2;
        if (_game.ball.posY === ballStartPos) {
            _game.ball.posX = x;
        };
        (0, _game.startR)();
    } else {
        return false;
    };
};

exports.startGame = startGame;
exports.controlKeyboard = controlKeyboard;
exports.controlMouse = controlMouse;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// Variables for animation and cnael animation
var RequestAnimationFrame = window.requestAnimationFrame;
var NewCancelAnimationFrame = window.cancelAnimationFrame;

exports.RequestAnimationFrame = RequestAnimationFrame;
exports.NewCancelAnimationFrame = NewCancelAnimationFrame;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bonWidth4 = exports.bonWidth3 = exports.bonWidth2 = exports.bonWidth = exports.bonLife4 = exports.bonLife3 = exports.bonLife2 = exports.bonLife = exports.paintBonuce = undefined;

var _game = __webpack_require__(0);

var bonLife = {
    posX: 130,
    posY: 188,
    speed: 0
};

var bonLife2 = {
    posX: 670,
    posY: 150,
    speed: 0
};

var bonLife3 = {
    posX: 310,
    posY: 150,
    speed: 0
};

var bonLife4 = {
    posX: 490,
    posY: 110,
    speed: 0
};

var bonWidth = {
    posX: 390,
    posY: 188,
    speed: 0
};

var bonWidth2 = {
    posX: 120,
    posY: 148,
    speed: 0
};

var bonWidth3 = {
    posX: 660,
    posY: 73,
    speed: 0
};

var bonWidth4 = {
    posX: 212,
    posY: 73,
    speed: 0
};

var paintBonuce = function paintBonLife() {
    _game.Context.beginPath();
    _game.Context.fillStyle = 'green';
    _game.Context.font = '700 26px Arial';
    _game.Context.fillText('L', bonLife.posX, bonLife.posY);
    _game.Context.fillText('L', bonLife2.posX, bonLife2.posY);
    _game.Context.fillText('W', bonWidth.posX, bonWidth.posY);
    _game.Context.fillText('W', bonWidth2.posX, bonWidth2.posY);
    _game.Context.fillStyle = 'red';
    _game.Context.fillText('L', bonLife3.posX, bonLife3.posY);
    _game.Context.fillText('L', bonLife4.posX, bonLife4.posY);
    _game.Context.fillText('W', bonWidth3.posX, bonWidth3.posY);
    _game.Context.fillText('W', bonWidth4.posX, bonWidth4.posY);
};

exports.paintBonuce = paintBonuce;
exports.bonLife = bonLife;
exports.bonLife2 = bonLife2;
exports.bonLife3 = bonLife3;
exports.bonLife4 = bonLife4;
exports.bonWidth = bonWidth;
exports.bonWidth2 = bonWidth2;
exports.bonWidth3 = bonWidth3;
exports.bonWidth4 = bonWidth4;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _game = __webpack_require__(0);

var _input = __webpack_require__(2);

var _sound = __webpack_require__(1);

var controlSettings = document.querySelector('.control');
var mouse = document.getElementById('mouse');
var controlSpeed = document.querySelector('.speed');
var highSpeedControl = document.getElementById('high');
var mediumSpeedControl = document.getElementById('medium');
var controlSound = document.querySelector('.sound');
var soundOn = document.getElementById('sound-on');
var restart = document.getElementById('restart');

window.addEventListener('load', _game.paint);
window.addEventListener('keydown', _input.startGame);
window.addEventListener('keydown', _input.controlKeyboard);

controlSettings.addEventListener('click', function () {
    if (keyboard.checked) {
        window.addEventListener('keydown', _input.controlKeyboard);
        window.removeEventListener('mousemove', _input.controlMouse);
    } else {
        window.addEventListener('mousemove', _input.controlMouse);
        window.removeEventListener('keydown', _input.controlKeyboard);
    };
});

controlSpeed.addEventListener('click', function () {
    if (highSpeedControl.checked) {
        (0, _game.highSpeed)();
    } else if (mediumSpeedControl.checked) {
        (0, _game.mediumSpeed)();
    } else {
        (0, _game.lowSpeed)();
    };
});

controlSound.addEventListener('click', function () {
    if (soundOn.checked) {
        _sound.soundT.volume = 0.2;
        _sound.soundR.volume = 1.0;
        _sound.soundB.volume = 1.0;
        _sound.soundBoom.volume = 1.0;
    } else {
        _sound.soundT.volume = 0;
        _sound.soundR.volume = 0;
        _sound.soundB.volume = 0;
        _sound.soundBoom.volume = 0;
        _sound.soundBonuce.volume = 0;
    };
});

restart.addEventListener('click', function () {
    (0, _game.paint)();
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var level1 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [2, 2, 2, 2, 2, 2, 2, 2, 2, 2], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

var level2 = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 2, 2, 2, 2, 2, 2, 2, 2, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 0], [0, 2, 2, 2, 2, 2, 2, 2, 2, 0], [0, 1, 1, 1, 1, 1, 1, 1, 1, 0]];

exports.level1 = level1;
exports.level2 = level2;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map