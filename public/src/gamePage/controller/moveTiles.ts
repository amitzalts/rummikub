function moveTile(clickedOnSquare: HTMLDivElement) {
  if (!currentTile) return;

  if (!board) throw new Error("Can't find board div.");

  // if currentTile in player's hand and clicked div is on board
  if (
    currentPlayer.divsArray.includes(currentTile) &&
    currentGame.board.includes(clickedOnSquare)
  ) {
    moveFromPlayerHandToBoard(clickedOnSquare);
  }

  // currentTile is on board and clicked tile is in player's hand
  else if (
    currentPlayer.divsArray.includes(clickedOnSquare) &&
    currentGame.board.includes(currentTile)
  ) {
    switchTileFromBoardToHand(clickedOnSquare);
  }

  // moving tile on board from one square to another
  else {
    const indexOfcurrentTile = currentGame.board.indexOf(currentTile);
    const indexOfNewLocation = currentGame.board.indexOf(clickedOnSquare);

    currentGame.board[indexOfcurrentTile] = clickedOnSquare;
    currentGame.board[indexOfNewLocation] = currentTile;

    renderBoard(currentGame.board);
    resetCurrentTile();
  }
}

function moveFromPlayerHandToBoard(clickedOnSquare: HTMLDivElement) {
  if (!currentTile) return;

  //if clicked on square is a tile
  if (clickedOnSquare.classList.contains("tile")) {
    const indexOfNewLocation = currentGame.board.indexOf(clickedOnSquare);
    const indexOfcurrentTile = currentPlayer.divsArray.indexOf(currentTile);

    currentGame.board[indexOfNewLocation] = currentTile;
    currentPlayer.divsArray[indexOfcurrentTile] = clickedOnSquare;

    renderBoard(currentGame.board);
    currentPlayer.renderHandToScreen();

    resetCurrentTile();
  }

  // if clicked on square is an empty square
  else {
    const indexOfNewLocation = currentGame.board.indexOf(clickedOnSquare);

    currentGame.board[indexOfNewLocation] = currentTile;

    const index = currentPlayer.divsArray.indexOf(currentTile);

    currentPlayer.divsArray.splice(index, 1);

    renderBoard(currentGame.board);
    currentPlayer.renderHandToScreen();

    resetCurrentTile();
  }
}

function switchTileFromBoardToHand(clickedOnSquare: HTMLDivElement) {
  try {
    if (!currentTile) return;

    const indexOfNewLocation = currentPlayer.divsArray.indexOf(clickedOnSquare);
    const indexOfcurrentTile = currentGame.board.indexOf(currentTile);

    currentGame.board[indexOfcurrentTile] = clickedOnSquare;
    currentPlayer.divsArray[indexOfNewLocation] = currentTile;

    renderBoard(currentGame.board);
    currentPlayer.renderHandToScreen();

    resetCurrentTile();
  } catch (error) {
    console.error(error);
  }
}
