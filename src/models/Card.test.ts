import { Card } from "./Card.js";

describe("Card Model", () => {
  const card1 = new Card("S", "A");
  const card2 = new Card("D", "6");

  describe("constructor", () => {
    it("should set suit", () => {
      expect(card1.suit).toEqual("S");
      expect(card2.suit).toEqual("D");
    });

    it("should set faceValue", () => {
      expect(card1.faceValue).toEqual("A");
      expect(card2.faceValue).toEqual("6");
    });

    it("should set numericValue", () => {
      expect(card1.numericValue).toEqual(14);
      expect(card2.numericValue).toEqual(6);
    });

    it("should set imagePath", () => {
      expect(card1.imagePath).toEqual("images/AS.svg");
      expect(card2.imagePath).toEqual("images/6D.svg");
    });

    it("should set cardBackImagePath", () => {
      expect(card1.cardBackImagePath).toEqual("images/B.svg");
      expect(card2.cardBackImagePath).toEqual("images/B.svg");
    });

    it("should set faceUp", () => {
      expect(card1.faceUp).toEqual(false);
      expect(card2.faceUp).toEqual(false);
    });

    it("should set winningCard", () => {
      expect(card1.winningCard).toEqual(false);
      expect(card2.winningCard).toEqual(false);
    });
  });
});
