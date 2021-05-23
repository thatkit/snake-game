const init = () => window.requestAnimationFrame(draw);

const stepSize = 50;

class snakeUnit {
    constructor(x, y) {
        this._x = x;
        this._y = y;
        this._width = stepSize;
        this._height = stepSize;
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

    stepX(val) {
        this._x += val;
    }

    stepY(val) {
        this._y += val;
    }
}

const snakeHead = new snakeUnit(stepSize, stepSize);
snakeHead.fillColor = 'red';

const draw = () => {
    const ctx = document.getElementById('canvas').getContext('2d');
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, 800, 800);

    ctx.fillStyle = snakeHead.fillColor;
    ctx.fillRect(snakeHead.x, snakeHead.y, snakeHead.width, snakeHead.height);

    ctx.restore();
    window.requestAnimationFrame(draw);
}

init();

/* Controls */

window.addEventListener('keydown', function (event) {
    switch (event.key) {
        case "ArrowLeft":
            snakeHead.stepX(-stepSize);
            break;
        case "ArrowRight":
            snakeHead.stepX(stepSize);
            break;
        case "ArrowUp":
            snakeHead.stepY(-stepSize);
            break;
        case "ArrowDown":
            snakeHead.stepY(stepSize);
            break;
    }
});