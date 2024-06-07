let board;
let score = 0;
let highScore = localStorage.getItem('2048HighScore') || 0;

document.getElementById('current-score').innerText = `Score: ${score}`;
document.getElementById('highest-score').innerText = `High Score: ${highScore}`;

document.addEventListener('keydown', handleKeyPress);

function initBoard() {
    board = Array.from({ length: 4 }, () => Array(4).fill(0));
    addTile();
    addTile();
    updateBoardView();
    updateScore();
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
    }
    addTile();
    updateBoardView();
    updateScore();
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
    row = row.filter(val => val !== 0);
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
            row[i] *= 2;
            score += row[i];
            row[i + 1] = 0;
        }
    }
    return row.filter(val => val !== 0).concat(Array(4 - row.filter(val => val !== 0).length).fill(0));
}

function compressColumn(col) {
    col = col.filter(val => val !== 0);
    for (let i = 0; i < col.length - 1; i++) {
        if (col[i] === col[i + 1]) {
            col[i] *= 2;
            score += col[i];
            col[i + 1] = 0;
        }
    }
    return col.filter(val => val !== 0).concat(Array(4 - col.filter(val => val !== 0).length).fill(0));
}

function resetGame() {
    score = 0;
    initBoard();
    updateScore();
}

document.addEventListener('DOMContentLoaded', function() {
    const newGameButton = document.querySelector('button');
    newGameButton.addEventListener('click', resetGame);
});

// Initialize the game
initBoard();
