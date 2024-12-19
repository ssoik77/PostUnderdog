package com.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.MemberDto;
import com.project.service.RegiService;

@CrossOrigin(origins = "http://localhost:3000") // React와의 CORS 허용
@RequestMapping("/register")
@RestController
public class RegiController {

    @Autowired
    private RegiService regiService;

    @PostMapping("/signup")
    public String register(@RequestBody MemberDto memberDto) {
        // 디버깅용 로그
        System.out.println("Received password: " + memberDto.getM_pw());

        // 비밀번호가 전달되지 않으면 오류 메시지 반환
        if (memberDto.getM_pw() == null || memberDto.getM_pw().isEmpty()) {
            return "비밀번호를 입력해주세요.";
        }

        // 서비스 호출 후 결과 반환
        return regiService.registerMember(memberDto);
    }
}
