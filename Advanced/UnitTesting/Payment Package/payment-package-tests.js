const expect = require("chai").expect;
const assert = require("chai").assert;
const PaymentPackage = require("./payment-package");

describe("testing PaymentPackage", function() {
    describe("testing the presence of all functions", function() {
        it("has toString()", function() {
            assert.isFunction(PaymentPackage.prototype.toString);
        });
    });

    const VALID_NAME = "Transfer Fee";
    const VALID_VALUE = 100;

    const EMPTY_STRING = "";
    const NEGATIVE_NUMBER = -1;
    const INVALID_PARAMETER_TYPE = [1, 2];

    const DEFAULT_VAT = 20;
    const DEFAULT_ACTIVE = true;

    describe("testing instantiation", function() {
        it("should be instantiated with 2 parameters - name String and value number", function() {
            let paymentPackage = new PaymentPackage(VALID_NAME, VALID_VALUE);
            let actualName = paymentPackage.name;
            let actualValue = paymentPackage.value;
    
            expect(VALID_NAME).to.be.equal(actualName);
            expect(VALID_VALUE).to.be.equal(actualValue);
        });

        it("should be instantiated with correct default values", function() {
            let paymentPackage = new PaymentPackage(VALID_NAME, VALID_VALUE);
            let actualVAT = paymentPackage.VAT;
            let actualActive = paymentPackage.active;

            expect(DEFAULT_VAT).to.be.equal(actualVAT);
            expect(DEFAULT_ACTIVE).to.be.equal(actualActive);
        });

        describe("testing instantiation with invalid parameters", function() {
            describe("testing with invalid name", function() {
                const EMPTY_STRING_ERROR = new Error('Name must be a non-empty string');
                const EMPTY_STRING_ERROR_NAME = EMPTY_STRING_ERROR.name;
                const EMPTY_STRING_ERROR_MESSAGE = EMPTY_STRING_ERROR.message;

                const INVALID_TYPE_NAME_ERROR = new Error('Name must be a non-empty string');
                const INVALID_TYPE_NAME_ERROR_NAME = INVALID_TYPE_NAME_ERROR.name;
                const INVALID_TYPE_NAME_ERROR_MESSAGE = INVALID_TYPE_NAME_ERROR.message;

                it("should throw when name is an empty String", function() {
                    let actualErrorName;
                    let actualErrorMessage;

                    try {
                        let test = new PaymentPackage(EMPTY_STRING, VALID_VALUE);
                    } catch(err) {
                        actualErrorMessage = err.message;
                        actualErrorName = err.name;
                    }

                    expect(EMPTY_STRING_ERROR_MESSAGE).to.be.equal(actualErrorMessage);
                    expect(EMPTY_STRING_ERROR_NAME).to.be.equal(actualErrorName);
                });

                it("should throw when type of name parameter is not a 'String'", function() {
                    let actualErrorName;
                    let actualErrorMessage;

                    try {
                        let test = new PaymentPackage(INVALID_PARAMETER_TYPE, VALID_VALUE);
                    } catch(err) {
                        actualErrorMessage = err.message;
                        actualErrorName = err.name;
                    }

                    expect(INVALID_TYPE_NAME_ERROR_MESSAGE).to.be.equal(actualErrorMessage);
                    expect(INVALID_TYPE_NAME_ERROR_NAME).to.be.equal(actualErrorName);
                });
            });

            describe("testing with invalid 'value'", function() {
                const NEGATIVE_VALUE_ERROR = new Error('Value must be a non-negative number');
                const NEGATIVE_VALUE_ERROR_NAME = NEGATIVE_VALUE_ERROR.name;
                const NEGATIVE_VALUE_ERROR_MESSAGE = NEGATIVE_VALUE_ERROR.message;
    
                const INVALID_TYPE_VALUE_ERROR = new Error('Value must be a non-negative number');
                const INVALID_TYPE_VALUE_ERROR_NAME = INVALID_TYPE_VALUE_ERROR.name;
                const INVALID_TYPE_VALUE_ERROR_MESSAGE = INVALID_TYPE_VALUE_ERROR.message;

                it("should throw when value is a negative number", function() {
                    let actualErrorName;
                    let actualErrorMessage;

                    try {
                        let test = new PaymentPackage(VALID_NAME, NEGATIVE_NUMBER);
                    } catch(err) {
                        actualErrorMessage = err.message;
                        actualErrorName = err.name;
                    }

                    expect(NEGATIVE_VALUE_ERROR_MESSAGE).to.be.equal(actualErrorMessage);
                    expect(NEGATIVE_VALUE_ERROR_NAME).to.be.equal(actualErrorName);
                });

                it("should throw when type of parameter 'value' is not a 'number'", function() {
                    let actualErrorName;
                    let actualErrorMessage;

                    try {
                        let test = new PaymentPackage(VALID_NAME, NEGATIVE_NUMBER);
                    } catch(err) {
                        actualErrorMessage = err.message;
                        actualErrorName = err.name;
                    }

                    expect(INVALID_TYPE_VALUE_ERROR_MESSAGE).to.be.equal(actualErrorMessage);
                    expect(INVALID_TYPE_VALUE_ERROR_NAME).to.be.equal(actualErrorName);
                });
            });
        });
    });

    const VALID_VAT = 50;
    const VALID_ACTIVE_BOOLEAN_DIFFERENT_TAN_DEFAULT = false;

    describe("testing accessors for 'VAT' and 'active'", function() {
        describe("testing 'VAT'", function() {
            it("should set VAT with correct value", function() {
                let test = new PaymentPackage(VALID_NAME, VALID_VALUE);
                test.VAT = VALID_VAT;
                let actualVAt = test.VAT;

                expect(VALID_VAT).to.be.equal(actualVAt);
            });

            describe("testing set 'VAT' with invalid values", function() {
                const NEGATIVE_VAT_NUMBER_ERROR = new Error('VAT must be a non-negative number');
                const NEGATIVE_VAT_NUMBER_ERROR_NAME = NEGATIVE_VAT_NUMBER_ERROR.name;
                const NEGATIVE_VAT_NUMBER_ERROR_MESSAGE = NEGATIVE_VAT_NUMBER_ERROR.message;

                it("should throw when setting 'VAT' with negative number", function() {
                    let actualErrorName;
                    let actualErrorMessage;

                    try {
                        let test = new PaymentPackage(VALID_NAME, VALID_VALUE);
                        test.VAT = NEGATIVE_NUMBER;
                    } catch(err) {
                        actualErrorMessage = err.message;
                        actualErrorName = err.name;
                    }

                    expect(NEGATIVE_VAT_NUMBER_ERROR_MESSAGE).to.be.equal(actualErrorMessage);
                    expect(NEGATIVE_VAT_NUMBER_ERROR_NAME).to.be.equal(actualErrorName);
                });

                const INVALID_TYPE_VAT_ERROR = new Error('VAT must be a non-negative number');
                const INVALID_TYPE_VAT_ERROR_NAME = INVALID_TYPE_VAT_ERROR.name;
                const INVALID_TYPE_VAT_ERROR_MESSAGE = INVALID_TYPE_VAT_ERROR.message;

                it("should throw when setting 'VAT' with type of different than 'number'", function() {
                    let actualErrorName;
                    let actualErrorMessage;

                    try {
                        let test = new PaymentPackage(VALID_NAME, VALID_VALUE);
                        test.VAT = INVALID_PARAMETER_TYPE;
                    } catch(err) {
                        actualErrorMessage = err.message;
                        actualErrorName = err.name;
                    }

                    expect(INVALID_TYPE_VAT_ERROR_MESSAGE).to.be.equal(actualErrorMessage);
                    expect(INVALID_TYPE_VAT_ERROR_NAME).to.be.equal(actualErrorName);
                })
            });
        });

        describe("testing 'active'", function() {
            it("should set 'active' with correct value", function() {
                let test = new PaymentPackage(VALID_NAME, VALID_VALUE);
                test.active = VALID_ACTIVE_BOOLEAN_DIFFERENT_TAN_DEFAULT;
                let actualActive = test.active;

                expect(VALID_ACTIVE_BOOLEAN_DIFFERENT_TAN_DEFAULT).to.be.equal(actualActive);
            });

            const ACTIVE_SET_ERROR = new Error('Active status must be a boolean');
            const ACTIVE_SET_ERROR_NAME = ACTIVE_SET_ERROR.name;
            const ACTIVE_SET_ERROR_MESSAGE = ACTIVE_SET_ERROR.message;

            it("should throw when setting 'active' with type of different than 'boolean'", function() {
                let actualErrorName;
                let actualErrorMessage;

                try {
                    let test = new PaymentPackage(VALID_NAME, VALID_VALUE);
                    test.active = INVALID_PARAMETER_TYPE;
                } catch(err) {
                    actualErrorMessage = err.message;
                    actualErrorName = err.name;
                }

                expect(ACTIVE_SET_ERROR_MESSAGE).to.be.equal(actualErrorMessage);
                expect(ACTIVE_SET_ERROR_NAME).to.be.equal(actualErrorName);
            });
        });
    });

    describe("testing toString()", function() {
        let test = new PaymentPackage(VALID_NAME, VALID_VALUE);
        const EXPECTED_DEFAULT_RESULT = [
            `Package: ${VALID_NAME}`,
            `- Value (excl. VAT): ${VALID_VALUE}`,
            `- Value (VAT ${DEFAULT_VAT}%): ${VALID_VALUE * (1 + DEFAULT_VAT / 100)}`
          ].join("\n");

        it("should return correct string with unchanged 'active' and 'VAT'", function() {
            let actual = test.toString();

            expect(EXPECTED_DEFAULT_RESULT).to.be.equal(actual);
        });

        const EXPECTED_RESULT_ACTIVE_CHANGED = [
            `Package: ${VALID_NAME} (inactive)`,
            `- Value (excl. VAT): ${VALID_VALUE}`,
            `- Value (VAT ${DEFAULT_VAT}%): ${VALID_VALUE * (1 + DEFAULT_VAT / 100)}`
          ].join("\n");

        it("should return correct string when 'active' is changed", function() {
            let wtf = new PaymentPackage(VALID_NAME, VALID_VALUE);
            wtf.active = VALID_ACTIVE_BOOLEAN_DIFFERENT_TAN_DEFAULT;
            let actual = wtf.toString();

            expect(EXPECTED_RESULT_ACTIVE_CHANGED).to.be.equal(actual);
        });

        const EXPECTED_RESULT_VAT__CHANGED = [
            `Package: ${VALID_NAME}`,
            `- Value (excl. VAT): ${VALID_VALUE}`,
            `- Value (VAT ${VALID_VAT}%): ${VALID_VALUE * (1 + VALID_VAT / 100)}`
          ].join("\n");

        it("should return correct string when 'VAT' is changed", function() {
            test.active = true;
            test.VAT = VALID_VAT;
            let actual = test.toString();

            expect(EXPECTED_RESULT_VAT__CHANGED).to.be.equal(actual);
        });

        const EXPECTED_RESULT_VAT_ZERO = [
            `Package: ${VALID_NAME}`,
            `- Value (excl. VAT): 0`,
            `- Value (VAT 0%): 0`
          ].join("\n");


        it("should return correct string when 'VAT' is set to zero", function() {
            let zeroTest = new PaymentPackage(VALID_NAME, 0);
            zeroTest.VAT = 0;
            let actual = zeroTest.toString();

            expect(EXPECTED_RESULT_VAT_ZERO).to.be.equal(actual);
        });
    });
});