"use strict";
const board = document.querySelector(".board");
// page areas
const activePlayerArea = document.querySelector(".activePlayerArea");
const playersInGameArea = document.querySelector(".playersInGameArea");
// buttons
const sortByColorBtn = document.querySelector("#sortByColorBtn");
const sortByNumbersBtn = document.querySelector("#sortByNumbersBtn");
const endTurnBtn = document.querySelector("#endTurnBtn");
// current entities
let currentPlayer;
let currentTile;
