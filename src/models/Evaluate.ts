import { Card } from "./Card.js";

const SPADES = "S";
const CLUBS = "C";
const DIAMONDS = "D";
const HEARTS = "H";

type HandStats = {
  seqCountMax: number;
  maxCardValue: number;
  seqMaxValue: number;
};

class HandData {
  stats: HandStats;
  duplicates: { duplicateCount: number; cardValue: number }[];
  sortedSuits: Card[][];
  sortedCards: Card[];
  constructor(
    stats: HandStats,
    duplicates: { duplicateCount: number; cardValue: number }[],
    sortedSuits: Card[][],
    sortedCards: Card[]
  ) {
    this.stats = stats;
    this.duplicates = duplicates;
    this.sortedSuits = sortedSuits;
    this.sortedCards = sortedCards;
  }
}

type Results = {
  handName: string;
  score: number;
  hand: Card[];
};

export function checkPlayerHand(playerCards: Card[], tableCards: Card[]) {
  let results: Results | null = null;

  const handData = analyzeHand(playerCards, tableCards);

  results = checkRoyalFlush(handData);
  if (results != null) {
    return results;
  }

  results = checkStraightFlush(handData);
  if (results != null) {
    return results;
  }

  results = checkFourOfAKind(handData);
  if (results != null) {
    return results;
  }

  results = checkFullHouse(handData);
  if (results != null) {
    return results;
  }

  results = checkFlush(handData);
  if (results != null) {
    return results;
  }

  results = checkStraight(handData);
  if (results != null) {
    return results;
  }

  results = checkThreeOfAKind(handData);
  if (results != null) {
    return results;
  }

  results = checkTwoPair(handData);
  if (results != null) {
    return results;
  }

  results = checkPair(handData);
  if (results != null) {
    return results;
  }

  // No valid hands, so we play High Card
  const handName = "High Card";
  const score = evaluateRankByHighestCards(handData.sortedCards);
  const hand = handData.sortedCards.slice(-5);
  return { handName, score, hand };
}

// Many hands leave room for extra cards to be included in the mix. Such as having a Pair:
// Both players could have the same pair, and so the tiebreaker is decided by whoever has the highest card.
// This function determines how much a player's had is worth based on the value of the highest cards.

function evaluateRankByHighestCards(
  arrayOfCards: Card[],
  excludedCard1 = -1, // If this card value is found, it is skipped over in the loop.
  excludedCard2 = -1, // If this card value is found, it is skipped over in the loop.
  limitCheck = 5 // Determines the number of cards to include in the final sum.
) {
  let sum = 0;
  let passes = 0;
  for (let i = arrayOfCards.length - 1; i >= 0; i--) {
    const cardValue = arrayOfCards[i].numericValue;
    if (cardValue == excludedCard1 || cardValue == excludedCard2) {
      continue;
    }

    sum += cardValue;
    passes++;

    if (passes >= limitCheck) {
      break;
    }
  }

  return sum;
}

// Before we get into determining if a handName is worth anything, we should identify cards that match by face value.
// We also grab some other metrics within this function.
export function analyzeHand(playerCards: Card[], tableCards: Card[]) {
  let duplicateCount = 1;
  let seqCount = 1;
  let seqCountMax = 1;
  let maxCardValue = -1;
  let seqMaxValue = -1;
  let cardValue = -1;
  let nextCardValue = -1;
  const duplicates = [];
  const sortedSuits = [];
  const sortedCards = playerCards.concat(tableCards).sort((a, b) => {
    return a.numericValue - b.numericValue;
  });

  //grab the highest value represented
  maxCardValue = sortedCards[sortedCards.length - 1].numericValue;
  for (let i = 0; i < sortedCards.length - 1; i++) {
    cardValue = sortedCards[i].numericValue;
    nextCardValue = sortedCards[i + 1].numericValue;

    //check for duplicates
    if (cardValue == nextCardValue) {
      duplicateCount++;
    } else if (duplicateCount > 1) {
      duplicates.push({ duplicateCount, cardValue });
      duplicateCount = 1;
    }

    if (cardValue + 1 == nextCardValue) {
      seqCount++;
    } else if (cardValue != nextCardValue) {
      if (seqCount > seqCountMax) {
        seqCountMax = seqCount;
        seqMaxValue = cardValue;
      }
      seqCount = 1;
    }
  }
  if (seqCount > seqCountMax) {
    seqCountMax = seqCount;
    seqMaxValue = nextCardValue;
  }

  // If we find any matching cards, we want to save how many and what the card value is.
  if (duplicateCount > 1) {
    cardValue = nextCardValue;
    duplicates.push({ duplicateCount, cardValue });
  }

  // Finally, to make the matches easier to work with, we will move the highest number of matches to the front of the array
  duplicates.sort((a, b) => {
    return b.duplicateCount === a.duplicateCount
      ? b.cardValue - a.cardValue
      : b.duplicateCount - a.duplicateCount;
  });

  sortedSuits.push(sortedCards.filter((card) => card.suit === SPADES));
  sortedSuits.push(sortedCards.filter((card) => card.suit === CLUBS));
  sortedSuits.push(sortedCards.filter((card) => card.suit === DIAMONDS));
  sortedSuits.push(sortedCards.filter((card) => card.suit === HEARTS));

  return new HandData(
    { seqCountMax, maxCardValue, seqMaxValue },
    duplicates,
    sortedSuits,
    sortedCards
  );
}

export function checkRoyalFlush(handData: HandData) {
  for (const suit of handData.sortedSuits) {
    if (royalFlushHelper(suit)) {
      return {
        handName: "Royal Flush",
        score: 900,
        hand: suit.slice(-5),
      };
    }
  }
  return null;
}

//make this similar to the straight flush helper
export function royalFlushHelper(suitedCards: Card[]) {
  if (suitedCards.length < 5) return false;
  if (
    suitedCards[suitedCards.length - 1].numericValue == 14 &&
    suitedCards[suitedCards.length - 2].numericValue == 13 &&
    suitedCards[suitedCards.length - 3].numericValue == 12 &&
    suitedCards[suitedCards.length - 4].numericValue == 11 &&
    suitedCards[suitedCards.length - 5].numericValue == 10
  ) {
    return true;
  }
}

export function checkStraightFlush(handData: HandData) {
  for (const suit of handData.sortedSuits) {
    if (suit.length < 5) continue;
    const results = straightFlushHelper(suit);
    if (results != null) {
      return {
        handName: "Straight Flush",
        score: 800 + (results.highestValue / 14) * 99,
        hand: results.hand,
      };
    }
  }
  return null;
}

export function straightFlushHelper(suitedCards: Card[]) {
  let counter = 1;
  let counterMax = 1;
  let highestValue = -1;

  if (suitedCards.length < 5) {
    return null;
  }

  for (let i = 0; i < suitedCards.length - 1; i++) {
    if (suitedCards[i].numericValue + 1 === suitedCards[i + 1].numericValue) {
      counter++;
      if (counter > counterMax) {
        counterMax = counter;
        highestValue = suitedCards[i + 1].numericValue;
      }
    } else {
      counter = 1;
    }
  }
  if (counterMax > 4) {
    const hand = suitedCards.filter((card) => {
      if (card.numericValue === highestValue) return true;
      if (card.numericValue === highestValue - 1) return true;
      if (card.numericValue === highestValue - 2) return true;
      if (card.numericValue === highestValue - 3) return true;
      if (card.numericValue === highestValue - 4) return true;
    });
    return { highestValue, hand };
  }
  // Edge Case: the Ace can be used as the starting OR final card in a straight flush:
  // Meaning that A,2,3,4,5 is a Straight and so is T,J,Q,K,A
  // We just need to check if the Ace is the last card in our suitedCards and that our counterMax made it to 4 before stopping at a card with a numeric value of 5
  else if (
    counterMax === 4 &&
    highestValue === 5 &&
    suitedCards[suitedCards.length - 1].numericValue === 14
  ) {
    const hand = suitedCards
      .slice(0, 4)
      .concat(suitedCards[suitedCards.length - 1]);
    return { highestValue, hand };
  }
  return null;
}

export function checkFourOfAKind(handData: HandData) {
  if (
    handData.duplicates.length > 0 &&
    handData.duplicates[0].duplicateCount === 4
  ) {
    const handName = "Four of a Kind";
    const score =
      700 +
      handData.duplicates[0].cardValue * 7 * 0.95 + // weighted at 95%
      evaluateRankByHighestCards(
        handData.sortedCards,
        handData.duplicates[0].cardValue, // leave out the cards included in the Four of a Kind
        -1,
        1 // We only want the single highest card other than the Four of a Kind to be included.
      ) *
        0.05; // weighted at 5%

    const highCard = handData.sortedCards
      .filter((card) => {
        if (card.numericValue != handData.duplicates[0].cardValue) return true;
      })
      .slice(-1);
    const hand = handData.sortedCards
      .filter((card) => {
        if (card.numericValue === handData.duplicates[0].cardValue) return true;
      })
      .concat(highCard);
    return { handName, score, hand };
  }
  return null;
}

export function checkFullHouse(handData: HandData) {
  if (
    handData.duplicates.length > 1 &&
    handData.duplicates[0].duplicateCount === 3 &&
    handData.duplicates[1].duplicateCount >= 2
  ) {
    const handName = "Full House";

    const score =
      600 +
      handData.duplicates[0].cardValue * 7 * 0.95 + // weighted at 95%
      handData.duplicates[1].cardValue * 7 * 0.05; // weighted at 5%

    const tempTriple = handData.sortedCards.filter((card) => {
      if (card.numericValue === handData.duplicates[0].cardValue) {
        return true;
      }
    });

    const tempPair = handData.sortedCards.filter((card) => {
      if (card.numericValue === handData.duplicates[1].cardValue) {
        return true;
      }
    });

    const hand = tempTriple.concat(tempPair.slice(-2));

    return { handName, score, hand };
  }
  return null;
}

export function checkFlush(handData: HandData) {
  for (const suit of handData.sortedSuits) {
    if (suit.length > 4) {
      const handName = "Flush";
      const score = 500 + evaluateRankByHighestCards(suit);
      const hand = suit.slice(-5);
      return { handName, score, hand };
    }
  }
  return null;
}

export function checkStraight(handData: HandData) {
  if (handData.stats.seqCountMax >= 5) {
    const handName = "Straight";
    const score = 400 + (handData.stats.seqMaxValue / 14) * 99;
    const hand = handData.sortedCards.filter((card) => {
      if (card.numericValue === handData.stats.seqMaxValue) return true;
      if (card.numericValue === handData.stats.seqMaxValue - 1) return true;
      if (card.numericValue === handData.stats.seqMaxValue - 2) return true;
      if (card.numericValue === handData.stats.seqMaxValue - 3) return true;
      if (card.numericValue === handData.stats.seqMaxValue - 4) return true;
    });
    return { handName, score, hand };
  }
  // Edge case: if the straight is A,2,3,4,5 we need to recognize that using seqCountMax == 4, seqMaxValue == 5, and at least one Ace in the handName.
  if (
    handData.stats.seqCountMax === 4 &&
    handData.stats.seqMaxValue === 5 &&
    handData.stats.maxCardValue === 14
  ) {
    const handName = "Straight";
    const score = 400 + (5 / 14) * 99;
    const hand = handData.sortedCards.filter((card) => {
      if (card.numericValue === 14) return true;
      if (card.numericValue === handData.stats.seqMaxValue) return true;
      if (card.numericValue === handData.stats.seqMaxValue - 1) return true;
      if (card.numericValue === handData.stats.seqMaxValue - 2) return true;
      if (card.numericValue === handData.stats.seqMaxValue - 3) return true;
    });
    return { handName, score, hand };
  }
  return null;
}

export function checkThreeOfAKind(handData: HandData) {
  if (
    handData.duplicates.length === 1 &&
    handData.duplicates[0].duplicateCount === 3
  ) {
    const handName = "Three of a Kind";
    const score =
      300 +
      handData.duplicates[0].cardValue * 7 * 0.95 + // weighted at 95%
      evaluateRankByHighestCards(
        handData.sortedCards,
        handData.duplicates[0].cardValue, // exclude the Three's value
        -1,
        2 // We only want to two highest cards other than the triple
      ) *
        0.05; // weighted at 5%

    const tempTriple = handData.sortedCards.filter((card) => {
      if (card.numericValue === handData.duplicates[0].cardValue) {
        return true;
      }
    });
    const tempTwo = handData.sortedCards.filter((card) => {
      if (card.numericValue != handData.duplicates[0].cardValue) {
        return true;
      }
    });

    const hand = tempTriple.concat(tempTwo.slice(-2));

    return { handName, score, hand };
  }
  return null;
}

export function checkTwoPair(handData: HandData) {
  if (handData.duplicates.length > 1) {
    const handName = "Two Pair";
    const score =
      200 +
      handData.duplicates[0].cardValue * 7 * 0.85 + // weighted at 85%
      handData.duplicates[1].cardValue * 7 * 0.1 + // weighted at 10%
      evaluateRankByHighestCards(
        handData.sortedCards,
        handData.duplicates[0].cardValue, // exclude first pair
        handData.duplicates[1].cardValue, // exclude second pair
        1 // only get the next highest card
      ) *
        0.05; // weighted at 5%

    const tempPairs = handData.sortedCards.filter((card) => {
      if (
        card.numericValue === handData.duplicates[0].cardValue ||
        card.numericValue === handData.duplicates[1].cardValue
      ) {
        return true;
      }
    });

    const hand = tempPairs.concat(
      handData.sortedCards
        .filter((card) => {
          if (
            card.numericValue != handData.duplicates[0].cardValue &&
            card.numericValue != handData.duplicates[1].cardValue
          ) {
            return true;
          }
        })
        .slice(-1)
    );

    return { handName, score, hand };
  }
  return null;
}

export function checkPair(handData: HandData) {
  if (handData.duplicates.length > 0) {
    const handName = "Pair";
    const score =
      100 +
      handData.duplicates[0].cardValue * 7 * 0.95 + // weighted at 95%
      evaluateRankByHighestCards(
        handData.sortedCards,
        handData.duplicates[0].cardValue,
        -1,
        3
      ) *
        0.05; // weighted at 5%

    const temp = handData.sortedCards.filter((card) => {
      if (card.numericValue === handData.duplicates[0].cardValue) {
        return true;
      }
    });

    const temp2 = handData.sortedCards.filter((card) => {
      if (card.numericValue != handData.duplicates[0].cardValue) {
        return true;
      }
    });

    const hand = temp.concat(temp2.slice(-3));

    return { handName, score, hand };
  }
  return null;
}
