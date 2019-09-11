(function () {
    Array.prototype.last = function () {
        return this[this.length - 1];
    };

    Array.prototype.skip = function (n) {
        return this.slice(n, this.length);
    };

    Array.prototype.take = function (n) {
        return this.slice(0, n);
    };

    Array.prototype.sum = function () {
        let sum = 0;
        for (let i = 0; i < this.length; i++) {
            sum += +this[i];
        }
        return sum;
    };

    Array.prototype.average = function () {
        return this.sum() / this.length;
    };
})();