import {requester} from "../http-requests.js";
import {validator, invalidMessages} from "./student-validator.js";
import {drawStudent} from "./draw-student.js";

const APP_KEY = "kid_HyJrq5kPS";
const APP_SECRET = "36e9c7004ae94d05a087d1926fa9c91a";

const USER_CREDENTIALS = {
    name: "guest",
    password: "guest"
};

const ROOT_URL = `https://baas.kinvey.com/appdata/${APP_KEY}/students`;
const studentsList = document.getElementById("results").querySelector("tbody");

const studentInputForms = {
    ID: document.getElementById("studentID"),
    FirstName: document.getElementById("firstName"),
    LastName: document.getElementById("lastName"),
    FacultyNumber: document.getElementById("facultyNumber"),
    Grade: document.getElementById("grade"),
};

async function submitStudentHandler(event) {
    event.preventDefault();

    const studentData = {
        ID: Number(studentInputForms.ID.value),
        FirstName: studentInputForms.FirstName.value,
        LastName: studentInputForms.LastName.value,
        FacultyNumber: Number(studentInputForms.FacultyNumber.value),
        Grade: Number(studentInputForms.Grade.value),
    };

    if (!validateStudent(studentData)) {
        return;
    }

    clearInputFields(studentInputForms);

    await requester.post(ROOT_URL, USER_CREDENTIALS, studentData);
    await loadStudentsHandler();
}

async function loadStudentsHandler() {
    const students = await requester.get(ROOT_URL, USER_CREDENTIALS);
    studentsList.innerHTML = "";

    let fragment = document.createDocumentFragment();

    students
        .sort((s1, s2) => s1.ID - s2.ID)
        .forEach(student => {
            let studentElement = drawStudent(student);
            fragment.appendChild(studentElement);
        });

    studentsList.appendChild(fragment);
}


function clearInputFields(fields) {
    Object.keys(fields)
        .forEach(key => fields[key].value = "");
}

function untagInputField(field) {
    field.style.border = ""
}

function tagInvalidInputField(field) {
    field.style.borderWidth = "thin";
    field.style.borderColor = "red";
}

function validateStudent(student) {
    let isValidStudent = true;
    let alertMsg = "";

    for (const property in student) {
        if (typeof validator[property] !== "function") {
            continue;
        }

        if (!validator[property](student[property])) {
            isValidStudent = false;
            tagInvalidInputField(studentInputForms[property]);
            alertMsg += `${invalidMessages[property]}\r\n\r\n`;
        } else {
            untagInputField(studentInputForms[property]);
        }
    }

    if (!isValidStudent) {
        alert(alertMsg.trim());
    }

    return isValidStudent;
}

export const eventHandlers = {
    submit: submitStudentHandler,
    load: loadStudentsHandler,
};