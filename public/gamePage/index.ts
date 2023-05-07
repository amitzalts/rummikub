const board: HTMLDivElement | null = document.querySelector(".board");
const gridArray: Array<HTMLElement> = [];

createBoard();

function createBoard() {
  if (!board) throw new Error("Board div not found.");

  for (let i = 1; i <= 160; i++) {
    const div: HTMLDivElement = document.createElement("div");
    div.classList.add("square");

    board.append(div);

    gridArray.push(div);

    div.addEventListener("click", () => {
      if (div.classList.contains("active")) {
        div.classList.remove("active");
      } else {
        gridArray
          .find((ele) => ele.classList.contains("active"))
          ?.classList.remove("active");
        div.classList.add("active");
      }
    });
  }
}

gridArray[67].classList.add("red");
gridArray[67].textContent = "7";
gridArray[68].classList.add("green");
gridArray[68].textContent = "7";
gridArray[69].classList.add("gold");
gridArray[69].textContent = "7";
gridArray[70].classList.add("blue");
gridArray[70].textContent = "7";

const playerTiles = document.querySelectorAll(
  ".tile"
) as NodeListOf<HTMLDivElement>;

playerTiles.forEach((tile) =>
  tile.addEventListener("click", () => {
    tile.classList.add("active");
  })
);
