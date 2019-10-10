class CheckingAccount {
    constructor(clientID, email, firstName, lastName) {
        this.setClientID(clientID);
        this.setEmail(email);
        this.setFirstName(firstName);
        this.setLastName(lastName);
    }

    setClientID(clientID) {
        if (typeof Number(clientID) !== "number" || clientID.length !== 6) {
            throw TypeError("Client ID must be a 6-digit number");
        }
        this.clientID = clientID;
    }

    setEmail(email) {
        if (email.match(/^\w+@[a-zA-Z.]+$/g) == null) {
            throw TypeError("Invalid e-mail");
        }
        this.email = email;
    }

    setFirstName(firstName) {
        if (firstName.length < 3 || firstName.length > 20) {
            throw TypeError("First name must be between 3 and 20 characters long");
        } else if (firstName.match(/[a-zA-z]+/g) == null) {
            throw TypeError("First name must contain only Latin characters");
        }
        this.firstName = firstName;
    }

    setLastName(lastName) {
        if (lastName.length < 3 || lastName.length > 20) {
            throw TypeError("Last name must be between 3 and 20 characters long");
        } else if (lastName.match(/[a-zA-z]+/g) == null) {
            throw TypeError("Last name must contain only Latin characters");
        }
        this.lastName = lastName;
    }
}