
DECLARE @Counter INT

SET @Counter = 0

--The loop begins by checking a condition is met

--Here we check that the counter has not exceeded 10

WHILE @Counter <= 10

--When the condition is met, the loop is entered

--The BEGIN/END block groups the instructions performed in the loop
INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES ("' Man, Op. 11, CT. 47", "Alberta Hunter", "Blues"),
("St. Louis Blues", "W.C. Handy", "Blues")

BEGIN

--Do something useful here
INSERT INTO product (product_name, department_name, price, stock_quantity)
VALUES(CONCAT("Product #", @Counter ), CONCAT("Department Name #", @Counter ), 10 + @Counter, @Counter)



--Increment the counter variable

SET @Counter += 1

END