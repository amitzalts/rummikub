class Player {
  public divsArray: Array<HTMLDivElement> = [];

  public isActive: boolean = false;

  constructor(public name: string, public hand: string[] = []) {}

  getNewHand(deck: Deck) {
    for (let i = 1; i < 15; i++) {
      this.getRandomTile(deck);
    }
  }

  getRandomTile(deck: Deck) {
    const getTile = deck.deal();

    this.hand.push(getTile);

    const tileDiv = document.createElement("div");

    tileDiv.classList.add("square");

    toggleActive(tileDiv, this.divsArray);

    switch (getTile[0]) {
      case "r":
        tileDiv.classList.add("red");
        tileDiv.innerHTML = getTile.slice(1);
        break;
      case "b":
        tileDiv.classList.add("blue");
        tileDiv.innerHTML = getTile.slice(1);
        break;
      case "y":
        tileDiv.classList.add("gold");
        tileDiv.innerHTML = getTile.slice(1);
        break;
      case "g":
        tileDiv.classList.add("green");
        tileDiv.innerHTML = getTile.slice(1);
        break;
      case "j":
        tileDiv.classList.add("jocker");
        tileDiv.innerHTML = '<i class="fa-regular fa-face-smile"></i>';
        break;
      default:
        console.error("Switch statement didn't work well.");
    }
    this.divsArray.push(tileDiv);
  }

  renderHandToScreen() {
    activePlayerArea.innerHTML = "";

    if (this.divsArray.length > 40) {
      activePlayerArea.style.gridTemplateColumns = "repeat(25, 1fr)";
    }

    this.divsArray.forEach((div) => activePlayerArea.append(div));
  }
}

class Deck {
  public deck: string[];
  constructor() {
    this.deck = [...allTiles, ...allTiles];
  }
  deal() {
    const randomDeckIndex = Math.floor(Math.random() * this.deck.length);
    const tile = this.deck.splice(randomDeckIndex, 1).join("");
    return tile;
  }
  resetDeck() {
    this.deck = [...allTiles, ...allTiles];
  }
}

class Game {
  public board: Array<HTMLDivElement> = [];

  constructor(public players: Player[], public deck: Deck) {
    // this.board = this.getBoardFromUser()
  }

  getBoardFromUser() {
    //or Game route???
  }
}

// const newGame = new Game()
