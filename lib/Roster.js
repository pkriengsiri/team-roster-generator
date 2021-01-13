// const Manager = require("./Manager");
// const Engineer = require("./Engineer");
// const Intern = require("./Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

class Roster {
  constructor() {
    this.employees = [];
    this.employeeQuestions = [
      {
        type: "input",
        name: "name",
        message: "Enter the employee's name:",
      },
      {
        type: "input",
        name: "id",
        message: "Enter the employee's ID:",
      },
      {
        type: "input",
        name: "email",
        message: "Enter the employee's email address:",
      },
    ];
    this.managerQuestions = [
      {
        type: "input",
        name: "officeNumber",
        message: "Enter the manager's office number:",
      },
    ];
  }

  getEmployeeType() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeType",
          choices: ["Manager", "Engineer", "Intern"],
          message: "Select an employee type to create:",
        },
      ])
      .then((val) => {
        switch (val.employeeType) {
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

  getManagerInfo() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeType",
          choices: ["Manager", "Engineer", "Intern"],
          message: "Please select an employee to create:",
        },
      ])
      .then((val) => {
        switch (val.employeeType) {
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
