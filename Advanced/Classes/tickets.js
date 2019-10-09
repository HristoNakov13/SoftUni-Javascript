function ticketsManager(ticketsData, sortCriteria) {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }

    let tickets = [];

    ticketsData.map(ticketData => {
        let split = parseTicketData(ticketData);
        let ticket = new Ticket(split[0], Number(split[1]), split[2]);
        tickets.push(ticket);
    });

    function parseTicketData(ticketData) {
        return ticketData.split("|");
    }

    function sortTickets(tickets, sortCriteria) {
        return tickets.sort((first, second) => {
            let firstValue = first[sortCriteria];
            let secondValue = second[sortCriteria];

            if (typeof firstValue === "number" && typeof secondValue === "number") {
                return firstValue - secondValue;
            } else {
                return firstValue.localeCompare(secondValue);
            }
        });
    }

    return sortTickets(tickets, sortCriteria);
}

console.log(ticketsManager(['Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'],
    'destination'
));