DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(255),
  department_name VARCHAR(100),
  price DECIMAL(10,4) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY(item_id)
);

CREATE TABLE departments(
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(255),
  over_head_costs DECIMAL(10,4) NULL,
  PRIMARY KEY(department_id)
);