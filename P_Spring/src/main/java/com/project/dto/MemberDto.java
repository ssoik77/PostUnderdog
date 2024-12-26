package com.project.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberDto {
    
    private Boolean a_authority;
    private Boolean p_authority;
    private Boolean e_authority;
    private String m_id;
    private String m_pw;
    private Integer m_key; // m_key 필드 추가

    public MemberDto(Boolean a_authority, Boolean p_authority, Boolean e_authority, String m_id, String m_pw, Integer m_key) {
        this.a_authority = a_authority;
        this.p_authority = p_authority;
        this.e_authority = e_authority;
        this.m_id = m_id;
        this.m_pw = m_pw;
        this.m_key = m_key;
    }

	public MemberDto(Boolean a_authority, Boolean p_authority, Boolean e_authority, String m_pw) {
		this.a_authority = a_authority;
		this.p_authority = p_authority;
		this.e_authority = e_authority;
		this.m_pw = m_pw;
	}
    
}
