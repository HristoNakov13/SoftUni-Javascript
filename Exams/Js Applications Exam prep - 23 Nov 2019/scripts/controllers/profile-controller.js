import { requester } from "../http-requests.js";
import { partials, setSessionData } from "./helpers.js";

export function loadProfile(ctx) {
    setSessionData(ctx);

    requester.get("appdata", "events", "Kinvey")
        .then(events => {
            const userMadeEvents =
                events.filter(event => event._acl.creator === ctx.userID)
                    .map(event => event.name);

            ctx.madeEventsCount = userMadeEvents.length;
            ctx.events = userMadeEvents;

            ctx.loadPartials(partials).partial("./view/profile/profile.hbs");
        })
}