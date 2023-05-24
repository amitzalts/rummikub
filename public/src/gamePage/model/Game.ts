class Game {
  // public board: Array<HTMLDivElement> = [];
  public currentGameStatus: GameStatus = { board: [], playerHand: [] };
  public sets: Array<HTMLDivElement>[] = [];
  constructor(
    public players: Player[],
    public board: Board,
    public deck: Deck
  ) {
    if (this.players[0].divsArray.length === 0) {
      this.givePlayersTiles();
    }
  }

  startGame() {
    // createEmptyBoard(this.board);
    renderBoard(this.board.divArr);

    const findActivePlayer = this.players.find(
      (player) => player.isActive === true
    );

    if (findActivePlayer) currentPlayer = findActivePlayer;

    renderPlayers(this.players);

    activatePlayer(currentGame.players.indexOf(currentPlayer));
  }

  givePlayersTiles() {
    this.players.forEach((player) => player.getNewHand(this.deck));
  }

  saveCurrentGameStatus() {
    this.currentGameStatus = {
      board: [...this.board.divArr],
      playerHand: [...currentPlayer.divsArray],
    };
  }

  async updateGameInDB() {
    console.log("Updating game in DB...");
    this.players.forEach((player) => player.updatePlayerInDB());
    this.board.updateBoardInDB();
    this.deck.updateDeckInDB();
  }
}
