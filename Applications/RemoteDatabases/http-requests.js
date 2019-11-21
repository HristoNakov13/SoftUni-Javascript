function fetchData(URL, headers) {
    console.log(URL, headers)
    return fetch(URL, headers)
        .then(handleResponse)
        .then(parseResponse);
}

function handleResponse(response) {
    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response;
}

function parseResponse(response) {
    return response.json();
}

function buildHeaders(httpMethod, user, data) {
    let headers = {
        method: httpMethod,
        headers: {
            "Authorization": `Basic ${btoa(`${user.name}:${user.password}`)}`,
            "Content-Type": "application/json",
        }
    };

    if (httpMethod === "POST" || httpMethod === "PUT") {
        headers.body = JSON.stringify(data);
    }

    return headers;
}

function get(URL, user) {
    let headers = buildHeaders("GET", user);

    return fetchData(URL, headers);
}

function post(URL, user, data) {
    let headers = buildHeaders("POST", user, data);

    return fetchData(URL, headers, data);
}

function put(URL, user, data) {
    let headers = buildHeaders("PUT", user, data);

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
    del
};