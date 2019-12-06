import { partials, setSessionData, notifications } from "./helpers.js";
import { requester } from "../http-requester/http-requests.js";


function getCreateCause(ctx) {
    setSessionData(ctx);

    ctx.loadPartials(partials).partial("./view/causes/create.hbs");
}

function postCreateCause(ctx) {
    const { cause, description, pictureUrl, neededFunds } = ctx.params;
    const causeData = {
        cause,
        description,
        pictureUrl,
        neededFunds,
        donors: [],
        collectedFunds: 0,
    };
    if (isValidCause(causeData)) {
        requester.post("appdata", "causes", causeData, "Kinvey")
            .then(response => {
                ctx.redirect("#/");
                notifications.success(`Successfulyl created ${cause} cause.`);
            }).catch(console.error);
    }
}

function getCauseDetails(ctx) {
    setSessionData(ctx);

    const causeID = ctx.params.id;
    notifications.displayLoading();

    requester.get("appdata", `causes/${causeID}`, "Kinvey")
        .then(causeData => {
            ctx.cause = causeData;
            ctx.isCreator = sessionStorage.getItem("userID") === causeData._acl.creator;

            ctx.loadPartials(partials).partial("./view/causes/details.hbs");
            notifications.hideLoading();
        }).catch(console.error);
}

function postDonateToCause(ctx) {
    const causeID = ctx.params.id;
    const currentDonation = ctx.params.currentDonation;

    if (currentDonation <= 0) {
        return;
    }

    if (!confirm(`Are you sure you want to donate $${currentDonation}?`)) {
        return;
    }

    notifications.displayLoading();

    requester.get("appdata", `causes/${causeID}`, "Kinvey")
        .then(causeData => {
            causeData.collectedFunds += Number(currentDonation);

            requester.put("appdata", `causes/${causeID}`, causeData, "Kinvey")
                .then(response => {
                    ctx.redirect(`#/causes/details/${causeID}`);
                    notifications.success(`Successfully donated $${currentDonation} to ${causeData.cause}`);
                });
        }).catch(console.error);
}

function deleteCause(ctx) {
    const causeID = ctx.params.id;

    if (confirm("Are you sure you want to delete this cause?")) {
        requester.del("appdata", `causes/${causeID}`, "Kinvey")
            .then(response => {
                ctx.redirect("#/dashboard");
                notifications.success("Cause successfully deleted.")
            }).catch(console.error);
    } else {
        history.back();
    }
}

function isValidCause(causeData) {
    return causeData.cause !== ""
        && causeData.description !== ""
        && causeData.neededFunds !== ""
        && causeData.pictureUrl !== "";
}


export const causeController = {
    getCreateCause,
    postCreateCause,
    getCauseDetails,
    postDonateToCause,
    deleteCause,
}