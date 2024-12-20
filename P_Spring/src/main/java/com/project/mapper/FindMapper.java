package com.project.mapper;

import com.project.dto.EmployeeDto;

public interface FindMapper {
    String findIdByDetails(EmployeeDto employeeDto);
}