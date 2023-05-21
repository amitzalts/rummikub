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

  alert("Pass the screen to next player.");

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

  currentPlayer.renderHandToScreen(currentPlayer.divsArray);
  currentPlayer.initializeStartHend();
  currentGame.saveCurrentGameStatus();

  playersArray.forEach((player) => {
    player.classList.remove("active");
    if (player.id === currentPlayer.id) {
      player.classList.add("active");
    }
  });
}

function activatePlayerArea() {
  if (!currentTile || !board) return;

  if (currentGame.board.divArr.includes(currentTile)) {
    if (!tileBelongesToPlayer(currentTile)) {
      return alert("Tile does not belong to current player.");
    }

    //create empty div to replace tile
    const emptySquare = document.createElement("div");
    emptySquare.classList.add("square");
    emptySquare.style.background =
      "url('../../img/tileBack.png')no-repeat center / cover";

    // find the index on the tile in board array
    const index = currentGame.board.divArr.indexOf(currentTile);

    // replace empty div with current tile at board and board array
    board.replaceChild(emptySquare, currentTile);
    currentGame.board.divArr[index] = emptySquare;
    toggleTileActive(emptySquare, currentGame.board.divArr);

    // add tile back to player's hand
    currentPlayer.divsArray.push(currentTile);
    currentPlayer.renderHandToScreen(currentPlayer.divsArray);

    resetCurrentTile();
  }
}

function sortHandByNumber() {
  currentPlayer.divsArray.sort((a, b) => {
    const x = a.dataset.value as string;
    const y = b.dataset.value as string;
    return parseInt(x) - parseInt(y);
  });
  currentPlayer.renderHandToScreen(currentPlayer.divsArray);
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
  currentPlayer.renderHandToScreen(currentPlayer.divsArray);
}

function validSetWithJocker(tileArr: Tile[]) {
  let isValid = true;

  if (isSameColor(tileArr.filter((tile) => tile.color !== "jocker"))) {
    console.log("1");
    if (!isValidRunWithJocker(tileArr)) isValid = false;
  } else {
    console.log("2");
    if (!isValidGroupWithJocker(tileArr)) isValid = false;
  }
  return isValid;
}

function isValidRunWithJocker(tileArr: Tile[]) {
  let jockerValue = 0;
  return tileArr
    .map((tile) => tile.value)
    .reduce((a, b) => {
      if (b === 0) {
        jockerValue = a + 1;
        return jockerValue;
      }
      if (a === 0) {
        return b;
      }
      return a + 1 === b ? b : NaN;
    });
}

function isValidGroupWithJocker(tileArr: Tile[]) {
  if (tileArr.length > 4) {
    return false;
  }

  if (
    !tileArr
      .filter((tile) => tile.color !== "jocker")
      .map((tile) => tile.value)
      .reduce((a, b) => (a === b ? a : NaN))
  ) {
    return false;
  }

  const stringArr = tileArr.map((tile) => tile.value + tile.color);
  const setArr = [...new Set(stringArr)];

  return setArr.length === stringArr.length;
}
