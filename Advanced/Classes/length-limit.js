class Stringer {
    constructor(initialString, initialLength) {
        this.innerString = initialString;
        this.innerLength = initialLength;
    }

    increase(length) {
        let incrementedLength = this.innerLength + length;
        this.setInnerLength(incrementedLength);
    }

    decrease(length) {
        let incrementedLength = this.innerLength - length;
        this.setInnerLength(incrementedLength);
    }

    setInnerLength(length) {
        if (length < 0) {
            this.innerLength = 0;
        } else {
            this.innerLength = length;
        }
    }

    toString() {
        let result = this.innerString;

        if (this.innerString.length > this.innerLength) {
            result = this.innerString.substring(0, this.innerLength) + "...";
        }

        return result;
    }
}

//
// let test = new Stringer("Test", 5);
// console.log(test.toString()); // Test
//
// test.decrease(3);
// console.log(test.toString()); // Te...
//
// test.decrease(5);
// console.log(test.toString()); // ...
//
// test.increase(4);
// console.log(test.toString()); //
