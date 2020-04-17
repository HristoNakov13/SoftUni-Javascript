import requester from "../util/requester";
import UserRegisterInterface from "../components/Register/user-register-interface";

const ROOT_ENDPOINT = "/api/users";

const API_ENDPOINTS = {
    validateUsernameUnique: ROOT_ENDPOINT + "/validate",
    register: ROOT_ENDPOINT + "/register"
}

const userService = {
    isUniqueUsername: (username: string): Promise<any> => {
        return requester.post(API_ENDPOINTS.validateUsernameUnique, { username });
    },

    register: (user: UserRegisterInterface): Promise<any> => {
        return requester.post(API_ENDPOINTS.register, user);
    }
}

export default userService;