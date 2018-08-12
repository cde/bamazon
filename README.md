
## Bamazon App


To run this app, you will need first setup the DB by: 
- Create the database `bamazon` by running `schema.sql` in `MySQL Workbench` or your favorite mysql editor.

![database demo](/images/database.png)

- Seed the table product by importing the file `products.csv` or by running `seeds.sql`  in `MySQL Workbench`

![seeds demo](/images/seeds.png)

### Customer Option

- run bamazonCustomer app by `node bamazonCustomer.js`
- You will see "Items available for Sale"
- User select product ID and quantity he/she would like to buy
![customer demo](/images/customer-demo.png)
- If quantity isn't available on stock, the user will see a message:
![customer demo](/images/customer-demo-outofstock.png)
- User will be asked to continue or no. If "n" is selected, he/she will see:
![continue demo](/images/continue-prompt.png)


### Manager Option 

- run bamazonManager app by `node bamazonManager.js`
- You will see a Menu options as follow:
![Manager Menu options](/images/manager-menu-options.png)
- Manager selects an option.
- For option "View Products for Sale", the Manager will see:
![Products for Sale](/images/products-sale.png)
- For option "View Low Inventory", the Manager will see two options:
1) List  all items with an inventory count lower than five. 
![Low invetory](/images/low-inventory.png)
2) A message indicating that there is not low inventory
![No low invetory](/images/no-low-inventory.png)
- For option "Add Inventory", the Manager will see prompts asking him/her which item & quantity
he/she would like update
![Add inventory](/images/add-inventory.png)
- For option "Add new Product", the Manager will be asked details about the product as:
![New product](/images/new-product.png)

For each option, the manager has the option to continue or not:
![Continue](/images/continue-prompt.png)