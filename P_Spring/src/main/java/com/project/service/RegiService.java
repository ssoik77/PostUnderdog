package com.project.service;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.RegisterDto;
import com.project.mapper.RegiMapper;

import lombok.Setter;

@Service
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
    
    public String checkId(String take_id) {
    	String id = take_id;
    	ArrayList<RegisterDto> m_id_list = regi_mapper.pullId();
    	String message = "사용 가능한 아이디입니다.";
    	for(RegisterDto compare_id : m_id_list) {
    		if(compare_id.getM_id().equals(id)) {
    			message = "이미 등록되어 있는 아이디입니다.";
    			break;
    		}
    	}
    	return message;
    }
}
