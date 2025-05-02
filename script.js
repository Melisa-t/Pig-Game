const game = {
  isPlayersTurn: false,
  isFinished: false,
  winner: null,

  getCurrentPlayer: function () {
    return !this.isPlayersTurn ? this.playerOne : this.playerTwo;
  },

  createDice: function (score) {
    const dice = document.querySelector(`.dice`);
    if (dice.hasChildNodes()) {
      const childrenLen = dice.children.length;
      while (dice.firstChild) {
        dice.removeChild(dice.firstChild);
      }
      for (let i = 0; i < score; i++) {
        const diceDiv = document.createElement("div");
        dice.appendChild(diceDiv);
      }
    } else {
      for (let i = 0; i < score; i++) {
        const diceDiv = document.createElement("div");
        dice.appendChild(diceDiv);
      }
    }
  },

  changeTurnStyle: function () {
    const currentPlayer = this.getCurrentPlayer();
    if (currentPlayer === this.playerOne) {
      playerOneContainer.style.opacity = `100%`;
      playerOneContainer.style.transition = `1s`;
      playerTwoContainer.style.opacity = `50%`;
      playerTwoContainer.style.transition = `1s`;
    } else {
      playerTwoContainer.style.opacity = `100%`;
      playerTwoContainer.style.transition = `1s`;
      playerOneContainer.style.opacity = `50%`;
      playerOneContainer.style.transition = `1s`;
    }
  },
  resetStyle: function () {
    playerOneContainer.style.opacity = `100`;
    playerOneContainer.style.transition = `1s`;
    playerTwoContainer.style.opacity = `100`;
    playerTwoContainer.style.transition = `1s`;
  },

  roll: function () {
    const currentPlayer = this.getCurrentPlayer();
    const currentScore = Math.trunc(Math.random() * 6 + 1);
    game.createDice(currentScore);

    if (currentScore === 1) {
      currentPlayer.score = 0;
      this.changeTextContent();
      this.isPlayersTurn = !this.isPlayersTurn;
    } else {
      currentPlayer.score += currentScore;
      this.changeTextContent();
    }
  },

  hold: function () {
    const currentPlayer = this.getCurrentPlayer();
    currentPlayer.totalScore += currentPlayer.score;
    this.changeTextContent();
    this.playerOne.score = 0;
    this.playerTwo.score = 0;
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
    this.resetStyle();
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

    if (currentPlayer.totalScore + currentPlayer.score >= 100) {
      currentPlayer.totalScore += currentPlayer.score;
      this.changeTextContent();
      this.winner = currentPlayer;
      midContainer.style.display = `none`;
      showModal(currentPlayer.name);
    }
  },

  playerOne: {
    totalScore: 0,
    score: 0,
    name: `First Player`,
  },

  playerTwo: {
    totalScore: 0,
    score: 0,
    name: `Second Player`,
  },
};

const rollDice = document.querySelector(`.roll-dice-btn`);
let p1TotalScore = document.querySelector(`.p1-total-score`);
let p2TotalScore = document.querySelector(`.p2-total-score`);
let p1Score = document.querySelector(`.p1-current-score`);
let p2Score = document.querySelector(`.p2-current-score`);
const playerOneContainer = document.querySelector(`.player1`);
const playerTwoContainer = document.querySelector(`.player2`);

rollDice.addEventListener(`click`, () => {
  game.changeTurnStyle();
  game.roll();
  game.winCheck();
});

const holdBtn = document.querySelector(`.hold-btn`);

holdBtn.addEventListener(`click`, () => {
  game.changeTurnStyle();
  game.hold();
  game.winCheck();
});

const resetBtn = document.querySelector(`.new-game-btn`);

resetBtn.addEventListener(`click`, () => {
  game.reset();
  closeModal();
});

const modal = document.getElementById("myModal");
const closeBtn = document.getElementsByClassName("close")[0];

const showModal = function (player) {
  modal.style.display = "block";
  const modalP = document.querySelector(`.modal-content p`);
  const modalText = document.createTextNode(`${player} won!`);
  modalP.appendChild(modalText);
};

const closeModal = function () {
  closeBtn.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
};
