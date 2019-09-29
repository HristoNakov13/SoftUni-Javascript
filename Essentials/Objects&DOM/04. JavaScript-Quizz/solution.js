function solve() {
    let quizzDiv = document.getElementById("quizzie");
    let sectionPages = quizzDiv.getElementsByTagName("section");

    let correctAnswers = 0;

    let questionsAndCorrectAnswers = {
        "Question #1: Which event occurs when the user clicks on an HTML element?": "onclick",
        "Question #2: Which function converting JSON to string?": "JSON.stringify()",
        "Question #3: What is DOM?": "A programming API for HTML and XML documents",
    };

    for (let i = 0; i < sectionPages.length; i++) {
        let section = sectionPages[i];
        let nextSection = sectionPages[i + 1];
        let question = section.getElementsByClassName("question-wrap")[0]
            .getElementsByTagName("h2")[0]
            .textContent;
        let answer;

        let rightSideAnswer = section.getElementsByClassName("quiz-answer high-value")[0]
            .getElementsByClassName("answer-wrap")[0];

        rightSideAnswer.addEventListener("click", function () {
            answer = rightSideAnswer.getElementsByClassName("answer-text")[0].textContent;
            if (isCorrectAnswer(question, answer)) {
                correctAnswers++;
            }
            displayNextSection(section, nextSection);
        });

        let leftSideAnswer = section.getElementsByClassName("quiz-answer low-value")[0]
            .getElementsByClassName("answer-wrap")[0];

        leftSideAnswer.addEventListener("click", function () {
            answer = leftSideAnswer.getElementsByClassName("answer-text")[0].textContent;
            if (isCorrectAnswer(question, answer)) {
                correctAnswers++;
            }
            displayNextSection(section, nextSection);
        });
    }

    function isCorrectAnswer(question, answer) {
        return questionsAndCorrectAnswers[question] === answer;
    }

    function displayNextSection(section, nextSection) {
        section.style.display = "none";

        if (isLastSection(nextSection)) {
            displayResult(correctAnswers);
        } else {
            nextSection.style.display = "block";
        }
    }

    function displayResult(correctAnswers) {
        let resultsParent = document.getElementById("results");
        resultsParent.style.display = "block";
        let resultList = resultsParent.getElementsByClassName("results-inner")[0];
        let result = resultList.getElementsByTagName("h1")[0];

        if (correctAnswers === 3) {
            result.textContent = "You are recognized as top JavaScript fan!";
        } else {
            result.textContent = `You have ${correctAnswers} right answers`;
        }
    }

    function isLastSection(section) {
        return section === undefined;
    }
}
