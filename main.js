class Game {
  constructor(){
    this.challenger1 = '';
    this.challenger2 = '';
    this.curMax = 100;
    this.curMin = 1;
    this.startTime = null;
    this.endTime = null;
    this.timeElapsedMinutes = 0;
    this.timeElapsedSeconds = 0;
    this.currentCorrectNumber = 0;
    this.endTime = 1;
    this.gameIndex = 0;
    this.guessCount = 0;
    this.hasBeenWon=false;
    this.startTime = 0;
    this.timeElapsed = 0;
    this.winner = '';
  }
  logStartTime(){
    //update this with a new Date()
    this.startTime = new Date();
  }
  logEndTime(){
    //update this with a new Date()
    this.endTime = new Date();
    this.timeElapse();
  }
  timeElapse(){
    //Dates will have a ms since a date so we will get ms. Divide by 1000 and we get seconds.
    var timeElapsed = this.endTime-this.startTime;
    timeElapsed /= 1000;
    this.timeElapsedMinutes= Math.floor(timeElapsed/60);
    this.timeElapsedSeconds= timeElapsed - (this.timeElapsedMinutes *60);
  }
  newRandomNumber(min,max){
    this.currentCorrectNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  increaseCurrentGame(){
    this.currentGameNumber= this.currentGameNumber + 1;
  }
}
//Challenger Varibales Could be combined to a class
const challenger1 = document.querySelector(".challenger-1");
const challenger1Guess = document.querySelector(".challenger-1-guess");
const challenger1GuessValue = document.querySelector("#challenger-1-guess");
const challenger1NameValue = document.querySelector("#challenger-1-name");
const challenger2 = document.querySelector(".challenger-2");
const challenger2Guess = document.querySelector(".challenger-2-guess");
const challenger2GuessValue = document.querySelector("#challenger-2-guess");
const challenger2NameValue = document.querySelector("#challenger-2-name");
const guessHelpText = document.querySelectorAll(".guess-help-text");
const clearFormButton = document.querySelector("#clear-form-button");
const inputs = document.querySelectorAll(".input-challenger");
var minMaxError = document.querySelector(".error-box");
//Button DOM variables
const resetButton = document.querySelector("#reset-button");
const submitButton = document.querySelector("#submit-button");
const updateButton = document.querySelector(".update-button");
var maxElement = document.querySelector("#max-range-num");
const maxInput = document.querySelector("#max-input-range");
var minElement = document.querySelector("#min-range-num");
const minInput = document.querySelector("#min-input-range");
var currentGame = new Game;

//grabs the minimum and maximum values of the DOM input values
//Updates min and max visually
//Passes minValue and maxValue as arguments to resetGame
function updateMinMax(){
  currentGame.curMin = parseInt(minInput.value);
  currentGame.curMax = parseInt(maxInput.value);
  minElement.innerHTML = currentGame.curMin;
  maxElement.innerHTML =currentGame.curMax;
  currentGame.newRandomNumber(currentGame.curMin,currentGame.curMax);
}
//Depreciated in Refactor of Game to Class
// function resetGame(min,max) {
//   correctGuess = Math.floor(Math.random() * (max - min + 1)) + min;
// }

function submitGuess() {
  increaseGuessCounter();
  challenger1.innerHTML = challenger1NameValue.value;
  challenger2.innerHTML = challenger2NameValue.value;
  currentGame.challenger1 = challenger1NameValue.value;
  currentGame.challenger2 = challenger2NameValue.value;
  challenger1Guess.innerHTML = challenger1GuessValue.value;
  challenger2Guess.innerHTML = challenger2GuessValue.value;
  var challengerGuesses = [challenger1GuessValue, challenger2GuessValue];
  checkGuess(challengerGuesses);
  if(currentGame.hasBeenWon==true){
    gameWon();
  }
  clearForm(challengerGuesses);
  checkFormInputs();
  currentGame.logStartTime();
}

function increaseGuessCounter() {
  currentGame.guessCount = currentGame.guessCount + 2;
}

//Check Guess checks the challengers guesses and iterates through the array. Then the
function checkGuess(challengerGuesses) {
  for (var i = 0; i < challengerGuesses.length; i++) {
    var challengerValue = parseInt(challengerGuesses[i].value);
    if (challengerValue < currentGame.currentCorrectNumber) {
      guessHelpText[i].innerHTML = "that's too low";
    } else if (challengerValue > currentGame.currentCorrectNumber) {
      guessHelpText[i].innerHTML = "that's too high";
    } else if(challengerValue == currentGame.currentCorrectNumber){
      currentGame.hasBeenWon = true;
      guessHelpText[i].innerHTML = "BOOM!";
      if (i == 0) {
        currentGame.winner = challenger1NameValue.value;
      } else if(i==1){
        currentGame.winner = challenger2NameValue.value;
      }
    }
  }
}

//What happens when the game is won?
//+update currentGame
//+create card
//+Initialize new game populate challengers from last game RND 2
function gameWon(){
  addCard();
  currentGame.logEndTime();
  currentGame.newRandomNumber(1,100);
}

function addCard(){
  var el = document.createElement('div');
  var domString =`<div class="previous-game-card" id="gameNumber${currentGame.currentGameNumber}">
    <div class="verses-container">
      <p class="challenger challenger-1">${currentGame.challenger1}</p><span class="vs">vs </span>
      <p class="challenger challenger-2">${currentGame.challenger2}</p>
    </div>
     <div class="winner-display">
       <h1><span class="bold">${currentGame.winner}</span></h1>
       <h1>WINNER</h1>
     </div>
     <div class="stats-block">
       <p><span class="bold">47</span> GUESSES</p>
       <p><span class="bold">1</span> MINUTE <span class="bold">23</span> SECONDS</p>
       <button class="close-card-button" id="gameNumberButton${currentGame.currentGameNumber}">
         <div class="cross"></div>
         <div class="cross vertical"></div>
       </button>
     </div>
   </div>`;
  el.innerHTML = domString;

  document.getElementById('placeholder').appendChild(el.firstChild);
  var gameNumber = currentGame.currentGameNumber;
  var closeButton = document.getElementById(`gameNumberButton${gameNumber}`);
  closeButton.addEventListener('click',function(){
    closeCard(gameNumber);
  });
}

function closeCard(gameNumber){
  //get card from eventlistener onclick and use that number to find the associated Card ID
  var el =document.getElementById(`gameNumber${gameNumber}`);
  el.remove();


}
// checkFormInputs() is called whenever a input field is changed.
// This enables and disables the submitButton and clearFormButton variables
function checkFormInputs() {
  checkClearFormButtonInputs();
  checkButtonInputs(inputs,submitButton);
  checkMinMaxInputs([minInput,maxInput],updateButton);
  //Add form Validation for numbers
}

//Checks the associated button form to make sure the input has something in it
function checkButtonInputs(inputsToCheck,button){
  var canSubmit = true;
  for (var i = 0; i < inputsToCheck.length; i++) {
    if (inputsToCheck[i].value.length == 0) {
      canSubmit = false;
    }
  }
  button.disabled = !canSubmit;
}

function checkMinMaxInputs(inputsToCheck,button){
  var canSubmit = true;
  for (var i = 0; i < inputsToCheck.length; i++) {
    if (inputsToCheck[i].value.length == 0) {
      canSubmit = false;
    }
    if (inputsToCheck[1].value < inputsToCheck[0].value && inputsToCheck[1].value.length > 0) {
      canSubmit = false;
      minMaxError.classList.add("error-box-show");
    } else {
      minMaxError.classList.remove("error-box-show")
    }
    if (isNaN(inputsToCheck[i].value) == true) {
      canSubmit = false;
    }
  }
  button.disabled = !canSubmit;
}

//Checks the associated button form to make sure the input has something in it
function checkClearFormButtonInputs(){
  var canClear = false;
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value.length != 0 && canClear==false) {
      canClear = true;
    }
  }
  clearFormButton.disabled = !canClear;
}

function clearForm(clearInputs) {
  for (var i = 0; i < clearInputs.length; i++) {
    clearInputs[i].value = "";
  }
  clearFormButton.disabled = true;
}

//Event Listeners
// for(var i=0;i<inputs.legth; i++){
//   input[i].addEventListener("input",checkFormInputs);
// }
//array.forEach(function(input){input.addEventListener("focusout",checkFormInputs)}
inputs.forEach((input) => addEventListener("input", checkFormInputs));
clearFormButton.addEventListener("click", function() {
  clearForm(inputs);
});
submitButton.addEventListener("click", submitGuess);
updateButton.addEventListener("click", updateMinMax);
// debugger;
window.onload = function() {
  currentGame.newRandomNumber(currentGame.curMin,currentGame.curMax)
  checkFormInputs();
}
