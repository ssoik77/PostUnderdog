package com.project.mapper;


import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.project.dto.EmployeeDto;
import com.project.dto.RegisterDto;


@Mapper
public interface EmployeeMapper {
	void add(EmployeeDto employeeDto);
	ArrayList<RegisterDto> pageList(int no);
	int employeeCount();
}
