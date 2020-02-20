const createValidator = require("./util/create-validator");
const cubeModel = require("../models/cube");

module.exports = {
    createValidator,
    cubeModel,
    Cube: cubeModel
};