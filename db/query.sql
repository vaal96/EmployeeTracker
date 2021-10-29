use employee_tracker_db;
/*
select * from department;
select roles.id, roles.title, roles.salary, department.department_name AS department
from roles LEFT JOIN department on roles.department_id = department.id;
---
select employee.id, employee.first_name, employee.last_name, roles.title, 
department.department_name AS department, roles.salary, 

CONCAT(manager_employee.first_name,' ',manager_employee.last_name) AS manager FROM employee
INNER JOIN roles ON employee.role_id = roles.id
---
select
  a.id,
  CONCAT(a.first_name, " ", a.last_name) AS name,
  a.is_minor,
  CONCAT(b.first_name, " ", b.last_name) AS parent
from participants AS a LEFT JOIN participants AS 
on a.parent_id = b.id;

-- query for all trips
select id, destination, 
  concat(
    month(trip_date), 
    "/",
    day(trip_date),
    "/",
    year(trip_date)
  ) as date from trips;

UPDATE trips SET destination = "Somewhere", trip_date = "2022-1-9" WHERE id = 1;
*/