export function drawBook(book) {
    let title = createElement("td", book.title);
    let author = createElement("td", book.author);
    let ISBN = createElement("td", book.ISBN);


    let editBtn = createElement("button", "Edit");
    console.log(book._id);
    editBtn.setAttribute("data-id", book._id);

    let deleteBtn = createElement("button", "Delete");
    deleteBtn.setAttribute("data-id", book._id);

    let buttonWrapper = createElement("td");
    buttonWrapper.append(editBtn, deleteBtn);


    let wrapper = createElement("tr");
    wrapper.append(title, author, ISBN, buttonWrapper);

    return wrapper;
}

function createElement(tagName, textContent) {
    let element = document.createElement(tagName);

    if (textContent !== undefined) {
        element.textContent = textContent;
    }

    return element;
}