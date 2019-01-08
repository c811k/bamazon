# bamazon

## Overview

This application implements a simple command line based storefront using the npm inquirer package and the MySQL database with npm mysql pacagke. The application presents two interface: _customer_ and _manager_.
## How It Works

**Customer Interface**

`bamazonCustomer.js`

* Displays the products in the store with all the information including product's ID.

* Prompts the customer which product they would like to purchase by product's ID number.

* Asks for the quantity.
  
  * If there is not enough of the product, the app will prevent the order and tell the customer there isn't enough product to purchase.
  * If there is enough of the product, the app will fulfill the customer's order and display the total amount.
  * If the customer's order goes through, the SQL database will update to relfect to the remaining quantity. 

**Manager Interface**

`bamazonManager.js`

* Displays a set of menu options:

  * `View Products for Sale`
    * lists all of the product in the store.

  * `View Low Inventory`
    * lists all products with an inventory count lower than five.

  * `Add to Inventory`
    * prompts the manager to "add more" of any products currently in the store.
  
  * `Add New Product`
    * allows the manager to add a compelety new product to the store.

## Authors

Caleb Kang
