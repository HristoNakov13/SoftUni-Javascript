function solve() {
    let busSchedule = `https://judgetests.firebaseio.com/schedule/depot.json`;
    let currentStop;
    fetch(busSchedule)
        .then(info => info.json())
        .then(data => currentStop = data);

    let statusInfoElement = document.getElementById("info")
        .getElementsByClassName("info")[0];
    let arriveBtn = document.getElementById("arrive");
    let departBtn = document.getElementById("depart");

    function depart() {
        departBtn.disabled = true;
        let nextStop = `Next stop ${currentStop.name}`;
        statusInfoElement.textContent = nextStop;
        arriveBtn.disabled = false;
    }

    function arrive() {
       arriveBtn.disabled = true;
       let arrivingAtStop = `Arriving at ${currentStop.name}`;
       statusInfoElement.textContent = arrivingAtStop;

       let nextStop = currentStop.next;
       let nextStopFetch = `https://judgetests.firebaseio.com/schedule/${nextStop}.json`;

        fetch(nextStopFetch)
            .then(info => info.json())
            .then(data => currentStop = data);
        departBtn.disabled = false;
    }
    return {
        depart,
        arrive
    };
}

let result = solve();