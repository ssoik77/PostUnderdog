package com.project.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.MemberDto;
import com.project.service.LoginService;

import lombok.extern.log4j.Log4j;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@Log4j
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public Map<String, Boolean> login(@RequestBody MemberDto memberDto) {
    	log.info("데이터 전달 받은 결과: "+memberDto);
        Map<String, Boolean> loginResult = loginService.validateUser(memberDto.getM_id(), memberDto.getM_pw());
        log.info("로그인 결과: "+loginResult);
        return loginResult;
    }
}
