function solve() {
    let stringElement = document.getElementById("string");
    let textElement = document.getElementById("text");

    let keyword = stringElement.value;
    let input = textElement.value;

    let messagePattern = `${keyword}(.+)${keyword}`;
    let messageRegEx = new RegExp(messagePattern, "g");

    let message = messageRegEx.exec(input)[1];

    let coordinatesPattern = /(north|east).*?(\d{2})[^,]*?,[^,]*?(\d{6})/gmi;
    // let coordinatesRegEx = new RegExp(coordinatesPattern, "gmi");

    let coordinates = coordinatesPattern.exec(input);
    let east, north;

    while (coordinates !== null) {
        if (coordinates[1].toLocaleLowerCase().localeCompare("north")) {
            north = coordinates;
        } else {
            east = coordinates;
        }
        coordinates = coordinatesPattern.exec(input);
    }

    let northParagraph = document.createElement("p");
    northParagraph.innerHTML = `${north[2]}.${north[3]} N`;

    let eastParagraph = document.createElement("p");
    eastParagraph.innerHTML = `${east[2]}.${east[3]} E`;

    let messageParagraph = document.createElement("p");
    messageParagraph.innerHTML = `Message: ${message}`;

    let resultSpan = document.getElementById("result");
    resultSpan.appendChild(northParagraph);
    resultSpan.appendChild(eastParagraph);
    resultSpan.appendChild(messageParagraph);
}
