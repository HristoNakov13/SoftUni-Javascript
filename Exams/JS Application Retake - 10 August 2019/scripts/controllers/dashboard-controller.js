import { partials, setSessionData } from "./helpers.js";
import { requester } from "../http-requester/http-requests.js";

export function loadDashBoard(ctx) {
    setSessionData(ctx);

    requester.get("appdata", "causes", "Kinvey")
        .then(allCauses => {
            ctx.causes = allCauses;
            ctx.loadPartials(partials).partial("./view/dashboard/dashboardPage.hbs");
        }).catch(console.error);

}