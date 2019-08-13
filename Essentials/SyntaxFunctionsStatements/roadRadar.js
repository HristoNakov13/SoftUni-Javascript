function detectSpeeding(array) {
    const RESIDENTIAL_LIMIT = 20;
    const CITY_LIMIT = 50;
    const INTERSTATE_LIMIT = 90;
    const MOTORWAY_LIMIT = 130;

    let limitTable = {
        "residential": RESIDENTIAL_LIMIT,
        "city": CITY_LIMIT,
        "interstate": INTERSTATE_LIMIT,
        "motorway": MOTORWAY_LIMIT
    };

    let speed = Number(array[0]);
    let area = array[1];
    let limit = limitTable[area];

    if (speed > limit) {
        let overLimitBy = speed - limit;
        let output = "";

        if (overLimitBy > 40) {
            output = "reckless driving";
        } else if (overLimitBy > 20) {
            output = "excessive speeding";
        } else {
            output = "speeding";
        }
        console.log(output);
    }
}
