import React from "react";
import userService from "../../services/user-service/user-service";


const Logout = (history) => {
    userService.logout().then(res => {
    });

    return null;
};

export default Logout;