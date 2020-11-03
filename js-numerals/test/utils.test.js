const expect = require("chai").expect;
const convertNumberToWords = require("../utils");
const constants = require("../constants");
const { Builder, By, until } = require("selenium-webdriver");
const driver = new Builder().forBrowser("chrome").build();

describe("Utils", () => {
  describe("Errors", () => {
    it("Should return ERROR when the input is empty", () => {
      const res = convertNumberToWords("");
      expect(res).to.equal(constants.ERROR);
    });

    it("Should return ERROR when the input is not an integer", () => {
      const res = convertNumberToWords("3.14");
      expect(res).to.equal(constants.ERROR);
    });

    it("Should return NYI_ERROR when the given number is above 5 digits", () => {
      const res = convertNumberToWords("100000");
      expect(res).to.equal(constants.NYI_ERROR);
    });
  });

  describe("1-digit numbers", () => {
    it("Should return the word for a 1-digit number", () => {
      const res = convertNumberToWords("2");
      expect(res).to.equal("two");
    });

    it("Should return zero for 0", () => {
      const res = convertNumberToWords("0");
      expect(res).to.equal("zero");
    });
  });

  describe("2-digit numbers", () => {
    it("Should return the formatted word for a two-digit number", () => {
      const res = convertNumberToWords("12");
      expect(res).to.equal("twelve");
    });

    it("Should return the word for a 2-digit number which is divisible by 10", () => {
      const res = convertNumberToWords("30");
      expect(res).to.equal("thirty");
    });

    it("Should return eleven for 11", () => {
      const res = convertNumberToWords("11");
      expect(res).to.equal("eleven");
    });
  });

  describe("3-digit numbers", () => {
    it("Should return the formatted word for a 3-digit number, without tens", () => {
      const res = convertNumberToWords("203");
      expect(res).to.equal("two hundred and three");
    });

    it("Should return the formatted word for a 3-digit number with tens", () => {
      const res = convertNumberToWords("943");
      expect(res).to.equal("nine hundred forty-three");
    });

    it("Should return the formatted word for a 3-digit number without tens and ones", () => {
      const res = convertNumberToWords("1200");
      expect(res).to.equal("twelve hundred");
    });
  });

  describe("4-digit numbers", () => {
    it("Should return the formatted word for a 4-digit number without hundreds, tens and ones", () => {
      const res = convertNumberToWords("1000");
      expect(res).to.equal("one thousand");
    });

    it("Should return the formatted word for a 4-digit number without hundreds and tens - lower limit", () => {
      const res = convertNumberToWords("1001");
      expect(res).to.equal("one thousand and one");
    });

    it("Should return the formatted word for a 4-digit number without hundreds and tens - upper limit", () => {
      const res = convertNumberToWords("9009");
      expect(res).to.equal("nine thousand and nine");
    });

    it("Should return the formatted word for a 4-digit number without hundreds but tens and ones", () => {
      const res = convertNumberToWords("1017");
      expect(res).to.equal("one thousand seventeen");
    });

    it("Should return the formatted word for a 4-digit number with hundreds, tens and ones", () => {
      const res = convertNumberToWords("1999");
      expect(res).to.equal("nineteen hundred and ninety-nine");
    });

    it("Should return the formatted word for a 4-digit number with hundreds, tens and ones", () => {
      const res = convertNumberToWords("1845");
      expect(res).to.equal("eighteen hundred and forty-five");
    });

    it("Should return the formatted word for a 4-digit number with hundreds, tens and ones", () => {
      const res = convertNumberToWords("3489");
      expect(res).to.equal("thirty-four hundred and eighty-nine");
    });
  });

  describe("5-digit numbers", () => {
    it("Should return the formatted word for a 5-digit number without thousands, hundreds, tens and ones", () => {
      const res = convertNumberToWords("30000");
      expect(res).to.equal("thirty thousand");
    });

    it("Should return the formatted word for a 5-digit number with ones - lower limit", () => {
      const res = convertNumberToWords("30001");
      expect(res).to.equal("thirty thousand and one");
    });

    it("Should return the formatted word for a 5-digit number with ones - upper limit", () => {
      const res = convertNumberToWords("30009");
      expect(res).to.equal("thirty thousand and nine");
    });

    it("Should return the formatted word for a 5-digit number without thousands, hundreds, but tens and ones", () => {
      const res = convertNumberToWords("30012");
      expect(res).to.equal("thirty thousand twelve");
    });

    it("Should return the formatted word for a 5-digit number without thousands, but hundreds, tens and ones", () => {
      const res = convertNumberToWords("30547");
      expect(res).to.equal("thirty thousand five hundred and forty-seven");
    });

    it("Should return the formatted word for a 5-digit number with thousands, hundreds, tens and ones", () => {
      const res = convertNumberToWords("17999");
      expect(res).to.equal("seventeen thousand nine hundred and ninety-nine");
    });
  });

  describe("End-To-End Test", () => {
    before(async () => {
      (await driver).get("http://127.0.0.1:5501/index.html");
      (await driver).sleep(10000);
      (await driver).findElement(By.className("form-input")).sendKeys("1964");
      const cta = (await driver).findElement(By.className("form-btn"));
      (await cta).click();
      driver.wait(until.elementLocated(By.className("result-p")));
    });

    it("Should enter a valid number, click on the CTA and display the result", async () => {
      const res = await driver.findElement(By.className("result-p"));
      const text = await res.getText();
      expect(text).to.equal("nineteen hundred and sixty-four");
    });
  });
});
