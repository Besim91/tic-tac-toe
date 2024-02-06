var currentPlayer = "Besim Mustafi";
var spielerDiv = document.getElementById("player");
var spielfeld = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function renderSpielfeld() {
  spielerDiv.innerHTML = "Spieler " + currentPlayer + " ist am Zug";

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
  if (spielfeld[row][col] === "") {
    spielfeld[row][col] = currentPlayer;
    currentPlayer =
      currentPlayer === "Besim Mustafi" ? "Elon Musk" : "Besim Mustafi";
    renderSpielfeld();
    checkWinner();
  }
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
  var cellSize = 100; // Annahme: jede Zelle ist 100x100 Pixel groß
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
  line.style.backgroundColor = "black";
  line.style.left = startX + contentRect.left + "px"; // Berücksichtige die Position des Inhaltsbereichs
  line.style.top = startY + contentRect.top + "px"; // Berücksichtige die Position des Inhaltsbereichs
  line.style.transformOrigin = "left center"; // Drehe um den Anfang der Linie
  line.style.transform = "rotate(" + angle + "deg)";

  var contentDiv = document.getElementById("content");
  contentDiv.appendChild(line);
}

function announceWinner(winner) {
  var playerDiv = document.getElementById("player");
  if (winner !== "Unentschieden") {
    setTimeout(function () {
      playerDiv.innerHTML = "Spieler " + winner + " hat gewonnen!";
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
}

function restartGame() {
  currentPlayer = "Besim Mustafi";
  spielfeld = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  // Entferne alle Linien
  var lines = document.getElementsByClassName("line");
  while (lines.length > 0) {
    lines[0].parentNode.removeChild(lines[0]);
  }
  renderSpielfeld(); // Rendere das Spielfeld neu
}

// Aufruf der Renderfunktion
renderSpielfeld();
