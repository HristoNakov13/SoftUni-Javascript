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

describe("lookUpChar", function() {
    const INVALID_TYPE_INDEX = "50";
    const INVALID_TYPE_STRING = ["Ivan"];
    const OUT_OUF_BOUNDS_INDEX = 50;
    const NEGATIVE_INDEX = -5;

    const VALID_STRING = "Pesho";
    const VALID_INDEX = 2;
    const EXPECTED_CHAR = "s";
    const INCORRECT_INDEX_RESULT = "Incorrect index";
     
    let actual;

    describe("testing returned result when parameters are different than the required", function() {
        it("should return undefined when index parameter is not a typeOf - number", function() {
            actual = lookupChar(VALID_STRING, INVALID_TYPE_INDEX);
    
            expect(actual).to.be.undefined;
        });
    
        it("should return undefined when word parameter is not a typeOf - String", function() {
            actual = lookupChar(INVALID_TYPE_STRING, VALID_INDEX);
    
            expect(actual).to.be.undefined;
        });
    });

    describe("testing with incorrect index", function() {
        it("should return incorrect index message when index parameter is greater than word's length", function() {
            actual = lookupChar(VALID_STRING, OUT_OUF_BOUNDS_INDEX);
    
            expect(actual).to.equal(INCORRECT_INDEX_RESULT);
        });
    
        it("should return incorrect index message when index parameter is a negative number", function() {
            actual = lookupChar(VALID_STRING, NEGATIVE_INDEX);
    
            expect(actual).to.equal(INCORRECT_INDEX_RESULT);
        });
    });

    describe("teting with valid parameters", function() {
        it("should return correct index", function() {
            actual = lookupChar(VALID_STRING, VALID_INDEX);

            expect(actual).to.equal(EXPECTED_CHAR);
        });
    });
});