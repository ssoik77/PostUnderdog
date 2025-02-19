package com.project.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.EmployeeDto;
import com.project.dto.MemberDto;
import com.project.mapper.LoginMapper;

@Service
public class LoginService {

    private final LoginMapper loginMapper;

    @Autowired
    public LoginService(LoginMapper loginMapper) {
        this.loginMapper = loginMapper;
    }

    // 사용자 검증
    public Map<String, Object> validateUser(String m_id, String m_pw) {
        Map<String, Object> result = new HashMap<>();
        MemberDto loginUserData = loginMapper.getPasswordById(m_id);
        if (loginUserData != null && loginUserData.getM_pw().equals(m_pw)) {
            result.put("pw_check", true);
            result.put("authority", loginUserData.getAuthority());
        } else {
            result.put("pw_check", false);
        }
        return result;
    }

    // 사용자 이름 가져오기
    public EmployeeDto getUserData(String m_id) {
        return loginMapper.getUserData(m_id);
    }
}
