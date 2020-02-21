const { cubeModel } = require("./util");

async function get(req, res) {
    const cube = await cubeModel.findById(req.params.id).populate("accessories");

    if (cube === undefined) {
        res.redirect("/not-found");

        return;
    }

    res.render("details.hbs", { cube });
}

module.exports = {
    get
};