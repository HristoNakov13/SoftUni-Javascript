global.__basedir = __dirname;

const dbConnector = require("./config/db");

dbConnector().then(() => {
    const config = require('./config/config');
    const app = require('express')();
    require('./config/express')(app);
    require('./config/routes')(app);

    app.listen(config.port);
}).catch(console.error);