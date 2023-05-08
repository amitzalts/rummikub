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

