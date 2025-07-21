create database assignment_2
use  assignment_2

CREATE TABLE students (
student_id INT PRIMARY KEY,
name VARCHAR(100),
age INT,
gender VARCHAR(10),
department_id INT
);

CREATE TABLE departments (
department_id INT PRIMARY KEY,
department_name VARCHAR(100),
head_of_department VARCHAR(100)
);

CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(100),
    department_id INT,
    credit_hours INT
);

INSERT INTO students VALUES
(1, 'Amit Sharma', 20, 'Male', 1),
(2, 'Neha Reddy', 22, 'Female', 2),
(3, 'Faizan Ali', 21, 'Male', 1),
(4, 'Divya Mehta', 23, 'Female', 3),
(5, 'Ravi Verma', 22, 'Male', 2);


INSERT INTO departments VALUES
(1, 'Computer Science', 'Dr. Rao'),
(2, 'Electronics', 'Dr. Iyer'),
(3, 'Mechanical', 'Dr. Khan');

INSERT INTO courses VALUES
(101, 'Data Structures', 1, 4),
(102, 'Circuits', 2, 3),
(103, 'Thermodynamics', 3, 4),
(104, 'Algorithms', 1, 3),
(105, 'Microcontrollers', 2, 2);

-- Section A: Basic Queries
-- 1
select name,age,gender from students

-- 2
select name,gender from students where gender="Female"

-- 3
select course_name from departments left join courses using(department_id)
where department_name="Electronics"

-- 4
select department_name,head_of_department from departments where department_id=1

-- 5
select student_id,name,age from students where age > 21

-- Section B: Intermediate Joins & Aggregations
-- 6
select name,department_name from students left join departments using(department_id)

-- 7
select department_name,count(name)as count_students from students left join departments using(department_id)
group by department_name

-- 8
select department_name,avg(age)as avg_age from students left join departments using(department_id)
group by department_name

-- 9
select course_name,department_name from courses join departments using(department_id)

-- 10
select department_name from departments as d left join students as s on s.department_id=d.department_id
where name is Null

-- Section C: Subqueries & Advanced Filters
-- 12
select name from students 
where age > (select avg(age) from students)

-- 13
select department_name from departments join courses using (department_id)
where credit_hours>3

-- 14
select name from students left join 
(select department_id,department_name,count(course_name)as fewest_courses from departments join courses using (department_id)
group by department_id
order by fewest_courses
limit 1) as few using (department_id)
where department_name is not Null

-- 15
select name from students join departments using(department_id)
where head_of_department like "Dr.%"

-- 16
select name,age from(select name,age from students
order by age desc
limit 2 offset 1)as second_age
limit 1

-- 17
select course_name from courses right join (
select departments.department_id,department_name,count(name)as count_students from students join departments using(department_id)
group by departments.department_id
having count_students >2) as count_table using(department_id)

