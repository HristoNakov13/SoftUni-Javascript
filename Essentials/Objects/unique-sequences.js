function sequences(input) {
    let sequences = new Map();

    for (const json of input) {
        let currentArray = JSON.parse(json).map(element => Number(element));

        if (!sequences.has(currentArray.length)) {
            sequences.set(currentArray.length, []);
            currentArray.sort((a, b) => b - a);
            sequences.get(currentArray.length).push(currentArray);
        } else {
            for (const array of sequences.get(currentArray.length)) {
                currentArray.sort((a, b) => b - a);

                if (!areEqualArrays(array, currentArray)) {
                    sequences.get(currentArray.length).push(currentArray);
                }
            }
        }
    }
    let allArrays = [];
    sequences.forEach(arrays => {
        arrays.forEach(array => allArrays.push(array));
    });

    allArrays
        .sort((array1, array2) => {
        return array1.length - array2.length;
    })
        .forEach(array => console.log(JSON.stringify(array).replace(/,/g, ", ")));

    function areEqualArrays(firstArray, secondArray) {
        let areEqual = true;
        for (let i = 0; i < firstArray.length; i++) {
            if (firstArray[i] !== secondArray[i]) {
                areEqual = false;
                break;
            }
        }
        return areEqual;
    }
}

sequences(["[-3, -2, -1, 0, 1, 2, 3, 4]",
    "[10, 1, -17, 0, 2, 13]",
    "[4, -3, 3, -2, 2, -1, 1, 0]"]
);
//
// sequences(["[7.14, 7.180, 7.339, 80.099]",
//     "[7.339, 80.0990, 7.140000, 7.18]",
//     "[7.339, 7.180, 7.14, 80.099]"]
// );