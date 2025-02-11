CREATE DATABASE post_underdog;
USE post_underdog;

drop table member_info;
drop table vacation;
drop table employee_info;

CREATE TABLE employee_info(
e_key int auto_increment primary key,
e_num CHAR(10),
e_name CHAR(10) DEFAULT NULL,
e_birth DATE DEFAULT NULL,
e_carrier CHAR(10) DEFAULT NULL,
e_tel_num CHAR(11) DEFAULT NULL,
e_level CHAR(10) DEFAULT NULL,
e_team CHAR(10) DEFAULT NULL
);

CREATE TABLE member_info(
authority TINYINT NOT NULL DEFAULT 0,
m_id CHAR(20),
m_pw VARCHAR(20),
e_key int,
FOREIGN KEY (e_key) REFERENCES employee_info(e_key)
);

CREATE TABLE vacation (
vacation_id BIGINT NOT NULL AUTO_INCREMENT,
m_id CHAR(20), -- member_info 테이블의 m_id와 동일
e_name CHAR(10), -- employee_ info 테이블의 e_name과 동일
start_date DATE,
end_date DATE,
reason TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
e_key int,
approval TINYINT NOT NULL DEFAULT 0,
FOREIGN KEY (e_key) REFERENCES employee_info(e_key),
PRIMARY KEY (vacation_id)
);

SELECT * FROM member_info;
SELECT * FROM employee_info;
SELECT * FROM vacation;

-- 이 아래 테스트 코드

INSERT INTO employee_info(e_num, e_name, e_birth, e_carrier, e_tel_num, e_level, e_team) VALUES('00000001', '홍길동', '2000-01-01', 'SKT', '01012345678','레전드','전설');
INSERT INTO member_info(authority, m_id, m_pw, e_key) VALUES(1, 'qqqq12!@', 'wwww12!@', 1);

INSERT INTO employee_info(e_num, e_name, e_birth, e_carrier, e_tel_num, e_level, e_team) VALUES('00000002', 'qwe', '1992-11-05', '뮈시기', '01099887766', 'CEO', '뭐시기');
INSERT INTO member_info(authority, m_id, m_pw, e_key) VALUES(0, 'qwe123', 'qwe123', 2);