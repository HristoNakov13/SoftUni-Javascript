function isMagicMatrix(matrix) {
    let isMagical = true;
    let sumResults = [];

    for (let i = 0; i < matrix.length; i++) {
        let rowSum = 0;
        let colSum = 0;

        for (let j = 0; j < matrix[i].length; j++) {
            rowSum += Number(matrix[i][j]);

            if (j < matrix.length) {
                colSum += Number(matrix[j][i]);
            }
        }

        if (rowSum !== colSum) {
            isMagical = false;
            break;
        }
        sumResults.push(rowSum);
    }

    if(isMagical) {
        let firstElement = sumResults[0];
        sumResults.forEach(element => {
            if (element !== firstElement) {
                isMagical = false;
            }
        })
    }
    console.log(isMagical);
}

// isMagicMatrix([[1, 0, 0],
//     [0, 0, 1],
//     [0, 1, 5, 6]]
// );