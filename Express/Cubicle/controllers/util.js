const createValidator = require("./util/create-validator");
const cubeModel = require("../models/cube");
const accessoryModel = require("../models/accessory");

module.exports = {
    createValidator,
    cubeModel,
    Cube: cubeModel,
    accessoryModel,
    Accessory: accessoryModel
};