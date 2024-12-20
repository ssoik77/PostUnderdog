package com.project.dto;

import java.sql.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RegisterDto {

	int a_authority = 1;
	int p_authority = 1;
	int m_authority = 1;
	String m_id;
	String m_pw;

	String e_name;
	Date e_birth;
	String e_carrier;
	String e_tel_num;
	
	int m_key;

	public RegisterDto(int a_authority, int p_authority, int m_authority, String m_id, String m_pw, int m_key) {
		this.a_authority = a_authority;
		this.p_authority = p_authority;
		this.m_authority = m_authority;
		this.m_id = m_id;
		this.m_pw = m_pw;
	}

	public RegisterDto(String e_name, Date e_birth, String e_carrier, String e_tel_num, int m_key) {
		this.e_name = e_name;
		this.e_birth = e_birth;
		this.e_carrier = e_carrier;
		this.e_tel_num = e_tel_num;
		this.m_key = m_key;
	}

	public RegisterDto(int a_authority, int p_authority, int m_authority, String m_id, String m_pw, String e_name,
			Date e_birth, String e_carrier, String e_tel_num) {
		this.a_authority = a_authority;
		this.p_authority = p_authority;
		this.m_authority = m_authority;
		this.m_id = m_id;
		this.m_pw = m_pw;
		this.e_name = e_name;
		this.e_birth = e_birth;
		this.e_carrier = e_carrier;
		this.e_tel_num = e_tel_num;
	}

}