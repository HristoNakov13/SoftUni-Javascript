function ticketsDatabase(database, sortCriteria) {
    class Ticket {
        constructor(destinationName, price, status) {
            this.destination = destinationName;
            this.price = price;
            this.status = status;
        }
    }
    let tickets = [];

    for (const current of database) {
        let data = current.split("|");
        let destinationName = data[0];
        let price = +data[1];
        let status = data[2];

        let ticket = new Ticket(destinationName, price, status);
        tickets.push(ticket);
    }
    return tickets.sort((ticket2, ticket1) => {
        let sort;
        if (sortCriteria === "destination") {
            sort = ticket2.destination.localeCompare(ticket1.destination);
        } else if (sortCriteria === "price") {
            sort = ticket2.price - ticket1.price;
        } else if (sortCriteria === "status"){
            sort = ticket2.status.localeCompare(ticket1.status);
        }
        return sort;
    });
}

