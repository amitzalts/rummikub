class Player {
    public isActive: boolean = false;
    public startingTurnDivs: Array<HTMLDivElement> = [];
    public hand: Tile[] = [];
    constructor(
      public name: string,
      public divsArray: Array<HTMLDivElement> = [],
      public id: string = crypto.randomUUID()
    ) {}
  
    initializeStartHend() {
      this.startingTurnDivs = [...this.divsArray];
    }
  
    getNewHand(deck: Deck) {
      for (let i = 1; i < 20; i++) {
        this.getRandomTile(deck);
      }
    }
  
    activateHand() {
      this.divsArray = this.hand.map((tile) => tile.div);
      this.divsArray.forEach((div) => toggleTileActive(div, this.divsArray));
    }
  
    getRandomTile(deck: Deck) {
      const getTile = deck.deal();
  
      toggleTileActive(getTile.div, this.divsArray);
  
      this.divsArray.push(getTile.div);
      this.hand.push(getTile);
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