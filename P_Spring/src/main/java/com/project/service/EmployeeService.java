package com.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.EmployeeDto;
import com.project.mapper.EmployeeMapper;

@Service
public class EmployeeService {

	private EmployeeMapper employeeMapper;

	@Autowired
	public EmployeeService(EmployeeMapper employeeMapper) {
		this.employeeMapper = employeeMapper;
	}

	public void add(int e_num) {
		employeeMapper.add(e_num);
	}
}
