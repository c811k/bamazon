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
    "View Products for Sale",
    "View Low Inventory",
    "Add to Inventory",
    "Add New Product"
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
                case "View Products for Sale":
                display();
                break;
                
                case "View Low Inventory":
                lowInventory();
                break;
                
                case "Add to Inventory":
                addInventory();
                break;
                
                case "Add New Product":
                addNew();
                break;
            }
        });
}

function display() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        for(let i = 0; i < results.length; i++) {
            console.log("\nID: " + results[i].id + " | NAME: " + results[i].product_name + " | PRICE: $" + results[i].price + " | QTY: " + results[i].stock_quantity);
        }
    });
}

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, results) {
        if (err) throw err;
        for(let i = 0; i < results.length; i++) {
            console.log("\nID: " + results[i].id + " | NAME: " + results[i].product_name + " | PRICE: $" + results[i].price + " | QTY: " + results[i].stock_quantity);
        }
    });
}

function addInventory() {
    inquirer.prompt([
        {
            name: "id",
            message: "What is the ID of the product you would like to add?"
        }, {
            name: "quantity",
            message: "How many units of the product would you like to add?"
    }]).then(answer => {
        connection.query("SELECT * FROM products WHERE ?",
        [{
            id: answer.id
        }], function (err, res) {
            if (err) throw err;
            connection.query("UPDATE products SET ? WHERE ?",
            [{
                stock_quantity: parseInt(res[0].stock_quantity) + parseInt(answer.quantity)
            }, {
                id: answer.id
            }], function (err, res) {
                if(err) throw err;
                console.log("The products were successfully added to your inventory!")
            });
        });
    });
}

function addNew() {
    inquirer.prompt([
        {
            name: "name",
            message: "Product Name: "
        }, {
            name: "department",
            message: "Deparment: "
        }, {
            name: "price",
            message: "Price: "
        }, {
            name: "quantity",
            message: "Stock quantity: "
    }]).then(answer => {
        connection.query("INSERT INTO products SET ?", 
        [{
            product_name: answer.name,
            department_name: answer.department,
            price: answer.price,
            stock_quantity: answer.quantity
        }], function (err, res) {
            if (err) throw err;
            console.log("The product was successfully added!")
        });
    });
}