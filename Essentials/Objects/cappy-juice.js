function calculateBottles(juices) {
    let allJuicesQuantity = {};
    let formedBottles = {};

    for (const data of juices) {
        let juiceData = data.split(" => ");

        let juiceName = juiceData[0];
        let quantity = Number(juiceData[1]);

        if (allJuicesQuantity[juiceName]) {
            allJuicesQuantity[juiceName] += quantity;
        } else {
            allJuicesQuantity[juiceName] = quantity;
        }

        if (allJuicesQuantity[juiceName] >= 1000) {
            let amount = allJuicesQuantity[juiceName];
            if (formedBottles[juiceName]) {
                formedBottles[juiceName] += Math.floor(amount / 1000);
            } else {
                formedBottles[juiceName] = Math.floor(amount / 1000);
            }
            allJuicesQuantity[juiceName] %= 1000;
        }
    }

   for (const juice in formedBottles) {
       let print = `${juice} => ${formedBottles[juice]}`;
       console.log(print);
   }
}

calculateBottles(['Kiwi => 234',
    'Pear => 2345',
    'Watermelon => 3456',
    'Kiwi => 4567',
    'Pear => 5678',
    'Watermelon => 6789']

);