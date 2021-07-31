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
    intervalID = setInterval(runMakeStep, config.timing);
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
        config.snakeArr.forEach(el => el.makeStep());
        setDirection(config.snakeArr);
        snakeHead.eatAndGrow();
        intervalLoop();
    }
});