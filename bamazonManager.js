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
    runOptions();
});

var line = "----------------------------------------------------------------------------------------------------------------------------------";

function runOptions() {
    console.log("Menu options:")
    console.log(line)
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
        ]
    }).then(function (answer) {
        switch (answer.action){
            case "View Products for Sale":
                queryProducts('sale', continueView);
                break;
            case "View Low Inventory":
                queryProducts('lowInventory', continueView);
                break;
            case "Add to Inventory":
                queryProducts('sale', addInventory);
                break
            case "Add New Product":
                createProduct(continueView);
                break;
            default:
                queryProducts('sale', continueView);
        }

        // console.log(`\n${answer.action}\n`);
    });
}
function queryProducts(type = 'sale', callback) {
    var query = "SELECT * FROM products ";

    if(type == 'lowInventory'){
        query += "WHERE stock_quantity < 5";
    }

    var result = connection.query(query, function(err, res, fields) {
        if(res.length == 0){
            if(type == 'lowInventory') {
                console.log("We don't have Low Inventory at the moment");
            }else{
                console.log("Out of Inventary");
            }
            // return;
        }else{
            console.log("\n" + line);
            console.log("Item Id | " + "Product | " +  "Deparment name | " + "Price |"+ "Quantity")
            console.log(line);
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + `$${res[i].price}` + " | " + res[i].stock_quantity );
            }
        }
        console.log("\n" + line);

        callback()

    })

};

function continueView(){
    inquirer.prompt({
        name: "continue",
        type: "confirm",
        message: "Would you like to continue? Yes|No",
    }).then(function(answer) {
        if(answer.continue){
            runOptions()
        }else{
            console.log("Bamazon wish you a Good Day!!! ")
            return;
        }
    })
}

function addInventory() {
    var questions = [
        {   name: "item_id",
            type: "input",
            message: "Which product's ID would you like to add inventory?"},
        {   name: "quantity",
            type: "input",
            message: "How many items would you like to add?"}

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
                    stockQuantity = stockQuantity + parseInt(quantityWanted)
                    console.log(line);
                    console.log("Product \t\t\t\t\t\t" +  "Price\t"+ "Stock Quantity")
                    console.log(`${product.product_name} \t ${product.price}\t ${product.stock_quantity}`)
                    console.log(line);
                    updateProduct(product, stockQuantity)
                }
            });
        });
    // }
}

var ids=[]
function updateProduct(product, quantity ) {
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
            console.log(res.affectedRows + " products updated!\n");
            if(res.changedRows === 1){
                ids.push(product.item_id);
                console.log("\n")
                continueView()

            }
        }
    );
}

function createProduct(callback) {
    var product_details = [
        {   name: "product_name",
            type: "input",
            message: "Please enter product name"
        },
        {   name: "department_name",
            type: "input",
            message: "Please enter deparment name"
        },
        {   name: "price",
            type: "input",
            message: "Please enter price"
        },
        {   name: "quantity",
            type: "input",
            message: "Please enter stock quantity"
        },

    ]
    inquirer
        .prompt(product_details)
        .then(function(answer) {
            // based on their answer, either call the bid or the post functions

            console.log("Inserting a new product...\n");

            connection.beginTransaction(function(err) {
                if (err) { throw err; }
                connection.query("INSERT INTO products SET ?",
                    {
                        product_name: answer.product_name,
                        department_name: answer.department_name,
                        price: answer.price,
                        stock_quantity: answer.quantity
                    },
                    function (error, results, fields) {
                        if (error) {
                            return connection.rollback(function() {
                                throw error;
                            });
                        }
                        connection.commit(function(err) {
                            if (err) {
                                return connection.rollback(function() {
                                    throw err;
                                });
                        }
                        console.log('success!');
                        callback()
                    });
                });
            });

        });
    // }
}