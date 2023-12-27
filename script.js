const btnIds = ["1-1", "1-2", "1-3", "2-1", "2-2", "2-3", "3-1", "3-2", "3-3"];
let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function switchPlayer() {
  return currentPlayer.playerSymbol === "X" ? playerO : playerX;
}

function createPlayer(name, symbol) {
  const playerName = name;
  const playerSymbol = symbol;
  return { playerName: playerName, playerSymbol: playerSymbol };
}

const playerX = createPlayer("playerX", "X");
const playerO = createPlayer("playerO", "O");

let currentPlayer = playerX;
document.getElementById("player").innerHTML = ` A jelenlegi játékos köre ${currentPlayer.playerName}`;

// Flag to track whether the game is over
let gameIsOver = false;

btnIds.forEach((btn) => {
  const button = document.getElementById(btn);

  // Listen for moves on each square
  button.addEventListener("click", (e) => {
    if (!gameIsOver) {
      const coordinate = btn.split("-");
      const col = parseInt(coordinate[0]) - 1;
      const row = parseInt(coordinate[1]) - 1;

      if (board[row][col] === "") {
        board[row][col] = currentPlayer.playerSymbol;

        button.innerHTML = currentPlayer.playerSymbol; // Update button content

        if (checkWinner(currentPlayer.playerSymbol)) {
          document.getElementById("gameResult").innerHTML = `${currentPlayer.playerName} nyert!`
          console.log(`${currentPlayer.playerName} wins!`);
          console.log("Game over.");
          gameIsOver = true;
          // resetGame(); // You can choose to reset the game or perform other actions
        } else if (checkTie()) {
          console.log("It's a tie!");
          console.log("Game over.");
          document.getElementById("gameResult").innerHTML = "döntetlen!"
          gameIsOver = true;
          // resetGame(); // You can choose to reset the game or perform other actions
        } else {
          currentPlayer = switchPlayer();
          document.getElementById("player").innerHTML = ` A jelenlegi játékos köre ${currentPlayer.playerName}`;
        }
      } else {
        console.log("Invalid move. Try again.");
      }
    } else {
      console.log("Game over. No more moves allowed.");
    }
  });
});

function checkWinner(symbol) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === currentPlayer.playerSymbol &&
      board[i][1] === currentPlayer.playerSymbol &&
      board[i][2] === currentPlayer.playerSymbol
    ) {
      return true; // Winner found in a row
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] === currentPlayer.playerSymbol &&
      board[1][i] === currentPlayer.playerSymbol &&
      board[2][i] === currentPlayer.playerSymbol
    ) {
      return true; // Winner found in a column
    }
  }

  // Check diagonals
  if (
    board[0][0] === currentPlayer.playerSymbol &&
    board[1][1] === currentPlayer.playerSymbol &&
    board[2][2] === currentPlayer.playerSymbol
  ) {
    return true; // Winner found in the main diagonal
  }

  if (
    board[0][2] === currentPlayer.playerSymbol &&
    board[1][1] === currentPlayer.playerSymbol &&
    board[2][0] === currentPlayer.playerSymbol
  ) {
    return true; // Winner found in the other diagonal
  }

  return false; // No winner yet
}

function checkTie() {
  // Check if all cells are filled and no winner is found
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "") {
        return false; // At least one cell is empty
      }
    }
  }
  // All cells are filled and no winner is found
  return true;
}

function resetGame() {
  // Reset the board, switch to the initial player, and enable moves
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  currentPlayer = playerX;
  document.getElementById("player").innerHTML = ` A jelenlegi játékos köre ${currentPlayer.playerName}`;
  gameIsOver = false;

  // Clear button values on the board
  btnIds.forEach((btn) => {
    const button = document.getElementById(btn);
    button.innerHTML = "";
    button.addEventListener("click", handleMove);
  });
}

// Function to handle moves after the game has started
function handleMove(e) {
  const button = e.target;
  const coordinate = button.id.split("-");
  const col = parseInt(coordinate[0]) - 1;
  const row = parseInt(coordinate[1]) - 1;

  if (!gameIsOver && board[row][col] === "") {
    board[row][col] = currentPlayer.playerSymbol;

    button.innerHTML = currentPlayer.playerSymbol; // Update button content

    if (checkWinner(currentPlayer.playerSymbol)) {
      console.log(`${currentPlayer.playerName} wins!`);
      console.log("Game over.");
      gameIsOver = true;
      // resetGame(); // You can choose to reset the game or perform other actions
    } else if (checkTie()) {
      console.log("It's a tie!");
      console.log("Game over.");
      gameIsOver = true;
      // resetGame(); // You can choose to reset the game or perform other actions
    } else {
      currentPlayer = switchPlayer();
      document.getElementById("player").innerHTML = ` A jelenlegi játékos köre ${currentPlayer.playerName}`;
    }
  } else {
    console.log("Invalid move. Try again.");
  }
}
