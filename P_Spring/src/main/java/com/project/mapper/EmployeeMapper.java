package com.project.mapper;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.dto.EmployeeDto;
import com.project.dto.RegisterDto;

@Mapper
public interface EmployeeMapper {
    List<EmployeeDto> getAllEmployees();
    EmployeeDto getEmployeeById(int id);
	void add(EmployeeDto employeeDto);
	ArrayList<RegisterDto> pageList(int no);
	int employeeCount();
	void deleteEmployee(List<String> eNums);
	int pullKey(String eNum);
	void approvalAuthority(int eKey);
}
