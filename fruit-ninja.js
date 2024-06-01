const canvas = document.getElementById('fruitNinjaCanvas');
const ctx = canvas.getContext('2d');

let fruits = [];
let score = 0;

function createFruit() {
    const colors = ['red', 'orange', 'yellow', 'green'];
    const sizes = [20, 25, 30, 35];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
    const x = Math.random() * (canvas.width - randomSize);
    const y = canvas.height;
    const velocity = Math.random() * 3 + 1;

    return { x, y, size: randomSize, color: randomColor, velocity };
}

function drawFruit(fruit) {
    ctx.beginPath();
    ctx.arc(fruit.x, fruit.y, fruit.size, 0, Math.PI * 2);
    ctx.fillStyle = fruit.color;
    ctx.fill();
    ctx.closePath();
}

function updateFruits() {
    fruits.forEach(fruit => {
        fruit.y -= fruit.velocity;
        if (fruit.y < 0) {
            fruits = fruits.filter(f => f !== fruit);
        }
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    fruits.forEach(fruit => drawFruit(fruit));
    updateFruits();

    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('click', event => {
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;

    fruits.forEach((fruit, index) => {
        const dx = clickX - fruit.x;
        const dy = clickY - fruit.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < fruit.size) {
            score++;
            fruits.splice(index, 1);
        }
    });
});

for (let i = 0; i < 10; i++) {
    fruits.push(createFruit());
}

gameLoop();
