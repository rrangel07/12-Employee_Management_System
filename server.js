const inquirer = require('inquirer');
const Query = require('./query');
const q = new Query();

const menuQ = [
    {
        type:    'list',
        name:    'selection',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
    },
]
menu = async () => {
    const response = await inquirer.prompt(menuQ);
    switchOptions(response.selection);
}

switchOptions = (response) => {
    switch (response){
        case 'View all departments':
            q.viewAllDepartments()
            .then(() => menu());
            break;
        case 'View all roles':
            break;
        case 'View all employees':
            break;
        case 'Add a department':
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
}
menu();