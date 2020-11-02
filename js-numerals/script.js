const convertNumberToWords = require("./utils");
const constants = require("./constants");

const input = document.querySelector(".form-input");
const btn = document.querySelector(".form-btn");
const result = document.querySelector(".result-container");
const error = document.querySelector(".form-error");
let inputText;

input.addEventListener("change", (e) => {
  inputText = e.target.value;
});

btn.addEventListener("click", (e) => {
  e.preventDefault();

  const res = convertNumberToWords(inputText);

  if (res === constants.ERROR) {
    error.classList.add("active");
  } else {
    error.classList.remove("active");
  }

  input.value = "";
});
