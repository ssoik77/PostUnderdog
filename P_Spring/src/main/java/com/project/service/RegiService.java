package com.project.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.dto.EmployeeDto;
import com.project.dto.RegisterDto;
import com.project.mapper.RegiMapper;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@Service
@Log4j
public class RegiService {

	@Setter(onMethod_ = @Autowired)
	private RegiMapper regi_mapper;

	@Transactional
	public String setRegister(RegisterDto register_dto) {
		String registerResult = "fail1";
		// 입력받은 사원번호로 데이터 조회
		EmployeeDto employee = regi_mapper.checkRegister(register_dto.getE_num());
		if(employee != null) {
		String employeeName = employee.getE_name();
		String employeeNum = employee.getE_tel_num();
		if( employeeNum != null) {
			registerResult = "fail2";
		}else if(register_dto.getE_name().equals(employeeName)) {
			// 1. 직원 정보 업데이트 (e_key 생성)
			regi_mapper.setRegisterEmployee(register_dto);
			// 2. 직원 키 dto에 삽입
			register_dto.setE_key(regi_mapper.pullKey(register_dto));
			// 3. 회원 정보 삽입 (e_key 사용)
			regi_mapper.setRegisterMember(register_dto);
			registerResult = "success";
		}
		}
		log.info(registerResult);
		return registerResult;
	}

	public String checkId(String take_id) {
		String id = take_id;
		ArrayList<RegisterDto> m_id_list = regi_mapper.pullId();
		String message = "사용 가능한 아이디입니다.";
		for (RegisterDto compare_id : m_id_list) {
			if (compare_id.getM_id().equals(id)) {
				message = "이미 등록되어 있는 아이디입니다.";
				break;
			}
		}
		return message;
	}
}
