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

    app.get("/register", controllers.userAuth.registerGet);
    app.post("/register", controllers.userAuth.registerPost);

    app.get("/login", controllers.userAuth.loginGet);
    app.post("/login", controllers.userAuth.loginPost);

    app.get("/edit/cube/:id", controllers.editCube.get);
    app.post("/edit/cube/:id", controllers.editCube.post);

    app.get("/delete/cube/:id", controllers.deleteCube.get);
    app.post("/delete/cube/:id", controllers.deleteCube.post);
};