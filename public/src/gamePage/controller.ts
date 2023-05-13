function createEmptyBoard(array: Array<HTMLDivElement>) {
  if (!board) throw new Error("Board div not found.");

  for (let i = 1; i <= 160; i++) {
    const squareDiv: HTMLDivElement = document.createElement("div");
    squareDiv.classList.add("square");

    array.push(squareDiv);

    toggleActive(squareDiv, array);
  }
  renderBoard(array);
}

function renderBoard(divsArray: Array<HTMLDivElement>) {
  if (!board) throw new Error("Can't find board div.");

  board.innerHTML = "";

  divsArray.forEach((div) => board.append(div));
}

function toggleActive(
  squareDiv: HTMLDivElement,
  squareDivArray: Array<HTMLDivElement>
) {
  squareDiv.addEventListener("click", () => {
    if (moveTile(squareDiv)) return;

    if (squareDiv.className === "square") {
      return console.log("Not activating empty square");
    }

    if (squareDiv.classList.contains("active")) {
      resetCurrentTile();
    } else {
      const findEle = squareDivArray.find((ele) =>
        ele.classList.contains("active")
      );

      if (findEle) findEle.classList.remove("active");

      squareDiv.classList.add("active");

      currentTile = squareDiv;
    }
  });
}

function moveTile(squareDiv: HTMLDivElement) {
  if (!currentTile) return;

  if (!board) throw new Error("Can't find board div.");

  // if currentTile in player's hand
  if (currentPlayer.divsArray.find((ele) => ele === currentTile)) {
    moveFromPlayerHand(squareDiv);
  }

  // moving tile on board from one square to another
  else {
    const indexOfcurrentTile = currentGame.board.indexOf(currentTile);
    const indexOfNewLocation = currentGame.board.indexOf(squareDiv);

    currentGame.board[indexOfcurrentTile] = squareDiv;
    currentGame.board[indexOfNewLocation] = currentTile;

    renderBoard(currentGame.board);
    resetCurrentTile();
  }

  return true;
}

function moveFromPlayerHand(squareDiv: HTMLDivElement) {
  if (!currentTile) return;

  if (!board) throw new Error("Can't find board div.");

  if (currentPlayer.divsArray.find((ele) => ele === squareDiv)) {
    return;
  }

  if (squareDiv.classList.contains("tile")) {
    const indexOfNewLocation = currentGame.board.indexOf(squareDiv);
    const indexOfcurrentTile = currentPlayer.divsArray.indexOf(currentTile);

    currentGame.board[indexOfNewLocation] = currentTile;
    currentPlayer.divsArray[indexOfcurrentTile] = squareDiv;

    renderBoard(currentGame.board);
    currentPlayer.renderHandToScreen();

    resetCurrentTile();
  } else {
    const indexOfNewLocation = currentGame.board.indexOf(squareDiv);

    currentGame.board[indexOfNewLocation] = currentTile;

    const index = currentPlayer.divsArray.indexOf(currentTile);

    currentPlayer.divsArray.splice(index, 1);

    renderBoard(currentGame.board);

    resetCurrentTile();
  }
}

function renderPlayers(playersArray: Player[]) {
  const html = playersArray
    .map(
      (player) => `<div class="player" id="${player.id}"">${player.name}</div>`
    )
    .join("");

  playersInGameArea.innerHTML = html;
}

function moveToNextPlayer() {
  if (!validateBoard()) return;

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

function validateBoard() {
  let validBoard = true;

  const newBoard = [...currentGame.board];

  let set: number[] = [];

  currentGame.sets = [];

  newBoard.forEach((square) => {
    if (square.innerHTML != "") set.push(parseInt(square.innerHTML));

    //
    if (square.innerHTML == "" && set.length > 0) {
      let lastValue = set[0] - 1;

      set.forEach((x) => {
        let nextValue = x;
        if (nextValue - 1 != lastValue) {
          set = [];
          console.error("not valid board");
          validBoard = false;
        }
        lastValue++;
      });
      if (set.length < 3) {
        set = [];
        console.error("set too short. minimun 3 tiles needed");
        validBoard = false;
      }
      currentGame.sets.push(set);
      set = [];
    }
  });

  return validBoard;
}
