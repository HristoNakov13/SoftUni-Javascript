function solve() {
    const ELEMENTS = {
        sudomuTable: document.getElementById("exercise").querySelector("tbody").querySelectorAll("tr"),
        quickCheckBtn: document.getElementsByTagName("button")[0],
        clearBtn: document.getElementsByTagName("button")[1],
        checkMessage: document.getElementById("check").getElementsByTagName("p")[0],
        table: document.getElementById("exercise").getElementsByTagName("table")[0],
    };

    const SOLVED_MESSAGE = "You solve it! Congratulations!";
    const SOLVED_MESSAGE_COLOR = "green";
    const FAILED_MESSAGE = "NOP! You are not done yet...";
    const FAILED_MESSAGE_COLOR = "red";

    ELEMENTS.clearBtn.addEventListener("click", clear);

    function clear() {
        ELEMENTS.checkMessage.textContent = "";
        ELEMENTS.table.style.border = "none";

        for (const row of ELEMENTS.sudomuTable) {
            let inputCells = row.querySelectorAll("td");

            inputCells.forEach(cell =>
                cell.getElementsByTagName("input")[0].value = "");
        }
    }

    ELEMENTS.quickCheckBtn.addEventListener("click", quickCheck);

    function quickCheck() {
        let matrix = extractTableValues(ELEMENTS.sudomuTable);
        if (isSolved(matrix)) {
            changeTableDisplay(SOLVED_MESSAGE, SOLVED_MESSAGE_COLOR);
        } else {
            changeTableDisplay(FAILED_MESSAGE, FAILED_MESSAGE_COLOR);
        }
    }

    function changeTableDisplay(message, color) {
        ELEMENTS.checkMessage.textContent = message;
        ELEMENTS.checkMessage.style.color = color;
        ELEMENTS.table.style.border = `2px solid ${color}`;
    }

    function extractTableValues(sudomuTable) {
        let sudomuMatrix = [];

        for (const row of sudomuTable) {
            let inputCells = row.getElementsByTagName("td");
            let currentRow = [];

            for (const cell of inputCells) {
                let value = cell.getElementsByTagName("input")[0].value;
                currentRow.push(value);
            }
            sudomuMatrix.push(currentRow);
        }
        return sudomuMatrix;
    }

    function isSolved(sudomuMatrix) {
        let isSolved = true;

        loop: for (let i = 0; i < sudomuMatrix.length; i++) {
            let row = [];
            let col = [];

            for (let j = 0; j < sudomuMatrix[i].length; j++) {
                let currentRowValue = sudomuMatrix[i][j];
                let currentColValue = sudomuMatrix[j][i];

                if (!isValidInputValue(currentColValue) || !isValidInputValue(currentRowValue)) {
                    isSolved = false;
                    break loop;
                }

                if (isNotDuplicate(row, currentRowValue) && isNotDuplicate(col, currentColValue)) {
                    row.push(currentRowValue);
                    col.push(currentColValue);
                } else {
                    isSolved = false;
                    break loop;
                }
            }
        }
        return isSolved;
    }

    function isNotDuplicate(rowOrCol, value) {
        return rowOrCol.indexOf(value) === -1;
    }

    const SUDOMU_DIMENSIONS = 3;

    function isValidInputValue(value) {
        return !Number.isNaN(value) && value >= 1 && value <= SUDOMU_DIMENSIONS;
    }
}

