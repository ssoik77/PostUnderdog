CREATE DATABASE post_underdog;
USE post_underdog;

drop table member_info;
drop table employee_info;

CREATE TABLE member_info(

a_authority TINYINT(1) NOT NULL DEFAULT 0,
p_authority TINYINT(1) NOT NULL DEFAULT 0,
e_authority TINYINT(1) NOT NULL DEFAULT 0,
m_id CHAR(20) default null,
m_pw CHAR(20) default null
); 

CREATE TABLE employee_info(
e_num int auto_increment primary KEY,
e_name CHAR(10) default null,
e_birth DATE default null,
e_carrier CHAR(10) default null,
e_tel_num INT default null
);

select * from member_info;
select * from employee_info;




