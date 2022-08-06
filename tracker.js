const inquirer = require("inquirer");
const art = require("ascii-art");
const db = require("./db/connect_db");

art.font(`Employee\n-Manager`,"doom",(err,rendered)=>{
    err?console.log(err):console.log(rendered);
});

const questions= [
    "What would you like to do ?",
    "what is your ID?",
    "what is your email?",
    "waht is your user name in github?",
    "select your position.!"
]


function Employee_input(){
    inquirer.prompt([
        {
            type:"list",
            name: "position",
            messege: questions[0],
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
}
