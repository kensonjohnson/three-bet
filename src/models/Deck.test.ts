import { Deck } from "./Deck.js";

describe("Deck Model", () => {
  const deck = new Deck();

  describe("constructor", () => {
    it("should create a deck of cards", () => {
      expect(deck.deckSize).toEqual(52);
    });

    it("should create a discard pile", () => {
      expect(deck.discardPileSize).toEqual(0);
    });
  });

  describe("methods", () => {
    describe("burnOneCard", () => {
      it("should burn a card", () => {
        deck.burnOneCard();
        expect(deck.deckSize).toEqual(51);
        expect(deck.discardPileSize).toEqual(1);
      });

      it("should return false if there are no cards to burn", () => {
        const deck = new Deck();
        deck.dealManyCards(deck.deckSize);
        expect(deck.burnOneCard()).toEqual(false);
      });
    });

    describe("dealOneCard", () => {
      it("should deal a card", () => {
        const card = deck.dealOneCard();
        expect(deck.deckSize).toEqual(50);
        expect(deck.discardPileSize).toEqual(1);
        expect(card).toBeDefined();
      });

      it("should return null if there are no cards to deal", () => {
        const deck = new Deck();
        deck.dealManyCards(deck.deckSize);
        expect(deck.dealOneCard()).toEqual(null);
      });
    });

    describe("dealTwoCards", () => {
      it("should deal two cards", () => {
        const cards = deck.dealTwoCards();
        expect(deck.deckSize).toEqual(48);
        expect(deck.discardPileSize).toEqual(1);
        expect(cards).toBeDefined();
        expect(cards!.length).toEqual(2);
      });

      it("should return null if there are no cards to deal", () => {
        const deck = new Deck();
        deck.dealManyCards(deck.deckSize);
        expect(deck.dealTwoCards()).toEqual(null);
      });
    });

    describe("dealThreeCards", () => {
      it("should deal three cards", () => {
        const cards = deck.dealThreeCards();
        expect(deck.deckSize).toEqual(45);
        expect(deck.discardPileSize).toEqual(1);
        expect(cards).toBeDefined();
        expect(cards!.length).toEqual(3);
      });

      it("should return null if there are no cards to deal", () => {
        const deck = new Deck();
        deck.dealManyCards(deck.deckSize);
        expect(deck.dealThreeCards()).toEqual(null);
      });
    });

    describe("dealManyCards", () => {
      it("should deal many cards", () => {
        const cards = deck.dealManyCards(7);
        expect(deck.deckSize).toEqual(38);
        expect(deck.discardPileSize).toEqual(1);
        expect(cards).toBeDefined();
        expect(cards!.length).toEqual(7);
      });

      it("should return null if there are no cards to deal", () => {
        const deck = new Deck();
        deck.dealManyCards(deck.deckSize);
        expect(deck.dealManyCards(7)).toEqual(null);
      });
    });
  });
});
