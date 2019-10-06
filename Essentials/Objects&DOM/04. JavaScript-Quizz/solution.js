function solve() {
    let questionsAndAnswers = {
        "Question #1: Which event occurs when the user clicks on an HTML element?": "onclick",
        "Question #2: Which function converting JSON to string?": "JSON.stringify()",
        "Question #3: What is DOM?": "A programming API for HTML and XML documents",
    };

    let sectionPages = document.querySelectorAll("section");
    Array.from(sectionPages).map(section => {
        let sectionAnswers = section.querySelectorAll(".answer-text");
        Array.from(sectionAnswers).forEach(answer => answer.addEventListener("click", answerClickHandler));
    });

    let currentIndex = 0;
    let correctAnswers = 0;

    function answerClickHandler(event) {
        let question = sectionPages[currentIndex].querySelector("h2").textContent;
        let answer = event.target.textContent;

        if (isCorrectAnswer(question, answer)) {
            correctAnswers++;
        }

        sectionPages[currentIndex++].style.display = "none";

        if (sectionPages[currentIndex] !== undefined) {
            sectionPages[currentIndex].style.display = "block";
        } else {
            displayResult(correctAnswers);
        }
    }

    function isCorrectAnswer(question, answer) {
        return questionsAndAnswers[question] === answer;
    }

    const JAVA_FAN_ANSWERS_NEEDED = 3;
    const JAVA_FAN_MESSAGE = "You are recognized as top JavaScript fan!";

    function displayResult(correctAnswers) {
        let resultsParent = document.getElementById("results");
        resultsParent.style.display = "block";
        let result = resultsParent.querySelector("h1");

        if (correctAnswers === JAVA_FAN_ANSWERS_NEEDED) {
            result.textContent = JAVA_FAN_MESSAGE;
        } else {
            result.textContent = `You have ${correctAnswers} right answers`;
        }
    }
}
