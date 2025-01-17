CREATE DATABASE post_underdog;
USE post_underdog;

drop table employee_info;
drop table vacation;
drop table member_info;

CREATE TABLE member_info(
a_authority TINYINT NOT NULL DEFAULT 0,
p_authority TINYINT NOT NULL DEFAULT 0,
e_authority TINYINT NOT NULL DEFAULT 0,
m_id CHAR(20),
m_pw VARCHAR(20),
m_key int auto_increment primary key
);	

CREATE TABLE employee_info(
e_num int auto_increment primary key,
e_name CHAR(10),
e_birth DATE,
e_carrier CHAR(10),
e_tel_num CHAR(11),
e_level CHAR(10),
e_team CHAR(10),
m_key int,
FOREIGN KEY (m_key) REFERENCES member_info(m_key)
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

-- 아래로 코드 테스트용 칼럼데이터 추가코드 (없어도 됨)
SELECT m_pw FROM member_info WHERE m_id = 'ehvl5361';

SELECT * FROM member_info;
SELECT * FROM employee_info;

SELECT m_id, m_key FROM member_info WHERE m_id = 'ehvl5361';

SELECT vacation_id from vacation;

INSERT INTO member_info (m_id, m_pw)
VALUES
('admin', 'admin123'),
('user1', 'password1'),
('user2', 'password2');

INSERT INTO employee_info (e_name, e_birth, e_level, e_tel_num, m_key, e_team)
VALUES
('김영수', '1985-01-01', '팀장', '01012345678', 1, '영업팀'),
('이슬기', '1990-03-15', '사원', '01023456789', 2, '기술팀'),
('최하늘', '1988-07-22', '사원', '01034567890', 3, '기술팀');
