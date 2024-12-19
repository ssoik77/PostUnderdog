package com.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.MemberDto;
import com.project.service.RegiService;

@CrossOrigin(origins = "http://localhost:3000") // 3000포트에서의 요청 허용
@RequestMapping("/register")
@RestController

public class RegiController {

    @Autowired
    private RegiService regiService;

    @PostMapping("/signup")
    public String register(@RequestBody MemberDto memberDto) {
        return regiService.registerMember(memberDto);
    }
}
