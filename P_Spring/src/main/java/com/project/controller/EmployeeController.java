package com.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.EmployeeDto;
import com.project.service.EmployeeService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/employee")
public class EmployeeController {

    private EmployeeService employeeService;
    
    @Autowired
    public EmployeeController(EmployeeService employeeService) {
		this.employeeService = employeeService;
	}

    @PostMapping("/add")
    void employeeRegistration(@RequestBody EmployeeDto employeeDto) {
    	employeeService.add(employeeDto.getE_num());
    }
    
    
}
