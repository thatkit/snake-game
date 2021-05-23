const init = () => window.requestAnimationFrame(draw);

/* Gloval Variables */

const stepSize = 50; // the size of the snake units as well as the size of snake's steps 
let timing = 500; // the speed of the snake

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

    setDirection(direction) {
        this._direction = direction;
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

let timeoutID;
const runMakeStep = () => {
    snakeHead.makeStep();
    timeoutID = setTimeout(runMakeStep, timing);
}

const snakeHead = new snakeUnit(stepSize, stepSize);
snakeHead.fillColor = 'red';

const draw = () => {
    const ctx = document.getElementById('canvas').getContext('2d');
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, 800, 800);

    ctx.fillStyle = snakeHead.fillColor;
    ctx.fillRect(snakeHead.x, snakeHead.y, snakeHead.width, snakeHead.height);

    window.requestAnimationFrame(draw);
}

init();

/* Keyboard Controls */

window.addEventListener('keydown', function (event) {
    switch (event.key) {
        case "ArrowLeft":
            snakeHead.setDirection('left');
            break;
        case "ArrowRight":
            snakeHead.setDirection('right');
            break;
        case "ArrowUp":
            snakeHead.setDirection('top');
            break;
        case "ArrowDown":
            snakeHead.setDirection('bot');
            break;
    }

    clearTimeout(timeoutID);
    runMakeStep();
});