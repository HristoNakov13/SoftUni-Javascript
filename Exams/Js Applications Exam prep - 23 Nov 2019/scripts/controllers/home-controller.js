import { requester } from "../http-requests.js";
import { partials, setSessionData } from "./helpers.js";


export function loadHomePage(ctx) {
    setSessionData(ctx);

    if (ctx.isLogged) {
        partials["displayAllEvents"] = "./view/home/displayAllEvents.hbs";
        partials["noEventsFound"] = "./view/home/noEventsFound.hbs";

        requester.get("appdata", "events", "Kinvey")
            .then(events => {
                ctx.events = events;
                ctx.loadPartials(partials).partial("./view/home/home.hbs");
            });
    } else {
        partials["guestPage"] = "./view/home/guestPage.hbs";
        ctx.loadPartials(partials).partial("./view/home/home.hbs");
    }
}
