package com.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.EmployeeDto;
import com.project.service.RegiService;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@RestController
@RequestMapping("/register/*")
@Log4j
public class RegiController {

	@Setter(onMethod_=@Autowired )
	RegiService regiService;
	
    @PostMapping("/employee")
    public String registerEmployee(@RequestBody EmployeeDto employee) {
        log.info("컨트롤러 진입 - 이름: " + employee.getE_name() + ", 생년월일: " + employee.getE_birth());
        
        regiService.registerEmployee(employee);  // 서비스 계층 호출
        
        return "Employee registered successfully!";
    }
}