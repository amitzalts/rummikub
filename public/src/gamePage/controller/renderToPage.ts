function createEmptyBoard(array: Array<HTMLDivElement>, numOfSquares: number) {
  if (!board) throw new Error("Board div not found.");

  for (let i = 1; i <= numOfSquares; i++) {
    const squareDiv: HTMLDivElement = document.createElement("div");
    squareDiv.classList.add("square");
    squareDiv.style.background =
      "url('../../img/tileBack.png')no-repeat center / contain";
    array.push(squareDiv);

    toggleTileActive(squareDiv, array);
  }
  renderBoard(array);
}

function renderBoard(divsArray: Array<HTMLDivElement>) {
  if (!board) throw new Error("Can't find board div.");

  board.innerHTML = "";

  divsArray.forEach((div) => board.append(div));
}

function renderPlayers(playersArray: Player[]) {
  const html = playersArray
    .map(
      (player) => `<div class="player" id="${player.id}"">${player.name}</div>`
    )
    .join("");

  playersInGameArea.innerHTML = html;
}
