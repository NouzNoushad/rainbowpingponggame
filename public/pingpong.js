let canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const display = document.querySelector('.display');
const btn = document.querySelector('.btn');
const score = document.querySelector('.score');

//rainbow effect
const body = document.getElementById('body');
let arr = [];
const colors = ['a', 'b', 'c', 'd', 'e', 'f', 1, 2, 3, 4, 5, 6, 7, 8, 9];

for (let i = 0; i < 6; i++){
    const random = Math.floor(Math.random() * colors.length);
    arr.push(colors[random]);
}

let pingpongColor = '#' + arr.join('');
body.style.backgroundColor = pingpongColor;

//pinpong game

canvas = { w: canvas.width, h: canvas.height };
let scores = 0;
let ball, leftStriker, rightStriker, dx, dy;
let striker = { w: 8, h: 50 };
score.innerHTML = `Score: ${scores}`

setBackToInitial();
firstStrike();
guideRightStriker();
strikeBall();
guideLeftStriker();
drawBoundary();

function setBackToInitial() {
    
    dx = 2;
    dy = -1;
    ball = { x: 250, y: 250, r: 6 };
    leftStriker = { x: 2, y: 225 };
    rightStriker = { x: 490, y: 225 };

    drawPingBall();
    drawRightStriker();
    drawLeftStriker();

}

function strikeBall() {
    
    //right striker
    if (ball.x > rightStriker.x - ball.r) {
        dx = -dx;
    }

    //top and bottom bounce back
    if (ball.y > canvas.h - ball.r || ball.y < ball.r) {
        dy = -dy;
    }

    //left striker
    if (ball.x < ball.r + striker.w &&
        ball.y > leftStriker.y - 2 &&
        ball.y < leftStriker.y + striker.h + 2) {
        dx = -dx;
        scores += 1;
        score.innerHTML = `Score: ${scores}`;
    }

    //danger zone
    if (ball.x < ball.r) {
        display.innerHTML = 'GAME OVER';
        btn.innerHTML = 'START';
        dx = 0;
        dy = 0;
        
    }
}

btn.addEventListener('click', () => {

    if (btn.innerHTML == 'START') {
        display.innerHTML = '';
        btn.innerHTML = '';
        scores = 0;
        score.innerHTML = `Score: ${scores}`;
        setBackToInitial();
    }
})

function guideLeftStriker() {
    
    document.addEventListener('mousemove', (e) => {
        
        console.log(e.screenY, leftStriker.y)
        if (btn.innerHTML == '') {
            leftStriker.y = e.screenY - 180;
        }
        
    })
}

function guideRightStriker() {
    
    rightStriker.y = ball.y - striker.h / 2;
}

function firstStrike() {
    
    ctx.clearRect(0, 0, canvas.w, canvas.h);

    ball = { x: ball.x + dx, y: ball.y + dy, r: ball.r}

    drawPingBall();
    drawRightStriker();
    drawLeftStriker();
    guideRightStriker();
    strikeBall();
    drawBoundary();

    requestAnimationFrame(firstStrike);
}


function drawPingBall() {
    
    ctx.beginPath();
    ctx.setLineDash([0, 0])
    ctx.arc(ball.x, ball.y, ball.r, 0, 2 * Math.PI);
    ctx.fillStyle = pingpongColor;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function drawRightStriker() {
    
    ctx.beginPath();
    ctx.rect(rightStriker.x, rightStriker.y, striker.w, striker.h);
    ctx.fillStyle = pingpongColor;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function drawLeftStriker() {
    
    ctx.beginPath();
    ctx.rect(leftStriker.x, leftStriker.y, striker.w, striker.h);
    ctx.fillStyle = pingpongColor;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
}

function drawBoundary() {
    
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.fillStyle = pingpongColor;
    ctx.moveTo(250, 0);
    ctx.lineTo(250, canvas.h);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();   
}