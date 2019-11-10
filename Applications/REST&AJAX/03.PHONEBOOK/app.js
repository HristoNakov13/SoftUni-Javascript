function attachEvents() {
    const loadBtn = document.querySelector("#btnLoad");
    const LOAD_PHONE_BOOK_URL = "https://phonebook-nakov.firebaseio.com/phonebook.json";
    const phoneBookElement = document.querySelector("#phonebook");

    loadBtn.addEventListener("click", loadEventHandler);

    function loadEventHandler() {
        phoneBookElement.innerHTML = "";

        fetch(LOAD_PHONE_BOOK_URL)
            .then(response => response.json())
            .then(handleErrors)
            .then(displayPhoneBook)
            .catch(catchErrors);
    }

    function handleErrors(data) {
        if (data === null) {
            throw new Error("No users found.");
        }

        return data;
    }

    function displayPhoneBook(phoneBook) {
        for (const userID in phoneBook) {
            if (isValidUser(phoneBook[userID])) {
                const userElement = createUserElement(phoneBook[userID], userID);
                phoneBookElement.appendChild(userElement);
            }
        }
    }

    function isValidUser(user) {
        return user.person !== "" && user.phone !== "";
    }

    function createUserElement(user, id) {
        const userElement = document.createElement("li");
        userElement.textContent = `${user.person}: ${user.phone} `;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.setAttribute("id", id);

        deleteBtn.addEventListener("click", deleteUserEventHandler);

        userElement.appendChild(deleteBtn);

        return userElement;
    }

    function deleteUserEventHandler(event) {
        const userID = event.target.id;
        const userElement = event.target.parentNode;
        phoneBookElement.removeChild(userElement);

        const deleteUserUrl = `https://phonebook-nakov.firebaseio.com/phonebook/${userID}.json`;
        const headers = {
            method: "DELETE"
        };

        //better to load phone book again in "then" or just leave it as is
        //either way user is still removed locally from the html

        fetch(deleteUserUrl, headers)
            .then(() => {})
            .catch(catchErrors);
    }

    function catchErrors(error) {
        phoneBookElement.innerHTML = `${error.message}`;
    }

    const userInput = {
        "person": document.querySelector("#person"),
        "phone": document.querySelector("#phone"),
    };
    const CREATE_USER_URL = "https://phonebook-nakov.firebaseio.com/phonebook.json";

    function createUserEventHandler() {
        const phone = userInput.phone.value;
        const person = userInput.person.value;

        const user = {person, phone};

        if (!isValidUser(user)) {
            return;
        }

        const headers = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        };

        fetch(CREATE_USER_URL, headers)
            .then(reloadPhoneBook)
            .catch(catchErrors);
    }

    function reloadPhoneBook() {
        userInput.phone.value = "";
        userInput.person.value = "";

        loadEventHandler();
    }

    const createBtn = document.querySelector("#btnCreate");
    createBtn.addEventListener("click", createUserEventHandler);
}

attachEvents();