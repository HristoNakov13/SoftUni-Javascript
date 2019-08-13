function checkAllSubNumbersEqual(parameter) {
    let allNumsEqual = true;
    let totalSum = 0;
    let numbAsArray = Array.from(String(parameter), Number);

    for (let i = 0; i < numbAsArray.length - 1; i++) {
        if (numbAsArray[i] !== numbAsArray[i + 1]) {
            allNumsEqual = false;
        }
        totalSum += numbAsArray[i];
    }
    console.log(allNumsEqual);
    console.log(totalSum + numbAsArray[numbAsArray.length - 1]);
}