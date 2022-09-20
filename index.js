const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");

const db = mysql.createConnection({
  host: "localhost",
  // MySQL Username
  user: "root",
  // TODO: Add MySQL Password
  password: "",
  database: "books_db",
});

db.connect(function () {
  console.log(`Welcome to Employee Tracker`);
  start();
});

function start() {
    inquirer.prompt([
        {
            type: "list",
            name:"option",
            message: "What do you...",
            choices:["View Department","View Role","View Employees","Add Department", "Add a role", "Add an employee", "update an employee role","Exit App"]
        }
    ]).then(function (response) {
        switch (response.option) {
            case "View Department":
                viewDepartment();
                break;
            default:
                db.end()
                process.exit(0)
        }
    })

}
