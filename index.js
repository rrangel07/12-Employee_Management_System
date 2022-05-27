const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'courses_db'
  },
  console.log(`Connected to the courses_db database.`)
);

const menuQ = [
    {
        type:    'list',
        message: ``,
        name:    'selection',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
    },
]
menu = async () => {
    const response = await inquirer.prompt (menuQ);
    return response;
}

switchOptions = (response) => {
    switch (response){
        case 'View all departments':
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