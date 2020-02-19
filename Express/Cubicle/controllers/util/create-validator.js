function isValidName(name) {
    return name.length >= 3;
}

function isValidDescription(description) {
    return description.length >= 10;
}

function isValidImageUrl(imgUrl) {
    return imgUrl.match(/^(http:\/\/|https:\/\/|()).+(\.png|\.jpg|\.gif|\.jpeg)$/) !== null;
}

const createValidator = {
    isValidDescription,
    isValidImageUrl,
    isValidName
}

module.exports = createValidator;