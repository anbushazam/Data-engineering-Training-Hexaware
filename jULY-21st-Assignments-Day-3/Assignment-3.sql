create database Assignment_3
use Assignment_3

--   PART 1: Design the Database
create table books(
book_id int primary key,
title varchar(100),
author varchar(100),
genre varchar(100),
price decimal
);

create table customers(
customer_id int primary key,
name varchar(100),
email varchar(100),
city varchar(100)
);

create table orders(
order_id int primary key,
customer_id int,
book_id int,
order_date date,
quantity int,
foreign key (customer_id) references customers(customer_id),
foreign key (book_id)references books(book_id)
);

-- PART 2: Insert Sample Data
insert into books (book_id, title, author, genre, price) values
  (1, 'The Art of War', 'Sun Tzu', 'Strategy',   450.00),
  (2, 'The Pragmatic Programmer', 'Andrew Hunt and David Thomas', 'Technology', 650.00),
  (3, 'Clean Code', 'Robert C. Martin', 'Technology', 700.00),
  (4, 'The Da Vinci Code', 'Dan Brown', 'Mystery', 550.00),
  (5, 'Harry Potter and the Sorcerer''s Stone', 'J.K. Rowling', 'Fantasy', 495.00);
  
 insert into customers (customer_id, name, email, city)values
  (1, 'Alice Johnson',    'alice.johnson@example.com',    'Mumbai'),
  (2, 'Bharath Kumar',    'bharath.kumar@example.com',    'Hyderabad'),
  (3, 'Chandra Devi',     'chandra.devi@example.com',     'Chennai'),
  (4, 'Dinesh Patel',     'dinesh.patel@example.com',     'Kolkata'),
  (5, 'Esha Gupta',       'esha.gupta@example.com',       'Delhi');
  
   insert into orders (order_id, customer_id, book_id, order_date, quantity)values
  (1, 4, 1, '2022-11-20', 3),
  (2, 2, 2, '2022-12-25', 1),
  (3, 1, 3, '2023-01-05', 2),
  (4, 3, 4, '2023-02-10', 1),
  (5, 1, 3, '2023-03-15', 1),
  (6, 5, 2, '2023-05-01', 1),
  (7, 1, 4, '2023-06-30', 2);

-- PART 3: Write and Execute Queries
-- Basic Queries
-- 1
select title,price from books where price>500;

-- 2
select * from customers where city="Hyderabad";

-- 3
select *from orders where order_Date>"2023-01-01";

-- Joins & Aggregations
-- 4
select name,title from customers left join orders using(customer_id)
left join books using(book_id)

-- 5
select genre,sum(quantity) as books_sold from books join orders using(book_id)
group by genre

-- 6
select book_id,title,sum(price*quantity) as sales from books join orders using(book_id)
group by book_id

-- 7
select customer_id,count(order_id)as no_orders from customers  join orders using(customer_id)
group by customer_id
order by no_orders
limit 1

-- 8

select genre,round(avg(price), 2) as average_price
from books
group by genre;

-- 9
select b.book_id,b.title
from books as b
left join orders as o on b.book_id = o.book_id
where o.order_id is null;

-- 10
select customers.customer_id,sum(price*quantity) as most_spent from orders join customers using(customer_id) 
join books using(book_id)
group by customers.customer_id
order by most_spent desc
limit 1

