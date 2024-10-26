const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');
const changeBackgroundButton = document.getElementById('changeBackgroundButton');
const gameMessage = document.getElementById('gameMessage');
const winnerLine = document.getElementById('winnerLine');
let currentPlayer = 'X';
let gameActive = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

const backgroundColors = ['#f9f5ec', '#e6f7ff', '#fff0f5', '#f0fff0']; // Arka plan renkleri dizisi
let currentBackgroundIndex = 0;

const winningConditions = [
    [0, 1, 2], // Üst sıra
    [3, 4, 5], // Orta sıra
    [6, 7, 8], // Alt sıra
    [0, 3, 6], // Sol sütun
    [1, 4, 7], // Orta sütun
    [2, 5, 8], // Sağ sütun
    [0, 4, 8], // Sol üstten sağ alta çapraz
    [2, 4, 6]  // Sağ üstten sol alta çapraz
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const cellIndex = clickedCell.getAttribute('data-index');

    if (boardState[cellIndex] !== '' || !gameActive) {
        return;
    }

    boardState[cellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer); // Renk değiştirme için sınıf ekleme

    checkResult();
    if (gameActive) {
        switchPlayer();
    }
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const [a, b, c] = condition;
        if (
            boardState[a] &&
            boardState[a] === boardState[b] &&
            boardState[a] === boardState[c]
        ) {
            roundWon = true;
            drawWinnerLine(condition);
            break;
        }
    }

    if (roundWon) {
        gameMessage.textContent = `Oyuncu ${currentPlayer} kazandı!`;
        gameActive = false;
    } else if (!boardState.includes('')) {
        gameMessage.textContent = 'Oyun berabere!';
        gameActive = false;
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    boardState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O'); // Renk sınıflarını kaldır
    });
    gameMessage.textContent = '';
    winnerLine.style.width = 0;
    winnerLine.style.height = 0;
}

function drawWinnerLine(winningCondition) {
    const firstCell = cells[winningCondition[0]];
    const lastCell = cells[winningCondition[2]];

    const firstCellRect = firstCell.getBoundingClientRect();
    const lastCellRect = lastCell.getBoundingClientRect();
    const boardRect = document.querySelector('.game-board').getBoundingClientRect();

    const x1 = firstCellRect.left + firstCellRect.width / 2 - boardRect.left;
    const y1 = firstCellRect.top + firstCellRect.height / 2 - boardRect.top;
    const x2 = lastCellRect.left + lastCellRect.width / 2 - boardRect.left;
    const y2 = lastCellRect.top + lastCellRect.height / 2 - boardRect.top;

    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1);

    winnerLine.style.width = `${length}px`;
    winnerLine.style.height = '5px';
    winnerLine.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle}rad)`;
    winnerLine.style.backgroundColor = 'red';
}

function changeBackground() {
    currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundColors.length;
    document.body.style.backgroundColor = backgroundColors[currentBackgroundIndex];
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
changeBackgroundButton.addEventListener('click', changeBackground);
