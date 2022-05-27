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
     viewAllDepartments(){
        const view =  db.query('SELECT departments.dep_name AS Department, departments.id AS ID FROM departments',(error,resp) => {
            console.table(resp);
        });
        // let table = cTable.getTable(view[0]);
        // console.log('\n',table,'\n');       
    }
    async viewAllRoles(){
        const view = await db.promise().query('SELECT departments.dep_name AS Department, departments.id AS ID FROM departments');
        let table = cTable.getTable(view[0]);
        console.log(table);       
    }
}

module.exports = Query;