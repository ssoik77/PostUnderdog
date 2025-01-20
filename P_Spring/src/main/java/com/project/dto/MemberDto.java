package com.project.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberDto {
    private Boolean authority;
    private String m_id;
    private String m_pw;
    private Integer m_key;
    
	public MemberDto(Boolean authority, String m_id, String m_pw, Integer m_key, String e_name) {
		this.authority = authority;
		this.m_id = m_id;
		this.m_pw = m_pw;
		this.m_key = m_key;
	}

}
