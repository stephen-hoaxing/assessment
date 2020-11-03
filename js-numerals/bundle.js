(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const ERROR = "Error";
const NYI_ERROR = "This feature is not yet implemented. Please raise a ticket.";

const NUMTABLE = {
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
  1000: "one thousand",
  2000: "two thousand",
  3000: "three thousand",
  4000: "four thousand",
  5000: "five thousand",
  6000: "six thousand",
  7000: "seven thousand",
  8000: "eight thousand",
  9000: "nine thousand",
  10000: "ten thousand",
  20000: "twenty thousand",
  30000: "thirty thousand",
  40000: "forty thousand",
  50000: "fifty thousand",
  60000: "sixty thousand",
  70000: "seventy thousand",
  80000: "eighty thousand",
  90000: "ninety thousand",
};

module.exports = { ERROR, NYI_ERROR, NUMTABLE };

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
    input.classList.add("error-input");
  } else {
    error.classList.remove("active");
    input.classList.remove("error-input");
    renderResult(res);
  }
  input.value = "";
  inputText = "";
});

const renderResult = (res) => {
  result.innerHTML = "";
  const resP = document.createElement("p");
  resP.classList.add("result-p");
  resP.textContent = res;
  result.appendChild(resP);
};

},{"./constants":1,"./utils":3}],3:[function(require,module,exports){
const constants = require("./constants");

const convertNumberToWords = (num) => {
  if (num === "" || Number.isNaN(parseInt(num)) || num.indexOf(".") !== -1) {
    return constants.ERROR;
  }

  const number = parseInt(num);
  const length = num.length;

  if (number === 0) {
    return "zero";
  }

  switch (length) {
    case 1:
      return constants.NUMTABLE[number];
    case 2:
      return convertTens(number);
    case 3:
      return convertHundreds(number);
    case 4:
      return convertThousands(number);
    case 5:
      return convertTenThousands(number);
    default:
      return constants.NYI_ERROR;
  }
};

const getDecimals = (num, decimals) => {
  return Math.floor(num / decimals) * decimals;
};

const getRemainder = (num, decimals) => {
  return num % decimals;
};

const getFirstTwoDigits = (num, decimals) => {
  return Math.floor(num / decimals);
};

const convertTenThousands = (num) => {
  if (num % 10000 === 0) {
    return `${constants.NUMTABLE[num]}`;
  }
  const tenThousands = getDecimals(num, 10000);
  const thousands = getRemainder(num, 10000);
  if (thousands < 10) {
    return `${constants.NUMTABLE[tenThousands]} and ${constants.NUMTABLE[thousands]}`.trim();
  }
  const firstTwo = getFirstTwoDigits(num, 1000);
  const hundreds = getRemainder(num, 1000);
  return `${convertTens(firstTwo)} thousand ${convertThousands(
    hundreds
  )}`.trim();
};

const convertThousands = (num) => {
  const thousands = getDecimals(num, 1000);
  const hundreds = getRemainder(num, 1000);
  if (hundreds === 0) {
    return `${constants.NUMTABLE[thousands]}`;
  } else if (hundreds < 10) {
    return `${constants.NUMTABLE[thousands]} and ${convertTens(
      hundreds
    )}`.trim();
  } else if (hundreds < 100 && hundreds > 10) {
    return `${constants.NUMTABLE[thousands]} ${convertHundreds(
      hundreds
    )}`.trim();
  } else {
    const firstTwo = getFirstTwoDigits(num, 100);
    const lastTwo = getRemainder(num, 100);
    if (lastTwo === 0) {
      return `${convertTens(firstTwo)} hundred`.trim();
    }
    return `${convertTens(firstTwo)} hundred and ${convertTens(
      lastTwo
    )}`.trim();
  }
};

const convertHundreds = (num) => {
  const hundreds = getDecimals(num, 100);
  const tens = getRemainder(num, 100);
  if (tens > 0 && tens < 10) {
    return `${constants.NUMTABLE[hundreds]} and ${convertTens(tens)}`.trim();
  }
  return `${constants.NUMTABLE[hundreds]} ${convertTens(tens)}`.trim();
};

const convertTens = (num) => {
  if (num <= 20) {
    return constants.NUMTABLE[num];
  } else {
    const tens = getDecimals(num, 10);
    const ones = getRemainder(num, 10);
    return ones === 0
      ? `${constants.NUMTABLE[tens]}`
      : `${constants.NUMTABLE[tens]}-${constants.NUMTABLE[ones]}`.trim();
  }
};

module.exports = convertNumberToWords;

},{"./constants":1}]},{},[2]);
