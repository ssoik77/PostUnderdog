package com.project.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.RegisterDto;
import com.project.service.RegiService;

import lombok.extern.log4j.Log4j;

@CrossOrigin(origins = "http://localhost:3000") // React와의 CORS 허용
@RestController
@RequestMapping(value = "/register/*", produces = "application/text; charset=utf8")
@Log4j
public class RegiController {

    private final RegiService regiService;
    
    public RegiController(RegiService regiService) {
        this.regiService = regiService;
    }

    @PostMapping("/set")
    public void setRegister(@RequestBody RegisterDto registerDto) {
        log.info("회원가입 컨트롤러 진입");
        log.info("회원가입 데이터" + registerDto);
        regiService.setRegister(registerDto);
    }

    @PostMapping("/id/check")
    public String checkId(@RequestBody RegisterDto registerDto) {
        log.info("아이디 체크 컨트롤러 진입");
        log.info("체크할 아이디: " + registerDto.getM_id());
        String message = regiService.checkId(registerDto.getM_id());
        log.info("체크 결과: " + message);
        return message;
    }
}