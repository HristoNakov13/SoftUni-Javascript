function solve() {
    let leftOperand = "0";
    let operand = "";
    let rightOperand = "";

    let expression = document.getElementById("expressionOutput");
    let resultField = document.getElementById("resultOutput");
    let numberKeysClickEvent = function () {
        let keyValue = this.value;
        updateOperands(keyValue);
    };

    function updateOperands(keyValue) {
        if (operand === "") {
            leftOperand = addNumberToOperand(leftOperand, keyValue);
        } else {
            rightOperand = addNumberToOperand(rightOperand, keyValue);
        }
        expression.textContent = `${leftOperand} ${operand} ${rightOperand}`;
    }

    function addNumberToOperand(operand, keyValue) {
        if (+operand === 0) {
            operand = keyValue;
        } else {
            operand += keyValue;
        }
        return operand;
    }

    let dotButtonClickEvent = function () {
        if (operand === "") {
            if (!leftOperand.includes(".")) {
                leftOperand += ".";
            }
        } else {
            if (!rightOperand.includes(".")) {
                rightOperand  += ".";
            }
        }
    };

    let operandClickEvent = function () {
        if (this.value === "=" && rightOperand === "") {
            resultField.textContent = "NaN";
            return;
        }
        if (operand === "") {
            operand = this.value;
            expression.textContent = `${leftOperand} ${operand} ${rightOperand}`;
        } else {
            resultField.textContent = calculateExpression(+leftOperand, operand, +rightOperand);
        }

    };

    let calculatorKeys = document.getElementsByClassName("keys")[0]
        .getElementsByTagName("button");

    for (let i = 0; i < calculatorKeys.length; i++) {
        let button = calculatorKeys[i];
        if (Number.isInteger(+button.value)) {
            button.addEventListener("click", numberKeysClickEvent);
        } else if (button.value === ".") {
            button.addEventListener("click", dotButtonClickEvent);
        } else {
            button.addEventListener("click", operandClickEvent);
        }
    }

    let clearButton = document.getElementById("calculator").getElementsByClassName("clear")[0];
    clearButton.addEventListener("click", clear);

    function clear() {
        leftOperand = 0;
        rightOperand = "";
        operand = "";
        expression.textContent = "";
        resultField.textContent = "";
    }

    function calculateExpression(leftOperand, operand, rightOperand) {
        let result;
        console.log(operand);
        switch (operand) {
            case "+":
                result = leftOperand + rightOperand;
                break;
            case "-":
                result = leftOperand - rightOperand;
                break;
            case "*":
                result = leftOperand * rightOperand;
                break;
            case "/":
                result = leftOperand / rightOperand;
                break;
        }
        return result;
    }
}