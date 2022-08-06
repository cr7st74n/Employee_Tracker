const inquirer = require("inquirer");
const art = require("ascii-art");
const db = require("./db/connect_db");

const questions= [
    "What would you like to do ?",
    "what is your ID?",
    "what is your email?",
    "waht is your user name in github?",
    "select your position.!"
]


function Employee_input(){
    art.font(`Employee\n-Manager`,"doom",(err,rendered)=>{
        err?console.log(err):console.log(rendered);
    });
    inquirer.prompt([
        {
            type:"list",
            name: "Data_base",
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
    .then(data=>{
        switch(data.Data_base) {
            case "View all Employees":
              console.log('works ');
              break;
            case "Add Employee":
              // code block
              break;
            case "Update Employee Role":
                console.log('works ');
               break;
            case "View all roles":
                console.log('works ');
                break;
            case "Add role":
                console.log('works ');
                break;
            case "View all departments":
                console.log('works ');
                break;
            case "Add Departments":
                console.log('works ');
                break;
            case "Quit":
                console.log('works ');
                
                break;
            default:
                break;
          }
    })
}
Employee_input();