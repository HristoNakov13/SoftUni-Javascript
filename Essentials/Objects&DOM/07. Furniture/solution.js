function solve() {
    let generateBtn = document.getElementById("exercise")
        .getElementsByTagName("button")[0];
    let generateInputField = document.getElementById("exercise").getElementsByTagName("textarea")[0];
    let table = document.getElementsByTagName("tbody")[0];
    let buyBtn = document.getElementsByTagName("button")[1];
    let displayArea = document.getElementsByTagName("textarea")[1];

    buyBtn.addEventListener("click", buyFurniture);

    function buyFurniture() {
        let allFurniture = table.getElementsByTagName("tr");
        let totalPrice = 0;
        let decorationFactor = 0;
        let boughtFurniture = [];
        for (const furniture of allFurniture) {
            if (isBought(furniture)) {
                let name = getFurnitureName(furniture);
                boughtFurniture.push(getFurnitureName(furniture));
                totalPrice += getFurniturePrice(furniture);
                decorationFactor += getFurnitureDecorationFactor(furniture);
            }
        }
        displayCart(boughtFurniture, totalPrice, decorationFactor);
    }

    function displayCart(cart, totalPrice, decorationFactor) {
        let averageDecorationFactor = decorationFactor / cart.length;
        displayArea.textContent = `Bought furniture: ${cart.join(", ")}`;
        displayArea.textContent += `\r\nTotal price: ${totalPrice}`;
        displayArea.textContent += `\r\nAverage decoration factor: ${averageDecorationFactor.toFixed(2)}`;
    }

    function getFurnitureName(furniture) {
        return furniture.getElementsByTagName("td")[1].getElementsByTagName("p")[0].textContent;
    }

    function getFurniturePrice(furniture) {
        return +furniture.getElementsByTagName("td")[2].getElementsByTagName("p")[0].textContent;
    }

    function getFurnitureDecorationFactor(furniture) {
        return +furniture.getElementsByTagName("td")[3].getElementsByTagName("p")[0].textContent;
    }

    function isBought(furniture) {
        return furniture.getElementsByTagName("td")[4].querySelector("input").checked;
    }

    let generateFurniture = function () {
        let marks = document.getElementsByTagName("input")[0];
        marks.disabled = false;
        let inputFurniture = JSON.parse(generateInputField.value);
        for (const furniture of inputFurniture) {
            let row = createTag("tr");
            createFurniture(furniture, row);
        }
    };

    function createFurniture (furnitureJSON, row) {
        let name = createTag("td", furnitureJSON.name);
        let img = createImageTag(furnitureJSON.img);
        let price = createTag("td", furnitureJSON.price);
        let decFactor = createTag("td", furnitureJSON.decFactor);

        let mark = document.createElement("input");
        mark.setAttribute("type", "checkbox");
        let markTag = createTag("td");
        markTag.appendChild(mark);

        appendCellToTable(row, img);
        appendCellToTable(row, name);
        appendCellToTable(row, price);
        appendCellToTable(row, decFactor);
        appendCellToTable(row, markTag);

        table.appendChild(row);
    }

    function appendCellToTable(row, cell) {
        row.appendChild(cell);
    }

    function createTag(tagName, content) {
        let cell = document.createElement(tagName);
        if (content !== undefined) {
            let paragraph = document.createElement("p");
            paragraph.textContent = content;
            cell.appendChild(paragraph);
        }
        return cell;
    }

    function createImageTag(src) {
        let img = document.createElement("img");
        img.setAttribute("src", src);
        let tag = createTag("td");
        tag.appendChild(img);
        return tag;
    }

    generateBtn.addEventListener("click", generateFurniture);
    console.log(generateBtn);
}