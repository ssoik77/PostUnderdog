package com.project.mapper;


import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.project.dto.RegisterDto;


@Mapper
public interface EmployeeMapper {
	void add(String e_num);
	ArrayList<RegisterDto> allList();
	ArrayList<RegisterDto> pageList(int no);
	int employeeCount();
}
