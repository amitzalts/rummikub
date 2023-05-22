"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    updateGameInDB() {
        return __awaiter(this, void 0, void 0, function* () {
            this.players.forEach((player) => player.updatePlayerInDB());
            this.board.updateBoardInDB();
            this.deck.updateDeckInDB();
        });
    }
}
