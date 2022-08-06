USE Impact_Enterprise;

-- role_table,
-- employee_table

-- SELECT
--     id,
--     department_name AS "Departments"
--      FROM department_table;



-- SELECT 
--     title,
--     department_name AS "Departments",
--     salary
--     FROM role_table rt
--         LEFT JOIN department_table dt
--         ON rt.department_id = dt.id;


SELECT
    first_name AS "Name",
    last_name AS "Last Name",
    title,
    department_name AS "Departments",
    salary
    FROM employee_table et
        LEFT JOIN role_table rt
        ON et.role_id = rt.id
        LEFT JOIN department_table dt
        ON rt.department_id = dt.id;