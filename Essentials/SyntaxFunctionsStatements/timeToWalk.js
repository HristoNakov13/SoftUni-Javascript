function calculateStudentTravelTime(steps, footDistance, speed) {
    let speedInMetersPerSec = speed / 3.6;
    let distance = steps * footDistance;
    let rest = Math.floor(distance / 500);

    let travelTimeInSeconds = distance / speedInMetersPerSec + rest * 60;
    let hours = Math.floor(travelTimeInSeconds / 3600);
    let hoursPrint = hours < 10 ? "0" + hours : hours;

    let minutes = Math.floor(travelTimeInSeconds / 60);
    let minutesPrint = minutes < 10 ? "0" + minutes : minutes;

    let seconds = Math.ceil(travelTimeInSeconds) % 60;
    let secondsPrint = seconds < 10 ? "0" + seconds : seconds;

    console.log(`${hoursPrint}:${minutesPrint}:${secondsPrint}`)

}





