function solve() {
    const ELEMENTS = {
        firstPlayerDeck: document.getElementById("player1Div").getElementsByTagName("img"),
        firstPlayerResult: document.getElementById("result").getElementsByTagName("span")[0],
        secondPlayerDeck: document.getElementById("player2Div").getElementsByTagName("img"),
        secondPlayerResult: document.getElementById("result").getElementsByTagName("span")[2],
        fightHistory: document.getElementById("history"),
    };

    Array.from(ELEMENTS.firstPlayerDeck).forEach(card => card.addEventListener("click", cardClickEventHandler));
    Array.from(ELEMENTS.secondPlayerDeck).forEach(card => card.addEventListener("click", cardClickEventHandler));

    let firstPlayerLastSelectedCard;
    let secondPlayerLastSelectedCard;

    function cardClickEventHandler(e) {
        if (fightHappened(ELEMENTS.firstPlayerResult.textContent
            , ELEMENTS.secondPlayerResult.textContent)) {
            clearResult();
        }

        let clickedCard = e.target;
        let cardDeckID = clickedCard.parentNode.id;
        let cardValue = clickedCard.getAttribute("name");
        markCardAsSelected(clickedCard);

        if (cardBelongsToFirstPlayer(cardDeckID)) {
            if (hasAlreadySelectedCard(firstPlayerLastSelectedCard)) {
                unmarkLastSelectedCard(firstPlayerLastSelectedCard);
            }
            ELEMENTS.firstPlayerResult.textContent = cardValue;
            firstPlayerLastSelectedCard = clickedCard;
        } else {
            if (hasAlreadySelectedCard(secondPlayerLastSelectedCard)) {
                unmarkLastSelectedCard(secondPlayerLastSelectedCard);
            }
            ELEMENTS.secondPlayerResult.textContent = cardValue;
            secondPlayerLastSelectedCard = clickedCard;
        }

        if (playersCanFight(firstPlayerLastSelectedCard, secondPlayerLastSelectedCard)) {
            fight(firstPlayerLastSelectedCard, secondPlayerLastSelectedCard);
        }
    }

    const FIRST_PLAYER_DECK_ID = "player1Div";

    function cardBelongsToFirstPlayer(cardDeckID) {
        return cardDeckID === FIRST_PLAYER_DECK_ID;
    }

    function hasAlreadySelectedCard(playerLastSelectedCard) {
        return playerLastSelectedCard !== undefined;
    }

    function unmarkLastSelectedCard(lastSelectedCard) {
        lastSelectedCard.setAttribute("src", "images/card.jpg");
    }

    function markCardAsSelected(card) {
        card.setAttribute("src", "images/whiteCard.jpg");
    }

    function playersCanFight(firstPlayerLastSelectedCard, secondPlayerLastSelectedCard) {
        return firstPlayerLastSelectedCard !== undefined
            && secondPlayerLastSelectedCard !== undefined;
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
        let firstPlayerCardValue = +firstPlayerSelectedCard.getAttribute("name");
        let secondPlayerCardValue = +secondPlayerSelectedCard.getAttribute("name");

        //wat do when card values are equal?
        if (firstPlayerCardValue > secondPlayerCardValue) {
            firstPlayerSelectedCard.style.border = "2px solid green";
            secondPlayerSelectedCard.style.border = "2px solid red";
        } else {
            firstPlayerSelectedCard.style.border = "2px solid red";
            secondPlayerSelectedCard.style.border = "2px solid green";
        }
        firstPlayerSelectedCard.removeEventListener("click", cardClickEventHandler);
        secondPlayerSelectedCard.removeEventListener("click", cardClickEventHandler);
        addFightToHistory(firstPlayerCardValue, secondPlayerCardValue);
    }

    function addFightToHistory(firstPlayerCardValue, secondPlayerCardValue) {
        ELEMENTS.fightHistory.textContent += `[${firstPlayerCardValue} vs ${secondPlayerCardValue}] `;
    }
}