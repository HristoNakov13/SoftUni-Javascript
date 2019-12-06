import { partials, setSessionData, notifications } from "./helpers.js";
import { requester } from "../http-requester/http-requests.js";

function getRegister(ctx) {
    ctx.loadPartials(partials).partial("./view/register/registerPage.hbs");
}

function postRegister(ctx) {
    const { username, password, rePassword } = ctx.params;
    const user = { username, password, boughtProductsCount: 0 };

    if (password !== rePassword) {
        notifications.error("Password and re-password fields must match.");
        return;
    }

    if (isValidNewUser(user)) {
        notifications.displayLoading();
        
        requester.post("user", "", user, "Basic")
            .then(userData => {
                ctx.redirect("#/login");
                notifications.success("Successfully registered. You can now login.");
            }).catch(error => {
                if (error.message === "Conflict") {
                    notifications.error("User with that name already exists.");
                } else {
                    console.error(error);
                }
            });
    } else {
        notifications.error("Username and password must be at least 1 character long.");
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

    notifications.displayLoading();

    requester.post("user", "login", user, "Basic")
        .then(userData => {
            sessionStorage.setItem("userID", userData._id);
            sessionStorage.setItem("username", userData.username);
            sessionStorage.setItem("authtoken", userData._kmd.authtoken);
            ctx.redirect("#/");
            notifications.success("Successfully logged in.");
        }).catch(error => {
            if (error.message === "Bad Request") {
                notifications.error("Please fill all fields with your.");
            } else if (error.message === "Unauthorized") {
                notifications.error("Wrong username or password.");
            }
        });
}

function logout(ctx) {
    if (confirm("Are you sure you want to logout?")) {
        notifications.displayLoading();
        requester.post("user", "_logout", {}, "Kinvey")
            .then(() => {
                sessionStorage.clear();
                ctx.redirect("#/");
                notifications.success("Successfully logged out.");
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

export const userController = {
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    logout,
}