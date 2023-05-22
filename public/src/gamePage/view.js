"use strict";
const board = document.querySelector(".board");
const playerNamesForm = document.querySelector("#playerNamesForm");
// page areas
const activePlayerArea = document.querySelector(".activePlayerArea");
const playersInGameArea = document.querySelector(".playersInGameArea");
// buttons
const sortByColorBtn = document.querySelector("#sortByColorBtn");
const sortByNumbersBtn = document.querySelector("#sortByNumbersBtn");
const endTurnBtn = document.querySelector("#endTurnBtn");
const resetTurnBtn = document.querySelector("#resetTurnBtn");
// current entities
let currentPlayer;
let currentGame;
let currentTile;
const deckAPI = "api/v1/decks";
const boardAPI = "api/v1/boards";
const playerAPI = "api/v1/players";
