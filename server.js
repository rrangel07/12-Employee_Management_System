const inquirer = require('inquirer');
const Query = require('./query');
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
        message: 'Insert the name of the new Department',
    }
];

menu = async () => {
    const option = await inquirer.prompt(menuQ);
    await switchOptions(option.selection);
}

switchOptions = async (response) => {
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
            let response = await inquirer.prompt(deptQ);
            await q.addNewDepartment(response.deptName)
            break;
        case 'Add a role':
            break;
        case 'Add an employee':
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
}
menu();