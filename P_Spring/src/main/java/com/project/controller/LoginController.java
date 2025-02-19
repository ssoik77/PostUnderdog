package com.project.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.EmployeeDto;
import com.project.dto.MemberDto;
import com.project.service.LoginService;

import lombok.extern.log4j.Log4j;

@RestController
@CrossOrigin(origins ={"http://localhost:3000","http://192.168.0.135:3000"}, allowCredentials = "true")
@Log4j
public class LoginController {

    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/login")
    @Transactional
    public ResponseEntity<Map<String, Object>> login(@RequestBody MemberDto memberDto) {
        log.info("로그인 요청: " + memberDto);

        Map<String, Object> response = loginService.validateUser(memberDto.getM_id(), memberDto.getM_pw());
        log.info("로그인 응답 데이터: " + response);

        if (Boolean.TRUE.equals(response.get("pw_check"))) {  
            String userId = memberDto.getM_id();
            EmployeeDto keyName = loginService.getUserData(userId);
            String userAuthority = String.valueOf(response.get("authority"));
            int userKey = keyName.getE_key();

            log.info("조회된 e_name (userName): " + keyName.getE_name());
            
            response.put("message", "로그인 성공");
            
            response.put("m_id", userId);
            response.put("e_name", keyName.getE_name());
            response.put("authority", userAuthority);
            response.put("e_key", userKey);

            log.info("최종 로그인 응답 데이터: " + response);

            return ResponseEntity.ok(response);
        } else {
            response.put("message", "아이디 또는 비밀번호가 틀렸습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}
