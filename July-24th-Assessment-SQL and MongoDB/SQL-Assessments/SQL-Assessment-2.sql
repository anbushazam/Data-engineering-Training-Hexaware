use analytics_practice
-- create tables

create table destinations (
  destination_id  int  primary key,
  city  varchar(50),
  country varchar(50),
  category  varchar(20),
  avg_cost_per_day int
);

create table trips (
  trip_id         int primary key,
  destination_id  int  references destinations(destination_id),
  traveler_name varchar(50),
  start_date  date,
  end_date  date,
  budget   int
);

-- insert sample destinations

insert into destinations values
  (1, 'bali',         'indonesia',    'beach',      3500),
  (2, 'agra',         'india',        'historical', 2000),
  (3, 'manali',       'india',        'nature',     2500),
  (4, 'paris',        'france',       'historical', 5000),
  (5, 'queenstown',   'new zealand',  'adventure',  4500),
  (6, 'santorini',    'greece',       'beach',      4000);
  
  -- insert sample trips

insert into trips values
  ( 1, 2, 'bob',    '2022-12-20', '2022-12-27', 15000),
  ( 2, 4, 'alice',  '2023-06-01', '2023-06-10', 60000),
  ( 3, 1, 'carl',   '2024-01-15', '2024-01-22', 30000),
  ( 4, 5, 'diana',  '2024-02-10', '2024-02-18', 36000),
  ( 5, 3, 'elaine', '2025-07-05', '2025-07-15', 25000),
  ( 6, 6, 'frank',  '2023-09-10', '2023-09-15', 20000),
  ( 7, 2, 'george','2024-11-01', '2024-11-05', 10000),
  ( 8, 1, 'helen',  '2025-02-20', '2025-02-27', 28000),
  ( 9, 4, 'ian',    '2022-08-10', '2022-08-20', 70000),
  (10, 5, 'jane',   '2023-12-01', '2023-12-12', 50000),
  (11, 3, 'kyle',   '2022-07-01', '2022-07-05', 10000);
  
   /*Query Tasks
 Basic Queries
 1. Show all trips to destinations in “India”.
 2. List all destinations with an average cost below 3000.*/
 
 select t.*from trips t
join destinations d
  on t.destination_id = d.destination_id
where d.country = 'india';

select *from destinations
where avg_cost_per_day < 3000;
 
 
 /*Date & Duration
 3. Calculate the number of days for each trip.
 4. List all trips that last more than 7 days.*/
 
 select trip_id,start_date,end_date,datediff(end_date, start_date) as duration_days
from trips;

select trip_id,traveler_name,datediff(end_date, start_date) as duration_days
from trips
having duration_days > 7;
 
 /*JOIN + Aggregation
 5. List traveler name, destination city, and total trip cost (duration ×
 avg_cost_per_day).
 6. Find the total number of trips per country.*/
 
 select t.traveler_name,d.city,datediff(t.end_date, t.start_date) * d.avg_cost_per_day as total_trip_cost
from trips t
join destinations d
  on t.destination_id = d.destination_id;
  
  select d.country,count(*) as total_trips
from trips t
join destinations d
  on t.destination_id = d.destination_id
group by d.country;
 
 
/* Grouping & Filtering
 7. Show average budget per country.
 8. Find which traveler has taken the most trips.*/
 
 select d.country,avg(t.budget) as avg_budget from trips t
join destinations d
  on t.destination_id = d.destination_id
group by d.country;

select traveler_name,count(*) as trip_count from trips
group by traveler_name
order by trip_count desc
limit 1;
 
 
/* Subqueries
 9. Show destinations that haven’t been visited yet.
 10. Find the trip with the highest cost per day.*/
 
 select *from destinations
where destination_id not in (
  select distinct destination_id
  from trips
);

select *from trips
order by budget / datediff(end_date, start_date) desc
limit 1;

 
/* Update & Delete
 11. Update the budget for a trip that was extended by 3 days.
 12. Delete all trips that were completed before Jan 1, 2023.*/
 
 update trips as t join destinations as d using(destination_id)
 set t.end_date=date_add(t.end_date,interval 3 day),t.budget=t.budget+(3*d.avg_cost_per_day)
 where t.trip_id=3
  
  delete from trips
where end_date < '2023-01-01';
  
  
  
  
  
  
  