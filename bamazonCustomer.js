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
        console.log("\n");
        updateProduct();
    });
}

function updateProduct() {
    inquirer.prompt([
        {
            name: "id",
            message: "What is the ID of the product you would like to purchase?"
        }, {
            name: "quantity",
            message: "How many units of the product would you like to purchase?"
    }]).then(answer => {
        connection.query("SELECT * FROM products WHERE ?",
        [{
            id: answer.id
        }], function (err, res) {
            var total = 0;
            if (err) throw err;
            if(res[0].stock_quantity < answer.quantity) {
                console.log("\n");
                console.log("Insufficient quantity!");
            }
            else {
                total = res[0].price * answer.quantity;
                connection.query("UPDATE products SET ? WHERE ?",
                [{
                    stock_quantity: res[0].stock_quantity -  answer.quantity,
                    product_sales: res[0].product_sales + total
                }, {
                    id: answer.id
                }], function (err, res) {
                    if(err) throw err;
                });
            }
            console.log("\n");
            console.log("Your total: $" + total);
            console.log("Thank you for shopping with us!");
        });
    });
}