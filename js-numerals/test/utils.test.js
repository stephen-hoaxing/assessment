const expect = require("chai").expect;
const convertNumberToWords = require("../utils");
const constants = require("../constants");

describe("Utils", () => {
  it("Should give Error when the input is empty", () => {
    const res = convertNumberToWords("");
    expect(res).to.equal(constants.ERROR);
  });

  it("Should return the word for a single-digit number", () => {
    const res = convertNumberToWords("2");
    expect(res).to.equal("two");
  });

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

  it("Should return the formatted word for a 3-digit number, without tens", () => {
    const res = convertNumberToWords("203");
    expect(res).to.equal("two hundred and three");
  });

  it("should return the formatted word for a 3-digit number with tens", () => {
    const res = convertNumberToWords("943");
    expect(res).to.equal("nine hundred forty-three");
  });
});
