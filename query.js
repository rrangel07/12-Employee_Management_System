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
    let view = await db.promise().query('SELECT departments.dep_name AS Department, departments.id AS ID FROM departments;');
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
  async viewEmployeesByManager(){
    let view = await db.promise().query(`SELECT employees.id AS ID, employees.first_name AS 'First Name', employees.last_name AS 'Last Name', CONCAT (manager.first_name,' ',manager.last_name) AS Manager
    FROM employees
    LEFT JOIN employees AS manager
    ON  employees.manager_id = manager.id
    ORDER BY Manager;`);
    this.displayTable(view);      
  }
  async viewEmployeesByDepartment(){
    let view = await db.promise().query(`SELECT employees.id AS ID, employees.first_name AS 'First Name', employees.last_name AS 'Last Name', departments.dep_name AS Department
    FROM employees
    LEFT JOIN roles 
    ON employees.role_id = roles.id
    LEFT JOIN departments
    ON roles.dep_id = departments.id
    ORDER BY Department;`);
    this.displayTable(view);      
  }
  async viewConsumedBudgetByDepartment(response){

    let sum = await db.promise().query(`SELECT CONCAT('$',SUM(Salary)) as 'Consumed Budget' , test.Dept
    FROM (SELECT employees.id AS ID, employees.role_id AS RoleID, departments.dep_name AS Dept, roles.salary AS Salary
    FROM EMPLOYEES
    LEFT JOIN roles
    ON employees.role_id = roles.id
    LEFT JOIN departments
    ON departments.id = roles.dep_id
    ORDER BY ID) AS test
    WHERE test.Dept = '${response.departmentBudget}';`);
    // console.log(sum)
    this.displayTable(sum);      
  }
  async modify(element,response){
    let add;
    let view;
    let findDeptCode;
    let findRoleId;
    let findManagerId;
    let findEmployeeId;
    let update;
    switch (element){

        case 'Add a department':
          //Query to add the new role in the roles table
          add = await db.promise().query(`INSERT INTO departments (dep_name)
          VALUES (?)`,[response.deptName]);
          view = await db.promise().query(`SELECT departments.id as ID, departments.dep_name as Department FROM departments;`);
          console.log('\nDepartment added succesfully')

          //Display the table with the new row
          this.displayTable(view);
        break;

        case 'Add a role':
          //Checks that enquirer is getting the options from the list
          // console.log(response.deptId)

          //Look for the department ID code
          findDeptCode = await db.promise().query(`SELECT id FROM departments WHERE dep_name='${response.deptId}'`);
          findDeptCode = findDeptCode[0].map(element => element.id);

          //Check if the department ID was found
          // console.log(findDeptCode);

          //Query to add the new role in the roles table
          add = await db.promise().query(`INSERT INTO roles (title,salary,dep_id)
          VALUES (?, ? ,? )`, [response.roleTitle, response.salary, findDeptCode]);
          view = await db.promise().query(`SELECT roles.id as ID, roles.title as 'Job Title', roles.salary AS Salary, roles.dep_id AS 'Dept. ID' FROM roles;`);
          console.log('\nRole added succesfully')

          //Display the table with the new row
          this.displayTable(view);
        break;

        case 'Add an employee':
          //Checks that enquirer is getting the options from the list
          // console.log(response.roleTitle)
          // console.log(response.managerName)

          //Look for the role ID code & managers ID
          findRoleId = await db.promise().query(`SELECT id FROM roles WHERE title='${response.roleTitle}'`);
          findRoleId = findRoleId[0].map(element => element.id);
          if (response.managerName !== 'NULL'){
            findManagerId = await db.promise().query(`SELECT id FROM employees WHERE concat(employees.first_name,' ',employees.last_name)='${response.managerName}'`);
            findManagerId = findManagerId[0].map(element => element.id);
          } else {
            findManagerId = 'NULL';
          }

          //Check if the role ID code & managers ID were found
          // console.log(findRoleId);
          // console.log(findManagerId);

          //Query to add the new employee in the employees table
          add = await db.promise().query(`INSERT INTO employees (first_name,last_name,role_id,manager_id)
          VALUES ('${response.firstName}','${response.lastName}',${findRoleId},${findManagerId})`);
          view = await db.promise().query(`SELECT employees.id as ID, employees.first_name as 'First Name', employees.last_name AS 'Last Name', employees.role_id AS 'Role ID', employees.manager_id AS 'Manager ID' FROM employees;`);
          console.log('\nEmployee added succesfully')

          //Display the table with the new row
          this.displayTable(view);
        break;

        case 'Update role':
          //Look for the role ID code & employee ID
          findRoleId = await db.promise().query(`SELECT id FROM roles WHERE title='${response.newRole}';`);
          findRoleId = findRoleId[0].map(element => element.id);
          findEmployeeId = await db.promise().query(`SELECT id FROM employees WHERE concat(employees.first_name,' ',employees.last_name)='${response.employeeName}';`);
          findEmployeeId = findEmployeeId[0].map(element => element.id);

          //Check if the role ID code & managers ID were found
          // console.log(findRoleId);
          // console.log(findEmployeeId);

          //Query to update an employee role in the employees table
          update = await db.promise().query(`UPDATE employees SET role_id = ${findRoleId} WHERE id=${findEmployeeId};`);
          view = await db.promise().query(`SELECT employees.id as ID, employees.first_name as 'First Name', employees.last_name AS 'Last Name', employees.role_id AS 'Role ID', employees.manager_id AS 'Manager ID' FROM employees WHERE id=${findEmployeeId};`);
          console.log('\nEmployee role updated succesfully')

          //Display the row with the update
          this.displayTable(view);
          break;

        case 'Update manager':
          //Look for the manager ID & employee ID
          if (response.newManager !== 'NULL'){
            findManagerId = await db.promise().query(`SELECT id FROM employees WHERE concat(employees.first_name,' ',employees.last_name)='${response.newManager}';`);
            findManagerId = findManagerId[0].map(element => element.id);
          } else {
            findManagerId = 'NULL';
          }
          findEmployeeId = await db.promise().query(`SELECT id FROM employees WHERE concat(employees.first_name,' ',employees.last_name)='${response.employeeName}'`);
          findEmployeeId = findEmployeeId[0].map(element => element.id);

          //Check if the managers ID & employee ID were found
          // console.log(findManagerId);
          // console.log(findEmployeeId);

          //Query to update an employee role in the employees table
          update = await db.promise().query(`UPDATE employees SET manager_id = ${findManagerId} WHERE id=${findEmployeeId};`);
          view = await db.promise().query(`SELECT employees.id as ID, employees.first_name as 'First Name', employees.last_name AS 'Last Name', employees.role_id AS 'Role ID', employees.manager_id AS 'Manager ID' FROM employees WHERE id=${findEmployeeId};`);
          console.log('\nEmployee manager updated succesfully')

          //Display the row with the update
          this.displayTable(view);
          break;

        case 'Delete departments':
          //Query to delete a department from departments table
          update = await db.promise().query(`DELETE FROM departments WHERE dep_name = '${response.department}';`);
          view = await db.promise().query(`SELECT departments.id AS ID, departments.dep_name AS 'Department Name' FROM departments;`);
          console.log('\nDepartment deleted succesfully')

          //Display the table with the update
          this.displayTable(view);
          break;
        
        case 'Delete roles':
          //Query to delete a department from departments table
          update = await db.promise().query(`DELETE FROM roles WHERE roles.title = '${response.role}';`);
          view = await db.promise().query(`SELECT roles.id AS ID, roles.title AS 'Job Title', roles.salary AS Salary, roles.dep_id AS 'Dept. ID' FROM roles;`);
          console.log('\nRole deleted succesfully')

          //Display the table with the update
          this.displayTable(view);
          break;

        case 'Delete employees':
          //Query to delete a department from departments table
          update = await db.promise().query(`DELETE FROM employees WHERE concat(employees.first_name,' ',employees.last_name) = '${response.employee}';`);
          view = await db.promise().query(`SELECT employees.id AS ID, employees.first_name AS 'First Name', employees.last_name AS 'Last Name', employees.role_id AS 'Role ID', employees.manager_id AS 'Manager ID' FROM employees;`);
          console.log('\nEmployee deleted succesfully')

          //Display the table with the update
          this.displayTable(view);
          break;

        default:
          console.log('Wrong option');
        break;
    } 
  }
}
module.exports = { db, Query };