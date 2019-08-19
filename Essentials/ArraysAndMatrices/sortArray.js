function sortArray(inputArray) {
    inputArray = inputArray.sort((first, second) => {
        let sort = first.length - second.length;
        if (sort === 0) {
            sort = first.toLocaleLowerCase().localeCompare(second.toLocaleLowerCase());
        }
        return sort;
    });
    console.log(inputArray.join("\n"));
}

// sortArray(['Isacc',
//     'Theodor',
//     'Jack',
//     'Harrison',
//     'George']
//
// );