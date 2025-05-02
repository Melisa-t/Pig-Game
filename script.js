const game = {
  isPlayersTurn: false,
  isFinished: false,
  winner: null,

  getCurrentPlayer: function () {
    return !this.isPlayersTurn ? this.playerOne : this.playerTwo;
  },

  createDice: function (score) {
    const dice = document.querySelector(`.dice`);
    //i need to reset dice every time except the first time
    // when roll is called. if children none dont call the method.
    // reset dice.

    // if (dice.hasChildNodes()) {
    //   console.log(score);
    //   console.log(dice.childNodes);
    //   for (let i = 0; i <= score; i++) {
    //     console.log(
    //       `if statement true. child siliniyor` + dice.children.length
    //     );
    //     console.log();
    //     dice.childNodes[i].remove();
    //   }
    //   for (let i = 0; i < score; i++) {
    //     const diceDiv = document.createElement("div");
    //     dice.appendChild(diceDiv);
    //     console.log(
    //       `if statement true. child yaratiliyor` + dice.children.length
    //     );
    //   }
    // } else {
    //   for (let i = 0; i < score; i++) {
    //     const diceDiv = document.createElement("div");
    //     dice.appendChild(diceDiv);
    //     console.log(
    //       `if statement false. child yaratiliyor` + dice.children.length
    //     );
    //   }
    // }
  },
  roll: function () {
    const currentPlayer = this.getCurrentPlayer();
    const currentScore = Math.trunc(Math.random() * 6 + 1);
    console.log("Before change", currentScore);
    // game.createDice(currentScore);
    if (currentScore === 1) {
      currentPlayer.score = 0;
      this.changeTextContent();
      this.isPlayersTurn = !this.isPlayersTurn;
      console.log("Score reset", this.isPlayersTurn);
    } else {
      currentPlayer.score += currentScore;
      this.changeTextContent();
      console.log(
        "currentPlayer.score",
        this.isPlayersTurn,
        currentPlayer.score
      );
    }
  },

  hold: function () {
    const currentPlayer = this.getCurrentPlayer();
    currentPlayer.totalScore += currentPlayer.score;
    this.changeTextContent();
    this.playerOne.score = 0;
    this.playerTwo.score = 0;
    console.log(
      `hold`,
      currentPlayer.totalScore,
      currentPlayer.score,
      this.isPlayersTurn
    );
    this.isPlayersTurn = !this.isPlayersTurn;
  },

  reset: function () {
    const midContainer = document.querySelector(`.mid-container`);
    this.playerOne.totalScore = 0;
    this.playerTwo.totalScore = 0;
    this.playerOne.score = 0;
    this.playerTwo.score = 0;
    this.changeTextContent();
    this.isPlayersTurn = false;
    midContainer.style.display = `flex`;
  },

  changeTextContent: function () {
    p1TotalScore.textContent = this.playerOne.totalScore;
    p2TotalScore.textContent = this.playerTwo.totalScore;
    p1Score.textContent = this.playerOne.score;
    p2Score.textContent = this.playerTwo.score;
  },

  winCheck: function () {
    const midContainer = document.querySelector(`.mid-container`);
    const currentPlayer = this.getCurrentPlayer();

    if ((currentPlayer.totalScore += currentPlayer.score >= 12)) {
      console.log(currentPlayer.totalScore);
      console.log(`should be ova`);
      currentPlayer.totalScore += currentPlayer.score;
      this.winner = currentPlayer;
      console.log(`${!currentPlayer ? `player1` : `player2`}`);
      midContainer.style.display = `none`;
    }
  },

  playerOne: {
    totalScore: 0,
    score: 0,
  },

  playerTwo: {
    totalScore: 0,
    score: 0,
  },
};

const rollDice = document.querySelector(`.roll-dice-btn`);
let p1TotalScore = document.querySelector(`.p1-total-score`);
let p2TotalScore = document.querySelector(`.p2-total-score`);
let p1Score = document.querySelector(`.p1-current-score`);
let p2Score = document.querySelector(`.p2-current-score`);

rollDice.addEventListener(`click`, () => {
  game.roll();
  game.winCheck();
});

const holdBtn = document.querySelector(`.hold-btn`);

holdBtn.addEventListener(`click`, () => {
  game.hold();
});

const resetBtn = document.querySelector(`.new-game-btn`);

resetBtn.addEventListener(`click`, () => {
  game.reset();
});
