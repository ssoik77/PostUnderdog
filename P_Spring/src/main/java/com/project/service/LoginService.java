package com.project.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.MemberDto;
import com.project.mapper.LoginMapper;

@Service
public class LoginService {

    private final LoginMapper loginMapper;

    @Autowired
    public LoginService(LoginMapper loginMapper) {
        this.loginMapper = loginMapper;
    }

    public Map<String, Object> validateUser(String m_id, String m_pw) {
    	Map<String, Object> result = new HashMap<>();
        MemberDto loginUserData = loginMapper.getPasswordById(m_id);
        result.put("pw_check", loginUserData.getM_pw().equals(m_pw));
        result.put("authority", loginUserData.getAuthority());
        return result;
    }

    public String getUserNameById(String m_id) {
        return loginMapper.getUserNameById(m_id);
    }
}
