package com.project.service;


import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.RegisterDto;
import com.project.mapper.EmployeeMapper;
import lombok.extern.log4j.Log4j;

@Service
@Log4j
public class EmployeeService {

	private EmployeeMapper employeeMapper;

	@Autowired
	public EmployeeService(EmployeeMapper employeeMapper) {
		this.employeeMapper = employeeMapper;
	}

	public void add(String e_num) {
		log.info(e_num);
		employeeMapper.add(e_num);
	}
	
	public ArrayList<RegisterDto> list() {
		ArrayList<RegisterDto> list = new ArrayList<RegisterDto>();
		list = employeeMapper.list();
		return list;
	}
}
