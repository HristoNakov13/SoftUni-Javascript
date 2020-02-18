const env = process.env.NODE_ENV || 'development';
global.__basedir = __dirname;

const config = require('./config/config')[env];
const app = require('express')();

require('./config/express')(app);
require('./config/routes')(app);

const repository = require("./repository/repository");
const CubeCreateModel = require("./models/CubeCreateModel");

app.listen(config.port);