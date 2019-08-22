function plasmaGiants(inputArray, cutSize) {
    let halfSize = inputArray.length / 2;

    let firstHalf = inputArray.slice(0, halfSize);
    let secondHalf = inputArray.slice(halfSize);

    let firstGiant = createGiant(firstHalf, cutSize);
    let secondGiant = createGiant(secondHalf, cutSize);


    let threshold = inputArray[0];
    let damage = inputArray[0];

    for (const element of inputArray) {
        let value = element;
        if (value < damage) {
            damage = value;
        }
        if (value > threshold) {
            threshold = value;
        }
    }

    let firstGiantHP = getGiantHP(firstGiant);
    let secondGiantHP = getGiantHP(secondGiant);

    let rounds = 1;
    while (firstGiantHP > threshold && secondGiantHP > threshold) {
        firstGiantHP -= damage;
        secondGiantHP -= damage;
        rounds++;
    }
    let output = "";

    if (firstGiantHP < secondGiantHP) {
        output = `Second Giant defeated First Giant with result ${secondGiantHP} - ${firstGiantHP} in ${rounds} rounds`;
    } else if (firstGiantHP > secondGiantHP) {
        output = `First Giant defeated Second Giant with result ${firstGiantHP} - ${secondGiantHP} in ${rounds} rounds`;
    } else {
        output = `Its a draw ${firstGiantHP} - ${secondGiantHP}`;
    }
    console.log(output);

    function createGiant(array, cutSize) {
        let giant = [];

        for (let i = 0; i < array.length; i += cutSize) {
            let component = array.slice(i, i + cutSize);
            giant.push(component);
        }
        return giant;
    }

    function getGiantHP(giant) {
        let hp = 0;
        for (let i = 0; i < giant.length; i++) {
            let componentHP = 1;
            for (let j = 0; j < giant[i].length; j++) {
                componentHP *= giant[i][j];
            }
            hp += componentHP;
        }
        return hp;
    }
}



