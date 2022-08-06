DROP DATABASE IF EXISTS Impact_Enterprise;

CREATE DATABASE Impact_Enterprise;

USE Impact_Enterprise;

CREATE TABLE department_table(
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role_table(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY(department_id) REFERENCES department_table(id)
);

CREATE TABLE employee_table(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager_id INT DEFAULT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES role_table(id),
    FOREIGN KEY (manager_id) REFERENCES employee_table(id)
);
