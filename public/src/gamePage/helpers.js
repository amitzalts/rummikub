"use strict";
const resetCurrentTile = () => {
    if (!currentTile)
        throw new Error("current tile not found.");
    currentTile.classList.remove("active");
    currentTile = undefined;
};
const compareArrays = (a, b) => a.length === b.length;
// && a.every((element, index) => element === b[index])
function tileBelongesToPlayer(div) {
    if (!currentPlayer.startingTurnDivs.includes(div)) {
        resetCurrentTile();
        return false;
    }
    return true;
}
