const { cubeModel } = require("./util");

function get(req, res) {
    let { search, from, to } = req.query;

    if (from === "" || isNaN(from)) {
        from = 0;
    }

    if (to === "" || isNaN(to) || +to < 0) {
        to = Number.MAX_SAFE_INTEGER;
    }

    if (search === undefined) {
        search = "";
    }

    const cubes = cubeModel.find()
        .where("difficultyLevel")
        .gte(+from)
        .lte(+to)
        .then(cubes => {
            if (search !== "") {
                cubes = cubes.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
            }

            res.render("index.hbs", { cubes });
        });
}

module.exports = {
    get
};