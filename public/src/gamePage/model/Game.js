"use strict";
class Game {
    constructor(players, board, deck) {
        this.players = players;
        this.board = board;
        this.deck = deck;
        // public board: Array<HTMLDivElement> = [];
        this.currentGameStatus = { board: [], playerHand: [] };
        this.sets = [];
        this.players.forEach((player) => player.getNewHand(this.deck));
    }
    startGame() {
        // createEmptyBoard(this.board);
        renderBoard(this.board.divArr);
        currentPlayer =
            this.players[Math.floor(Math.random() * this.players.length)];
        renderPlayers(currentGame.players);
        activatePlayer(currentGame.players.indexOf(currentPlayer));
    }
    saveCurrentGameStatus() {
        this.currentGameStatus = {
            board: [...this.board.divArr],
            playerHand: [...currentPlayer.divsArray],
        };
    }
}
