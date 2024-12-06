const gridContainer = document.querySelector('.grid-container');
const scoreDisplay = document.getElementById('score');
let score = 0;

function createTile(value) {
    const tile = document.createElement('div');
    tile.classList.add('tile', `tile-${value}`);
    tile.innerText = value;
    return tile;
}

function initGame() {
    for (let i = 0; i < 16; i++) {
        const tileValue = (Math.random() < 0.5) ? 2 : 4;
        const tile = createTile(tileValue);
        gridContainer.appendChild(tile);
    }
}

initGame();
