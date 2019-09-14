function attachEvents() {
    let loadBtn = document.getElementById("btnLoad");
    let phoneContactsElement = document.getElementById("phonebook");

    let loadBtnOnClickFunc = function () {
        if (phoneContactsElement.getElementsByTagName("li").length > 0) {
            return;
        }
        let url = "https://phonebook-nakov.firebaseio.com/phonebook.json";
        fetch(url)
            .then(info => info.json())
            .then(data => {
                for (const key in data) {
                    let name = data[key].person;
                    let phoneNumber = data[key].phone;

                    let currentPersonAsList = createNewPerson(name, phoneNumber);
                    addPersonToPhoneContacts(currentPersonAsList);
                }
            });
        loadBtn.style.display = "none";
    };
    loadBtn.addEventListener("click", loadBtnOnClickFunc);

    function addEventListenerToDeleteButton(deleteButton, id) {
        deleteButton.addEventListener("click", function () {
            if (phoneContactsElement.getElementsByTagName("li").length === 1) {
                loadBtn.style.display = "block";
            }
            let contact = document.getElementById(id);
            phoneContactsElement.removeChild(contact);
        })
    }

    function createNewPerson(name, phoneNumber) {
        let newPerson = document.createElement("li");
        newPerson.setAttribute("id", phoneNumber);
        let personInfo = `${name}: ${phoneNumber}`;
        newPerson.textContent = personInfo;
        addDeleteButtonToPerson(newPerson);
        return newPerson;
    }

    function addDeleteButtonToPerson(person) {
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        addEventListenerToDeleteButton(deleteButton, person.id);
        person.appendChild(deleteButton);
    }

    function addPersonToPhoneContacts(person) {
        phoneContactsElement.appendChild(person);
    }

    let nameInputElement = document.getElementById("person");
    let phoneInputElement = document.getElementById("phone");

    let createBtnOnClickFunc = function () {
        let name = nameInputElement.value;
        let phoneNumber = phoneInputElement.value;
        if (name === "" || phoneNumber === "") {
            return;
        }
        let newPersonList = createNewPerson(name, phoneNumber);
        addPersonToPhoneContacts(newPersonList);
    };

    let createBtn = document.getElementById("btnCreate");
    createBtn.addEventListener("click", createBtnOnClickFunc);
}
attachEvents();