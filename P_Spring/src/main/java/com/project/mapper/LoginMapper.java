package com.project.mapper;

import com.project.dto.MemberDto;

public interface LoginMapper {
    MemberDto getPasswordById(String m_id);
}
