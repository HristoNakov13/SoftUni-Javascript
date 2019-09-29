function solve() {
    let ELEMENTS = {
        numberInput: document.getElementById("input"),
        selectMenuConvertTo: document.getElementById("selectMenuTo"),
        convertBtn: document.getElementsByTagName("button")[0],
        result: document.getElementById("result"),
    };

    let binaryOption = createConvertMenuOption("Binary");
    let hexadecimalOption = createConvertMenuOption("Hexadecimal");

    ELEMENTS.selectMenuConvertTo.appendChild(hexadecimalOption);
    ELEMENTS.selectMenuConvertTo.appendChild(binaryOption);

    function createConvertMenuOption(optionValue) {
        let option = document.createElement("option");
        option.value = optionValue.toLowerCase();
        option.textContent = optionValue;
        return option;
    }

    let convertToBinary = function(number) {
        return number.toString(2);
    };

    let convertToHexadecimal = function(number) {
        return number.toString(16).toUpperCase();
    };

    let convertTo = {
        binary: convertToBinary,
        hexadecimal: convertToHexadecimal
    };

    let convertBtnClickFunc = function () {
        let input = +ELEMENTS.numberInput.value;
        let convertToOption = ELEMENTS.selectMenuConvertTo.value;
        let convertToFunc = convertTo[convertToOption];

        if (Number.isNaN(input)) {
            ELEMENTS.result = "Invalid number";
            return;
        } else if (convertToFunc === undefined) {
            ELEMENTS.result = "Please select convert to option";
            return;
        }

        ELEMENTS.result.value = convertToFunc(input);
    };

    ELEMENTS.convertBtn.addEventListener("click", convertBtnClickFunc);
}