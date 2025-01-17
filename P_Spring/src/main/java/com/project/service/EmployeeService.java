package com.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.EmployeeDto;
import com.project.mapper.EmployeeMapper;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeMapper employeeMapper;

    public List<EmployeeDto> getAllEmployees() {
        return employeeMapper.getAllEmployees();
    }

    public EmployeeDto getEmployeeById(int id) {
        return employeeMapper.getEmployeeById(id);
    }

    public void addEmployee(EmployeeDto employee) {
        employeeMapper.addEmployee(employee);
    }

    public void updateEmployee(EmployeeDto employee) {
        employeeMapper.updateEmployee(employee);
    }

    public void deleteEmployee(int id) {
        employeeMapper.deleteEmployee(id);
    }
}
