class Kitchen {
    constructor(budget) {
        this.budget = budget;
        this.productsInStock = {};
        this.actionsHistory = [];
        this.menu = {};
        this.menuSize = 0;
    }

    loadProducts(products) {
        let currentActionsHistory = [];
        for (const productData of products) {
            let split = productData.split(" ");
            let name = split[0];
            let quantity = Number(split[1]);
            let price = Number(split[2]);
            let action;

            if (this.canAffordProduct(price)) {
                action = this.buyProduct(name, quantity, price);
            } else {
                action = `There was not enough money to load ${quantity} ${name}`
            }
            currentActionsHistory.push(action);
        }

        this.addToHistory(currentActionsHistory);
        return currentActionsHistory.join("\r\n");
    }

    canAffordProduct(price) {
        return this.budget >= price;
    }

    hasProductsInStock(name, neededQuantity) {
        return this.productsInStock[name] >= neededQuantity;
    }

    buyProduct(name, quantity, price) {
        if (this.productsInStock[name] === undefined) {
            this.productsInStock[name] = quantity;
        } else {
            this.productsInStock[name] += quantity;
        }
        this.budget -= price;

        return `Successfully loaded ${quantity} ${name}`;
    }

    addToHistory(action) {
        this.actionsHistory.concat(action);
    }

    addToMenu(meal, productsNeeded, price) {
        if (this.isInTheMenu(meal)) {
            return `The ${meal} is already in our menu, try something different.`;
        }

        this.menu[meal] = {
            products: productsNeeded,
            price,
        };
        this.menuSize++;

        return `Great idea! Now with the ${meal} we have ${this.menuSize} meals in the menu, other ideas?`;
    }

    isInTheMenu(meal) {
        return this.menu[meal] !== undefined;
    }

    showTheMenu() {
        if (this.menuSize === 0) {
            return "Our menu is not ready yet, please come later...";

        }
        let menu = [];

        for (const meal in this.menu) {
            let mealData = `${meal} - $ ${this.menu[meal].price}`
            menu.push(mealData);
        }
        return menu.join("\n") + "\n";
    }

    makeTheOrder(meal) {
        if (!this.isInTheMenu(meal)) {
            return `There is not ${meal} yet in our menu, do you want to order something else?`;
        }

        if (!this.canPrepareMeal(meal)) {
            return `For the time being, we cannot complete your order (${meal}), we are very sorry...`;
        }

        this.budget += this.menu[meal].price;
        return this.prepareMeal(meal);
    }

    prepareMeal(meal) {
        let recipe = this.menu[meal].products;
        for (const productData of recipe) {
            let split = productData.split(" ");
            let name = split[0];
            let quantity = Number(split[1]);
            this.productsInStock[name] -= quantity;
        }
        return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${this.menu[meal].price}.`
    }

    canPrepareMeal(meal) {
        let canPrepare = true;
        let recipe = this.menu[meal].products;
        for (const productData of recipe) {
            let split = productData.split(" ");
            let name = split[0];
            let quantity = Number(split[1]);
            if (!this.hasProductsInStock(name, quantity)) {
                canPrepare = false;
                break;
            }
        }
        return canPrepare;
    }
}