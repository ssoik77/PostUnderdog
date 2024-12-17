CREATE DATABASE post_underdog;
USE post_underdog;

CREATE TABLE member_info(
a_authority TINYINT(1) NOT NULL DEFAULT 0,
p_authority TINYINT(1) NOT NULL DEFAULT 0,
e_authority TINYINT(1) NOT NULL DEFAULT 0,
m_id CHAR(20),
m_pw CHAR(20)
);

CREATE TABLE employee_info(
e_num int auto_increment primary KEY,
e_name CHAR(10),
e_birth DATE,
e_carrier CHAR(10),
e_tel_num INT
);

