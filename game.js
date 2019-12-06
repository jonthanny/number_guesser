class Game {
  constructor(){
    this.curMin = 1;
    this.curMax = 100;
    this.startTime = 0;
    this.endTime= 1;
    this.timeElapsed=0;
    this.currentCorrectNumber = 0;
    this.gameIndex=0;
    this.challenger1='';
    this.challenger2='';
    this.winner='';
  }
  timeElapse(){
    this.timeElapsed = this.endTime-this.startTime;
  }
  newRandomNumber(this.min,this.max){
    correctGuess = Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

module.exports = Game;
