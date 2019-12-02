import { loadHomePage } from "./controllers/home-controller.js";
import { authController } from "./controllers/auth-controller.js"
import { eventsController } from "./controllers/events-controller.js";
import { loadProfile } from "./controllers/profile-controller.js";

function onLoad() {
    const app = Sammy("body", function () {
        this.use("Handlebars", "hbs");

        this.get("#/", loadHomePage);

        this.get("#/register", authController.getRegister);

        this.post("#/register", authController.postRegister);

        this.get("#/login", authController.getLogin);

        this.post("#/login", authController.postLogin);

        this.get("#/logout", authController.logout);

        this.get("#/organize", eventsController.getOrganize);

        this.post("#/organize", eventsController.postOrganize);

        this.get("#/events/:id", eventsController.eventDetails);

        this.get("#/edit/:id", eventsController.getEditEvent);

        this.post("#/edit/:id", eventsController.postEditEvent);

        this.get("#/close/:id", eventsController.closeEvent);

        this.get("#/join/:id", eventsController.joinEvent);

        this.get("#/profile", loadProfile);
    });

    app.run();
}

onLoad();