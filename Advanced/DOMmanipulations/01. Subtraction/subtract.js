function subtract() {
    let firstNumberInputElement = document.getElementById("firstNumber");
    let secondNumberInputElement = document.getElementById("secondNumber");

    let firstInputValue = Number(firstNumberInputElement.value);
    let secondInputValue = Number(secondNumberInputElement.value);
    let result = firstInputValue - secondInputValue;

    let resultElement = document.getElementById("result");
    resultElement.textContent = result;
}
