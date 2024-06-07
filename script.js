document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    let board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    function addTile() {
        let emptyCells = [];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                if (board[i][j] === 0) {
                    emptyCells.push({ x: i, y: j });
                }
            }
        }
        if (emptyCells.length > 0) {
            let { x, y } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            board[x][y] = Math.random() < 0.9 ? 2 : 4;
            drawBoard();
        }
    }

    function drawBoard() {
        gameBoard.innerHTML = '';
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                let tile = document.createElement('div');
                tile.classList.add('tile');
                if (board[i][j] !== 0) {
                    tile.classList.add('tile-' + board[i][j]);
                    tile.innerText = board[i][j];
                }
                gameBoard.appendChild(tile);
            }
        }
    }

    function move(direction) {
        let rotated = false;
        if (direction === 'up' || direction === 'down') {
            board = rotateBoard(board);
            rotated = true;
        }
        if (direction === 'right' || direction === 'down') {
            for (let i = 0; i < 4; i++) {
                board[i] = board[i].reverse();
            }
        }

        let moved = false;
        for (let i = 0; i < 4; i++) {
            let newRow = [0, 0, 0, 0];
            let pos = 0;
            for (let j = 0; j < 4; j++) {
                if (board[i][j] !== 0) {
                    if (newRow[pos] === board[i][j]) {
                        newRow[pos] *= 2;
                        pos++;
                    } else if (newRow[pos] === 0) {
                        newRow[pos] = board[i][j];
                    } else {
                        pos++;
                        newRow[pos] = board[i][j];
                    }
                    moved = true;
                }
            }
            board[i] = newRow;
        }

        if (direction === 'right' || direction === 'down') {
            for (let i = 0; i < 4; i++) {
                board[i] = board[i].reverse();
            }
        }
        if (rotated) {
            board = rotateBoard(board);
        }
        if (moved) {
            addTile();
        }
    }

    function rotateBoard(board) {
        let newBoard = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                newBoard[j][3 - i] = board[i][j];
            }
        }
        return newBoard;
    }

    document.addEventListener('keydown', (event) => {
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
    });

    addTile();
    addTile();
    drawBoard();
});
