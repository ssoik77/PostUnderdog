package com.project.dto;

import lombok.Data;

@Data
public class MemberDto {
	boolean a_authority;
	boolean p_authority;
	boolean e_authority;
	private String m_id;
	private String m_pw;

	public MemberDto(boolean a_authority, boolean p_authority, boolean e_authority, String m_id, String m_pw) {
		super();
		this.a_authority = a_authority;
		this.p_authority = p_authority;
		this.e_authority = e_authority;
		this.m_id = m_id;
		this.m_pw = m_pw;
	}

}
