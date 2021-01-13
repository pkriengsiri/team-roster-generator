// const Manager = require("./Manager");
// const Engineer = require("./Engineer");
// const Intern = require("./Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

class Roster {
    constructor() {
        this.employees = [];
    }

    getEmployeeType() {
        inquirer
          .prompt([
            {
              type: "list",
              name: "employeeType",
              choices: ["Manager", "Engineer","Intern"],
              message: "Please select an employee to create:"
            }
          ])
          .then(val => {
            switch(val.employeeType) {
                case "Manager":
                    getManagerInfo();
                    break;
                case "Engineer":
                    getEngineerInfo();
                    break;
                case "Intern":
                    getInternInfo();
                    break;
            }
            console.log(val);
          });
    }

    init() {
        this.getEmployeeType();
    }
}

module.exports = Roster;

