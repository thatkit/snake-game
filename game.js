const init = () => window.requestAnimationFrame(draw);

/* Global Variables */

const stepSize = 50; // the size of the snake units as well as the size of snake's steps 
let timing = 500; // the speed of the snake
const tailColor = 'rgba(255, 210, 0, 1)';

/* Snake Body */

// Snake Square Units Class

class snakeUnit {
    constructor(x, y) {
        this._x = x;
        this._y = y;
        this._width = stepSize;
        this._height = stepSize;
        this._direction = undefined;
    }

    get x() {
        return this._x;
    }
    
    get y() {
        return this._y;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get direction() {
        return this._direction;
    }

    set x(val) {
        this._x += val;
    }

    set y(val) {
        this._y += val;
    }

    set direction(val) {
        this._direction = val;
    }

    makeStep() {
        switch(this._direction) {
            case undefined:
                break;
            case 'left':
                this._x -= stepSize;
                break;
            case 'right':
                this._x += stepSize;
                break;
            case 'top':
                this._y -= stepSize;
                break;
            case 'bot':
                this._y += stepSize;
                break;
        }
    }
}

// Snake Head Instance

const snakeHead = new snakeUnit(stepSize, stepSize);
snakeHead.fillColor = 'rgba(255, 0, 0, 1)';

// Snake Tail Subclass

class snakeTail extends snakeUnit {
    constructor(x, y) {
        super(x, y);
        this._width = stepSize;
        this._height = stepSize;
        this._direction = undefined;
    }
}

// Snake Tail Instances

const tail1 = new snakeTail(snakeHead.x, snakeHead.y);

const snakeArr = [];
snakeArr.push(snakeHead);
snakeArr.push(tail1);

const setDirection = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
        arr[i].direction = arr[i - 1].direction;
    }
}

let timeoutID;
const runMakeStep = () => {
    snakeHead.makeStep();
    tail1.makeStep();
    setDirection(snakeArr);
    timeoutID = setTimeout(runMakeStep, timing);
}

/* Canvas Frame Drawing */

const draw = () => {
    const ctx = document.getElementById('canvas').getContext('2d');
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, 800, 800);

    ctx.fillStyle = snakeHead.fillColor;
    ctx.fillRect(snakeHead.x, snakeHead.y, snakeHead.width, snakeHead.height);

    ctx.fillStyle = tailColor;
    ctx.fillRect(tail1.x, tail1.y, tail1.width, tail1.height);

    window.requestAnimationFrame(draw);
}

init();

/* Keyboard Controls */

window.addEventListener('keydown', function (event) {
    switch (event.key) {
        case "ArrowLeft":
            snakeHead.direction = 'left';
            break;
        case "ArrowRight":
            snakeHead.direction = 'right';
            break;
        case "ArrowUp":
            snakeHead.direction = 'top';
            break;
        case "ArrowDown":
            snakeHead.direction = 'bot';
            break;
    }

    clearTimeout(timeoutID);
    runMakeStep();
});