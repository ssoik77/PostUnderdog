package com.project.mapper;

import com.project.dto.EmployeeDto;

public interface RegiMapper {
	// 이름과 생년월일 데이터를 DB에 삽입하는 메서드
	public void insertEmployee(EmployeeDto employee);
}
