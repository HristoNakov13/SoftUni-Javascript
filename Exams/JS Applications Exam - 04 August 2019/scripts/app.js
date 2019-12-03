import { loadHomePage } from "./controllers/home-controller.js";
import { authController } from "./controllers/auth-controller.js";
import { offerController } from "./controllers/offer-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { loadProfilePage } from "./controllers/profile-controller.js";

function onLoad() {
    const app = Sammy("body", function () {
        this.use("Handlebars", "hbs");

        this.get("#/", loadHomePage);

        this.get("#/home", loadHomePage);

        this.get("#/register", authController.getRegister);

        this.post("#/register", authController.postRegister);

        this.get("#/login", authController.getLogin);

        this.post("#/login", authController.postLogin);

        this.get("#/logout", authController.logout);

        this.get("#/create", offerController.getCreate);

        this.post("#/create", offerController.postCreate);

        this.get("#/dashboard", dashboardController.loadAllOffers);

        this.get("#/offers/details/:id", offerController.details);

        this.get("#/offers/edit/:id", offerController.getEdit);

        this.post("#/offers/edit/:id", offerController.postEdit);

        this.get("#/offers/delete/:id", offerController.deleteOffer);

        this.get("#/offers/buy/:id", offerController.buyOffer);

        this.get("#/profile", loadProfilePage);
    });

    app.run();
}

onLoad();