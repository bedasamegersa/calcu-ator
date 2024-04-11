// Game constants
const CANVAS_BORDER_COLOR = 'black';
const CANVAS_BACKGROUND_COLOR = 'lightgray';
const SNAKE_COLOR = 'green';
const SNAKE_BORDER_COLOR = 'darkgreen';
const FOOD_COLOR = 'red';
const FOOD_BORDER_COLOR = 'darkred';

const GAME_SPEED = 100; // milliseconds
const TILE_SIZE = 20; // 20x20 pixels

// Game variables
let snake = [{ x: 200, y: 200 }];
let food = { x: 0, y: 0 };
let dx = TILE_SIZE;
let dy = 0;
let score = 0;
let changingDirection = false;

// Get the canvas element and its context
const gameCanvas = document.getElementById('game-canvas');
const ctx = gameCanvas.getContext('2d');

// Generate random coordinates for the food
function generateFood() {
  food.x = Math.floor(Math.random() * (gameCanvas.width / TILE_SIZE)) * TILE_SIZE;
  food.y = Math.floor(Math.random() * (gameCanvas.height / TILE_SIZE)) * TILE_SIZE;
}

// Function to draw the game
function draw() {
  // Clear the canvas
  ctx.fillStyle = CANVAS_BACKGROUND_COLOR;
  ctx.strokeStyle = CANVAS_BORDER_COLOR;
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);

  // Move the snake
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Check if the snake ate the food
  const didEatFood = snake[0].x === food.x && snake[0].y === food.y;
  if (didEatFood) {
    score += 10;
    generateFood();
  } else {
    snake.pop();
  }

  // Draw the snake
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? SNAKE_COLOR : SNAKE_BORDER_COLOR;
    ctx.strokeStyle = SNAKE_BORDER_COLOR;
    ctx.fillRect(segment.x, segment.y, TILE_SIZE, TILE_SIZE);
    ctx.strokeRect(segment.x, segment.y, TILE_SIZE, TILE_SIZE);
  });

  // Draw the food
  ctx.fillStyle = FOOD_COLOR;
  ctx.strokeStyle = FOOD_BORDER_COLOR;
  ctx.fillRect(food.x, food.y, TILE_SIZE, TILE_SIZE);
  ctx.strokeRect(food.x, food.y, TILE_SIZE, TILE_SIZE);

  // Game over conditions
  if (
    snake[0].x < 0 ||
    snake[0].x >= gameCanvas.width ||
    snake[0].y < 0 ||
    snake[0].y >= gameCanvas.height ||
    snake.slice(1).some((segment) => segment.x === snake[0].x && segment.y === snake[0].y)
  ) {
    gameOver();
  }

  // Update score
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + score, 10, 30);
}

// Function to change the direction of the snake
function changeDirection(event) {
  if (changingDirection) {
    return;
  }

  changingDirection = true;
  const keyPressed = event.keyCode;
  const goingUp = dy === -TILE_SIZE;
  const goingDown = dy === TILE_SIZE;
  const goingLeft = dx === -TILE_SIZE;
  const goingRight = dx === TILE_SIZE;

  if (keyPressed === 37 && !goingRight) {
    dx = -TILE_SIZE;
    dy = 0;
  }

  if (keyPressed === 38 && !goingDown) {
    dx = 0;
    dy = -TILE_SIZE