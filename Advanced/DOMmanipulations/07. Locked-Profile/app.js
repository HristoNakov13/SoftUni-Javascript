function lockedProfile() {
    //selector by className does not work in judge
    let allDivs = document.getElementById("main")
        .querySelectorAll("div");

    let profiles = [];
    profiles.push(allDivs[0]);
    profiles.push(allDivs[2]);
    profiles.push(allDivs[4]);

    profiles.forEach(attachEventListener);

    function attachEventListener(profile) {
        let showMoreBtn = profile.querySelector("button");
        showMoreBtn.addEventListener("click", profileShowMoreEventHandler);
    }

    function profileShowMoreEventHandler() {
        let profileBtn = this;
        let profile = profileBtn.parentNode;

        if (isLocked(profile)) {
            return;
        }
        let infoField = profile.querySelector("div");

        if (isHidden(infoField)) {
            infoField.style.display = "block";
            profileBtn.textContent = "Hide it";
        } else {
            infoField.style.display = "none";
            profileBtn.textContent = "Show more";
        }
    }
    //CSS classes are set to display: hidden by default
    //yet initial style.display value is empty String

    function isHidden(field) {
        return field.style.display === "none"
            || field.style.display === "";
    }

    function isLocked(profile) {
        return profile.getElementsByTagName("input")[0].checked;
    }
}