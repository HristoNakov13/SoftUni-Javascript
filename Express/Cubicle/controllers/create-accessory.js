const { Accessory } = require("./util");

function get(req, res) {
    res.render("create-accessory.hbs");
}

function post(req, res) {
    const { name, description, imageUrl } = req.body;

    const accessory = new Accessory({name, description, imageUrl});
    accessory.save(function (err, cubeData) {
        if (err) return handleError(err);

        res.redirect("/");
    });
}

module.exports = {
    get,
    post
};