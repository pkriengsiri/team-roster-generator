const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "../output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./htmlRenderer");

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
    this.internQuestions = [
      {
        type: "input",
        name: "school",
        message: "Enter the intern's school name:",
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
        this.addNewEmployee();
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
        this.addNewEmployee();
      });
  }

  getInternInfo() {
    inquirer
      .prompt(this.employeeQuestions.concat(this.internQuestions))
      .then((val) => {
        const thisIntern = new Intern(val.name, val.id, val.email, val.school);
        this.employees.push(thisIntern);
        this.addNewEmployee();
      });
  }

  addNewEmployee() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "confirm",
          choices: ["Yes", "No"],
          message: "Do you want to add another employee?",
        },
      ])
      .then((val) => {
        if (val.confirm === "Yes") {
          this.getEmployeeType();
        } else {
          this.renderHTML();
        }
      });
  }

  renderHTML() {
    console.log("Your roster has been generated");
    const html = render(this.employees);
    fs.writeFile(outputPath, html, (err) =>
      err ? console.error(err) : console.log("Your output file has been created!")
    );
  }

  init() {
    this.getEmployeeType();
  }
}

module.exports = Roster;
