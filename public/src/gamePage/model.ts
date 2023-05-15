class Player {
  public id: string;
  public isActive: boolean = false;
  public startingTurnDivs: Array<HTMLDivElement> = [];
  constructor(public name: string, public divsArray: Array<HTMLDivElement> = []) {
    this.id = Math.random().toString(36).slice(-9);
  }

  initializeStartHend() {
    this.startingTurnDivs = [...this.divsArray];
  }

  getNewHand(deck: Deck) {
    for (let i = 1; i < 15; i++) {
      this.getRandomTile(deck);
    }
  }

  getRandomTile(deck: Deck) {
    const getTile = deck.deal();

    toggleTileActive(getTile.div, this.divsArray);

    this.divsArray.push(getTile.div);
    this.renderHandToScreen();
  }

  renderHandToScreen() {
    activePlayerArea.innerHTML = "";

    if (this.divsArray.length > 30) {
      activePlayerArea.style.gridTemplateColumns = "repeat(20, 1fr)";
    }

    this.divsArray.forEach((div) => activePlayerArea.append(div));
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
    const colors = ["green", "red", "blue", "yellow"];
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

class Game {
  public board: Array<HTMLDivElement> = [];
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

  getBoardFromUser() {
    //or Game route???
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

    // toggleTileActive(tileDiv, currentPlayer.divsArray);

    switch (color) {
      case "red":
        tileDiv.classList.add("tile");
        tileDiv.dataset.color = "red";
        // tileDiv.style.backgroundColor = "red"
        tileDiv.innerHTML = value.toString();
        break;

      case "blue":
        tileDiv.classList.add("tile");
        tileDiv.dataset.color = "blue";
        tileDiv.innerHTML = value.toString();
        break;

      case "yellow":
        tileDiv.classList.add("tile");
        tileDiv.dataset.color = "yellow";
        tileDiv.innerHTML = value.toString();
        break;

      case "green":
        tileDiv.classList.add("tile");
        tileDiv.dataset.color = "green";
        tileDiv.innerHTML = value.toString();
        break;

      case "jocker":
        tileDiv.classList.add("tile");
        tileDiv.dataset.color = "jocker";
        tileDiv.innerHTML = '<i class="fa-regular fa-face-smile"></i>';
        break;

      default:
        console.error("Switch statement didn't work well.");
    }

    tileDiv.id = this.id;
    return tileDiv;
  }
}
