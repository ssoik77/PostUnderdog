CREATE DATABASE post_underdog;
USE post_underdog;

drop table member_info;
drop table vacation;
drop table employee_info;


CREATE TABLE employee_info(
e_key int auto_increment primary key,
e_num VARCHAR(8),
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

DELETE FROM employee_info;
DELETE FROM member_info;

TRUNCATE TABLE employee_info;
TRUNCATE TABLE member_info;


-- 이 아래 테스트 코드
INSERT INTO employee_info(e_num, e_name, e_birth, e_carrier, e_tel_num, e_level, e_team)
 VALUES('00000001', '홍길동', '2000-01-01', 'SKT', '01012345678', '사장', '떼돈 벌기');
INSERT INTO member_info(authority, m_id, m_pw, e_key) VALUES(1, 'qqqq12!@', 'wwww12!@', 1);

INSERT INTO employee_info (e_key, e_num, e_name, e_birth, e_carrier, e_tel_num, e_level, e_team) 
VALUES
(2, '00000002', '홍박사', '1990-03-15', 'SKT', '01012345678', '과장', '영업'),
(3, '00000003', '김철수', '1985-07-20', 'KT', '01023456789', '부장', '개발'),
(4, '00000004', '이영희', '1992-11-05', 'LGU+', '01034567890', '사원', '마케팅'),
(5, '00000005', '박민수', '1988-05-22', 'SKT', '01045678901', '대리', '인사'),
(6, '00000006', '최지훈', '1995-02-17', 'KT', '01056789012', '팀장', '영업');

INSERT INTO member_info (authority, m_id, m_pw, e_key) 
VALUES
(1, 'mmmm001', 'pass1234', 2),
(0, 'mmmm002', 'pass2345', 3),
(0, 'mmmm003', 'pass3456', 4),
(0, 'mmmm004', 'pass4567', 5),
(1, 'mmmm005', 'pass5678', 6);

INSERT INTO vacation (vacation_id, m_id, e_name, start_date, end_date, reason, created_at, updated_at, e_key, approval) 
VALUES
(8, 'qqqq12!@', '가나다', '2025-03-19', '2025-03-25', '휴가', '2025-02-9 11:00:00', '2025-02-9 11:00:00', 1, 1),
(9, 'qqqq12!@', '라마바', '2025-04-19', '2025-04-25', '휴가', '2025-02-15 11:00:00', '2025-02-15 11:00:00', 1, 1),
(10, 'qqqq12!@', '사아자', '2025-05-19', '2025-05-25', '휴가', '2025-02-16 11:00:00', '2025-02-16 11:00:00', 1, 1),
(11, 'qqqq12!@', '차카타', '2025-06-19', '2025-06-25', '휴가', '2025-02-17 11:00:00', '2025-02-17 11:00:00', 1, 1),
(12, 'qqqq12!@', '파하', '2025-07-19', '2025-07-25', '휴가', '2025-02-18 11:00:00', '2025-02-18 11:00:00', 1, 1);