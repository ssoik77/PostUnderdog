package com.project.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberDto {
    private Boolean authority;
    private String m_id;
    private String m_pw;
    private Integer e_key;
    
	public MemberDto(Boolean authority, String m_id, String m_pw, Integer e_key, String e_name) {
		this.authority = authority;
		this.m_id = m_id;
		this.m_pw = m_pw;
		this.e_key = e_key;
	}

}
