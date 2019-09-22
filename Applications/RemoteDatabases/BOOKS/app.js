(function() {
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    let editBtn = document.createElement("button");
    editBtn.innerText = "Edit";

    const ELEMENTS = {
        titleInput: document.getElementById("title"),
        authorInput:  document.getElementById("author"),
        ISBNInput: document.getElementById("isbn"),
        submitBtn: document.getElementById("submitBook"),
        loadBooksBtn: document.getElementById("loadBooks"),
        tableContent: document.getElementById("books-content"),
        deleteBookBtn: deleteBtn,
        editBookBtn: editBtn,
    };

    ELEMENTS.titleInput.required = true;
    ELEMENTS.authorInput.required = true;
    ELEMENTS.ISBNInput.required = true;

    const KINVEY_USERNAME = "Guest";
    const KINVEY_PASSWORD = "Guest";
    const APP_KEY = "kid_HyJrq5kPS";
    const APP_SECRET = "36e9c7004ae94d05a087d1926fa9c91a";
    const DB_URL = "https://baas.kinvey.com/appdata/kid_HyJrq5kPS/Books";

    const loadAllDatabaseBooks = function () {
        fetch(DB_URL)
            .then(response => response.json())
            .then(books => {
                console.log(books);
                books.forEach(book => addBookToView(book));
            });
    };

    ELEMENTS.loadBooksBtn.addEventListener("click", loadAllDatabaseBooks);

    let bookID = 0;
    const submitBookFunc = function (event) {
        event.preventDefault();
        let createBook = {
            Title: ELEMENTS.titleInput.value,
            Author: ELEMENTS.authorInput.value,
            ISBN: ELEMENTS.ISBNInput.value,
            ID: bookID++,
        };

        const headers = {
            method:"POST",
            body:JSON.stringify(createBook),
            credentials: "include",
            Authorization: "Basic " + btoa(`${KINVEY_USERNAME}:${KINVEY_PASSWORD}`),
            headers: {
                "Content-type": "application/json",
            },
        };
        fetch(DB_URL, headers)
            .then(response => response.json());

        addBookToView(ELEMENTS.tableContent, createBook)
    };
    ELEMENTS.submitBtn.addEventListener("click", submitBookFunc);

    const addBookToView = function (table, book) {
        let row = table.insertRow(-1);
        row.setAttribute("id", book.ID);
        let titleCell = row.insertCell(0);
        let authorCell = row.insertCell(-1);
        let ISBNCell = row.insertCell(-1);
        let bookButtons = row.insertCell(-1);

        titleCell.textContent = book.Title;
        authorCell.textContent = book.Author;
        ISBNCell.textContent = book.ISBN;

        let editButton = document.createElement("button");
        editButton.innerText = "Edit";
        bookButtons.appendChild(editButton);

        let deleteButton = createDeleteBtn(book.ID);
        bookButtons.appendChild(deleteButton);
    };
    
    const createDeleteBtn = function (bookID) {
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", function () {
            document.getElementById(bookID).innerHTML = "";
        });
        return deleteButton;
    };
})();