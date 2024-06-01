function rollDice() {
    const result = Math.floor(Math.random() * 6) + 1;
    document.getElementById('diceResult').innerText = `You rolled a ${result}`;
}
