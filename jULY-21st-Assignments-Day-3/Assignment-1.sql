create database Assignments
use Assignments

CREATE TABLE employees (
emp_id INT PRIMARY KEY,
emp_name VARCHAR(100),
department VARCHAR(50),
salary INT,
age INT
);

CREATE TABLE departments (
dept_id INT PRIMARY KEY,
dept_name VARCHAR(50),
location VARCHAR(50)
);

INSERT INTO employees VALUES
(101, 'Amit Sharma', 'Engineering', 60000, 30),
(102, 'Neha Reddy', 'Marketing', 45000, 28),
(103, 'Faizan Ali', 'Engineering', 58000, 32),
(104, 'Divya Mehta', 'HR', 40000, 29),
(105, 'Ravi Verma', 'Sales', 35000, 26);

INSERT INTO departments VALUES
(1, 'Engineering', 'Bangalore'),
(2, 'Marketing', 'Mumbai'),
(3, 'HR', 'Delhi'),
(4, 'Sales', 'Chennai');

-- section A:Basic SQL
-- 1
select*from employees

-- 2
select emp_name,salary from employees

-- 3
select emp_id,emp_name,salary from employees where salary>40000

-- 4
select emp_id,emp_name,age from employees where age between 28 and 33

-- 5
select emp_id,emp_name,DEPARTMENT from employees where department !="HR"

-- 6
select emp_id,emp_name,salary from employees
order by salary desc

-- 7 
select distinct count(*)as count_of_employees from employees
 -- 8
 select emp_id,emp_name from employees
 where emp_id is not Null
 order by salary desc
 limit 1
 
-- Section B: Joins & Aggreagations
-- 1
select emp_name,location from employees join departments on employees.department=departments.dept_name

-- 2
select dept_name,count(emp_id) as count_emp from departments join employees on employees.department=departments.dept_name
group by dept_name

-- 3
select dept_name,avg(salary)as avg_salary from departments join employees on employees.department=departments.dept_name
group by dept_name

-- 4
select dept_name from departments left join employees on employees.department=departments.dept_name
where emp_name is Null

-- 5
select dept_name,sum(salary) as total_salary from employees join departments on employees.department=departments.dept_name
group by dept_name

-- 6
select dept_name,avg(salary) as avg_salary from departments join employees on employees.department=departments.dept_name
group by dept_name
having avg_salary>45000

-- 7
select dept_id,emp_name,dept_name from employees join departments on employees.department=departments.dept_name

