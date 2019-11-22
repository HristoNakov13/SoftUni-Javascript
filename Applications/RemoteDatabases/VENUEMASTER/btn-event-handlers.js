import {requester} from "../http-requests.js";
import {drawConfirmationBlock, drawVenue} from "./draw-venue.js";

const APP_KEY = "kid_BJ_Ke8hZg";

const USER_CREDENTIALS = {
    name: "guest",
    password: "pass",
};

const KINVEY_MODULES = {
    post: "rpc",
    get: "appdata",
};

const END_POINTS = {
    getVenuesByDate: "custom/calendar?query=",
    getVenueData: "venues/",
    confirmPurchase: "custom/purchase?venue="
};

const dateInputElement = document.getElementById("venueDate");
const venuesList = document.getElementById("venue-info");

async function getVenuesByDateHandler() {
    venuesList.innerHTML = "Loading...";
    let searchedDate = dateInputElement.value;
    dateInputElement.value = "";

    let getVenuesURL = buildURL(KINVEY_MODULES.post, END_POINTS.getVenuesByDate, searchedDate);
    let venueIDs;

    try {
        venueIDs = await requester.post(getVenuesURL, USER_CREDENTIALS);
    } catch (error) {
        displayInvalidDate(searchedDate);
        return;
    }

    //making an array of venues info because venueData comes one by one with delay
    //once all the data is received it will be displayed all at once instead of
    //drawing it and displaying it one by one inside the for loop
    //to me it seems for loop is easier to read here. Dont tell Chaov

    let allVenuesData = [];

    for (const ID of venueIDs) {
        let venueURL = buildURL(KINVEY_MODULES.get, END_POINTS.getVenueData, ID);
        let venueData = await requester.get(venueURL, USER_CREDENTIALS);

        allVenuesData.push(venueData);
    }

    let fragment = document.createDocumentFragment();

    allVenuesData.forEach(venueData => {
        let venueElement = drawVenue(venueData);
        fragment.appendChild(venueElement);
    });

    venuesList.innerHTML = "";
    venuesList.appendChild(fragment);
}

function displayInvalidDate(date) {
    venuesList.innerHTML = `No venues available for date <i>${date + ""}</i>`;
}

function moreInfoHandler(event) {
    let clickedVenue = event.target.parentNode.parentNode;
    let venueDetails = clickedVenue.querySelector(".venue-details");

    if (venueDetails.style.display === "block") {
        venueDetails.style.display = "none";
    } else {
        venueDetails.style.display = "block";
    }
}

//hard coded to hell and back. Changing an element and its kaput
//honestly no idea how to implement it better and get the venue ID atm

async function purchaseTicketsHandler(event) {
    let clickedVenue = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;

    let venueID = clickedVenue.getAttribute("id");
    let venueURL = buildURL(KINVEY_MODULES.get, END_POINTS.getVenueData, venueID);

    let venueData = await requester.get(venueURL, USER_CREDENTIALS);

    let ticketQuantity = Number(clickedVenue.querySelector(".quantity").value);

    let cartData = {
        name: venueData.name,
        quantity: ticketQuantity,
        price: Number(venueData.price),
    };

    //made this way it keeps the more info functionality when the confirmation block is being displayed

    clickedVenue.querySelector(".venue-details").innerHTML = drawConfirmationBlock(cartData).innerHTML;
}

//replaces the confirm purchase block with the venue details
//and keeps the state until confirm purchase is clicked

async function confirmPurchaseHandler(event) {
    let clickedVenue = event.target.parentNode.parentNode.parentNode;
    let venueID = clickedVenue.getAttribute("id");
    let ticketQuantity = +event.target.parentNode.querySelector("#quantity").getAttribute("data-id");
    let purchaseDetailsURL = `${venueID}&qty=${ticketQuantity}`;

    let confirmationURL = buildURL(KINVEY_MODULES.post, END_POINTS.confirmPurchase, purchaseDetailsURL);

    let confirmedPurchasePage = await requester.post(confirmationURL, USER_CREDENTIALS);

    venuesList.innerHTML = "You may print this page as your ticket" + confirmedPurchasePage.html;
}

const ROOT_URL = "https://baas.kinvey.com";

function buildURL(module, endpoint, placeHolder) {
    return `${ROOT_URL}/${module}/${APP_KEY}/${endpoint}${placeHolder}`;
}

export const eventHandlers = {
    "List Venues": getVenuesByDateHandler,
    "More info": moreInfoHandler,
    "Purchase": purchaseTicketsHandler,
    "Confirm": confirmPurchaseHandler,
};