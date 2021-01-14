// IMPORT
const Employee = require("./Employee");

// CONSTRUCTOR
class Manager extends Employee{
    constructor(_name, _id, _email,_officeNumber) {
        super(_name,_id,_email);
        this.officeNumber = _officeNumber;
    }

    // Getter for role
    getRole() {
        return "Manager";
    }

    // Getter for Office number
    getOfficeNumber() {
        return this.officeNumber;
    }
}

// EXPORT
module.exports = Manager;