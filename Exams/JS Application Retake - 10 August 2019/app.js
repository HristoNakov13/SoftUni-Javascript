import { loadHomePage } from "./scripts/controllers/home-controller.js";
import { authController } from "./scripts/controllers/auth-controller.js";
import { causeController } from "./scripts/controllers/cause-controller.js";
import { loadDashBoard } from "./scripts/controllers/dashboard-controller.js";

function onLoad() {
    const app = Sammy("body", function () {
        this.use("Handlebars", "hbs");

        this.get("#/", loadHomePage);

        this.get("#/home", loadHomePage);

        this.get("/index.html", loadHomePage);

        this.get("#/register", authController.getRegister);

        this.post("#/register", authController.postRegister);

        this.get("#/login", authController.getLogin);

        this.post("#/login", authController.postLogin);

        this.get("#/logout", authController.logout);

        this.get("#/causes/create", causeController.getCreateCause);

        this.post("#/causes/create", causeController.postCreateCause);

        this.get("#/dashboard", loadDashBoard);

        this.get("#/causes/details/:id", causeController.getCauseDetails);

        this.post("#/donate/:id", causeController.postDonateToCause);

        this.get("#/causes/delete/:id", causeController.deleteCause);
    });

    app.run();
}

onLoad();