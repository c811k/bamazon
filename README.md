# bamazon

## Overview

This application implements a simple command line based storefront using the npm inquirer package and the MySQL database with npm mysql pacagke. The application presents three interfaces: _customer_ and _manager_ and _supervisor_.
## How It Works

**Customer Interface**

`bamazonCustomer.js`

* Displays the products in the store with all the information including product's ID.

![Image of product information](/images/product_display.png)

* Prompts the customer which product they would like to purchase by product's ID number.

![Image of customer prompt](/images/customer_prompt.png)

* Asks for the quantity.
  
  * If there is not enough of the product, the application will prevent the order and tell the customer there isn't enough product to purchase.
  
  ![Image of insufficient quantity](/images/insufficient_quantity.png)

  * If there is enough of the product, the application will fulfill the customer's order and display the total amount.
  * If the customer's order goes through, the SQL database will update to relfect to the remaining quantity.

  ![Image of total](/images/total.png)

**Manager Interface**

`bamazonManager.js`

Displays a set of menu options:

* `View Products for Sale`
  * lists all of the product in the store.
    
  ![Image of view product](/images/view_products.png)

* `View Low Inventory`
  * lists all products with an inventory count lower than five.
    
  ![Image of low inventory](/images/view_low.png)

* `Add to Inventory`
  * prompts the manager to "add more" of any products currently in the store.
    
  ![Image of add to inventory](/images/add_inventory.png)
  
* `Add New Product`
  * allows the manager to add a compelety new product to the store.
    
  ![Image of add new product](/images/add_new.png)

**Supervisor Interface**

`bamazonSupervisor.js`

Displays a set of menu options:

* `View Porduct Sales by Department`
  * lists each department's information including names, over head costs, product sales, and toatal profit.

  ![Image of supervisor view](/images/supervisor_view.png)

* `Create New Department`
  * allows the supervisor to create a new department.

  ![Image of add department](/images/add_department.png)

## Authors

Caleb Kang
