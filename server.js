const inquirer = require('inquirer');
const {db, Query } = require('./query');
const q = new Query();


const menuQ = [
    {
        type:    'list',
        name:    'selection',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role','Exit'],
    }
];
const deptQ = [
    {
        type:    'input',
        name:    'deptName',
        message: 'Insert the name of the new Department:',
    }
];
const roleQ = [
    {
        type:    'input',
        name:    'roleTitle',
        message: 'Insert the new role\'s title:',
    },
    {
        type:    'input',
        name:    'salary',
        message: 'Insert the new role\'s salary:',
    },
    {
        type:    'list',
        name:    'deptId',
        message: 'Select the new role\'s department ID:',
        choices: dbOptions = db.query(`SELECT * FROM departments`, function (error, resp){
            return resp;
        }),
    },
];
const employeeQ = [
    {
        type:    'input',
        name:    'roleTitle',
        message: 'Insert the new role\'s title:',
    },
    {
        type:    'input',
        name:    'salary',
        message: 'Insert the new role\'s salary:',
    },
    {
        type:    'input',
        name:    'deptId',
        message: 'Insert the new role\'s department ID:',
    },
    {
        type:    'input',
        name:    'deptId',
        message: 'Insert the new role\'s department ID:',
    },
];

menu = async () => {
    const option = await inquirer.prompt(menuQ);
    await switchOptions(option.selection);
}

switchOptions = async (response) => {
    let answers;
    switch (response){
        case 'View all departments':
            await q.viewAllDepartments();
            break;
        case 'View all roles':
            await q.viewAllRoles();
            break;
        case 'View all employees':
            await q.viewAllEmployees();
            break;
        case 'Add a department':
            answers = await inquirer.prompt(deptQ);
            await q.addNew('department',answers);
            break;
        case 'Add a role':
            answers = await inquirer.prompt(roleQ);
            await q.addNew('role',answers);
            break;
        case 'Add an employee':
            answers = await inquirer.prompt(roleQ);
            await q.addNew('employee',answers);
            break;
        case 'Update an employee role':
            break;
        case 'Update employee managers':
            break;
        case 'View employees by manager':
            break;
        case 'View employees by department':
            break;
        case 'Delete departments':
            break;
        case 'Delete roles':
            break;
        case 'Delete employees':
            break;
        case 'View consumed budget of a department':
            break;
        default:
            break;
    }
   menu();
};
menu();
// async function test (){

// console.log((await db.promise().query(`SELECT * FROM departments`))[0]);
// }

//    test();