const searchLocElement = document.getElementById("location");
const LOCATIONS_DB_URL = "https://judgetests.firebaseio.com/locations.json";

const WEATHER_SYMBOLS = {
    Sunny: "☀",
    "Partly sunny": "⛅",
    Rain: "☂",
    Overcast: "☁",
    Degrees: "°",
};

const forecastElements = {
    currentConditions: document.getElementById("current"),
    upcoming: document.getElementById("upcoming"),
};

const forecastParent = document.getElementById("forecast");

const forecastData = {
    locations: fetchData.bind(undefined, undefined, undefined, LOCATIONS_DB_URL),
    currentConditions: fetchData.bind(undefined, undefined, undefined),
    upcoming: fetchData.bind(undefined, undefined, undefined),
};

async function getWeatherHandler() {
    forecastParent.style.display = "block";
    clearForecast();

    let searchedLocation = searchLocElement.value;
    let supportedLocations = await forecastData.locations();

    let location = supportedLocations.find(location => location.name === searchedLocation);

    if (!isValidLocation(location)) {
        displayInvalidLocation(searchedLocation);
        return;
    }

    let currentConditionsURL = makeCurrentConditionURL(location.code);
    let currentConditions = await forecastData.currentConditions(currentConditionsURL);

    let upcomingURL = makeUpcomingURL(location.code);
    let upcoming = await forecastData.upcoming(upcomingURL);

    displayForecast(currentConditions, upcoming);
}

function displayInvalidLocation(location) {
    let wrapper = document.createElement("div");
    let invalidLocationElement = document.createElement("span");
    invalidLocationElement.textContent = `${location} is not a valid city.`;

    wrapper.appendChild(invalidLocationElement);
    forecastElements.currentConditions.appendChild(wrapper);
}

function displayForecast(currentConditions, upcoming) {
    let conditionsWrapper = drawCurrentConditions(currentConditions);
    forecastElements.currentConditions.appendChild(conditionsWrapper);

    let upcomingWrapper = drawUpcoming(upcoming);
    forecastElements.upcoming.appendChild(upcomingWrapper);
}

//can set innerHTML as empty string for faster performance
//but if done so it removes the child elements "Current Conditions" and "Three-day forecasts"

function clearForecast() {
    // forecastElements.currentConditions.innerHTML = "";
    // forecastElements.upcoming.innerHTML = "";

    forecastElements.currentConditions.querySelectorAll("*")
        .forEach(element => {
            if (element.className !== "label") {
                element.remove();
            }
        });

    forecastElements.upcoming
        .querySelectorAll("*")
        .forEach(element => {
            if (element.className !== "label") {
                element.remove();
            }
        });
}

function drawUpcoming(upcoming) {
    const UPCOMING_TAG_NAME = "span";
    const FORECAST_DATA_CLASS_NAME = "forecast-data";

    let parent = createElement("div", "forecast-info");

    for (const day of upcoming.forecast) {
        let conditionSymbol = createElement(UPCOMING_TAG_NAME, "symbol", WEATHER_SYMBOLS[day.condition]);

        let degrees = createElement(UPCOMING_TAG_NAME, FORECAST_DATA_CLASS_NAME);
        degrees.textContent = `${day.low}${WEATHER_SYMBOLS.Degrees}/${day.high}${WEATHER_SYMBOLS.Degrees}`;

        let condition = createElement(UPCOMING_TAG_NAME, FORECAST_DATA_CLASS_NAME, day.condition);

        let dayWrapper = createElement(UPCOMING_TAG_NAME, "upcoming");
        dayWrapper.appendChild(conditionSymbol);
        dayWrapper.appendChild(degrees);
        dayWrapper.appendChild(condition);

        parent.appendChild(dayWrapper);
    }

    return parent;
}

function drawCurrentConditions(currentConditions) {
    const FORECAST_TAG_NAME = "span";
    const FORECAST_CLASS_NAME = "forecast-data";

    let conditionSymbol = createElement(FORECAST_TAG_NAME, "condition symbol", WEATHER_SYMBOLS[currentConditions.forecast.condition]);
    let location = createElement(FORECAST_TAG_NAME, FORECAST_CLASS_NAME, currentConditions.name);

    let degrees = createElement(FORECAST_TAG_NAME, FORECAST_CLASS_NAME);
    degrees.textContent = `${currentConditions.forecast.low}${WEATHER_SYMBOLS.Degrees}/${currentConditions.forecast.high}${WEATHER_SYMBOLS.Degrees}`;

    let condition = createElement(FORECAST_TAG_NAME, FORECAST_CLASS_NAME, currentConditions.forecast.condition);

    let conditionWrapper = createElement(FORECAST_TAG_NAME, "condition");
    conditionWrapper.appendChild(location);
    conditionWrapper.appendChild(degrees);
    conditionWrapper.appendChild(condition);

    let wrapper = createElement("div", "forecasts");
    wrapper.appendChild(conditionSymbol);
    wrapper.appendChild(conditionWrapper);

    return wrapper;
}

function createElement(tagName, className, textContent) {
    let element = document.createElement(tagName);
    element.setAttribute("class", className);

    if (textContent !== undefined) {
        element.textContent = textContent;
    }

    return element;
}


const ROOT_URL = "https://judgetests.firebaseio.com/forecast";

function makeCurrentConditionURL(locationCode) {
    return `${ROOT_URL}/today/${locationCode}.json`;
}

function makeUpcomingURL(locationCode) {
    return `${ROOT_URL}/upcoming/${locationCode}.json`
}

function isValidLocation(locationCode) {
    return locationCode !== undefined;
}

function fetchData(handleErr = handleError, parseResp = parseResponse, URL) {
    return fetch(URL)
        .then(handleErr)
        .then(parseResp)
        .catch(console.error);
}

function parseResponse(response) {
    return response.json();
}

function handleError(response) {
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response;
}

const getWeatherBtn = document.getElementById("submit");

function attachEvents() {
    getWeatherBtn.addEventListener("click", getWeatherHandler);
}

attachEvents();