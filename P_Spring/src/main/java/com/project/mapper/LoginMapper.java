package com.project.mapper;

import com.project.dto.MemberDto;

public interface LoginMapper {
    MemberDto getPasswordById(String m_id);
    String getUserNameById(String m_id); // 사용자 이름 조회
}