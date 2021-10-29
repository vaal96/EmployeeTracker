//---------------DEPENDENCIES---------------//
const art = require("ascii-art");
const inquirer = require("inquirer");
const mysql = require("mysql2");

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
   db.query("SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary;", function(err, res){
   console.tables(res);
   start();
   })
};
//---------------VIEW ROLES---------------//
async function viewRoles(){
  db.query("SELECT roles.id, roles.salary, department.department_name AS department FROM roles LEFT JOIN department ON roles.department_id = department.id;", function(err, res) {
    console.table(res);
    start();
  })
}

//---------------VIEW EMPLOYEES---------------//
async function viewEmployees(){
  db.query("SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.department_name AS department, roles.salary, CONCAT(manager_employee.first_name, ' ', manager_employee.last_name) AS manager FROM employee INNER JOIN roles ON employee.role_id = roles.id INNER JOIN department ON roles.department_id = department.id LEFT JOIN employee manager_employee ON manager_employee.id = employee.manager_id ORDER BY employee.id;", function (err, res){
    console.table(res)
    start();
  })

}
// add a dept
async function addDept(){
  console.log("TODO: You chose 'View Trips'");
}
// add a role
async function addRole(){
  console.log("TODO: You chose 'View Trips'");
}
// add an employee
async function addEmoloyee(){
  console.log("TODO: You chose 'View Trips'");
}
// update an emplyee
async function updateEmployee(){
  console.log("TODO: You chose 'View Trips'");
}
// exit()




// ---- function 2 use --- //
/*async function updateTrip() {
  try {
    const selectTripsSql = `select id, destination, 
    concat(
      year(trip_date),
      "-",
      month(trip_date), 
      "-",
      day(trip_date)
    ) as date from trips;`;

    const [rows] = await db.promise().query(selectTripsSql);

    // Create array of objects for inquirer choices. Each element is an object
    // with { name: "Description for user", value: trip }
    const choices = rows.map((trip) => ({
      name: `${trip.destination} - ${trip.date}`,
      value: trip,
    }));

    // This will be a trip object from the value property in the choices.
    const { trip } = await inquirer.prompt([
      {
        type: "list",
        message: "Choose a trip to update:",
        name: "trip",
        choices,
      },
    ]);
    const { date, destination } = await inquirer.prompt([
      {
        type: "input",
        message: "Enter destination",
        name: "destination",
        default: trip.destination,
      },
      {
        type: "input",
        message: "Enter trip date (e.g. 2022-03-01)",
        name: "date",
        default: trip.date,
      },
    ]);

    const updateTripsSql = `UPDATE trips SET ? WHERE ?;`;
    await db
      .promise()
      .query(updateTripsSql, [
        { trip_date: date, destination },
        { id: trip.id },
      ]);
    console.log("Update success.");
    return menu();
  } catch (error) {
    console.log(error);
  }
} 
*/


