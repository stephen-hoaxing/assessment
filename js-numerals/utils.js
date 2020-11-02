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
    case 3:
      return convertHundreds(number);
    case 4:
      return convertThousands(number);
    case 5:
      return convertTenThousands(number);
    default:
      return "This feature is not yet implemented. Please raise a ticket.";
  }
};

const convertTenThousands = (num) => {
  if (num % 10000 === 0) {
    return `${numTable[num]}`;
  }
  const tenThousands = Math.floor(num / 10000) * 10000;
  const thousands = num % 10000;
  if (thousands < 10) {
    return `${numTable[tenThousands]} and ${numTable[thousands]}`.trim();
  }
  const firstTwo = Math.floor(num / 1000);
  const hundreds = num % 1000;
  return `${convertTens(firstTwo)} thousand ${convertThousands(
    hundreds
  )}`.trim();
};

const convertThousands = (num) => {
  const thousands = Math.floor(num / 1000) * 1000;
  const hundreds = num % 1000;
  if (hundreds === 0) {
    return `${numTable[thousands]}`;
  } else if (hundreds < 10) {
    return `${numTable[thousands]} and ${convertTens(hundreds)}`.trim();
  } else if (hundreds < 100 && hundreds > 10) {
    return `${numTable[thousands]} ${convertHundreds(hundreds)}`.trim();
  } else {
    const firstTwo = Math.floor(num / 100);
    const lastTwo = num % 100;
    if (lastTwo === 0) {
      return `${convertTens(firstTwo)} hundred`.trim();
    }
    return `${convertTens(firstTwo)} hundred and ${convertTens(
      lastTwo
    )}`.trim();
  }
};

const convertHundreds = (num) => {
  const hundreds = Math.floor(num / 100) * 100;
  const tens = num % 100;
  if (tens > 0 && tens < 10) {
    return `${numTable[hundreds]} and ${convertTens(tens)}`.trim();
  }
  return `${numTable[hundreds]} ${convertTens(tens)}`.trim();
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

module.exports = convertNumberToWords;
