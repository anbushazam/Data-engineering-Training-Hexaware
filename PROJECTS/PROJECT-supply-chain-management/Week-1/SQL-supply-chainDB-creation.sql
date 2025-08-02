create database supply_chain_db;
use supply_chain_db;

create table suppliers (
  supplier_id int auto_increment primary key,
  name varchar(100) not null,
  contact_email varchar(150)
);

create table inventory (
  item_id int auto_increment primary key,
  supplier_id int not null,
  stock_level int default 0,
  reorder_threshold int default 10,
  foreign key (supplier_id) references suppliers(supplier_id)
);

create table orders (
  order_id int auto_increment primary key,
  supplier_id int not null,
  order_date date not null,
  quantity int not null,
  status enum('pending','fulfilled','cancelled') default 'pending',
  foreign key (supplier_id) references suppliers(supplier_id)
);


insert into suppliers (name, contact_email)
  values ('acme co.', 'orders@acme.com');

insert into inventory (supplier_id, stock_level, reorder_threshold)
  values (1, 50, 20);

insert into orders (supplier_id, order_date, quantity)
  values (1, curdate(), 15);

 select o.order_id, s.name, o.quantity, o.status
  from orders o
  join suppliers s on o.supplier_id = s.supplier_id;

update inventory
  set stock_level = stock_level - 15
  where item_id = 1;

update orders
  set status = 'fulfilled'
  where order_id = 1;

delete from orders
  where order_id = 999;
  
  
-- creating procedure and triggers
delimiter //
create procedure place_order(
  in sup_id int,
  in qty int
)
begin
  insert into orders (supplier_id, order_date, quantity)
    values (sup_id, curdate(), qty);
end //
delimiter ;

delimiter //
create trigger auto_reorder
  after update on inventory
for each row
begin
  if new.stock_level < new.reorder_threshold then
    insert into orders (supplier_id, order_date, quantity, status)
      values (new.supplier_id, curdate(),
              new.reorder_threshold * 2, 'pending');
  end if;
end //
delimiter ;

create index idx_order_date on orders(order_date);
create index idx_inventory_supplier on inventory(supplier_id)







