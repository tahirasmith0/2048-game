let board;
let score = 0;
let highScore = localStorage.getItem('2048HighScore') || 0;
let gameOver = false;

document.getElementById('current-score').innerText = `Score: ${score}`;
document.getElementById('highest-score').innerText = `High Score: ${highScore}`;

document.addEventListener('keydown', handleKeyPress);

function initBoard() {
    board = Array.from({ length: 4 }, () => Array(4).fill(0));
    addTile();
    addTile();
    updateBoardView();
    updateScore();
    gameOver = false;
}

function addTile() {
    let emptyTiles = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] === 0) emptyTiles.push({ row, col });
        }
    }
    if (emptyTiles.length > 0) {
        let { row, col } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateBoardView() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const tile = document.createElement('div');
            tile.className = `tile tile-${board[row][col]}`;
            tile.innerText = board[row][col] === 0 ? '' : board[row][col];
            gameBoard.appendChild(tile);
        }
    }
}

function updateScore() {
    document.getElementById('current-score').innerText = `Score: ${score}`;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('2048HighScore', highScore);
        document.getElementById('highest-score').innerText = `High Score: ${highScore}`;
    }
}

function handleKeyPress(event) {
    if (gameOver) return;
    switch (event.key) {
        case 'ArrowUp':
            move('up');
            break;
        case 'ArrowDown':
            move('down');
            break;
        case 'ArrowLeft':
            move('left');
            break;
        case 'ArrowRight':
            move('right');
            break;
        case ' ':
            resetGame();
            break;
    }
    addTile();
    updateBoardView();
    updateScore();
    if (!movesAvailable()) {
        gameOver = true;
        displayGameOver();
    }
}

function movesAvailable() {
    // Check if there are any empty cells or adjacent cells with the same value
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] === 0) return true; // Empty cell found
            if (row < 3 && board[row][col] === board[row + 1][col]) return true; // Same value below
            if (col < 3 && board[row][col] === board[row][col + 1]) return true; // Same value to the right
        }
    }
    return false;
}

function displayGameOver() {
    const gameBoard = document.getElementById('game-board');
    const gameOverText = document.createElement('div');
    gameOverText.innerText = 'Game Over! Press Space to Restart';
    gameOverText.classList.add('game-over');
    gameBoard.appendChild(gameOverText);
}

function move(direction) {
    switch (direction) {
        case 'up':
            for (let col = 0; col < 4; col++) {
                let compressed = compressColumn(board.map(row => row[col]));
                for (let row = 0; row < 4; row++) board[row][col] = compressed[row];
            }
            break;
        case 'down':
            for (let col = 0; col < 4; col++) {
                let compressed = compressColumn(board.map(row => row[col]).reverse()).reverse();
                for (let row = 0; row < 4; row++) board[row][col] = compressed[row];
            }
            break;
        case 'left':
            for (let row = 0; row < 4; row++) {
                board[row] = compressRow(board[row]);
            }
            break;
        case 'right':
            for (let row = 0; row < 4; row++) {
                board[row] = compressRow(board[row].reverse()).reverse();
            }
            break;
    }
}

function compressRow(row) {
    let result = [];
    let merged = false;
    for (let i = 0; i < row.length; i++) {
        if (row[i] !== 0) {
            let currentValue = row[i];
            if (!merged && i + 1 < row.length && row[i + 1] === currentValue) {
                // Merge adjacent tiles if they have the same value
                result.push(currentValue * 2);
                score += currentValue * 2;
                merged = true;
            } else {
                result.push(currentValue);
                merged = false;
            }
        }
    }
    // Fill the rest of the row with zeros
    while (result.length < 4) {
        result.push(0);
    }
    return result;
}

function compressColumn(col) {
    let result = [];
    let merged = false;
    for (let i = 0; i < col.length; i++) {
        if (col[i] !== 0) {
            let currentValue = col[i];
            if (!merged && i + 1 < col.length && col[i + 1] === currentValue) {
                // Merge adjacent tiles if they have the same value
                result.push(currentValue * 2);
                score += currentValue * 2;
                merged = true;
            } else {
                result.push(currentValue);
                merged = false;
            }
        }
    }
    // Fill the rest of the column with zeros
    while (result.length < 4) {
        result.push(0);
    }
    return result;
}

function resetGame() {
    score = 0;
    initBoard();
    updateScore();
    const gameOverText = document.querySelector('.game-over');
    if (gameOverText) gameOverText.remove();
}

// Initialize the game
initBoard();
