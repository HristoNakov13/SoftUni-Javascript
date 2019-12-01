export function isValidUser(user) {
    return isValidFirstName(user.firstName)
    && isValidLastName(user.lastName)
    && isValidUsername(user.username)
    && isValidPassword(user.password)

}

function isValidFirstName(firstName) {
    return firstName.length >= 2;
}

function isValidLastName(lastName) {
    return lastName.length >= 2;
}

function isValidUsername(username) {
    return username.length >= 3;
}

function isValidPassword(password) {
    return password.length >= 6;
}