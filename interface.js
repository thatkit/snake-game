/* () Keyboard Controls */

let intervalID;
const intervalLoop = () => {
    intervalID = setInterval(runMakeStep, config.timing);
}

window.addEventListener('keydown', function (event) {
    clearInterval(intervalID);
    switch (event.key) {
        case "ArrowLeft":
            if (snakeHead.direction !== 'right') {
                snakeHead.direction = 'left';
            }            
            break;
        case "ArrowRight":
            if (snakeHead.direction !== 'left') {
                snakeHead.direction = 'right';
            }
            break;
        case "ArrowUp":
            if (snakeHead.direction !== 'bot') {
                snakeHead.direction = 'top';
            }
            break;
        case "ArrowDown":
            if (snakeHead.direction !== 'top') {
                snakeHead.direction = 'bot';
            }
            break;
        case " ": // only for test
            intervalID ? clearInterval(intervalID) : intervalLoop();
            break;
    }

    if (!snakeHead.hasDied()) {
        config.snakeArr.forEach(el => el.makeStep());
        setDirection(config.snakeArr);
        snakeHead.eatAndGrow();
        intervalLoop();
    }
});