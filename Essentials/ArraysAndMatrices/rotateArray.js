function rotateArray(inputArray) {
    let count = Number(inputArray[inputArray.length - 1]);
    let rotationsCount = count % (inputArray.length - 1);
    inputArray.pop();

    for (let i = 0; i < rotationsCount; i++) {
        let lastElement = inputArray.pop();
        inputArray.unshift(lastElement);
    }
    console.log(inputArray.join(" "));
}
