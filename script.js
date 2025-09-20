const gameBoard = document.querySelector('.game-board');
const cells = document.querySelectorAll('[data-cell]');
const gameStatus = document.querySelector('.game-status');
const restartButton = document.querySelector('.restart-btn');
let isXTurn = true;
let gameActive = true;

const winCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

startGame();

function startGame() {
    isXTurn = true;
    gameActive = true;
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setGameStatus("X's Turn");
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? 'x' : 'o';
    
    if (!gameActive || cell.classList.contains('x') || cell.classList.contains('o')) return;

    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    isXTurn = !isXTurn;
    setGameStatus(`${isXTurn ? "X" : "O"}'s Turn`);
}

function checkWin(currentClass) {
    return winCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
}

function endGame(draw) {
    gameActive = false;
    if (draw) {
        setGameStatus("It's a Draw!");
    } else {
        setGameStatus(`${isXTurn ? "X" : "O"} Wins!`);
    }
}

function setGameStatus(message) {
    gameStatus.textContent = message;
}

restartButton.addEventListener('click', startGame);