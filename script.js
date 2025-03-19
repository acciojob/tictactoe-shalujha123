document.addEventListener("DOMContentLoaded", () => {
    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");
    const submitBtn = document.getElementById("submit");
    const gameBoard = document.getElementById("game-board");
    const messageDisplay = document.querySelector(".message");
    const cells = document.querySelectorAll(".cell");

    let currentPlayer = "X";
    let player1, player2;
    let board = ["", "", "", "", "", "", "", "", ""];
    let gameActive = false;

    // Start game when names are entered
    submitBtn.addEventListener("click", () => {
        player1 = player1Input.value.trim() || "Player 1";
        player2 = player2Input.value.trim() || "Player 2";
        
        messageDisplay.textContent = `${player1}, you're up`;
        gameBoard.classList.remove("hidden");
        document.getElementById("player-form").classList.add("hidden");
        gameActive = true;
    });

    // Handle cell click
    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            if (!gameActive || cell.textContent !== "") return;

            let index = parseInt(cell.id) - 1;
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;

            if (checkWinner()) {
                messageDisplay.textContent = `${getPlayerName(currentPlayer)} congratulations you won!`;
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === "X" ? "O" : "X";
            messageDisplay.textContent = `${getPlayerName(currentPlayer)}, you're up`;
        });
    });

    function getPlayerName(symbol) {
        return symbol === "X" ? player1 : player2;
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return board[a] !== "" && board[a] === board[b] && board[a] === board[c];
        });
    }
});
