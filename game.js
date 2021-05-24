const init = () => window.requestAnimationFrame(draw);

/* Global Variables */

const stepSize = 50; // the size of the snake units as well as the size of snake's steps 
let timing = 500; // the speed of the snake
let counter = 0; // counter of snake tails (0 is the head)

/* Snake Body */

// Snake Square Units Class

class SnakeUnit {
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

class SnakeHead extends SnakeUnit {
    constructor(x, y) {
        super(x, y);
        this._width = stepSize;
        this._height = stepSize;
        this._direction = undefined;
        this.fillColor = 'rgba(255, 0, 0, 1)';
    }

    // "Eat" and grow a new tail
    eatAndGrow() {
        console.log(`Look! This head method is working! Check ${this._x} and ${this._y}.`); // just checking if everything works at all
        counter++;
        let newTailXY = getNewTailXY(snakeArr[snakeArr.length - 1].x, snakeArr[snakeArr.length - 1].y, snakeArr[snakeArr.length - 1].direction);
        window['tail' + counter] =  new SnakeTail(newTailXY[0], newTailXY[1]);
        snakeArr.push(window['tail' + counter]);
    }
    
}

// Snake Head the Only Instance

const snakeHead = new SnakeHead(stepSize, stepSize);

// Snake Tail Subclass

class SnakeTail extends SnakeUnit {
    constructor(x, y) {
        super(x, y);
        this._width = stepSize;
        this._height = stepSize;
        this._direction = undefined;
        this.fillColor = 'rgba(255, 210, 0, 1)';
    }
}

const snakeArr = [];
snakeArr.push(snakeHead);

const setDirection = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
        arr[i].direction = arr[i - 1].direction;
    }
}

// Magic function that makes sure new tails are spawned at the correct place

const getNewTailXY = (prevX, prevY, prevDirection) => {
    let newX;
    let newY;
    let newXY = [];

    if (prevDirection === 'left') {
        newX = prevX ;
        newY = prevY;
    } else if (prevDirection === 'right') {
        newX = prevX;
        newY = prevY;
    } else if (prevDirection === 'top') {
        newX = prevX;
        newY = prevY;
    } else if (prevDirection === 'bot') {
        newX = prevX;
        newY = prevY;
    } else {
        console.log('I don\'t work');
    }

    newXY.push(newX);
    newXY.push(newY);

    return newXY;
}

let timeoutID;
const runMakeStep = () => {
    snakeArr.forEach(el => el.makeStep());
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

    for (let i = 1; i < snakeArr.length; i++) {
        ctx.fillStyle = snakeArr[i].fillColor;
        ctx.fillRect(snakeArr[i].x, snakeArr[i].y, snakeArr[i].width, snakeArr[i].height);
    }

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
        case " ":
            snakeHead.eatAndGrow(); // only for test
            break;
    }

    clearTimeout(timeoutID);
    runMakeStep();
});