package com.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.RegisterDto;
import com.project.service.RegiService;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@RestController
@RequestMapping("/register/*")
@Log4j
public class RegiController {
	
	@Setter(onMethod_=@Autowired )
	RegiService regi_service;

	@PostMapping("/set")
	public void setRegister(@RequestBody RegisterDto register_dto) {
		log.info("회원가입 컨트롤러 진입");
		regi_service.setRegister(register_dto);
	}
	
}
