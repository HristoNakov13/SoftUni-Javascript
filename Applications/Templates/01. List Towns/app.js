function attachEvents() {
    const townsInputEl = document.getElementById("towns");
    const loadTownsBtn = document.getElementById("btnLoadTowns");
    const townsList = document.getElementById("root");

    loadTownsBtn.addEventListener("click", async function () {
        const source = await fetch("http://localhost:63342/untitled1/01.%20List%20Towns/towns.hbs")
            .then(response => response.text());

        const input = {
            towns: townsInputEl.value.split(", ")
        };

        const template = Handlebars.compile(source);

        townsList.innerHTML = template(input);
        townsInputEl.value = "";
    });
}

attachEvents();