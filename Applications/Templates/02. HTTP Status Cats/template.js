(() => {
    const catsSection = document.getElementById("allCats");
    const catsList = document.createElement("ul");

    async function renderCatTemplate() {
        const source = await fetch("http://localhost:63342/untitled1/02.%20HTTP%20Status%20Cats/catTemplate.hbs")
            .then(response => response.text());

        const catTemplate = Handlebars.compile(source);

        window.cats.forEach(cat => {
            let catElement = catTemplate(cat);
            catsList.innerHTML += catElement;
        });

        catsSection.appendChild(catsList);
    }

    renderCatTemplate();

    document.addEventListener("click", function (event) {
        let targetBtn = event.target;

        if (targetBtn.tagName !== "BUTTON" || targetBtn.getAttribute("class") !== "showBtn") {
            return;
        }

        let clickedCatDetails = event.target.parentNode.querySelector(".status");

        if (clickedCatDetails.style.display === "none") {
            targetBtn.textContent = "Hide status code";
            clickedCatDetails.style.display = "block"
        } else {
            targetBtn.textContent = "Show status code";
            clickedCatDetails.style.display = "none";
        }
    });
})();