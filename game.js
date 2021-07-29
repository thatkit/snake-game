/* (1) Global Variables */

const config = {
    stepSize: 50, // the size of the snake units as well as the size of snake's steps
    timing: 400, // the speed of the snake
    counter: 0, // counter of snake tails (0 is the head)
    snakeArr: []
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Make a number be devisible by config.stepSize

const getDivisibleNum = num => num - (num % config.stepSize);

// Canvas objects' sizing

canvas.setAttribute('width', getDivisibleNum(window.innerWidth));
canvas.setAttribute('height', getDivisibleNum(window.innerHeight));

// Pick random number within a range

const getRandomNum = range => Math.floor(Math.random() * range);

// Validate x and y in order to prevent spawning 'under' the snake

const isUnderSnake = (x, y) => {
    if (config.snakeArr.some(el => el.x === x && el.y === y)) {
        return true;
    } else {
        return false;
    }
}

// Pick random x and y (for food to spawn)

const getRandomXYFood = () => {
    let forX = getDivisibleNum(getRandomNum(canvas.width));
    let forY = getDivisibleNum(getRandomNum(canvas.height));
    
    const validate = () => {
        if (isUnderSnake(forX, forY)) {
            forX = getDivisibleNum(getRandomNum(canvas.width));
            forY = getDivisibleNum(getRandomNum(canvas.height));
            validate();
        }
    }
    validate();

    return [forX, forY];
}

// Pick random x and y (for snake head to spawn)

const getRandomXYSnakeHead = () => {
    let forX = getDivisibleNum(getRandomNum(canvas.width));
    let forY = getDivisibleNum(getRandomNum(canvas.height));
    return [forX, forY];
}

/* (2) Snake Classes */

// Snake Square Units Class

class SnakeUnit {
    constructor(x, y) {
        this._x = x;
        this._y = y;
        this._width = config.stepSize;
        this._height = config.stepSize;
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
                this._x -= config.stepSize;
                break;
            case 'right':
                this._x += config.stepSize;
                break;
            case 'top':
                this._y -= config.stepSize;
                break;
            case 'bot':
                this._y += config.stepSize;
                break;
        }
    }
}

// Snake Head Instance

class SnakeHead extends SnakeUnit {
    constructor(x, y) {
        super(x, y);
        this._width = config.stepSize;
        this._height = config.stepSize;
        this._direction = undefined;
        this.fillColor = 'rgba(255, 0, 0, 1)';
    }

    isInBox() {
        if (this._x >= 0 && this._x <= canvas.width - config.stepSize && this._y >= 0 && this._y <= canvas.height - config.stepSize) {
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
            config.counter++;
            let newTailXY = getNewTailXY(config.snakeArr[config.snakeArr.length - 1].x, config.snakeArr[config.snakeArr.length - 1].y, config.snakeArr[config.snakeArr.length - 1].direction);
            window['tail' + config.counter] = new SnakeTail(newTailXY[0], newTailXY[1]);
            config.snakeArr.push(window['tail' + config.counter]);

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

const snakeHead = new SnakeHead(getRandomXYSnakeHead()[0], getRandomXYSnakeHead()[1]);

// Snake Tail Subclass

class SnakeTail extends SnakeUnit {
    constructor(x, y) {
        super(x, y);
        this._width = config.stepSize;
        this._height = config.stepSize;
        this._direction = undefined;
        this.fillColor = 'rgba(255, 210, 0, 1)';
    }
}

/* (3) Food Class */

class Food {
    constructor(x, y) {
        this._x = x;
        this._y = y;
        this._width = config.stepSize;
        this._height = config.stepSize;
        this.fillColor = 'rgba(100, 0, 255, 1)';
    }

    static spawn() {
        const foodXYArr = getRandomXYFood();
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
    const foodXYArr = getRandomXYFood();
    food = new Food(foodXYArr[0], foodXYArr[1]);
}
invokeFood();

/* (4) Unsorted Functions*/

config.snakeArr.push(snakeHead);

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
        config.snakeArr.forEach(el => el.makeStep());
        setDirection(config.snakeArr);
        snakeHead.eatAndGrow();
    }  
}

// Create a tail array without the head (from config.snakeArr)

const getTailArr = () => {
    if (config.snakeArr[0] === snakeHead) {
        const tailArr = config.snakeArr.slice(1);
        return tailArr;
    }
}

// Is about to eat itself?

const isEatingItself = (x, y) => {
    if (config.snakeArr.length > 3) {
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
    for (let i = 1; i < config.snakeArr.length; i++) {
        ctx.strokeRect(config.snakeArr[i].x, config.snakeArr[i].y, config.snakeArr[i].width, config.snakeArr[i].height);
        ctx.fillStyle = config.snakeArr[i].fillColor;
        ctx.fillRect(config.snakeArr[i].x, config.snakeArr[i].y, config.snakeArr[i].width, config.snakeArr[i].height);
    }
    // food
    ctx.fillStyle = food.fillColor;
    ctx.fillRect(food.x, food.y, food.width, food.height);
    //console.log(`Performance after food ${performance.now()}`); // performance
    // loop
    window.requestAnimationFrame(draw);
}

draw();