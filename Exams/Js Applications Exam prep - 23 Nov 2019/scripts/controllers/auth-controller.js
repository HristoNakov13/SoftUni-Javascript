import { requester } from "../http-requests.js";
import { partials } from "./helpers.js";

function getRegister(ctx) {
    ctx.loadPartials(partials).partial("./view/register/registerForm.hbs");
}

function postRegister(ctx) {
    const { username, password, rePassword } = ctx.params;
    const user = { username, password };

    if (isValidCredentials(user) && password === rePassword) {
        requester.post("user", "", user, "Basic")
            .then(userData => {
                ctx.redirect("#/login");
            });
    }

}

function getLogin(ctx) {
    ctx.loadPartials(partials).partial("./view/login/loginForm.hbs");
}

function postLogin(ctx) {
    const user = {
        username: ctx.params.username,
        password: ctx.params.password,
    }

    requester.post("user", "login", user, "Basic")
        .then(userData => {
            sessionStorage.setItem("username", userData.username);
            sessionStorage.setItem("userID", userData._id);
            sessionStorage.setItem("authtoken", userData._kmd.authtoken);
            ctx.redirect("#/");
        }).catch(console.error);
}

function logout(ctx) {
    if (confirm("Are you sure you want to logout?")) {
        requester.post("user", "_logout", {}, "Kinvey")
            .then(() => {
                sessionStorage.clear();
                ctx.redirect("#/");
            }).catch(console.error);
    } else {
        history.back();
    }
}

function isValidCredentials(user) {
    return isValidUsername(user.username)
        && isValidPassword(user.password);
}

function isValidUsername(username) {
    return username.length >= 2;
}

function isValidPassword(password) {
    return password.length >= 3;
}

export const authController = {
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    logout,
}