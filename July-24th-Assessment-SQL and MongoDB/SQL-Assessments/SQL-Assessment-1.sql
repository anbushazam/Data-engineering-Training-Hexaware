use analytics_practice;
create table exercises(
exercise_id int primary key,
exercise_name varchar(100),
category varchar(100),
calories_burn_per_min int
);

create table workoutlog(
log_id int primary key,
exercise_id int,
date date,
duration_min int,
mood varchar(100),
foreign key (exercise_id)references exercises(exercise_id)
);
-- insert sample exercises

insert into exercises values
  (1, 'running', 'cardio',       10),
  (2, 'cycling', 'cardio',        8),
  (3, 'push-ups', 'strength',     5),
  (4, 'yoga', 'flexibility',      4),
  (5, 'swimming', 'cardio',       9);

-- insert sample workout logs 

insert into workoutlog values
  ( 1, 1, '2025-03-05', 30, 'energized'),
  ( 2, 1, '2025-04-10', 45, 'tired'),
  ( 3, 2, '2025-03-15', 20, 'normal'),
  ( 4, 2, '2025-04-20', 60, 'energized'),
  ( 5, 3, '2024-02-15', 15, 'tired'),
  ( 6, 3, '2025-03-22', 25, 'energized'),
  ( 7, 4, '2025-03-18', 40, 'normal'),
  ( 8, 4, '2025-05-01', 50, 'tired'),
  ( 9, 5, '2025-03-25', 30, 'energized'),
  (10, 5, '2025-04-05', 45, 'normal');
  
 /* Basic Queries
 1. Show all exercises under the “Cardio” category.
 2. Show workouts done in the month of March 2025.*/

 select exercise_name from exercises where category="cardio"
 select*from workoutlog where year(date)=2025 and month(date)=03
 
 /*  Calculations
 3. Calculate total calories burned per workout (duration × calories_burn_per_min).
 4. Calculate average workout duration per category.*/
 
select w.log_id,(e.calories_burn_per_min * w.duration_min) as total_calories_burned from exercises as e join workoutlog  as w using(exercise_id)

select category,avg(duration_min)as avg_timing_per_category from exercises as e join workoutlog  as w using(exercise_id)
group by category

/* JOIN + Aggregation
 5. List exercise name, date, duration, and calories burned using a join.
 6. Show total calories burned per day.*/
 
 select exercise_name,date,duration_min as duration,(duration_min*calories_burn_per_min) as calories_burned  from exercises as e join workoutlog  as w using(exercise_id)

select date ,sum(duration_min*calories_burn_per_min)from exercises as e join workoutlog  as w using(exercise_id)
group by date

/*Subqueries
 7. Find the exercise that burned the most calories in total.
 8. List exercises never logged in the workout log.*/
 
 select exercise_name,most_calorie_burned from(select  w.exercise_id,exercise_name,(duration_min*calories_burn_per_min) as most_calorie_burned from exercises as e join workoutlog  as w using(exercise_id)) as ex
 order by most_calorie_burned desc
 limit 1
 
select*from exercises 
where exercise_id not in (select distinct exercise_id from workoutlog) 

/* Conditional + Text Filters
 9. Show workouts where mood was “Tired” and duration > 30 mins.
 10. Update a workout log to correct a wrongly entered mood.*/
 
 select * from workoutlog
 where mood="tired" and duration_min>30
 
 update workoutlog set mood="energized" where log_id=10
 
 /*Update & Delete
 11. Update the calories per minute for “Running”.
 12. Delete all logs from February 2024.*/
 
 
 update exercises set calories_burn_per_min =12 where exercise_name="running"
 delete from workoutlog where year(date)=2024 and month(date)=02
 
