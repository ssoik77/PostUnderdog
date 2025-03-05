package com.project.service;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.EmployeeDto;
import com.project.dto.RegisterDto;
import com.project.mapper.EmployeeMapper;

import lombok.extern.log4j.Log4j;

@Service
@Log4j
public class EmployeeService {
	@Autowired
    private EmployeeMapper employeeMapper;

    public List<EmployeeDto> getAllEmployees(String page) {
    	Map<String, Object> params = new HashMap<String, Object>();
    	params.put("sendPage", page);
    	
        return employeeMapper.getAllEmployees(params);
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
	    if (allPageCountRemainder > 0) {
	        allPageCount = (allPageCount + 1);
	    }
	    return allPageCount;
	}
	
	public ArrayList<RegisterDto> pageList(int pageNoInPage) {
		ArrayList<RegisterDto> pageList = employeeMapper.pageList(pageNoInPage);
		return pageList;
	}
	public ArrayList<RegisterDto> pageAllList() {
		ArrayList<RegisterDto> pageList = employeeMapper.pageAllList();
		return pageList;
	}
	
	public void deleteEmployee (List<String> eNums) {
		employeeMapper.deleteEmployee(eNums);
	}
	
	public void changeAuthority (RegisterDto registerDto) {
		int authority = (registerDto.getAuthority() == 0 ? 1 : 0);
		registerDto.setAuthority(authority);
		employeeMapper.changeAuthority(registerDto);
	}
	
	
}
