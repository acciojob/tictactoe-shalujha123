const board = document.getElementById("board");
        const cells = document.querySelectorAll(".cell");
        const startGameButton = document.getElementById("startGame");
        const resetButton = document.getElementById("reset");
        const winnerDisplay = document.getElementById("winner");
        const playerXInput = document.getElementById("playerX");
        const playerOInput = document.getElementById("playerO");

        let currentPlayer = "X";
        let gameBoard = ["", "", "", "", "", "", "", "", ""];
        let gameActive = false;  // Game tabhi start hoga jab Start Game click hoga

        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        function getPlayerName(symbol) {
            return symbol === "X" ? (playerXInput.value || "Player X") : (playerOInput.value || "Player O");
        }

        function checkWinner() {
            for (let combination of winningCombinations) {
                const [a, b, c] = combination;
                if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                    gameActive = false;
                    highlightWinner(combination);
                    winnerDisplay.textContent = `${getPlayerName(currentPlayer)} Wins! 🎉`;
                    return;
                }
            }
            if (!gameBoard.includes("")) {
                gameActive = false;
                winnerDisplay.textContent = "It's a Draw! 🤝";
            }
        }

        function highlightWinner(combination) {
            combination.forEach(index => {
                cells[index].classList.add("winning");
            });
        }

        function handleClick(event) {
            const index = event.target.getAttribute("data-index");

            if (!gameBoard[index] && gameActive) {
                gameBoard[index] = currentPlayer;
                event.target.textContent = currentPlayer;
                checkWinner();
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }

        function resetGame() {
            gameBoard = ["", "", "", "", "", "", "", "", ""];
            gameActive = true;
            currentPlayer = "X";
            cells.forEach(cell => {
                cell.textContent = "";
                cell.classList.remove("winning");
            });
            winnerDisplay.textContent = "";
        }

        function startGame() {
            board.style.display = "grid"; // Board dikhana
            resetButton.style.display = "inline-block"; // Reset button bhi dikhana
            gameActive = true; // Game start hona chahiye
            startGameButton.style.display = "none"; // Start Game button hatana
        }

        cells.forEach(cell => cell.addEventListener("click", handleClick));
        resetButton.addEventListener("click", resetGame);
        startGameButton.addEventListener("click", startGame);