import { partials, setSessionData } from "./helpers.js";
import { requester } from "../http-requests.js";

export function loadProfilePage(ctx) {
    setSessionData(ctx);
    requester.get("user", `${sessionStorage.getItem("userID")}`)
        .then(userData => {
            ctx.userData = userData;
            ctx.loadPartials(partials).partial("./view/profile/profilePage.hbs");
        }).catch(console.error);
}