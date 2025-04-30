// 2 players, turn based.

const firstPlayer = {
  totalScore: [],
  currentScore: 0   ,
  isPlayersTurn: true,

getDice: function () {
    this.currentScore = Math.trunc(Math.random() * 6 + 1);
    for (let i = 0; i < this.currentScore; i++) {
        const dice = document.querySelector(`.dice`)
        const diceDiv = document.createElement("div");
        dice.appendChild(diceDiv);
    }
    console.log(this.currentScore)
  }
};

const secondPlayer = {
  totalScore: [],
  currentScore: 0,
  isPlayersTurn: false,
};

firstPlayer.getDice()
