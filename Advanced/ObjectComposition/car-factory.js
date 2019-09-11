function carFactory(carData) {

    let engineList = {
        smallEngine: {
            power: 90,
            volume: 1800
        },
        monsterEngine: {
            power: 200,
            volume: 3500
        },
        normalEngine: {
            power: 120,
            volume: 2400
        },
    };

    let carriageList = {
        hatchback: {
            type: "hatchback",
            color: ""
        },
        coupe: {
            type: "coupe",
            color: ""
        }
    };

    let engine;
    if (carData.power <= 90) {
        engine = engineList.smallEngine;
    } else if (carData.power <= 120) {
        engine = engineList.normalEngine;
    } else {
        engine = engineList.monsterEngine;
    }

    let carriage = carriageList[carData.carriage];
    carriage.color = carData.color;

    let wheelSize = +carData.wheelsize;
    if (wheelSize % 2 === 0) {
        wheelSize = Math.round(wheelSize - 1);
    }
    let wheels = [wheelSize, wheelSize, wheelSize, wheelSize];
    let model = carData.model;

    return {
        model: model,
        engine: engine,
        carriage: carriage,
        wheels: wheels,
    };
}

// console.log(carFactory({ model: 'VW Golf II',
//     power: 90,
//     color: 'blue',
//     carriage: 'hatchback',
//     wheelsize: 14 }
//
// ));