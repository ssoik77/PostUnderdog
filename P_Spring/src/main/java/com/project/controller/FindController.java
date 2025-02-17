package com.project.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.EmployeeDto;
import com.project.dto.FindPwDto;
import com.project.service.FindService;

import lombok.extern.log4j.Log4j;

@RestController
@RequestMapping("/find")
@CrossOrigin(origins = {"http://localhost:3000","http://192.168.0.135:3000"})
@Log4j
public class FindController {

    private final FindService findService;
    
    public FindController(FindService findService) {
        this.findService = findService;
    }

    @PostMapping("/id")
    public Map<String, String> findId(@RequestBody EmployeeDto employeeDto) {
    	log.info(employeeDto);
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

    @PostMapping("/pw")
    public Map<String, String> findPw(@RequestBody FindPwDto findPwDto) {
        Map<String, String> response = new HashMap<>();
        try {
            String pw = findService.findPwByDetails(findPwDto);
            response.put("status", "success");
            response.put("pw", pw);
        } catch (Exception e) {
            response.put("status", "failure");
            response.put("message", "입력한 정보로 PW를 찾을 수 없습니다.");
        }
        return response;
    }
}
