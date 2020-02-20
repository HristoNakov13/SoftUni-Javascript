const mongoose = require("mongoose");
const config = require("./config");

module.exports = () => {
    return mongoose.connect(config.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true  });
}