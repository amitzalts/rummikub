class Player {
  public divsArray: Array<HTMLDivElement> = [];
  public id: string;
  public isActive: boolean = false;

  constructor(public name: string, public hand: {}[] = []) {
    this.id = Math.random().toString(36).slice(-9);
  }

  getNewHand(deck: Deck) {
    for (let i = 1; i < 15; i++) {
      this.getRandomTile(deck);
    }
  }

  getRandomTile(deck: Deck) {
    const getTile = deck.deal();

    const key = Object.keys(getTile)[0];
    const value = Object.values(getTile)[0] as number;

    this.hand.push(getTile);

    const tileDiv = document.createElement("div");

    tileDiv.classList.add("square");

    toggleActive(tileDiv, this.divsArray);

    switch (key) {
      case "red":
        tileDiv.classList.add("red", "tile");
        tileDiv.innerHTML = value.toString();
        break;

      case "blue":
        tileDiv.classList.add("blue", "tile");
        tileDiv.innerHTML = value.toString();
        break;

      case "yellow":
        tileDiv.classList.add("gold", "tile");
        tileDiv.innerHTML = value.toString();
        break;

      case "green":
        tileDiv.classList.add("green", "tile");
        tileDiv.innerHTML = value.toString();
        break;

      case "jocker":
        tileDiv.classList.add("jocker", "tile");
        tileDiv.innerHTML = '<i class="fa-regular fa-face-smile"></i>';
        break;

      default:
        console.error("Switch statement didn't work well.");
    }
    this.divsArray.push(tileDiv);
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
  public deck: {}[];
  constructor() {
    this.deck = createDeck();
  }
  deal() {
    const randomDeckIndex = Math.floor(Math.random() * this.deck.length);
    const tile = this.deck.splice(randomDeckIndex, 1)[0];
    return tile;
  }
  resetDeck() {
    this.deck = [...createDeck()];
  }
}

class Game {
  public board: Array<HTMLDivElement> = [];
  public deck: Deck;

  constructor(public players: Player[]) {
    this.deck = new Deck();
    this.players.forEach((player) => player.getNewHand(this.deck));
  }

  getBoardFromUser() {
    //or Game route???
  }
}
