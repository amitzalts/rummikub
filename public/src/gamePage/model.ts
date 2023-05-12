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
    this.deck = this.createDeck();
  }

  deal() {
    const randomDeckIndex = Math.floor(Math.random() * this.deck.length);
    const tile = this.deck.splice(randomDeckIndex, 1)[0];
    return tile;
  }

  createDeck() {
    const colors = ["green", "red", "blue", "yellow"];
    const halfDeck: {}[] = [];

    colors.forEach((color) => {
      for (let i = 1; i <= 13; i++) {
        const tile = { [color]: i };
        halfDeck.push(tile);
      }
    });

    const jocker = { jocker: "<i class='fa-regular fa-face-smile'></i>" };
    halfDeck.push(jocker);

    const deck = [...halfDeck, ...halfDeck];

    return deck;
  }

  resetDeck() {
    this.deck = [...this.createDeck()];
  }
}

class Game {
  public board: Array<HTMLDivElement> = [];
  public deck: Deck;
  public sets: number[][] = [];
  constructor(public players: Player[]) {
    this.deck = new Deck();
    this.players.forEach((player) => player.getNewHand(this.deck));
  }

  getBoardFromUser() {
    //or Game route???
  }
}
