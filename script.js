let currentPlayer = "X";
let boardArray = ["", "", "", "", "", "", "", "", ""];

function renderBoard() {
  const boardElement = document.getElementById("content");
  boardElement.innerHTML = "";

  for (let i = 0; i < boardArray.length; i++) {
    const cellElement = document.createElement("div");
    cellElement.className = "cell";
    cellElement.onclick = () => handleCellClick(i);

    const symbolElement =
      boardArray[i] === "X"
        ? document.getElementById("x-svg").cloneNode(true)
        : boardArray[i] === "O"
        ? document.getElementById("o-svg").cloneNode(true)
        : null;

    if (symbolElement) {
      symbolElement.style.display = "block";
      cellElement.appendChild(symbolElement);
    }

    boardElement.appendChild(cellElement);
  }
}

function handleCellClick(index) {
  if (boardArray[index] === "") {
    boardArray[index] = currentPlayer;
    renderBoard();

    if (checkWinner() || checkTie()) {
      alert("Game Over!");
      resetGame();
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
  }
}

function checkWinner() {
  return false;
}

function checkTie() {
  return false;
}

function resetGame() {
  boardArray = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  renderBoard();
}

renderBoard();
