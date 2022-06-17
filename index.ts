const rowNumber: number = 20;
const colNumber: number = 30;

const cellWidth: number = 24;
const cellHeight: number = 24;

const cellText: string = '+';
const foodText: Array<string> = ['🦋','🐛','🐝' ,'🐞','🐜','🕷','🦂','🦗','🦟'];
const snakeText: string = '🐍';

let direction: Directions = 'right';

const container = document.getElementById('container');
const food: HTMLElement = document.createElement('div');
food.id = 'food';

let snake: HTMLElement = document.createElement('div');
snake.className = 'snake';
const snakePositions: { top: number, left: number }[] = [{ top: 10, left: 15 }];

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
    snake = document.createElement('div');
    snake.className = 'snake';
    snake.style.width = cellWidth.toString() + 'px';
    snake.style.height = cellHeight.toString() + 'px';
    snake.innerHTML = `<p>${snakeText}</p>`;
    container!.appendChild(snake);
}

moveSnake();

// this function move the snake to a random position
function moveSnake() {
    snake.style.top = (snakePositions[0].top * cellHeight).toString() + 'px';
    snake.style.left = (snakePositions[0].left * cellWidth).toString() + 'px';
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
    const snakeHead = { top: snakePositions[0].top, left: snakePositions[0].left };
    let newHead: { top: number, left: number };

}, 200);


type Directions = 'right' | 'left' | 'up' | 'down';

