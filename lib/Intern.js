//IMPORT
const Employee = require("./Employee");

// Constructor
class Intern extends Employee {
    constructor(_name, _id, _email, _school) {
        super(_name, _id, _email);
        this.school = _school;
    }

    // Getter for school
    getSchool() {
        return this.school;
    }

    // Getter for role
    getRole() {
        return "Intern";
    }
}

// EXPORT
module.exports = Intern;
