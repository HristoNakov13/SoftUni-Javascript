export const partials = {
    header: "./view/common/header.hbs",
    footer: "./view/common/footer.hbs",
};

export function setSessionData(ctx) {
    ctx.isLogged = sessionStorage.getItem("authtoken") !== null;
    ctx.username = sessionStorage.getItem("username");
    ctx.userID = sessionStorage.getItem("userID");
}

const notificationElements = {
    success: document.getElementById("successNotification"),
    error: document.getElementById("errorNotification"),
    loading: document.getElementById("loadingNotification"),
};

function displayNotification(notificationElement, message) {
    hidePreviousNotifications();
    
    notificationElement.textContent = message;
    notificationElement.style.display = "block";
}

function displayLoading() {
    notificationElements.loading.style.display = "block";
}

function hideLoading() {
    notificationElements.loading.style.display = "none";
}

function hidePreviousNotifications() {
    for (const element in notificationElements) {
        notificationElements[element].style.display = "none";
    }
}

const success = displayNotification.bind(undefined, notificationElements.success);
const error = displayNotification.bind(undefined, notificationElements.error);

export const notifications = {
    success,
    error,
    displayLoading,
    hideLoading,
};