import { requester } from "../http-requests.js";
import { partials } from "./shared.js";
import { isValidUser } from "../validators/register-validator.js";

function getRegister(ctx) {
    ctx.loadPartials(partials)
        .partial("./view/register/register.hbs");
}

function getLogin(ctx) {
    ctx.loadPartials(partials)
        .partial("./view/login/login.hbs");
}

function postRegister(ctx) {
    console.log(ctx.params);
    const { firstName, lastName, username, password, repeatPassword } = ctx.params;
    const user = { firstName, lastName, username, password };

    if (isValidUser(user) && password === repeatPassword) {
        requester.post("user", "", user, "Basic")
            .then(userData => {
                ctx.redirect("/login");
            }).catch(console.error);
    }
}

function postLogin(ctx) {
    const userCredentials = {
        username: ctx.params.username,
        password: ctx.params.password,
    };

    requester.post("user", "login", userCredentials, "Basic")
        .then(userData => {
            sessionStorage.setItem("authtoken", userData._kmd.authtoken);
            sessionStorage.setItem("userID", userData._id);

            requester.get("user", `${userData._id}`, "Kinvey")
                .then(fullUserData => {
                    sessionStorage.setItem("fullName", `${fullUserData.firstName} ${fullUserData.lastName}`);
                    ctx.redirect("/");
                });

        }).catch(console.error);
}

function logout(ctx) {
    requester.post("user", "_logout", {}, "Kinvey")
        .then(() => {
            sessionStorage.clear();
            ctx.redirect("/");
        });
}

export const auth = {
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    logout,
}