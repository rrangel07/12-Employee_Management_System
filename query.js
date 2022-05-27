const mysql = require('mysql2');
const cTable = require('console.table');
// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

class Query{
    constructor(){};
     async viewAllDepartments(){
        let view = await db.promise().query('SELECT departments.dep_name AS Department, departments.id AS ID FROM departments');
        let table = cTable.getTable(view[0]);
        console.log('\n');
        console.log(table);       
    }
    async viewAllRoles(){
        let view = await db.promise().query(`SELECT roles.tittle AS 'Job Title', roles.id AS ID, departments.dep_name AS Department, roles.salary as Salary
        FROM roles
        LEFT JOIN departments
        ON roles.dep_id = departments.id`);
        let table = cTable.getTable(view[0]);
        console.log('\n');
        console.log(table);       
    }
    async viewAllEmployees(){
      let view = await db.promise().query(`SELECT employees.id AS ID, employees.first_name AS 'First Name', employees.last_name AS 'Last Name', roles.tittle AS 'Job Title', departments.dep_name AS Department, roles.salary as Salary, concat(managers.first_name,' ',managers.last_name) AS Manager
      FROM EMPLOYEES
      LEFT JOIN roles
      ON employees.role_id = roles.id
      LEFT JOIN departments
      ON roles.dep_id = departments.id
      LEFT JOIN employees AS managers ON employees.manager_id = managers.id;`);
      let table = cTable.getTable(view[0]);
      console.log('\n');
      console.log(table);       
  }
  async addNewDepartment(name){
    const add = await db.promise().query(`INSERT INTO Customers (CustomerName, ContactName, Address, City, PostalCode, Country)`);
  }
}

module.exports = Query;