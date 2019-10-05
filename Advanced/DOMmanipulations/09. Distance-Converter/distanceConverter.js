function attachEventsListeners() {
    const toMetersRates = {
        km: 1000,
        m: 1,
        cm: 0.01,
        mm: 0.001,
        mi: 1609.34,
        yrd: 0.9144,
        ft: 0.3048,
        in: 0.0254,
    };

    const ELEMENTS = {
        input: document.querySelector("#inputDistance"),
        convertBtn: document.querySelector("#convert"),
        inputUnit:  document.querySelector("#inputUnits"),
        outputUnit: document.querySelector("#outputUnits"),
        convertResult: document.querySelector("#outputDistance"),
    };

    function convertHandler() {
        let input = Number(ELEMENTS.input.value);
        if (Number.isNaN(input)) {
            ELEMENTS.convertResult.value = "NaN";
            return;
        }

        let convertFrom = ELEMENTS.inputUnit.value;
        let convertTo = ELEMENTS.outputUnit.value;

        ELEMENTS.convertResult.value = convertValue(input, convertFrom, convertTo, toMetersRates);
    }

    function convertValue(value, convertFrom, convertTo, toMetersRates) {
        let result = value * toMetersRates[convertFrom]
            / toMetersRates[convertTo];
        return result;
    }

    ELEMENTS.convertBtn.addEventListener("click", convertHandler);
}