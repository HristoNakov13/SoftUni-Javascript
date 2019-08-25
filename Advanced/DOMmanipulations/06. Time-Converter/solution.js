// function attachEventsListeners() {

    //naive way
    // const SELECTORS = {
    //     daysButton: "daysBtn",
    //     daysInput: "days",
    //     hoursButton: "hoursBtn",
    //     hoursInput: "hours",
    //     minutesButton: "minutesBtn",
    //     minutesInput: "minutes",
    //     secondsButton: "secondsBtn",
    //     secondsInput: "seconds",
    // };
    //
    // let daysButton = document.getElementById(SELECTORS.daysButton);
    // let daysInput = document.getElementById(SELECTORS.daysInput);
    //
    // let hoursButton = document.getElementById(SELECTORS.hoursButton);
    // let hoursInput = document.getElementById(SELECTORS.hoursInput);
    //
    // let minutesButton = document.getElementById(SELECTORS.minutesButton);
    // let minutesInput = document.getElementById(SELECTORS.minutesInput);
    //
    // let secondsButton = document.getElementById(SELECTORS.secondsButton);
    // let secondsInput = document.getElementById(SELECTORS.secondsInput);
    //
    // function setValues(days, hours, minutes, seconds) {
    //     daysInput.value = days;
    //     hoursInput.value = hours;
    //     minutesInput.value = minutes;
    //     secondsInput.value = seconds;
    // }
    //
    // daysButton.addEventListener("click", function () {
    //     let days = Number(daysInput.value);
    //     let hours = days * 24;
    //     let minutes = hours * 60;
    //     let seconds = minutes * 60;
    //     setValues(days, hours, minutes, seconds);
    // });
    //
    // hoursButton.addEventListener("click", function () {
    //     let hours = Number(hoursInput.value);
    //     let days = hours / 24;
    //     let minutes = hours * 60;
    //     let seconds = minutes * 60;
    //     setValues(days, hours, minutes, seconds);
    // });
    //
    // minutesButton.addEventListener("click", function () {
    //     let minutes = Number(minutesInput.value);
    //     let hours = minutes / 60;
    //     let days = hours / 24;
    //     let seconds = minutes * 60;
    //     setValues(days, hours, minutes, seconds);
    // });
    //
    // secondsButton.addEventListener("click", function () {
    //     let seconds = Number(secondsInput.value);
    //     let minutes = seconds / 60;
    //     let hours = minutes / 60;
    //     let days = hours / 24;
    //
    //     setValues(days, hours, minutes, seconds);
    // });
// }

    //by lapd87
    function attachEventsListeners() {

        let buttons = document.querySelectorAll('input[type="button"]');

        for (let button of buttons) {
            button.addEventListener("click", convert);
        }

        function convert(event) {

            let type = event.target.parentElement.children[1].id;
            let value = +event.target.parentElement.children[1].value;

            let seconds = 0;

            switch (type) {
                case"days":
                    seconds = value * 24 * 60 * 60;
                    break;
                case"hours":
                    seconds = value * 60 * 60;
                    break;
                case"minutes":
                    seconds = value * 60;
                    break;
                case"seconds":
                    seconds = value;
                    break;
            }

            let minutes = seconds / 60;
            let hours = minutes / 60;
            let days = hours / 24;

            document.getElementById("days").value = days;
            document.getElementById("hours").value = hours;
            document.getElementById("minutes").value = minutes;
            document.getElementById("seconds").value = seconds;
        }
}