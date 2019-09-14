function getInfo() {
    const ERROR_MESSAGE  = "Error!";
    let busStopInput = document.getElementById("stopId");
    let input = busStopInput.value;
    let url = `https://judgetests.firebaseio.com/businfo/${input}.json `;

    let bustStopNameElement = document.getElementById("stopName");
    console.log(bustStopNameElement);
    let busesListElement = document.getElementById("buses");

    fetch(url)
        .then(info => info.json())
        .then(data => {
            let busStopName = data.name;
            bustStopNameElement.textContent = busStopName;

            let buses = data.buses;
            clearBusStop(busesListElement);
            setBuses(buses, busesListElement);
        })
        .catch(error => {
            bustStopNameElement.textContent = ERROR_MESSAGE;
        });

    function clearBusStop(busStop) {
        busStop.innerHTML = "";
    }

    function setBuses(buses, busStop) {
        for (const bus in buses) {
            let arrivesIn = buses[bus];
            let textRepresentation = `Bus ${bus} arrives in ${arrivesIn} minutes.`

            let currentBusListElement = document.createElement("li");
            currentBusListElement.textContent = textRepresentation;
            busStop.appendChild(currentBusListElement);
        }
    }

}