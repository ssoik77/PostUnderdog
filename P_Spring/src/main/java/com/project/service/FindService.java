package com.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.EmployeeDto;
import com.project.mapper.FindMapper;

@Service
public class FindService {

    @Autowired
    private FindMapper findMapper;

    public String findIdByDetails(EmployeeDto employeeDto) throws Exception {
        String id = findMapper.findIdByDetails(employeeDto);
        if (id == null || id.isEmpty()) {
            throw new Exception("ID not found");
        }
        return id;
    }

    public String findPwByDetails(EmployeeDto employeeDto) throws Exception {
        String pw = findMapper.findPwByDetails(employeeDto);
        if (pw == null || pw.isEmpty()) {
            throw new Exception("Password not found");
        }
        return pw;
    }
}