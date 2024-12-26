package com.project.mapper;

import com.project.dto.EmployeeDto;
import com.project.dto.MemberDto;

public interface MypageMapper {
    public MemberDto getMemberInfo(String m_id);
    public EmployeeDto getEmployeeInfo(int m_key);
}
