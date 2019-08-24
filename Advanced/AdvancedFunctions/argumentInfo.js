function argumentsInfo(...arguments) {
    let associativeArray = {};
    let asArray = [];

    for (const argument of arguments) {
        let type = typeof argument;
        console.log(`${type}: ${argument}`);

        if (associativeArray[type] === undefined) {
            const counter = typeCounter();
            let asObj = {
                "name": type,
                "appearances": 0,
                "counter": counter,
            };
            associativeArray[type] = asObj;
            asArray.push(asObj);
        }
        associativeArray[type].appearances = Number(associativeArray[type].counter());
    }

    function typeCounter() {
        let counter = 1;
        return function () {
            return counter++;
        }
    }

    asArray
        .sort((first, second) => {
        return second.appearances - first.appearances;})
        .forEach((type) =>
        console.log(`${type.name} = ${type.appearances}`));
}

// argumentsInfo({ name: 'bob'}, 3.333, 9.999);