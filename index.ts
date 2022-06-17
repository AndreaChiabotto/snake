const rowNumber: number = 10;
const colNumber: number = 10;

const cellWidth: number = 30;
const cellHeight: number = 30;

const cellText: string = '+';
const foodText: Array<string> = ['🦋', '🐛', '🐝', '🐞', '🐜', '🕷', '🦂', '🦗', '🦟'];
const snakeText: string = '🐍';

let direction: Directions = 'right';

const container = document.getElementById('container');
// FOOD
const food: HTMLElement = document.createElement('div');
food.id = 'food';
// SNAKE
let snake: HTMLElement = document.createElement('div');
let snakeLeftPosition: number = colNumber / 2;
let snakeTopPosition: number = rowNumber / 2;
let snakePositions: Array<Position> = [{top: snakeTopPosition, left: snakeLeftPosition}];
snake.id = 'snake';
container!.appendChild(snake);

for (let r = 0; r < rowNumber; r++) {
    const row: HTMLElement = document.createElement('div');
    row.classList.add('row');
    container!.appendChild(row);
    for (let c = 0; c < colNumber; c++) {
        const currentRow = document.querySelectorAll('.row');
        const cell: HTMLElement = document.createElement('div');
        cell.classList.add('cell');
        cell.style.width = cellWidth.toString() + 'px';
        cell.style.height = cellHeight.toString() + 'px';
        cell.innerHTML = `<p>${cellText}</p>`;
        currentRow[r]!.appendChild(cell);
    }
}

addFood();
moveFood();

// this function add a div with id 'food' to the container
function addFood() {
    food.style.width = cellWidth.toString() + 'px';
    food.style.height = cellHeight.toString() + 'px';
    food.innerHTML = `<p>${foodText[Math.floor(Math.random() * foodText.length)]}</p>`;
    container!.appendChild(food);
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
        const snakePart: HTMLElement = document.createElement('div');
        snakePart.className = 'snake' + i;
        snakePart.style.top = snakePositions[i]!.top * cellHeight + 'px';
        snakePart.style.left = snakePositions[i]!.left * cellWidth + 'px';
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
            if ( snakeLeftPosition >= colNumber ) {
                snakeLeftPosition = 0;
            }
            break;
        case 'left':
            snakeLeftPosition--;
            if ( snakeLeftPosition < 0 ) {
                snakeLeftPosition = colNumber - 1;
            }
            break;
        case 'up':
            snakeTopPosition--;
            if( snakeTopPosition < 0 ) {
                snakeTopPosition = rowNumber - 1;
            }
            break;
        case 'down':
            snakeTopPosition++;
            if( snakeTopPosition >= rowNumber ) {
                snakeTopPosition = 0;
            }
            break;
        default:   // do nothing
    }

    snakePositions = [{top: snakeTopPosition, left: snakeLeftPosition}, ...snakePositions];
    snakePositions.pop();

   // addSnake();
}

// add EventListener of type keyEvent to the document to check if arrow keys are pressed
document.addEventListener('keydown', (e: KeyboardEvent) => {
    e.preventDefault();

    if (e.key === 'ArrowUp' && direction !== 'down') {
        direction = 'up';
    } else if (e.key === 'ArrowDown' && direction !== 'up') {
        direction = 'down';
    } else if (e.key === 'ArrowLeft' && direction !== 'right') {
        direction = 'left';
    } else if (e.key === 'ArrowRight' && direction !== 'left') {
        direction = 'right';
    }
});

// every 200ms the snake will move to the next position
setInterval(() => {
    moveSnake();
}, 500);


// NEW TYPE / INTERFACES
type Directions = 'right' | 'left' | 'up' | 'down';

interface Position {
    top: number;
    left: number;
}
