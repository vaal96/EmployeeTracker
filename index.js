//---------------DEPENDENCIES---------------//
const art = require("ascii-art");
const inquirer = require("inquirer");
const mysql = require("mysql");
const { last } = require("rxjs");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "employee_tracker_db",
});
//---------------CONNECTION DB---------------//

start();

async function start() {
  try {
    const rendered = await art.font("Employee Tracker", "doom").completed();
    console.log(rendered);
    return options();
  } catch (err) {
    console.log(err);
  }
}
async function options(){
  const { action } = await inquirer.prompt([
    {
      type: "list",
      message: "Choose a task:",
      name: "action",
      choices: ["View Departments", "Add Department", "View Roles","Add Roles", "View Employees","Add Employees", "Update Employees", "Exit"],
    },
  ]);
  switch (action) {
    case "View Departments":
      return viewDepts();

    case "Add Department":
      return addDept();

    case "View Roles":
      return viewRoles();

    case "Add Roles":
      return addRole();
  
    case "View Employees":
      return viewEmployees();
  
    case "Add Employees":
      return addEmoloyee();
    
    case "Udate Employees":
      return updateEmployee();

    default:
      return exit();
  }
}
//---------------VIEW DEPTS---------------// 
async function viewDepts(){
  console.log("TODO: You chose 'View Depts'");
  
   db.query("SELECT * from Department", function(err, res){
   console.table(res);
   options();
   })
};
//---------------VIEW ROLES---------------//
async function viewRoles(){
  db.query("SELECT roles.id, roles.title, roles.salary, department.department_name AS department FROM roles LEFT JOIN department ON roles.department_id = department.id;", function(err, res) {
    console.table(res);
    options();
  })
}

//---------------VIEW EMPLOYEES---------------//
async function viewEmployees(){
  db.query(`SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.department_name AS department, roles.salary, CONCAT(manager_employee.first_name, ' ', manager_employee.last_name) AS manager 
  FROM employee 
  LEFT JOIN roles ON employee.roles_id = roles.id 
  LEFT JOIN department ON roles.department_id = department.id 
  LEFT JOIN employee manager_employee ON manager_employee.id = employee.manager_id 
  ORDER BY employee.id;`, function (err, res){
    console.log(res)
    console.table(res)
    options();
  })

}
// add a dept
async function addDept(){
  const { department_name } = await inquirer.prompt([
    {
      type: "input",
      message: "What is the new Department Name:",
      name: "department_name"
    }])
    db.query("insert into department set ?", {department_name}, function (err, res){
      viewDepts();

    })
}
// add a role
async function addRole(){
  db.query("SELECT * FROM department", async function (err, res){
    let listOfDepts = res.map(({id,department_name})=>{
      return {
        name: department_name, value: id
      }
    })
   const { title, salary, department_id } = await inquirer.prompt([
      {
        type: "input",
        message: "What is the title of your new Role:",
        name: "title"
      },
      {
        type: "input",
        message: "What is the Salary:",
        name: "salary"
      },
      {
        type: "list",
        message: "Which department does this role belong to:",
        name: "department_id",
        choices: listOfDepts
      }
    ])
    db.query("insert into Roles set ?", { title, salary, department_id }, function (err, res){
      viewRoles();
    })
  })
  
  //do a query to select all departemnts
  //`deparmentArray`map the resonse so I can ask which deparment this new role  belongs too
  //ask user for role name, salaray and department name() by using list and separment name as choices
}
// add an employee
async function addEmoloyee(){
  db.query("SELECT * FROM roles", async function (err, res){
    let listOfRoles = res.map(({id, title})=>{
      return {
        name: title, value: id
      }
    })
    db.query("SELECT * FROM employee", async function (err, res){
      let listOfManagers = res.map(({id, first_name, last_name})=>{
        return {
          name: `${first_name} ${last_name}` , value: id
        }
      })
      const { first_name, last_name, manager_id, roles_id } = await inquirer.prompt([
        {
          type: "input",
          message: "What is your first name:",
          name: "first_name"
        },
        {
          type: "input",
          message: "What is your last name:",
          name: "last_name"
        },
        {
          type: "list",
          message: "Who is your manager:",
          name: "manager_id",
          choices: listOfManagers
        },
        {
          type: "list",
          message: "Who is is the role of the employee:",
          name: "roles_id",
          choices: listOfRoles
        }
      ])
      db.query("insert into Employee set ?", { first_name, last_name, manager_id, roles_id }, function (err, res){
        viewEmployees();
      })
  })
})
}
// update an emplyee
async function updateEmployee(){
  db.query("SELECT * FROM employee", async function (err, res){
    let listOfEmployees = res.map(({id, title})=>{
      return {
        name: title, value: id
      }
    })
  }
)}


