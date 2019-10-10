class List {
    constructor() {
        this.size = 0;
        this.data = [];
    }

    add(element) {
        if (typeof element === "number") {
            this.data.push(element);
            this.size++;
            this.sortList();
        }
    }

    remove(index) {
        if (this.isValidIndex(index)) {
            this.size--;
            return this.data.splice(index, 1);
        }

        throw Error("Index out of bounds");
    }

    sortList() {
        this.data.sort((f, s) => f - s);
    }

    get(index) {
        if (this.isValidIndex(index)) {
            return this.data[index];
        }

        throw Error("Index out of bounds");
    }

    isValidIndex(index) {
        return index >= 0 && index < this.size;
    }
}

