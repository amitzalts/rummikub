"use strict";
const board = document.querySelector(".board");
const gridArray = [];
createBoard();
function createBoard() {
    if (!board)
        throw new Error("Board div not found.");
    for (let i = 1; i <= 160; i++) {
        const div = document.createElement("div");
        div.classList.add("square");
        board.append(div);
        gridArray.push(div);
        div.addEventListener("click", () => {
            var _a;
            if (div.classList.contains("active")) {
                div.classList.remove("active");
            }
            else {
                (_a = gridArray
                    .find((ele) => ele.classList.contains("active"))) === null || _a === void 0 ? void 0 : _a.classList.remove("active");
                div.classList.add("active");
            }
        });
    }
}
gridArray[67].classList.add("red");
gridArray[67].textContent = "7";
gridArray[68].classList.add("black");
gridArray[68].textContent = "7";
gridArray[69].classList.add("gold");
gridArray[69].textContent = "7";
gridArray[70].classList.add("blue");
gridArray[70].textContent = "7";
