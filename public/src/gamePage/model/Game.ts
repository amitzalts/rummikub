class Game {
  // public board: Array<HTMLDivElement> = [];
  public currentGameStatus: GameStatus = { board: [], playerHand: [] };
  public sets: Array<HTMLDivElement>[] = [];
  constructor(
    public players: Player[],
    public board: Board,
    public deck: Deck
  ) {
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
