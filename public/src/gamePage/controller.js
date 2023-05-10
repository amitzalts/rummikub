"use strict";
function createEmptyBoard(array) {
    if (!board)
        throw new Error("Board div not found.");
    for (let i = 1; i <= 160; i++) {
        const squareDiv = document.createElement("div");
        squareDiv.classList.add("square");
        array.push(squareDiv);
        toggleActive(squareDiv, array);
    }
    renderBoard(array);
}
function renderBoard(divsArray) {
    if (!board)
        throw new Error("Can't find board div.");
    board.innerHTML = "";
    divsArray.forEach((div) => board.append(div));
}
function toggleActive(squareDiv, squareDivArray) {
    squareDiv.addEventListener("click", () => {
        if (moveTile(squareDiv))
            return;
        if (squareDiv.className === "square") {
            return console.log("Not activating empty square");
        }
        if (squareDiv.classList.contains("active")) {
            squareDiv.classList.remove("active");
            currentTile = undefined;
        }
        else {
            const findEle = squareDivArray.find((ele) => ele.classList.contains("active"));
            if (findEle)
                findEle.classList.remove("active");
            squareDiv.classList.add("active");
            currentTile = squareDiv;
        }
    });
}
function moveTile(squareDiv) {
    if (!currentTile)
        return;
    if (!board)
        throw new Error("Can't find board div.");
    // if currentTile in player's hand
    if (currentPlayer.divsArray.find((ele) => ele === currentTile)) {
        moveFromPlayerHand(squareDiv);
    }
    // moving tile on board from one square to another
    else {
        currentTile.classList.remove("active");
        const indexOfcurrentTile = newGame.board.indexOf(currentTile);
        const indexOfNewLocation = newGame.board.indexOf(squareDiv);
        newGame.board[indexOfcurrentTile] = squareDiv;
        newGame.board[indexOfNewLocation] = currentTile;
        renderBoard(newGame.board);
        currentTile = undefined;
    }
    return true;
}
function moveFromPlayerHand(squareDiv) {
    if (!currentTile)
        return;
    if (!board)
        throw new Error("Can't find board div.");
    if (currentPlayer.divsArray.find((ele) => ele === squareDiv)) {
        return;
    }
    if (squareDiv.classList.contains("tile")) {
        currentTile.classList.remove("active");
        const indexOfNewLocation = newGame.board.indexOf(squareDiv);
        const indexOfcurrentTile = currentPlayer.divsArray.indexOf(currentTile);
        newGame.board[indexOfNewLocation] = currentTile;
        currentPlayer.divsArray[indexOfcurrentTile] = squareDiv;
        renderBoard(newGame.board);
        currentPlayer.renderHandToScreen();
        currentTile = undefined;
        console.log("object");
    }
    else {
        currentTile.classList.remove("active");
        const indexOfNewLocation = newGame.board.indexOf(squareDiv);
        newGame.board[indexOfNewLocation] = currentTile;
        const index = currentPlayer.divsArray.indexOf(currentTile);
        currentPlayer.divsArray.splice(index, 1);
        renderBoard(newGame.board);
        currentTile = undefined;
    }
}
function renderPlayers(playersArray) {
    const html = playersArray
        .map((player) => `<div class="player" id="${player.id}"">${player.name}</div>`)
        .join("");
    playersInGameArea.innerHTML = html;
    activatePlayers();
}
function activatePlayers() {
    const playersArray = playersInGameArea.querySelectorAll(".player");
    playersArray.forEach((player) => {
        if (player.id === currentPlayer.id) {
            player.classList.add("active");
        }
    });
    playersArray.forEach((player) => player.addEventListener("click", (e) => {
        playersArray.forEach((player) => player.classList.remove("active"));
        const target = e.target;
        if (target.classList.contains("player")) {
            target.classList.add("active");
            const findPlayer = newGame.players.find((player) => player.id === target.id);
            if (findPlayer)
                currentPlayer = findPlayer;
            currentPlayer.renderHandToScreen();
        }
    }));
}
