package com.project.dto;

import java.sql.Date;

import lombok.Data;

@Data
public class EmployeeDto {

    int e_num;
    String e_name;
    Date e_birth;
    String e_carrier;
    int e_tel_num;

    public EmployeeDto(int e_num, String e_name, Date e_birth, String e_carrier, int e_tel_num) {
        this.e_num = e_num;
        this.e_name = e_name;
        this.e_birth = e_birth;
        this.e_carrier = e_carrier;
        this.e_tel_num = e_tel_num;
    }
    
    
    

}
