package com.project.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor // 기본 생성자 추가
public class EmployeeDto {
    int e_num;
    String e_name;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate e_birth;
    String e_carrier;
    String e_tel_num;
    int m_key;

    public EmployeeDto(int e_num, String e_name, LocalDate e_birth, String e_carrier, String e_tel_num, int m_key) {
        this.e_num = e_num;
        this.e_name = e_name;
        this.e_birth = e_birth;
        this.e_carrier = e_carrier;
        this.e_tel_num = e_tel_num;
        this.m_key = m_key;
    }
}
