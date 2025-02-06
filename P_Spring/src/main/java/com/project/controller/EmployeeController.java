package com.project.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.EmployeeDto;
import com.project.dto.RegisterDto;
import com.project.service.EmployeeService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public List<EmployeeDto> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @PostMapping
    public void addEmployee(@RequestBody EmployeeDto employee) {
        employeeService.addEmployee(employee);
    }

    @PutMapping("/{id}")
    public void updateEmployee(@PathVariable int id, @RequestBody EmployeeDto employee) {
        employee.setE_num(id);
        employeeService.updateEmployee(employee);
    }

    @DeleteMapping("/{id}")
    public void deleteEmployee(@PathVariable int id) {
        employeeService.deleteEmployee(id);
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
