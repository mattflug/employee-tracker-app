const mysql = require("mysql2");
const inquirer = require("inquirer");
require("console.table");

const db = mysql.createConnection({
  host: "localhost",
  // MySQL Username
  user: "root",
  // TODO: Add MySQL Password
  password: "Unlockit1!",
  database: "employees_db",
});

db.connect(function () {
  console.log(`Welcome to Employee Tracker`);
  start();
});

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        message: "What do you want to select?",
        choices: [
          "View Department",
          "View Role",
          "View Employees",
          "Add Department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit App",
        ],
      },
    ])
    .then(function (response) {
      switch (response.option) {
        case "View Department":
          viewDepartment();
          break;
        case "View Role":
          viewRoles();
          break;
        case "View Employees":
          viewEmployees();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee role":
          updateRole();
          break;
        default:
          db.end();
          process.exit(0);
      }
    });
}

function viewDepartment() {
  console.log("View Department");
  db.query("select * from department", function (error, data) {
    if (error) throw error;
    console.table(data);
    start();
  });
}
function viewRoles() {
  db.query("select * from roles", function (error, data) {
    if (error) throw error;
    console.table(data);
    start();
  });
}
function viewEmployees() {
  console.log("View Emp");
  db.query(
    "select e.id, e.first_name, e.last_name, r.title,r.salary, d.department_name, ee.first_name as 'Manager First name',ee.last_name as 'Manager last name'  from employee e left join roles r on e.role_id = r.id left join department d on r.department_id = d.id left join employee ee on e.manager_id = ee.id;",
    function (error, data) {
      if (error) throw error;
      console.table(data);
      start();
    }
  );
}
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department_name",
        message: "Enter department name",
      },
    ])
    .then((response) => {
      db.query(
        "insert into department(department_name) values(?)",
        response.department_name,
        function (error, data) {
          if (error) throw error;
          console.table(data);
          start();
        }
      );
    });
}
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter Role",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter Salary",
      },
      {
        type: "input",
        name: "department_id",
        message: "Enter Department ID",
      },
    ])
    .then((response) => {
      db.query(
        "insert into roles (title,salary,department_id) values(?,?,?);",
        [response.title, response.salary, response.department_id],
        function (error, data) {
          if (error) throw error;
          console.table(data);
          start();
        }
      );
    });
}
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "Enter First Name",
      },
      {
        type: "input",
        name: "last_name",
        message: "Enter Last Name",
      },
      {
        type: "input",
        name: "role_id",
        message: "Enter Role ID",
      },
      {
        type: "input",
        name: "manager",
        message: "Enter Manager",
      },
    ])
    .then((response) => {
      db.query(
        "insert into employee (first_name,last_name,role_id,manager_id) values(?,?,?,?);",
        [
          response.first_name,
          response.last_name,
          response.role_id,
          response.manager,
        ],
        function (error, data) {
          if (error) throw error;
          console.table(data);
          start();
        }
      );
    });
}
function updateRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "role_id",
        message: "Enter Role ID",
      },
      {
        type: "input",
        name: "employee_id",
        message: "Employee ID",
      },
    ])
    .then((response) => {
      db.query(
        "update employee set role_id = ? where id=?;",
        [response.role_id, response.employee_id],
        function (error, data) {
          if (error) throw error;
          console.table(data);
          start();
        }
      );
    });
}
