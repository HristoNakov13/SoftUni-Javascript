import { partials, setSessionData } from "./helpers.js";
import { requester } from "../http-requests.js";

function getCreate(ctx) {
    setSessionData(ctx);

    ctx.loadPartials(partials).partial("./view/offer/create.hbs");
}

function postCreate(ctx) {
    const { description, price, product, pictureUrl } = ctx.params;
    const productData = { description, price, product, pictureUrl };

    if (isValidNewProduct(productData)) {
        requester.post("appdata", "offers", productData, "Kinvey")
            .then(response => {
                ctx.redirect("#/dashboard");
            }).catch(console.error);
    }
}

function details(ctx) {
    setSessionData(ctx);

    const offerID = ctx.params.id;

    requester.get("appdata", `offers/${offerID}`, "Kinvey")
        .then(offerData => {
            ctx.offer = offerData;
            ctx.loadPartials(partials).partial("./view/offer/details.hbs");
        }).catch(console.error);
}

function getEdit(ctx) {
    setSessionData(ctx);
    const offerID = ctx.params.id;

    requester.get("appdata", `offers/${offerID}`, "Kinvey")
        .then(offerData => {
            ctx.offer = offerData;
            ctx.loadPartials(partials).partial("./view/offer/edit.hbs");
        }).catch(console.error);
}

function postEdit(ctx) {
    const offerID = ctx.params.id;
    const { description, product, price, pictureUrl } = ctx.params;
    const editedProduct = { description, product, pictureUrl, price };

    if (isValidNewProduct(editedProduct)) {
        requester.get("appdata", `offers/${offerID}`, "Kinvey")
            .then(offerData => {
                for (const attribute in editedProduct) {
                    offerData[attribute] = editedProduct[attribute];
                }

                requester.put("appdata", `offers/${offerID}`, offerData, "Kinvey")
                    .then(response => {
                        ctx.redirect(`#/offers/details/${offerID}`);
                    });
            }).catch(console.error);
    }
}

function deleteOffer(ctx) {
    const offerID = ctx.params.id;

    if (confirm("Are you sure you want to delete this offer?")) {
        removeOfferFromDB(offerID, ctx);
    } else {
        history.back();
    }
}

function buyOffer(ctx) {
    const offerID = ctx.params.id;

    if (confirm("Are you sure you want to buy this offer?")) {
        requester.get("user", `${sessionStorage.getItem("userID")}`, "Kinvey")
            .then(userData => {
                userData.boughtProductsCount++;

                requester.put("user", `${sessionStorage.getItem("userID")}`, userData, "Kinvey")
                    .then(response => {
                        removeOfferFromDB(offerID, ctx);
                        ctx.redirect("#/dashboard");
                    })
            }).catch(console.error);
    } else {
        history.back();
    }
}

function removeOfferFromDB(offerID, ctx) {
    requester.del("appdata", `offers/${offerID}`, "Kinvey")
        .then(response => {
            ctx.redirect("#/dashboard");
        }).catch(console.error);
}

function isValidNewProduct(product) {
    return product.description !== ""
        && product.price !== ""
        && product.product !== ""
        && isValidPictureURL(product.pictureUrl);

}

function isValidPictureURL(url) {
    return url.match(/(http|https):\/\/.+\.(jpg|png|jpeg|gif)/) !== null;
}

export const offerController = {
    getCreate,
    postCreate,
    details,
    getEdit,
    postEdit,
    deleteOffer,
    buyOffer,
}