package com.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.dto.EmployeeDto;
import com.project.dto.FindPwDto;
import com.project.mapper.FindMapper;

import lombok.extern.log4j.Log4j;

@Service
@Log4j
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
    
    public String findPwByDetails(FindPwDto findPwDto) throws Exception {
        String pw = findMapper.findPwByDetails(findPwDto);
        if (pw == null || pw.isEmpty()) {
            throw new Exception("Password not found");
        }
        return pw;
    }
    
}