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
function generateUUID() {
    var d = new Date().getTime(); //Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0; //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) { //Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        }
        else { //Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
