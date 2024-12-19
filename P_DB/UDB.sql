CREATE DATABASE post_underdog;
USE post_underdog;

CREATE TABLE member_info(
a_authority TINYINT NOT NULL DEFAULT 0,
p_authority TINYINT NOT NULL DEFAULT 0,
m_authority TINYINT NOT NULL DEFAULT 0,
m_id CHAR(20),
m_pw VARCHAR(20)
);

drop table member_info;

DESCRIBE member_info;	

CREATE TABLE employee_info(
e_num int auto_increment primary key,
e_name CHAR(10),
e_birth DATE,
e_carrier CHAR(10),
e_tel_num INT
);

SELECT m_pw FROM member_info;
