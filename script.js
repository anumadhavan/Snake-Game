const cvs = document.getElementById('gaming');
const ctx = cvs.getContext("2d");


// // Create the unit box

const box =32;

// // load Image for Backgroynd and food

const ground = new Image();
ground.src = "ground.png";

const foodImg = new Image();
foodImg.src = "food.png";

// // Load Audio

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let down = new Audio();
let right = new Audio();
let left = new Audio();


dead.src = "dead.mp3";
eat.src = "eat.mp3";
up.src = "Upt.mp3";
down.src = "down.mp3";
right.src = "right.mp3";
left.src = "left.mp3";


// // create Snake 

let snake = [];
snake[0] = {
    x: 9*box,
    y: 10*box

};

// // create Food

let food = {
    x: Math.floor(Math.random()*17+1)*box,
    y: Math.floor(Math.random()*15+3)*box

}

// // Create Score

let score = 0;
 
// // For controlling the snake

let d;
document.addEventListener('keydown',direction);
function direction(event){

    let key = event.keyCode;
    if( key==37 && d!= 'RIGHT'){
        left.play();
        d="LEFT";
    }
   
    else if( key==38 && d!= 'DOWN'){
        up.play();
        d="UP";
    }
    else if( key==39 &&  d!= 'LEFT'){
        right.play();
        d="RIGHT";
    }
    else if( key==40 &&  d!= 'UP'){
        down.play();
        d="DOWN";
    }
}

// // Collision  function 

function collision(newHead,snake){
    for(let i=0;i<snake.length;i++){
        if(newHead.x==snake[i].x &&  newHead.y==snake[i].y){
            return true;
        }

    }
    return false;
}

// // draw Canvas

function draw(){
  
    ctx.drawImage(ground, 0, 0)

for( let i=0;i<snake.length; i++){
    ctx.fillStyle = ( i == 0 ) ? "green" :"white";
    ctx.fillRect(snake[i].x,snake[i].y,box,box);
    ctx.strokeStyle = 'red';
    ctx.strokeRect(snake[i].x,snake[i].y,box,box);
}
    ctx.drawImage(foodImg, food.x, food.y)


// // old Head Position

let snakeX= snake[0].x;
let snakeY = snake[0].y;
// // which Direction

if( d == 'LEFT') snakeX -= box;
if( d == 'UP') snakeY -= box;
if( d == 'RIGHT') snakeX += box;
if( d == 'DOWN') snakeY += box;


// // Snake Eat the Food

if( snakeX==food.x &&  snakeY==food.y){
    score++;
    eat.play();
    food = {
        x: Math.floor(Math.random()*17+1)*box,
        y: Math.floor(Math.random()*15+3)*box
    
    }
}
else{
    snake.pop();
}

// // new head Postion 

let newHead = {
    x: snakeX,
    y: snakeY
}

// condition for game over

if(snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
    clearInterval(game);
    dead.play();
}
snake.unshift(newHead);

ctx.fillStyle ='white';
ctx.font = " 45px changa one";
ctx.fillText(score, 2*box,1.6*box);
}

// // call draw function

let game = setInterval(draw,300);
let z= Math.floor(Math.random()*10);
console.log(z)