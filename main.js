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
const challenger1Guess = document.querySelector(".challenger-1-guess")
const challenger2Guess = document.querySelector(".challenger-2-guess")

// checkFormInputs() is called whenever a input field is changed.
// This enables and disables the submitButton and clearFormButton variables
function checkFormInputs() {
  checkSubmitButtonInputs();
  clearFormButtonEnable();
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

function clearFormButtonEnable(){
  var canClear = false;
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value.length != 0 && canClear==false) {
      canClear = true;
    }
  }
  clearFormButton.disabled = !canClear;
}
//Clears the inputs from the form
function clearForm() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
  clearFormButton.disabled = true;
}

function submitGuess() {

  // reference the dom elements with the names
  // get the value from them
  // assign the value to the corresponding dom name element
  // reference the dom elements with the guesses
  // get the value from them
  // assign the value to the corresponding dom guess element

}

//Event Listeners
// for(var i=0;i<inputs.legth; i++){
//   input[i].addEventListener("input",checkFormInputs);
// }
//array.forEach(function(input){input.addEventListener("focusout",checkFormInputs)}
inputs.forEach((input) => addEventListener("input", checkFormInputs));
clearFormButton.addEventListener("click", clearForm);

submitButton.addEventListener("click", submitGuess);

// debugger;
window.onload = checkFormInputs();
// module.exports = Card;
