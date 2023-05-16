"use strict";
function createEmptyBoard(array, numOfSquares) {
    if (!board)
        throw new Error("Board div not found.");
    for (let i = 1; i <= numOfSquares; i++) {
        const squareDiv = document.createElement("div");
        squareDiv.classList.add("square");
        squareDiv.style.background =
            "url('../../img/tileBack.png')no-repeat center / contain";
        array.push(squareDiv);
        toggleTileActive(squareDiv, array);
    }
    renderBoard(array);
}
function renderBoard(divsArray) {
    if (!board)
        throw new Error("Can't find board div.");
    board.innerHTML = "";
    divsArray.forEach((div) => board.append(div));
}
function renderPlayers(playersArray) {
    const html = playersArray
        .map((player) => `<div class="player" id="${player.id}"">${player.name}</div>`)
        .join("");
    playersInGameArea.innerHTML = html;
}
