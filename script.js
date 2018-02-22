var canvas = document.getElementById("canv");
var context = canvas.getContext("2d");

context.fillStyle = "black"

//Box outline
context.moveTo(0, 0);
context.lineTo(500, 0);
context.lineTo(500, 300);
context.lineTo(0, 300);
context.lineTo(0, 0);

context.strokeStyle = "#000";
context.stroke();

//Paddles
function Paddle(x, y, width, height){
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

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


var player = new Paddle(10, 130, 10, 50);
var computer = new Paddle(480, 130, 10, 50);
var ball = new Ball();

function render(){
  player.render();
  computer.render();
  ball.render();
};

//Load
window.onload = function(){
  render();
};
