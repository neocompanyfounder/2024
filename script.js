const gridContainer = document.querySelector('.grid-container');
const scoreDisplay = document.getElementById('score');
let score = 0;
let grid = Array(4).fill().map(() => Array(4).fill(0));
let gameOver = false;

function createTile(value) {
    const tile = document.createElement('div');
    tile.classList.add('tile', `tile-${value}`);
    tile.innerText = value || '';
    return tile;
}

function updateGrid() {
    gridContainer.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const tile = createTile(grid[i][j]);
            gridContainer.appendChild(tile);
        }
    }
}

function addNewTile() {
    const emptyCells = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                emptyCells.push({ i, j });
            }
        }
    }
    if (emptyCells.length > 0) {
        const { i, j } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[i][j] = Math.random() < 0.9 ? 2 : 4;
    }
}

function moveLeft() {
    let moved = false;
    for (let i = 0; i < 4; i++) {
        let row = grid[i].filter(cell => cell !== 0);
        for (let j = 0; j < row.length - 1; j++) {
            if (row[j] === row[j + 1]) {
                row[j] *= 2;
                score += row[j];
                row.splice(j + 1, 1);
                moved = true;
            }
        }
        const newRow = row.concat(Array(4 - row.length).fill(0));
        if (JSON.stringify(grid[i]) !== JSON.stringify(newRow)) {
            moved = true;
        }
        grid[i] = newRow;
    }
    return moved;
}

function moveRight() {
    let moved = false;
    for (let i = 0; i < 4; i++) {
        let row = grid[i].filter(cell => cell !== 0);
        for (let j = row.length - 1; j > 0; j--) {
            if (row[j] === row[j - 1]) {
                row[j] *= 2;
                score += row[j];
                row.splice(j - 1, 1);
                moved = true;
            }
        }
        const newRow = Array(4 - row.length).fill(0).concat(row);
        if (JSON.stringify(grid[i]) !== JSON.stringify(newRow)) {
            moved = true;
        }
        grid[i] = newRow;
    }
    return moved;
}

function transpose() {
    const newGrid = Array(4).fill().map(() => Array(4).fill(0));
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            newGrid[i][j] = grid[j][i];
        }
    }
    grid = newGrid;
}

function moveUp() {
    transpose();
    const moved = moveLeft();
    transpose();
    return moved;
}

function moveDown() {
    transpose();
    const moved = moveRight();
    transpose();
    return moved;
}

function checkGameOver() {
    // Check for any empty cells
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) return false;
        }
    }
    
    // Check for possible merges
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[i][j] === grid[i][j + 1]) return false;
        }
    }
    for (let j = 0; j < 4; j++) {
        for (let i = 0; i < 3; i++) {
            if (grid[i][j] === grid[i + 1][j]) return false;
        }
    }
    return true;
}

function handleKeyPress(event) {
    if (gameOver) return;
    
    let moved = false;
    switch(event.key) {
        case 'ArrowLeft':
            moved = moveLeft();
            break;
        case 'ArrowRight':
            moved = moveRight();
            break;
        case 'ArrowUp':
            moved = moveUp();
            break;
        case 'ArrowDown':
            moved = moveDown();
            break;
        default:
            return;
    }
    
    if (moved) {
        addNewTile();
        updateGrid();
        scoreDisplay.textContent = score;
        
        if (checkGameOver()) {
            gameOver = true;
            alert('Game Over! Your score: ' + score);
        }
    }
}

function initGame() {
    grid = Array(4).fill().map(() => Array(4).fill(0));
    score = 0;
    gameOver = false;
    scoreDisplay.textContent = '0';
    
    // Add initial tiles
    addNewTile();
    addNewTile();
    updateGrid();
}

document.addEventListener('keydown', handleKeyPress);
initGame();
