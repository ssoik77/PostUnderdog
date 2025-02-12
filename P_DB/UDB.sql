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
INSERT INTO employee_info(e_num, e_name, e_birth, e_carrier, e_tel_num) VALUES('00000001', '홍길동', '2000-01-01', 'SKT', '01012345678');
INSERT INTO member_info(authority, m_id, m_pw, e_key) VALUES(1, 'qqqq12!@', 'wwww12!@', 1);

INSERT INTO employee_info (e_key, e_num, e_name, e_birth, e_carrier, e_tel_num, e_level, e_team) 
VALUES
(101, '20240001', '홍길동', '1990-03-15', 'SKT', '01012345678', '과장', '영업'),
(102, '20240002', '김철수', '1985-07-20', 'KT', '01023456789', '부장', '개발'),
(103, '20240003', '이영희', '1992-11-05', 'LGU+', '01034567890', '사원', '마케팅'),
(104, '20240004', '박민수', '1988-05-22', 'SKT', '01045678901', '대리', '인사'),
(105, '20240005', '최지훈', '1995-02-17', 'KT', '01056789012', '팀장', '영업');

INSERT INTO member_info (authority, m_id, m_pw, e_key) 
VALUES
(1, 'mmmm001', 'pass1234', 101),
(1, 'mmmm002', 'pass2345', 102),
(0, 'mmmm003', 'pass3456', 103),
(0, 'mmmm004', 'pass4567', 104),
(1, 'mmmm005', 'pass5678', 105);

INSERT INTO vacation (vacation_id, m_id, e_name, start_date, end_date, reason, created_at, updated_at, e_key, approval) 
VALUES
(1, 'm001', '홍길동', '2025-03-01', '2025-03-05', '가족 여행', '2025-02-10 10:00:00', '2025-02-10 10:00:00', 101, 1),
(2, 'm002', '김철수', '2025-04-10', '2025-04-12', '개인 사정', '2025-02-11 09:30:00', '2025-02-11 09:30:00', 102, 1),
(3, 'm003', '이영희', '2025-05-15', '2025-05-18', '건강 문제', '2025-02-12 14:15:00', '2025-02-12 14:15:00', 103, 0),
(4, 'm004', '박민수', '2025-06-20', '2025-06-25', '결혼식 참석', '2025-02-13 11:45:00', '2025-02-13 11:45:00', 104, 0),
(5, 'm005', '최지훈', '2025-07-01', '2025-07-07', '해외 여행', '2025-02-14 08:20:00', '2025-02-14 08:20:00', 105, 0);

-- employee_info에 삽입된 e_key 확인
SELECT e_num FROM employee_info;

-- member_info에 삽입
INSERT INTO member_info (authority, m_id, m_pw, e_key)
VALUES
(2, 'qwe123', 'qwe123', 1);

