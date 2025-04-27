/// <reference lib="dom" />
// Canvas
const Canvas = document.getElementById('gameBoard');
/**@type {CanvasRenderingContext2D} */
const ctx = Canvas.getContext('2d');

//Constant Variables
const scoreBoard = document.getElementById('scoreB');
const restartBtn = document.getElementById('restart');
const gameWidth = Canvas.width;
const gameHeight = Canvas.height;
const BoardBackGroundColor = '#ffffff';
const snakeColor = '#00ff00';
const snakeBorder = '#000000';
const foodColor = '#ff0000'
const unitSize = 25;

//let Variables
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;

//Snake Body using Array of Objects
let Snake =[
  {x:unitSize *4, y:0},
  {x:unitSize *3, y:0},
  {x:unitSize *2, y:0},
  {x:unitSize *1, y:0},
  {x:0, y:0}
];

// Events
window.addEventListener('keydown', changeDirection);
restartBtn.addEventListener('click', resetGame)
gameStart();

// Functions
function gameStart(){
  running = true;
  scoreBoard.textContent = `Score : ${score}`;
  createFood();
  drawFood();
  nextTick();
};
function nextTick(){
  if(running){
    setTimeout(() => {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 100)
  }else{
    displayGameOver();
  }
};
function clearBoard(){
  ctx.fillStyle = BoardBackGroundColor;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood(){
  function RandomNum(min, max){
    const RandNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return RandNum;
  }

  foodX = RandomNum(0, gameWidth - unitSize);
  foodY = RandomNum(0, gameWidth - unitSize);
};
function drawFood(){
  ctx.fillStyle = foodColor;
  ctx.fillRect(foodX, foodY, unitSize, unitSize);
};
function moveSnake(){
  const head = {x: Snake[0].x + xVelocity,
                y: Snake[0].y + yVelocity};
  
  Snake.unshift(head);

  // If food is Eaten
  if(Snake[0].x == foodX && Snake[0].y == foodY){
    score +=1;
    scoreBoard.textContent = `Score : ${score}`;
    createFood();
  }else{
    Snake.pop();
  }
};
function drawSnake(){
  ctx.fillStyle = snakeColor;
  ctx.strokeStyle = snakeBorder;
  Snake.forEach(snakePart => {
    ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  })
};
function changeDirection(event){
  const keyPressed = event.keyCode;
  const LEFT =37;
  const UP =38;
  const RIGHT =39;
  const DOWN =40;

  const goingUp = (yVelocity == -unitSize);
  const goingDown = (yVelocity == unitSize);
  const goingLeft = (xVelocity == -unitSize);
  const goingRight = (xVelocity == unitSize);

  switch(true){
    case(keyPressed == LEFT && !goingRight):
      xVelocity = -unitSize;
      yVelocity = 0;
      break;
    case(keyPressed == UP && !goingDown):
      xVelocity = 0;
      yVelocity = -unitSize;
      break;
    case(keyPressed == RIGHT && !goingLeft):
      xVelocity = unitSize;
      yVelocity = 0;
      break;
    case(keyPressed == DOWN && !goingUp):
      xVelocity = 0;
      yVelocity = unitSize;
      break;
  }
};
function checkGameOver(){
  switch(true){
    case(Snake[0].x < 0):
      running =false;
      break;
    case(Snake[0].x >= gameWidth):
      running =false;
      break;
    case(Snake[0].y < 0):
      running =false;
      break;
    case(Snake[0].y >= gameHeight):
      running =false;
      break;
  }
  for(let i; i<Snake.length;i++){
    if(Snake[i].x == Snake[0].x && Snake[i].y == Snake[0].y){
      running= false;
    }
  }
};
function displayGameOver(){
  ctx.font = "50px MV Boli";
  ctx.fillStyle ="black";
  ctx.textAlign ="center";
  ctx.fillText("Game Over!", gameWidth/2, gameHeight/2);
  running= false;
};
function resetGame(){
  score = 0;
  xVelocity = unitSize;
  yVelocity = unitSize;
  Snake=[
    {x:unitSize *4, y:0},
    {x:unitSize *3, y:0},
    {x:unitSize *2, y:0},
    {x:unitSize *1, y:0},
    {x:0, y:0}
  ];
  gameStart();
};