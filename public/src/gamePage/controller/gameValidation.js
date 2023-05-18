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
            //
            if (square.innerHTML == "" && set.length > 0) {
                const setObjArr = set.map((div) => {
                    return {
                        number: parseInt(div.innerHTML),
                        color: div.dataset.color,
                    };
                });
                console.log(setObjArr);
                console.log(hasDuplicates(setObjArr));
                //check set length
                if (set.length < 3) {
                    set = [];
                    alert("set too short. minimun 3 tiles needed");
                    validBoard = false;
                }
                // check if the set is of the same color
                if (!set
                    .map((div) => div.dataset.color)
                    .reduce((a, b) => (a === b ? a : undefined))) {
                    alert("Colors don't match in set.");
                    validBoard = false;
                }
                // check if the set is going up by one number by each tile
                else {
                    let lastValue = setObjArr[0].number;
                    set.forEach((div) => {
                        let nextValue = parseInt(div.innerHTML);
                        if (nextValue != lastValue) {
                            set = [];
                            alert("Not valid board.");
                            validBoard = false;
                        }
                        lastValue++;
                    });
                }
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
