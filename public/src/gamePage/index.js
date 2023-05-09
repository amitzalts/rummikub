"use strict";
createEmptyBoard();
const newPlayer = new Player("vladb89");
const newDeck = new Deck();
newPlayer.getNewHand(newDeck);
activePlayer.addEventListener("click", (e) => {
    if (!currentTile || !board)
        return;
    const target = e.target;
    if (target.classList.contains("activePlayer")) {
        if (gridArray.find((x) => x === currentTile)) {
            const emptySquare = document.createElement("div");
            emptySquare.classList.add("square");
            board.replaceChild(emptySquare, currentTile);
            newPlayer.addTileToHande(currentTile);
            currentTile.classList.remove("active");
            currentTile = undefined;
        }
    }
});
