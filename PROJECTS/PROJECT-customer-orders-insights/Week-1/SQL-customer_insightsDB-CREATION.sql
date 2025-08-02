create database customer_insightsDB
use customer_insightsDB


create table customers (
  customer_id int primary key auto_increment,
  name varchar(100),
  email varchar(150),
  created_at datetime default current_timestamp
);


create table orders (
  order_id int primary key auto_increment,
  customer_id int,
  order_date datetime not null,
  total_amount decimal(10,2),
  foreign key (customer_id) references customers(customer_id)
);


create table delivery_status (
  status_id int primary key auto_increment,
  order_id int,
  status enum('dispatched','in_transit','delivered','delayed','returned'),
  status_time datetime not null,
  remarks varchar(255),
  foreign key (order_id) references orders(order_id)
);


insert into customers (name, email) values
  ('alice brown', 'alice@example.com'),
  ('bob smith', 'bob@example.com'),
  ('carol lee', 'carol@example.com');


insert into orders (customer_id, order_date, total_amount) values
  (1, '2025-07-20 09:15:00', 125.50),
  (2, '2025-07-22 14:30:00', 80.00),
  (3, '2025-07-23 11:00:00', 200.75);


insert into delivery_status (order_id, status, status_time, remarks) values
  (1, 'dispatched', '2025-07-25 10:00:00', 'left warehouse'),
  (1, 'in_transit', '2025-07-26 14:00:00', 'arrived at sorting center'),
  (1, 'delivered', '2025-07-27 18:00:00', 'signed by customer'),
  (2, 'dispatched', '2025-07-26 09:30:00', 'picked up by carrier'),
  (2, 'in_transit', '2025-07-27 16:45:00', 'en route to destination'),
  (2, 'delayed', '2025-07-28 09:00:00', 'weather delay'),
  (3, 'dispatched', '2025-07-27 11:00:00', 'carrier pickup'),
  (3, 'returned', '2025-07-29 15:20:00', 'address not found');
  
  
  -- simple crud operations
  select o.order_id, c.name, o.order_date, o.total_amount
from orders o
join customers c on o.customer_id = c.customer_id
where o.order_id = 1;

update orders
set total_amount = total_amount * 1.10
where order_id = 1;


-- stored procedures
delimiter //
create procedure fetch_delayed_deliveries(
  in cust_id int
)
begin
  select 
    o.order_id,
    ds.status_time,
    ds.remarks
  from orders o
  join delivery_status ds on o.order_id = ds.order_id
  where o.customer_id = cust_id
    and ds.status = 'delayed'
  order by ds.status_time;
end //
delimiter ;


 
 




