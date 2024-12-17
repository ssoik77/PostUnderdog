package com.project.dto;

import java.sql.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RegisterDto {
	
	boolean a_authority;
	boolean p_authority;
	boolean e_authority;
	String m_id;
	String m_pw;
	
	int e_num;
	String e_name;
	Date e_birth;
	String e_carrier;
	int e_tel_num;
	
}
