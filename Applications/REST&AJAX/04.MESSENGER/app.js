const userInput = {
    author: document.getElementById("author"),
    content: document.getElementById("content"),
};

function submitMessageHandler() {
    let post = {
        author: userInput.author.value,
        content: userInput.content.value,
    };

    if (isValidPost(post)) {
        postMessage(post);
    }
}

function postMessage(post) {
    const POST_URL = "https://rest-messanger.firebaseio.com/messanger.json";
    const headers = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(post)
    };

    fetch(POST_URL, headers)
        .then(clearInputFields)
        .catch(catchError);
}

function clearInputFields(response) {
    userInput.author.value = "";
    userInput.content.value = "";

    return response;
}

function isValidPost(post) {
    return post.author !== "" && post.content !== "";
}

function refreshHandler() {
    const GET_MESSAGES_URL = "https://rest-messanger.firebaseio.com/messanger.json";

    fetch(GET_MESSAGES_URL)
        .then(handleErrors)
        .then(response => response.json())
        .then(displayPostsHistory)
        .catch(catchError);
}

const postsHistory = document.getElementById("messages");

function displayPostsHistory(posts) {
    postsHistory.textContent = "";
    let history = "";

    let keys = Object.keys(posts);

    keys.forEach(key => {
        history += `${posts[key].author}: ${posts[key].content}\n`;
    });

    postsHistory.textContent = history;

    return posts;
}

function handleErrors(response) {
    if (!response.ok) {
        throw new Error("Could not load posts.");
    }

    return response;
}

function catchError(error) {
    postsHistory.textContent = error.message;
}

const btnEvents = {
    submit: submitMessageHandler,
    refresh: refreshHandler,
};

const submitBtn = document.getElementById("submit");
const refreshBtn = document.getElementById("refresh");

function attachEvents() {
    submitBtn.addEventListener("click", btnEvents.submit);
    refreshBtn.addEventListener("click", btnEvents.refresh);
}

attachEvents();