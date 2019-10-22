class Library {
    constructor(libraryName) {
        this.libraryName = libraryName;
        this.subscribers = [];
        this.subscriptionTypes = {
            normal: this.libraryName.length,
            special: this.libraryName.length * 2,
            vip: Number.MAX_SAFE_INTEGER,
        }
    }

    subscribe(name, type) {
        if (!this.isValidSubscriptionType(type)) {
            throw new Error(`The type ${type} is invalid`);
        }

        let subscriber = this.findSubscriber(name);

        if (this.isRegistered(subscriber)) {
            subscriber.type = type;

            return subscriber;
        }

        subscriber = {
            name,
            type,
            books: []
        };

        this.subscribers.push(subscriber);

        return subscriber;
    }

    unsubscribe(name) {
        let subscriber = this.findSubscriber(name);

        if (!this.isRegistered(subscriber)) {
            throw new Error(`There is no such subscriber as ${name}`);
        }

        let indexOfSub = this.subscribers.indexOf(subscriber);
        this.subscribers.splice(indexOfSub, 1);

        return this.subscribers;
    }

    receiveBook(subscriberName, bookTitle, bookAuthor) {
        let subscriber = this.findSubscriber(subscriberName);

        if (!this.isRegistered(subscriber)) {
            throw new Error(`There is no such subscriber as ${subscriberName}`);
        }

        if (this.hasReachedBooksLimit(subscriber)) {
            console.log(this.subscriptionTypes[subscriber.type]);
            throw new Error(`"You have reached your subscription limit ${this.subscriptionTypes[subscriber.type]}!"`)
        }

        let book = {
            title: bookTitle,
            author: bookAuthor,
        };

        subscriber.books.push(book);

        return subscriber;
    }

    hasReachedBooksLimit(subscriber) {
        return this.subscriptionTypes[subscriber.type] === subscriber.books.length;
    }

    findSubscriber(name) {
        return this.subscribers.find(subscriber => subscriber.name === name);
    }

    isRegistered(subscriber) {
        return subscriber !== undefined;
    }

    isValidSubscriptionType(type) {
        return this.subscriptionTypes[type] !== undefined;
    }

    showInfo() {
        if (this.subscribers.length === 0) {
            return `${this.libraryName} has no information about any subscribers`;
        }

        let subscribersInfo = "";

        for (const subscriber of this.subscribers) {
            subscribersInfo += `Subscriber: ${subscriber.name}, Type: ${subscriber.type}\n`;
            subscribersInfo += this.subscriberBooksInfo(subscriber);
        }

        return subscribersInfo;
    }

    subscriberBooksInfo(subscriber) {
        if (subscriber.books.length === 0) {
            return "Received books: \n";
        }

        let report = "Received books: ";

        for (const book of subscriber.books) {
            report += `${book.title} by ${book.author}, `;
        }

        report = report.substring(0, report.length - 2) + "\n";
        return report;
    }
}