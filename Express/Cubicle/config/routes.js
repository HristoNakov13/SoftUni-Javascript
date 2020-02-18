const controllers = require("../controllers/controllers")

module.exports = (app) => {
    app.get("/", controllers.home.get);
    app.get("/details/:id", controllers.cubeDetails.get);
    app.get("/create", controllers.create.get);
    app.get("/about", controllers.about.get);
};