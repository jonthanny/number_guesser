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
var maxDisplay = document.querySelector("#max-display");
var maxNumField = document.querySelector("#max-input-range");
var minDisplay = document.querySelector("#min-display");
var minNumField = document.querySelector("#min-input-range");
var inputContainer = document.querySelector(".input-container");
// || Buttons  //
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
  //Creates a new Random Number
  newRandomNumber(min, max) {
    this.currentCorrectNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  }
  //Increases the current game number by one.
  increaseCurrentGame() {
    this.currentGameNumber = this.currentGameNumber + 1;
  }
  //Increases the guess counter by two.
  increaseGuessCounter() {
    this.guessCount = this.guessCount + 2;
  }
  //On a gameWon call this will modify the current game instance min and max.
  increaseGuessRange(){
    this.curMin = this.curMin - 10;
    this.curMax = this.curMax + 10;
  }
  //Unlike a reset restart keeps the previous min and max values. Future
  //development will need to be used for a hardReset. Zeroing out the game element.
  restart() {
    this.hasBeenWon = false;
    this.guessCount = 0;
    this.hasStarted = false;
    this.newRandomNumber(this.curMin,this.curMax);
  }
}

//Now that the CLASS is defined we start a new instance.
var currentGame = new Game;

// || GAME FUNCTIONS || //
//grabs the minimum and maximum values of the DOM input values
//Updates min and max Game object instance properties.
function updateMinMax() {
  currentGame.curMin = parseInt(minNumField.value);
  currentGame.curMax = parseInt(maxNumField.value);
  updateMinMaxDisplay();
  currentGame.newRandomNumber(currentGame.curMin, currentGame.curMax);
}

//This function updates the visual DOM element with the current Min and Max values in the Game object instance.
function updateMinMaxDisplay() {
  minDisplay.innerHTML = currentGame.curMin;
  maxDisplay.innerHTML = currentGame.curMax;
}

//Updates the game object instance with the current input guess
function updateGuess() {
  currentGame.challenger1GuessValue = parseInt(challenger1GuessField.value);
  currentGame.challenger2GuessValue = parseInt(challenger2GuessField.value);
}

//Updates the DOM tree with the currentGuessValue.
function updateGuessDisplay() {
  challenger1GuessDisplay.innerHTML = currentGame.challenger1GuessValue;
  challenger2GuessDisplay.innerHTML = currentGame.challenger2GuessValue;
}

//Updates the game object instance with the current input challengerNames
function updateChallengerNames() {
  currentGame.challenger1Name = challenger1NameField.value;
  currentGame.challenger2Name = challenger2NameField.value;
}

//Updates the DOM tree with the current Challenger Name.
function updateChallengerNamesDisplay() {
  challenger1NameDisplay.innerHTML = currentGame.challenger1Name;
  challenger2NameDisplay.innerHTML = currentGame.challenger2Name;
}

//This function runs everything that needs to run when the submitButton is clicked.
//NOTE we log the startTime of the game at this point. This can result in a zero second game
function submitHelper() {
  updateGuess();
  updateGuessDisplay();
  updateChallengerNames()
  updateChallengerNamesDisplay();
  currentGame.increaseGuessCounter();
  currentGame.logStartTime();
  checkGuess([currentGame.challenger1GuessValue, currentGame.challenger2GuessValue]);
  currentGame.hasBeenWon == true ? gameWon(): '';
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

//This is another function that is a collection. It includes all of the functions
// that need to be called when a game is won.
function gameWon() {
  currentGame.logEndTime();
  addCard();
  currentGame.increaseCurrentGame();
  currentGame.increaseGuessRange();
  currentGame.restart();
  updateMinMaxDisplay();
  checkFormInputs();
}

//addCard modifies the DOM by appending a card element to the parent DIV.
//We can refactor this to simplify the eventlistener and instead attach it to the parent
// section. As of right now, the eventlistener button is given a matching gameNumber.
//Refactor this.
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

// This function removes the targeted element from the DOM
function closeCard(gameNumber) {
  //get card from eventlistener onclick and use that number to find the associated Card ID
  var el = document.getElementById(`gameNumber${gameNumber}`);
  el.remove();
}

// || UTILITY FUNCTIONS || //
// ClearForm takes any nodeList and will clear the input fields.
function clearForm(clearInputs) {
  for (var i = 0; i < clearInputs.length; i++) {
    clearInputs[i].value = "";
  }
  clearFormButton.disabled = true;
  enableSubmitButton(challengerInputFields);
}

// || VALIDATION FUNCTIONS || //
// checkFormInputs() is called whenever a input field is changed.
// This enables and disables the submitButton and clearFormButton variables
function checkFormInputs() {
  enableUpdateButton([minNumField, maxNumField]);
  checkValidMinMaxInput([minNumField, maxNumField]);
  enableClearButton();
  enableSubmitButton(challengerInputFields);
  checkValidGuessInput();
}

//Checks the associated button form to make sure the input has something in it
function enableSubmitButton(inputsToCheck) {
  var canSubmit = true;
  for (var i = 0; i < inputsToCheck.length; i++) {
    if (inputsToCheck[i].value.length == 0) {
      canSubmit = false;
    }
  }
  submitButton.disabled = !canSubmit;
}

//Checks the update button fields to enable the update button.
function enableUpdateButton(minMaxInputs) {
  var canSubmit = true;
  for (var i = 0; i < minMaxInputs.length; i++) {
    if (minMaxInputs[i].value.length == 0) {
      canSubmit = false;
    }
    if (isNaN(minMaxInputs[i].value) == true) {
      canSubmit = false;
    }
    updateButton.disabled = !canSubmit;
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

//More stringent function to check that the input fields on updateButton are met after
function checkValidMinMaxInput(inputsToCheck) {
  var minInputValue = parseInt(inputsToCheck[0].value)
  var maxInputValue = parseInt(inputsToCheck[1].value)
  if (maxInputValue <= minInputValue && maxNumField.value.length > 0) {
    updateButton.disabled = true;
    minMaxError.classList.add("error-box-show");
    maxNumField.classList.add("error-border");
  } else {
    minMaxError.classList.remove("error-box-show");
    maxNumField.classList.remove("error-border");
  }
}

//Checks to make sure each guess is in range before allowing submission
function checkValidGuessInput() {
  var challenger1Guess = parseInt(challenger1GuessField.value);
  var challenger2Guess = parseInt(challenger2GuessField.value);
  var challengerGuessFields = [challenger1GuessField, challenger2GuessField]
  var challengerGuesses = [challenger1Guess, challenger2Guess]
  var guessError = document.querySelectorAll(".guess-error-box");
  for (i = 0; i < 2; i++) {
    if ((challengerGuesses[i] < currentGame.curMin  || challengerGuesses[i] > currentGame.curMax) && challengerGuessFields[i].value.length > 0) {
      guessError[i].classList.add("error-box-show");
      challengerGuessFields[i].classList.add("error-border");
      submitButton.disabled = true;
    } else {
      challengerGuessFields[i].classList.remove("error-border");
      guessError[i].classList.remove("error-box-show");
    };
  }
}

// || EVENT LISTENERS || //
inputContainer.addEventListener("input", checkFormInputs);
challengerInputFields.forEach((input) => addEventListener("input", checkFormInputs));
clearFormButton.addEventListener("click", function() {
  clearForm(challengerInputFields);
});
submitButton.addEventListener("click",  submitHelper);
updateButton.addEventListener("click", updateMinMax);

// || ON WINDOW LOAD || //
window.onload = function() {
  currentGame.newRandomNumber(currentGame.curMin,currentGame.curMax);
}
