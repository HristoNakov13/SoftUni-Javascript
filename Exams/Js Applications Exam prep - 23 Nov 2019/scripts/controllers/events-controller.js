import { requester } from "../http-requests.js";
import { partials, setSessionData } from "./helpers.js";

const VIEW_PATHS = {
    organize: "./view/events/organize.hbs",
    details: "./view/events/details.hbs",
    edit: "./view/events/edit.hbs",
}

function getOrganize(ctx) {
    setSessionData(ctx);

    ctx.loadPartials(partials).partial(VIEW_PATHS.organize);
}

function postOrganize(ctx) {
    const { dateTime, description, imageURL, name } = ctx.params;

    const event = {
        dateTime,
        description,
        imageURL,
        name,
        organizer: sessionStorage.getItem("username"),
        peopleInterestedIn: 0,
    };

    requester.post("appdata", "events", event, "Kinvey")
        .then(eventData => {
            ctx.redirect("#/");
        });
}

function eventDetails(ctx) {
    setSessionData(ctx);

    const eventID = ctx.params.id;

    requester.get("appdata", `events/${eventID}`, "Kinvey")
        .then(eventData => {
            console.log(eventData);
            ctx.event = eventData;
            ctx.isCreator = eventData._acl.creator === sessionStorage.getItem("userID");

            ctx.loadPartials(partials).partial(VIEW_PATHS.details);
        }).catch(console.error);
}

function getEditEvent(ctx) {
    setSessionData(ctx);

    const eventID = ctx.params.id;

    requester.get("appdata", `events/${eventID}`, "Kinvey")
        .then(eventData => {
            ctx.event = eventData;

            ctx.loadPartials(partials).partial(VIEW_PATHS.edit);
        }).catch(console.error);
}

function postEditEvent(ctx) {
    const eventID = ctx.params.id;
    const { name, dateTime, description, imageURL } = ctx.params;

    requester.get("appdata", `events/${eventID}`, "Kinvey")
        .then(eventData => {
            eventData.name = name;
            eventData.dateTime = dateTime;
            eventData.description = description;
            eventData.imageURL = imageURL;

            requester.put("appdata", `events/${eventID}`, eventData, "Kinvey")
                .then(editedEventData => {
                    ctx.redirect(`#/events/${editedEventData._id}`);
                });
        }).catch(console.error);
}

function closeEvent(ctx) {
    const eventID = ctx.params.id;

    if (confirm("Are you sure you want to close this event?")) {
        requester.del("appdata", `events/${eventID}`, "Kinvey")
            .then(response => {
                ctx.redirect("#/");
            })
    } else {
        history.back();
    }
}

function joinEvent(ctx) {
    const eventID = ctx.params.id;

    requester.get("appdata", `events/${eventID}`, "Kinvey")
        .then(eventData => {
            eventData.peopleInterestedIn++;
            console.log(eventData.peopleInterestedIn);
            requester.put("appdata", `events/${eventID}`, eventData, "Kinvey")
                .then(response => {
                    ctx.redirect(`#/events/${eventID}`);
                });
        }).catch(console.error);
}

export const eventsController = {
    getOrganize,
    postOrganize,
    eventDetails,
    getEditEvent,
    postEditEvent,
    closeEvent,
    joinEvent,
}