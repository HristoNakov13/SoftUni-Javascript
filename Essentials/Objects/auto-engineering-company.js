function carProductionStats(production) {
    let statistics = {};
    for (const car of production) {
        let split = car.split(" | ");

        let make = split[0];
        let model = split[1];
        let quantity = Number(split[2]);

        addToStatistics(statistics, make, model, quantity);
    }

    printStats(statistics);

    function printStats(statistics) {
        for (const make in statistics) {
            console.log(make);
            for (const model in statistics[make]) {
                console.log(`###${model} -> ${statistics[make][model]}`);
            }
        }
    }

    function addToStatistics(statistics, make, model, quantity) {
        if (isLoggedMake(statistics, make)) {
            if (isLoggedModel(statistics, make, model)) {
                statistics[make][model] += quantity;
            } else {
                statistics[make][model] = quantity;
            }
        } else {
            statistics[make] = {};
            statistics[make][model] = quantity;
        }
    }

    function isLoggedMake(statistics, make) {
        return statistics[make] !== undefined;
    }

    function isLoggedModel(statistics, make, model) {
        return statistics[make][model] !== undefined;
    }
}

carProductionStats(['Audi | Q7 | 1000',
    'Audi | Q6 | 100',
    'BMW | X5 | 1000',
    'BMW | X6 | 100',
    'Citroen | C4 | 123',
    'Volga | GAZ-24 | 1000000',
    'Lada | Niva | 1000000',
    'Lada | Jigula | 1000000',
    'Citroen | C4 | 22',
    'Citroen | C5 | 10']
);