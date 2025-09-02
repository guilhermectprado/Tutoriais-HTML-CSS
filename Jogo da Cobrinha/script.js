const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const score = document.querySelector(".score .value");
const finalScore = document.querySelector(".finish-score > span");
const menu = document.querySelector(".menu");
const btnPlay = document.querySelector(".btn-play");

const audio = new Audio("audio.mp3");
const size = 30;

let isPlaying = true;

const initialPosition = { x: 210, y: 120 };

let snake = [
  initialPosition,
  // { x: 240, y: 120 },
  // { x: 270, y: 120 },
  // { x: 300, y: 120 },
  // { x: 330, y: 120 },
];

const randomPosition = () => {
  return Math.floor(Math.random() * (canvas.width / size)) * size;
};

const food = {
  x: randomPosition(),
  y: randomPosition(),
  color: "lightsalmon",
};

let direction, loopId;

const drawGrid = () => {
  ctx.lineWidth = 1;
  ctx.strokeStyle = "#a1a1a1";

  for (let i = 30; i < canvas.width; i += size) {
    ctx.beginPath();
    ctx.lineTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();
  }

  for (let i = 30; i < canvas.height; i += size) {
    ctx.beginPath();
    ctx.lineTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
  }
};

const drawSnake = () => {
  ctx.fillStyle = "lightsteelblue";

  snake.forEach((position, index) => {
    if (index == snake.length - 1) {
      ctx.fillStyle = "blue";
    }

    ctx.fillRect(position.x, position.y, size, size);
  });
};

const drawFood = () => {
  const { x, y, color } = food;

  ctx.shadowColor = color;
  ctx.shadowBlur = 10;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
  ctx.shadowBlur = 0;
};

const moveSnake = () => {
  if (!direction) return;

  const head = { ...snake[snake.length - 1] };

  switch (direction) {
    case "up":
      head.y -= size;
      break;
    case "down":
      head.y += size;
      break;
    case "left":
      head.x -= size;
      break;
    case "right":
      head.x += size;
      break;
  }

  snake.push(head);
  snake.shift();
};

const incrementScore = () => {
  score.textContent = parseInt(score.textContent) + 10;
};

const checkEat = () => {
  const head = { ...snake[snake.length - 1] };

  if (head.x === food.x && head.y === food.y) {
    snake.push(head);
    audio.play();
    incrementScore();

    let x = randomPosition();
    let y = randomPosition();

    while (snake.find((position) => position.x === x && position.y === y)) {
      x = randomPosition();
      y = randomPosition();
    }

    food.x = x;
    food.y = y;
  }
};

const checkCollision = () => {
  const head = snake[snake.length - 1];
  const canvasLimit = canvas.width - size;

  const wallCollision =
    head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit;

  const selfCollision = snake
    .slice(0, -2)
    .some((segment) => segment.x === head.x && segment.y === head.y);

  if (wallCollision || selfCollision) gameOver();
};

const gameOver = () => {
  direction = undefined;
  isPlaying = false;

  menu.style.visibility = "visible";
  finalScore.textContent = score.textContent;
  canvas.style.filter = "blur(4px)";
};

const gameLoop = () => {
  clearInterval(loopId);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  drawFood();
  moveSnake();
  drawSnake();
  checkEat();
  checkCollision();

  loopId = setTimeout(() => gameLoop(), 300);
};

gameLoop();

document.addEventListener("keydown", (e) => {
  if (!isPlaying) return;

  if (e.key === "ArrowUp" && direction !== "down") {
    direction = "up";
  }

  if (e.key === "ArrowDown" && direction !== "up") {
    direction = "down";
  }

  if (e.key === "ArrowLeft" && direction !== "right") {
    direction = "left";
  }

  if (e.key === "ArrowRight" && direction !== "left") {
    direction = "right";
  }
});

btnPlay.addEventListener("click", () => {
  menu.style.visibility = "hidden";
  canvas.style.filter = "none";

  isPlaying = true;

  score.textContent = 0;
  snake = [initialPosition];
});
