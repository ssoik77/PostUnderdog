package com.project.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class FindPwDto {
    private String m_id;       
    private String e_tel_num;  

    public FindPwDto(String m_id, String e_tel_num) {
        this.m_id = m_id;
        this.e_tel_num = e_tel_num;
    }
}
