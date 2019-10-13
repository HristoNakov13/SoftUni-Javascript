const expect = require("chai").expect;

function isOddOrEven(string) {
    if (typeof(string) !== 'string') {
        return undefined;
    }
    if (string.length % 2 === 0) {
        return "even";
    }

    return "odd";
}

describe("should return result string 'even' or 'odd' depending on the input's string length", function() {
    const EVEN_INPUT = "vali";
    const ODD_INPUT = "valid";
    const EXPECTED_EVEN_OUTPUT = "even";
    const EXPECTED_ODD_OUTPUT = "odd";
    const INVALID_TYPE_INPUT = [1, 2];

    it("should return undefined when type of input is not a string", function() {
        let result = isOddOrEven(INVALID_TYPE_INPUT);

        expect(result).to.be.equal(undefined);
    });

    it("should return correct value with valid even lengthed input", function() {
        let actual = isOddOrEven(EVEN_INPUT);

        expect(actual).to.be.equal(EXPECTED_EVEN_OUTPUT);
    });

    it("should return correct value with valid odd lengthed input", function() {
        let actual = isOddOrEven(ODD_INPUT);

        expect(actual).to.be.equal(EXPECTED_ODD_OUTPUT);
    });
});