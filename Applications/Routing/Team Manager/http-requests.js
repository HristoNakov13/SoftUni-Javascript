const APP_KEY = "kid_rJFdvRinH";
const APP_SECRET = "b05af1e5e6444a349eb0800486e5f1b4";

function fetchData(URL, headers) {
    return fetch(URL, headers)
        .then(handleResponse)
        .then(parseResponseData);
}

function handleResponse(response) {
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response;
}

function parseResponseData(response) {
    return response.json();
}

function buildHeaders(httpMethod, authType, data) {
    let headers = {
        method: httpMethod,
        headers: {
            "Authorization": createAuthorization(authType),
            "Content-Type": "application/json",
        }
    };

    if (data !== undefined) {
        headers.body = JSON.stringify(data);
    }

    return headers;
}

function createAuthorization(authType) {
    if (authType === "Basic") {
        return `Basic ${btoa(`${APP_KEY}:${APP_SECRET}`)}`;
    }

    return `Kinvey ${sessionStorage.getItem("authtoken")}`;
}

function get(URL, authType) {
    let headers = buildHeaders("GET", authType);

    return fetchData(URL, headers);
}

function post(URL, data, authType) {
    let headers = buildHeaders("POST", authType, data);

    return fetchData(URL, headers, data);
}

function put(URL, data, authType) {
    let headers = buildHeaders("PUT", authType, data);

    return fetchData(URL, headers);
}

function del(URL, user) {
    let headers = buildHeaders("DELETE", user);

    return fetchData(URL, headers);
}

export const requester = {
    get,
    post,
    put,
};