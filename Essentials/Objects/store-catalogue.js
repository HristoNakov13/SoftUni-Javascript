function sortCatalogue(input) {
    let sorted = input.sort((item1, item2) => {
        let item1Name = item1.split(" : ")[0].toLowerCase();
        let item2Name = item2.split(": ")[0].toLowerCase();
        return item1Name.localeCompare(item2Name);
    });
    let catalogue = {};
    for (const item of sorted) {
        let split = item.split(" : ");
        let itemName = split[0];
        let price = +split[1];

        if (!catalogue[itemName[0]]) {
            catalogue[itemName[0]] = true;
            console.log(itemName[0]);
        }
        console.log(`  ${itemName}: ${price}`);
    }
}

sortCatalogue(['Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10']
);