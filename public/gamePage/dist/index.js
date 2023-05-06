var board = document.querySelector(".board");
var gridArray = [];
if (!board)
    throw new Error("ERROR");
for (var i = 1; i <= 160; i++) {
    var div = document.createElement("div");
    div.classList.add("square");
    board.append(div);
    gridArray.push(div);
}
gridArray[67].classList.add("red");
gridArray[67].textContent = "7";
gridArray[68].classList.add("black");
gridArray[68].textContent = "7";
gridArray[69].classList.add("gold");
gridArray[69].textContent = "7";
gridArray[70].classList.add("blue");
gridArray[70].textContent = "7";
