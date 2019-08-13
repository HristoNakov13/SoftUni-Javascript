function checkValidDistanceBetweenPoints(array) {
    let x1 = Number(array[0]);
    let y1 = Number(array[1]);
    let x2 = Number(array[2]);
    let y2 = Number(array[3]);

    function calculateDistance(x1, y1, x2, y2) {
        let xDistance = x1 - x2;
        let yDistance = y1 - y2;
        return Math.sqrt(xDistance ** 2 + yDistance ** 2)
    }
    let output = `{${x1}, ${y1}} to {0, 0} is `;
    if (Number.isInteger(calculateDistance(x1, y1, 0, 0))) {
        output += "valid";
    } else {
        output += "invalid";
    }
    console.log(output);

    output = `{${x2}, ${y2}} to {0, 0} is `;
    if (Number.isInteger(calculateDistance(x2, y2, 0, 0))) {
        output += "valid";
    } else {
        output += "invalid";
    }
    console.log(output);

    output = `{${x1}, ${y1}} to {${x2}, ${y2}} is `;
    if (Number.isInteger(calculateDistance(x1, y1, x2, y2))) {
        output += "valid";
    } else {
        output += "invalid";
    }
    console.log(output);
}