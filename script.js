document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    const message = document.getElementById('message');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const index = event.target.getAttribute('data-index');

        if (board[index] || !gameActive) {
            return;
        }

        board[index] = currentPlayer;
        event.target.textContent = currentPlayer;

        if (checkWin()) {
            message.textContent = `${currentPlayer} wins!`;
            gameActive = false;
            highlightWinningTiles();
        } else if (board.every(cell => cell)) {
            message.textContent = `It's a tie!`;
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            const win = combination.every(index => {
                return board[index] === currentPlayer;
            });
            if (win) {
                combination.forEach(index => {
                    cells[index].classList.add(`win-${currentPlayer.toLowerCase()}`);
                });
            }
            return win;
        });
    }

    function highlightWinningTiles() {
        winningCombinations.forEach(combination => {
            if (combination.every(index => board[index] === currentPlayer)) {
                combination.forEach(index => {
                    cells[index].classList.add(`win-${currentPlayer.toLowerCase()}`);
                });
            }
        });
    }

    function resetGame() {
        board.fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('win-x', 'win-o');
        });
        currentPlayer = 'X';
        gameActive = true;
        message.textContent = `Player ${currentPlayer}'s turn`;
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);

    message.textContent = `Player ${currentPlayer}'s turn`;
});
