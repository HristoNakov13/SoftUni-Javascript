class Rat {
    constructor(name) {
        this.name = name;
        this.unitedRats = [];
    }

    unite(otherRat) {
        if (otherRat instanceof Rat) {
            this.unitedRats.push(otherRat);
            this.unitedRats = this.getRats().concat(otherRat.getRats());
        }
    }

    getRats() {
        return this.unitedRats;
    }

    toString() {
        let asString = this.name + "\r\n";
        
        for (const rat of this.unitedRats) {
            asString += "##" + rat.name + "\r\n";
        }
        return asString.trim();
    }
}
