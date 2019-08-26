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

describe("isEvenOrOdd", function() {
    const ODD_LENGTH_INPUT = "lol";
    const EVEN_LENGTH_INPUT = "lolo";

    const ODD_LENGTH_RESULT = "odd";
    const EVEN_LENGTH_RESULT = "even";

    it("should return undefined when input is not String", function() {
        const NUMBER = Number("54");
        const ARRAY = ["asd", "lol",]

        const actualNUMBERresult = isOddOrEven(NUMBER);
        const actualARRAYresult = isOddOrEven(ARRAY);

        expect(actualNUMBERresult).to.be.undefined;
        expect(actualARRAYresult).to.be.undefined;
    });

    it("should return String - 'odd' when String input has odd length", function() {
        const actual = isOddOrEven(ODD_LENGTH_INPUT);

        expect(actual).to.be.equal(ODD_LENGTH_RESULT);
    });

    it("should return String - 'even' when String input has even length", function() {
        const actual = isOddOrEven(EVEN_LENGTH_INPUT);

        expect(actual).to.be.equal(EVEN_LENGTH_RESULT);
    });
});