const board: HTMLDivElement | null = document.querySelector(".board");
const gridArray: Array<HTMLElement> = [];

const playerTiles = document.querySelectorAll(
  ".tile"
) as NodeListOf<HTMLDivElement>;

const activePlayer = document.querySelector(".activePlayer") as HTMLDivElement;

