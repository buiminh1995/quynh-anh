
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

alreadyClicked = false;

const cat = new Image();
cat.src = "tandywalk.png";
const message = new Image();
message.src = "qa.png";

const player = {
  x: 1200,
  y: 550,
  width: 64,
  height: 64,
  frameX: 3,
  frameY: 0,
  speed: 2,
  moving: false
}

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

//fps-related variables
let fps, fpsInterval, startTime, now, then, elapsed;
let number_of_times_elapsed = 0;
let number_of_times_elapsed_standing = 0;

function startAnimating(fps){
  fpsInterval = 1000/fps;
  then = Date.now();
  startTime = then;
  animate();
}

function animate(){
  if(player.x == 550 && number_of_times_elapsed_standing < 120){
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawSprite(cat, player.width * 2, player.height * 2, player.width, player.height, player.x, player.y, player.width*2, player.height*2);
    drawSprite(message, 0, 0, 1145, 616, 500, 200, 1145/2, 616/2);
    number_of_times_elapsed_standing++;
  }
  else{
    number_of_times_elapsed_standing = 0;
    now = Date.now();
    elapsed = now - then;
    if(elapsed > fpsInterval){
      ctx.clearRect(0,0,canvas.width, canvas.height);
      number_of_times_elapsed++;
      if(player.x < -100){
        player.x = 1400;
      }
      drawSprite(cat, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width*2, player.height*2);
      movePlayer();
      if(number_of_times_elapsed == 10){
        handlePlayerFrame();
        number_of_times_elapsed = 0
        }
      }
    }
  requestAnimationFrame(animate)
}

function movePlayer(){
  player.x -= player.speed;
}

function handlePlayerFrame(){
  if(player.frameY == 0){
    player.frameY = 1;
  } else{
    player.frameY = 0;
  }
}

startAnimating(0.5);
