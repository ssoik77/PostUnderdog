CREATE DATABASE post_underdog;
USE post_underdog;

CREATE TABLE member_info(
a_authority TINYINT NOT NULL DEFAULT 0,
p_authority TINYINT NOT NULL DEFAULT 0,
e_authority TINYINT NOT NULL DEFAULT 0,
m_id CHAR(20),
m_pw VARCHAR(20),
m_key int auto_increment primary key
);

drop table member_info;

DESCRIBE member_info;	

CREATE TABLE employee_info(
e_num int auto_increment primary key,
e_name CHAR(10),
e_birth DATE,
e_carrier CHAR(10),
e_tel_num CHAR(11),
m_key int,
FOREIGN KEY (m_key) REFERENCES member_info(m_key)
);

drop table employee_info;

DESCRIBE employee_info;	
-- 아래로 코드 테스트용 칼럼데이터 추가코드 (없어도 됨)
INSERT INTO member_info (a_authority, p_authority, e_authority, m_id, m_pw)
VALUES (0, 0, 0, 'user1234', 'password1235');

INSERT INTO employee_info (e_name, e_birth, e_carrier, e_tel_num, m_key)
VALUES ('엄홍길', '1990-01-01', 'SKT', '01012345678', LAST_INSERT_ID());


SELECT m_pw FROM member_info WHERE m_id = 'ehvl5361';
select * from employee_info;
select * from member_info;
