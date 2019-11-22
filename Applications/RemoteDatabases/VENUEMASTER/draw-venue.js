import {CONFIRMATION_TEMPLATE} from "./templates/confirmation-template.js";
import {VENUE_TEMPLATE} from "./templates/venue-template.js";

//I think just having them as templates and filling them with required info
//is much better than creating elements from scratch since the volume
//of elements is so huge

export function drawVenue(venueData) {
    let venueElement = document.createElement("div");
    venueElement.setAttribute("class", "venue");
    venueElement.setAttribute("id", venueData._id);

    venueElement.innerHTML = VENUE_TEMPLATE;

    //fug
    //setting textContent or innerHtml removes the more info button inside the venue name span

    venueElement.querySelector(".venue-name").innerHTML = venueData.name + `${venueElement.querySelector(".venue-name").innerHTML}`;
    venueElement.querySelector(".venue-price").textContent = `${venueData.price} lv`;

    venueElement.querySelector(".description").textContent = venueData.description;
    venueElement.querySelectorAll(".description")[1].textContent = `Starting time: ${venueData.startingHour}`;

    return venueElement;
}

export function drawConfirmationBlock(cartData) {
    let confirmationElement = document.createElement("span");
    confirmationElement.innerHTML = CONFIRMATION_TEMPLATE;

    confirmationElement.querySelectorAll("span")[1].textContent = cartData.name;

    let ticketQuantityEl = confirmationElement.querySelectorAll("span")[2];
    ticketQuantityEl.setAttribute("data-id", cartData.quantity);
    ticketQuantityEl.setAttribute("id", "quantity");
    ticketQuantityEl.textContent = `${cartData.quantity} x ${cartData.price}`;

    confirmationElement.querySelectorAll("span")[3].textContent = `Total: ${(cartData.quantity * cartData.price).toFixed(2)} lv`;

    return confirmationElement;
}