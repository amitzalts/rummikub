function validateBoard() {
  try {
    let validBoard = true;

    const newBoard = [...currentGame.board];

    let set: number[] = [];

    currentGame.sets = [];

    newBoard.forEach((square) => {
      if (square.innerHTML != "") set.push(parseInt(square.innerHTML));

      //
      if (square.innerHTML == "" && set.length > 0) {
        let lastValue = set[0] - 1;

        if (set.length < 3) {
          set = [];
          alert("set too short. minimun 3 tiles needed");
          validBoard = false;
        } else {
          set.forEach((x) => {
            let nextValue = x;
            if (nextValue - 1 != lastValue) {
              set = [];
              alert("Not valid board.");
              validBoard = false;
            }
            lastValue++;
          });
        }

        currentGame.sets.push(set);
        set = [];
      }
    });

    return validBoard;
  } catch (error) {
    console.error(error);
  }
}

function checkIfPlayerMadeAMove() {
  if (compareArrays(currentPlayer.divsArray, currentPlayer.startingTurnDivs)) {
    currentPlayer.getRandomTile(currentGame.deck);
  }
}
