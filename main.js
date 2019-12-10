// || Variable DOM Field Checks //
var challenger1GuessDisplay = document.querySelector(".challenger-1-guess");
var challenger1GuessField = document.querySelector("#challenger-1-guess");
var challenger1NameDisplay = document.querySelector(".challenger-1");
var challenger1NameField = document.querySelector("#challenger-1-name");
var challenger2GuessDisplay = document.querySelector(".challenger-2-guess");
var challenger2GuessField = document.querySelector("#challenger-2-guess");
var challenger2NameDisplay = document.querySelector(".challenger-2");
var challenger2NameField = document.querySelector("#challenger-2-name");
var guessHelpTextFields = document.querySelectorAll(".guess-help-text");
var challengerInputFields = document.querySelectorAll(".input-challenger");
var minMaxError = document.querySelector(".error-box");
var maxDisplay = document.querySelector("#max-range-num");
var maxNumField = document.querySelector("#max-input-range");
var minDisplay = document.querySelector("#min-range-num");
var minNumField = document.querySelector("#min-input-range");
// || Buttons || //
var clearFormButton = document.querySelector("#clear-form-button");
var resetButton = document.querySelector("#reset-button");
var submitButton = document.querySelector("#submit-button");
var updateButton = document.querySelector(".update-button");

// || GAME CLASS and Initialization of currentGame || //
class Game {
  constructor(){
    this.challenger1GuessValue = null;
    this.challenger1Name = '';
    this.challenger2GuessValue = null;
    this.challenger2Name = '';
    this.curMax = 100;
    this.curMin = 1;
    this.currentCorrectNumber = 0;
    this.currentGameNumber = 0;
    this.endTime = null;
    this.gameIndex = 0;
    this.guessCount = 0;
    this.hasBeenWon = false;
    this.hasStarted = false;
    this.startTime = null;
    this.timeElapsed = 0;
    this.timeElapsedMinutes = 0;
    this.timeElapsedSeconds = 0;
    this.winner = '';
  }
  logStartTime() {
    //update this with a new Date()
    if (this.hasStarted == false) {
      this.startTime = new Date();
      this.hasStarted = true;
    }
  }
  logEndTime() {
    //update this with a new Date()
    this.endTime = new Date();
    this.timeElapse();
  }
  timeElapse() {
    //Dates will have a ms since a date so we will get ms. Divide by 1000 and we get seconds.
    var timeElapsed = this.endTime-this.startTime;
    timeElapsed /= 1000;
    this.timeElapsedMinutes= Math.floor(timeElapsed / 60);
    this.timeElapsedSeconds= Math.trunc(timeElapsed - (this.timeElapsedMinutes * 60));
    if (this.timeElapsedMinutes > 1000){
      this.timeElapsedMinutes = 0;
      this.timeElapsedSeconds = 0;
    }
  }
  newRandomNumber(min, max) {
    this.currentCorrectNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  increaseCurrentGame() {
    this.currentGameNumber = this.currentGameNumber + 1;
  }
  increaseGuessCounter() {
    this.guessCount = this.guessCount + 2;
  }
  reset(curMin, curMax) {
    this.hasBeenWon = false;
    this.guessCount = 0;
    this.hasStarted = false;
    // this.newRandomNumber(curMin, curMax);
  }
  increaseRange(){
    this.curMin = this.curMin - 10;
    this.curMax = this.curMax + 10;
  }
}

var currentGame = new Game;

// || GAME FUNCTIONS || //
//grabs the minimum and maximum values of the DOM input values
//Updates min and max visually
//Passes minValue and maxValue as arguments to resetGame
function updateMinMax() {
  if(minNumField.value != ""){
    currentGame.curMin = parseInt(minNumField.value);
    currentGame.curMax = parseInt(maxNumField.value);
  } else {
    currentGame.curMin = currentGame.curMin - 10;
    currentGame.curMax = currentGame.curMax + 10;

  }
  minDisplay.innerHTML = currentGame.curMin;
  maxDisplay.innerHTML = currentGame.curMax;
  currentGame.newRandomNumber(currentGame.curMin, currentGame.curMax);
}

function updateGuess() {
  currentGame.challenger1GuessValue = parseInt(challenger1GuessField.value);
  currentGame.challenger2GuessValue = parseInt(challenger2GuessField.value);
}

function updateChallengerNames() {
  currentGame.challenger1Name = challenger1NameField.value;
  currentGame.challenger2Name = challenger2NameField.value;
}

// NEED COMMENTS HERE
function submitGuess() {
  challenger1NameDisplay.innerHTML = currentGame.challenger1Name;
  challenger2NameDisplay.innerHTML = currentGame.challenger2Name;
  challenger1GuessDisplay.innerHTML = currentGame.challenger1GuessValue;
  challenger2GuessDisplay.innerHTML = currentGame.challenger2GuessValue;
  currentGame.increaseGuessCounter();
  checkGuess([currentGame.challenger1GuessValue, currentGame.challenger2GuessValue]);
  if(currentGame.hasBeenWon == true) {
    gameWon();
  }
  currentGame.logStartTime();
  checkFormInputs();
  clearForm([challenger1GuessField, challenger2GuessField]);
}

//Check Guess checks the challengers guesses and iterates through the array. Then the
function checkGuess(challengerGuesses) {
  for (var i = 0; i < challengerGuesses.length; i++) {
    var challengerValue = challengerGuesses[i];
    if (challengerValue < currentGame.currentCorrectNumber) {
      guessHelpTextFields[i].innerHTML = "that's too low";
    } else if (challengerValue > currentGame.currentCorrectNumber) {
      guessHelpTextFields[i].innerHTML = "that's too high";
    } else if (challengerValue == currentGame.currentCorrectNumber) {
      currentGame.hasBeenWon = true;
      guessHelpTextFields[i].innerHTML = "BOOM!";
      if (i == 0) {
        currentGame.winner = challenger1NameField.value;
      } else if (i == 1) {
        currentGame.winner = challenger2NameField.value;
      }
    }
  }
}

//What happens when the game is won?
function gameWon() {
  currentGame.logEndTime();
  addCard();
  currentGame.increaseCurrentGame();
  currentGame.reset(currentGame.curMin,currentGame.curMin);
  checkFormInputs();
  // currentGame.increaseRange();
  updateMinMax();
}

// NEED COMMENTS HERE
function addCard() {
  var el = document.createElement('div');
  var domString =`<div class="previous-game-card" id="gameNumber${currentGame.currentGameNumber}">
    <div class="verses-container">
      <p class="challenger challenger-1">${currentGame.challenger1Name}</p><span class="vs">vs </span>
      <p class="challenger challenger-2">${currentGame.challenger2Name}</p>
    </div>
     <div class="winner-display">
       <h1><span class="bold">${currentGame.winner}</span></h1>
       <h1>WINNER</h1>
     </div>
     <div class="stats-block">
       <p><span class="bold">${currentGame.guessCount}</span> GUESSES</p>
       <p><span class="bold">${currentGame.timeElapsedMinutes}</span> MINUTE <span class="bold">${currentGame.timeElapsedSeconds}</span> SECONDS</p>
       <button class="close-card-button" id="gameNumberButton${currentGame.currentGameNumber}">
         <div class="cross"></div>
         <div class="cross vertical"></div>
       </button>
     </div>
   </div>`;
  el.innerHTML = domString;
  var gameNumber = currentGame.currentGameNumber;
  var parent = document.getElementById('placeholder');
  parent.prepend(el.firstChild);
  var closeButton = document.getElementById(`gameNumberButton${gameNumber}`);
  closeButton.addEventListener('click',function() {
    closeCard(gameNumber);
  });
}

// NEED COMMENTS HERE
function closeCard(gameNumber) {
  //get card from eventlistener onclick and use that number to find the associated Card ID
  var el = document.getElementById(`gameNumber${gameNumber}`);
  el.remove();
}

// || UTILITY FUNCTIONS || //
// NEED COMMENTS HERE
function clearForm(clearInputs) {
  for (var i = 0; i < clearInputs.length; i++) {
    clearInputs[i].value = "";
  }
  clearFormButton.disabled = true;
  enableSubmitButton(challengerInputFields, submitButton)
}

// || VALIDATION FUNCTIONS || //
// checkFormInputs() is called whenever a input field is changed.
// This enables and disables the submitButton and clearFormButton variables
function checkFormInputs() {
  enableClearButton();
  enableSubmitButton(challengerInputFields, submitButton);
  checkValidMinMaxInput([minNumField, maxNumField]);
  enableUpdateButton([minNumField, maxNumField], updateButton);
}

//Checks the associated button form to make sure the input has something in it
function enableSubmitButton(inputsToCheck, button) {
  var canSubmit = true;
  for (var i = 0; i < inputsToCheck.length; i++) {
    if (inputsToCheck[i].value.length == 0) {
      canSubmit = false;
    }
  }
  button.disabled = !canSubmit;
}

//
function enableUpdateButton(inputsToCheck, button) {
  var canSubmit = true;
  for (var i = 0; i < inputsToCheck.length; i++) {
    if (inputsToCheck[i].value.length == 0) {
      canSubmit = false;
    }
    if (isNaN(inputsToCheck[i].value) == true) {
      canSubmit = false;
    }
    button.disabled = !canSubmit;
  }
}

//Checks the associated button form to make sure the input has something in it
function enableClearButton() {
  var canClear = false;
  for (var i = 0; i < challengerInputFields.length; i++) {
    if (challengerInputFields[i].value.length != 0 && canClear==false) {
      canClear = true;
    }
  }
  clearFormButton.disabled = !canClear;
}

//
function checkValidMinMaxInput(inputsToCheck) {
  var minInputValue = parseInt(inputsToCheck[0].value)
  var maxInputValue = parseInt(inputsToCheck[1].value)
  if (maxInputValue <= minInputValue && maxInputValue > 0) {
    canSubmit = false;
    minMaxError.classList.add("error-box-show");
    maxNumField.classList.add("error-border");
  } else {
    minMaxError.classList.remove("error-box-show");
    maxNumField.classList.remove("error-border");
  }
}


// || EVENT LISTENERS || //
challengerInputFields.forEach((input) => addEventListener("input", checkFormInputs));
clearFormButton.addEventListener("click", function() {
  clearForm(challengerInputFields);
});
submitButton.addEventListener("click", function() {
  updateGuess();
  updateChallengerNames();
  submitGuess();
});
updateButton.addEventListener("click", updateMinMax);

// || ON WINDOW LOAD || //
window.onload = function() {
  currentGame.newRandomNumber(currentGame.curMin,currentGame.curMax);
  checkFormInputs();
}
