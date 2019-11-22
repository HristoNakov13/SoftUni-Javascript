export function drawStudent(student) {
    let id = createElement("td", student.ID);
    let firstName = createElement("td", student.FirstName);
    let lastName = createElement("td", student.LastName);
    let facultyNumber = createElement("td", student.FacultyNumber);
    let grade = createElement("td", student.Grade);

    let wrapper = createElement("tr");
    wrapper.append(id, firstName, lastName, facultyNumber, grade);

    return wrapper;
}


function createElement(tagName, textContent, dataID) {
    let element = document.createElement(tagName);

    if (textContent !== undefined) {
        element.textContent = textContent;
    }

    if (dataID !== undefined) {
        element.setAttribute("data-id", dataID);
    }

    return element;
}