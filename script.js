// Game state variables
let board = ['', '', '', '', '', '', '', '', '']; // Represents the 9 cells
let currentPlayer = 'X';
let gameActive = true;

// DOM element references
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

// Winning patterns (indices of the board array)
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// --- Core Game Functions ---

// Handles a player making a move
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Check if the cell is already filled or the game is over
    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    // Place the current player's mark and update the display
    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    // Set the data attribute for CSS styling (neon color/glow)
    clickedCell.setAttribute('data-player', currentPlayer); 

    handleResultValidation();
}

// Checks if the game has been won or tied
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];

        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }

        // Check for a winner
        if (board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `Player ${currentPlayer} has won! 🎉`;
        gameActive = false;
        // Disable all buttons after a win
        cells.forEach(cell => cell.disabled = true);
        return;
    }

    // Check for a Tie (if all cells are filled and no one has won)
    let roundDraw = !board.includes('');
    if (roundDraw) {
        statusDisplay.innerHTML = 'Game ended in a draw! 🤝';
        gameActive = false;
        return;
    }

    // If no win or tie, switch players
    handlePlayerChange();
}

// Switches the active player (X to O, or O to X)
function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = `Player ${currentPlayer}'s turn`;
}

// Resets the game to its initial state
function handleRestartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.innerHTML = `Player ${currentPlayer}'s turn`;
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.disabled = false; // Re-enable all cells
        cell.removeAttribute('data-player'); // Remove the neon styling attribute
    });
}

// --- Event Listeners ---
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleRestartGame);
