import React from "react";

const render = (Component, props, isLogged) => {
    return <Component isLogged={isLogged} />
};

const parseCookies = (cookies) => {
    return cookies.split(": ").reduce((acc, kvp) => {
        const [cookieName, cookieValue] = kvp.split("=");
        acc[cookieName] = cookieValue;

        return acc;
    }, {});
};

const isLogged = () => {
    const cookies = parseCookies(document.cookie);
    
    return true;
    // return cookies["x-auth-token"] !== undefined;
}

export default { render, isLogged };