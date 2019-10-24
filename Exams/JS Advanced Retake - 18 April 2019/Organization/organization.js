class Organization {
    constructor(name, budget) {
        this.name = name;
        this.budget = Number(budget);
        this.employees = [];
        this.departments = {
            marketing: this.budget * 0.4,
            finance: this.budget * 0.25,
            production: this.budget * 0.35
        };
    }

    get departmentsBudget() {
        return this.departments;
    }

    add(employeeName, department, salary) {
        if (!this.hasEnoughBudgetToPaySalary(department, salary)) {
            let offerSalary = this.departmentsBudget[department];

            return `The salary that ${department} department can offer to you Mr./Mrs. ${employeeName} is $${offerSalary}.`;
        }

        let employee = {
            employeeName,
            department,
            salary,
        };

        return this.hireEmployee(employee);
    }

    hireEmployee(employee) {
        this.employees.push(employee);
        this.departmentsBudget[employee.department] -= employee.salary;

        return `Welcome to the ${employee.department} team Mr./Mrs. ${employee.employeeName}.`;
    }

    hasEnoughBudgetToPaySalary(department, salary) {
        return this.departmentsBudget[department] >= salary;
    }

    employeeExists(employeeName) {
        let foundEmployee = this.employees.find(employee => employee.employeeName === employeeName);

        if (foundEmployee === undefined) {
            return `Mr./Mrs. ${employeeName} is not working in ${this.name}.`;
        } else {
            return `Mr./Mrs. ${employeeName} is part of the ${foundEmployee.department} department.`;
        }
    }

    leaveOrganization(employeeName) {
        let employee = this.employees.find(employee => employee.employeeName === employeeName);

        if (employee === undefined) {
            return `Mr./Mrs. ${employeeName} is not working in ${this.name}.`;
        }

        let freedBudget = employee.salary;
        let employeeDepartment = employee.department;

        this.increaseBudget(employeeDepartment, freedBudget);
        this.employees.splice(this.employees.indexOf(employee), 1);

        return `It was pleasure for ${this.name} to work with Mr./Mrs. ${employeeName}.`;
    }

    increaseBudget(department, amount) {
        this.departmentsBudget[department] += amount;

        return this.departmentsBudget[department];
    }

    status() {
        let report = `${this.name.toUpperCase()} DEPARTMENTS:`;
        let departments = Object.keys(this.departmentsBudget);

        departments.forEach(department => report += this.reportDepartment(department));

        return report;
    }

    reportDepartment(department) {
        let report = "";
        let departmentEmployees =
            this.employees
                .filter(employee => employee.department === department)
                .sort((s, f) => f.salary - s.salary);
        report += `\n${department[0].toUpperCase() + department.substring(1)} | Employees: ${departmentEmployees.length}: `;
        report += departmentEmployees.map(employee => employee.employeeName).join(", ");

        report += ` | Remaining Budget: ${this.departmentsBudget[department]}`;
        return report;
    }
}