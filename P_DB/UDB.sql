CREATE DATABASE post_underdog;
USE post_underdog;

drop table member_info;
drop table vacation;
drop table employee_info;


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

SELECT * FROM member_info;
SELECT * FROM employee_info;
SELECT * FROM vacation;

DELETE FROM employee_info;
DELETE FROM member_info;

TRUNCATE TABLE employee_info;
TRUNCATE TABLE member_info;


-- 이 아래 테스트 코드
 UPDATE member_info
    SET authority = 1
    WHERE e_key IN (SELECT e_key FROM employee_info WHERE e_num = 00000011);

INSERT INTO employee_info (e_key, e_num, e_name, e_birth, e_carrier, e_tel_num, e_level, e_team) 
VALUES
(1, '00000001', 'qwe', '2000-01-01', 'SKT', '01012245678', '사장', '떼돈 벌기'),
(2, '00000002', '홍길동', '2000-01-01', 'SKT', '01012345178', '부사장', '떼돈 벌어주기'),
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
(1, 'qwe123', 'qwe123!!', 1),
(1, 'qqqq12!@', 'wwww12!@', 2),
(1, 'mmmm001', 'pass1234', 3),
(0, 'mmmm002', 'pass2345', 4),
(0, 'mmmm003', 'pass3456', 5),
(0, 'mmmm004', 'pass4567', 6),
(1, 'mmmm005', 'pass5678', 7),
(1, 'mmmm006', 'pass1234', 8),
(0, 'mmmm007', 'pass2345', 9),
(0, 'mmmm008', 'pass3456', 10),
(0, 'mmmm009', 'pass4567', 11),
(1, 'mmmm010', 'pass5678', 12);

INSERT INTO vacation (vacation_id, m_id, e_name, start_date, end_date, reason, created_at, updated_at, e_key, approval) 
VALUES
(1, 'qqqq12!@', '홍길동', '2025-03-19', '2025-03-25', '휴가', '2025-02-9 11:00:00', '2025-02-9 11:00:00', 2, 0),
(2, 'mmmm001', '홍박사', '2025-04-19', '2025-04-25', '휴가', '2025-02-15 11:00:00', '2025-02-15 11:00:00', 3, 0),
(3, 'mmmm002', '김철수', '2025-05-19', '2025-05-25', '휴가', '2025-02-16 11:00:00', '2025-02-16 11:00:00', 4, 0),
(4, 'mmmm003', '이영희', '2025-06-19', '2025-06-25', '휴가', '2025-02-17 11:00:00', '2025-02-17 11:00:00', 5, 0),
(5, 'mmmm004', '박민수', '2025-07-19', '2025-07-25', '휴가', '2025-02-18 11:00:00', '2025-02-18 11:00:00', 6, 0),
(6, 'mmmm005', '최지훈', '2025-07-19', '2025-07-25', '휴가', '2025-02-18 11:00:00', '2025-02-18 11:00:00', 7, 0),
(7, 'mmmm006', '홍박', '2025-07-19', '2025-07-25', '휴가', '2025-02-18 11:00:00', '2025-02-18 11:00:00', 8, 0),
(8, 'mmmm007', '김철', '2025-03-19', '2025-03-25', '휴가', '2025-02-9 11:00:00', '2025-02-9 11:00:00', 9, 0),
(9, 'mmmm008', '이희', '2025-04-19', '2025-04-25', '휴가', '2025-02-15 11:00:00', '2025-02-15 11:00:00', 10, 0),
(10, 'mmmm009', '박수', '2025-05-19', '2025-05-25', '휴가', '2025-02-16 11:00:00', '2025-02-16 11:00:00', 11, 0),
(11, 'mmmm010', '최훈', '2025-06-19', '2025-06-25', '휴가', '2025-02-17 11:00:00', '2025-02-17 11:00:00', 12, 0);