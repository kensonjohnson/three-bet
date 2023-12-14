import { v4 as uuidv4 } from "uuid";
import { Card } from "./Card.js";

export class Player {
  readonly id: string;
  private chips: number;
  private cards: Card[];

  constructor(chips: number = 0, cards: Card[] = []) {
    this.id = uuidv4();
    this.chips = Math.trunc(chips);
    this.cards = cards;
  }

  addChips(amount: number) {
    if (typeof amount === "number") {
      this.chips += Math.trunc(amount);
    }
  }

  removeChips(amount: number) {
    if (typeof amount === "number") {
      this.chips -= Math.trunc(amount);
    }
  }

  get chipCount() {
    return this.chips;
  }

  addCards(newCards: Card[]) {
    if (newCards) {
      newCards.forEach((card) => {
        this.cards.push(card);
      });
    }
  }

  discardHand() {
    this.cards.length = 0;
  }

  showHand() {
    return this.cards;
  }

  get info() {
    return {
      id: this.id,
      chips: this.chips.toString(),
    };
  }
}
