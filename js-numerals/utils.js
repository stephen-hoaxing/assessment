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
