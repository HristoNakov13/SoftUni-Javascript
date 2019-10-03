function solve() {
    let macroNutrientsStock = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0,
    };

    let recipes = {
        apple: {
            carbohydrate: 1,
            flavour: 2,
        },
        lemonade: {
            carbohydrate: 10,
            flavour: 20,
        },
        burger: {
            carbohydrate: 5,
            fat: 7,
            flavour: 3
        },
        eggs: {
            protein: 5,
            fat: 1,
            flavour: 1,
        },
        turkey: {
            protein: 10,
            carbohydrate: 10,
            fat: 10,
            flavour: 10,
        },
    };

    const SUCCESS_MESSAGE = "Success";
    const INVALID_NUTRIENT = "Unknown nutrient";

    let commands = {
        restock: restock,
        prepare: prepareFood,
        report: report,
    };

    function restock(stock, nutrient, quantity) {
        if (stock[nutrient] !== undefined) {
            stock[nutrient] += Number(quantity);
            return SUCCESS_MESSAGE;
        }
        throw INVALID_NUTRIENT;
    }

    function prepareFood(stock, foodName, quantity) {
        let recipe = recipes[foodName];
        for (const nutrient in recipe) {
            let neededAmount = recipe[nutrient] * quantity;

            if (neededAmount > stock[nutrient]) {
                return `Error: not enough ${nutrient} in stock`;
            }
        }
        return removeUsedNutrients(stock, recipe, quantity);
    }

    function removeUsedNutrients(stock, recipe, quantity) {
        for (const nutrient in recipe) {
            let neededAmount = recipe[nutrient] * quantity;
            stock[nutrient] -= neededAmount;
        }
        return SUCCESS_MESSAGE;
    }

    function report(stock) {
        return `protein=${stock.protein} carbohydrate=${stock.carbohydrate} fat=${stock.fat} flavour=${stock.flavour}`;
    }

    let manager = function (input) {
        let inputSplit = input.split(" ");
        let commandName = inputSplit[0];
        let itemName = inputSplit[1];
        let quantity = Number(inputSplit[2]);

        return commands[commandName](macroNutrientsStock, itemName, quantity);
    };

    return manager;
}

// var expectationPairs = [
//     'restock protein 100',
//     'restock carbohydrate 100',
//     'restock fat 100',
//     'restock flavour 100',
//     'report',
//     'prepare burger 2',
//     'report',
//     'prepare burger 1',
//     'report',
// ];
// let manager = solve();
//
// for (const command of expectationPairs) {
//     console.log(manager(command));
// }