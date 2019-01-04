var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    displayProduct();
});

function displayProduct() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        for(let i = 0; i < results.length; i++) {
            console.log("\nID: " + results[i].id + " | NAME: " + results[i].product_name + " | PRICE: $" + results[i].price + " | QTY: " + results[i].stock_quantity);
        }
        updateProduct();
    });
}

function updateProduct() {
    inquirer.prompt([
        {
            name: "id",
            message: "\nWhat is the ID of the product you would like to purchase?"
        }, {
            name: "quantity",
            message: "How many units of the product would you like to purchase?"
    }]).then(answer => {
        connection.query("SELECT * FROM products WHERE ?",
        [{
            id: answer.id
        }], function (err, res) {
            console.log(res[0].stock_quantity);
            if (err) throw err;
            if(res[0].stock_quantity < 0) {
                console.log("Insufficient quantity!");
            }
            else {
                connection.query("UPDATE products WHERE ? SET ?",
                [{
                    id: answer.id
                }, {
                    stock_quantity: res[0].stock_quantity -  answer.quantity
                }], function (err, res) {
                    if(err) throw err;
                    console.log(res);
                });
            }
        });
    });
}