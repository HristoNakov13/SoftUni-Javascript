const JSON_PLACEHOLDER_URL = "https://jsonplaceholder.typicode.com/posts";

const postService = {
    load: function (id) {
        return fetch(`${JSON_PLACEHOLDER_URL}${id ? `/${id}` : ``}`)
            .then(res => res.json());
    }
}

export default postService;