class Game {
  // public board: Array<HTMLDivElement> = [];
  public currentGameStatus: GameStatus = { board: [], playerHand: [] };
  public sets: Array<HTMLDivElement>[] = [];
  constructor(
    public players: Player[],
    public board: Board,
    public deck: Deck
  ) {
    // this.players.forEach((player) => player.getNewHand(this.deck));
  }

  startGame() {
    // createEmptyBoard(this.board);
    renderBoard(this.board.divArr);

    const findActivePlayer = this.players.find(
      (player) => player.isActive === true
    );

    if (!findActivePlayer) return;
    currentPlayer = findActivePlayer;

    renderPlayers(this.players);

    activatePlayer(this.players.indexOf(findActivePlayer));
  }

  saveCurrentGameStatus() {
    this.currentGameStatus = {
      board: [...this.board.divArr],
      playerHand: [...currentPlayer.divsArray],
    };
  }

  async updateGameInDB() {
    this.players.forEach((player) => player.updatePlayerInDB());
    this.board.updateBoardInDB();
    this.deck.updateDeckInDB();
  }
}
