const controllers = require("../controllers/controllers")

module.exports = (app) => {
    app.get("/", controllers.home.get);

    app.get("/details/:id", controllers.cubeDetails.get);

    app.get("/not-found", controllers.notFound.get);

    app.get("/about", controllers.about.get);

    app.get("/create", controllers.create.get);
    app.post("/create", controllers.create.middleValidation, controllers.create.post);
};