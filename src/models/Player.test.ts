import { Player } from "./Player.js";
import { Card } from "./Card.js";

describe("Player Model", () => {
  describe("constructor", () => {
    it("should create a player with a unique id", () => {
      const player = new Player();
      expect(player.id).toBeDefined();
    });

    it("should create a player with no chips", () => {
      const player = new Player();
      expect(player.chipCount).toEqual(0);
    });

    it("should create a player with specified number of chips", () => {
      const player = new Player(100);
      expect(player.chipCount).toEqual(100);

      const player2 = new Player(205.5);
      expect(player2.chipCount).toEqual(205);
    });

    it("should create a player with no cards", () => {
      const player = new Player();
      expect(player.showHand().length).toEqual(0);
    });

    it("should create a player with specified cards", () => {
      const cards = [new Card("S", "A"), new Card("D", "9")];
      const player = new Player(0, cards);
      expect(player.showHand().length).toEqual(2);
    });

    it("should create a player with specified cards and chips", () => {
      const cards = [new Card("C", "T"), new Card("H", "7")];
      const player = new Player(100, cards);
      expect(player.showHand().length).toEqual(2);
      expect(player.chipCount).toEqual(100);
    });
  });

  describe("methods", () => {
    describe("addChips", () => {
      it("should add chips to the player", () => {
        const player = new Player();
        player.addChips(100);
        expect(player.chipCount).toEqual(100);
      });

      it("should add chips to the player if the amount is a float", () => {
        const player = new Player();
        player.addChips(100.5);
        expect(player.chipCount).toEqual(100);
      });

      it("should not add chips to the player if the amount is not a number", () => {
        const player = new Player();
        player.addChips("100" as any);
        expect(player.chipCount).toEqual(0);
      });
    });

    describe("removeChips", () => {
      it("should remove chips from the player", () => {
        const player = new Player(100);
        player.removeChips(50);
        expect(player.chipCount).toEqual(50);
      });

      it("should remove chips from the player if the amount is a float", () => {
        const player = new Player(100);
        player.removeChips(50.5);
        expect(player.chipCount).toEqual(50);
      });

      it("should not remove chips from the player if the amount is not a number", () => {
        const player = new Player(100);
        player.removeChips("50" as any);
        expect(player.chipCount).toEqual(100);
      });
    });

    describe("addCards", () => {
      it("should add cards to the player", () => {
        const player = new Player();
        player.addCards([new Card("S", "A"), new Card("D", "9")]);
        expect(player.showHand().length).toEqual(2);
      });

      it("should not add cards to the player if no cards are provided", () => {
        const player = new Player();
        player.addCards([]);
        expect(player.showHand().length).toEqual(0);
      });
    });

    describe("discardHand", () => {
      it("should discard the player's hand", () => {
        const player = new Player(100, [
          new Card("S", "A"),
          new Card("D", "9"),
        ]);
        player.discardHand();
        expect(player.showHand().length).toEqual(0);
      });
    });
  });
});
