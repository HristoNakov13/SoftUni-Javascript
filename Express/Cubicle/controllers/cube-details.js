const { repository } = require("./util");

async function get(req, res) {
    const cube = await repository.findByid(+req.params.id);
    console.log(cube);

    res.render("details.hbs", { cube });
}

module.exports = {
    get
};