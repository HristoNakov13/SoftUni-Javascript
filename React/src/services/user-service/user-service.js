import util from "../util";

const endpoints = {
    register: "/api/user/register",
    login: "/api/user/login",
    logout: "/api/user/logout"
}

const buildUrl = (endPoint) => {
    return util.domain + endPoint;
}

const userService = {
    register: (userData) => {
        return fetch(buildUrl(endpoints.register), {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include"
        }).catch(console.error);
    },

    login: (userData) => {
        return fetch(buildUrl(endpoints.login), {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-type": "application/json"
            }
        }).catch(console.error);
    },

    logout: () => {
        return fetch(buildUrl(endpoints.logout), {
            method: "POST",
            credentials: "include"
        }).catch(console.error);
    }
}


export default userService;