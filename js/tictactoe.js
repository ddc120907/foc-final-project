let playerO = "O";
let playerX = "X";

let currentPlayer = playerO;

let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameCells = [];

let winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let gameOver = false;
let restartGameButton;
let gameStatus;

window.onload = function () {
    gameCells = document.getElementsByClassName("game-cell");

    for (let cell of gameCells) {
        cell.addEventListener("click", placecell);
    }

    restartGameButton = document.getElementById("game-restart-button");
    restartGameButton.addEventListener("click", restartGame);

    gameStatus = document.getElementById("game-status");
    gameStatus.innerText = "Player O's turn";
};

function placecell() {
    if (gameOver) {
        return;
    }

    const index = parseInt(this.getAttribute("data-cell-index"));

    if (gameBoard[index] !== "") {
        return;
    }
    //place the current player's mark
    this.innerText = currentPlayer;
    gameBoard[index] = currentPlayer;

    checkWinner();
    if (gameOver) {
        return;
    }

    if (!gameBoard.includes("")) {
        gameStatus.innerText = "It's a draw!";
        gameOver = true;
        return;
    }

    currentPlayer = (currentPlayer === playerO) ? playerX : playerO;
    gameStatus.innerText = "Player " + currentPlayer + "'s turn";
}

function checkWinner() {
    for (let combination of winningCombinations) {
        let a = gameBoard[combination[0]];
        let b = gameBoard[combination[1]];
        let c = gameBoard[combination[2]];

        if (a !== "" && a === b && b === c) {
            for (let i of combination) {
                gameCells[i].classList.add("winning-game-cell");
            }
            gameStatus.innerText = "Player " + currentPlayer + " wins!";
            gameOver = true;
            return;
        }
    }
}

function restartGame() {
    gameOver = false;
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = playerO;

    for (let cell of gameCells) {
        cell.innerText = "";
        cell.classList.remove("winning-game-cell");
    }
    gameStatus.innerText = "Player O's turn";
}