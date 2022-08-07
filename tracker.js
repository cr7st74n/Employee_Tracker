const inquirer = require("inquirer");
const art = require("ascii-art");
const db = require("./db/connect_db");
const cTable = require('console.table');

function ArtFront(){
    art.font(`Employee\n-Manager`,"doom",(err,rendered)=>{
        err?console.log(err):console.log(rendered);
    });
}

function Employee_input(){
     inquirer.prompt([
        {
            type:"list",
            name: "Data_base",
            messege: "What would you like to do ?",
            choices: ["View all Employees",
            "Add Employee",
            "Update Employee Role",
            "View all roles",
            "Add role",
            "View all departments",
            "Add Departments",
            "Quit"]
        }
    ])
    .then(data=>{
        switch(data.Data_base) {
            case "View all Employees":
                viewALlEm();
                break;
            case "Add Employee":
                addEmp();
              break;
            case "Update Employee Role":
                //**************** */
               break;
            case "View all roles":
                viewALlRoles();
                break;
            case "Add role":
                addRole()
                break;
            case "View all departments":
                viewALlDep();
                break;
            case "Add Departments":
                addDep()
                break;
            case "Quit":
                console.log('thanks for using the app');
                break;
            default:
                Employee_input();
        };  
    });
}

function viewALlEm(){
    db.query(`SELECT
    first_name AS "Name",
    last_name AS "Last Name",
    title,
    department_name AS "Departments",
    salary
    FROM employee_table et
        LEFT JOIN role_table rt
        ON et.role_id = rt.id
        LEFT JOIN department_table dt
        ON rt.department_id = dt.id;`,(err,data)=>{
            err?console.log(err):
            console.log('\n');
            console.table(data);
        });
    Employee_input();
}

function viewALlDep(){
    db.query(`SELECT
    id,
    department_name AS "Departments"
     FROM department_table;`,(err,data)=>{
            err?console.log(err):
            console.log('\n');
            console.table(data);
        });
    Employee_input();
}

function viewALlRoles(){
    db.query(`SELECT 
    title,
    department_name AS "Departments",
    salary
    FROM role_table rt
        LEFT JOIN department_table dt
        ON rt.department_id = dt.id;`,(err,data)=>{
            err?console.log(err):
            console.log('\n');
            console.table(data);
        });
    Employee_input();
}



//****************************************************************************** */


function addEmp(){
    inquirer.prompt([
        {
            type:"input",
            name: "name",
            messege: "What is the employee's first name?"
        },
        {
            type:"input",
            name: "last_name",
            messege: "What is the employee's last name?"
        },
        {
            type:"list",
            name: "role",
            messege: "What is the employee's role?",
            choices: [   "Sales Lead","Salesperson",
               "Lead Engineer","Software Engineer",
               "Account Manager","Accountant",
               "Legal Team Lead","Lawyer",]
        },
        {
            type:"list",
            name: "manager",
            messege: "Who is the employee's manager?",
            choices: ["John","Miko","Ashley","Kevin","Kunal",
                "Malia","Sarah","Tam"]
        }
    ])
    .then(data=>{
        let num =0;
        switch(data.role) {
            case "Sales Lead":
                num = 3
              break;
            case "Salesperson":
                num = 4
              break;
            case "Lead Engineer":
                num = 5
              break;
            case "Software Engineer":
                num = 6
              break;
            case "Account Manager":
                num = 7
                break;
            case "Accountant":
                num = 8
                break;
            case "Legal Team Lead":
                num = 9
                break;
            case "Lawyer":
                num = 10
                break;
        }
        db.query(`INSERT INTO employee_table (first_name,last_name,manager_id,role_id)
        VALUES ("${data.name}","${data.last_name}","1","${num}")`, (err,data)=>{
            err?console.log(err):
            console.log('\n');
            console.table("Employee added");
        });
        Employee_input();
    });

}

function addDep(){
    inquirer.prompt([
        {
            type:"input",
            name: "Department",
            messege: "What is the name of the department?"
        }
    ])
    .then(data=>{
        db.query(`INSERT INTO department_table (department_name) VALUES ("${data.Department}")`, (err,data)=>{
            err?console.log(err):
            console.log('\n');
            console.table("Department added");
        });
        Employee_input();
    });
}

function addRole(){
    inquirer.prompt([
        {
            type:"input",
            name: "name",
            messege: "What is the name of the role?"
        },
        {
            type:"input",
            name: "salary",
            messege: "What is the salary of the role?"
        },
        {
            type:"list",
            name: "department",
            messege: "wich department does the role belong to ?",
            choices: [   "Engineering","Finance",
               "Legal","Sales",
               "human resources"]
        }
    ])
    .then(data=>{
        let num =0;
        switch(data.department) {
            case "Engineering":
                num = 1
              break;
            case "Finance":
                num = 2
              break;
            case "Legal":
                num = 3
              break;
            case "Sales":
                num = 4
              break;
            case "human resources":
                num = 5
                break;
        }
        db.query(`INSERT INTO role_table (title,salary,department_id)
        VALUES ("${data.name}","${data.salary}","${num}")`, (err,data)=>{
            err?console.log(err):
            console.log('\n');
            console.table("Role added");
            console.log('\n');
        });
        Employee_input();
    });

}
ArtFront()
Employee_input();