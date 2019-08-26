const expect = require("chai").expect;

let mathEnforcer = {
    addFive: function (num) {
        if (typeof (num) !== 'number') {
            return undefined;
        }
        return num + 5;
    },
    subtractTen: function (num) {
        if (typeof (num) !== 'number') {
            return undefined;
        }
        return num - 10;
    },
    sum: function (num1, num2) {
        if (typeof (num1) !== 'number' || typeof (num2) !== 'number') {
            return undefined;
        }
        return num1 + num2;
    }
};

describe("math enforcer", function () {
    const INVALID_TYPE_PARAMETER = "50";

    const POSITIVE_NUMBER = 20;
    const NEGATIVE_NUMBER = -10;
    const FLOAT_NUMBER = 10.5;

    const ADD_FIVE_VALUE = 5;
    const SUBTRACT_TEN_VALUE = 10;

    const ADD_FIVE_FUNC = mathEnforcer.addFive;
    const SUBTRACT_TEN_FUNC = mathEnforcer.subtractTen;
    const SUM_FUNC = mathEnforcer.sum;
    let actual;

    describe("testing addFive function", function () {

        it("should return undefined when input parameter is not typeOf - Number", function () {
            actual = ADD_FIVE_FUNC(INVALID_TYPE_PARAMETER);

            expect(actual).to.be.undefined;
        });

        it("should return correct result with positive number parameter", function () {
            actual = ADD_FIVE_FUNC(POSITIVE_NUMBER);

            expect(actual).to.equal(POSITIVE_NUMBER + ADD_FIVE_VALUE);
        });

        it("should return correct result with negative number parameter", function () {
            actual = ADD_FIVE_FUNC(NEGATIVE_NUMBER);

            expect(actual).to.equal(NEGATIVE_NUMBER + ADD_FIVE_VALUE);
        });

        it("should return correct result with float number parameter", function () {
            actual = ADD_FIVE_FUNC(FLOAT_NUMBER);

            expect(actual).to.equal(FLOAT_NUMBER + ADD_FIVE_VALUE);
        });
    });

    describe("testing subtractTen function", function () {

        it("should return undefined when input parameter is not typeOf - Number", function () {
            actual = SUBTRACT_TEN_FUNC(INVALID_TYPE_PARAMETER);

            expect(actual).to.be.undefined;
        });

        it("should return correct result with positive number parameter", function () {
            actual = SUBTRACT_TEN_FUNC(POSITIVE_NUMBER);

            expect(actual).to.equal(POSITIVE_NUMBER - SUBTRACT_TEN_VALUE);
        });

        it("should return correct result with negative number parameter", function () {
            actual = SUBTRACT_TEN_FUNC(NEGATIVE_NUMBER);

            expect(actual).to.equal(NEGATIVE_NUMBER - SUBTRACT_TEN_VALUE);
        });

        it("should return correct result with float number parameter", function () {
            actual = SUBTRACT_TEN_FUNC(FLOAT_NUMBER);

            expect(actual).to.equal(FLOAT_NUMBER - SUBTRACT_TEN_VALUE);
        });
    });

    describe("testing sum function", function () {

        describe("testing with parameters which are not typeOf - Number", function () {

            it("should return undefined when first parameter is not typeOf - Number", function () {
                actual = SUM_FUNC(INVALID_TYPE_PARAMETER, POSITIVE_NUMBER);

                expect(actual).to.be.undefined;
            });

            it("should return undefined when second parameter is not typeOf - Number", function () {
                actual = SUM_FUNC(POSITIVE_NUMBER, INVALID_TYPE_PARAMETER);

                expect(actual).to.be.undefined;
            });

            it("should return undefined when both parameters are not typeOf - Number", function() {
                actual = SUM_FUNC(INVALID_TYPE_PARAMETER, INVALID_TYPE_PARAMETER);

                expect(actual).to.be.undefined;
            });
        });
    });

    it("should return correct result with two positive parameters", function() {
        actual = SUM_FUNC(POSITIVE_NUMBER, POSITIVE_NUMBER);

        expect(actual).to.equal(POSITIVE_NUMBER + POSITIVE_NUMBER);
    });

    it ("should return correct result with one positive and one negative parameters", function() {
        actual = SUM_FUNC(POSITIVE_NUMBER, NEGATIVE_NUMBER);

        expect(actual).to.equal(POSITIVE_NUMBER + NEGATIVE_NUMBER);
    });

    it ("should return correct result with one positive and one float parameters", function() {
        actual = SUM_FUNC(POSITIVE_NUMBER, FLOAT_NUMBER);

        expect(actual).to.equal(POSITIVE_NUMBER + FLOAT_NUMBER);
    });

    it ("should return correct result with two float parameters", function() {
        actual = SUM_FUNC(FLOAT_NUMBER, FLOAT_NUMBER);

        expect(actual).to.equal(FLOAT_NUMBER + FLOAT_NUMBER);
    });
});
