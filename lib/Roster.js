// IMPORT
const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./htmlRenderer");

// VARIABLES
const OUTPUT_DIR = path.resolve(__dirname, "../output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// CONSTRUCTOR
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
        validate: function (input) {
          if (isNaN(input)) {
            return "Please enter a number";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "email",
        message: "Enter the employee's email address:",
        validate: function (input) {
            const validate = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if(!validate.test(input)) {
              return "Please enter a valid e-mail address";
            };
            return true;
        }
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

  // Prompts the user for the type of employee to add
  getEmployeeType() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeType",
          choices: ["Engineer", "Intern"],
          message: "Select an employee type to create:",
        },
      ])
      .then((val) => {
        switch (val.employeeType) {
          case "Engineer":
            this.getEngineerInfo();
            break;
          case "Intern":
            this.getInternInfo();
            break;
        }
      });
  }

  // Prompts the user to input manager info
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

  // Prompts the user to input engineer info
  getEngineerInfo() {
    console.log("Please enter the engineer's info:")
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

  // Prompts the user to input intern info
  getInternInfo() {
    console.log("Please enter the intern's info:")
    inquirer
      .prompt(this.employeeQuestions.concat(this.internQuestions))
      .then((val) => {
        const thisIntern = new Intern(val.name, val.id, val.email, val.school);
        this.employees.push(thisIntern);
        this.addNewEmployee();
      });
  }

  // Checks if the user wants to add a new employee
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

  // Renders the HTML and writes it to the output/team.html file
  renderHTML() {
    console.log("Your roster has been generated");
    const html = render(this.employees);
    fs.writeFile(outputPath, html, (err) =>
      err
        ? console.error(err)
        : console.log("Your output file has been created!")
    );
  }

  // Starts the user prompts to collect roster info
  generate() {
    console.log("Please enter the manager's info:")
    this.getManagerInfo();
  }
}

// EXPORT
module.exports = Roster;
