//Challenger Form Disable buttons
const inputs = document.querySelectorAll(".input-challenger");
const submitButton = document.querySelector("#submit-button");
const resetButton = document.querySelector("#reset-button");
const clearFormButton = document.querySelector("#clear-form-button");

function checkComplete() {
  var canSubmit = true;
  var canClear = false;
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value.length == 0) {
      canSubmit = false;
    }
    if(inputs[i].value.length!=0 && canClear==false){
      canClear=true;
    }
  }
  submitButton.disabled = !canSubmit;
  clearFormButton.disabled = !canClear;
}
function clearForm(){
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value="";
  }
}
//array.forEach(function(input){input.addEventListener("focusout",checkComplete)}
inputs.forEach((input) => addEventListener("input", checkComplete));
clearFormButton.addEventListener("click",clearForm);
window.onload = checkComplete();
