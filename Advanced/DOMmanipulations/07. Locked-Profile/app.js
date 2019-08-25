function lockedProfile() {
    let profiles = Array.from(document.getElementsByClassName("profile"));

    for (const profile of profiles) {
        let inputFields = profile.getElementsByTagName("input");

        let showDetailsButton = profile.getElementsByTagName("button")[0];
        let lockRadioBtn = getLockRadioBtn(inputFields);
        let detailsElement = getDetailsElement(profile);

        showDetailsButton.addEventListener("click", function () {
            if (!lockRadioBtn.checked) {
                if (detailsElement.style.display === "block") {
                    detailsElement.style.display = "none";
                } else {
                    detailsElement.style.display = "block";
                }
            }
        });
    }

    function getDetailsElement(profile) {
        let divs = profile.getElementsByTagName("div");
        let detailsElement;
        for (const div of divs) {
            if (typeof div.id !== undefined) {
                detailsElement = div;
                break;
            }
        }
        return detailsElement;
    }

    function getLockRadioBtn(inputFields) {
        let lockRadioBtn;
        for (const inputField of inputFields) {
            if (inputField.value === "lock") {
                lockRadioBtn = inputField;
                break;
            }
        }
        return lockRadioBtn;
    }
}