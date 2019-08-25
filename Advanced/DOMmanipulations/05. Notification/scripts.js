function notify(message) {
    let notificationElement = document.getElementById("notification");
    notificationElement.textContent = message;
    notificationElement.style.display = "block";

    setTimeout(toggleNotificationOFF, 2000);

    function toggleNotificationOFF() {
        notificationElement.style.display = "none";
    }
}