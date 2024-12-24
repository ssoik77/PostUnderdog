package com.project.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.dto.EmployeeDto;
import com.project.dto.MemberDto;
import com.project.service.MypageService;

@RestController
@RequestMapping("/mypage")
@CrossOrigin(origins = "http://localhost:3000")
public class MypageController {

    @Autowired
    private MypageService mypageService;

    @GetMapping("/userinfo")
    public Map<String, Object> getUserInfo(@RequestParam String m_id) {
        Map<String, Object> response = new HashMap<>();

        try {
            MemberDto memberInfo = mypageService.getMemberInfo(m_id);
            EmployeeDto employeeInfo = mypageService.getEmployeeInfo(memberInfo.getM_key());

            response.put("status", "success");
            response.put("memberInfo", memberInfo);
            response.put("employeeInfo", employeeInfo);
        } catch (Exception e) {
            response.put("status", "failure");
            response.put("message", "사용자 정보를 가져올 수 없습니다.");
        }

        return response;
    }
}
