function vendingMachine(array) {

    let totalIncome = 0;
    for (const order of array) {
       totalIncome += processOrder(order);
    }
    console.log(`Income Report: $${totalIncome.toFixed(2)}`);

    function processOrder(order) {
        let orderParse = order.split(", ");

        let insertedMoney = Number(orderParse[0]);
        let drink = orderParse[1];
        let price = 0.8;

        if ("decaf" === orderParse[2]) {
            price += 0.1;
        }

        if ("milk" === orderParse[3] || "milk" === orderParse[2]) {
            price += 0.1;
        }

        let sugarCount = orderParse[orderParse.length - 1];
        if (sugarCount <= 5 && sugarCount > 0){
            price += 0.1;
        }

        let output;
        let income = 0;

        if (insertedMoney >= price) {
            income = price;
            let change = insertedMoney - price;

            output = `You ordered ${drink}. Price: $${price.toFixed(2)} Change: $${change.toFixed(2)}`;
        } else {
            let moneyNeeded = price - insertedMoney;
            output = `Not enough money for ${drink}. Need $${moneyNeeded.toFixed(2)} more.`
        }
        console.log(output);
        return income;
    }
}
