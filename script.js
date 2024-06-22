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
            if (board[row][col] !== 0) {
                const img = document.createElement('img');
                img.src = `images/${board[row][col]}.png`;
                img.alt = board[row][col];
                img.onerror = function() {
                    this.src = '';  // Clear the image src if it fails to load
                };
                tile.appendChild(img);
            }
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
    let boardChanged = false;
    switch (event.key) {
        case 'ArrowUp':
            boardChanged = move('up');
            break;
        case 'ArrowDown':
            boardChanged = move('down');
            break;
        case 'ArrowLeft':
            boardChanged = move('left');
            break;
        case 'ArrowRight':
            boardChanged = move('right');
            break;
    }
    if (boardChanged) {
        addTile();
        updateBoardView();
        updateScore();
    }
    if (!movesAvailable()) {
        gameOver = true;
        displayGameOver();
    }
}

function movesAvailable() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] === 0) return true;
            if (row < 3 && board[row][col] === board[row + 1][col]) return true;
            if (col < 3 && board[row][col] === board[row][col + 1]) return true;
        }
    }
    return false;
}

function displayGameOver() {
    const gameBoard = document.getElementById('game-board');
    const gameOverText = document.createElement('div');
    gameOverText.innerText = 'Game Over!';
    gameOverText.classList.add('game-over');
    gameBoard.appendChild(gameOverText);
}

function move(direction) {
    let boardChanged = false;
    let originalBoard = JSON.parse(JSON.stringify(board));

    switch (direction) {
        case 'up':
            for (let col = 0; col < 4; col++) {
                let compressedColumn = compress(board.map(row => row[col]));
                for (let row = 0; row < 4; row++) {
                    board[row][col] = compressedColumn[row];
                }
            }
            break;
        case 'down':
            for (let col = 0; col < 4; col++) {
                let compressedColumn = compress(board.map(row => row[col]).reverse()).reverse();
                for (let row = 0; row < 4; row++) {
                    board[row][col] = compressedColumn[row];
                }
            }
            break;
        case 'left':
            for (let row = 0; row < 4; row++) {
                let compressedRow = compress(board[row]);
                board[row] = compressedRow;
            }
            break;
        case 'right':
            for (let row = 0; row < 4; row++) {
                let compressedRow = compress(board[row].reverse()).reverse();
                board[row] = compressedRow;
            }
            break;
    }

    boardChanged = !boardsEqual(originalBoard, board);
    return boardChanged;
}

function compress(line) {
    let newLine = line.filter(val => val !== 0);
    for (let i = 0; i < newLine.length - 1; i++) {
        if (newLine[i] === newLine[i + 1]) {
            newLine[i] *= 2;
            score += newLine[i];
            newLine[i + 1] = 0;
        }
    }
    newLine = newLine.filter(val => val !== 0);
    while (newLine.length < 4) {
        newLine.push(0);
    }
    return newLine;
}

function boardsEqual(board1, board2) {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board1[row][col] !== board2[row][col]) return false;
        }
    }
    return true;
}

function resetGame() {
    score = 0;
    initBoard();
}

window.onload = initBoard;
