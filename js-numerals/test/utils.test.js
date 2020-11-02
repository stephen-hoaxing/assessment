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
});
