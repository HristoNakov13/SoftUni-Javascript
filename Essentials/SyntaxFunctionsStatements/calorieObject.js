// function createAssociativeArray(array) {
//     let result = "{ ";
//     for (let i = 0; i < array.length - 2; i++) {
//         result[array[i]] = array[i + 1];
//         result += array[i] + ": " + array[i + 1] + ", ";
//         i++;
//     }
//     result += array[array.length - 2] + ": " + array[array.length - 1] + " }";
//     console.log(result);
// }

function createAssociativeArray(array) {
    let result = {};
    for (let i = 0; i < array.length - 1; i++) {
        result[array[i]] = array[i + 1];
        i++;
    }
    let asString = JSON.stringify(result);
    console.log(
        asString
            .replace(/"/g, " ")
            .replace(/ :/g, ": "));
}

