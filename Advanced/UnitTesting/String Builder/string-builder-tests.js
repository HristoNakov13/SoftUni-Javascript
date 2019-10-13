const expect = require("chai").expect;
const StringBuilder = require("./string-builder");

  
describe("StringBuilder", function() {
    const INVALID_TYPE_PARAM = 50.5;
    const EXPECTED_ERROR = new TypeError('Argument must be string');
    const INITIAL_STRING = "Hello";
    const EXPECTED_THROW_MESSAGE = EXPECTED_ERROR.message;

    let stringBuilder;
    beforeEach(function () {
        stringBuilder = new StringBuilder(INITIAL_STRING);
    });

    
    describe("can be instantiated with a passed string or without any params", function() {
    const EXPECTED_ERROR_NAME = EXPECTED_ERROR.name;
    const EMPTY_STRING = "";

        it ("can be instantiated with empty constructor", function() {
            let strB = new StringBuilder();
            let actual = strB.toString();
    
            expect(actual).to.be.equal(EMPTY_STRING);
        });

        it ("can be instantiated with String parameter", function() {
            let strB = new StringBuilder(INITIAL_STRING);
            let actual = strB.toString();
    
            expect(actual).to.be.equal(INITIAL_STRING);
        });

        it("should throw when instantiating with type of paramater different than String", function() {
            let throwMessage;
            let errorName;

            try {
                let test = new StringBuilder(INVALID_TYPE_PARAM);
            } catch(err) {
                throwMessage = err.message;
                errorName = err.name;
            }

            expect(throwMessage).to.be.equal(EXPECTED_THROW_MESSAGE);           
            expect(errorName).to.be.equal(EXPECTED_ERROR_NAME);
        });
    });

    describe('StringBuilder has all functions present', function () {
        it("has function 'append'", function () {
            expect(typeof StringBuilder.prototype.append).to.be.equal("function");
        });

        it("has function 'prepend'", function () {
            expect(typeof StringBuilder.prototype.prepend).to.be.equal("function");
        });

        it("has function 'insertAt'", function () {
            expect(typeof StringBuilder.prototype.insertAt).to.be.equal("function");
        });

        it("has function 'remove'", function () {
            expect(typeof StringBuilder.prototype.remove).to.be.equal("function");
        });

        it("has function 'toString'", function () {
            expect(typeof StringBuilder.prototype.toString).to.be.equal("function");
        });

        it("toString returns correct value", function () {
            expect(stringBuilder.toString()).to.equal(INITIAL_STRING)
        });
    });

    const TEST_STRING = "Ivan";

    describe("testing function 'append'", function() {   
        const EXPECTED_RESULT = INITIAL_STRING + TEST_STRING;

        it("should throw when parameter type of is not 'String'", function() {
            expect(() => stringBuilder.append(INVALID_TYPE_PARAM)).to.throw(EXPECTED_THROW_MESSAGE);
        });

        it("should correctly add given string at the end of initial string", function() {
            stringBuilder.append(TEST_STRING);
            let actual = stringBuilder.toString();

            expect(actual).to.be.equal(EXPECTED_RESULT);
        });
    });

    describe("testing function 'prepend'", function() {
        const EXPECTED_RESULT = TEST_STRING + INITIAL_STRING;

        it("should throw when parameter type of is not 'String'", function() {
            expect(() => stringBuilder.prepend(INVALID_TYPE_PARAM)).to.throw(EXPECTED_THROW_MESSAGE);
        });

        it("should correctly add given string at the begining of initial string", function() {
            stringBuilder.prepend(TEST_STRING);
            let actual = stringBuilder.toString();

            expect(actual).to.be.equal(EXPECTED_RESULT);
        });
    });

    describe("testing function 'insertAt'", function() {
        const START_INDEX = INITIAL_STRING.length - 2;
        const EXPECTED_RESULT = INITIAL_STRING.substring(0, START_INDEX) + TEST_STRING + INITIAL_STRING.substring(START_INDEX);

        it("should throw when parameter type of is not 'String'", function() {
            expect(() => stringBuilder.insertAt(INVALID_TYPE_PARAM)).to.throw(EXPECTED_THROW_MESSAGE);
        });

        it("should correctly insert given string at given index of initial string", function() {
            stringBuilder.insertAt(TEST_STRING, START_INDEX);
            let actual = stringBuilder.toString();

            expect(actual).to.be.equal(EXPECTED_RESULT);
        });
    });

    describe("testing function 'remove'", function() {
        const stringBuilder = new StringBuilder(INITIAL_STRING);
        const START_INDEX = 1;
        const DELETE_CHARS_COUNT = 2;
        const EXPECTED_RESULT = INITIAL_STRING.substring(0, START_INDEX) + INITIAL_STRING.substring(START_INDEX + DELETE_CHARS_COUNT);

        it("should throw when parameter type of is not 'String'", function() {
            expect(() => stringBuilder.insertAt(INVALID_TYPE_PARAM)).to.throw(EXPECTED_THROW_MESSAGE);
        });

        it("should correctly remove characters from initial string in the range from given start to end indeces", function() {
            stringBuilder.remove(START_INDEX, DELETE_CHARS_COUNT);
            let actual = stringBuilder.toString();

            expect(actual).to.be.equal(EXPECTED_RESULT);
        });
    });

    describe('testing functionality with empty initial string', function(){
        it('consecutive calling all functions', function() {
            const emptySB = new StringBuilder();
            const APPEND = "2";
            const PREPEND = "1";
            const START_INDEX = 2;
            const DELE_CHARS_COUNT = INITIAL_STRING.length;
            const EXPECTED_RESULT = PREPEND + APPEND;

            emptySB.prepend(PREPEND);
            emptySB.insertAt(INITIAL_STRING, START_INDEX);
            emptySB.append(APPEND);
            emptySB.remove(START_INDEX - 1, DELE_CHARS_COUNT);
    
            let actual = emptySB.toString();

            expect(EXPECTED_RESULT).to.be.equal(actual);
        });
    });
});