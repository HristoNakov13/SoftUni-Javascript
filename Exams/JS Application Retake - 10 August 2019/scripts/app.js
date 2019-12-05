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

        this.get("/index.html", loadHomePage);


    });

    app.run();
}

onLoad();