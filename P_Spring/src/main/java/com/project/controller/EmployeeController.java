package com.project.controller;


import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.EmployeeDto;
import com.project.dto.RegisterDto;
import com.project.service.EmployeeService;

import lombok.extern.log4j.Log4j;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/employee")
@Log4j
public class EmployeeController {

    private EmployeeService employeeService;
    
    @Autowired
    public EmployeeController(EmployeeService employeeService) {
		this.employeeService = employeeService;
	}

    @PostMapping("/add")
    @Transactional
    void employeeRegistration(@RequestBody EmployeeDto employeeDto) {
    	employeeService.add(employeeDto);
    }
    
    @GetMapping("/pagecount")
    @ResponseBody
    int pageCount() {
    	return employeeService.pageCount();
    }
    
    @GetMapping("/list")
    @ResponseBody
    ArrayList<RegisterDto> employeeList(@RequestParam("no") int pageNo) {
    	int pageNoInPage = ((pageNo-1) * 10);
    	ArrayList<RegisterDto> list = employeeService.pageList(pageNoInPage);
    	return list;
    }
    
}
