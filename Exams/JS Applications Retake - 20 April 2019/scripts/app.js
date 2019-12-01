import { auth } from "./controllers/auth.js";
import {recipesController} from "./controllers/recipes-controller.js";
import { partials, setSessionData } from "./controllers/shared.js"
import { requester } from "./http-requests.js";

function onLoad() {
    const app = Sammy("#rooter", function () {
        this.use("Handlebars", "hbs");


        this.get("/", function (ctx) {
            setSessionData(ctx);

            if (ctx.isLogged) {
                partials["homePage"] = "./view/home/homePage.hbs";

                requester.get("appdata", "recipes", "Kinvey")
                .then(recipes => {
                    ctx.recipes = recipes;
                    console.log(ctx.recipes);
                    ctx.loadPartials(partials).partial("./view/home/home.hbs");
                })

            } else {
                partials["homeAsAnonymous"] = "./view/home/homeAsAnonymous.hbs";
                ctx.loadPartials(partials)
                    .then(function () {
                        this.partial("./view/home/home.hbs");
                    });
            }
        });

        this.get("/register", auth.getRegister);

        this.get("/login", auth.getLogin);

        this.post("/register", auth.postRegister);

        this.post("/login", auth.postLogin);

        this.get("/logout", auth.logout);

        this.get("/recipes/:id", recipesController.getRecipeDetails);

        this.get("/share", recipesController.getShareRecipe);

        this.post("/share", recipesController.postShareRecipe);

        this.get("/edit/:id", recipesController.getEditRecipe);

        this.post("/edit/:id", recipesController.postEditRecipe);

        this.get("/archive/:id", recipesController.archiveRecipe);

        this.get("/like/:id", recipesController.likeRecipe);
    });

    app.run();
}

onLoad();