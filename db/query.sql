-- 1 ------------------ 1 ---------------- 1 --------------- 1 ----------------------- 1 ------------------------
SELECT departments.dep_name AS Department, departments.id AS ID FROM departments;
-- 2 ------------------ 2 ---------------- 2 --------------- 2 ----------------------- 2 ------------------------
SELECT roles.tittle AS Title, roles.id AS ID, roles.salary as Salary, departments.dep_name AS Department
FROM roles
LEFT JOIN departments 
ON roles.dep_id = departments.id;
-- 3 ------------------ 3 ---------------- 3 --------------- 3 ----------------------- 3 ------------------------
SELECT employees.id AS ID, employees.first_name AS 'First Name', employees.last_name AS 'Last Name', roles.tittle AS Title, departments.dep_name AS Department, roles.salary as Salary, concat(managers.first_name,' ',managers.last_name) AS Manager
FROM EMPLOYEES
LEFT JOIN roles
ON employees.role_id = roles.id
LEFT JOIN departments
ON roles.dep_id = departments.id
LEFT JOIN employees AS managers
ON employees.manager_id = managers.id;