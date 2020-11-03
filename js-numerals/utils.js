const constants = require("./constants");

const convertNumberToWords = (num) => {
  if (num === "" || Number.isNaN(parseInt(num)) || num.length === 0) {
    return constants.ERROR;
  }

  const number = parseInt(num);
  const length = num.length;

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
