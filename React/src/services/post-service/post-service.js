const JSON_PLACEHOLDER_URL = "https://jsonplaceholder.typicode.com/posts";

const buildUrl = (id, limit) => {
    return `${id ? `/${id}` : ''}${limit ? `?${limit}` : ''}`
}

const postService = {
    load: function (id, limit) {
        return fetch(`${JSON_PLACEHOLDER_URL}${buildUrl(id, limit)}`)
            .then(res => res.json());
    }
}

export default postService;