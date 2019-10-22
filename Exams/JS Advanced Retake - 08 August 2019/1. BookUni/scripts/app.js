function solve() {
    const BOOK_INPUT_FIELDS = {
        title: document.querySelectorAll("input")[0],
        year: document.querySelectorAll("input")[1],
        price: document.querySelectorAll("input")[2],
    };

    const BOOK_VALIDATOR = {
        title: isValidTitle,
        price: isValidPrice,
        year: isValidYear
    };

    let totalStoreProfit = 0;

    let oldBooksSection = document.querySelector("#outputs").querySelectorAll(".bookShelf")[0];
    let newBooksSection = document.querySelector("#outputs").querySelectorAll(".bookShelf")[1];
    let profitDisplayElement = document.querySelectorAll("h1")[1];

    let addBookBtn = document.querySelector("button");

    let addBookEventHandler = function (event) {
        event.preventDefault();
        let title = BOOK_INPUT_FIELDS.title.value;
        let year = Number(BOOK_INPUT_FIELDS.year.value);
        let price = Number(BOOK_INPUT_FIELDS.price.value);

        let bookData = {
            title,
            year,
            price,
        };

        if (!isValidBookData(bookData)) {
            return;
        }

        let book = createNewBookElement(bookData);

        if (isOldBook(bookData.year)) {
            addToOldBooksSection(book);
        } else {
            addToNewBooksSection(book);
        }
    };

    addBookBtn.addEventListener("click", addBookEventHandler);

    const OLD_BOOK_DISCOUNT = 0.15;

    function addToOldBooksSection(bookElement) {
        let buyBtn = bookElement.querySelector("button");
        let price = Number(bookElement.textContent.match(/\d+\.\d{2}/g));
        let discountPrice = price - price * OLD_BOOK_DISCOUNT;

        buyBtn.textContent = `Buy it only for ${discountPrice.toFixed(2)} BGN`;

        let moveToOldSectionBtn = bookElement.querySelectorAll("button")[1];

        if (moveToOldSectionBtn !== undefined) {
            bookElement.removeChild(moveToOldSectionBtn);
        }

        oldBooksSection.appendChild(bookElement);
    }

    function buyBookEventHandler(event) {
        let price = Number(event.target.textContent.match(/\d+\.\d{2}/g));
        let book = event.target.parentNode;
        let section = book.parentNode;

        section.removeChild(book);

        totalStoreProfit += price;
        profitDisplayElement.textContent = `Total Store Profit: ${totalStoreProfit.toFixed(2)} BGN`;
    }

    function addToNewBooksSection(bookElement) {
        let moveToOldSectionBtn = document.createElement("button");
        moveToOldSectionBtn.textContent = "Move to old section";
        moveToOldSectionBtn.addEventListener("click", moveToOldSectionEventHandler);

        bookElement.appendChild(moveToOldSectionBtn);
        newBooksSection.appendChild(bookElement);
    }

    function moveToOldSectionEventHandler(event) {
        let book = event.target.parentNode;

        newBooksSection.removeChild(book);
        addToOldBooksSection(book);
    }

    function createNewBookElement(bookData) {
        let wrapper = document.createElement("div");
        wrapper.setAttribute("class", "book");

        let bookInfo = document.createElement("p");
        bookInfo.textContent = `${bookData.title} [${bookData.year}]`;

        let buyBtn = document.createElement("button");
        buyBtn.textContent = `Buy it only for ${bookData.price.toFixed(2)} BGN`;
        buyBtn.addEventListener("click", buyBookEventHandler);

        wrapper.appendChild(bookInfo);
        wrapper.appendChild(buyBtn);

        return wrapper;
    }

    function isOldBook(year) {
        return year < 2000;
    }

    function isValidBookData(bookData) {
        let areValid = true;

        for (const argument in bookData) {
            if (!BOOK_VALIDATOR[argument](bookData[argument])) {
                areValid = false;
                break;
            }
        }

        return areValid;
    }

    function isValidTitle(bookTitle) {
        return bookTitle !== "";
    }

    function isValidPrice(price) {
        return typeof price === "number" && price > 0;
    }

    function isValidYear(year) {
        return typeof year === "number" && year > 0;
    }
}