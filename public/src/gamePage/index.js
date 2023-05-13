"use strict";
// activatePlayers();
endTurnBtn.addEventListener("click", moveToNextPlayer);
const playerOne = new Player("vladi");
const playerTwo = new Player("shlomi");
const playerThree = new Player("amit");
const playerFour = new Player("bob");
currentGame = new Game([playerOne, playerTwo, playerThree, playerFour]);
currentGame.startGame();
activePlayerArea.addEventListener("click", (e) => {
    if (!currentTile || !board)
        return;
    const target = e.target;
    if (target.classList.contains("activePlayerArea")) {
        if (currentGame.board.includes(currentTile)) {
            //create empty div to replace tile
            const emptySquare = document.createElement("div");
            emptySquare.classList.add("square");
            // find the index on the tile in board array
            const index = currentGame.board.indexOf(currentTile);
            // replace empty div with current tile at board and board array
            board.replaceChild(emptySquare, currentTile);
            currentGame.board[index] = emptySquare;
            toggleActive(emptySquare, currentGame.board);
            // add tile back to player's hand
            currentPlayer.divsArray.push(currentTile);
            currentPlayer.renderHandToScreen();
            resetCurrentTile();
        }
    }
});
function checkIfTileBelongedToPlayer() { }
