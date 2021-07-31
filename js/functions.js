// Game Settings
const config = {
    stepSize: 50, // the size of the snake units as well as the size of snake's steps
    timing: 400, // the speed of the snake
    counter: 0, // counter of snake tails (0 is the head)
    snakeArr: []
}

// Make a number be devisible by config.stepSize
const getDivisibleNum = num => num - (num % config.stepSize);

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

export { config, getDivisibleNum, getRandomXYFood, getRandomXYSnakeHead };