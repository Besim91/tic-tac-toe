var currentPlayer = "circle";
var spielfeld = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function renderSpielfeld() {
  var contentDiv = document.getElementById("content");
  var tableHTML = "<table>";

  for (var i = 0; i < 3; i++) {
    tableHTML += "<tr>";

    for (var j = 0; j < 3; j++) {
      tableHTML += '<td onclick="cellClick(' + i + "," + j + ')">';
      if (spielfeld[i][j] === "circle") {
        tableHTML +=
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" stroke="#fff" stroke-width="6" fill="none"/></svg>';
      } else if (spielfeld[i][j] === "cross") {
        tableHTML +=
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><line x1="20" y1="20" x2="80" y2="80" stroke="#fff" stroke-width="6"/><line x1="80" y1="20" x2="20" y2="80" stroke="#fff" stroke-width="6"/></svg>';
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
    // Überprüfen, ob das Feld leer ist
    spielfeld[row][col] = currentPlayer;

    renderSpielfeld();

    // Wechsle den Spieler
    currentPlayer = currentPlayer === "circle" ? "cross" : "circle";
  }
}

// Aufruf der Renderfunktion
renderSpielfeld();
