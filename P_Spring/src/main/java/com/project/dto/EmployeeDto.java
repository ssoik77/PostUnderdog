package com.project.dto;

import lombok.Data;

@Data
public class EmployeeDto {
	private String e_name;	// 이름
	private String e_birth;	// 생년월일 (DATE 타입을 문자열로 받음)
}
