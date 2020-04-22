import requester from "../util/requester";
import UserRegisterInterface from "../components/Register/user-register-interface";
import Credentials from "../components/Login/credentials-interface";

const ROOT_ENDPOINT = "/api/users";

const API_ENDPOINTS = {
    validateUsernameUnique: ROOT_ENDPOINT + "/validate",
    register: ROOT_ENDPOINT + "/register",
    login: ROOT_ENDPOINT + "/login",
}

const userService = {
    isUniqueUsername: (username: string): Promise<any> => {
        return requester.post(API_ENDPOINTS.validateUsernameUnique, { username });
    },

    register: (user: UserRegisterInterface): Promise<any> => {
        return requester.post(API_ENDPOINTS.register, user);
    },

    login: (credentials: Credentials): Promise<any> => {
        return fetch(`http://localhost:8080` + API_ENDPOINTS.login, {
            body: JSON.stringify(credentials),
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            credentials: 'include'
        }).then(res => res.status === 200 ? res.json() : res);
    },
}

export default userService;