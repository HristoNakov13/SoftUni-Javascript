function isValidTitle(title) {
    return title !== "";
}

function isValidAuthor(author) {
    return author !== "";
}

//Turns out validating ISBN is serious business
//here's a little simulation lol

function isValidISBN(ISBN) {
    const ISBN_LENGTH = 2;

    return ISBN.length >= ISBN_LENGTH;
}

export const validator = {
    title: isValidTitle,
    author: isValidAuthor,
    ISBN: isValidISBN,
};