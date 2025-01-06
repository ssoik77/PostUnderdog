package com.project.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.MemberDto;
import com.project.mapper.LoginMapper;

@Service
public class LoginService {

    private LoginMapper loginMapper;
    
    @Autowired
    public LoginService(LoginMapper loginMapper) {
		this.loginMapper = loginMapper;
	}

	public Map<String, Boolean> validateUser(String m_id, String m_pw) {
        MemberDto storedPassword = loginMapper.getPasswordById(m_id);
        Map<String, Boolean> result = new HashMap<>();
        result.put("pw_check", storedPassword.getM_pw().equals(m_pw));
        result.put("a_authority", storedPassword.getA_authority());
        result.put("e_authority", storedPassword.getE_authority());
        result.put("p_authority", storedPassword.getP_authority());
        
        return result;
    }
}
