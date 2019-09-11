function f(template) {
    let myObj = {
        __proto__: {},
        extend: function (template) {
            for (const value in template) {
                if (typeof template[value] === "function") {
                    this.__proto__[value] = template[value];
                } else {
                    this[value] = template[value];
                }
            }
        }
    };
    myObj.extend(template);
    return myObj;
}