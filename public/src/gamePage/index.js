"use strict";
activatePlayers();
const newDeck = new Deck();
const playerOne = new Player("vladi");
const playerTwo = new Player("shlomi");
const playerThree = new Player("amit");
const playerFour = new Player("bob");
const newGame = new Game([playerOne, playerTwo, playerThree, playerFour], newDeck);
newGame.players.forEach((player) => player.getNewHand(newGame.deck));
createEmptyBoard(newGame.board);
currentPlayer = playerOne;
currentPlayer.renderHandToScreen();
activePlayerArea.addEventListener("click", (e) => {
    if (!currentTile || !board)
        return;
    const target = e.target;
    if (target.classList.contains("activePlayer")) {
        if (newGame.board.find((x) => x === currentTile)) {
            //create empty div to replace tile
            const emptySquare = document.createElement("div");
            emptySquare.classList.add("square");
            // find the index on the tile in board array
            const index = newGame.board.indexOf(currentTile);
            // replace empty div with current tile at board and board array
            board.replaceChild(emptySquare, currentTile);
            newGame.board[index] = emptySquare;
            toggleActive(emptySquare, newGame.board);
            // add tile back to player's hand
            currentPlayer.divsArray.push(currentTile);
            currentPlayer.renderHandToScreen();
            currentTile.classList.remove("active");
            currentTile = undefined;
        }
    }
});
