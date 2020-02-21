const { createValidator, Cube } = require("./util");

function get(req, res) {
    res.render("create-cube.hbs");
}

function post(req, res) {
    const { name, description, imageUrl, difficultyLevel } = req.body;

    const cube = new Cube({ name, description, imageUrl, difficultyLevel });

    cube.save(function (err, cubeData) {
        if (err) return handleError(err);
        res.redirect(`/details/${cubeData._id}`);
    });
}

function middleValidation(req, res, next) {
    const { name, description, imageUrl } = req.body;

    if (createValidator.isValidDescription(description)
        && createValidator.isValidName(name)
        && createValidator.isValidImageUrl(imageUrl)) {

        next();

        return;
    }

    res.render("create-invalid-fields.hbs");
}

module.exports = {
    get,
    post,
    middleValidation,
};