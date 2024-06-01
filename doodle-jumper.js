const canvas = document.getElementById('doodleJumperCanvas');
const ctx = canvas.getContext('2d');

let doodle = { x: 150, y: 400, width: 20, height: 20, dy: 0 };
let platforms = [];
let score = 0;

function createPlatform(x, y, width, height) {
    return { x, y, width, height };
}

function drawDoodle() {
    ctx.fillStyle = 'black';
    ctx.fillRect(doodle.x, doodle.y, doodle.width, doodle.height);
}

function drawPlatforms() {
    ctx.fillStyle = 'green';
    platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

function updatePlatforms() {
    platforms.forEach(platform => {
        platform.y -= 2;
    });
    platforms = platforms.filter(platform => platform.y > 0);
    if (platforms.length < 5) {
        let lastPlatform = platforms[platforms.length - 1];
        platforms.push(createPlatform(Math.random() * (canvas.width - 50), lastPlatform.y - 100, 50, 10));
    }
}

function updateDoodle() {
    doodle.y -= doodle.dy;
    if (doodle.y > canvas.height) {
        doodle.y = canvas.height;
        doodle.dy = 0;
    } else if (doodle.y < 0) {
        doodle.y = 0;
    }
    platforms.forEach(platform => {
        if (
            doodle.y + doodle.height >= platform.y &&
            doodle.y + doodle.height <= platform.y + platform.height &&
            doodle.x + doodle.width > platform.x &&
            doodle.x < platform.x + platform.width
        ) {
            doodle.dy = 0;
            doodle.y = platform.y - doodle.height;
            score++;
        }
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDoodle();
    drawPlatforms();
    updateDoodle();
    updatePlatforms();
    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', () => {
    doodle.dy = 7;
});

gameLoop();
