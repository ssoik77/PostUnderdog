package com.project.dto;

import java.sql.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RegisterDto {

	int A_authority = 1;
	int P_authority = 1;
	int E_authority = 1;
	String m_id;
	String m_pw;

	String e_name;
	Date e_birth;
	String e_carrier;
	String e_tel_num;

	public RegisterDto(String e_name, Date e_birth, String e_carrier, String e_tel_num) {
		this.e_name = e_name;
		this.e_birth = e_birth;
		this.e_carrier = e_carrier;
		this.e_tel_num = e_tel_num;
	}

	public RegisterDto(int a_authority, int p_authority, int e_authority, String m_id, String m_pw, String e_name,
			Date e_birth, String e_carrier, String e_tel_num) {
		super();
		A_authority = a_authority;
		P_authority = p_authority;
		E_authority = e_authority;
		this.m_id = m_id;
		this.m_pw = m_pw;
		this.e_name = e_name;
		this.e_birth = e_birth;
		this.e_carrier = e_carrier;
		this.e_tel_num = e_tel_num;
	}

}
