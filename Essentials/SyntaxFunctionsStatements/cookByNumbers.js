function cook(array) {
    let number = Number(array[0]);

    for (let i = 1; i < array.length; i++) {
        let operation = array[i];

        switch (operation) {
            case "chop":
                number /= 2;
                break;
            case "dice":
                number = Math.sqrt(number);
                break;
            case "spice":
                number++;
                break;
            case "bake":
                number *= 3;
                break;
            case "fillet":
                number *= 0.8;
                break;
        }
        if (number > Math.floor(number)) {
            number = number.toFixed(1);
        }
        console.log(number);
    }
}
