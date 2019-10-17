function acceptance() {
	const INPUT_ELEMENTS = {
		shippingCompany: document.querySelector("#fields").querySelector("[name=shippingCompany]"),
		productName: document.querySelector("#fields").querySelector("[name=productName]"),
		productQuantity: document.querySelector("#fields").querySelector("[name=productQuantity]"),
		productScrape: document.querySelector("#fields").querySelector("[name=productScrape]"),
	};

	const VALIDATOR = {
		companyName: isValidCompany,
		productName: isValidProduct,
		quantity: isValidQuantity,
		scrape: isValidScrape,
	};

	const warehouse = document.querySelector("#warehouse");

	const addProductToWarehouseHandler = function () {
		let companyName = INPUT_ELEMENTS.shippingCompany.value;
		let productName = INPUT_ELEMENTS.productName.value;
		let quantity = Number(INPUT_ELEMENTS.productQuantity.value);
		let scrape = Number(INPUT_ELEMENTS.productScrape.value);

		let productData = {
			companyName,
			productName,
			quantity,
			scrape,
		};

		if (!allInputsAreValid(VALIDATOR, productData) || quantity - scrape <= 0) {
			return;
		}

		let outOfStockBtn = document.createElement("button");
		outOfStockBtn.textContent = "Out of stock";
		outOfStockBtn.addEventListener("click", outOfStockEventHandler);

		let productElement = createProductElement("div", "p", productData, outOfStockBtn);
		warehouse.appendChild(productElement);

		clearInputElementsValues(INPUT_ELEMENTS);
	};
	
	const addItBtn = document.querySelector("#acceptance");
	addItBtn.addEventListener("click", addProductToWarehouseHandler);

	function outOfStockEventHandler(event) {
		warehouse.removeChild(event.target.parentNode);
	}

	function createProductElement(wrapperTag, contentTagName, productData, outOfStockBtn) {
		let wrapperElement = document.createElement(wrapperTag);
		let contentElement = document.createElement(contentTagName);

		let quantity = productData.quantity - productData.scrape;
		contentElement.textContent = `[${productData.companyName}] ${productData.productName} - ${quantity} pieces`;

		wrapperElement.appendChild(contentElement);
		wrapperElement.appendChild(outOfStockBtn);

		return wrapperElement;
	}

	function clearInputElementsValues(INPUT_ELEMENTS) {
		let elements = Object.keys(INPUT_ELEMENTS);

		elements.forEach(element => INPUT_ELEMENTS[element].value = "");
	}

	function allInputsAreValid(VALIDATOR, productData) {
		let forms = Object.keys(productData);
		let areValid = true;

		for (const form of forms) {
			if (!VALIDATOR[form](productData[form])) {
				areValid = false;
				break;
			}
		}
		return areValid;
	}
	
	function isValidCompany(companyName) {
		return companyName !== "";
	}
	
	function isValidProduct(productName) {
		return productName !== "";
	}
	
	function isValidQuantity(quantity) {
		return typeof quantity === "number";
	}

	function isValidScrape(scrape) {
		return typeof scrape === "number";
	}
}