package com.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.EmployeeDto;
import com.project.dto.MemberDto;
import com.project.mapper.MypageMapper;

@Service
public class MypageService {

    @Autowired
    private MypageMapper mypageMapper;

    public MemberDto getMemberInfo(String m_id) {
        return mypageMapper.getMemberInfo(m_id);
    }

    public EmployeeDto getEmployeeInfo(int m_key) {
        return mypageMapper.getEmployeeInfo(m_key);
    }
    public void updateMemberInfo(MemberDto member) {
        mypageMapper.updateMemberInfo(member);
    }

    public void updateEmployeeInfo(EmployeeDto employee) {
        mypageMapper.updateEmployeeInfo(employee);
    }    
}
