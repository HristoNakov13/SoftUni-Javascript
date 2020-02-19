const { repository, createValidator, CubeCreateModel } = require("./util");

function get(req, res) {
    res.render("create.hbs");
}

function post(req, res) {
    const { name, description, imageUrl, difficultyLevel } = req.body;

    const cube = new CubeCreateModel(name, description, imageUrl, difficultyLevel);

    repository.save(cube).then(cubeData => {
        res.redirect(`/details/${cubeData.id}`);
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