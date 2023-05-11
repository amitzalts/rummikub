activatePlayers();

const playerOne = new Player("vladi");

const playerTwo = new Player("shlomi");

const playerThree = new Player("amit");

const playerFour = new Player("bob");

const newGame = new Game([playerOne, playerTwo, playerThree, playerFour]);

createEmptyBoard(newGame.board);

currentPlayer =
  newGame.players[Math.floor(Math.random() * newGame.players.length)];

currentPlayer.isActive = true;

renderPlayers(newGame.players);

currentPlayer.renderHandToScreen();

activePlayerArea.addEventListener("click", (e: MouseEvent) => {
  if (!currentTile || !board) return;

  const target = e.target as HTMLElement;

  if (target.classList.contains("activePlayerArea")) {
    if (newGame.board.find((x) => x === currentTile)) {
      //create empty div to replace tile
      const emptySquare = document.createElement("div");
      emptySquare.classList.add("square");

      // find the index on the tile in board array
      const index = newGame.board.indexOf(currentTile);

      // replace empty div with current tile at board and board array
      board.replaceChild(emptySquare, currentTile);
      newGame.board[index] = emptySquare;
      toggleActive(emptySquare, newGame.board);
      // add tile back to player's hand
      currentPlayer.divsArray.push(currentTile);
      currentPlayer.renderHandToScreen();

      currentTile.classList.remove("active");

      currentTile = undefined;
    }
  }
});

function createDeck() {
  const colors = ["green", "red", "blue", "yellow"];
  const halfDeck: {}[] = [];

  colors.forEach((color) => {
    for (let i = 1; i <= 13; i++) {
      const tile = { [color]: i };
      halfDeck.push(tile);
    }
  });

  const jocker = { jocker: "<i class='fa-regular fa-face-smile'></i>" };
  halfDeck.push(jocker);

  const deck = [...halfDeck, ...halfDeck];
  
  return deck;
}
