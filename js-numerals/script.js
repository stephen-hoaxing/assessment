import { ERROR_MESSAGE } from "./constants.js";

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

  const num = parseInt(inputText);

  if (Number.isNaN(num)) {
    error.classList.add("active");
  } else {
    error.classList.remove("active");
    console.log(num);
  }

  input.value = "";
});
