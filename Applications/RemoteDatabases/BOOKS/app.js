import {eventHandlers} from "./btn-event-handlers.js";

function attachEvents() {
    clearBookList();

    document.addEventListener("click",function (event) {
        if (event.target.tagName === "BUTTON") {
            let buttonType = event.target.textContent;
            eventHandlers[buttonType](event);
        }
    });
}

function clearBookList() {
    let booksList = document.getElementById("booksList").querySelector("tbody");
    booksList.innerHTML = "";
}

attachEvents();




