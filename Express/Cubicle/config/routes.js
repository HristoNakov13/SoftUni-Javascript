const controllers = require("../controllers/controllers")

module.exports = (app) => {
    app.get("/", controllers.home.get);

    app.get("/details/:id", controllers.cubeDetails.get);

    app.get("/not-found", controllers.notFound.get);

    app.get("/about", controllers.about.get);

    app.get("/create/cube", controllers.createCube.get);
    app.post("/create/cube", controllers.createCube.middleValidation, controllers.createCube.post);

    app.get("/create/accessory", controllers.createAccessory.get);
    app.post("/create/accessory", controllers.createAccessory.post);

    app.get("/attach-accessory/:id", controllers.attachAccessory.get);
    app.post("/attach-accessory/:id", controllers.attachAccessory.post);
};