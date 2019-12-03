import { partials, setSessionData } from "./helpers.js";
import { requester } from "../http-requests.js";

function getRegister(ctx) {
    ctx.loadPartials(partials).partial("./view/register/registerPage.hbs");
}

function postRegister(ctx) {
    console.log(ctx.params);
    const { username, password, rePassword } = ctx.params;
    const user = { username, password, boughtProductsCount: 0 };

    if (isValidNewUser(user) && password === rePassword) {
        requester.post("user", "", user, "Basic")
            .then(userData => {
                ctx.redirect("#/login");
            }).catch(console.error);
    }
}

function getLogin(ctx) {
    ctx.loadPartials(partials).partial("./view/login/loginPage.hbs");

}

function postLogin(ctx) {
    const user = {
        username: ctx.params.username,
        password: ctx.params.password,
    };

    requester.post("user", "login", user, "Basic")
        .then(userData => {
            sessionStorage.setItem("userID", userData._id);
            sessionStorage.setItem("username", userData.username);
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

function isValidNewUser(user) {
    return isValidUsername(user.username)
        && isValidPassword(user.password);

}

function isValidUsername(username) {
    return username !== "";
}

function isValidPassword(password) {
    return password !== "";
}

export const authController = {
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    logout,
}