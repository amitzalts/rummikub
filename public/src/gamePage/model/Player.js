"use strict";
class Player {
    constructor(name, divsArray = [], id = crypto.randomUUID()) {
        this.name = name;
        this.divsArray = divsArray;
        this.id = id;
        this.isActive = false;
        this.startingTurnDivs = [];
        this.hand = [];
    }
    initializeStartHend() {
        this.startingTurnDivs = [...this.divsArray];
    }
    getNewHand(deck) {
        for (let i = 1; i < 20; i++) {
            this.getRandomTile(deck);
        }
    }
    activateHand() {
        this.divsArray = this.hand.map((tile) => tile.div);
        this.divsArray.forEach((div) => toggleTileActive(div, this.divsArray));
    }
    getRandomTile(deck) {
        const getTile = deck.deal();
        toggleTileActive(getTile.div, this.divsArray);
        this.divsArray.push(getTile.div);
        this.hand.push(getTile);
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
