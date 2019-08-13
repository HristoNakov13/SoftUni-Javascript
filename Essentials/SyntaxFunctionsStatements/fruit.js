function constructFruitMessage(fruit, weight, money) {
    let weightInKilograms = (weight / 1000);
    let moneyNeeded = (money * weightInKilograms).toFixed(2);

    console.log(`I need $${moneyNeeded} to buy ${weightInKilograms.toFixed(2)} kilograms ${fruit}.`)
}
