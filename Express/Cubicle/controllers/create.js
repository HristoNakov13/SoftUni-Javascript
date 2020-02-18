const { repository } = require("./util");

function get(req, res) {
    res.render("create.hbs");
}

//TODO post
//validate input data

function post(req, res) {

}

module.exports = {
    get
};