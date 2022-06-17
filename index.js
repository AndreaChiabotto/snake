"use strict";
const rowNumber = 10;
const colNumber = 10;
const cellWidth = 30;
const cellHeight = 30;
const cellText = '+';
const foodText = ['🦋', '🐛', '🐝', '🐞', '🐜', '🕷', '🦂', '🦗', '🦟'];
const snakeText = '🐍';
let direction = 'right';
const container = document.getElementById('container');
// FOOD
const food = document.createElement('div');
food.id = 'food';
// SNAKE
let snake = document.createElement('div');
let snakeLeftPosition = colNumber / 2;
let snakeTopPosition = rowNumber / 2;
let snakePositions = [{ top: snakeTopPosition, left: snakeLeftPosition }];
snake.id = 'snake';
container.appendChild(snake);
for (let r = 0; r < rowNumber; r++) {
    const row = document.createElement('div');
    row.classList.add('row');
    container.appendChild(row);
    for (let c = 0; c < colNumber; c++) {
        const currentRow = document.querySelectorAll('.row');
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.width = cellWidth.toString() + 'px';
        cell.style.height = cellHeight.toString() + 'px';
        cell.innerHTML = `<p>${cellText}</p>`;
        currentRow[r].appendChild(cell);
    }
}
addFood();
moveFood();
// this function add a div with id 'food' to the container
function addFood() {
    food.style.width = cellWidth.toString() + 'px';
    food.style.height = cellHeight.toString() + 'px';
    food.innerHTML = `<p>${foodText[Math.floor(Math.random() * foodText.length)]}</p>`;
    container.appendChild(food);
}
// this function move the food to a random position
function moveFood() {
    food.style.top = (Math.floor(Math.random() * rowNumber) * cellHeight).toString() + 'px';
    food.style.left = (Math.floor(Math.random() * colNumber) * cellWidth).toString() + 'px';
}
addSnake();
// this function add a div with class 'snake' to the container
function addSnake() {
    snake.innerHTML = '';
    // generate a snake part looping trough the snakePositions array
    for (let i = 0; i < snakePositions.length; i++) {
        const snakePart = document.createElement('div');
        snakePart.className = 'snake' + i;
        snakePart.style.top = snakePositions[i].top * cellHeight + 'px';
        snakePart.style.left = snakePositions[i].left * cellWidth + 'px';
        snakePart.innerHTML = `<p>${snakeText}</p>`;
        snake.appendChild(snakePart);
    }
}
moveSnake();
// this function move the snake to a random position
function moveSnake() {
    // moving snake following the direction
    switch (direction) {
        case 'right':
            snakeLeftPosition++;
            if (snakeLeftPosition >= colNumber) {
                snakeLeftPosition = 0;
            }
            break;
        case 'left':
            snakeLeftPosition--;
            if (snakeLeftPosition < 0) {
                snakeLeftPosition = colNumber - 1;
            }
            break;
        case 'up':
            snakeTopPosition--;
            if (snakeTopPosition < 0) {
                snakeTopPosition = rowNumber - 1;
            }
            break;
        case 'down':
            snakeTopPosition++;
            if (snakeTopPosition >= rowNumber) {
                snakeTopPosition = 0;
            }
            break;
        default: // do nothing
    }
    snakePositions = [{ top: snakeTopPosition, left: snakeLeftPosition }, ...snakePositions];
    snakePositions.pop();
    // addSnake();
}
// add EventListener of type keyEvent to the document to check if arrow keys are pressed
document.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.key === 'ArrowUp' && direction !== 'down') {
        direction = 'up';
    }
    else if (e.key === 'ArrowDown' && direction !== 'up') {
        direction = 'down';
    }
    else if (e.key === 'ArrowLeft' && direction !== 'right') {
        direction = 'left';
    }
    else if (e.key === 'ArrowRight' && direction !== 'left') {
        direction = 'right';
    }
});
// every 200ms the snake will move to the next position
setInterval(() => {
    moveSnake();
}, 500);
