function solve() {
    const arriveBtn = document.querySelector("#arrive");
    const departBtn = document.querySelector("#depart");
    const stopInfo = document.querySelector("#info");

    let currentStopID = "depot";
    let stopName;

    function handleErrors(data) {
        if (data.name === undefined) {
            throw new Error();
        }

        return data;
    }
    
    function busDepart(data) {
        stopName = data.name;
        stopInfo.textContent = `Next stop ${stopName}`;
        currentStopID = data.next;

        arriveBtn.disabled = false;

        return data;
    }

    function catchErrors(error) {
        stopInfo.textContent = "Error";

        departBtn.disabled = true;
        arriveBtn.disabled = true;
    }

    function depart() {
        departBtn.disabled = true;
        let fetchURL = `https://judgetests.firebaseio.com/schedule/${currentStopID}.json`;

        fetch(fetchURL)
            .then(response => response.json())
            .then(handleErrors)
            .then(busDepart)
            .catch(catchErrors);
    }

    function arrive() {
        stopInfo.textContent = `Arriving at ${stopName}`;
        arriveBtn.disabled = true;
        departBtn.disabled = false;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();