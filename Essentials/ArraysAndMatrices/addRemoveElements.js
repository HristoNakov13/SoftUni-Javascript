function addRemoveOperations(inputArray) {
    let initialNumber = 1;
    let resultArray = [];

    for (const inputArrayElement of inputArray) {
        switch (inputArrayElement) {
            case "add":
                resultArray.push(initialNumber++);
                break;
            case "remove":
                resultArray.pop();
                initialNumber++;
                break;
        }
    }
    if (resultArray.length === 0) {
        console.log("Empty");
    } else {
        resultArray.forEach(element => console.log(element));
    }
}

