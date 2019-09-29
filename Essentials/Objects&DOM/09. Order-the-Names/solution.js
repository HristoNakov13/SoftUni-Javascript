function solve() {

    let input = document.getElementById("exercise").getElementsByTagName("input")[0];
    let lists = document.getElementById("main").getElementsByTagName("li");

    let addStudentEvent = function () {
        let name = processName(input.value);
        let position = getAlphabetPosition(name);

        let row = lists[position];
        let names = [];

        if (row.textContent !== "") {
            names = row.textContent.split(", ");
        }

        names.push(name);
        row.textContent = names.join(", ");
    };

    let addBtn = document.getElementById("exercise").getElementsByTagName("button")[0];
    addBtn.addEventListener("click", addStudentEvent);

    function getAlphabetPosition(name) {
        return name.toUpperCase().charCodeAt(0) - 65
    }

    function processName(input) {
        return input[0].toUpperCase() + input.substring(1).toLowerCase();
    }

}