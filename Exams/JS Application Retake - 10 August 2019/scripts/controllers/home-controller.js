import { partials, setSessionData } from "./helpers.js";

export function loadHomePage(ctx) {
    setSessionData(ctx);

    ctx.loadPartials(partials).partial("./view/home/homePage.hbs");
}