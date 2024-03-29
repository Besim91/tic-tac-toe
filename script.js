const clickSound = new Audio("./audio/blaster.mp3");
const btnSound = new Audio("./audio/button.mp3");

var currentPlayer = "Besim Mustafi";
var spielerDiv = document.getElementById("player");
var spielfeld = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

var playerOneScore = 0;
var playerTwoScore = 0;

function renderSpielfeld() {
  spielerDiv.innerHTML = currentPlayer + "<br> ist am Zug";

  var contentDiv = document.getElementById("content");
  var tableHTML = "<table>";

  for (var i = 0; i < 3; i++) {
    tableHTML += "<tr>";

    for (var j = 0; j < 3; j++) {
      tableHTML +=
        '<td onclick="cellClick(' +
        i +
        "," +
        j +
        ')" class="' +
        spielfeld[i][j] +
        '">';
      if (spielfeld[i][j] === "Besim Mustafi") {
        tableHTML +=
          '<svg class="circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" stroke="white" stroke-width="3" fill="transparent"/></svg>';
      } else if (spielfeld[i][j] === "Elon Musk") {
        tableHTML +=
          '<svg class="cross" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><line x1="20" y1="20" x2="80" y2="80" stroke="white" stroke-width="3"/><line x1="80" y1="20" x2="20" y2="80" stroke="white" stroke-width="3"/></svg>';
      }
      tableHTML += "</td>";
    }

    tableHTML += "</tr>";
  }

  tableHTML += "</table>";
  contentDiv.innerHTML = tableHTML;
}

function cellClick(row, col) {
  if (spielfeld[row][col] === "" && !isGameEnded()) {
    spielfeld[row][col] = currentPlayer;
    currentPlayer =
      currentPlayer === "Besim Mustafi" ? "Elon Musk" : "Besim Mustafi";

    clickSound.load();
    clickSound.play();

    renderSpielfeld();
    checkWinner();
  }
}

function isGameEnded() {
  return (
    document.getElementById("player").innerHTML !==
    currentPlayer + "<br> ist am Zug"
  );
}

function checkWinner() {
  for (var i = 0; i < 3; i++) {
    if (
      spielfeld[i][0] === spielfeld[i][1] &&
      spielfeld[i][1] === spielfeld[i][2] &&
      spielfeld[i][0] !== ""
    ) {
      drawLine(i, 0, i, 2);
      announceWinner(spielfeld[i][0]);
      return;
    }

    if (
      spielfeld[0][i] === spielfeld[1][i] &&
      spielfeld[1][i] === spielfeld[2][i] &&
      spielfeld[0][i] !== ""
    ) {
      drawLine(0, i, 2, i);
      announceWinner(spielfeld[0][i]);
      return;
    }
  }

  if (
    spielfeld[0][0] === spielfeld[1][1] &&
    spielfeld[1][1] === spielfeld[2][2] &&
    spielfeld[0][0] !== ""
  ) {
    drawLine(0, 0, 2, 2);
    announceWinner(spielfeld[0][0]);
    return;
  }

  if (
    spielfeld[0][2] === spielfeld[1][1] &&
    spielfeld[1][1] === spielfeld[2][0] &&
    spielfeld[0][2] !== ""
  ) {
    drawLine(0, 2, 2, 0);
    announceWinner(spielfeld[0][2]);
    return;
  }

  var draw = true;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (spielfeld[i][j] === "") {
        draw = false;
        break;
      }
    }
  }

  if (draw) {
    announceWinner("Unentschieden");
  }
}

function drawLine(x1, y1, x2, y2) {
  var contentRect = document.getElementById("content").getBoundingClientRect();
  var cellSize = 100;
  var lineWidth = 5;

  var startX = y1 * cellSize + cellSize / 2;
  var startY = x1 * cellSize + cellSize / 2;

  var endX = y2 * cellSize + cellSize / 2;
  var endY = x2 * cellSize + cellSize / 2;

  var length = Math.sqrt(
    Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
  );
  var angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

  var line = document.createElement("div");
  line.classList.add("line");
  line.style.position = "absolute";
  line.style.width = length + "px";
  line.style.height = lineWidth + "px";
  line.style.backgroundColor = "red";
  line.style.left = startX + contentRect.left + "px";
  line.style.top = startY + contentRect.top + "px";
  line.style.transformOrigin = "left center";
  line.style.transform = "rotate(" + angle + "deg)";
  line.style.filter = "drop-shadow(0px 0px 6px white)";

  var contentDiv = document.getElementById("content");
  contentDiv.appendChild(line);
}

function announceWinner(winner) {
  var playerDiv = document.getElementById("player");
  if (winner !== "Unentschieden") {
    if (winner === "Besim Mustafi") {
      playerOneScore++;
      document.getElementById(
        "playerOne"
      ).innerHTML = `Besim Mustafi <br> ${playerOneScore}`;
    } else if (winner === "Elon Musk") {
      playerTwoScore++;
      document.getElementById(
        "playerTwo"
      ).innerHTML = `Elon Musk <br> ${playerTwoScore}`;
    }
    setTimeout(function () {
      playerDiv.innerHTML = winner + " hat gewonnen!";
      playerDiv.classList.add("winner");
    }, 300);
  } else {
    setTimeout(function () {
      playerDiv.innerHTML = "Das Spiel endet unentschieden!";
      playerDiv.classList.remove("winner");
    }, 300);
  }

  currentPlayer = "Besim Mustafi";
  spielfeld = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  document.getElementById(`btn-restart`).classList.add("btn-restart-free");
  document.getElementById(`btn-restart`).disabled = false;
}

function restartGame() {
  if (!document.getElementById("btn-restart").disabled) {
    btnSound.play();
  }

  currentPlayer = "Besim Mustafi";
  spielfeld = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  var lines = document.getElementsByClassName("line");
  while (lines.length > 0) {
    lines[0].parentNode.removeChild(lines[0]);
  }

  var playerDiv = document.getElementById("player");
  playerDiv.classList.remove("winner");
  playerDiv.innerHTML = "Spieler " + currentPlayer + " ist am Zug";

  document.getElementById(`btn-restart`).classList.remove("btn-restart-free");

  renderSpielfeld();
}

renderSpielfeld();
