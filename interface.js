/* () Keyboard Controls */

window.addEventListener('keydown', function (event) {
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
            snakeHead.eatAndGrow();
            break;
    }

    if (!snakeHead.hasDied()) {
        snakeArr.forEach(el => el.makeStep());
        setDirection(snakeArr);
        snakeHead.eatAndGrow();
    }
});