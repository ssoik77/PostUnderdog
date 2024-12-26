package com.project.mapper;

import com.project.dto.EmployeeDto;
import com.project.dto.FindPwDto;

public interface FindMapper {
    String findIdByDetails(EmployeeDto employeeDto);
    String findPwByDetails(FindPwDto findPwDto);
}