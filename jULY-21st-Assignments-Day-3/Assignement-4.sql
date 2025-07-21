create database assignment_4
use assignment_4

--  SECTION 1: Database Design

create table movies (
  movie_id int primary key,
  title varchar(255) not null,
  genre varchar(100) not null,
  release_year int not null,
  rental_rate decimal(5,2) not null
);

create table customers (
  customer_id int primary key,
  name varchar(255) not null,
  email varchar(255) not null,
  city varchar(100) not null
);

create table rentals (
  rental_id int primary key,
  customer_id int not null,
  movie_id int not null,
  rental_date date not null,
  return_date date,
  foreign key (customer_id) references customers(customer_id),
  foreign key (movie_id) references movies(movie_id)
);

--  SECTION 2: Data Insertion
insert into movies (movie_id, title, genre, release_year, rental_rate) values
  (1, 'inception',       'sci-fi',    2010, 3.99),
  (2, 'the godfather',   'crime',     1972, 2.99),
  (3, 'parasite',        'thriller',  2019, 3.49),
  (4, 'soul',            'animation', 2020, 2.49),
  (5, 'tenet',           'action',    2020, 3.99);

insert into customers (customer_id, name, email, city) values
  (1, 'amit sharma',     'amit.sharma@example.com',     'bangalore'),
  (2, 'priya singh',     'priya.singh@example.com',     'mumbai'),
  (3, 'rahul patel',     'rahul.patel@example.com',     'delhi'),
  (4, 'sunita reddy',    'sunita.reddy@example.com',    'chennai'),
  (5, 'vikram gupta',    'vikram.gupta@example.com',    'kolkata');

insert into rentals (rental_id, customer_id, movie_id, rental_date, return_date) values
  (1, 1, 1, '2023-01-05', '2023-01-10'),
  (2, 1, 2, '2023-02-10', null),
  (3, 2, 1, '2023-03-15', '2023-03-20'),
  (4, 2, 3, '2023-04-01', '2023-04-05'),
  (5, 3, 4, '2023-05-10', '2023-05-15'),
  (6, 4, 2, '2023-06-20', null),
  (7, 4, 5, '2023-07-01', '2023-07-05'),
  (8, 1, 1, '2023-07-10', null);
  
-- SECTION 3: Query Execution
--  Basic Queries

-- 1. 
select m.*
from rentals r
join customers c on r.customer_id = c.customer_id
join movies m    on r.movie_id    = m.movie_id
where c.name = 'amit sharma';

-- 2. 
select *from customers
where city = 'bangalore';

-- 3. 
select *from movies
where release_year > 2020;

-- Aggregate Queries
-- 4
select c.customer_id,c.name,count(r.rental_id) as movies_rented
from customers c
left join rentals r on c.customer_id = r.customer_id
group by c.customer_id, c.name;
 
 -- 5
 select movie_id,title,count(rentals.rental_id) as count_rents from rentals join movies using(movie_id)
 group by movie_id
 order by count_rents desc
 limit 1
 
 -- 6
 select sum(rental_rate) as total_revenue from rentals left join movies using(movie_id)
 
 -- Advanced Queries
 -- 7
select c.customer_id,c.name
from customers c
left join rentals r on c.customer_id = r.customer_id
where r.rental_id is null;
 
 -- 8
 select genre,sum(rental_rate) as revenue_per_genre from rentals 
 join movies using(movie_id)
 group by genre
 
 -- 9
 select customers.customer_id,name,sum(rental_rate) as amount_spent from customers join rentals using(customer_id) 
 join movies using(movie_id)
 group by customers.customer_id
 order by amount_spent desc
 limit 1
 
 -- 10
select distinct title as not_yet_returned from movies join rentals using(movie_id)
where rental_date is not Null and return_date is Null 




