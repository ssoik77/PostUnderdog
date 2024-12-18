show databases;

CREATE DATABASE post_underdog;
use post_underdog;

create table member_info(
a_authority tinyint(1) NOT NULL DEFAULT 0,
p_authority tinyint(1) NOT NULL DEFAULT 0,
e_authority tinyint(1) NOT NULL DEFAULT 0,
m_id CHAR(20),
m_pw CHAR(20)
);

select * from member_info;
drop table member_info;

CREATE TABLE employee_info(
e_num INT AUTO_INCREMENT PRIMARY KEY,
e_name CHAR(10),
e_birth DATE,
e_carrier CHAR(10),
e_tel_num int
);

select * from employee_info;
drop table employee_info;
