package com.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.EmployeeDto;
import com.project.mapper.RegiMapper;

import lombok.Setter;


@Service
public class RegiServiceImpl implements RegiService {

	@Setter(onMethod_=@Autowired )
	RegiMapper regiMapper;
	
    @Override
    public void registerEmployee(EmployeeDto employee) {
        System.out.println("서비스 계층 진입 - 이름: " + employee.getE_name() + ", 생년월일: " + employee.getE_birth());
        regiMapper.insertEmployee(employee);  // Mapper 호출
    }
}
