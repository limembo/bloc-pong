var canvas = document.getElementById("canv");
var context = canvas.getContext("2d");

context.fillStyle = "black"

//Box Outline
function drawBox(){
  context.moveTo(0, 0);
  context.lineTo(500, 0);
  context.lineTo(500, 300);
  context.lineTo(0, 300);
  context.lineTo(0, 0);

  context.strokeStyle = "#000";
  context.stroke();
};

//Paddles
function Paddle(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.speed = 10;

  this.move = function(dy){
    context.clearRect(this.x, this.y, this.width, this.height);
    this.y += dy;
  };
  this.render = function(){
    context.fillRect(this.x, this.y, this.width, this.height);
  };
};

//Ball
function Ball(){
  this.x = 250;
  this.y = 150;
  this.width = 5;
  this.height = 5;

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

function render(){
  drawBox();
  player.render();
  computer.render();
  ball.render();
};

//Animate
var animate = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(callback){
		window.setTimeout(callback, 1000 / 60);
	};

function step(){
  render();
  //Initialize Animation
  animate(step);
};

//Load
window.onload = function(){
  addKeyEvents();
  step();
};
