const boardSize = 4;
let board = [];
let score = 0;
const tileColors = {
    2: '#eee4da',
    4: '#ede0c8',
    8: '#f2b179',
    16: '#f59563',
    32: '#f67c5f',
    64: '#f65e3b',
    128: '#edcf72',
    256: '#edcc61',
    512: '#edc850',
    1024: '#edc53f',
    2048: '#edc22e'
};

function initializeBoard() {
    board = [];
    for (let i = 0; i < boardSize; i++) {
        board[i] = [];
        for (let j = 0; j < boardSize; j++) {
            board[i][j] = 0;
        }
    }
    addRandomTile();
    addRandomTile();
    drawBoard();
    score = 0;
    updateScore();
}

function addRandomTile() {
    const emptyTiles = [];
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j] === 0) {
                emptyTiles.push({ x: i, y: j });
            }
        }
    }
    if (emptyTiles.length > 0) {
        const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[randomTile.x][randomTile.y] = Math.random() < 0.9 ? 2 : 4;
    }
}

function drawBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.innerText = board[i][j] === 0 ? '' : board[i][j];
            cell.style.backgroundColor = board[i][j] === 0 ? '#cdc1b4' : tileColors[board[i][j]];
            boardElement.appendChild(cell);
        }
    }
}

function move(direction) {
    let moved = false;

    if (direction === 'up') {
        for (let j = 0; j < boardSize; j++) {
            let column = [];
            for (let i = 0; i < boardSize; i++) {
                if (board[i][j] !== 0) column.push(board[i][j]);
            }
            moved = merge(column) || moved;
            for (let i = 0; i < boardSize; i++) {
                board[i][j] = column[i] || 0;
            }
        }
    } else if (direction === 'down') {
        for (let j = 0; j < boardSize; j++) {
            let column = [];
            for (let i = boardSize - 1; i >= 0; i--) {
                if (board[i][j] !== 0) column.push(board[i][j]);
            }
            moved = merge(column) || moved;
            for (let i = boardSize - 1; i >= 0; i--) {
                board[i][j] = column[boardSize - 1 - i] || 0;
            }
        }
    } else if (direction === 'left') {
        for (let i = 0; i < boardSize; i++) {
            let row = [];
            for (let j = 0; j < boardSize; j++) {
                if (board[i][j] !== 0) row.push(board[i][j]);
            }
            moved = merge(row) || moved;
            for (let j = 0; j < boardSize; j++) {
                board[i][j] = row[j] || 0;
            }
        }
    } else if (direction === 'right') {
        for (let i = 0; i < boardSize; i++) {
            let row = [];
            for (let j = boardSize - 1; j >= 0; j--) {
                if (board[i][j] !== 0) row.push(board[i][j]);
            }
            moved = merge(row) || moved;
            for (let j = boardSize - 1; j >= 0; j--) {
                board[i][j] = row[boardSize - 1 - j] || 0;
            }
        }
    }

    if (moved) {
        addRandomTile();
        drawBoard();
        updateScore();
        if (checkGameOver()) {
            alert('Game Over!');
        }
    }
}

function merge(row) {
    let merged = false;
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
            row[i] *= 2;
            score += row[i];
            row.splice(i + 1, 1);
            row.push(0);
            merged = true;
        }
    }
    return merged;
}

function checkGameOver() {
    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            if (board[i][j] === 0) return false;
            if (i < boardSize - 1 && board[i][j] === board[i + 1][j]) return false;
            if (j < boardSize - 1 && board[i][j] === board[i][j + 1]) return false;
        }
    }
    return true;
}

function updateScore() {
    document.getElementById('score').innerText = `Score: ${score}`;
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
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    initializeBoard();
    document.addEventListener('keydown', handleKeyPress);
});

function resetGame() {
    initializeBoard();
    score = 0;
    updateScore();
}
