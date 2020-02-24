const { cubeModel } = require("./util");

async function get(req, res) {
    const { id: cubeId } = req.params;
    const cube = await cubeModel.findById(cubeId);

    res.render("delete-cube-page.hbs", { cube });
}

function post(req, res) {
    // TODO
}

module.exports = {
    get,
    post,
};