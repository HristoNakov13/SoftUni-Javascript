import { partials, setSessionData } from "./helpers.js";
import { requester } from "../http-requests.js";

function loadAllOffers(ctx) {
    setSessionData(ctx);

    Handlebars.registerHelper('if_eq', function (a, b, opts) {
        if (a === b) {
            return opts.fn(this);
        }

        return opts.inverse(this);

    });

    //helper for indexing products

    let index = 0;

    Handlebars.registerHelper("increment_index", function () {
        return index++;
    })

    requester.get("appdata", "offers", "Kinvey")
        .then(allOffers => {
            //when handlebars is in the "each" block only ctx.offers.${attributename} are accessible
            //ctx.userID is not and no idea how to make it so other than attachiching to each offer userID attribute

            allOffers.forEach(offer => offer.userID = ctx.userID);

            ctx.offers = allOffers;
            ctx.loadPartials(partials).partial("./view/dashboard/dashboardPage.hbs");
        }).catch(console.error);
}

export const dashboardController = {
    loadAllOffers,
}