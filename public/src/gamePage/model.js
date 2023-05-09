"use strict";
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
class Player {
    constructor(name, hand = []) {
        this.name = name;
        this.hand = hand;
        this.divsArray = [];
    }
    getNewHand(deck) {
        for (let i = 1; i < 15; i++) {
            this.getRandomTile(deck);
        }
    }
    getRandomTile(deck) {
        const getTile = deck.deal();
        this.hand.push(getTile);
        const tileDiv = document.createElement("div");
        tileDiv.classList.add("square");
        toggleActive(tileDiv, this.divsArray);
        switch (getTile[0]) {
            case "r":
                tileDiv.classList.add("red");
                tileDiv.innerHTML = getTile.slice(1);
                break;
            case "b":
                tileDiv.classList.add("blue");
                tileDiv.innerHTML = getTile.slice(1);
                break;
            case "y":
                tileDiv.classList.add("gold");
                tileDiv.innerHTML = getTile.slice(1);
                break;
            case "g":
                tileDiv.classList.add("green");
                tileDiv.innerHTML = getTile.slice(1);
                break;
            case "j":
                tileDiv.classList.add("jocker");
                tileDiv.innerHTML = '<i class="fa-regular fa-face-smile"></i>';
                break;
            default:
                console.error("Switch statement didn't work well.");
        }
        this.addTileToHande(tileDiv);
    }
    addTileToHande(div) {
        if (this.divsArray.length === 40) {
            activePlayer.style.gridTemplateColumns = "repeat(25, 1fr)";
        }
        this.divsArray.push(div);
        activePlayer.append(div);
    }
}
class Deck {
    constructor() {
        this.deck = [...allTiles, ...allTiles];
    }
    deal() {
        const randomDeckIndex = Math.floor(Math.random() * this.deck.length);
        const tile = this.deck.splice(randomDeckIndex, 1).join("");
        return tile;
    }
    resetDeck() {
        this.deck = [...allTiles, ...allTiles];
    }
}
class Game {
    constructor(players) {
        this.players = players;
        this.board = [];
        // this.board = this.getBoardFromUser()
    }
    getBoardFromUser() {
        //or Game route???
    }
}
