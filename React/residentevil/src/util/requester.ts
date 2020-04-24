const fetchData = (URL: string, headers: RequestInit): Promise<any> => {
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
        });
};

const buildHeaders = (httpMethod: string, data?: Object | Array<any>): RequestInit => {
    const headers: any = {
        method: httpMethod,
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include'
    };

    if (!!data) {
        headers.body = JSON.stringify(data);
    }

    return headers;
};

const ROOT_URL = "http://localhost:8080";

const buildURL = (endpoint: string): string => {
    return `${ROOT_URL}${endpoint}`;
};

const httpMethod = (method: string) => {
    return (endpoint: string, data?: Object | Array<any>) => {
        const headers = buildHeaders(method, data);
        const URL = buildURL(endpoint);

        return fetchData(URL, headers)
    }
};

const requester = {
    get: httpMethod("GET"),
    post: httpMethod("POST"),
    put: httpMethod("PUT"),
    del: httpMethod("DEL")
};

export default requester;