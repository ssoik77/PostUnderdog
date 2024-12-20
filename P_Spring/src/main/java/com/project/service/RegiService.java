package com.project.service;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.dto.RegisterDto;
import com.project.mapper.RegiMapper;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@Service
@Log4j
public class RegiService {
    

    @Setter(onMethod_=@Autowired )
    RegiMapper regi_mapper;
    
    @Transactional
    public void setRegister(RegisterDto register_dto) {
        regi_mapper.setRegisterMember(register_dto);
        regi_mapper.setRegisterEmployee(register_dto);
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
