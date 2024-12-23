package com.project.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberDto {

    private Boolean a_authority;
    private Boolean p_authority;
    private Boolean m_authority;
    private String m_id;
    private String m_pw;
    private Integer m_key; // m_key 필드 추가

    public MemberDto(Boolean a_authority, Boolean p_authority, Boolean m_authority, String m_id, String m_pw, Integer m_key) {
        this.a_authority = a_authority;
        this.p_authority = p_authority;
        this.m_authority = m_authority;
        this.m_id = m_id;
        this.m_pw = m_pw;
        this.m_key = m_key;
    }
}
