function printByDelimiter(array) {
    let delimiter = array[array.length - 1];
    // let result = array.splice(0, array.length - 1).join(delimiter);
    array.pop();
    let result = array.join(delimiter);
    console.log(result);
}
