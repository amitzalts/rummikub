"use strict";
class Player {
    constructor(name, divsArray = []) {
        this.name = name;
        this.divsArray = divsArray;
        this.isActive = false;
        this.startingTurnDivs = [];
        this.id = Math.random().toString(36).slice(-9);
    }
    initializeStartHend() {
        this.startingTurnDivs = [...this.divsArray];
    }
    getNewHand(deck) {
        for (let i = 1; i < 20; i++) {
            this.getRandomTile(deck);
        }
    }
    getRandomTile(deck) {
        const getTile = deck.deal();
        toggleTileActive(getTile.div, this.divsArray);
        this.divsArray.push(getTile.div);
        this.renderHandToScreen(this.divsArray);
    }
    renderHandToScreen(tileArr) {
        activePlayerArea.innerHTML = "";
        if (tileArr.length > 30) {
            activePlayerArea.style.gridTemplateColumns = "repeat(20, 1fr)";
        }
        tileArr.forEach((div) => activePlayerArea.append(div));
    }
}
class Deck {
    constructor() {
        this.deck = this.createDeck();
    }
    deal() {
        const randomDeckIndex = Math.floor(Math.random() * this.deck.length);
        const tile = this.deck.splice(randomDeckIndex, 1)[0];
        return tile;
    }
    createDeck() {
        const colors = ["black", "red", "blue", "yellow"];
        const deck = [];
        for (let j = 1; j < 3; j++) {
            const jocker = new Tile("jocker", 0);
            colors.forEach((color) => {
                for (let i = 1; i <= 13; i++) {
                    const tile = new Tile(color, i);
                    deck.push(tile);
                }
            });
            deck.push(jocker);
        }
        return deck;
    }
    resetDeck() {
        this.deck = [...this.createDeck()];
    }
}
class Game {
    constructor(players) {
        this.players = players;
        this.board = [];
        this.currentGameStatus = { board: [], playerHand: [] };
        this.sets = [];
        this.deck = new Deck();
        this.players.forEach((player) => player.getNewHand(this.deck));
    }
    startGame() {
        createEmptyBoard(this.board, 160);
        currentPlayer =
            this.players[Math.floor(Math.random() * this.players.length)];
        renderPlayers(currentGame.players);
        activatePlayer(currentGame.players.indexOf(currentPlayer));
    }
    saveCurrentGameStatus() {
        this.currentGameStatus = {
            board: [...this.board],
            playerHand: [...currentPlayer.divsArray],
        };
    }
}
class Tile {
    constructor(color, value, id = Math.random().toString(36).slice(-9)) {
        this.color = color;
        this.value = value;
        this.id = id;
        this.div = this.buildTileDiv(this.color, this.value);
    }
    buildTileDiv(color, value) {
        const tileDiv = document.createElement("div");
        tileDiv.classList.add("square");
        // toggleTileActive(tileDiv, currentPlayer.divsArray);
        switch (color) {
            case "red":
                tileDiv.classList.add("tile");
                tileDiv.dataset.color = "red";
                tileDiv.dataset.value = `${value}`;
                tileDiv.style.background = `url('../../img/tileSvg/${color}-${value}.svg')no-repeat center / contain`;
                tileDiv.innerHTML = value.toString();
                break;
            case "blue":
                tileDiv.classList.add("tile");
                tileDiv.dataset.color = "blue";
                tileDiv.dataset.value = `${value}`;
                tileDiv.style.background = `url('../../img/tileSvg/${color}-${value}.svg')no-repeat center / contain`;
                tileDiv.innerHTML = value.toString();
                break;
            case "yellow":
                tileDiv.classList.add("tile");
                tileDiv.dataset.color = "yellow";
                tileDiv.dataset.value = `${value}`;
                tileDiv.style.background = `url('../../img/tileSvg/${color}-${value}.svg')no-repeat center / contain`;
                tileDiv.innerHTML = value.toString();
                break;
            case "black":
                tileDiv.classList.add("tile");
                tileDiv.dataset.color = "black";
                tileDiv.dataset.value = `${value}`;
                tileDiv.style.background = `url('../../img/tileSvg/${color}-${value}.svg')no-repeat center / contain`;
                tileDiv.innerHTML = value.toString();
                break;
            case "jocker":
                tileDiv.classList.add("tile");
                tileDiv.dataset.color = "jocker";
                // tileDiv.innerHTML = '<i class="fa-regular fa-face-smile"></i>';
                tileDiv.style.background = `url('../../img/pngwing.com.png')no-repeat center / contain`;
                break;
            default:
                console.error("Switch statement didn't work well.");
        }
        tileDiv.id = this.id;
        return tileDiv;
    }
}
