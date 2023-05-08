"use strict";
createEmptyBoard();
// gridArray[67].classList.add("red");
// gridArray[67].textContent = "7";
// gridArray[68].classList.add("green");
// gridArray[68].textContent = "7";
// gridArray[69].classList.add("gold");
// gridArray[69].textContent = "7";
// gridArray[70].classList.add("blue");
// gridArray[70].textContent = "7";
// gridArray[47].innerHTML = `<div class="tile blue">5</div>`
const newPlayer = new Player("vladb89");
const newDeck = new Deck();
newPlayer.getNewHand(newDeck);
// console.log(newDeck.deal());
