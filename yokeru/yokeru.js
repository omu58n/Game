var parent = document.getElementById("parent");
var canvas = document.createElement("canvas");
canvas.width = 480;
canvas.height = 320;
document.getElementById("mycanvas").appendChild(canvas);
var startButton = document.getElementById("startbutton");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height-30;
var radius = 10;

var level = 0;

var obst = new Array();
obst.push({x: canvas.width/2, y: canvas.height-60, dx: 1, dy: 1});
obstsize=20;

var count = 0;

var interval = undefined;

document.addEventListener("mousemove", mouseMoveHandler, false);
function mouseMoveHandler(e) {
    var relativeX = e.clientX - parent.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        x = relativeX;
    }
    var relativeY = e.clientY - parent.offsetTop;
    if(relativeY > 0 && relativeY < canvas.height) {
        y = relativeY;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "brown";
    ctx.fillText("Score: "+ level, 8, 20);
}

function drawObstacles() {
    for(var i = 0; i < level; i++){
        ctx.beginPath();
        o = obst[i];
        ctx.rect(o.x, o.y, obstsize, obstsize);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }
}

function updateObstacles() {
    for (var i = 0; i < level; i++){
        o = obst[i];
        if (o.x + o.dx < 0 || o.x + o.dx > canvas.width - obstsize) {
            o.dx = -o.dx;
        }
        if (o.y + o.dy < 0 || o.y + o.dy > canvas.height - obstsize) {
            o.dy = -o.dy;
        }
        o.x += o.dx;
        o.y += o.dy;
    }

}

function collisionDetection() {
    var judge = false;
    for (var i = 0; i < level; i++){
        o = obst[i];
        if (o.x - radius <= x && x <= o.x + obstsize + radius && o.y - radius <= y && y <= o.y + obstsize + radius) {
            judge = true;
            break;
        }
    }
    if (judge) {
        stop();
    }
}
function stop() {
    document.getElementById("myfilter").style.display = "block";
    document.getElementById("myscore").style.display = "block";
    document.getElementById("div_button").style.display = "block";
    var text = document.createElement("p");
    text.innerText = "Score: " + level;
    text.style.color = "black";
    text.style.fontSize = 48;
    document.getElementById("myscore").appendChild(text);
    clearInterval(interval);
}

function draw() {
    count++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScore();
    drawBall();
    drawObstacles();
    updateObstacles();
    collisionDetection();
    if (count > 200) {
        count = 0;
        obst.push({x: Math.random() * (canvas.width - 0), y: Math.random() * (canvas.height - 0), dx: Math.random() * (1.5 - 0.5) + 0.5, dy: Math.random() * (1.5 - 0.5) + 0.5});
        level = obst.length;
    }
}

startButton.onclick = () => {
    while (document.getElementById("myscore").firstChild) { 
        document.getElementById("myscore").removeChild(document.getElementById("myscore").firstChild);
    }
    document.getElementById("myfilter").style.display = "None";
    document.getElementById("myscore").style.display = "None";
    document.getElementById("div_button").style.display = "None";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    obst = new Array();
    obst.push({x: canvas.width/2, y: canvas.height-60, dx: 1, dy: 1});
    obstsize = 20;
    count = 0;
    level = obst.length;
    draw();
    interval = setInterval(draw, 10);
}

drawBall();
drawScore();