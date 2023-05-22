class Deck {
  public deck: Tile[];

  constructor(public id: string = crypto.randomUUID()) {
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

  async updateDeckInDB() {
    await fetch(`${deckAPI}/updateDeck`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ deck: this.deck, deckId: this.id }),
    }).catch((error) => console.error(error));
  }
}

type GameStatus = {
  board: Array<HTMLDivElement>;
  playerHand: Array<HTMLDivElement>;
};
