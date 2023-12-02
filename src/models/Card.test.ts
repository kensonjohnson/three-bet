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
  });
});
