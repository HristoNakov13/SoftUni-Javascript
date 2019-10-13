const expect = require("chai").expect;

function lookupChar(string, index) {
    if (typeof(string) !== 'string' || !Number.isInteger(index)) {
        return undefined;
    }
    if (string.length <= index || index < 0) {
        return "Incorrect index";
    }

    return string.charAt(index);
}

describe("lookupChar", function() {
    const VALID_STRING = "Hello";
    const VALID_INDEX = VALID_STRING.length - 1;
    const EXPECTED_RESULT = "o";

    const INVALID_TYPE_PARAMETER = [1, 2];
    const INVALID_FLOAT_INDEX = 50.5;
    const NEGATIVE_INDEX = -2;
    const OUT_OF_BOUNDS_INDEX = VALID_STRING.length + 1;
    const INCORRECT_INDEX_RESULT = "Incorrect index";

    describe("testing return value when type of input params are different than required", function() {
        it("should return undefined when first param is not type of 'String'", function() {
            let actual = lookupChar(INVALID_TYPE_PARAMETER, VALID_INDEX);

            expect(actual).to.be.undefined;
        });

        it("should return undefined when second param is not type of 'Number'", function() {
            let actual = lookupChar(VALID_STRING, INVALID_TYPE_PARAMETER);

            expect(actual).to.be.undefined;
        });

        it("should return undefined when second param is a float number", function() {
            let actual = lookupChar(VALID_STRING, INVALID_FLOAT_INDEX);

            expect(actual).to.be.undefined;
        });

        it("should return undefined when both params are invalid", function() {
            let actual = lookupChar(INVALID_TYPE_PARAMETER, INVALID_FLOAT_INDEX);

            expect(actual).to.be.undefined;
        });
    });

    describe("testing return value with invalid index", function() {
        it("should return correct message when given index is negative number", function() {
            let actual = lookupChar(VALID_STRING, NEGATIVE_INDEX);

            expect(actual).to.be.equal(INCORRECT_INDEX_RESULT);
        });

        it("should return correct message when given index is greater than input String's length", function() {
            let actual = lookupChar(VALID_STRING, OUT_OF_BOUNDS_INDEX);

            expect(actual).to.be.equal(INCORRECT_INDEX_RESULT);
        });
    });

    describe("testing return value with valid parameters", function() {
        it("should return correct value when both params are valid", function() {
            let actual = lookupChar(VALID_STRING, VALID_INDEX);

            expect(actual).to.be.equal(EXPECTED_RESULT);
        });
    });
});