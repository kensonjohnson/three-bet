import { Card } from "./Card.js";
import type { FaceValue, Suit } from "./Card.js";

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
  discardPile: Card[];
  constructor() {
    this.cards = freshDeck();
    this.discardPile = [];
  }

  get numberOfCards() {
    return this.cards.length;
  }

  // Precache all of the images for the deck. doesn't work in every browser
  preloadImages() {
    const precacheImages: string[] = [];
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
      // Starting at the top of the deck, look for any card less than the current index.
      const newIndex = Math.floor(Math.random() * (i + 1));
      // Save what that card value was:
      const oldValue = this.cards[newIndex];
      // Then swap the values:
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }

  burnOneCard() {
    // Guard against dealing more cards than are in the deck
    if (this.cards.length < 1) {
      return false;
    }

    // Burn a card
    this.discardPile.push(this.cards.shift()!);
    return true;
  }

  dealOneCard() {
    // Guard against dealing more cards than are in the deck
    if (this.cards.length < 1) {
      return null;
    }

    // Return one card, removing it from the deck
    return this.cards.shift();
  }

  dealTwoCards() {
    // Guard against dealing more cards than are in the deck
    if (this.cards.length < 2) {
      return null;
    }

    // Return two cards, removing them from the deck
    return this.cards.splice(0, 2);
  }

  dealThreeCards() {
    // Guard against dealing more cards than are in the deck
    if (this.cards.length < 3) {
      return null;
    }

    // Return three cards, removing them from the deck
    return this.cards.splice(0, 3);
  }

  dealManyCards(numberOfCards: number) {
    // Guard against dealing more cards than are in the deck
    if (this.cards.length < numberOfCards) {
      return null;
    }

    // Return numberOfCards cards, removing them from the deck
    return this.cards.splice(0, numberOfCards);
  }
}

function freshDeck() {
  return SUITS.flatMap((suit: Suit) => {
    return FACE_VALUES.map((value: FaceValue) => {
      return new Card(suit, value);
    });
  });
}
