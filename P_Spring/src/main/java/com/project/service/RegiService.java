package com.project.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.project.dto.RegisterDto;
import com.project.mapper.RegiMapper;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@Log4j
public class RegiService {
	
	@Setter(onMethod_=@Autowired )
	RegiMapper regi_mapper;
	
	public void setRegister(RegisterDto register_dto) {
		regi_mapper.setRegister(register_dto);
	}
}
