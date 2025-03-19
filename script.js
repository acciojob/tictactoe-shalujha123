const board = document.getElementById("board");
        const cells = document.querySelectorAll(".cell");
        const startGameButton = document.getElementById("submit");
        const resetButton = document.getElementById("reset");
        const winnerDisplay = document.getElementById("winner");
        const messageDisplay = document.querySelector(".message");
        const player1Input = document.getElementById("player1");
        const player2Input = document.getElementById("player2");

        let currentPlayer = "X";
        let gameBoard = ["", "", "", "", "", "", "", "", ""];
        let gameActive = false;

        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]             
        ];

        function getPlayerName(symbol) {
            return symbol === "X" ? (player1Input.value || "Player X") : (player2Input.value || "Player O");
        }

        function checkWinner() {
            for (let combination of winningCombinations) {
                const [a, b, c] = combination;
                if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                    gameActive = false;
                    highlightWinner(combination);
                    winnerDisplay.textContent = `${getPlayerName(currentPlayer)} Congratulations! You Won! 🎉`;
                    return;
                }
            }
            if (!gameBoard.includes("")) {
                gameActive = false;
                winnerDisplay.textContent = "It's a Draw! 🤝";
            } else {
                messageDisplay.textContent = `${getPlayerName(currentPlayer)}, you're up`;
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
            messageDisplay.textContent = `${getPlayerName(currentPlayer)}, you're up`;
        }

        function startGame() {
            if (!player1Input.value.trim() || !player2Input.value.trim()) {
                alert("Please enter both player names to start the game!");
                return;
            }
            board.style.display = "grid";  
            resetButton.style.display = "inline-block"; 
            gameActive = true;
            startGameButton.style.display = "none"; 
            messageDisplay.textContent = `${getPlayerName(currentPlayer)}, you're up`;
        }

        cells.forEach(cell => cell.addEventListener("click", handleClick));
        resetButton.addEventListener("click", resetGame);
        startGameButton.addEventListener("click", startGame);