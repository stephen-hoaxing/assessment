(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const ERROR = "Error";

module.exports = ERROR;

},{}],2:[function(require,module,exports){
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
    result.textContent = convertNumberToWords(inputText);
    console.log(convertNumberToWords(inputText));
  }

  input.value = "";
});

},{"./constants":1,"./utils":3}],3:[function(require,module,exports){
const constants = require("./constants");

const convertNumberToWords = (num) => {
  const number = parseInt(num);
  const length = num.length;

  if ((Number, isNaN(number))) {
    return constants.ERROR;
  }

  switch (length) {
    case 1:
      return numTable[number];
    case 2:
      return convertTens(number);
    default:
      return "Error";
  }
};

const convertTens = (num) => {
  if (num <= 20) {
    return numTable[num];
  } else {
    const tens = Math.floor(num / 10) * 10;
    const ones = num % 10;
    return ones === 0
      ? `${numTable[tens]}`
      : `${numTable[tens]}-${numTable[ones]}`.trim();
  }
};

const numTable = {
  0: "",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen",
  20: "twenty",
  30: "thirty",
  40: "forty",
  50: "fifty",
  60: "sixty",
  70: "seventy",
  80: "eighty",
  90: "ninety",
  100: "one hundred",
  200: "two hundred",
  300: "three hundred",
  400: "four hundred",
  500: "five hundred",
  600: "six hundred",
  700: "seven hundred",
  800: "eight hundred",
  900: "nine hundred",
};

module.exports = convertNumberToWords;

},{"./constants":1}]},{},[2]);
