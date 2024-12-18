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
e_num int auto_increment primary key,
e_name CHAR(10),
e_birth DATE,
e_carrier CHAR(10),
e_tel_num INT
);
select * from member_info;
select * from employee_info;

show tables;
INSERT INTO member_info (m_id, m_pw, a_authority, p_authority, e_authority)
VALUES
('dummyUser1', 'password1', 0, 0, 0),
('dummyUser2', 'password2', 0, 0, 0);
drop table member_info;

