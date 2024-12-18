package com.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.RegisterDto;
import com.project.mapper.RegiMapper;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@Service
@Log4j
public class RegiService {
	

	@Setter(onMethod_=@Autowired )
	RegiMapper regi_mapper;
	
	public void setRegister(RegisterDto register_dto) {
		RegisterDto regi_member_dto = new RegisterDto(
				register_dto.getA_authority(), 
				register_dto.getE_authority(),
				register_dto.getP_authority(),
				register_dto.getM_id(),
				register_dto.getM_pw()
				);
		
		RegisterDto regi_employee_dto = new RegisterDto(
				register_dto.getE_name(),
				register_dto.getE_birth(),
				register_dto.getE_carrier(),
				register_dto.getE_tel_num()
				);
		regi_mapper.setRegisterMember(regi_member_dto);
		regi_mapper.setRegisterEmployee(regi_employee_dto);
		
	}
}
