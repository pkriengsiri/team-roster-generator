const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
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
    this.engineerQuestions = [
      {
        type: "input",
        name: "github",
        message: "Enter the engineer's GitHub user name:",
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
            this.getManagerInfo();
            break;
          case "Engineer":
            this.getEngineerInfo();
            break;
          case "Intern":
            this.getInternInfo();
            break;
        }
      });
  }

  getManagerInfo() {
    inquirer
      .prompt(this.employeeQuestions.concat(this.managerQuestions))
      .then((val) => {
        const thisManager = new Manager(
          val.name,
          val.id,
          val.email,
          val.officeNumber
        );
        this.employees.push(thisManager);
        console.log(this.employees);
      });
  }

  getEngineerInfo() {
    inquirer
      .prompt(this.employeeQuestions.concat(this.engineerQuestions))
      .then((val) => {
        const thisEngineer = new Engineer(
          val.name,
          val.id,
          val.email,
          val.github
        );
        this.employees.push(thisEngineer);
        console.log(this.employees);
      });
  }

  init() {
    this.getEmployeeType();
  }
}

module.exports = Roster;
