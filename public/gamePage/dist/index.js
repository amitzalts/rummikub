var board = document.querySelector(".board");
var gridArray = [];
createBoard();
function createBoard() {
    if (!board)
        throw new Error("Board div not found.");
    var _loop_1 = function (i) {
        var div = document.createElement("div");
        div.classList.add("square");
        board.append(div);
        gridArray.push(div);
        div.addEventListener("click", function () {
            var _a;
            if (div.classList.contains("active")) {
                div.classList.remove("active");
            }
            else {
                (_a = gridArray
                    .find(function (ele) { return ele.classList.contains("active"); })) === null || _a === void 0 ? void 0 : _a.classList.remove("active");
                div.classList.add("active");
            }
        });
    };
    for (var i = 1; i <= 160; i++) {
        _loop_1(i);
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
