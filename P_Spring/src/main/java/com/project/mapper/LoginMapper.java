package com.project.mapper;

import com.project.dto.EmployeeDto;
import com.project.dto.MemberDto;

public interface LoginMapper {
    MemberDto getPasswordById(String m_id); // 비밀번호 및 권한 확인
    EmployeeDto getUserData(String m_id); // 사용자 이름 조회
}