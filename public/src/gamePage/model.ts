class Player {
  public id: string;
  public isActive: boolean = false;
  public startingTurnDivs: Array<HTMLDivElement> = [];
  constructor(
    public name: string,
    public divsArray: Array<HTMLDivElement> = []
  ) {
    this.id = Math.random().toString(36).slice(-9);
  }

  initializeStartHend() {
    this.startingTurnDivs = [...this.divsArray];
  }

  getNewHand(deck: Deck) {
    for (let i = 1; i < 20; i++) {
      this.getRandomTile(deck);
    }
  }

  getRandomTile(deck: Deck) {
    const getTile = deck.deal();

    toggleTileActive(getTile.div, this.divsArray);

    this.divsArray.push(getTile.div);
    this.renderHandToScreen(this.divsArray);
  }

  renderHandToScreen(tileArr: Array<HTMLDivElement>) {
    activePlayerArea.innerHTML = "";

    if (tileArr.length > 30) {
      activePlayerArea.style.gridTemplateColumns = "repeat(20, 1fr)";
    }

    tileArr.forEach((div) => activePlayerArea.append(div));
  }
}

class Deck {
  public deck: Tile[];
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
    const deck: Tile[] = [];

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
type GameStatus = {
  board: Array<HTMLDivElement>;
  playerHand: Array<HTMLDivElement>;
};
class Game {
  public board: Array<HTMLDivElement> = [];
  public currentGameStatus: GameStatus = { board: [], playerHand: [] };
  public deck: Deck;
  public sets: Array<HTMLDivElement>[] = [];
  constructor(public players: Player[]) {
    this.deck = new Deck();
    this.players.forEach((player) => player.getNewHand(this.deck));
  }

  startGame() {
    createEmptyBoard(this.board);

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
  public div: HTMLDivElement;

  constructor(
    public color: string,
    public value: number,
    public id: string = Math.random().toString(36).slice(-9)
  ) {
    this.div = this.buildTileDiv(this.color, this.value);
  }

  buildTileDiv(color: string, value: number) {
    const tileDiv = document.createElement("div");

    tileDiv.classList.add("square");

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
        tileDiv.innerHTML = "jocker";
        tileDiv.dataset.value = `0`;
        tileDiv.style.background = `url('../../img/pngwing.com.png')no-repeat center / contain`;
        break;

      default:
        console.error("Switch statement didn't work well.");
    }

    tileDiv.id = this.id;
    return tileDiv;
  }
}
