"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
// const newBoard = new Board();
// newBoard.buildEmptyBoard();
// currentGame = new Game(
//   [playerOne, playerTwo, playerThree, playerFour],
//   newBoard
// );
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
    const newBoard = new Board();
    newBoard.buildEmptyBoard();
    const deck = new Deck();
    currentGame = new Game(playerArr, newBoard, deck);
    createGameToDB(playerArr, newBoard);
    currentGame.startGame();
    playerNamesForm.style.display = "none";
}
function createGameToDB(playerArr, board) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("saving to DB...");
            // save players to DB
            // playerArr.forEach(async (player) => {
            //   const name = player.name;
            //   const hand = player.hand;
            //   const _id = player.id;
            // await fetch(`api/v1/players`, {
            //   method: "POST",
            //   headers: {
            //     Accept: "application/json",
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify({ name, hand, _id }),
            // }).catch((error) => console.error(error));
            // });
            //save board to DB
            // await fetch("api/v1/boards", {
            //   method: "POST",
            //   headers: {
            //     Accept: "application/json",
            //     "Content-Type": "application/json",
            //   },
            //   body: JSON.stringify({ _id: board.id, tileArr: board.tileArr }),
            // }).catch((error) => console.error(error));
            //save deck to DB
            // save Game to DB with all of the above...
        }
        catch (error) {
            console.error(error);
        }
    });
}
