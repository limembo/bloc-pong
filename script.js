var canvas = document.getElementById("canv");
var context = canvas.getContext("2d");

context.fillStyle = "black"

//This is the outline for our box
function drawBox(){
  context.moveTo(0, 0);
  context.lineTo(500, 0);
  context.lineTo(500, 300);
  context.lineTo(0, 300);
  context.lineTo(0, 0);

  context.strokeStyle = "#000";
  context.stroke();
};

//This is the function for our paddles
function Paddle(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speed = 10;
  this.edge = {
    top: this.y,
    bottom: this.y + this.height,
    right: this.x + this.width,
    left: this.x
  };

  this.move = function(dy){
    context.clearRect(this.x, this.y, this.width, this.height);
    this.y += dy;
    this.edge.top += dy;
	  this.edge.bottom += dy;
  };
  this.render = function(){
    context.fillRect(this.x, this.y, this.width, this.height);
  };
};

//Random negative function
function randomizeValue(num){
  var randomNegative = [1, -1];
  num *= randomNegative[Math.floor(Math.random() * randomNegative.length)];
  return num;
};

//This function randomizes our Y value
function randomBallY(){
  var y_set = [1, 3];
  var num = y_set[Math.floor(Math.random() * y_set.length)];
  return num;
};

//Function for our ball
function Ball(){
  this.x = 250;
  this.y = 150;
  this.width = 5;
  this.height = 5;
	this.edge = {
		right: this.x + 5,
		left: this.x,
		top: this.y,
		bottom: this.y + 5
  };

  this.speed_x = randomizeValue(3);
  this.speed_y = randomizeValue(randomBallY());

  this.move = function(player, computer){
    context.clearRect(this.x, this.y, this.width, this.height);
    this.x += this.speed_x;
    this.y += this.speed_y;

    this.edge.left += this.speed_x;
  	this.edge.right += this.speed_x;
  	this.edge.top += this.speed_y;
  	this.edge.bottom += this.speed_y;

    //For the collision with player's paddle
    if(this.edge.left < player.edge.right && this.edge.left > player.edge.right - 2){
      if(this.edge.top < player.edge.bottom && this.edge.bottom > player.edge.top){
        this.speed_x = -this.speed_x;
      } else{
        console.log('game over');
      };
    };
    //For the collision with the computer's paddle
    if(this.edge.right === computer.edge.left){
      if(this.edge.top < computer.edge.bottom && this.edge.bottom > computer.edge.top){
        this.speed_x = -this.speed_x;
      } else{
        console.log('game over');
      };
    };
    // Top boundary - collision
    if(this.edge.top === 0){
      this.speed_y = -this.speed_y;
    };
    // Bottom boundary - collision
    if(this.edge.bottom >= 300){
      this.speed_y = -this.speed_y;
    };
  };
  this.render = function(){
    context.fillRect(this.x, this.y, this.width, this.height);
  };
};

//Keypress
function onKeyDown(k){
  //Up
  if(k.keyCode === 38){
    //Stops paddle from moving above top
  	if(player.y >= 1){
  		player.move(-player.speed);
  	}
  };
  //Down
  if(k.keyCode === 40){
    //Stops paddle from moving below bottom
  	if(player.y <= 240){
  		player.move(player.speed);
  	}
  }
};

//Listen for Event(Keypress)
function addKeyEvents(){
	window.addEventListener('keydown', onKeyDown, true);
};

var player = new Paddle(10, 130, 10, 50);
var computer = new Paddle(480, 130, 10, 50);
var ball = new Ball();

var update = function(){
  ball.move(player, computer);
};

function render(){
  drawBox();
  player.render();
  computer.render();
  ball.render();
};

//Animation
var animate = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback){
		window.setTimeout(callback, 1000 / 60);
	};

var endAnimate = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

function step(){
  update();
  render();
  //Initialize Animation
  animate(step);
};

//Load everything!
window.onload = function(){
  addKeyEvents();
  step();
};
