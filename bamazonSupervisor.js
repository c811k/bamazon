var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

var options = [
    "View Products Sales by Department",
    "Create New Department"
];

connection.connect(function(err) {
    if (err) throw err;
    menu(options);
});

function menu(options) {
    inquirer.prompt([
        {
            name: "command",
            message: "What would you like to do?",
            type: "list",
            choices: options
        }]).then(answer => {
            switch(answer.command) {
                case "View Products Sales by Department":
                display();
                break;
                
                case "Create New Department":
                createNew();
                break;
            }
        });
}

function display() {
    connection.query("SELECT  departments.id, departments.department_name, over_head_costs, SUM(product_sales) AS product_sales, SUM(product_sales) - over_head_costs AS total_profit FROM departments LEFT JOIN products ON departments.department_name = products.department_name GROUP BY departments.id;", function (err, res) {
        if(err) throw err;
        for(let i = 0; i < res.length; i++) {
            console.log("\nDepartment ID: " + res[i].id + " | Department Name: " + res[i].department_name + " | Overhead Costs: " + res[i].over_head_costs + " | Product Sales: " + res[i].product_sales + " | Total Profit: " + res[i].total_profit);
        }
    });
}

function createNew() {
    inquirer.prompt([
        {
            name: "name",
            message: "Department Name: "
        }, {
            name: "overhead",
            message: "Over Head Costs: "
        }]).then(answer => {
        connection.query("INSERT INTO departments SET ?", 
        [{
            department_name: answer.name,
            over_head_costs: answer.overhead
        }], function (err, res) {
            if (err) throw err;
            console.log("The department was successfully added!")
        });
    });
}