"use strict";
function checkIfGameStarted() {
    if (!playerNamesForm)
        return;
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
// const playerOne = new Player("vladi");
// const playerTwo = new Player("shlomi");
// const playerThree = new Player("amit");
// const playerFour = new Player("bob");
// currentGame = new Game([playerOne, playerTwo, playerThree, playerFour]);
// currentGame.startGame();
activePlayerArea.addEventListener("click", activatePlayerArea);
function handlePlayerForm(e) {
    e.preventDefault();
    if (!playerNamesForm)
        return;
    const playerOne = playerNamesForm.playerOne.value;
    const playerTwo = playerNamesForm.playerTwo.value;
    const playerThree = playerNamesForm.playerThree.value;
    const playerFour = playerNamesForm.playerFour.value;
    const playerArr = [playerOne, playerTwo, playerThree, playerFour]
        .filter((player) => player != "")
        .map((player) => new Player(player));
    console.log(playerArr);
    currentGame = new Game(playerArr);
    currentGame.startGame();
    playerNamesForm.style.display = "none";
}
