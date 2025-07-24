use analytics_practice
 CREATE TABLE Pets ( 
pet_id INT PRIMARY KEY, 
name VARCHAR(50), 
type VARCHAR(20), 
breed VARCHAR(50), 
age INT, 
owner_name VARCHAR(50) 
); 
INSERT INTO Pets VALUES  
(1, 'Buddy', 'Dog', 'Golden Retriever', 5, 'Ayesha'), 
(2, 'Mittens', 'Cat', 'Persian', 3, 'Rahul'), 
(3, 'Rocky', 'Dog', 'Bulldog', 6, 'Sneha'), 
(4, 'Whiskers', 'Cat', 'Siamese', 2, 'John'), 
(5, 'Coco', 'Parrot', 'Macaw', 4, 'Divya'), 
(6, 'Shadow', 'Dog', 'Labrador', 8, 'Karan');

CREATE TABLE Visits ( 
visit_id INT PRIMARY KEY, 
pet_id INT, 
visit_date DATE, 
issue VARCHAR(100), 
fee DECIMAL(8,2), 
FOREIGN KEY (pet_id) REFERENCES Pets(pet_id) 
); 
INSERT INTO Visits VALUES 
(101, 1, '2024-01-15', 'Regular Checkup', 500.00), 
(102, 2, '2024-02-10', 'Fever', 750.00), 
(103, 3, '2024-03-01', 'Vaccination', 1200.00), 
(104, 4, '2024-03-10', 'Injury', 1800.00), 
(105, 5, '2024-04-05', 'Beak trimming', 300.00), 
(106, 6, '2024-05-20', 'Dental Cleaning', 950.00), 
(107, 1, '2024-06-10', 'Ear Infection', 600.00);



/* Query Tasks
 Basics
 1. List all pets who are dogs.
 2. Show all visit records with a fee above 800.*/
 
 select *from pets
where type = 'dog';

select *from visits
where fee > 800;

 
 /*Joins
 3. List pet name, type, and their visit issues.
4. Show the total number of visits per pet.*/

select p.name,p.type,v.issue
from visits v
join pets p
  on v.pet_id = p.pet_id;
  
  select p.name,count(*) as visit_count from visits v
join pets p
  on v.pet_id = p.pet_id
group by p.name;



/* Aggregation
 5. Find the total revenue collected from all visits.
 6. Show the average age of pets by type.*/
 
 select sum(fee) as total_revenue
from visits;

select type,avg(age) as avg_age from pets
group by type;
 
/* Date & Filtering
 7. List all visits made in the month of March.
 8. Show pet names who visited more than once.*/
 
 select*from Visits 
 where month(visit_date)=03

 select p.name from visits v
join pets p
  on v.pet_id = p.pet_id
group by p.name
having count(*) > 1;
 
 /*Subqueries
 9. Show the pet(s) who had the costliest visit.
 10. List pets who haven’t visited the clinic yet.*/
 
 select *from pets where pet_id = (
  select pet_id
  from visits
  order by fee desc
  limit 1
);
 
 select *from pets
where pet_id not in (
  select distinct pet_id
  from visits
);
 
 
 /*Update & Delete
 11. Update the fee for visit_id 105 to 350.
 12. Delete all visits made before Feb 2024.*/
 
 update visits set fee = 350
where visit_id = 105;

delete from visits
where visit_date < '2024-02-01';
