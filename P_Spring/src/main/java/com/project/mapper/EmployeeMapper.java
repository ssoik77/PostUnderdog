package com.project.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.dto.EmployeeDto;

@Mapper
public interface EmployeeMapper {
    List<EmployeeDto> getAllEmployees();
    EmployeeDto getEmployeeById(int id);
    void addEmployee(EmployeeDto employee);
    void updateEmployee(EmployeeDto employee);
    void deleteEmployee(int id);
}
