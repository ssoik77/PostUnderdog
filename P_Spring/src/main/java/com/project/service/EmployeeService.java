package com.project.service;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.EmployeeDto;
import com.project.dto.RegisterDto;
import com.project.mapper.EmployeeMapper;

@Service
public class EmployeeService {
	@Autowired
    private EmployeeMapper employeeMapper;

    public List<EmployeeDto> getAllEmployees() {
        return employeeMapper.getAllEmployees();
    }
    
    public EmployeeDto getEmployeeById(int id) {
        return employeeMapper.getEmployeeById(id);
    }
    
	public void add(EmployeeDto employeeDto) {
		employeeMapper.add(employeeDto);
	}
	
	public int pageCount() {
		int employeeCount = employeeMapper.employeeCount();
		int allPageCount = (employeeCount / 10);
		int allPageCountRemainder = (employeeCount % 10);
		if(allPageCountRemainder > 0) {
			allPageCount = (allPageCount + 1);
		}
		return allPageCount;
	}
	
	public ArrayList<RegisterDto> pageList(int pageNoInPage) {
		ArrayList<RegisterDto> pageList = employeeMapper.pageList(pageNoInPage);
		return pageList;
	}
}
