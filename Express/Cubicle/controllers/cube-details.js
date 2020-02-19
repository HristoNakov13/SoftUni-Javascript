const { repository } = require("./util");

async function get(req, res) {
    const cube = await repository.findByid(+req.params.id);

    if (cube === undefined) {
        res.redirect("/not-found");

        return;
    }

    res.render("details.hbs", { cube });
}

module.exports = {
    get
};