endTurnBtn.addEventListener("click", moveToNextPlayer);

const playerOne = new Player("vladi");

const playerTwo = new Player("shlomi");

const playerThree = new Player("amit");

const playerFour = new Player("bob");

currentGame = new Game([playerOne, playerTwo, playerThree, playerFour]);

currentGame.startGame();

activePlayerArea.addEventListener("click", activatePlayerArea);

