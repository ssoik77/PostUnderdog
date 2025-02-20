CREATE DATABASE post_underdog;
USE post_underdog;

drop table member_info;
drop table vacation;
drop table employee_info;
drop table dispatch;

CREATE TABLE employee_info(
e_key int auto_increment primary key,
e_num VARCHAR(10),
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
SELECT e_key FROM employee_info WHERE e_num = '00000009';

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
approval INT DEFAULT 0,
FOREIGN KEY (e_key) REFERENCES employee_info(e_key),
PRIMARY KEY (vacation_id)
);

CREATE TABLE dispatch (
dispatch_id BIGINT NOT NULL AUTO_INCREMENT,
m_id CHAR(20), -- member_info 테이블의 m_id와 동일
e_name CHAR(10), -- employee_ info 테이블의 e_name과 동일
start_date DATE,
end_date DATE,
dispatch_where TEXT,
dispatch_payment CHAR(20),
dispatch_detail CHAR(100),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
e_key int,
dispatch_complete INT DEFAULT 0,
FOREIGN KEY (e_key) REFERENCES employee_info(e_key),
PRIMARY KEY (dispatch_id)
);

SELECT * FROM member_info;
SELECT * FROM employee_info;
SELECT * FROM vacation;
SELECT * FROM dispatch;


DELETE FROM employee_info;
DELETE FROM member_info;

TRUNCATE TABLE employee_info;
TRUNCATE TABLE member_info;


-- 이 아래 테스트 코드
 UPDATE member_info
    SET authority = 1
    WHERE e_key IN (SELECT e_key FROM employee_info WHERE e_num = 00000011);

  SELECT b.vacation_id AS vacationId, 
           b.m_id AS mId, 
           b.e_name AS eName, 
           b.start_date AS startDate, 
           b.end_date AS endDate, 
           b.reason,
           b.approval
    	FROM employee_info a
    	JOIN vacation b ON a.e_key = b.e_key
    	WHERE e_team = "떼돈 벌어주기"
    	ORDER BY start_date DESC;

INSERT INTO employee_info (e_key, e_num, e_name, e_birth, e_carrier, e_tel_num, e_level, e_team) 
VALUES
(1, '00000001', '사장', '2000-01-01', 'SKT', '01012245678', '사장', '총무'),
(2, '00000002', '홍길동', '2000-01-01', 'SKT', '01012345178', '부사장', '총무'),
(3, '00000003', '홍박사', '1990-03-15', 'SKT', '01012355678', '과장', '영업'),
(4, '00000004', '김철수', '1985-07-20', 'KT', '01023456789', '부장', '개발'),
(5, '00000005', '이영희', '1992-11-05', 'LGU+', '01034567890', '과장', '마케팅'),
(6, '00000006', '박민수', '1988-05-22', 'SKT', '01045678901', '과장', '인사'),
(7, '00000007', '최지훈', '1995-02-17', 'KT', '01056789012', '대리', '영업'),
(8, '00000008', '홍박', '1990-03-15', 'SKT', '01012335678', '차장', '영업'),
(9, '00000009', '김철', '1985-07-20', 'KT', '01023453789', '대리', '개발'),
(10, '00000010', '이희', '1992-11-05', 'LGU+', '01033567890', '사원', '마케팅'),
(11, '00000011', '박수', '1988-05-22', 'SKT', '01045378901', '대리', '인사'),
(12, '00000012', '최훈', '1995-02-17', 'KT', '01056389012', '팀장', '영업');

INSERT INTO member_info (authority, m_id, m_pw, e_key) 
VALUES
(1, 'admin', 'admin1!', 1),
(1, 'admin2', 'admin1!', 2),
(0, 'user001', 'pass1234!', 3),
(1, 'user002', 'pass1234!', 4),
(0, 'user003', 'pass1234!', 5),
(0, 'user004', 'pass1234!', 6),
(0, 'user005', 'pass1234', 7),
(0, 'user006', 'pass1234!', 8),
(0, 'user007', 'pass1234!', 9),
(0, 'user008', 'pass1234!', 10),
(0, 'user009', 'pass1234!', 11),
(0, 'user010', 'pass1234!', 12);

INSERT INTO vacation (vacation_id, m_id, e_name, start_date, end_date, reason, created_at, updated_at, e_key, approval) 
VALUES
(1, 'admin2', '홍길동', '2025-03-19', '2025-03-25', '휴가', '2025-02-9 11:00:00', '2025-02-9 11:00:00', 2, 1),
(2, 'user001', '홍박사', '2025-04-19', '2025-04-25', '휴가', '2025-02-15 11:00:00', '2025-02-15 11:00:00', 3, 0),
(3, 'user002', '김철수', '2025-05-19', '2025-05-25', '휴가', '2025-02-16 11:00:00', '2025-02-16 11:00:00', 4, 1),
(4, 'user003', '이영희', '2025-06-19', '2025-06-25', '휴가', '2025-02-17 11:00:00', '2025-02-17 11:00:00', 5, 0),
(5, 'user004', '박민수', '2025-07-19', '2025-07-25', '휴가', '2025-02-18 11:00:00', '2025-02-18 11:00:00', 6, 2),
(6, 'user005', '최지훈', '2025-07-19', '2025-07-25', '휴가', '2025-02-18 11:00:00', '2025-02-18 11:00:00', 7, 0),
(7, 'user006', '홍박', '2025-07-19', '2025-07-25', '휴가', '2025-02-18 11:00:00', '2025-02-18 11:00:00', 8, 1),
(8, 'user007', '김철', '2025-03-19', '2025-03-25', '휴가', '2025-02-9 11:00:00', '2025-02-9 11:00:00', 9, 0),
(9, 'user008', '이희', '2025-04-19', '2025-04-25', '휴가', '2025-02-15 11:00:00', '2025-02-15 11:00:00', 10, 2),
(10, 'user009', '박수', '2025-05-19', '2025-05-25', '휴가', '2025-02-16 11:00:00', '2025-02-16 11:00:00', 11, 0),
(11, 'user010', '최훈', '2025-06-19', '2025-06-25', '휴가', '2025-02-17 11:00:00', '2025-02-17 11:00:00', 12, 1);