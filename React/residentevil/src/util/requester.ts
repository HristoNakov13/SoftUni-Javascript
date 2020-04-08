function fetchData(URL: string, headers: RequestInit): Promise<any> {
    return fetch(URL, headers)
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }

            return res;
        })
        .then(res => {
            return res.status === 204
                ? res
                : res.json();
        })
        .catch(console.error);
}

function buildHeaders(httpMethod: string): Object {
    const headers = {
        method: httpMethod,
        headers: {
            "Content-Type": "application/json",
        }
    };

    // if (data !== undefined) {
    //     headers.body = JSON.stringify(data);
    // }

    return headers;
}

function get(endpoint: string) {
    const headers = buildHeaders("GET");
    const URL = buildURL(endpoint);

    return fetchData(URL, headers);
}

function post(endpoint: string) {
    const headers = buildHeaders("POST");
    const URL = buildURL(endpoint);

    return fetchData(URL, headers);
}

const ROOT_URL = " http://localhost:8080";

function buildURL(endpoint: string): string {
    return `${ROOT_URL}${endpoint}`;
}

const requester = {
    get,
    post,
};

export default requester;