const game = document.getElementById('game');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
const changeBgButton = document.getElementById('change-bg');
const bgUpload = document.getElementById('bg-upload');
const currentPlayerText = document.getElementById('current-player');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let scores = { X: 0, O: 0 };

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWin = () => {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            return true;
        }
    }
    return false;
};

const checkDraw = () => {
    return gameState.every(cell => cell !== null);
};

const handleClick = (event) => {
    const index = event.target.dataset.index;

    if (gameState[index] || checkWin()) {
        return;
    }

    gameState[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
        statusText.textContent = `${currentPlayer} kazandı!`;
        scores[currentPlayer]++;
        updateScores();
        return;
    }

    if (checkDraw()) {
        statusText.textContent = 'Berabere!';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    currentPlayerText.textContent = `Sıradaki: ${currentPlayer}`;
};

const resetGame = () => {
    gameState.fill(null);
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
    statusText.textContent = `Sıradaki: ${currentPlayer}`;
    currentPlayerText.textContent = `Sıradaki: ${currentPlayer}`;
};

const updateScores = () => {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
};

const changeBackground = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        document.body.style.backgroundImage = `url(${e.target.result})`;
    };
    if (file) {
        reader.readAsDataURL(file);
    }
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
bgUpload.addEventListener('change', changeBackground);

statusText.textContent = `Sıradaki: ${currentPlayer}`;
currentPlayerText.textContent = `Sıradaki: ${currentPlayer}`;
