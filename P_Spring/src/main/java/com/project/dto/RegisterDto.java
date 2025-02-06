package com.project.dto;

import java.sql.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class RegisterDto {

	int authority = 0;
	String m_id;
	String m_pw;
	String e_name;
	Date e_birth;
	String e_carrier;
	String e_tel_num;
	String e_num;
	int e_key;


	public RegisterDto(String m_id) {
		this.m_id = m_id;
	}
	
	public RegisterDto(String e_name, Date e_birth, String e_carrier, String e_tel_num, int e_key) {
		this.e_name = e_name;
		this.e_birth = e_birth;
		this.e_carrier = e_carrier;
		this.e_tel_num = e_tel_num;
		this.e_key = e_key;
	}

	public RegisterDto(int authority, String m_id, String m_pw, String e_name, Date e_birth, String e_carrier,
			String e_tel_num, String e_num) {
		this.authority = authority;
		this.m_id = m_id;
		this.m_pw = m_pw;
		this.e_name = e_name;
		this.e_birth = e_birth;
		this.e_carrier = e_carrier;
		this.e_tel_num = e_tel_num;
		this.e_num = e_num;
	}

	public RegisterDto(int authority, String m_id, String m_pw) {
		this.authority = authority;
		this.m_id = m_id;
		this.m_pw = m_pw;
	}

	public RegisterDto(int authority, String m_id, String m_pw, String e_name, Date e_birth, String e_carrier,
			String e_tel_num, String e_num, int e_key) {
		this.authority = authority;
		this.m_id = m_id;
		this.m_pw = m_pw;
		this.e_name = e_name;
		this.e_birth = e_birth;
		this.e_carrier = e_carrier;
		this.e_tel_num = e_tel_num;
		this.e_num = e_num;
		this.e_key = e_key;
	}


}