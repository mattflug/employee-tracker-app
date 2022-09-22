USE employees_db;

insert into department(department_name) values('Finance'),('IT'),('Sales'),('Accounting');
insert into roles (title,salary,department_id) values('Manager','100000',1),('Employee','70000',2);
insert into employee (first_name,last_name,role_id) values('Matthew','Flug',1),('Bob','Saget',2);