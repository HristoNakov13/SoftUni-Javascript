function solve() {
    let inputElement = document.getElementById("input");
    let inputBinary = inputElement.value;

    let weight = calculateInputWeight(inputBinary);
    let slice = calculateInputSlice(weight);

    let slicedInput = inputBinary.substring(slice, inputBinary.length - slice);

    let binaryGroups = getBinaryGroupings(slicedInput);
    let result = transformBinaryToDecimal(binaryGroups);

    let resultElement = document.getElementById("resultOutput");
    resultElement.innerHTML = result;
}

function calculateInputWeight(input) {
    let weight = 0;
    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) == 1) {
            weight++;
        }
    }
    return weight;
}

function calculateInputSlice(weight) {
    let slice = 0;
    let asString = weight + "";
    for (let i = 0; i < asString.length; i++) {
        slice += Number(asString.charAt(i));
    }
    return slice;
}

function getBinaryGroupings(input) {
    const groupingSize = 8;
    let groups = [];
    for (let i = 0; i < input.length; i += groupingSize) {
        let group = input.substring(i, i + groupingSize);
        groups.push(group);
    }
    return groups;
}

function transformBinaryToDecimal(groupsArray) {
    let result = "";
    for (const binary of groupsArray) {
        let asciiCode = Number(parseInt(binary, 2));
        result += String.fromCharCode(asciiCode);
    }
    return result;
}

