// CONSTRUCTOR
class Employee {
    constructor(_name, _id, _email) {
        this.name = _name;
        this.id = _id;
        this.email = _email;
    }

    // Getter for name
    getName() {
        return this.name;
    }

    // Getter for ID
    getId() {
        return this.id;
    }

    // Getter for email
    getEmail() {
        return this.email;
    }

    // Getter for role
    getRole() {
        return "Employee";
    }
}

// EXPORTS
module.exports = Employee;