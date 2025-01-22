package com.project.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.MemberDto;
import com.project.service.LoginService;

import lombok.extern.log4j.Log4j;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@Log4j
public class LoginController {

    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody MemberDto memberDto) {
        
        // 사용자 인증
        Map<String, Object> response = loginService.validateUser(memberDto.getM_id(), memberDto.getM_pw());
        
        if ((Boolean) response.get("pw_check")) {
            // 사용자 이름 조회
            String userName = loginService.getUserNameById(memberDto.getM_id());
            Object userAuthority = response.get("authority");
            
            response.put("message", "로그인 성공");
            response.put("userName", userName);
            response.put("userAuthority", userAuthority);
            
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "아이디 또는 비밀번호가 틀렸습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @GetMapping("/userinfo")
    public ResponseEntity<?> getUserInfo(HttpSession session) {
        // 세션에서 사용자 정보 가져오기
        String userId = (String) session.getAttribute("userId");
        String userName = (String) session.getAttribute("userName");
        Object userAuthority = session.getAttribute("authority");

        // 세션에 정보가 없을 때 처리
        if (userId == null || userName == null) {
            log.warn("로그인된 사용자가 없습니다.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인된 사용자가 없습니다.");
        }

        // 사용자 정보 반환
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("userId", userId);
        userInfo.put("userName", userName);
        userInfo.put("userAuthority", userAuthority);

        log.info("사용자 정보 반환: " + userInfo);
        
        return ResponseEntity.ok(userInfo);
    }
}
