const { cubeModel, accessoryModel } = require("./util");

async function get(req, res, next) {
    const { id: cubeId } = req.params;

    const cube = await cubeModel.findById(cubeId);
    let accessories = await accessoryModel.find({ _id: { $nin: cube.accessories } });

    res.render("attach-accessory.hbs", { cube, accessories });
}

function post(req, res, next) {
    const { id: cubeId } = req.params;
    const { accessory: accessoryId } = req.body;

    Promise.all([
        cubeModel.updateOne({ _id: cubeId }, { $push: { accessories: accessoryId } }),
        accessoryModel.updateOne({ _id: accessoryId }, { $push: { cubes: cubeId } }),
    ]).then(() => {
        res.redirect(`/attach-accessory/${cubeId}`);
    }).catch(next);
}

module.exports = {
    get,
    post
}