package com.project.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.EmployeeDto;
import com.project.service.FindService;

@RestController
@RequestMapping("/find")
@CrossOrigin(origins = "http://localhost:3000")
public class FindController {

    @Autowired
    private FindService findService;

    @PostMapping("/id")
    public Map<String, String> findId(@RequestBody EmployeeDto employeeDto) {
        Map<String, String> response = new HashMap<>();
        try {
            String id = findService.findIdByDetails(employeeDto);
            response.put("status", "success");
            response.put("id", id);
        } catch (Exception e) {
            response.put("status", "failure");
            response.put("message", "입력한 정보로 ID를 찾을 수 없습니다.");
        }
        return response;
    }
}
