package com.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.RegisterDto;
import com.project.service.RegiService;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@CrossOrigin(origins = "http://localhost:3000") // React와의 CORS 허용
@RestController
@RequestMapping(value = "/register/*", produces = "application/text; charset=utf8")
@Log4j
public class RegiController {
    
    @Setter(onMethod_=@Autowired )
    RegiService regi_service;

    @PostMapping("/set")
    public void setRegister(@RequestBody RegisterDto register_dto) {
        log.info("회원가입 컨트롤러 진입");
        log.info("회원가입 데이터"+register_dto);
        regi_service.setRegister(register_dto);
    }
    
    @PostMapping("/id/check")
    public String checkId(@RequestBody RegisterDto register_dto) {
    	log.info("아이디 체크 컨트롤러 진입");
    	log.info("체크할 아이디: " + register_dto.getM_id());
    	String message = regi_service.checkId(register_dto.getM_id());
    	log.info("체크 결과: " + message);
    	return message;
    }
    


}
