function solve(employees) {
    let table = "<table>\r\n";

    for (let employee of employees) {
        table += "\t<tr>\r\n";

        let current = JSON.parse(employee);

        for (const key in current) {
            table += createColumn(current[key]);
        }
        table += "\t</tr>\r\n";
    }

    table += "</table>";
    console.log(table);

    function createColumn(content) {
        let textContent = content + "";
        let column = `\t\t<td>${textContent}</td>\r\n`;
        return column;
    }
}

solve(['{"name":"Pesho","position":"Promenliva","salary":100000}',
    '{"name":"Teo","position":"Lecturer","salary":1000}',
    '{"name":"Georgi","position":"Lecturer","salary":1000}']
);