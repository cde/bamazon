var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    // Display all available products, then start
    queryAllProducts(start);
});

var line = "--------------------------------------------------------------------------------------------------------------------";
var ids = [];
function queryAllProducts(callback) {
    connection.query("SELECT * FROM products WHERE stock_quantity > 0", function(err, res) {
        console.log("\nItems available for sale");
        console.log(line);
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price);;
        }
        console.log(line);
        callback();
    });
}


// function which prompts the user for what action they should take
function start() {
    var questions = [
        {   name: "item_id",
            type: "input",
            message: "Which product's ID would you like to buy?"},
        {   name: "quantity",
            type: "input",
            message: "How many items would you like to buy?"}

    ]
    inquirer
        .prompt(questions)
        .then(function(answer) {
            // based on their answer, either call the bid or the post functions

            var quantityWanted = answer.quantity;
            var query = "SELECT * FROM products WHERE item_id = ?";

            connection.query(query, [answer.item_id], function(err, res) {

                if(res != undefined) {
                    var product = res[0];
                    var stockQuantity = parseInt(product.stock_quantity);
                    if(stockQuantity >= parseInt(quantityWanted)){
                        stockQuantity = stockQuantity - parseInt(quantityWanted)

                        console.log("\n Your shopping cart");
                        console.log(line);
                        console.log("Product \t\t\t\t" +  "Price\t\t"+ "Quantity")
                        console.log(line);
                        console.log(product.product_name + "\t\t\t\t" + `${product.price}\t\t` +  `${quantityWanted}` )
                        updateProduct(product, stockQuantity, quantityWanted)

                    }else{
                        console.warn('Insufficient quantity!');
                        console.log("\n")
                        continueView()
                    }
                }
                // console.log(stockQuantity)
            });
        });
}

function updateProduct(product, quantity, quantityWanted ) {
    // console.log("\n Updating quantities...\n");

    var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: quantity
            },
            {
                item_id: product.item_id
            }
        ],
        function(err, res) {
            // console.log(res.affectedRows + " products updated!\n");
            if(res.affectedRows === 1){
                var totalCost = product.price * quantityWanted
                console.log(line);

                console.log(`Total: $${totalCost}`)

                ids.push(product.item_id);
                console.log("\n")
                continueView()

            }
        }
    );

    // logs the actual query being run
    // console.log(query.sql);
}

function continueView(){
    inquirer.prompt({
        name: "continue",
        type: "confirm",
        message: "Would you like to continue? Yes|No",
    }).then(function(answer) {
        if(answer.continue){
            queryAllProducts(start)
        }else{
            console.log("Bamazon wish you a Good Day!!! ")
            return;
        }

    })
}
