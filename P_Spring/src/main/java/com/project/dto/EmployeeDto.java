package com.project.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor // 기본 생성자 추가
public class EmployeeDto {
    private String e_num;
    private String e_name;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate e_birth;    
    private String e_team;
    private String e_level;
    private String e_carrier;
    private String e_tel_num;
    private String e_level; 
    private String e_team; 
    private int e_key;

    public EmployeeDto(String e_num, String e_name, String e_team, String e_level, LocalDate e_birth, String e_carrier, String e_tel_num, int e_key) {
        this.e_num = e_num;
        this.e_name = e_name;
        this.e_birth = e_birth;
        this.e_carrier = e_carrier;
        this.e_tel_num = e_tel_num;
        this.e_key = e_key;
        this.e_team = e_team;
        this.e_level = e_level;
    }

	public EmployeeDto(String e_num, String e_name) {
		this.e_num = e_num;
		this.e_name = e_name;
	}

	public EmployeeDto(String e_num, String e_name, LocalDate e_birth, String e_carrier, String e_tel_num,
			String e_level, String e_team) {
		this.e_num = e_num;
		this.e_name = e_name;
		this.e_birth = e_birth;
		this.e_carrier = e_carrier;
		this.e_tel_num = e_tel_num;
		this.e_level = e_level;
		this.e_team = e_team;
	}
    
    
}
