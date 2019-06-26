var parent = document.getElementById("parent");
var canvas = document.createElement("canvas");
canvas.width = 480;
canvas.height = 320;
document.getElementById("mycanvas").appendChild(canvas);
var startButton = document.getElementById("startbutton");
var div = document.getElementById("div_button");
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var ballnumber = 2;
var balls = [];
var x = [];
var y = [];
var dx = [];
var dy = [];
var end = 0;

for(var c=0; c<ballnumber; c++){
    balls[c] = { x: 0, y: 0, status: 5};
    x[c] = canvas.width * Math.random();
    y[c] = canvas.height/2 * Math.random();
    dx[c] = 4*Math.random() - 2;
    if(Math.random()<0.5){
        dy[c] = 2*Math.random() + 1;
    }
    else{
        dy[c] = -2*Math.random() - 1;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}
function mouseMoveHandler(e) {
    var relativeX = e.clientX - parent.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function drawBall() {
    for(c=0; c<ballnumber; c++){
        if(balls[c].status >= 1){
            balls[c].x = x[c];
            balls[c].y = y[c];
            ctx.beginPath();
            ctx.arc(x[c], y[c], ballRadius, 0, Math.PI*2);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
        }
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "brown";
    score1 = 5 - balls[0].status;
    score2 = 5 - balls[1].status;
    ctx.fillText("Score1: "+ score1 + "  Score2: " + score2, 8, 20);
}

function stopclear(){
    document.getElementById("myfilter").style.display = "block";
    document.getElementById("myscore").style.display = "block";
    document.getElementById("div_button").style.display = "block";
    var text = document.createElement("p");
    text.innerText = "Congratulation! GAME CLEAR!!!";
    text.style.color = "black";
    text.style.fontSize = 48;
    document.getElementById("myscore").appendChild(text);
    clearInterval(interval);
}

function stopgameover() {
    document.getElementById("myfilter").style.display = "block";
    document.getElementById("myscore").style.display = "block";
    document.getElementById("div_button").style.display = "block";
    var text = document.createElement("p");
    text.innerText = "GAME OVER";
    text.style.color = "black";
    text.style.fontSize = 48;
    document.getElementById("myscore").appendChild(text);
    clearInterval(interval);
    for(var c=0; c<ballnumber; c++){
        balls[c].status = 5
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScore();
    drawBall();
    drawPaddle();
    for(c=0; c<ballnumber; c++){
        if(x[c] + dx[c] > canvas.width-ballRadius || x[c] + dx[c] < ballRadius){
            dx[c] = -dx[c];
        }
        if(y[c] + dy[c] > canvas.height -  ballRadius) {
            if(x[c] > paddleX && x[c] < paddleX + paddleWidth) {
                balls[c].status--;
                if(balls[c].status == 0){
                    balls[c].status = 0;
                    dx[c] = 0;
                    dy[c] = 0;
                    end++;
                    if(end == ballnumber){
                        stopclear();
                    }
                }
                else{
                    dy[c] = -dy[c];
                }
            }
            else{
                stopgameover();
            }
        }
        else if(y[c] + dy[c] < ballRadius) {
            dy[c] = -dy[c];
        }
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    for(c=0; c<ballnumber; c++){
        x[c] += dx[c];
        y[c] += dy[c];
    }
}

startButton.onclick = () => {
    while (document.getElementById("myscore").firstChild) {
        document.getElementById("myscore").removeChild(document.getElementById("myscore").firstChild);
    }
    document.getElementById("myfilter").style.display = "None";
    document.getElementById("myscore").style.display = "None";
    document.getElementById("div_button").style.display = "None";
    ballRadius = 10;
    paddleHeight = 10;
    paddleWidth = 75;
    paddleX = (canvas.width-paddleWidth)/2;
    rightPressed = false;
    leftPressed = false;
    ballnumber = 2;
    balls = [];
    x = [];
    y = [];
    dx = [];
    dy = [];
    end = 0;

    for(var c=0; c<ballnumber; c++){
        balls[c] = { x: 0, y: 0, status: 5};
        x[c] = canvas.width * Math.random();
        y[c] = canvas.height/2 * Math.random();
        dx[c] = 4*Math.random() - 2;
        if(Math.random()<0.5){
            dy[c] = 2*Math.random() + 1;
        }
        else{
            dy[c] = -2*Math.random() - 1;
        }
    }
    draw()
    interval = setInterval(draw, 10);
}
drawPaddle();
drawScore();
drawBall();