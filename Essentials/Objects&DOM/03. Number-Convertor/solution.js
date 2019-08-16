function solve() {
    let binaryOptionElement = document.createElement("option");
    binaryOptionElement.value = "binary";
    binaryOptionElement.textContent = "Binary";

    let hexadecimalOptionElement = document.createElement("option");
    hexadecimalOptionElement.value = "hexadecimal";
    hexadecimalOptionElement.textContent = "Hexadecimal";

    let selectMenuToElement = document.getElementById("selectMenuTo");
    selectMenuToElement.appendChild(binaryOptionElement);
    selectMenuToElement.appendChild(hexadecimalOptionElement);


    let convertButton = document.getElementsByTagName("button")[0];
    convertButton.addEventListener("click", function () {
        let inputElement = document.getElementById("input");
        let convertToOptionElement = document.getElementById("selectMenuTo");

        let number = Number(inputElement.value);
        let convertTo = convertToOptionElement.value;

        if (number && convertTo !== "") {
            let result;
            if (convertTo === "binary") {
                result = convertNumberToBinary(number);
            } else if (convertTo === "hexadecimal") {
                result = convertNumberToHexadecimal(number);
            }
            let resultElement = document.getElementById("result");
            resultElement.value = result;
        }
    });

    function convertNumberToBinary(number) {
        return (number >>> 0).toString(2);
    }

    function convertNumberToHexadecimal(number) {
        return number.toString(16).toUpperCase();
    }
}