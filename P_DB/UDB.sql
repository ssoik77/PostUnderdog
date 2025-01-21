CREATE DATABASE post_underdog;
USE post_underdog;

drop table employee_info;
drop table vacation;
drop table member_info;

CREATE TABLE employee_info(
e_key int auto_increment primary key,
e_num CHAR(10),
e_name CHAR(10) DEFAULT NULL,
e_birth DATE DEFAULT NULL,
e_carrier CHAR(10) DEFAULT NULL,
e_tel_num CHAR(11) DEFAULT NULL
);

CREATE TABLE member_info(authority TINYINT NOT NULL DEFAULT 0,
m_id CHAR(20),
m_pw VARCHAR(20),
e_key int,
FOREIGN KEY (e_key) REFERENCES employee_info(e_key)
);	


CREATE TABLE vacation (
    vacation_id BIGINT NOT NULL,
    m_id CHAR(20), -- member_info 테이블의 m_id와 동일
    e_name CHAR(10), -- employee_ info 테이블의 e_name과 동일
    start_date DATE,
    end_date DATE,
    reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    m_key int,
    FOREIGN KEY (m_key) REFERENCES member_info(m_key),
    PRIMARY KEY (vacation_id)
);

SELECT * FROM member_info;
SELECT * FROM employee_info;
SELECT * FROM vacation;

DELETE FROM employee_info;
DELETE FROM member_info;

TRUNCATE TABLE employee_info;
TRUNCATE TABLE member_info;

INSERT INTO employee_info(e_num, e_name, e_birth, e_carrier, e_tel_num) VALUES('00000001', '홍길동', 20000101, 'SKT', 01012345678);
INSERT INTO member_info(authority, m_id, m_pw, e_key) VALUES(1, 'qqqq12!@', 'wwww12!@', 1);

