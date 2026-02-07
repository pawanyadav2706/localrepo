document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("status");
    const resetButton = document.getElementById("reset");
    const resultScreen = document.getElementById("resultScreen");
    const resultMessage = document.getElementById("resultMessage");
    const newGameButton = document.getElementById("newGame");

    let currentPlayer = "X";
    let boardState = Array(9).fill(null);
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    function checkWinner() {
        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                gameActive = false;
                showResult(`Player ${currentPlayer} Wins!`);
                return;
            }
        }

        if (!boardState.includes(null)) {
            gameActive = false;
            showResult("It's a Draw!");
        }
    }

    function handleClick(event) {
        const index = event.target.dataset.index;

        if (boardState[index] || !gameActive) return;

        boardState[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        checkWinner();

        if (gameActive) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }

    function resetGame() {
        boardState.fill(null);
        gameActive = true;
        currentPlayer = "X";
        statusText.textContent = "Player X's Turn";
        cells.forEach(cell => cell.textContent = "");
        resultScreen.style.display = "none"; // Hide result screen
    }

    function showResult(message) {
        resultMessage.textContent = message;
        resultScreen.style.display = "flex";
    }

    cells.forEach(cell => cell.addEventListener("click", handleClick));
    resetButton.addEventListener("click", resetGame);
    newGameButton.addEventListener("click", resetGame);
});
