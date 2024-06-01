document.getElementById('rock').onclick = () => playGame('rock');
document.getElementById('paper').onclick = () => playGame('paper');
document.getElementById('scissors').onclick = () => playGame('scissors');

function playGame(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    let result = '';

    if (playerChoice === computerChoice) {
        result = `It's a draw! You both chose ${playerChoice}`;
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        result = `You win! ${playerChoice} beats ${computerChoice}`;
    } else {
        result = `You lose! ${computerChoice} beats ${playerChoice}`;
    }

    document.getElementById('result').innerText = result;
}
