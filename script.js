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
      this.isPlayersTurn = !this.isPlayersTurn;
      console.log("Score reset", this.isPlayersTurn);
    } else {
      currentPlayer.score += currentScore;
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
    console.log(
      `hold`,
      currentPlayer.totalScore,
      currentPlayer.score,
      this.isPlayersTurn
    );
    this.isPlayersTurn = !this.isPlayersTurn;
  },

  reset: function () {
    const midContainer = document.querySelector(`.mid-container`)
    this.playerOne.totalScore = 0;
    this.playerTwo.totalScore = 0;
    this.playerOne.score = 0;
    this.playerTwo.score = 0;
    this.isPlayersTurn = false;
    midContainer.style.display = `flex`
  },

  winCheck: function () {
    const midContainer = document.querySelector(`.mid-container`)
    const currentPlayer = this.getCurrentPlayer();
    const currentTotalScore = currentPlayer.totalScore + currentPlayer.score;
    if (currentTotalScore >= 12) {
      this.winner = currentPlayer;
      !currentPlayer ? `player1` : `player2`;
      console.log(`${!currentPlayer ? `player1` : `player2`}`);
      midContainer.style.display = `none`
      resetBtn.style.display=`flex`
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
