const allTiles = [
  "1b",
  "1g",
  "1y",
  "1r",
  "2b",
  "2g",
  "2y",
  "2r",
  "3b",
  "3g",
  "3y",
  "3r",
  "4b",
  "4g",
  "4y",
  "4r",
  "5b",
  "5g",
  "5y",
  "5r",
  "6b",
  "6g",
  "6y",
  "6r",
  "7b",
  "7g",
  "7y",
  "7r",
  "8b",
  "8g",
  "8y",
  "8r",
  "9b",
  "9g",
  "9y",
  "9r",
  "10b",
  "10g",
  "10y",
  "10r",
  "11b",
  "11g",
  "11y",
  "11r",
  "12b",
  "12g",
  "12y",
  "12r",
  "13b",
  "13g",
  "13y",
  "13r",
  "jocker",
];

class Player {
  constructor(public name: string, public hand: string[] = []) {}

  getNewHand(deck: Deck) {
    for (let i = 1; i < 15; i++) {
      this.getRandomTile(deck);
    }
  }

  getRandomTile(deck: Deck) {
    const getTile = deck.deal();

    this.hand.push(getTile);

    const tilediv = document.createElement("div");

    tilediv.classList.add("tile");

    // tilediv.addEventListener("click", () => {
    //   tilediv.classList.add("active");
    // });

    switch (getTile[1]) {
      case "r":
        tilediv.classList.add("red");
        tilediv.innerHTML = getTile[0];
        break;
      case "b":
        tilediv.classList.add("blue");
        tilediv.innerHTML = getTile[0];
        break;
      case "y":
        tilediv.classList.add("yellow");
        tilediv.innerHTML = getTile[0];
        break;
      case "g":
        tilediv.classList.add("green");
        tilediv.innerHTML = getTile[0];
        break;
      case "o":
        tilediv.classList.add("jocker");
        tilediv.innerHTML = '<i class="fa-regular fa-face-smile"></i>';
      default:
        console.error("Switch statement didn't work well.");
    }

    activePlayer.append(tilediv);
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
