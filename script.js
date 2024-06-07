let board;
let score = 0;
let highScore = localStorage.getItem('2048HighScore') || 0;

document.getElementById('current-score').innerText = `Score: ${score}`;
document.getElementById('highest-score').innerText = `High Score: ${highScore}`;

// Update function for the board setup and initialization
function initBoard() {
    board = Array.from({ length: 4 }, () => Array(4).fill(0));
    // Rest of the initialization logic...
}

// Update function for adding tiles
function addTile() {
    // Your existing logic for adding a tile
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

// Update function for the game logic
function moveAndMerge(direction) {
    // Your existing logic for moving and merging tiles
    // Update the score whenever you merge tiles
    // Example:
    // score += mergedTileValue;

    updateScore();
}

// Call this function when you need to reset the game
function resetGame() {
    score = 0;
    initBoard();
    updateScore();
}

    addTile();
    addTile();
    drawBoard();
});
