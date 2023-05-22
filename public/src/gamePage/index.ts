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

activePlayerArea.addEventListener("click", activatePlayerArea);

//start game...
startFakeGame();

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
  newBoard.buildEmptyBoard();

  const newDeck = new Deck();

  currentGame = new Game(playerArr, newBoard, newDeck);

  createGameToDB(playerArr, newBoard, newDeck);
  currentGame.startGame();

  playerNamesForm.style.display = "none";
}

async function createGameToDB(playerArr: Player[], board: Board, deck: Deck) {
  try {
    console.log("saving to DB...");

    // save players to DB

    playerArr.forEach(async (player) => {
      const name = player.name;
      const hand = player.hand;
      const _id = player.id;

      await fetch(`${playerAPI}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, hand, _id }),
      }).catch((error) => console.error(error));
    });

    //save board to DB

    await fetch(`${boardAPI}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: board.id, tileArr: board.tileArr }),
    }).catch((error) => console.error(error));

    //save deck to DB

    await fetch(`${deckAPI}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: deck.id, deck: deck.deck }),
    }).catch((error) => console.error(error));

    // save Game to DB with all of the above...
    const playerIdArr = playerArr.map((player) => player.id);
    const user = await getUser();

    await fetch(`${gameAPI}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.userId,
        players: playerIdArr,
        boardId: board.id,
        deckId: deck.id,
      }),
    }).catch((error) => console.error(error));
  } catch (error) {
    console.error(error);
  }
}

async function getUser() {
  const getUser = await fetch(`${userAPI}/getUser`)
    .then((res) => res.json())
    .then(({ cookieUser }) => cookieUser)
    .catch((error) => console.error(error));

  return getUser;
}

function startFakeGame() {
  const playerOne = new Player("vladi");

  const playerTwo = new Player("shlomi");

  const playerThree = new Player("amit");

  const playerFour = new Player("bob");

  const newBoard = new Board();
  newBoard.buildEmptyBoard();

  const newDeck = new Deck();

  currentGame = new Game(
    [playerOne, playerTwo, playerThree, playerFour],
    newBoard,
    newDeck
  );

  currentGame.startGame();
}
