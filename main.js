class Game {
  constructor(){
    this.curMin = 1;
    this.curMax = 100;
    this.startTime = 0;
    this.endTime= 1;
    this.timeElapsed=0;
    this.currentCorrectNumber = 0;
    this.gameNumber=0;
    this.challenger1='';
    this.challenger2='';
    this.winner='';
  }
  timeElapse(){
    this.timeElapsed = this.endTime-this.startTime;
  }
  newRandomNumber(min,max){
    this.currentCorrectNumber = Math.floor(Math.random() * (max - min + 1)) + min;
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
//
const inputs = document.querySelectorAll(".input-challenger");
//Button DOM variables
const resetButton = document.querySelector("#reset-button");
const submitButton = document.querySelector("#submit-button");
const updateButton = document.querySelector(".update-button");
var currentCorrectNumber = 101;
var maxElement = document.querySelector("#max-range-num");
const maxInput = document.querySelector("#max-input-range");
var minElement = document.querySelector("#min-range-num");
const minInput = document.querySelector("#min-input-range");
var currentGame = new Game;
var pastGames =[];

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
  challenger1.innerHTML = challenger1NameValue.value;
  challenger2.innerHTML = challenger2NameValue.value;
  challenger1Guess.innerHTML = challenger1GuessValue.value;
  challenger2Guess.innerHTML = challenger2GuessValue.value;
  var challengerGuesses = [challenger1GuessValue, challenger2GuessValue];
  checkGuess(challengerGuesses);
  clearForm(challengerGuesses);
  checkFormInputs();
}

//Check Guess checks the challengers guesses and iterates through the array. Then the
function checkGuess(challengerGuesses) {
  for(var i=0; i<challengerGuesses.length; i++){
    var challengerValue = parseInt(challengerGuesses[i].value);
    if(challengerValue<currentGame.currentCorrectNumber){
      guessHelpText[i].innerHTML = "that's too low";
    }else if (challengerValue > currentGame.currentCorrectNumber) {
      guessHelpText[i].innerHTML = "that's too high";
    } else {
      guessHelpText[i].innerHTML = "BOOM!";
    }
  }
}

// checkFormInputs() is called whenever a input field is changed.
// This enables and disables the submitButton and clearFormButton variables
function checkFormInputs() {
  checkClearFormButtonInputs();
  checkButtonInputs(inputs,submitButton);
  checkButtonInputs([minInput,maxInput],updateButton);
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

//Clears the inputs from the form
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
