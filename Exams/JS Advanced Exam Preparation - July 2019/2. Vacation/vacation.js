class Vacation {
    constructor(organizer, destination, budget) {
        this.organizer = organizer;
        this.destination = destination;
        this.budget = budget;
        this.kids = {};
    }

    registerChild(name, grade, budget) {
        if (this.isRegistered(name, grade)) {
            return `${name} is already in the list for this ${this.destination} vacation.`
        }

        if (!this.canAffordVacation(this.budget, budget)) {
            return `${name}'s money is not enough to go on vacation to ${this.destination}.`
        }

        if (this.kids[grade] === undefined) {
            this.kids[grade] = [];
        }

        this.kids[grade].push(`${name}-${budget}`);

        return this.kids[grade];
    }

    canAffordVacation(vacationBudget, childBudget) {
        return childBudget >= vacationBudget;
    }

    isRegistered(name, grade) {
        let isRegistered = false;

        if (this.kids[grade] === undefined) {
            return isRegistered;
        }

        for (const kid of this.kids[grade]) {
            if (kid.includes(name)) {
                isRegistered = true;
                break;
            }
        }
        return isRegistered;
    }

    removeChild(name, grade) {
        let result = `We couldn't find ${name} in ${grade} grade.`;

        if (this.kids[grade] === undefined) {
            return result;
        }

        for (let i = 0; i < this.kids[grade].length; i++) {
            let kidName = this.kids[grade][i].split("-")[0];
            if (kidName === name) {
                this.kids[grade].splice(i, 1);
                result = this.kids[grade];
                break;
            }
        }

        return result;
    }

    toString() {
        if (Object.entries(this.kids).length === 0) {
            return `No children are enrolled for the trip and the organization of ${this.organizer} falls out...`;
        }

        let grades = Object.keys(this.kids);
        grades.sort((f, s) => f - s);

        let numberOfChildren = this.numberOfRegisteredChildren();

        let result = `${this.organizer} will take ${numberOfChildren} children on trip to ${this.destination}\n`;
        grades.forEach(grade => {
            if (this.kids[grade].length > 0) {
                result += `Grade: ${grade}\n`;
                let currentChild = 1;
                this.kids[grade].forEach(kid => {
                    result += `${currentChild++}. ${kid}\n`;
                });
            }
        });

        return result;
    }

    get numberOfChildren() {
        let amount = 0;
        for (const grade in this.kids) {
            amount += this.kids[grade].length;
        }

        return amount;
    }
}



