package com.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.mapper.LoginMapper;

@Service
public class LoginService {

    @Autowired
    private LoginMapper loginMapper;

    public boolean validateUser(String m_id, String m_pw) {
        String storedPassword = loginMapper.getPasswordById(m_id);
        return storedPassword != null && storedPassword.equals(m_pw);
    }
}
