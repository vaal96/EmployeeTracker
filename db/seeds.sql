use employee_tracker_db;
insert into department (id, department_name)
  VALUES 
    (1, "Sales"),
    (2, "Engineering"),
    (3, "Legal"),
    (4, "Finance");

insert into roles (job_title, id, department_id, salary)
  VALUES 
    ("Lawyer", 10, 3, 110000),
    ("Salesperson", 11, 1, 90000),
    ("Lead Engineer", 12, 2, 105000),
    ("Software Engineer", 13, 2, 125000),
    ("Accountant", 14, 4, 85000),
    ("Account Manager", 15, 4, 78000);

insert into employee (id, first_name, last_name, roles_id, manager_id)
  VALUES 
    (1, "Gary", "Cole", 12, null), 
    (2, "Justin", "Rogers", 14, 3),
    (3, "Wesley", "James", 15, null),
    (4, "Edwin", "Portillo", 14, 3),
    (5, "Renee", "Gamez", 12, null),
    (6, "Neli", "Roses", 10, null),
    (7, "Jesus", "Vazquez", 11, 1),
    (8, "Sophia", "Aguilar", 13, 1),
    (9, "Leo", "Romero", 13, 5);

