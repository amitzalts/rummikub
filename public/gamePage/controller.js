"use strict";
function createEmptyBoard() {
    if (!board)
        throw new Error("Board div not found.");
    for (let i = 1; i <= 160; i++) {
        const div = document.createElement("div");
        div.classList.add("square");
        gridArray.push(div);
        toggleActive(div, gridArray);
    }
    renderBoard(gridArray);
}
function renderBoard(divsArray) {
    if (!board)
        throw new Error("Can't find board div.");
    board.innerHTML = "";
    divsArray.forEach((div) => board.append(div));
}
function toggleActive(element, elementArray) {
    element.addEventListener("click", () => {
        if (moveTile(element))
            return;
        if (element.classList.contains("active")) {
            element.classList.remove("active");
            currentTile = undefined;
        }
        else {
            const findEle = elementArray.find((ele) => ele.classList.contains("active"));
            if (findEle)
                findEle.classList.remove("active");
            element.classList.add("active");
            currentTile = element;
        }
    });
}
function moveTile(divElement) {
    if (!currentTile)
        return;
    if (!board)
        throw new Error("Can't find board div.");
    if (newPlayer.divsArray.find((ele) => ele === currentTile)) {
        currentTile.classList.remove("active");
        console.log("3");
        const indexOfNewLocation = gridArray.indexOf(divElement);
        gridArray[indexOfNewLocation] = currentTile;
        const index = newPlayer.divsArray.indexOf(currentTile);
        newPlayer.divsArray.splice(index, 1);
        renderBoard(gridArray);
        currentTile = undefined;
    }
    else {
        currentTile.classList.remove("active");
        const indexOfcurrentTile = gridArray.indexOf(currentTile);
        const indexOfNewLocation = gridArray.indexOf(divElement);
        gridArray[indexOfcurrentTile] = divElement;
        gridArray[indexOfNewLocation] = currentTile;
        renderBoard(gridArray);
        currentTile = undefined;
        console.log("4");
    }
    return true;
}
