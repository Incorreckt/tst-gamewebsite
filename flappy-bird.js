const canvas = document.getElementById('flappyBirdCanvas');
const context = canvas.getContext('2d');

let bird = {
    x: 50,
    y: 150,
    width: 20,
    height: 20,
    gravity: 1.5,
    lift: -25,
    velocity: 0
};

let pipes = [];
let pipeWidth = 20;
let pipeGap = 100;
let frameCount = 0;
let score = 0;

function drawBird() {
    context.fillStyle = 'yellow';
    context.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
    context.fillStyle = 'green';
    pipes.forEach(pipe => {
        context.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        context.fillRect(pipe.x, canvas.height - pipe.bottom, pipeWidth, pipe.bottom);
    });
}

function updatePipes() {
    if (frameCount % 75 === 0) {
        let pipeTop = Math.floor(Math.random() * (canvas.height - pipeGap));
        let pipeBottom = canvas.height - pipeGap - pipeTop;
        pipes.push({ x: canvas.width, top: pipeTop, bottom: pipeBottom });
    }
    pipes.forEach(pipe => {
        pipe.x -= 2;
    });
    pipes = pipes.filter(pipe => pipe.x > -pipeWidth);
}

function updateBird() {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;
    if (bird.y + bird.height > canvas.height) {
        bird.y = canvas.height - bird.height;
        bird.velocity = 0;
    }
}

function checkCollision() {
    for (let i = 0; i < pipes.length; i++) {
        let pipe = pipes[i];
        if (bird.x < pipe.x + pipeWidth && bird.x + bird.width > pipe.x && (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom)) {
            resetGame();
        }
    }
}

function resetGame() {
    bird.y = 150;
    bird.velocity = 0;
    pipes = [];
    score = 0;
}

function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    frameCount++;
    drawBird();
    drawPipes();
    updateBird();
    updatePipes();
    checkCollision();
    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', () => {
    bird.velocity = bird.lift;
});

gameLoop();
