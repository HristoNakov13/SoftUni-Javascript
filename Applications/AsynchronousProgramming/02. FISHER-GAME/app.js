//cloning the example catch and using it as a template to build and display the incoming requested catches
//instead of drawing a new one from scratch. Setting the catches node innerHTML as empty string to remove the example element onLoad.
const EMPTY_DB = "No catches found!";
const DB_URL = "https://fisher-game.firebaseio.com/catches.json";
const CATCH_TEMPLATE = document.getElementById("catches").querySelectorAll(".catch")[0].cloneNode(true);
const catchesParent = document.getElementById("catches");

catchesParent.innerHTML = "";

async function loadCatchesHandler() {
    await fetch(DB_URL)
        .then(response => response.json())
        .then(displayCatches)
        .catch(handleError);
}

function handleError(error) {
    if (error.message === EMPTY_DB) {
        displayNoCatchesFound(error.message);
    } else {
        console.error(error);
    }
}

function displayNoCatchesFound(message) {
    let noCatchesElement = document.createElement("span");
    noCatchesElement.textContent = message;
    catchesParent.innerHTML = noCatchesElement.innerHTML;
}

function displayCatches(catches) {
    catchesParent.innerHTML = "";

    if (catches === null) {
        throw new Error(EMPTY_DB);
    }

    let IDs = Object.keys(catches);
    let fragment = document.createDocumentFragment();

    IDs.forEach(id => {
        let catchElement = buildCatch(catches[id], id);
        fragment.appendChild(catchElement);
    });

    catchesParent.appendChild(fragment);
}

function buildCatch(fishCatch, id) {
    let catchElement = CATCH_TEMPLATE.cloneNode(true);

    catchElement.querySelector(".angler").value = fishCatch.angler;
    catchElement.querySelector(".weight").value = fishCatch.weight;
    catchElement.querySelector(".species").value = fishCatch.species;
    catchElement.querySelector(".location").value = fishCatch.location;
    catchElement.querySelector(".bait").value = fishCatch.bait;
    catchElement.querySelector(".captureTime").value = fishCatch.captureTime;

    catchElement.setAttribute("data-id", id);

    let updateBtn = catchElement.querySelector(".update");
    updateBtn.addEventListener("click", updateCatchHandler);

    let deleteBtn = catchElement.querySelector(".delete");
    deleteBtn.addEventListener("click", deleteCatchHandler);

    return catchElement;
}

async function updateCatchHandler(event) {
    let clickedCatch = event.target.parentNode;
    let updatedCatch = extractCatchDataFromElement(clickedCatch);

    if (!isValidCatch(updatedCatch)) {
        return;
    }

    let catchID = clickedCatch.getAttribute("data-id");

    let header = buildHeader("PUT", updatedCatch);
    let catchURL = buildCatchURL(catchID);

    await fetch(catchURL, header)
        .then(loadCatchesHandler)
        .catch(handleError);
}

async function deleteCatchHandler(event) {
    let clickedCatch = event.target.parentNode;
    let catchID = clickedCatch.getAttribute("data-id");
    let catchURL = buildCatchURL(catchID);
    let header = buildHeader("DELETE");

    await fetch(catchURL, header)
        .then(() => {})
        .catch(handleError);

    catchesParent.removeChild(clickedCatch);
}

function isValidCatch(fishCatch) {
    return fishCatch.angler !== "" && fishCatch.weight !== ""
        && fishCatch.species !== "" && fishCatch.location !== ""
        && fishCatch.bait !== "" && fishCatch.captureTime !== "";
}

function buildHeader(methodName, bodyObj) {
    return {
        method: methodName,
        body: JSON.stringify(bodyObj),
        headers: {"Content-Type": "application/json"}
    };
}

const ROOT_URL = "https://fisher-game.firebaseio.com/";

function buildCatchURL(catchID) {
    return `${ROOT_URL}/catches/${catchID}.json`;
}

const catchInputForms = document.getElementById("addForm");

function addCatchHandler() {
    let catchData = extractCatchDataFromElement(catchInputForms);

    if (!isValidCatch(catchData)) {
        return;
    }

    let header = buildHeader("POST", catchData);

    fetch(DB_URL, header)
        .then(loadCatchesHandler)
        .catch(handleError);
}

function extractCatchDataFromElement(element) {
    return {
        angler: element.querySelector(".angler").value,
        weight: element.querySelector(".weight").value,
        species: element.querySelector(".species").value,
        location: element.querySelector(".location").value,
        bait: element.querySelector(".bait").value,
        captureTime: element.querySelector(".captureTime").value,
    };
}

let loadBtn = document.querySelector(".load");
let addBtn = document.querySelector(".add");

function attachEvents() {
    loadBtn.addEventListener("click", loadCatchesHandler);
    addBtn.addEventListener("click", addCatchHandler);
}

attachEvents();