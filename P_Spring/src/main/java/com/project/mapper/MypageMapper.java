package com.project.mapper;

import com.project.dto.EmployeeDto;
import com.project.dto.MemberDto;

public interface MypageMapper {
    MemberDto getMemberInfo(String m_id);
    EmployeeDto getEmployeeInfo(int m_key);
}
