function checkIfGameStarted() {
  if (!playerNamesForm) return;
  if (currentGame) {
    playerNamesForm.style.display = "none";
  }
}

if (playerNamesForm) {
  playerNamesForm.addEventListener("submit", handlePlayerForm);
}

endTurnBtn.addEventListener("click", moveToNextPlayer);
sortByNumbersBtn.addEventListener("click", sortHandByNumber);
sortByColorBtn.addEventListener("click", sortHandByColor);
resetTurnBtn.addEventListener("click", resetMoves);

const playerOne = new Player("vladi");

const playerTwo = new Player("shlomi");

const playerThree = new Player("amit");

const playerFour = new Player("bob");

const newBoard = new Board();

currentGame = new Game(
  [playerOne, playerTwo, playerThree, playerFour],
  newBoard
);

currentGame.startGame();

activePlayerArea.addEventListener("click", activatePlayerArea);

function handlePlayerForm(e: Event) {
  e.preventDefault();

  if (!playerNamesForm) return;

  const playerOne = playerNamesForm.playerOne.value;
  const playerTwo = playerNamesForm.playerTwo.value;
  const playerThree = playerNamesForm.playerThree.value;
  const playerFour = playerNamesForm.playerFour.value;

  const playerArr = [playerOne, playerTwo, playerThree, playerFour]
    .filter((player) => player != "")
    .map((player) => new Player(player));

  const newBoard = new Board();

  currentGame = new Game(playerArr, newBoard);
  // createGameToDB(playerArr);
  currentGame.startGame();

  playerNamesForm.style.display = "none";
}

async function createGameToDB(playerArr: Player[]) {
  try {
    console.log("saving to DB...");

    // save players to DB
    playerArr.forEach(async (player) => {
      const name = player.name;
      const hand = player.hand;
      const _id = player.id;

      await fetch(`api/v1/players`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, hand, _id }),
      }).catch((error) => console.error(error));
    });
    //save board to DB

    //save deck to DB

    // save Game to DB with all of the above...
  } catch (error) {
    console.error(error);
  }
}
