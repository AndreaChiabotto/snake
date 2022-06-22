"use strict";
const rowNumber = 20;
const colNumber = 30;
const cellWidth = 30;
const cellHeight = 30;
const cellText = "+";
const foodText = [
    "🦋",
    "🐛",
    "🐝",
    "🐞",
    "🐜",
    "🕷",
    "🦂",
    "🦗",
    "🦟",
];
const snakeText = "🐍";
let direction = "right";
let points = 0;
const container = document.getElementById("container");
// FOOD
const food = document.getElementById("food");
let foodPosition = { top: 0, left: 0 };
food.style.width = cellWidth.toString() + "px";
food.style.height = cellHeight.toString() + "px";
// SNAKE
const snake = document.getElementById("snake");
let snakeLeftPosition = colNumber / 2;
let snakeTopPosition = rowNumber / 2;
let snakePositions = [
    { top: snakeTopPosition, left: snakeLeftPosition },
];
// speed of the game
let speed = 300;
for (let r = 0; r < rowNumber; r++) {
    const row = document.createElement("div");
    row.classList.add("row");
    container.appendChild(row);
    for (let c = 0; c < colNumber; c++) {
        const currentRow = document.querySelectorAll(".row");
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.width = cellWidth.toString() + "px";
        cell.style.height = cellHeight.toString() + "px";
        cell.innerHTML = `<p>${cellText}</p>`;
        currentRow[r].appendChild(cell);
    }
}
startGame();
function startGame() {
    moveFood();
    addSnake();
    moveSnake();
}
// this function move the food to a random position
function moveFood() {
    const top = Math.floor(Math.random() * rowNumber);
    const left = Math.floor(Math.random() * colNumber);
    food.innerHTML = `<p>${foodText[Math.floor(Math.random() * foodText.length)]}</p>`;
    foodPosition = { top: top, left: left };
    food.style.top = (top * cellHeight).toString() + "px";
    food.style.left = (left * cellWidth).toString() + "px";
}
// this function add a div with class 'snake' to the container
function addSnake() {
    snake.innerHTML = "";
    // generate a snake part looping trough the snakePositions array
    for (let i = 0; i < snakePositions.length; i++) {
        const snakePart = document.createElement("div");
        snakePart.className = "snake" + i;
        snakePart.style.top = snakePositions[i].top * cellHeight + "px";
        snakePart.style.left = snakePositions[i].left * cellWidth + "px";
        snakePart.innerHTML = `<p>${snakeText}</p>`;
        snake.appendChild(snakePart);
    }
}
// this function move the snake to a random position
function moveSnake() {
    // moving snake following the direction
    switch (direction) {
        case "right":
            snakeLeftPosition++;
            if (snakeLeftPosition >= colNumber) {
                snakeLeftPosition = 0;
            }
            break;
        case "left":
            snakeLeftPosition--;
            if (snakeLeftPosition < 0) {
                snakeLeftPosition = colNumber - 1;
            }
            break;
        case "up":
            snakeTopPosition--;
            if (snakeTopPosition < 0) {
                snakeTopPosition = rowNumber - 1;
            }
            break;
        case "down":
            snakeTopPosition++;
            if (snakeTopPosition >= rowNumber) {
                snakeTopPosition = 0;
            }
            break;
        default: // do nothing
    }
    snakePositions = [
        { top: snakeTopPosition, left: snakeLeftPosition },
        ...snakePositions,
    ];
    snakePositions.pop();
    //check if the snake eats itself
    snakeEatsItself();
    //check if the snake eat the food
    snakeEatsFood();
    addSnake();
}
// add EventListener of type keyEvent to the document to check if arrow keys are pressed
document.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.key === "ArrowUp" && direction !== "down") {
        direction = "up";
    }
    else if (e.key === "ArrowDown" && direction !== "up") {
        direction = "down";
    }
    else if (e.key === "ArrowLeft" && direction !== "right") {
        direction = "left";
    }
    else if (e.key === "ArrowRight" && direction !== "left") {
        direction = "right";
    }
});
// this function update the score
function updateScore() {
    const score = document.getElementById("score");
    const random = Math.floor(Math.random() * 5) + 5;
    points += random;
    score.innerHTML = `<p>Score: ${points}</p>`;
}
function snakeEatsFood() {
    if (getCollision(snakePositions[0].top, snakePositions[0].left, foodPosition.top, foodPosition.left)) {
        moveFood();
        snakePositions = [
            ...snakePositions,
            { top: snakeTopPosition, left: snakeLeftPosition },
        ];
        updateScore();
        speed -= 5;
    }
}
function snakeEatsItself() {
    const snakeHead = snakePositions[0];
    const snakeBody = snakePositions.slice(1);
    const headEatBody = snakeBody.find((part) => part.top === (snakeHead === null || snakeHead === void 0 ? void 0 : snakeHead.top) && part.left === snakeHead.left);
    if (headEatBody) {
        alert("Game over!");
        points = 0;
        startGame();
    }
}
function getCollision(snakeTop, snakeLeft, objTop, objLeft) {
    return snakeLeft === objLeft && snakeTop === objTop;
}
// every x time the snake will move to the next position
setInterval(() => {
    moveSnake();
}, speed);
