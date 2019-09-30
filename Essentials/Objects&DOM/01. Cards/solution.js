function solve() {

    let ELEMENTS = {
        firstPlayerDeck: document.getElementById("player1Div").getElementsByTagName("img"),
        firstPlayerResult: document.getElementById("result").getElementsByTagName("span")[0],
        secondPlayerDeck: document.getElementById("player2Div").getElementsByTagName("img"),
        secondPlayerResult: document.getElementById("result").getElementsByTagName("span")[2],
        fightHistory: document.getElementById("history"),
    };

    let firstPlayerLastSelectedCard;
    let secondPlayerLastSelectedCard;
    
    function firstPlayerCardClickEvent() {
        if (fightHappened(ELEMENTS.firstPlayerResult.textContent
            , ELEMENTS.secondPlayerResult.textContent)) {
            clearResult();
        }
        firstPlayerLastSelectedCard = checkForSelectedCards(firstPlayerLastSelectedCard, this);
        commonClickEvent(this, ELEMENTS.firstPlayerResult);
    }

    function secondPlayerCardClickEvent() {
        if (fightHappened(ELEMENTS.firstPlayerResult.textContent
            , ELEMENTS.secondPlayerResult.textContent)) {
            clearResult();
        }
        secondPlayerLastSelectedCard = checkForSelectedCards(secondPlayerLastSelectedCard, this);
        commonClickEvent(this, ELEMENTS.secondPlayerResult);
    }

    function checkForSelectedCards(playerLastSelectedCard, selectedCard) {
        if (playerLastSelectedCard !== undefined) {
            playerLastSelectedCard.setAttribute("src", "images/card.jpg");
        }
        return selectedCard;
    }

    function commonClickEvent(card, playerResult) {
        let cardValue = card.getAttribute("name");
        playerResult.textContent = cardValue;
        card.setAttribute("src", "images/whiteCard.jpg");
        fight(firstPlayerLastSelectedCard, secondPlayerLastSelectedCard);
    }

    function clearResult() {
        ELEMENTS.firstPlayerResult.textContent = "";
        ELEMENTS.secondPlayerResult.textContent = "";
        firstPlayerLastSelectedCard = undefined;
        secondPlayerLastSelectedCard = undefined;
    }

    function fightHappened(firstPlayerResult, secondPlayerResult) {
        return firstPlayerResult !== ""
            && secondPlayerResult !== "";
    }

    function fight(firstPlayerSelectedCard, secondPlayerSelectedCard) {
        console.log(firstPlayerSelectedCard, secondPlayerSelectedCard);
        if (firstPlayerSelectedCard !== undefined && secondPlayerSelectedCard !== undefined) {

            let firstCardValue = +firstPlayerSelectedCard.getAttribute("name");
            let secondCardValue = +secondPlayerSelectedCard.getAttribute("name");

            if (firstCardValue > secondCardValue) {
                firstPlayerSelectedCard.style.border = "2px solid green";
                secondPlayerSelectedCard.style.border = "2px solid red";
            } else {
                firstPlayerSelectedCard.style.border = "2px solid red";
                secondPlayerSelectedCard.style.border = "2px solid green";
            }
            firstPlayerSelectedCard.removeEventListener("click", firstPlayerCardClickEvent);
            secondPlayerSelectedCard.removeEventListener("click", secondPlayerCardClickEvent);
            addFightToHistory(firstCardValue, secondCardValue);
        }
    }

    function addFightToHistory(firstPlayerCardValue, secondPlayerCardValue) {
        ELEMENTS.fightHistory.textContent += `[${firstPlayerCardValue} vs ${secondPlayerCardValue}] `;

    }

    for (const card of ELEMENTS.firstPlayerDeck) {
        card.addEventListener("click", firstPlayerCardClickEvent);
    }

    for (const card of ELEMENTS.secondPlayerDeck) {
        card.addEventListener("click", secondPlayerCardClickEvent);
    }
}