package com.project.dto;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberDto {


	
	Boolean a_authority;
	Boolean p_authority;
	Boolean e_authority;
	String m_id;
	String m_pw;
	
	public MemberDto(Boolean a_authority, Boolean p_authority, Boolean e_authority, String m_id, String m_pw) {
		super();
		this.a_authority = a_authority;
		this.p_authority = p_authority;
		this.e_authority = e_authority;
		this.m_id = m_id;
		this.m_pw = m_pw;
	}
}