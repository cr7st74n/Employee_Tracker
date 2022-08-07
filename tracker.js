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
                Employee_input();
              break;
            case "Add Employee":
                addEmp();
              break;
            case "Update Employee Role":
                //**************** */
               break;
            case "View all roles":
                viewALlRoles();
                Employee_input();
                break;
            case "Add role":
                //******************* */
                break;
            case "View all departments":
                viewALlDep();
                Employee_input();
                break;
            case "Add Departments":
                //****************** */
                break;
            case "Quit":
                console.log('thanks for using the app');
                break;
            default:
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
}

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
            console.table(data);
        });
    });
}

ArtFront()
Employee_input();