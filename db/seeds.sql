use employee_tracker_db;
insert into department (department_name)
  VALUES 
    ("Sales"),
    ("Engineering"),
    ("Legal"),
    ("Finance");

insert into roles (title, department_id, salary)
  VALUES 
    ("Lawyer", 3, 110000),
    ("Salesperson", 1, 90000),
    ("Lead Engineer", 2, 105000),
    ("Software Engineer", 2, 125000),
    ("Accountant", 4, 85000),
    ("Account Manager", 4, 78000);

insert into employee (first_name, last_name, roles_id, manager_id)
  VALUES 
    ( "Gary", "Cole", 6, null), 
    ( "Justin", "Rogers", 6, null),
    ( "Wesley", "James", 5, null),
    ( "Edwin", "Portillo", 4, 3),
    ( "Renee", "Gamez", 2, null),
    ( "Neli", "Roses", 1, null),
    ( "Jesus", "Vazquez", 2, 1),
    ( "Sophia", "Aguilar", 3, 1),
    ( "Leo", "Romero", 3, 5);

