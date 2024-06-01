const numberToGuess = Math.floor(Math.random() * 100) + 1;

function checkGuess() {
    const userGuess = Number(document.getElementById('guess').value);
    let result = '';
    
    if (userGuess === numberToGuess) {
        result = 'Congratulations! You guessed the correct number.';
    } else if (userGuess > numberToGuess) {
        result = 'Too high! Try again.';
    } else {
        result = 'Too low! Try again.';
    }
    
    document.getElementById('guessResult').innerText = result;
}
