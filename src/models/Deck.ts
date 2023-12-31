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
  private cards: Card[];
  private discardPile: Card[];
  constructor() {
    this.cards = freshDeck();
    this.discardPile = [];
    this.shuffle();
  }

  get deckSize() {
    return this.cards.length;
  }

  // rather than use Array.sort(), which is predictable even when using Math.random(),
  // we will create our own random sorting algorithm
  shuffle() {
    for (let i = this.deckSize - 1; i > 0; i--) {
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
    if (this.deckSize < 1) {
      return false;
    }

    // Burn a card
    this.discardPile.push(this.cards.pop()!);
    return true;
  }

  dealOneCard() {
    // Guard against dealing more cards than are in the deck
    if (this.deckSize < 1) {
      return null;
    }

    // Return one card, removing it from the deck
    return this.cards.pop();
  }

  dealTwoCards() {
    // Guard against dealing more cards than are in the deck
    if (this.deckSize < 2) {
      return null;
    }

    // Return two cards, removing them from the deck
    return this.cards.splice(-2);
  }

  dealThreeCards() {
    // Guard against dealing more cards than are in the deck
    if (this.deckSize < 3) {
      return null;
    }

    // Return three cards, removing them from the deck
    return this.cards.splice(-3);
  }

  dealManyCards(numberOfCards: number) {
    // Guard against dealing more cards than are in the deck
    if (this.deckSize < numberOfCards) {
      return null;
    }

    // Return numberOfCards cards, removing them from the deck
    return this.cards.splice(-numberOfCards);
  }
  createNewDeck() {
    const newCards = freshDeck();
    this.cards.length = 0;
    this.cards.push(...newCards);
    this.shuffle();
  }
}

function freshDeck() {
  return SUITS.flatMap((suit: Suit) => {
    return FACE_VALUES.map((value: FaceValue) => {
      return new Card(suit, value);
    });
  });
}
