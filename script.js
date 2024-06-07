let board;
let score = 0;
let highScore = localStorage.getItem('2048HighScore') || 0;

document.getElementById('current-score').innerText = `Score: ${score}`;
document.getElementById('highest-score').innerText = `High Score: ${highScore}`;

function initBoard() {
    board = Array.from({ length: 4 }, () => Array(4).fill(0));
    // Add initial tiles and update board
    updateBoardView();
    updateScore();
}

function addTile() {
    // Your logic for adding a new tile
    updateScore();
}

function updateScore() {
    document.getElementById('current-score').innerText = `Score: ${score}`;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('2048HighScore', highScore);
        document.getElementById('highest-score').innerText = `High Score: ${highScore}`;
    }
}

function moveAndMerge(direction) {
    // Your logic for moving and merging tiles
    let merged = false;
    // Example merge logic
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] > 0) {
                score += board[row][col];
                merged = true;
            }
        }
    }

    if (merged) {
        addTile();
    }

    updateScore();
}

function updateBoardView() {
    // Your logic for updating the board view
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const tile = document.getElementById(`tile-${row}-${col}`);
            if (tile) {
                tile.style.transform = `translate(${col * 110}px, ${row * 110}px)`;
            }
        }
    }
}

// Initialize the game
initBoard();

    addTile();
    addTile();
    drawBoard();
});
