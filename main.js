//Challenger Form Disable buttons
const inputs = document.querySelectorAll(".input-challenger");
const submitButton = document.querySelector("#submit-button");
const resetButton = document.querySelector("#reset-button");
const clearFormButton = document.querySelector("#clear-form-button");

// checkComplete() is called whenever a input field is changed.
// This enables and disables the submitButton and clearFormButton variables
function checkComplete() {
  //Starts as true. Checks
  var canSubmit = true;
  var canClear = false;
  //Loop through inputs[] check to see if anything is blank.
  //When canClear is false button appears
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value.length == 0) {
      canSubmit = false;
    }else if (canClear == false) {
      canClear = true;
    }
    submitButton.disabled = !canSubmit;
    clearFormButton.disabled = !canClear;
  }
}
//Clears the inputs from the form
function clearForm() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

//Event Listeners
//array.forEach(function(input){input.addEventListener("focusout",checkComplete)}
inputs.forEach((input) => addEventListener("input", checkComplete));
clearFormButton.addEventListener("click", clearForm);


window.onload = checkComplete();
