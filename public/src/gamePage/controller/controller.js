"use strict";
function toggleTileActive(clickedDiv, divArray) {
    clickedDiv.addEventListener("click", () => {
        if (!currentTile) {
            if (clickedDiv.className === "square") {
                return console.log("Not activating empty square");
            }
            if (clickedDiv.classList.contains("active")) {
                resetCurrentTile();
            }
            else {
                const findEle = divArray.find((ele) => ele.classList.contains("active"));
                if (findEle)
                    findEle.classList.remove("active");
                clickedDiv.classList.add("active");
                currentTile = clickedDiv;
            }
        }
        else
            moveTile(clickedDiv);
    });
}
function moveToNextPlayer() {
    if (!validateBoard())
        return;
    const numOfPlayers = currentGame.players.length;
    const indexCurrentPlayer = currentGame.players.indexOf(currentPlayer);
    // if current player is last player on array of players
    if (indexCurrentPlayer === numOfPlayers - 1)
        activatePlayer(0);
    else
        activatePlayer(indexCurrentPlayer + 1);
}
function activatePlayer(index) {
    const playersArray = playersInGameArea.querySelectorAll(".player");
    currentPlayer.isActive = false;
    currentPlayer = currentGame.players[index];
    currentPlayer.isActive = true;
    currentPlayer.renderHandToScreen();
    currentPlayer.initializeStartHend();
    playersArray.forEach((player) => {
        player.classList.remove("active");
        if (player.id === currentPlayer.id) {
            player.classList.add("active");
        }
    });
}
