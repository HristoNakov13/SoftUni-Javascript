import {eventHandlers} from "./btn-event-handlers.js";

function attachEvents() {
    document.addEventListener("click", function (event) {
        let clickedTarget = event.target;

        if (canTriggerEvent(clickedTarget)) {
            eventHandlers[clickedTarget.value](event);
        }
    });

    function canTriggerEvent(target) {
        let targetType = target.getAttribute("type");

        if (target.tagName !== "INPUT" || targetType !== "button") {
            return false;
        }

        return typeof eventHandlers[target.value] === "function";
    }
}

attachEvents();