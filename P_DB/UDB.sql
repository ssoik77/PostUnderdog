CREATE DATABASE post_underdog;
USE post_underdog;

drop table member_info;
drop table vacation;
drop table employee_info;

CREATE TABLE employee_info(
e_key int auto_increment primary key,
e_num int,
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
FOREIGN KEY (e_key) REFERENCES employee_info(e_key),
PRIMARY KEY (vacation_id)
);

SELECT * FROM member_info;
SELECT * FROM employee_info;
SELECT * FROM vacation;


-- 이 아래 테스트 코드

INSERT INTO employee_info (e_key, e_num, e_name, e_birth, e_carrier, e_tel_num, e_level, e_team)
VALUES
(2, 1001, '김철수', '1985-05-15', '개발자', '01012345678', 'Senior', '개발팀'),
(3, 1002, '이영희', '1990-07-22', '디자이너', '01087654321', 'Junior', '디자인팀'),
(4, 1003, '박민수', '1988-03-10', '개발자', '01011223344', 'Middle', '개발팀'),
(5, 1004, '최수진', '1992-11-05', '마케터', '01099887766', 'Junior', '마케팅팀');

-- employee_info에 삽입된 e_key 확인
SELECT e_num FROM employee_info;

-- member_info에 삽입
INSERT INTO member_info (authority, m_id, m_pw, e_key)
VALUES
(1, 'admin1', 'password123', 2),
(0, 'user1', 'password456', 3),
(0, 'user2', 'password789', 4),
(0, 'user3', 'password012', 5);
