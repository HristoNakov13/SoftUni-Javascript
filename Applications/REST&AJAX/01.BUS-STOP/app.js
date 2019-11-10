const inputElements = {
    stopID: document.querySelector("#stopId"),
    submitBtn: document.querySelector("#submit"),
};

const queryResultElements = {
    stopName: document.querySelector("#stopName"),
    buses: document.querySelector("#buses"),
};

function handleErrors(data) {
    if (data.buses === undefined) {
        throw new Error();
    }

    return data;
}

function displaySchedules(busStop) {
    queryResultElements.stopName.textContent = busStop.name;
    queryResultElements.buses.innerHTML = "";

    for (const bus in busStop.buses) {
        let busElement = document.createElement("li");
        busElement.textContent = `Bus ${bus} arrives in ${busStop.buses[bus]}`;

        queryResultElements.buses.appendChild(busElement);
    }

    return busStop;
}

function catchInvalidID(error) {
    queryResultElements.stopName.textContent = "Error";
    queryResultElements.buses.innerHTML = "";
}

function getInfo() {
    const stopId = inputElements.stopID.value;
    let fetchURL = `https://judgetests.firebaseio.com/businfo/${stopId}.json`;

    fetch(fetchURL)
        .then(response => response.json())
        .then(handleErrors)
        .then(displaySchedules)
        .catch(catchInvalidID);
}