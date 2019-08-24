function sortArray(array, criteria) {
    if (criteria === "asc") {
        array = array.sort((first, second) => {
            return first - second;
        });
    } else if (criteria === "desc") {
        array = array.sort((first, second) => {
            return second - first;
        });
    }
    return array;
}