"use strict";
function validateBoard() {
    try {
        let validBoard = true;
        const boardCopy = [...currentGame.board];
        let set = [];
        currentGame.sets = [];
        boardCopy.forEach((square) => {
            if (!validBoard)
                return;
            if (square.innerHTML != "")
                set.push(square);
            const squareIndex = boardCopy.indexOf(square) + 1;
            //
            if ((square.innerHTML == "" && set.length > 0) ||
                (set.length > 0 && squareIndex % 20 == 0)) {
                console.log(squareIndex);
                const tileArr = set.map((div) => {
                    const color = div.dataset.color;
                    const number = parseInt(div.innerHTML);
                    return new Tile(color, number);
                });
                //check set length
                if (set.length < 3) {
                    set = [];
                    alert("set too short. minimun 3 tiles needed");
                    validBoard = false;
                }
                // check if the set is not the same color
                if (!isSameColor(tileArr)) {
                    // alert("Colors don't match in set.");
                    console.log("is valid group: " + IsValidGroup(tileArr));
                    if (!IsValidGroup(tileArr))
                        validBoard = false;
                }
                // check if the set is going up by one number by each tile
                else {
                    if (!isValidRun(tileArr)) {
                        alert("Not valid board.");
                        validBoard = false;
                    }
                }
                if (validBoard)
                    currentGame.sets.push(set);
                set = [];
            }
        });
        return validBoard;
    }
    catch (error) {
        console.error(error);
    }
}
function checkIfPlayerMadeAMove() {
    if (compareArrays(currentPlayer.divsArray, currentPlayer.startingTurnDivs)) {
        currentPlayer.getRandomTile(currentGame.deck);
    }
}
function hasDuplicates(array) {
    const newArr = array.map((tile) => tile.color + tile.value);
    return [...new Set(newArr)].length !== newArr.length;
}
function IsValidGroup(tileArr) {
    if (tileArr.length > 4) {
        return false;
    }
    const stringArr = tileArr.map((tile) => tile.value + tile.color);
    const setArr = [...new Set(stringArr)];
    if (!tileArr.map((tile) => tile.value).reduce((a, b) => (a === b ? a : NaN))) {
        return false;
    }
    return setArr.length === stringArr.length;
}
function isValidRun(tileArr) {
    return tileArr
        .map((tile) => tile.value)
        .reduce((a, b) => (a + 1 === b ? b : NaN));
}
function isSameColor(tileArr) {
    return tileArr.map((tile) => tile.color).reduce((a, b) => (a === b ? a : ""));
}
