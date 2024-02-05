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
          '<svg class="circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="transparent"/></svg>';
      } else if (spielfeld[i][j] === "Elon Musk") {
        tableHTML +=
          '<svg class="cross" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><line x1="20" y1="20" x2="80" y2="80" stroke="black" stroke-width="3"/><line x1="80" y1="20" x2="20" y2="80" stroke="black" stroke-width="3"/></svg>';
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
  // ... (unchanged)
}

function announceWinner(winner) {
  if (winner !== "Unentschieden") {
    setTimeout(function () {
      alert("Spieler " + winner + " hat gewonnen!");
      spielerDiv.innerHTML = "Spieler " + winner + " hat gewonnen!";
    }, 300);
  } else {
    setTimeout(function () {
      alert("Das Spiel endet unentschieden!");
      spielerDiv.innerHTML = "Das Spiel endet unentschieden!";
    }, 300);
  }

  currentPlayer = "Besim Mustafi";
  spielfeld = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
}

// Aufruf der Renderfunktion
renderSpielfeld();
