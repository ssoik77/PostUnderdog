package com.project.dto;

import lombok.Data;

@Data
public class EmployeeDto {
	private long e_num;
	private String e_name;
	private String e_birth;
	private String carrier;
	private String e_tel_num;

	public EmployeeDto(long e_num, String e_name, String e_birth, String carrier, String e_tel_num) {
		this.e_num = e_num;
		this.e_name = e_name;
		this.e_birth = e_birth;
		this.carrier = carrier;
		this.e_tel_num = e_tel_num;
	}
}
