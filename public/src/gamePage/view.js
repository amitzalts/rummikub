"use strict";
const board = document.querySelector(".board");
const gridArray = [];
const playerTiles = document.querySelectorAll(".tile");
const activePlayerArea = document.querySelector(".activePlayer");
const players = document.querySelectorAll(".player");
let currentPlayer;
let currentTile;
//
//
//
//
// deck
const allTiles = [
    "b1",
    "g1",
    "y1",
    "r1",
    "b2",
    "g2",
    "y2",
    "r2",
    "b3",
    "g3",
    "y3",
    "r3",
    "b4",
    "g4",
    "y4",
    "r4",
    "b5",
    "g5",
    "y5",
    "r5",
    "b6",
    "g6",
    "y6",
    "r6",
    "b7",
    "g7",
    "y7",
    "r7",
    "b8",
    "g8",
    "y8",
    "r8",
    "b9",
    "g9",
    "y9",
    "r9",
    "b10",
    "g10",
    "y10",
    "r10",
    "b11",
    "g11",
    "y11",
    "r11",
    "b12",
    "g12",
    "y12",
    "r12",
    "b13",
    "g13",
    "y13",
    "r13",
    "jocker",
];
