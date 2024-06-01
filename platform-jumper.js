const canvas = document.getElementById('platformJumperCanvas');
const ctx = canvas.getContext('2d');

let player = { x: 150, y: 250, width: 20, height: 20, speed: 2, dy: 0 };
let platforms = [];
let isJumping = false;

function createPlatform(x, y, width, height) {
    return { x, y, width, height };
}

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
    ctx.fillStyle = 'green';
    platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

function updatePlatforms() {
    platforms.forEach(platform => {
        platform.y -= player.speed;
    });
    platforms = platforms.filter(platform => platform.y > 0);
    if (platforms.length < 5) {
        let lastPlatform = platforms[platforms.length - 1];
        platforms.push(createPlatform(Math.random() * (canvas.width - 50), lastPlatform.y - 100, 50, 10));
    }
}

function updatePlayer() {
    player.y += player.dy;
    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.dy = 0;
    } else {
        player.dy += 0.5;
    }
    platforms.forEach(platform => {
        if (
            player.y + player.height <= platform.y &&
            player.y + player.height + player.dy >= platform.y &&
            player.x + player.width > platform.x &&
            player.x < platform.x + platform.width
        ) {
            player.dy = -10;
            isJumping = true;
        }
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawPlatforms();
    updatePlayer();
    updatePlatforms();
    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', () => {
    if (!isJumping) {
        player.dy = -10;
        isJumping = true;
    }
});

gameLoop();
