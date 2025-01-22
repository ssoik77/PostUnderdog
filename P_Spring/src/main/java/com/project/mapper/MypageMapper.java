package com.project.mapper;

import com.project.dto.EmployeeDto;
import com.project.dto.MemberDto;

public interface MypageMapper {
    MemberDto getMemberInfo(String m_id);
    EmployeeDto getEmployeeInfo(int e_key);
    void updateMemberInfo(MemberDto member);
    void updateEmployeeInfo(EmployeeDto employee);
}
