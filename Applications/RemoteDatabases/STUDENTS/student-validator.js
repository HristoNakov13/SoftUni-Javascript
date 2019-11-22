//is typeof x === "number" a redundant operation when its also checked if its >=< to a number?
function isValidID(ID) {
    return typeof ID === "number" && ID > 0;
}

function isValidFirstName(firstName) {
    return firstName !== "" && firstName.match(/[A-Za-z]+/) !== null;
}

function isValidLastName(lastName) {
    return lastName !== "" && lastName.match(/[A-Za-z]+/) !== null;
}

function isValidFacultyNumber(facultyNumber) {
    return typeof facultyNumber === "number" && facultyNumber > 0;
}

function isValidGrade(grade) {
    return typeof grade === "number" && grade >= 2 && grade <= 6;
}

export const validator = {
    ID: isValidID,
    FirstName: isValidFirstName,
    LastName: isValidLastName,
    FacultyNumber: isValidFacultyNumber,
    Grade: isValidGrade,
};

export const invalidMessages = {
    ID: "ID must be a number greater than 0.",
    FirstName: "First name must contain only letters and be at least 1 character long.",
    LastName: "Last name must contain only letters and be at least 1 character long.",
    FacultyNumber: "Faculty number must be a number greater than 0.",
    Grade: "Grade must be a number between 2.00 and 6.00.",
};