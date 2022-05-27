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
    displayTable(info){
      let table = cTable.getTable(info[0]);
      console.log('\n');
      console.log(table);  
    }
     async viewAllDepartments(){
        let view = await db.promise().query('SELECT departments.dep_name AS Department, departments.id AS ID FROM departments');
        this.displayTable(view);     
    }
    async viewAllRoles(){
        let view = await db.promise().query(`SELECT roles.title AS 'Job Title', roles.id AS ID, departments.dep_name AS Department, roles.salary as Salary
        FROM roles
        LEFT JOIN departments
        ON roles.dep_id = departments.id;`);
        this.displayTable(view);;       
    }
    async viewAllEmployees(){
      let view = await db.promise().query(`SELECT employees.id AS ID, employees.first_name AS 'First Name', employees.last_name AS 'Last Name', roles.title AS 'Job Title', departments.dep_name AS Department, roles.salary as Salary, concat(managers.first_name,' ',managers.last_name) AS Manager
      FROM EMPLOYEES
      LEFT JOIN roles
      ON employees.role_id = roles.id
      LEFT JOIN departments
      ON roles.dep_id = departments.id
      LEFT JOIN employees AS managers ON employees.manager_id = managers.id;`);
      this.displayTable(view);      
  }
  async addNew(element,response){
    let add;
    let view;
    switch (element){
        case 'department':
          add = await db.promise().query(`INSERT INTO departments (dep_name)
          VALUES ('${response.deptName}')`);
          view = await db.promise().query(`SELECT departments.id as ID, departments.dep_name as Department FROM departments;`);
          console.log('\nDepartment added succesfully')
          this.displayTable(view);
        break;
        case 'role':
          add = await db.promise().query(`INSERT INTO roles (title,salary,dep_id)
          VALUES ('${response.roleTitle}',${response.salary},${response.deptId})`);
          view = await db.promise().query(`SELECT roles.id as ID, roles.title as 'Job Title', roles.salary AS Salary, roles.dep_id AS 'Dept. ID' FROM roles;`);
          console.log('\nRole added succesfully')
          this.displayTable(view);
        break;
        case 'employee':
          add = await db.promise().query(`INSERT INTO employees (first_name,last_name,role_id,manager_id)
          VALUES ('${response.firstName}',${response.lastName},${response.roleID},${response.managerId})`);
          view = await db.promise().query(`SELECT employees.id as ID, employees.first_name as 'First Name', employees.last_name AS 'Last Name', employees.role_id AS 'Role ID', employees.manager_id AS 'Manager ID' FROM employees;`);
          console.log('\nEmployee added succesfully')
          this.displayTable(view);
        break;
        default:
          console.log('Wrong option');
        break;
    } 
  }

}
1
module.exports = { db, Query };