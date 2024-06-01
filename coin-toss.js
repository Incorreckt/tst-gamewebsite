function tossCoin() {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    document.getElementById('coinResult').innerText = `You got ${result}`;
}
