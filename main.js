//Challenger Form Disable buttons
const inputs = document.querySelectorAll(".input-challenger");
const submitButton = document.querySelector("#submit-button");
const resetButton = document.querySelector("#reset-button");
const clearFormButton = document.querySelector("#clear-form-button");
const challenger1NameValue = document.querySelector("#challenger-1-name");
const challenger2NameValue = document.querySelector("#challenger-2-name");
const challenger1GuessValue = document.querySelector("#challenger-1-guess");
const challenger2GuessValue = document.querySelector("#challenger-2-guess");
const challenger1 = document.querySelector(".challenger-1");
const challenger2 = document.querySelector(".challenger-2");
const challenger1Guess = document.querySelector(".challenger-1-guess");
const challenger2Guess = document.querySelector(".challenger-2-guess");
const guessHelpText1 = document.querySelector("#guess-help-text-1");
const guessHelpText2 = document.querySelector("#guess-help-text-2");
const correctGuess = 4;

function submitGuess() {
  challenger1.innerHTML = challenger1NameValue.value;
  challenger2.innerHTML = challenger2NameValue.value;
  challenger1Guess.innerHTML = challenger1GuessValue.value;
  challenger2Guess.innerHTML = challenger2GuessValue.value;
  var clearGuess = [challenger1GuessValue, challenger2GuessValue];
  clearForm(clearGuess);
  checkFormInputs();
}

function checkGuess() {
  if (challenger1NameValue.value; < correctGuess) {

  }
}

// checkFormInputs() is called whenever a input field is changed.
// This enables and disables the submitButton and clearFormButton variables
function checkFormInputs() {
  checkSubmitButtonInputs();
  checkClearFormButtonInputs();
  //Add form Validation for numbers
}

//Function to check inputs to see if they are all filled in. Enables button.
function checkSubmitButtonInputs(){
  var canSubmit = true;
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value.length == 0) {
      canSubmit = false;
    }
  }
  submitButton.disabled = !canSubmit;
}

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
clearFormButton.addEventListener("click", function(){
  clearForm(inputs);
});

submitButton.addEventListener("click", submitGuess);

// debugger;
window.onload = checkFormInputs();
// module.exports = Card;
