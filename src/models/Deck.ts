import { Card } from "./Card";
import type { FaceValue, Suit } from "./Card";

const SUITS: Suit[] = ["S", "C", "D", "H"];
const FACE_VALUES: FaceValue[] = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
];

export class Deck {
  cards: Card[];
  disardPile: Card[];
  constructor() {
    this.cards = freshDeck();
    this.disardPile = [];
  }

  get numberOfCards() {
    return this.cards.length;
  }

  //precache all of the images for the deck. doesn't work in every browser
  preloadImages() {
    let precacheImages: string[] = [];
    SUITS.forEach((suit) => {
      FACE_VALUES.forEach((value) => {
        const img = (new Image().src = `images/${value}${suit}.svg`);
        precacheImages.push(img);
      });
    });
    return precacheImages;
  }

  // rather than use Array.sort(), which is predictable even when using Math.random(),
  // we will create our own random sorting algorithm
  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      // starting at the top of the deck, look for any card less than the current index.
      const newIndex = Math.floor(Math.random() * (i + 1));
      // save what that card value was:
      const oldValue = this.cards[newIndex];
      // then swap the values:
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }

  dealThreeCards() {
    // Guard against dealing more cards than are in the deck
    if (this.cards.length < 4) {
      return null;
    }
    // burn a card
    this.disardPile.push(this.cards.shift()!);

    // send three cards to the table and remove them from the deck
    let tableCards = this.cards.splice(0, 3);

    return tableCards;
  }

  dealTwoCards() {
    // Guard against dealing more cards than are in the deck
    if (this.cards.length < 3) {
      return null;
    }

    // burn a card
    this.disardPile.push(this.cards.shift()!);

    // deal two cards, face up
    let playerCards = this.cards.splice(0, 2);
    return playerCards;
  }

  dealOneCard() {
    // Guard against dealing more cards than are in the deck
    if (this.cards.length < 2) {
      return null;
    }

    // burn a card
    this.disardPile.push(this.cards.shift()!);

    return this.cards.shift();
  }
}

function freshDeck() {
  return SUITS.flatMap((suit: Suit) => {
    return FACE_VALUES.map((value: FaceValue) => {
      return new Card(suit, value);
    });
  });
}
