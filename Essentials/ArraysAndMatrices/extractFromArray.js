function extractNonDecreasingSubSequence(inputArray) {
    let biggest = Number(inputArray[0]);
    let resultArray = [];

    for (const element of inputArray) {
        let current = Number(element);

        if (current >= biggest) {
            biggest = current;
            resultArray.push(biggest);
        }
    }
    console.log(resultArray.join("\n"));
}
