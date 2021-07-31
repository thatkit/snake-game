import * as fun from './functions.js';

// Canvas Context & Sizing
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.setAttribute('width', fun.getDivisibleNum(window.innerWidth));
canvas.setAttribute('height', fun.getDivisibleNum(window.innerHeight));

/* (2) Snake Classes */

// Snake Square Units Class

class SnakeUnit {
    constructor(x, y) {
        this._x = x;
        this._y = y;
        this._width = fun.config.stepSize;
        this._height = fun.config.stepSize;
        this._direction = undefined;
    }

    get x() {return this._x}
    get y() {return this._y}

    get width() {return this._width}
    get height() {return this._height}

    get direction() {return this._direction}

    set x(val) {this._x += val}
    set y(val) {this._y += val}

    set direction(val) {this._direction = val}

    makeStep() {
        switch(this._direction) {
            case undefined:
                break;
            case 'left':
                this._x -= fun.config.stepSize;
                break;
            case 'right':
                this._x += fun.config.stepSize;
                break;
            case 'top':
                this._y -= fun.config.stepSize;
                break;
            case 'bot':
                this._y += fun.config.stepSize;
                break;
        }
    }
}

// Snake Head Instance

class SnakeHead extends SnakeUnit {
    constructor(x, y) {
        super(x, y);
        this._width = fun.config.stepSize;
        this._height = fun.config.stepSize;
        this._direction = undefined;
        this.fillColor = '#E02716';
    }

    isInBox() {
        if (this._x >= 0 && this._x <= canvas.width - fun.config.stepSize && this._y >= 0 && this._y <= canvas.height - fun.config.stepSize) {
            return true;
        } else {
            return false;
        }
    }

    hasEatenItself() {
        if (isEatingItself(this.x, this.y)) {
            return true;
        } else {
            return false;
        }
    }

    eatAndGrow() {
        if (this.x === food.x && this.y === food.y) {
            fun.config.counter++;
            let newTailXY = getNewTailXY(fun.config.snakeArr[fun.config.snakeArr.length - 1].x, fun.config.snakeArr[fun.config.snakeArr.length - 1].y, fun.config.snakeArr[fun.config.snakeArr.length - 1].direction);
            window['tail' + fun.config.counter] = new SnakeTail(newTailXY[0], newTailXY[1]);
            fun.config.snakeArr.push(window['tail' + fun.config.counter]);

            Food.spawn(); // Everytime a food is 'eaten' it spawns at a different place
        }
    }

    hasDied() {
        if (!this.isInBox() || this.hasEatenItself()) {
            console.log('Snake is DEAD');
            return true;
        }
    }
}

// Snake Head the Only Instance

const snakeHead = new SnakeHead(fun.getRandomXYSnakeHead()[0], fun.getRandomXYSnakeHead()[1]);

// Snake Tail Subclass

class SnakeTail extends SnakeUnit {
    constructor(x, y) {
        super(x, y);
        this._width = fun.config.stepSize;
        this._height = fun.config.stepSize;
        this._direction = undefined;
        this.fillColor = '#E0C42D';
    }
}

/* (3) Food Class */

class Food {
    constructor(x, y) {
        this._x = x;
        this._y = y;
        this._width = fun.config.stepSize;
        this._height = fun.config.stepSize;
        this.fillColor = '#190BE0';
    }

    static spawn() {
        const foodXYArr = fun.getRandomXYFood();
        food = new Food(foodXYArr[0], foodXYArr[1]);
        return food;
    }

    get x() {return this._x}
    get y() {return this._y}

    get width() {return this._width}
    get height() {return this._height}
}

let food;
const invokeFood = () => {
    const foodXYArr = fun.getRandomXYFood();
    food = new Food(foodXYArr[0], foodXYArr[1]);
}
invokeFood();

/* (4) Unsorted Functions*/

fun.config.snakeArr.push(snakeHead);

const setDirection = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
        arr[i].direction = arr[i -1].direction;
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
        console.log('I can\'t get previous XY and direction');
    }

    newXY.push(newX);
    newXY.push(newY);

    return newXY;
}

const runMakeStep = () => {
    if (!snakeHead.hasDied()) {
        fun.config.snakeArr.forEach(el => el.makeStep());
        setDirection(fun.config.snakeArr);
        snakeHead.eatAndGrow();
    }  
}

// Create a tail array without the head (from config.snakeArr)

const getTailArr = () => {
    if (fun.config.snakeArr[0] === snakeHead) {
        const tailArr = fun.config.snakeArr.slice(1);
        return tailArr;
    }
}

// Is about to eat itself?

const isEatingItself = (x, y) => {
    if (fun.config.snakeArr.length > 3) {
        if (getTailArr().some(el => x === el.x && y === el.y)) {
            return true;
        }
    }
}

/* (5) Canvas Frame Drawing */

const draw = () => {
    // clearing canvas
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // canvas border
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.stroke();
    // snake head
    ctx.lineWidth = 2;
    ctx.strokeRect(snakeHead.x, snakeHead.y, snakeHead.width, snakeHead.height);
    ctx.fillStyle = snakeHead.fillColor;
    ctx.fillRect(snakeHead.x, snakeHead.y, snakeHead.width, snakeHead.height);
    // snake tails
    for (let i = 1; i < fun.config.snakeArr.length; i++) {
        ctx.strokeRect(fun.config.snakeArr[i].x, fun.config.snakeArr[i].y, fun.config.snakeArr[i].width, fun.config.snakeArr[i].height);
        ctx.fillStyle = fun.config.snakeArr[i].fillColor;
        ctx.fillRect(fun.config.snakeArr[i].x, fun.config.snakeArr[i].y, fun.config.snakeArr[i].width, fun.config.snakeArr[i].height);
    }
    // food
    ctx.fillStyle = food.fillColor;
    ctx.fillRect(food.x, food.y, food.width, food.height);
    // loop
    window.requestAnimationFrame(draw);
}

draw();

/* (1) Texts Toggling */

const startText = document.getElementById('start-text');
const backwardsText = document.getElementById('backwards-text');
const eatenItselfText = document.getElementById('eaten-itself-text');
const crossedBorderText = document.getElementById('crossed-border-text');
const victoryText = document.getElementById('victory-text');

const showText = textEl => {
    let textArr = [startText, backwardsText, eatenItselfText, crossedBorderText, victoryText];
    textArr.forEach(el => el.classList.toggle('show', false));
    textEl.classList.add('show');
}

const showBackwardsText = () => {
    showText(backwardsText);
    setTimeout(() => backwardsText.classList.remove('show'), 1000);
}

/* (2) Keyboard Controls */

let intervalID;
const intervalLoop = () => {
    intervalID = setInterval(runMakeStep, fun.config.timing);
}

window.addEventListener('keydown', function (event) {
    clearInterval(intervalID);
    switch (event.key) {
        case "ArrowLeft":
            if (snakeHead.direction !== 'right') {
                snakeHead.direction = 'left';
            } else {
                showBackwardsText();
            }
            break;
        case "ArrowRight":
            if (snakeHead.direction !== 'left') {
                snakeHead.direction = 'right';
            } else {
                showBackwardsText();
            }
            break;
        case "ArrowUp":
            if (snakeHead.direction !== 'bot') {
                snakeHead.direction = 'top';
            } else {
                showBackwardsText();
            }
            break;
        case "ArrowDown":
            if (snakeHead.direction !== 'top') {
                snakeHead.direction = 'bot';
            } else {
                showBackwardsText();
            }
            break;
        case " ": // only for test
            intervalID ? clearInterval(intervalID) : intervalLoop();
            break;
    }

    if (!snakeHead.hasDied()) {
        fun.config.snakeArr.forEach(el => el.makeStep());
        setDirection(fun.config.snakeArr);
        snakeHead.eatAndGrow();
        intervalLoop();
    }
});