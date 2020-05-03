const form = document.querySelector("#contactForm");
form.addEventListener("submit", validateForm);
const success = document.querySelector(".container.content");
let successMessage = document.createElement("h2");
success.appendChild(successMessage);
const aboveForm = document.querySelector("h1");
aboveForm.after(successMessage);

function validateForm(event) {
    event.preventDefault();
    
    let areFieldsValid = isFieldValid("#name", 1);
    areFieldsValid = (isFieldValid("#answer", 10) && areFieldsValid);
    areFieldsValid = (isFieldValid("#address", 15) && areFieldsValid);

    const checkEmailLength = isFieldValid("#email", 1);
    if (checkEmailLength === true){
        const emailField = document.querySelector("#email");
        const emailValue = emailField.value; 
        areFieldsValid = (validateEmail(emailValue) && areFieldsValid);
    } else 
        areFieldsValid = false;

    if (areFieldsValid === true){
        successMessage.innerHTML = "Form submitted successfully!";
    } else successMessage.innerHTML = "";
}

function checkInputLength(textValue, minLength){

    if (textValue.length < minLength){
        return false;
    } else 
        return true;
}

function isFieldValid(id, minLength){
    const field = document.querySelector(id);
    const fieldError = document.querySelector(id + "Error");
    const fieldValue = field.value;

    const isValid = checkInputLength(fieldValue, minLength);

    if (isValid === true) {
        fieldError.style.display = "none";
        return true;
    } 
    else {
        fieldError.style.display = "block";
        return false;
    }
}

function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    const emailError = document.querySelector("#emailError");
    const invalidEmailError = document.querySelector("#invalidEmailError");

    invalidEmailError.style.display = "none";
    emailError.style.display = "none";

    if (patternMatches === false) {
        invalidEmailError.style.display = "block";
        return false;
    } else 
        return true;
}

