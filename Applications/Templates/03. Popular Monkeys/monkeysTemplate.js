import {monkeys} from "./monkeys.js";
function onLoad() {
    const monkeyList = document.getElementById("monkeyList");

    fetch("http://localhost:63342/untitled1/03.%20Popular%20Monkeys/monkey.hbs")
        .then(response => response.text())
        .then(displayAllMonkeys)
        .catch(console.error);

    function displayAllMonkeys(source) {
        const monkeyTemplate = Handlebars.compile(source);
        
        monkeys.forEach(monkey => {
            let monkeyHTML = monkeyTemplate(monkey);
            monkeyList.innerHTML += monkeyHTML;
        });
        
        return source;
    }
    
    document.addEventListener("click", function (event) {
        let clickedTarget = event.target;

        if (clickedTarget.tagName !== "BUTTON") {
            return;
        }

        let monkeyID = clickedTarget.getAttribute("data-id");
        let monkeyDetails = document.getElementById(monkeyID);

        if (monkeyDetails.style.display === "none") {
            clickedTarget.textContent = "HIDE";
            monkeyDetails.style.display = "block";
        } else {
            clickedTarget.textContent = "INFO";
            monkeyDetails.style.display = "none";
        }
    });
}

onLoad();