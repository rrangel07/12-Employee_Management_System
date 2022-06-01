const inquirer = require('inquirer');
const {db, Query } = require('./query');
const q = new Query();

const menuQ = [
    {
        type:    'list',
        name:    'selection',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Update an employee manager', 'View employees by manager', 'View employees by department', 'Delete departments', 'Delete roles', 'Delete employees', 'View consumed budget of a department', 'Exit'],
    }
];
const deptQ = [
    {
        type:    'input',
        name:    'deptName',
        message: 'Insert the name of the new Department:',
    }
];
menu = async () => {
    const option = await inquirer.prompt(menuQ);
    await switchOptions(option.selection);
}

switchOptions = async (response) => {
    let answers;
    let managerName;
    let roleTitle;
    let employeeName;
    let deptName;
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
            await q.modify('Add a department',answers);
            break;

        case 'Add a role':
            deptName = await getList('deptId')
            // console.log(deptName);
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
                    choices: deptName,
                },
            ];
            answers = await inquirer.prompt(roleQ);
            await q.modify('Add a role',answers);
            break;

        case 'Add an employee':
            roleTitle = await getList('roleId');
            // console.log(roleTitle);
            managerName = ['NULL', ...await getList('managerId')];
            // console.log(managerName);
            const employeeQ = [
                {
                    type:    'input',
                    name:    'firstName',
                    message: 'Employee\'s first name:',
                },
                {
                    type:    'input',
                    name:    'lastName',
                    message: 'Employee\'s last name:',
                },
                {
                    type:    'list',
                    name:    'roleTitle',
                    message: 'Select employee\s role:',
                    choices: roleTitle,
                },
                {
                    type:    'list',
                    name:    'managerName',
                    message: 'Select employee\s manager:',
                    choices: managerName,
                },
            ];
            
            answers = await inquirer.prompt(employeeQ);
            await q.modify('Add an employee',answers);
            break;

        case 'Update an employee role':
            employeeName = await getList('employeeName');
            // console.log(employeeName);
            roleTitle = await getList('roleId');
            // console.log(roleTitle);
            const employeeUpdateRole = [
                {
                    type:    'list',
                    name:    'employeeName',
                    message: 'Which employee do you want to update?',
                    choices:  employeeName,
                },
                {
                    type:    'list',
                    name:    'newRole',
                    message: 'Select their new role',
                    choices:  roleTitle,
                },
            ];
            answers = await inquirer.prompt(employeeUpdateRole);
            await q.modify('Update role',answers);
            break;
        case 'Update an employee manager':
            employeeName = await getList('employeeName');
            // console.log(employeeName);
            managerName = managerName = ['NULL', ...await getList('managerId')];
            // console.log(managerName);
            const employeeUpdateManager = [
                {
                    type:    'list',
                    name:    'employeeName',
                    message: 'Which employee do you want to update?',
                    choices:  employeeName,
                },
                {
                    type:    'list',
                    name:    'newManager',
                    message: 'Select their new manager',
                    choices:  managerName,
                },
            ];
            answers = await inquirer.prompt(employeeUpdateManager);
            await q.modify('Update manager',answers);
            break;
        case 'View employees by manager':
            await q.viewEmployeesByManager();
            break;
        case 'View employees by department':
            await q.viewEmployeesByDepartment();
            break;
        case 'Delete departments':
            deptName = await getList('deptId')
            // console.log(deptName);
            const deleteDept = [
                {
                    type:    'list',
                    name:    'department',
                    message: 'Select the department you want to delete',
                    choices:  deptName,
                }
            ];
            answers = await inquirer.prompt(deleteDept);
            await q.modify('Delete departments',answers);
            break;
        case 'Delete roles':
            roleTitle = await getList('roleId');
            // console.log(roleTitle);
            const deleteRole = [
                {
                    type:    'list',
                    name:    'role',
                    message: 'Select the role you want to delete',
                    choices:  roleTitle,
                }
            ];
            answers = await inquirer.prompt(deleteRole);
            await q.modify('Delete roles',answers);
            break;
        case 'Delete employees':
            employeeName = await getList('employeeName');
            // console.log(employeeName);
            const deleteEmployee = [
                {
                    type:    'list',
                    name:    'employee',
                    message: 'Select the employee you want to delete',
                    choices:  employeeName,
                }
            ];
            answers = await inquirer.prompt(deleteEmployee);
            await q.modify('Delete employees',answers);
            break;
        case 'View consumed budget of a department':
            deptName = await getList('deptId')
            // console.log(deptName);
            const deptBudget = [
                {
                    type:    'list',
                    name:    'departmentBudget',
                    message: 'Select the department you want to check on',
                    choices:  deptName,
                }
            ];
            answers = await inquirer.prompt(deptBudget);
            await q.viewConsumedBudgetByDepartment(answers);
            break;
        case'Exit':
            console.log('Closing app')
            process.exit();
            break;
        default:
            console.log('Wrong option');
            break;
    }
   menu();
};
menu();
// q.viewAllDepartments();

getList = async (option) => {
    switch (option){
        case 'deptId':
            return (await db.promise().query('SELECT dep_name FROM departments'))[0].map((element) => element.dep_name);
        case 'roleId':
            return (await db.promise().query('SELECT title FROM roles'))[0].map((element) => element.title);
        case 'managerId':
            return (await db.promise().query(`SELECT concat(employees.first_name,' ',employees.last_name) AS Manager FROM employees WHERE manager_id IS NULL`))[0].map((element) => element.Manager);
        case 'employeeName':
            return (await db.promise().query(`SELECT concat(employees.first_name,' ',employees.last_name) AS 'Name' FROM employees`))[0].map((element) => element.Name);
        default:
            console.log('Wrong option');
            break;        
    }
}