"use strict";
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
