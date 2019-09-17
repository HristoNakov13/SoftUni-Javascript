function attachEvents() {

    let submitBtn = document.getElementById("submit");
    let forecastElement = document.getElementById("forecast");

    submitBtn.addEventListener("click", loadWeatherForLocation);

    let symbols = {
        "Sunny": "☀",
        "Partly sunny": "⛅",
        "Overcast": "☁",
        "Rain": "☂",
        "Degrees": "°",
    };

    function loadWeatherForLocation() {
        forecastElement.style.display = "block";
        let url = `https://judgetests.firebaseio.com/locations.json`;

        fetch(url)
            .then(response => response.json())
            .then(loadLocationWeather);

    }

    function loadLocationWeather(data) {
        let locationInput = document.getElementById("location").value;
        let locationCode = getLocationCode(data, locationInput);

        let todayWeatherURL = `https://judgetests.firebaseio.com/forecast/today/${locationCode}.json`;
        displayTodayWeather(todayWeatherURL);

        let forecastURL = `https://judgetests.firebaseio.com/forecast/upcoming/${locationCode}.json`;
        displayThreeDayForecast(forecastURL);
    }

    function displayThreeDayForecast(threeDayForeCastURL) {
        fetch(threeDayForeCastURL)
            .then(response => response.json())
            .then(createThreeDayForecast)
    }

    function createThreeDayForecast(data) {
        let forecastDiv = document.createElement("div");
        forecastDiv.className = "forecast-info";

        for (const day of data.forecast) {
            let upcomingSpan = document.createElement("span");
            upcomingSpan.className = "upcoming";

            let symbolSpan = document.createElement("span");
            symbolSpan.className = "symbol";
            symbolSpan.textContent = symbols[day.condition];

            let lowHighTemperatureSpan = document.createElement("span");
            lowHighTemperatureSpan.className = "forecast-data";
            let degreesSymbol = symbols["Degrees"];
            lowHighTemperatureSpan.textContent = `${day.low}${degreesSymbol}/${day.high}${degreesSymbol}`;

            let conditionSpan = document.createElement("span");
            conditionSpan.className = "forecast-data";
            conditionSpan.textContent = day.condition;

            upcomingSpan.appendChild(symbolSpan);
            upcomingSpan.appendChild(lowHighTemperatureSpan);
            upcomingSpan.appendChild(conditionSpan);

            forecastDiv.appendChild(upcomingSpan);
        }

        let upcomingDiv = document.getElementById("upcoming");
        upcomingDiv.appendChild(forecastDiv);
    }

    function getLocationCode(locations, input) {
        let found = locations.filter(location => location.name === input)[0];

        return found.code;
    }

    function displayTodayWeather(url) {
        fetch(url)
            .then(response => response.json())
            .then(createElements);
    }

    function createElements(data) {
        let forecastsDiv = document.createElement("div");
        forecastsDiv.className = "forecasts";

        let conditionSymbolSpan = document.createElement("span");
        let symbol = data.forecast.condition;
        conditionSymbolSpan.textContent = symbols[symbol];
        conditionSymbolSpan.className = "condition symbol";
        forecastsDiv.appendChild(conditionSymbolSpan);

        let conditionSpan = document.createElement("span");
        conditionSpan.className = "condition";

        let locationSpan = document.createElement("span");
        locationSpan.textContent = data.name;
        locationSpan.className = "forecast-data";

        let highLowTemperatureSpan = document.createElement("span");
        let degreeSymbol = symbols["Degrees"];
        highLowTemperatureSpan.textContent = `${data.forecast.low}${degreeSymbol}/${data.forecast.high}${degreeSymbol}`;
        highLowTemperatureSpan.className = "forecast-data";

        let conditionAsStringSpan = document.createElement("span");
        conditionAsStringSpan.textContent = data.forecast.condition;
        conditionAsStringSpan.className = "forecast-data";

        conditionSpan.appendChild(locationSpan);
        conditionSpan.appendChild(highLowTemperatureSpan);
        conditionSpan.appendChild(conditionAsStringSpan);

        forecastsDiv.appendChild(conditionSpan);

        let currentConditionElement = document.getElementById("current");
        currentConditionElement.appendChild(forecastsDiv);
    }
}

attachEvents();