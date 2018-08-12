



To run this app, you will need first setup the DB by: 
- Create the database `bamazon` by running `schema.sql` in `MySQL Workbench` or your favorite mysql editor.

![database demo](/images/database.png)

- Seed the table product by importing the file `products.csv` or by running `seeds.sql`  in `MySQL Workbench`

![seeds demo](/images/seeds.png)

## Customer option

- run bamazonCustomer app by `node bamazonCustomer.js`
- You will see "Items available for Sale"
- User select product ID and quantity he/she would like to buy
![customer demo](/images/customer-demo.png)
- If quantity isn't available on stock, the user will see a message:
![customer demo](/images/customer-demo-outofstock.png)
- User will be asked to continue or no. If "n" is selected, he/she will see:
![continue demo](/images/continue-prompt.png)




