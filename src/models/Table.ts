import { v4 as uuidv4 } from "uuid";
import { Player } from "./Player.js";
import { Deck } from "./Deck.js";
import { Card } from "./Card.js";
// import { checkPlayerHand } from "./Evaluate.js";

export class Table {
  readonly id: string;
  private players: Player[];
  private deck: Deck;
  private tableCards: Card[];
  constructor() {
    this.id = uuidv4();
    this.players = [];
    this.deck = new Deck();
    this.tableCards = [];
  }

  addPlayer(player: Player) {
    this.players.push(player);
  }

  removePlayer(player: Player) {
    this.players = this.players.filter((p) => p.id !== player.id);
  }

  get playersList() {
    const playerDatas = this.players.map((player) => {
      return player.info;
    });
    return playerDatas;
  }

  dealPlayerHands() {
    this.players.forEach((player) => {
      const newCards = this.deck.dealTwoCards();
      if (newCards) {
        player.addCards(newCards);
      }
    });
  }

  turnTheFlop() {
    this.deck.burnOneCard();
    const newCards = this.deck.dealThreeCards();
    if (newCards) {
      this.tableCards.push(...newCards);
    }
  }

  turnTheTurn() {
    this.deck.burnOneCard();
    const newCard = this.deck.dealOneCard();
    if (newCard) {
      this.tableCards.push(newCard);
    }
  }

  turnTheRiver() {
    this.deck.burnOneCard();
    const newCard = this.deck.dealOneCard();
    if (newCard) {
      this.tableCards.push(newCard);
    }
  }

  resetTable() {
    this.tableCards.length = 0;
    this.deck.createNewDeck();
    this.players.forEach((player) => {
      player.discardHand();
    });
  }
}
