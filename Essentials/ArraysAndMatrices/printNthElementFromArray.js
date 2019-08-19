function printEveryNthElement(inputArray) {
    let loopStep = Number(inputArray[inputArray.length - 1]);
    inputArray.pop();

    for (let i = 0; i < inputArray.length; i += loopStep) {
        console.log(inputArray[i]);
    }
}
