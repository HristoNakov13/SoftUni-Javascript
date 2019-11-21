import {validator} from "./input-validator.js";
import {requester} from "../http-requests.js";
import {drawBook} from "./draw-book.js";

const APP_KEY = "kid_HyJrq5kPS";
const APP_SECRET = "36e9c7004ae94d05a087d1926fa9c91a";

const USER = {
    name: "WTF",
    password: "123"
};

const ROOT_URL = `https://baas.kinvey.com/appdata/${APP_KEY}/Books`;

const bookInputElements = {
    title: document.getElementById("title"),
    author: document.getElementById("author"),
    ISBN: document.getElementById("isbn"),
};

let booksList = document.getElementById("booksList").querySelector("tbody");

function getBookInputData() {
    return {
        title: bookInputElements.title.value,
        author: bookInputElements.author.value,
        ISBN: bookInputElements.ISBN.value,
    };
}

//if there are no books currently displayed the handler will call loadAllBooks
//if there are some displayed it will just append the new book to the list without reloading all every time

async function createBookHandler(event) {
    event.preventDefault();

    let bookData = getBookInputData();

    if(!validateBook(bookData)) {
        return;
    }

    let createdBook = await requester.post(ROOT_URL, USER, bookData);

    clearInputFields(bookInputElements);

    if (isEmptyDisplayList(booksList)) {
        let bookElement = drawBook(createdBook);
        booksList.appendChild(bookElement);
    } else {
        await loadBooksHandler();
    }
}

function isEmptyDisplayList(bookList) {
    return bookList.innerHTML !== "";
}

function clearInputFields(fields) {
    for (const field in fields) {
        fields[field].value = "";
    }
}

function untagInputField(field) {
    field.style.border = ""
}

function tagInvalidInputField(field) {
    field.style.borderWidth = "thin";
    field.style.borderColor = "red";
}

function validateBook(book) {
    let isValidBook = true;

    for (const property in book) {
        if (!validator[property](book[property])) {
            isValidBook = false;
            tagInvalidInputField(bookInputElements[property]);
        } else {
            untagInputField(bookInputElements[property]);
        }
    }

    return isValidBook;
}

async function loadBooksHandler() {
    let books = await requester.get(ROOT_URL, USER);
    booksList.innerHTML = "";

    let fragment = document.createDocumentFragment();

    books.forEach(book => {
        let bookElement = drawBook(book);
        fragment.appendChild(bookElement);
    });

    booksList.appendChild(fragment);
}

async function deleteBookHandler(event) {
    let bookID = event.target.getAttribute("data-id");
    let bookURL = buildBookURL(bookID);

    await requester.del(bookURL, USER);

    booksList.removeChild(event.target.parentNode.parentNode);
}

function buildBookURL(bookID) {
    return `${ROOT_URL}/${bookID}`;
}

async function editBookHandler(event) {
    let bookTarget = event.target.parentNode.parentNode;
    let bookID = event.target.getAttribute("data-id");
    let bookURL = buildBookURL(bookID);

    let updatedBook = getBookInputData();

    if (!validateBook(updatedBook)) {
        return;
    }

    updatedBook = await requester.put(bookURL, USER, updatedBook);

    clearInputFields(bookInputElements);

    let updatedElement = drawBook(updatedBook);
    bookTarget.innerHTML = updatedElement.innerHTML;
}

export const eventHandlers = {
    "LOAD ALL BOOKS": loadBooksHandler,
    Submit: createBookHandler,
    Edit: editBookHandler,
    Delete: deleteBookHandler,
};