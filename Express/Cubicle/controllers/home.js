const { repository } = require("./util");
const CubeCreateModel = require("../models/CubeCreateModel");

async function get(req, res) {
    const cubes = await repository.findAll();
    res.render("index.hbs", { cubes });
}

module.exports = {
    get
}