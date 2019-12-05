//Challenger Form Disable buttons
const inputs = document.querySelectorAll(".input-challenger");
const submitButton = document.querySelector("#submit-button");
const resetButton = document.querySelector("#reset-button");
const clearFormButton = document.querySelector("#clear-form-button");

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

//Event Listeners
// for(var i=0;i<inputs.legth; i++){
//   input[i].addEventListener("input",checkFormInputs);
// }
//array.forEach(function(input){input.addEventListener("focusout",checkFormInputs)}
inputs.forEach((input) => addEventListener("input", checkFormInputs));
clearFormButton.addEventListener("click", clearForm);

// debugger;
window.onload = checkFormInputs();
// module.exports = Card;
