const NUMERIC_VALUE_MAP = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

export type Suit = "S" | "C" | "D" | "H";
export type FaceValue = keyof typeof NUMERIC_VALUE_MAP;

export class Card {
  suit: Suit;
  faceValue: FaceValue;
  numericValue: number;

  constructor(suit: Suit, faceValue: FaceValue) {
    this.suit = suit;
    this.faceValue = faceValue;
    this.numericValue = NUMERIC_VALUE_MAP[faceValue];
  }
}
