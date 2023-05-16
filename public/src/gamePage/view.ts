const board: HTMLDivElement | null = document.querySelector(".board");

const playerNamesForm: HTMLFormElement | null =
  document.querySelector("#playerNamesForm");

// page areas
const activePlayerArea = document.querySelector(
  ".activePlayerArea"
) as HTMLDivElement;

const playersInGameArea = document.querySelector(
  ".playersInGameArea"
) as HTMLDivElement;

// buttons
const sortByColorBtn = document.querySelector(
  "#sortByColorBtn"
) as HTMLButtonElement;

const sortByNumbersBtn = document.querySelector(
  "#sortByNumbersBtn"
) as HTMLButtonElement;

const endTurnBtn = document.querySelector("#endTurnBtn") as HTMLButtonElement;

// current entities
let currentPlayer: Player;
let currentGame: Game;
let currentTile: HTMLDivElement | undefined;
