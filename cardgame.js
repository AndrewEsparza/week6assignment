const chai = require('chai');
const assert = chai.assert;

class Card {
  constructor(suit, face) {
    this.suit = suit;
    this.face = face;
  }
}

class Deck {
  constructor() {
    // Create a standard deck of 52 cards
    this.cards = [];
    const suits = ['♠', '♥', '♣', '♦'];
    const faces = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    for (const suit of suits) {
      for (const face of faces) {
        this.cards.push(new Card(suit, face));
      }
    }
  }

  shuffle() {
    // shuffle logic to randomize the cards in the deck
    // we are shuffling deck randomly.
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  draw() {
    // Remove and return the top card from the deck
    return this.cards.pop();
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.hand = [];
    this.score = 0;
  }

  playCard() {
    // Remove and return the top card from the player's hand
    return this.hand.shift();
  }

  addPoints(points) {
    // Add points to the player's score
    this.score += points;
  }
}

class Game {
  constructor(player1Name, player2Name) {
    this.player1 = new Player(player1Name);
    this.player2 = new Player(player2Name);
    this.deck = new Deck();
  }

  dealCards() {
    this.deck.shuffle();
    while (this.deck.cards.length > 0) {
      this.player1.hand.push(this.deck.draw());
      this.player2.hand.push(this.deck.draw());
    }
  }

  playRound() {
    const card1 = this.player1.playCard();
    const card2 = this.player2.playCard();

    if (card1.face > card2.face) {
      this.player1.addPoints(1);
    } else {
      this.player2.addPoints(1);
    }
  }

  playGame() {
    while (this.player1.hand.length > 0 && this.player2.hand.length > 0) {
      this.playRound();
    }
  }

  displayScore() {
    console.log(`Final Score: ${this.player1.name}: ${this.player1.score}, ${this.player2.name}: ${this.player2.score}`);
    if (this.player1.score === this.player2.score) {
      console.log("It's a tie!");
    } else if (this.player1.score > this.player2.score) {
      console.log(`${this.player1.name} wins!`);
    } else {
      console.log(`${this.player2.name} wins!`);
    }
  }
}

// Unit test using Mocha and Chai for the Deck class's draw() method
describe('Deck', () => {
  describe('#draw', () => {
    it('should return a card and remove it from the deck', () => {
      // Arrange
      const deck = new Deck();

      // Act
      const card1 = deck.draw();
      const card2 = deck.draw();

      // Assert
      assert.equal(deck.cards.length, 50);
      assert.notEqual(card1, undefined);
      assert.notEqual(card2, undefined);
    });

    it('should return undefined if the deck is empty', () => {
      // Arrange
      const deck = new Deck();

      // Act
      while (deck.cards.length > 0) {
        deck.draw();
      }

      const card = deck.draw();

      // Assert
      assert.equal(card, undefined);
    });
  });
});

// Execute the game
const game = new Game('Player 1', 'Player 2');
game.dealCards();
game.playGame();
game.displayScore();
