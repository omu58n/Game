var parent = document.getElementById("parent");
var canvas = document.createElement("canvas");
canvas.width = 480;
canvas.height = 320;
document.getElementById("mycanvas").appendChild(canvas);
var startButton = document.getElementById("startbutton");
var ctx = canvas.getContext("2d");
var interval = undefined;

var player = {size: 5, x: 20, vy: 0, y: 0}
var keyPressed = false;
var grounded = false;
var groundHeight = 220;
var speed = 1;
var obstacle = [];
var time = 1;
var score = 0;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
function keyDownHandler(e) {
    if(e.keyCode == 32) {
        keyPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode = 32) {
        keyPressed = false;
    }
}

function stop() {
    document.getElementById("myfilter").style.display = "block";
    document.getElementById("myscore").style.display = "block";
    document.getElementById("div_button").style.display = "block";
    var text = document.createElement("p");
    text.innerText = "Score: " + Math.floor(score / 10);
    text.style.color = "black";
    text.style.fontSize = 48;
    document.getElementById("myscore").appendChild(text);
    clearInterval(interval);
}

function initialize() {
    while (document.getElementById("myscore").firstChild) { 
        document.getElementById("myscore").removeChild(document.getElementById("myscore").firstChild);
    }
    document.getElementById("myfilter").style.display = "None";
    document.getElementById("myscore").style.display = "None";
    document.getElementById("div_button").style.display = "None";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player = {size: 5, x: 20, vy: 0, y: 0}
    keyPressed = false;
    grounded = false;
    groundHeight = 220;
    speed = 1;
    obstacle = [];
    time = 1;
    score = 0;
}

function drawArc(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawRect(x, y, width, height) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function drawPlayer() {
    drawArc(player.x, player.y, player.size);
}

function drawGround() {
    drawRect(0, 220, canvas.width, canvas.height - 220);
}

function drawObstacle() {
    for(var i = 0; i < obstacle.length; i++) {
        drawRect(obstacle[i].x, obstacle[i].y, obstacle[i].width, obstacle[i].height);
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "brown";
    ctx.fillText("Score: "+Math.floor(score / 10), 8, 20);
}

function createObstacle() {
    var x = canvas.width;
    var y = 220 - Math.floor(Math.random() * (50 - 30) + 30)
    var width = Math.floor(Math.random() * (20 - 3) + 3)
    var height = 220 - y
    obstacle.push({x: x, y: y, width: width, height: height});
}

function collisionDetection() {
    var judge = false;
    for (var i = 0; i < obstacle.length; i++){
        o = obstacle[i];
        if (player.x + player.size == o.x) {
            if(player.y + player.size > o.y) {
                judge = true;
                break;
            }
        }
        if (player.x >= o.x - player.size && player.x <= o.x + o.width + player.size) {
            groundHeight = o.y;
        }
    }
    if (judge) {
        stop();
    }
}

function update() {
    collisionDetection();
    if (keyPressed && grounded) {
        grounded = false
        jump();
    }
    set_grounded();
    for (var i = 0; i < obstacle.length; i++) {
        obstacle[i].x -= speed;
    }
    for (var i = 0; i < obstacle.length; i++) {
        if (obstacle[i].x < -5) {
            obstacle.shift();
        }
    }
}

function jump() {
    if (player.vy == 0) {
        player.y -= 10;
        player.vy = -10;
    }
}

function set_grounded() {
    if (player.y < groundHeight) {
        grounded = false;
    }
    if (player.y + player.size + player.vy >= groundHeight) {
        grounded = true;
        player.y = groundHeight - player.size;
        player.vy = 0;
    }
    if (!grounded) {
        player.vy += 0.5;
    }
    player.y += player.vy;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    groundHeight = 220;
    drawGround();
    drawScore();
    drawObstacle();
    if(score % time == 0) {
        createObstacle();
        time = Math.floor(Math.random() * (300 - 50) + 50)
    }
    score++;
    update();
}

startButton.onclick = () => {
    initialize();
    draw();
    interval = setInterval(draw, 10);
}
drawScore();
drawGround();