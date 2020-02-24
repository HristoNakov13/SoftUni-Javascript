function registerGet(req, res) {
    res.render("register-page.hbs");
}

function registerPost(req, res) {
    // TODO
}

function loginGet(req, res) {
    res.render("login-page.hbs");
}

function loginPost(req, res) {
    // TODO
}

function logout(req, res) {
    // TODO
}

module.exports = {
    registerGet,
    registerPost,
    loginGet,
    loginPost
};