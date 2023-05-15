function toggleTileActive(
  clickedDiv: HTMLDivElement,
  divArray: Array<HTMLDivElement>
) {
  clickedDiv.addEventListener("click", () => {
    if (!currentTile) {
      if (clickedDiv.className === "square") {
        return console.log("Not activating empty square");
      }

      if (clickedDiv.classList.contains("active")) {
        resetCurrentTile();
      } else {
        const findEle = divArray.find((ele) =>
          ele.classList.contains("active")
        );

        if (findEle) findEle.classList.remove("active");

        clickedDiv.classList.add("active");

        currentTile = clickedDiv;
      }
    } else moveTile(clickedDiv);
  });
}

function moveToNextPlayer() {
  if (!validateBoard()) return;

  checkIfPlayerMadeAMove();

  const numOfPlayers = currentGame.players.length;

  const indexCurrentPlayer = currentGame.players.indexOf(currentPlayer);

  // if current player is last player on array of players
  if (indexCurrentPlayer === numOfPlayers - 1) activatePlayer(0);
  else activatePlayer(indexCurrentPlayer + 1);
}

function activatePlayer(index: number) {
  const playersArray: NodeListOf<HTMLDivElement> | null =
    playersInGameArea.querySelectorAll(".player");

  currentPlayer.isActive = false;

  currentPlayer = currentGame.players[index];
  currentPlayer.isActive = true;

  currentPlayer.renderHandToScreen();
  currentPlayer.initializeStartHend();

  playersArray.forEach((player) => {
    player.classList.remove("active");
    if (player.id === currentPlayer.id) {
      player.classList.add("active");
    }
  });
}

function activatePlayerArea() {
  if (!currentTile || !board) return;

  if (currentGame.board.includes(currentTile)) {
    //create empty div to replace tile
    const emptySquare = document.createElement("div");
    emptySquare.classList.add("square");
    emptySquare.style.background =
      "url('../../img/tileBack.png')no-repeat center / cover";

    // find the index on the tile in board array
    const index = currentGame.board.indexOf(currentTile);

    // replace empty div with current tile at board and board array
    board.replaceChild(emptySquare, currentTile);
    currentGame.board[index] = emptySquare;
    toggleTileActive(emptySquare, currentGame.board);
    // add tile back to player's hand
    currentPlayer.divsArray.push(currentTile);
    currentPlayer.renderHandToScreen();

    resetCurrentTile();
  }
}

function sortHandByNumber() {
  currentPlayer.divsArray.sort((a, b) => {
    const x = a.dataset.value as string;
    const y = b.dataset.value as string;
    return parseInt(x) - parseInt(y);
  });
  currentPlayer.renderHandToScreen();
}

function sortHandByColor() {
  //first sort by number
  currentPlayer.divsArray.sort((a, b) => {
    const x = a.dataset.value as string;
    const y = b.dataset.value as string;
    return parseInt(x) - parseInt(y);
  });

  currentPlayer.divsArray.sort((a, b) => {
    const x = a.dataset.color as string;
    const y = b.dataset.color as string;
    return x.localeCompare(y);
  });
  currentPlayer.renderHandToScreen();
}
