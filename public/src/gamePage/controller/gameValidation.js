"use strict";
function validateBoard() {
    try {
        let validBoard = true;
        const newBoard = [...currentGame.board];
        let set = [];
        currentGame.sets = [];
        newBoard.forEach((square) => {
            if (square.innerHTML != "")
                set.push(parseInt(square.innerHTML));
            //
            if (square.innerHTML == "" && set.length > 0) {
                let lastValue = set[0] - 1;
                set.forEach((x) => {
                    let nextValue = x;
                    if (nextValue - 1 != lastValue) {
                        set = [];
                        console.error("not valid board");
                        validBoard = false;
                    }
                    lastValue++;
                });
                if (set.length < 3) {
                    set = [];
                    console.error("set too short. minimun 3 tiles needed");
                    validBoard = false;
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
