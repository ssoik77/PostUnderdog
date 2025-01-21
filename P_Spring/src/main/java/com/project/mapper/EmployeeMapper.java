package com.project.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.dto.EmployeeDto;

@Mapper
public interface EmployeeMapper {
	void add(int e_num);
}
